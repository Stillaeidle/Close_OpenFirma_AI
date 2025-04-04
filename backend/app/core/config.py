import os
import secrets
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, Field, PostgresDsn, validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings."""
    
    # API Configuration
    API_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "OpenFirma API"
    APP_NAME: str = "OpenFirma"
    PROJECT_DESCRIPTION: str = "Farm and greenhouse management API with ML predictions"
    VERSION: str = "0.1.0"
    LOG_LEVEL: str = "info"
    
    # CORS Configuration
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Security Configuration
    SECRET_KEY: str = Field(default_factory=lambda: secrets.token_urlsafe(32), description="Default is a random token; override in production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    ALGORITHM: str = "HS256"
    
    # Database Configuration
    POSTGRES_SERVER: str = "db"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "openfirma"
    POSTGRES_PORT: str = "5432"
    DATABASE_URL: Optional[PostgresDsn] = None
    
    @validator("DATABASE_URL", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            port=values.get("POSTGRES_PORT"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )
    
    # ML Model Configuration
    MODEL_PATH: str = "app/models/ml/artifacts/model.joblib"
    PREPROCESSING_CONFIG_PATH: str = "app/models/ml/artifacts/preprocessing_config.json"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = False
    
    # Testing flag
    TESTING: bool = False
    
    # Pydantic Config
    model_config = SettingsConfigDict(
        env_file=("configs/development.env" if os.getenv("ENVIRONMENT", "development") == "development" 
                  else "configs/production.env"),
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


# Initialize settings based on environment
settings = Settings()