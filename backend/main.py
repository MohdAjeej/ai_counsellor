from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from database import get_db, engine, Base
from models import User, UserProfile, University, ShortlistedUniversity, LockedUniversity, TodoTask
from schemas import (
    UserCreate, UserResponse, UserLogin, Token,
    ProfileCreate, ProfileResponse,
    UniversityResponse, UniversityShortlist, UniversityLock, UniversityListResponse,
    TodoCreate, TodoResponse, TodoUpdate
)
from auth import get_current_user, get_user_from_request, create_access_token, verify_password, get_password_hash
from ai_counsellor import AICounsellor
from university_service import UniversityService

load_dotenv()

# Create tables on startup (deferred so app can start even if DB is briefly unreachable)
def _ensure_tables():
    import logging
    import os
    log = logging.getLogger("uvicorn.error")
    db_url = (os.getenv("DATABASE_URL") or "").strip()
    # Empty or localhost DB URL in cloud = wrong config (default in database.py is localhost)
    is_localhost = not db_url or "localhost" in db_url or "127.0.0.1" in db_url
    is_cloud = os.getenv("PORT")  # Railway/Render set PORT
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        if is_cloud and is_localhost:
            log.warning(
                "Could not create DB tables: DATABASE_URL points to localhost but this app is running in the cloud. "
                "Fix: Add a PostgreSQL service (e.g. Railway → New → Database → PostgreSQL), then in your backend "
                "service → Variables set DATABASE_URL to the Postgres connection URL from the DB service. "
                "See BACKEND_DEPLOYMENT.md."
            )
        else:
            log.warning(
                "Could not create DB tables: %s. Start PostgreSQL locally or set DATABASE_URL to your database.",
                e,
            )

app = FastAPI(title="AI Counsellor API", version="1.0.0")

@app.on_event("startup")
def startup():
    _ensure_tables()

# CORS: use CORS_ORIGINS env (comma-separated) or default to localhost
_cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001,https://ai-counsellor-opal.vercel.app")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _cors_origins.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# Initialize services
ai_counsellor = AICounsellor()
university_service = UniversityService()

@app.get("/")
async def root():
    return {"message": "AI Counsellor API", "version": "1.0.0"}

@app.get("/health")
@app.get("/api/health")
async def health_check():
    """Railway and others use /health for healthchecks; must return 200 when ready."""
    return {"status": "healthy"}

# Authentication endpoints
@app.post("/api/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if user exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        db_user = User(
            email=user_data.email,
            hashed_password=hashed_password,
            full_name=user_data.full_name
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        return UserResponse(
            id=db_user.id,
            email=db_user.email,
            full_name=db_user.full_name,
            is_onboarded=db_user.is_onboarded,
            current_stage=db_user.current_stage
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        error_msg = str(e)
        if "connection" in error_msg.lower() or "database" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Database connection error. Please check if PostgreSQL is running."
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {error_msg}"
        )

@app.post("/api/auth/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        is_onboarded=current_user.is_onboarded,
        current_stage=current_user.current_stage
    )

# Profile/Onboarding endpoints
@app.post("/api/profile", response_model=ProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_profile(
    profile_data: ProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if profile already exists
    existing_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    
    if existing_profile:
        # Update existing profile
        for key, value in profile_data.dict(exclude_unset=True).items():
            setattr(existing_profile, key, value)
    else:
        # Create new profile
        existing_profile = UserProfile(user_id=current_user.id, **profile_data.dict())
        db.add(existing_profile)
    
    # Mark user as onboarded and move to dashboard stage
    current_user.is_onboarded = True
    current_user.current_stage = "dashboard"
    
    db.commit()
    db.refresh(existing_profile)
    
    return ProfileResponse(**existing_profile.__dict__)

@app.get("/api/profile", response_model=ProfileResponse)
async def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found. Please complete onboarding.")
    return ProfileResponse(**profile.__dict__)

# AI Counsellor endpoints
@app.post("/api/counsellor/chat")
async def chat_with_counsellor(
    request: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    message = request.get("message", "")
    if not message:
        raise HTTPException(status_code=400, detail="Message is required")
    if not current_user.is_onboarded:
        raise HTTPException(status_code=400, detail="Please complete onboarding first")
    
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    response = await ai_counsellor.chat(
        user_message=message,
        user_profile=profile,
        current_stage=current_user.current_stage,
        db=db,
        user_id=current_user.id
    )
    
    return {"response": response}

@app.get("/api/counsellor/analysis")
async def get_profile_analysis(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user.is_onboarded:
        raise HTTPException(status_code=400, detail="Please complete onboarding first")
    
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    analysis = await ai_counsellor.analyze_profile(profile)
    return {"analysis": analysis}

# University endpoints (static paths first so /shortlisted, /locked, /lock are not matched as {university_id})
@app.get("/api/universities", response_model=list[UniversityResponse])
async def get_universities(
    country: str = None,
    budget_min: float = None,
    budget_max: float = None,
    show_all: bool = False,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user.is_onboarded:
        raise HTTPException(status_code=400, detail="Please complete onboarding first")
    
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    universities = university_service.get_recommended_universities(
        db=db,
        profile=profile,
        country=country,
        budget_min=budget_min,
        budget_max=budget_max,
        show_all=show_all,
    )
    
    return universities

@app.post("/api/universities/shortlist", status_code=status.HTTP_201_CREATED)
async def shortlist_university(
    data: UniversityShortlist,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if already shortlisted
    existing = db.query(ShortlistedUniversity).filter(
        ShortlistedUniversity.user_id == current_user.id,
        ShortlistedUniversity.university_id == data.university_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="University already shortlisted")
    
    shortlist = ShortlistedUniversity(
        user_id=current_user.id,
        university_id=data.university_id,
        category=data.category  # dream, target, safe
    )
    db.add(shortlist)
    db.commit()
    
    return {"message": "University shortlisted successfully"}

@app.get("/api/universities/shortlisted")
async def get_shortlisted_universities(request: Request, db: Session = Depends(get_db)):
    current_user = get_user_from_request(request, db)
    shortlisted = db.query(ShortlistedUniversity).filter(
        ShortlistedUniversity.user_id == current_user.id
    ).all()
    
    universities = []
    for item in shortlisted:
        university = db.query(University).filter(University.id == item.university_id).first()
        if university:
            try:
                universities.append(UniversityResponse.model_validate(university))
            except Exception:
                pass
    return {"data": [u.model_dump() for u in universities]}

@app.post("/api/universities/lock", status_code=status.HTTP_201_CREATED)
async def lock_university(
    data: UniversityLock,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if university is shortlisted
    shortlisted = db.query(ShortlistedUniversity).filter(
        ShortlistedUniversity.user_id == current_user.id,
        ShortlistedUniversity.university_id == data.university_id
    ).first()
    
    if not shortlisted:
        raise HTTPException(status_code=400, detail="University must be shortlisted before locking")
    
    # Check if already locked
    existing = db.query(LockedUniversity).filter(
        LockedUniversity.user_id == current_user.id,
        LockedUniversity.university_id == data.university_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="University already locked")
    
    locked = LockedUniversity(
        user_id=current_user.id,
        university_id=data.university_id
    )
    db.add(locked)
    db.flush()  # ensure insert is written before commit
    # Update user stage to application
    current_user.current_stage = "application"
    db.commit()
    db.refresh(locked)
    return {"message": "University locked successfully"}

@app.get("/api/universities/locked")
async def get_locked_universities(request: Request, db: Session = Depends(get_db)):
    current_user = get_user_from_request(request, db)
    locked = db.query(LockedUniversity).filter(
        LockedUniversity.user_id == current_user.id
    ).all()
    
    universities = []
    for item in locked:
        university = db.query(University).filter(University.id == item.university_id).first()
        if university:
            try:
                universities.append(UniversityResponse.model_validate(university))
            except Exception:
                pass
    return {"data": [u.model_dump() for u in universities]}

@app.delete("/api/universities/lock/{university_id}")
async def unlock_university(
    university_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    locked = db.query(LockedUniversity).filter(
        LockedUniversity.user_id == current_user.id,
        LockedUniversity.university_id == university_id
    ).first()
    
    if not locked:
        raise HTTPException(status_code=404, detail="University not found in locked list")
    
    db.delete(locked)
    db.commit()
    
    return {"message": "University unlocked successfully"}

@app.get("/api/universities/{university_id}", response_model=UniversityResponse)
async def get_university_by_id(
    university_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not current_user.is_onboarded:
        raise HTTPException(status_code=400, detail="Please complete onboarding first")
    university = db.query(University).filter(University.id == university_id).first()
    if not university:
        raise HTTPException(status_code=404, detail="University not found")
    return UniversityResponse.model_validate(university)

# Todo endpoints
@app.get("/api/todos", response_model=list[TodoResponse])
async def get_todos(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todos = db.query(TodoTask).filter(
        TodoTask.user_id == current_user.id
    ).order_by(TodoTask.created_at.desc()).all()
    
    return [TodoResponse(**todo.__dict__) for todo in todos]

@app.post("/api/todos", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(
    todo_data: TodoCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todo = TodoTask(
        user_id=current_user.id,
        **todo_data.dict()
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    
    return TodoResponse(**todo.__dict__)

@app.patch("/api/todos/{todo_id}", response_model=TodoResponse)
async def update_todo(
    todo_id: int,
    todo_data: TodoUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todo = db.query(TodoTask).filter(
        TodoTask.id == todo_id,
        TodoTask.user_id == current_user.id
    ).first()
    
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    for key, value in todo_data.dict(exclude_unset=True).items():
        setattr(todo, key, value)
    
    db.commit()
    db.refresh(todo)
    
    return TodoResponse(**todo.__dict__)

@app.delete("/api/todos/{todo_id}")
async def delete_todo(
    todo_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todo = db.query(TodoTask).filter(
        TodoTask.id == todo_id,
        TodoTask.user_id == current_user.id
    ).first()
    
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    db.delete(todo)
    db.commit()
    
    return {"message": "Todo deleted successfully"}

# if __name__ == "__main__":
#     # import uvicorn
#     port = int(os.getenv("PORT", 8000))
#     # uvicorn.run(app, host="0.0.0.0", port=port)
if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)


