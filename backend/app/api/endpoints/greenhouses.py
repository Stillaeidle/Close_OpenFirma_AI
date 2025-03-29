# Greenhouse data routes

from typing import Any, List, Optional
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.core.errors import NotFoundError
from app.schemas.greenhouse import (
    Greenhouse, GreenhouseCreate, GreenhouseUpdate, GreenhouseList,
    Planting, PlantingCreate, PlantingUpdate, PlantingList
)
from app.schemas.auth_schemas import User

router = APIRouter()


@router.get("/", response_model=GreenhouseList)
def list_greenhouses(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    farm_id: Optional[str] = None,
    name: Optional[str] = None,
    type: Optional[str] = None,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Retrieve greenhouses with optional filtering
    """
    # This is a mock implementation for the template
    # In a real app, you would query the database
    greenhouses = [
        Greenhouse(
            id="gh1",
            farm_id="farm1",
            name="Greenhouse 1",
            type="Type_Serre_A",
            area=500.0,
            height=4.0,
            length=50.0,
            width=10.0,
            num_rows=10,
            row_orientation="North-South",
            created_at="2025-01-01T00:00:00",
            updated_at="2025-01-01T00:00:00",
            is_active=True
        ),
        Greenhouse(
            id="gh2",
            farm_id="farm1",
            name="Greenhouse 2",
            type="Type_Serre_B",
            area=600.0,
            height=5.0,
            length=60.0,
            width=10.0,
            num_rows=12,
            row_orientation="East-West",
            created_at="2025-01-02T00:00:00",
            updated_at="2025-01-02T00:00:00",
            is_active=True
        ),
        Greenhouse(
            id="gh3",
            farm_id="farm2",
            name="Greenhouse 3",
            type="Type_Serre_A",
            area=450.0,
            height=4.0,
            length=45.0,
            width=10.0,
            num_rows=9,
            row_orientation="North-South",
            created_at="2025-01-03T00:00:00",
            updated_at="2025-01-03T00:00:00",
            is_active=True
        )
    ]
    
    # Apply filters
    if farm_id:
        greenhouses = [gh for gh in greenhouses if gh.farm_id == farm_id]
    
    if name:
        greenhouses = [gh for gh in greenhouses if name.lower() in gh.name.lower()]
    
    if type:
        greenhouses = [gh for gh in greenhouses if gh.type == type]
    
    # Apply pagination
    paginated_greenhouses = greenhouses[skip : skip + limit]
    
    return GreenhouseList(greenhouses=paginated_greenhouses, total=len(greenhouses))


@router.post("/", response_model=Greenhouse)
def create_greenhouse(
    *,
    db: Session = Depends(get_db),
    greenhouse_in: GreenhouseCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create new greenhouse
    """
    # Generate ID if not provided
    greenhouse_id = greenhouse_in.id or f"gh_{str(uuid4())[:8]}"
    
    # In a real app, you would create the greenhouse in the database
    greenhouse = Greenhouse(
        id=greenhouse_id,
        farm_id=greenhouse_in.farm_id,
        name=greenhouse_in.name,
        type=greenhouse_in.type,
        area=greenhouse_in.area,
        height=greenhouse_in.height,
        length=greenhouse_in.length,
        width=greenhouse_in.width,
        chapel_width=greenhouse_in.chapel_width,
        num_rows=greenhouse_in.num_rows,
        row_orientation=greenhouse_in.row_orientation,
        structure_type=greenhouse_in.structure_type,
        created_at="2025-03-29T12:00:00",
        updated_at="2025-03-29T12:00:00",
        is_active=True
    )
    
    return greenhouse


@router.get("/{greenhouse_id}", response_model=Greenhouse)
def get_greenhouse(
    *,
    db: Session = Depends(get_db),
    greenhouse_id: str = Path(..., description="The ID of the greenhouse to get"),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get a specific greenhouse by ID
    """
    # This is a mock implementation for the template
    # In a real app, you would query the database
    if greenhouse_id not in ["gh1", "gh2", "gh3"]:
        raise NotFoundError(f"Greenhouse with ID {greenhouse_id} not found")
    
    greenhouse_map = {
        "gh1": Greenhouse(
            id="gh1",
            farm_id="farm1",
            name="Greenhouse 1",
            type="Type_Serre_A",
            area=500.0,
            height=4.0,
            length=50.0,
            width=10.0,
            num_rows=10,
            row_orientation="North-South",
            created_at="2025-01-01T00:00:00",
            updated_at="2025-01-01T00:00:00",
            is_active=True
        ),
        "gh2": Greenhouse(
            id="gh2",
            farm_id="farm1",
            name="Greenhouse 2",
            type="Type_Serre_B",
            area=600.0,
            height=5.0,
            length=60.0,
            width=10.0,
            num_rows=12,
            row_orientation="East-West",
            created_at="2025-01-02T00:00:00",
            updated_at="2025-01-02T00:00:00",
            is_active=True
        ),
        "gh3": Greenhouse(
            id="gh3",
            farm_id="farm2",
            name="Greenhouse 3",
            type="Type_Serre_A",
            area=450.0,
            height=4.0,
            length=45.0,
            width=10.0,
            num_rows=9,
            row_orientation="North-South",
            created_at="2025-01-03T00:00:00",
            updated_at="2025-01-03T00:00:00",
            is_active=True
        )
    }
    
    return greenhouse_map[greenhouse_id]


@router.put("/{greenhouse_id}", response_model=Greenhouse)
def update_greenhouse(
    *,
    db: Session = Depends(get_db),
    greenhouse_id: str = Path(..., description="The ID of the greenhouse to update"),
    greenhouse_in: GreenhouseUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update a greenhouse
    """
    # Check if greenhouse exists
    if greenhouse_id not in ["gh1", "gh2", "gh3"]:
        raise NotFoundError(f"Greenhouse with ID {greenhouse_id} not found")
    
    # Get current greenhouse data
    greenhouse_map = {
        "gh1": {
            "farm_id": "farm1",
            "name": "Greenhouse 1",
            "type": "Type_Serre_A",
            "area": 500.0,
            "height": 4.0,
            "length": 50.0,
            "width": 10.0,
            "num_rows": 10,
            "row_orientation": "North-South",
        },
        "gh2": {
            "farm_id": "farm1",
            "name": "Greenhouse 2",
            "type": "Type_Serre_B",
            "area": 600.0,
            "height": 5.0,
            "length": 60.0,
            "width": 10.0,
            "num_rows": 12,
            "row_orientation": "East-West",
        },
        "gh3": {
            "farm_id": "farm2",
            "name": "Greenhouse 3",
            "type": "Type_Serre_A",
            "area": 450.0,
            "height": 4.0,
            "length": 45.0,
            "width": 10.0,
            "num_rows": 9,
            "row_orientation": "North-South",
        }
    }
    
    current_data = greenhouse_map[greenhouse_id]
    
    # Update fields if provided
    greenhouse = Greenhouse(
        id=greenhouse_id,
        farm_id=current_data["farm_id"],
        name=greenhouse_in.name or current_data["name"],
        type=greenhouse_in.type or current_data["type"],
        area=greenhouse_in.area or current_data["area"],
        height=greenhouse_in.height or current_data["height"],
        length=greenhouse_in.length or current_data["length"],
        width=greenhouse_in.width or current_data["width"],
        num_rows=greenhouse_in.num_rows or current_data["num_rows"],
        row_orientation=greenhouse_in.row_orientation or current_data["row_orientation"],
        structure_type=greenhouse_in.structure_type,
        created_at="2025-01-01T00:00:00",
        updated_at="2025-03-29T12:00:00",
        is_active=greenhouse_in.is_active if greenhouse_in.is_active is not None else True
    )
    
    return greenhouse


@router.delete("/{greenhouse_id}", response_model=Greenhouse)
def delete_greenhouse(
    *,
    db: Session = Depends(get_db),
    greenhouse_id: str = Path(..., description="The ID of the greenhouse to delete"),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Delete a greenhouse
    """
    # Check if greenhouse exists
    if greenhouse_id not in ["gh1", "gh2", "gh3"]:
        raise NotFoundError(f"Greenhouse with ID {greenhouse_id} not found")
    
    # Get current greenhouse data
    greenhouse_map = {
        "gh1": {
            "farm_id": "farm1",
            "name": "Greenhouse 1",
            "type": "Type_Serre_A",
            "area": 500.0,
            "height": 4.0,
            "length": 50.0,
            "width": 10.0,
            "num_rows": 10,
            "row_orientation": "North-South",
        },
        "gh2": {
            "farm_id": "farm1",
            "name": "Greenhouse 2",
            "type": "Type_Serre_B",
            "area": 600.0,
            "height": 5.0,
            "length": 60.0,
            "width": 10.0,
            "num_rows": 12,
            "row_orientation": "East-West",
        },
        "gh3": {
            "farm_id": "farm2",
            "name": "Greenhouse 3",
            "type": "Type_Serre_A",
            "area": 450.0,
            "height": 4.0,
            "length": 45.0,
            "width": 10.0,
            "num_rows": 9,
            "row_orientation": "North-South",
        }
    }
    
    current_data = greenhouse_map[greenhouse_id]
    
    # Mark as inactive
    greenhouse = Greenhouse(
        id=greenhouse_id,
        farm_id=current_data["farm_id"],
        name=current_data["name"],
        type=current_data["type"],
        area=current_data["area"],
        height=current_data["height"],
        length=current_data["length"],
        width=current_data["width"],
        num_rows=current_data["num_rows"],
        row_orientation=current_data["row_orientation"],
        created_at="2025-01-01T00:00:00",
        updated_at="2025-03-29T12:00:00",
        is_active=False
    )
    
    return greenhouse


# Planting endpoints
@router.get("/{greenhouse_id}/plantings", response_model=PlantingList)
def list_plantings(
    *,
    db: Session = Depends(get_db),
    greenhouse_id: str = Path(..., description="The ID of the greenhouse"),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    List plantings for a greenhouse
    """
    # Mock plantings
    plantings = [
        Planting(
            id="planting1",
            greenhouse_id=greenhouse_id,
            plant_type="Tomate",
            plant_variety="Cherry",
            planting_date="2025-02-01T00:00:00",
            plant_count=1200,
            density=2.4,
            created_at="2025-02-01T00:00:00",
            updated_at="2025-02-01T00:00:00"
        ),
        Planting(
            id="planting2",
            greenhouse_id=greenhouse_id,
            plant_type="Concombre",
            plant_variety="English",
            planting_date="2025-03-15T00:00:00",
            plant_count=900,
            density=2.0,
            created_at="2025-03-15T00:00:00",
            updated_at="2025-03-15T00:00:00"
        )
    ]
    
    return PlantingList(plantings=plantings, total=len(plantings))