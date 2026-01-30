from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
import enum

class UserStage(str, enum.Enum):
    ONBOARDING = "onboarding"
    DASHBOARD = "dashboard"
    DISCOVERY = "discovery"
    SHORTLISTING = "shortlisting"
    APPLICATION = "application"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    is_onboarded = Column(Boolean, default=False)
    current_stage = Column(String, default=UserStage.ONBOARDING.value)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    # Academic background
    current_degree = Column(String)  # e.g., "Bachelor's", "Master's"
    current_gpa = Column(Float)
    current_institution = Column(String)
    field_of_study = Column(String)
    graduation_year = Column(Integer)
    
    # Study goals
    desired_degree = Column(String)  # e.g., "Master's", "PhD"
    desired_field = Column(String)
    preferred_countries = Column(String)  # JSON array as string
    study_start_year = Column(Integer)
    
    # Budget
    budget_min = Column(Float)
    budget_max = Column(Float)
    currency = Column(String, default="USD")
    
    # Exam readiness
    toefl_score = Column(Integer)
    ielts_score = Column(Float)
    gre_score = Column(Integer)
    gmat_score = Column(Integer)
    exam_status = Column(String)  # "completed", "scheduled", "not_taken"
    
    # Additional info
    work_experience_years = Column(Integer, default=0)
    research_experience = Column(Boolean, default=False)
    publications = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", backref="profile")

class University(Base):
    __tablename__ = "universities"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    country = Column(String, nullable=False, index=True)
    city = Column(String)
    
    # Academic info
    ranking = Column(Integer)
    acceptance_rate = Column(Float)
    programs_offered = Column(Text)  # JSON array as string
    
    # Financial info
    tuition_min = Column(Float)
    tuition_max = Column(Float)
    currency = Column(String, default="USD")
    living_cost_estimate = Column(Float)
    
    # Requirements
    min_gpa = Column(Float)
    toefl_required = Column(Boolean, default=False)
    ielts_required = Column(Boolean, default=False)
    gre_required = Column(Boolean, default=False)
    gmat_required = Column(Boolean, default=False)
    
    # Additional info
    website = Column(String)
    description = Column(Text)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ShortlistedUniversity(Base):
    __tablename__ = "shortlisted_universities"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    university_id = Column(Integer, ForeignKey("universities.id"), nullable=False)
    category = Column(String)  # "dream", "target", "safe"
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", backref="shortlisted_universities")
    university = relationship("University")

class LockedUniversity(Base):
    __tablename__ = "locked_universities"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    university_id = Column(Integer, ForeignKey("universities.id"), nullable=False)
    locked_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", backref="locked_universities")
    university = relationship("University")

class TodoTask(Base):
    __tablename__ = "todo_tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    university_id = Column(Integer, ForeignKey("universities.id"), nullable=True)
    
    title = Column(String, nullable=False)
    description = Column(Text)
    priority = Column(String, default="medium")  # "low", "medium", "high"
    status = Column(String, default="pending")  # "pending", "in_progress", "completed"
    due_date = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    user = relationship("User", backref="todos")
    university = relationship("University")

