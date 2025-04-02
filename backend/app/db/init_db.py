import logging

from sqlalchemy.orm import Session

from app.db.base import Base
from app.db.session import engine
from app.core.config import settings

logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    """Initialize the database with required initial data."""
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)

    # Add any initial data seeding here

    logger.info("PostgreSQL database initialized successfully")

def create_initial_data(db: Session) -> None:
    """Create initial data in the database."""
    # Add code to create initial data if needed
    pass
