# Description: Pydantic models for authentication.
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False
    full_name: Optional[str] = None

class UserCreate(UserBase):
    email: EmailStr
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class User(UserBase):
    id: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class UserInDB(User):
    hashed_password: str

class Login(BaseModel):
    username: str
    password: str