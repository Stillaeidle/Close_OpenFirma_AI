# Farm data services

from typing import List, Optional, Dict, Any
from uuid import uuid4

from sqlalchemy.orm import Session

from app.db.models.farm import Farm
from app.schemas.farm import FarmCreate, FarmUpdate


def get_farm(db: Session, farm_id: str) -> Optional[Farm]:
    """
    Get a farm by ID
    """
    return db.query(Farm).filter(Farm.id == farm_id).first()


def get_farms(
    db: Session, skip: int = 0, limit: int = 100, filters: Optional[Dict[str, Any]] = None
) -> List[Farm]:
    """
    Get multiple farms with optional filtering
    """
    query = db.query(Farm)
    
    # Apply filters if provided
    if filters:
        if "name" in filters and filters["name"]:
            query = query.filter(Farm.name.ilike(f"%{filters['name']}%"))
        
        if "location" in filters and filters["location"]:
            query = query.filter(Farm.location.ilike(f"%{filters['location']}%"))
        
        if "is_active" in filters:
            query = query.filter(Farm.is_active == filters["is_active"])
    
    # Apply pagination
    farms = query.offset(skip).limit(limit).all()
    
    return farms


def create_farm(db: Session, farm_in: FarmCreate) -> Farm:
    """
    Create a new farm
    """
    # Generate ID if not provided
    farm_id = farm_in.id or f"farm_{str(uuid4())[:8]}"
    
    # Create farm object
    db_farm = Farm(
        id=farm_id,
        name=farm_in.name,
        location=farm_in.location,
        area=farm_in.area,
        is_active=True
    )
    
    # Add to database
    db.add(db_farm)
    db.commit()
    db.refresh(db_farm)
    
    return db_farm


def update_farm(db: Session, farm: Farm, farm_in: FarmUpdate) -> Farm:
    """
    Update a farm
    """
    # Update farm attributes
    for field in farm_in.__dict__:
        if getattr(farm_in, field) is not None:
            setattr(farm, field, getattr(farm_in, field))
    
    # Save to database
    db.add(farm)
    db.commit()
    db.refresh(farm)
    
    return farm


def delete_farm(db: Session, farm: Farm) -> Farm:
    """
    Delete a farm (mark as inactive)
    """
    # Mark as inactive
    farm.is_active = False
    
    # Save to database
    db.add(farm)
    db.commit()
    db.refresh(farm)
    
    return farm