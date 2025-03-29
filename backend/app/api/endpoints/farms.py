# Farm data routes

from typing import Any, List, Optional
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.core.errors import NotFoundError
from app.schemas.farm import Farm, FarmCreate, FarmUpdate, FarmList
from app.schemas.auth import User

router = APIRouter()


@router.get("/", response_model=FarmList)
def list_farms(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    name: Optional[str] = None,
    location: Optional[str] = None,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Retrieve farms with optional filtering
    """
    # This is a mock implementation for the template
    # In a real app, you would query the database
    farms = [
        Farm(
            id="farm1",
            name="Demo Farm 1",
            location="Location 1",
            area=150.5,
            created_at="2025-01-01T00:00:00",
            updated_at="2025-01-01T00:00:00",
            is_active=True
        ),
        Farm(
            id="farm2",
            name="Demo Farm 2",
            location="Location 2",
            area=250.0,
            created_at="2025-01-02T00:00:00",
            updated_at="2025-01-02T00:00:00",
            is_active=True
        )
    ]
    
    # Filter by name if provided
    if name:
        farms = [farm for farm in farms if name.lower() in farm.name.lower()]
    
    # Filter by location if provided
    if location:
        farms = [farm for farm in farms if location.lower() in farm.location.lower()]
    
    # Apply pagination
    paginated_farms = farms[skip : skip + limit]
    
    return FarmList(farms=paginated_farms, total=len(farms))


@router.post("/", response_model=Farm)
def create_farm(
    *,
    db: Session = Depends(get_db),
    farm_in: FarmCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create new farm
    """
    # Generate ID if not provided
    farm_id = farm_in.id or f"farm_{str(uuid4())[:8]}"
    
    # In a real app, you would create the farm in the database
    farm = Farm(
        id=farm_id,
        name=farm_in.name,
        location=farm_in.location,
        area=farm_in.area,
        created_at="2025-03-29T12:00:00",
        updated_at="2025-03-29T12:00:00",
        is_active=True
    )
    
    return farm


@router.get("/{farm_id}", response_model=Farm)
def get_farm(
    *,
    db: Session = Depends(get_db),
    farm_id: str = Path(..., description="The ID of the farm to get"),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get a specific farm by ID
    """
    # This is a mock implementation for the template
    # In a real app, you would query the database
    if farm_id not in ["farm1", "farm2"]:
        raise NotFoundError(f"Farm with ID {farm_id} not found")
    
    farm = Farm(
        id=farm_id,
        name=f"Demo Farm {farm_id[-1]}",
        location=f"Location {farm_id[-1]}",
        area=150.5 if farm_id == "farm1" else 250.0,
        created_at="2025-01-01T00:00:00",
        updated_at="2025-01-01T00:00:00",
        is_active=True
    )
    
    return farm


@router.put("/{farm_id}", response_model=Farm)
def update_farm(
    *,
    db: Session = Depends(get_db),
    farm_id: str = Path(..., description="The ID of the farm to update"),
    farm_in: FarmUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update a farm
    """
    # Check if farm exists
    if farm_id not in ["farm1", "farm2"]:
        raise NotFoundError(f"Farm with ID {farm_id} not found")
    
    # In a real app, you would update the farm in the database
    farm = Farm(
        id=farm_id,
        name=farm_in.name or f"Demo Farm {farm_id[-1]}",
        location=farm_in.location or f"Location {farm_id[-1]}",
        area=farm_in.area or (150.5 if farm_id == "farm1" else 250.0),
        created_at="2025-01-01T00:00:00",
        updated_at="2025-03-29T12:00:00",
        is_active=farm_in.is_active if farm_in.is_active is not None else True
    )
    
    return farm


@router.delete("/{farm_id}", response_model=Farm)
def delete_farm(
    *,
    db: Session = Depends(get_db),
    farm_id: str = Path(..., description="The ID of the farm to delete"),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Delete a farm
    """
    # Check if farm exists
    if farm_id not in ["farm1", "farm2"]:
        raise NotFoundError(f"Farm with ID {farm_id} not found")
    
    # In a real app, you would mark the farm as inactive in the database
    farm = Farm(
        id=farm_id,
        name=f"Demo Farm {farm_id[-1]}",
        location=f"Location {farm_id[-1]}",
        area=150.5 if farm_id == "farm1" else 250.0,
        created_at="2025-01-01T00:00:00",
        updated_at="2025-03-29T12:00:00",
        is_active=False
    )
    
    return farm