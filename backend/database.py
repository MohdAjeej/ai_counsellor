from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Raw URL from env (Railway/Render/Heroku often use postgres://; SQLAlchemy needs postgresql://)
_raw_url = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/ai_counsellor")
if _raw_url and _raw_url.startswith("postgres://"):
    DATABASE_URL = _raw_url.replace("postgres://", "postgresql://", 1)
else:
    DATABASE_URL = _raw_url

# pool_pre_ping: avoid "connection already closed"; pool_recycle: avoid stale connections on cloud
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

