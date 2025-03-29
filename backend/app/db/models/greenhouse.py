# Greenhouse model

from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base


class Greenhouse(Base):
    """Greenhouse model representing a greenhouse in a farm"""
    __tablename__ = "greenhouses"
    
    id = Column(String, primary_key=True, index=True)
    farm_id = Column(String, ForeignKey("farms.id"), nullable=False)
    name = Column(String, index=True)
    type = Column(String)  # Type of greenhouse
    area = Column(Float)  # in square meters
    height = Column(Float)  # in meters
    length = Column(Float)  # in meters
    width = Column(Float)  # in meters
    chapel_width = Column(Float, nullable=True)  # in meters
    num_rows = Column(Integer)  # Number of rows/billons
    row_orientation = Column(String, nullable=True)  # Orientation of rows
    structure_type = Column(String, nullable=True)  # Type of structure
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    farm = relationship("Farm", back_populates="greenhouses")
    measurements = relationship("Measurement", back_populates="greenhouse", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Greenhouse {self.name} in Farm {self.farm_id}>"


class Planting(Base):
    """Planting model representing a planting cycle in a greenhouse"""
    __tablename__ = "plantings"
    
    id = Column(String, primary_key=True, index=True)
    greenhouse_id = Column(String, ForeignKey("greenhouses.id"), nullable=False)
    plant_type = Column(String)  # Type of plant (e.g., "Tomate")
    plant_variety = Column(String)  # Variety of plant (e.g., "Cherry")
    planting_date = Column(DateTime, nullable=False)
    harvest_start_date = Column(DateTime, nullable=True)
    harvest_end_date = Column(DateTime, nullable=True)
    plant_count = Column(Integer)  # Number of plants
    density = Column(Float)  # Plants per square meter
    support_type = Column(String, nullable=True)  # Type of support for plants
    mulch_type = Column(String, nullable=True)  # Type of mulch
    notes = Column(Text, nullable=True)  # Additional notes
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    greenhouse = relationship("Greenhouse", back_populates="plantings")
    
    def __repr__(self):
        return f"<Planting {self.id} of {self.plant_type} in Greenhouse {self.greenhouse_id}>"

# Add Planting relationship to Greenhouse
Greenhouse.plantings = relationship("Planting", back_populates="greenhouse", cascade="all, delete-orphan")