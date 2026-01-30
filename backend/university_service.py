from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from models import University, UserProfile
from schemas import UniversityResponse

class UniversityService:
    def get_recommended_universities(
        self,
        db: Session,
        profile: UserProfile,
        country: Optional[str] = None,
        budget_min: Optional[float] = None,
        budget_max: Optional[float] = None,
        show_all: bool = False
    ) -> List[UniversityResponse]:
        """Get universities filtered by profile and preferences, or all if show_all=True"""
        query = db.query(University)
        
        if not show_all:
            # Filter by country if specified
            if country:
                query = query.filter(University.country.ilike(f"%{country}%"))
            
            # Filter by budget
            if budget_min is not None:
                query = query.filter(University.tuition_max >= budget_min)
            if budget_max is not None:
                query = query.filter(University.tuition_min <= budget_max)
            
            # If no budget filters from user, use profile budget
            if budget_min is None and budget_max is None and profile and getattr(profile, 'budget_max', None):
                query = query.filter(University.tuition_max <= profile.budget_max)
            if budget_min is None and budget_max is None and profile and getattr(profile, 'budget_min', None):
                query = query.filter(University.tuition_min >= profile.budget_min)
            
            # Filter by GPA if available
            if profile and getattr(profile, 'current_gpa', None):
                query = query.filter(
                    or_(
                        University.min_gpa.is_(None),
                        University.min_gpa <= profile.current_gpa
                    )
                )
        
        universities = query.limit(100 if show_all else 50).all()
        
        # Calculate match score for each university
        scored_universities = []
        for uni in universities:
            score = self._calculate_match_score(uni, profile)
            scored_universities.append((score, uni))
        
        # Sort by match score (highest first)
        scored_universities.sort(key=lambda x: x[0], reverse=True)
        
        return [UniversityResponse(**uni.__dict__) for _, uni in scored_universities]
    
    def _calculate_match_score(self, university: University, profile: Optional[UserProfile]) -> float:
        """Calculate how well a university matches the user profile"""
        if profile is None:
            return 0.5
        score = 0.0
        
        # Budget match (40% weight)
        if profile.budget_max and university.tuition_max:
            if university.tuition_max <= profile.budget_max:
                budget_match = 1.0 - (university.tuition_max - profile.budget_min) / (profile.budget_max - profile.budget_min) if profile.budget_max > profile.budget_min else 1.0
                score += budget_match * 0.4
        
        # GPA match (20% weight)
        if profile.current_gpa and university.min_gpa:
            if profile.current_gpa >= university.min_gpa:
                gpa_match = min(1.0, profile.current_gpa / (university.min_gpa + 0.5))
                score += gpa_match * 0.2
        
        # Ranking (20% weight) - higher ranking = better
        if university.ranking:
            ranking_score = max(0, 1.0 - (university.ranking - 1) / 1000)  # Normalize to 0-1
            score += ranking_score * 0.2
        
        # Acceptance rate (20% weight) - higher acceptance = better for student
        if university.acceptance_rate:
            score += university.acceptance_rate * 0.2
        
        return score
    
    def categorize_university(
        self,
        university: University,
        profile: UserProfile
    ) -> str:
        """Categorize university as dream, target, or safe"""
        score = self._calculate_match_score(university, profile)
        
        # Check GPA requirement
        gpa_meets_requirement = True
        if profile.current_gpa and university.min_gpa:
            gpa_meets_requirement = profile.current_gpa >= university.min_gpa
        
        # Check acceptance rate
        acceptance_likelihood = university.acceptance_rate or 0.5
        
        # Categorize
        if not gpa_meets_requirement or acceptance_likelihood < 0.3:
            return "dream"
        elif acceptance_likelihood >= 0.5 and score > 0.6:
            return "safe"
        else:
            return "target"

