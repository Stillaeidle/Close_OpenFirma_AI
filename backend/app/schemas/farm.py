# Farm schemas

from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class FarmBase(BaseModel):
    name: str
    location: Optional[str] = None
    area: Optional[float] = None


class FarmCreate(FarmBase):
    id: Optional[str] = None


class FarmUpdate(FarmBase):
    name: Optional[str] = None
    is_active: Optional[bool] = None


class Farm(FarmBase):
    id: str
    created_at: datetime
    updated_at: datetime
    is_active: bool = True

    model_config = ConfigDict(from_attributes=True)


class FarmList(BaseModel):
    farms: List[Farm]
    total: int