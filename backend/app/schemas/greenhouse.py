# Greenhouse schemas

from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field


class GreenhouseBase(BaseModel):
    farm_id: str
    name: str
    type: Optional[str] = None
    area: Optional[float] = None
    height: Optional[float] = None
    length: Optional[float] = None
    width: Optional[float] = None
    chapel_width: Optional[float] = None
    num_rows: Optional[int] = None
    row_orientation: Optional[str] = None
    structure_type: Optional[str] = None


class GreenhouseCreate(GreenhouseBase):
    id: Optional[str] = None


class GreenhouseUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    area: Optional[float] = None
    height: Optional[float] = None
    length: Optional[float] = None
    width: Optional[float] = None
    chapel_width: Optional[float] = None
    num_rows: Optional[int] = None
    row_orientation: Optional[str] = None
    structure_type: Optional[str] = None
    is_active: Optional[bool] = None


class Greenhouse(GreenhouseBase):
    id: str
    created_at: datetime
    updated_at: datetime
    is_active: bool = True

    class Config:
        orm_mode = True


class GreenhouseList(BaseModel):
    greenhouses: List[Greenhouse]
    total: int


# Planting schemas
class PlantingBase(BaseModel):
    greenhouse_id: str
    plant_type: str
    plant_variety: Optional[str] = None
    planting_date: datetime
    harvest_start_date: Optional[datetime] = None
    harvest_end_date: Optional[datetime] = None
    plant_count: Optional[int] = None
    density: Optional[float] = None
    support_type: Optional[str] = None
    mulch_type: Optional[str] = None
    notes: Optional[str] = None


class PlantingCreate(PlantingBase):
    id: Optional[str] = None


class PlantingUpdate(BaseModel):
    plant_type: Optional[str] = None
    plant_variety: Optional[str] = None
    planting_date: Optional[datetime] = None
    harvest_start_date: Optional[datetime] = None
    harvest_end_date: Optional[datetime] = None
    plant_count: Optional[int] = None
    density: Optional[float] = None
    support_type: Optional[str] = None
    mulch_type: Optional[str] = None
    notes: Optional[str] = None


class Planting(PlantingBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class PlantingList(BaseModel):
    plantings: List[Planting]
    total: int