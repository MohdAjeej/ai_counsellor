from pydantic import BaseModel, field_validator
from typing import Optional, List
from datetime import datetime

# User schemas (use str for email to avoid requiring email-validator package)
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    is_onboarded: bool
    current_stage: str
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Profile schemas
class ProfileCreate(BaseModel):
    current_degree: Optional[str] = None
    current_gpa: Optional[float] = None
    current_institution: Optional[str] = None
    field_of_study: Optional[str] = None
    graduation_year: Optional[int] = None
    desired_degree: Optional[str] = None
    desired_field: Optional[str] = None
    preferred_countries: Optional[str] = None
    study_start_year: Optional[int] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    currency: Optional[str] = "USD"
    toefl_score: Optional[int] = None
    ielts_score: Optional[float] = None
    gre_score: Optional[int] = None
    gmat_score: Optional[int] = None
    exam_status: Optional[str] = None
    work_experience_years: Optional[int] = 0
    research_experience: Optional[bool] = False
    publications: Optional[int] = 0

class ProfileResponse(BaseModel):
    id: int
    user_id: int
    current_degree: Optional[str]
    current_gpa: Optional[float]
    current_institution: Optional[str]
    field_of_study: Optional[str]
    graduation_year: Optional[int]
    desired_degree: Optional[str]
    desired_field: Optional[str]
    preferred_countries: Optional[str]
    study_start_year: Optional[int]
    budget_min: Optional[float]
    budget_max: Optional[float]
    currency: Optional[str]
    toefl_score: Optional[int]
    ielts_score: Optional[float]
    gre_score: Optional[int]
    gmat_score: Optional[int]
    exam_status: Optional[str]
    work_experience_years: Optional[int]
    research_experience: Optional[bool]
    publications: Optional[int]
    
    class Config:
        from_attributes = True

# University schemas
class UniversityResponse(BaseModel):
    id: int
    name: str
    country: str
    city: Optional[str]
    ranking: Optional[int]
    acceptance_rate: Optional[float]
    programs_offered: Optional[str]
    tuition_min: Optional[float]
    tuition_max: Optional[float]
    currency: Optional[str]
    living_cost_estimate: Optional[float]
    min_gpa: Optional[float]
    toefl_required: Optional[bool]
    ielts_required: Optional[bool]
    gre_required: Optional[bool]
    gmat_required: Optional[bool]
    website: Optional[str]
    description: Optional[str]
    
    class Config:
        from_attributes = True

class UniversityShortlist(BaseModel):
    university_id: int
    category: str  # "dream", "target", "safe"
    notes: Optional[str] = None

class UniversityLock(BaseModel):
    university_id: int


class UniversityListResponse(BaseModel):
    """Wrapper so shortlisted/locked APIs always return { data: [...] } for consistent frontend parsing."""
    data: List[UniversityResponse]


# Todo schemas
def _parse_due_date(v):
    """Accept YYYY-MM-DD or full ISO datetime string for due_date."""
    if v is None or (isinstance(v, str) and not v.strip()):
        return None
    if isinstance(v, datetime):
        return v
    if isinstance(v, str):
        s = v.strip()
        if not s:
            return None
        try:
            if "T" in s or " " in s:
                return datetime.fromisoformat(s.replace("Z", "+00:00"))
            return datetime.strptime(s, "%Y-%m-%d")
        except ValueError:
            return None
    return v


class TodoCreate(BaseModel):
    university_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    priority: Optional[str] = "medium"
    due_date: Optional[datetime] = None

    @field_validator("due_date", mode="before")
    @classmethod
    def parse_due_date(cls, v):
        return _parse_due_date(v)


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[datetime] = None

    @field_validator("due_date", mode="before")
    @classmethod
    def parse_due_date(cls, v):
        return _parse_due_date(v)

class TodoResponse(BaseModel):
    id: int
    user_id: int
    university_id: Optional[int]
    title: str
    description: Optional[str]
    priority: str
    status: str
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]
    completed_at: Optional[datetime]
    
    class Config:
        from_attributes = True

