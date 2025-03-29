# Database initialization

import logging
from sqlalchemy.orm import Session

from app.db.session import Base, engine
from app.db.models import farm, greenhouse, measurement

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init_db() -> None:
    """
    Initialize the database, creating tables based on models
    """
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise


def create_initial_data(db: Session) -> None:
    """
    Create initial seed data for testing
    """
    # Check if we already have data
    existing_farms = db.query(farm.Farm).count()
    if existing_farms > 0:
        logger.info("Database already contains data, skipping seed data creation")
        return
    
    # Seed data would go here (farm creation, etc.)
    logger.info("Initial data created successfully")


if __name__ == "__main__":
    # Initialize the database
    init_db()
    
    # Create initial data
    from app.db.session import SessionLocal
    db = SessionLocal()
    try:
        create_initial_data(db)
    finally:
        db.close()