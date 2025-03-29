# Authentication routes

from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.config import settings
from app.core.security import create_access_token
from backend.app.schemas.auth_schemas import Token, User, Login

router = APIRouter()


@router.post("/login", response_model=Token)
def login_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    # In a real app, you would validate credentials here
    # For this template, we'll return a dummy token
    
    # Simulate authentication
    if form_data.username != "admin@example.com" or form_data.password != "password":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            subject=form_data.username, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/login/json", response_model=Token)
def login_json(
    login: Login,
    db: Session = Depends(get_db),
) -> Any:
    """
    JSON login endpoint, alternative to OAuth2 form login
    """
    # This is the same as the OAuth2 login endpoint, but accepts JSON instead of form data
    if login.username != "admin@example.com" or login.password != "password":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            subject=login.username, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.get("/me", response_model=User)
def read_users_me() -> Any:
    """
    Get current user information
    """
    # For the template, return a dummy user
    # In a real app, you would retrieve this from the token
    return User(
        id="1",
        email="admin@example.com",
        is_active=True,
        is_superuser=True,
        full_name="Admin User"
    )