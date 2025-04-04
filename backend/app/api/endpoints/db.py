# Database related endpoints

from typing import Any
from sqlalchemy import inspect, text
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.api.deps import get_db

router = APIRouter()


@router.get("/health", response_model=dict)
def db_health_check(
    db: Session = Depends(get_db)
) -> Any:
    """
    Check database connection and return information about the connected database
    """
    try:
        # Get the underlying engine from the session
        engine = db.get_bind()
        inspector = inspect(engine)
        
        # Get database info
        db_info = {
            "status": "connected",
            "dialect": engine.dialect.name,
            "driver": engine.dialect.driver,
            "tables": inspector.get_table_names(),
        }
        
        # Additional database-specific information
        if engine.dialect.name == 'postgresql':
            # PostgreSQL specific queries
            db_info["version"] = db.execute(text("SELECT version()")).scalar()
            db_info["current_database"] = db.execute(text("SELECT current_database()")).scalar()
            db_info["current_user"] = db.execute(text("SELECT current_user")).scalar()
        elif engine.dialect.name == 'mysql':
            # MySQL specific queries
            db_info["version"] = db.execute(text("SELECT version()")).scalar()
            db_info["current_database"] = db.execute(text("SELECT DATABASE()")).scalar()
            db_info["current_user"] = db.execute(text("SELECT USER()")).scalar()
        elif engine.dialect.name == 'sqlite':
            # SQLite specific queries
            db_info["version"] = db.execute(text("SELECT sqlite_version()")).scalar()
            db_info["database_file"] = str(engine.url).replace('sqlite:///', '')
        
        # Get connection information from engine URL (hiding password)
        url = str(engine.url)
        if hasattr(engine.url, 'password') and engine.url.password:
            safe_url = url.replace(engine.url.password, "********")
        else:
            safe_url = url
        db_info["connection_url"] = safe_url
        
        return db_info
    except Exception as e:
        return {
            "status": "error",
            "message": f"Database connection error: {str(e)}"
        }