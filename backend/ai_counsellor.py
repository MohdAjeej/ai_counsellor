import os
import json
from typing import Optional
from dotenv import load_dotenv
import google.generativeai as genai
from sqlalchemy.orm import Session

from models import UserProfile, University, ShortlistedUniversity, LockedUniversity, TodoTask

load_dotenv()

class AICounsellor:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        genai.configure(api_key=api_key)
        # Default: gemini-1.0-pro often has free-tier quota. Set GEMINI_MODEL in .env to override.
        # See https://ai.google.dev/gemini-api/docs/rate-limits and .../docs/models
        model_name = os.getenv("GEMINI_MODEL", "gemini-1.0-pro")
        self.model = genai.GenerativeModel(model_name)
        self._model_name = model_name
        self._fallbacks = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"]
    
    def _generate(self, prompt: str) -> str:
        """Generate content; on 404 or 429 try fallback models."""
        err = None
        for attempt, model in enumerate([self._model_name] + self._fallbacks):
            if attempt > 0:
                self.model = genai.GenerativeModel(model)
            try:
                response = self.model.generate_content(prompt)
                return response.text
            except Exception as e:
                err = e
                err_str = str(e)
                if "404" in err_str or "not found" in err_str.lower():
                    continue
                if "429" in err_str or "quota" in err_str.lower():
                    continue
                raise
        if err and ("429" in str(err) or "quota" in str(err).lower()):
            raise ValueError(
                "RATE_LIMIT:The AI Counsellor has reached its rate limit. "
                "Please try again in about a minute. Free tier has daily and per-minute limits. "
                "See https://ai.google.dev/gemini-api/docs/rate-limits"
            ) from err
        raise err
    
    def _format_profile(self, profile: UserProfile) -> str:
        """Format user profile into a readable string for AI"""
        profile_text = f"""
User Profile:
- Current Degree: {profile.current_degree or 'Not specified'}
- Current GPA: {profile.current_gpa or 'Not specified'}
- Field of Study: {profile.field_of_study or 'Not specified'}
- Desired Degree: {profile.desired_degree or 'Not specified'}
- Desired Field: {profile.desired_field or 'Not specified'}
- Preferred Countries: {profile.preferred_countries or 'Not specified'}
- Budget Range: {profile.budget_min or 0} - {profile.budget_max or 0} {profile.currency}
- TOEFL Score: {profile.toefl_score or 'Not taken'}
- IELTS Score: {profile.ielts_score or 'Not taken'}
- GRE Score: {profile.gre_score or 'Not taken'}
- GMAT Score: {profile.gmat_score or 'Not taken'}
- Work Experience: {profile.work_experience_years} years
- Research Experience: {'Yes' if profile.research_experience else 'No'}
- Publications: {profile.publications}
"""
        return profile_text
    
    async def analyze_profile(self, profile: UserProfile) -> str:
        """Analyze user profile and provide insights"""
        profile_text = self._format_profile(profile)
        
        prompt = f"""
You are an expert study-abroad counsellor. Analyze the following student profile and provide:
1. Profile strengths
2. Profile gaps or weaknesses
3. Recommendations for improvement
4. Overall assessment

{profile_text}

Provide a clear, structured analysis that helps the student understand their position.
"""
        
        try:
            return self._generate(prompt)
        except ValueError as e:
            if "RATE_LIMIT:" in str(e):
                return str(e).replace("RATE_LIMIT:", "").strip()
            raise
        except Exception as e:
            return f"Error analyzing profile: {str(e)}"
    
    async def chat(
        self,
        user_message: str,
        user_profile: UserProfile,
        current_stage: str,
        db: Session,
        user_id: int
    ) -> str:
        """Handle chat interaction with context awareness"""
        profile_text = self._format_profile(user_profile)
        
        # Get user's shortlisted and locked universities
        shortlisted = db.query(ShortlistedUniversity).filter(
            ShortlistedUniversity.user_id == user_id
        ).all()
        
        locked = db.query(LockedUniversity).filter(
            LockedUniversity.user_id == user_id
        ).all()
        
        shortlisted_names = []
        for item in shortlisted:
            uni = db.query(University).filter(University.id == item.university_id).first()
            if uni:
                shortlisted_names.append(f"{uni.name} ({item.category})")
        
        locked_names = []
        for item in locked:
            uni = db.query(University).filter(University.id == item.university_id).first()
            if uni:
                locked_names.append(uni.name)
        
        context = f"""
You are an AI Counsellor helping a student with their study-abroad journey. 

Current Stage: {current_stage}
User Profile:
{profile_text}

Shortlisted Universities: {', '.join(shortlisted_names) if shortlisted_names else 'None'}
Locked Universities: {', '.join(locked_names) if locked_names else 'None'}

Your role:
- Guide the student through their study-abroad journey
- Explain why universities fit or are risky
- Help with shortlisting decisions
- Provide actionable advice
- Create clarity and direction

Student's message: {user_message}

Respond as a helpful, knowledgeable counsellor. Be specific, actionable, and supportive.
"""
        
        try:
            return self._generate(context)
        except ValueError as e:
            if "RATE_LIMIT:" in str(e):
                return str(e).replace("RATE_LIMIT:", "").strip()
            raise
        except Exception as e:
            return f"I apologize, but I encountered an error. Please try again. Error: {str(e)}"
    
    async def recommend_universities(
        self,
        profile: UserProfile,
        db: Session
    ) -> list[dict]:
        """Use AI to recommend universities based on profile"""
        profile_text = self._format_profile(profile)
        
        # Get all universities
        all_universities = db.query(University).limit(50).all()
        universities_info = []
        for uni in all_universities:
            universities_info.append({
                "id": uni.id,
                "name": uni.name,
                "country": uni.country,
                "tuition": f"{uni.tuition_min}-{uni.tuition_max}",
                "acceptance_rate": uni.acceptance_rate,
                "ranking": uni.ranking
            })
        
        prompt = f"""
Based on this student profile:
{profile_text}

And these available universities:
{json.dumps(universities_info, indent=2)}

Recommend 5-10 universities categorized as:
- Dream: Reach schools (lower acceptance probability but great fit)
- Target: Good match schools (realistic acceptance probability)
- Safe: Backup schools (higher acceptance probability)

For each university, explain:
1. Why it fits the student
2. Risk level and acceptance likelihood
3. Key requirements

Return a JSON array with university IDs and categories.
"""
        
        try:
            self._generate(prompt)
            # Parse response and return recommendations (simplified here)
            return []
        except Exception:
            return []

