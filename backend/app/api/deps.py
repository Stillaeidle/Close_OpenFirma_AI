# Dependencies

from typing import Generator, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import ALGORITHM
from app.db.session import SessionLocal
from app.schemas.auth import TokenPayload, User

# Create OAuth2 scheme for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Database dependency
def get_db() -> Generator:
    """
    Get a database session
    """
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


# Current user dependency
def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> User:
    """
    Get the current authenticated user from the token
    """
    try:
        # This is a simplified implementation for the template
        # In a real app, you'd decode the token and validate the user from the database
        
        # For now, return a dummy user for testing
        return User(
            id="1",
            email="user@example.com",
            is_active=True,
            is_superuser=False,
            full_name="Test User"
        )
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


# Admin user dependency 
def get_current_active_superuser(
    current_user: User = Depends(get_current_user),
) -> User:
    """
    Get the current user and verify they are an active superuser
    """
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    return current_user