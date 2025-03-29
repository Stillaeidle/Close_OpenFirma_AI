# Database session

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# Convert PostgresDsn to string and ensure proper URL formatting
if settings.SQLALCHEMY_DATABASE_URI:
    database_url = str(settings.SQLALCHEMY_DATABASE_URI)
else:
    # Fallback if URI isn't set
    database_url = f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_SERVER}/{settings.POSTGRES_DB}"

# Create database engine
engine = create_engine(
    database_url,
    pool_pre_ping=True,
    echo=True  # Set to False in production
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for ORM models
Base = declarative_base()