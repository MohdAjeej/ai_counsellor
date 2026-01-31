from datetime import datetime, timedelta
from typing import Optional
from hashlib import sha256
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from database import get_db
from models import User

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# Bcrypt has a 72-byte limit. Hash with SHA256 first so long passwords work.
def _password_to_bcrypt_input(password: str) -> str:
    return sha256(password.encode("utf-8")).hexdigest()  # always 64 bytes to bcrypt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(_password_to_bcrypt_input(password))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def _credentials_exception():
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_user_from_request(request: Request, db: Session) -> User:
    """Validate Bearer token from request headers. Returns user or raises 401. No Depends() = no 422."""
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        raise _credentials_exception()
    token = auth[7:].strip()
    if not token:
        raise _credentials_exception()
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise _credentials_exception()
    except JWTError:
        raise _credentials_exception()
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise _credentials_exception()
    return user


async def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
) -> User:
    """Validate Bearer token from Authorization header. Used via Depends() on other routes."""
    return get_user_from_request(request, db)

