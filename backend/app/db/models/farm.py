# Farm model

from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base


class Farm(Base):
    """Farm model representing a farm in the system"""
    __tablename__ = "farms"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    location = Column(String)
    area = Column(Float)  # in hectares
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    is_active = Column(Boolean, default=True)
    
    # Relationships
    greenhouses = relationship("Greenhouse", back_populates="farm", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Farm {self.name}>"

__all__ = ["Farm"]