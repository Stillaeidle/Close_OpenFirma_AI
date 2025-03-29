# Measurements model

from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base


class Measurement(Base):
    """Measurement model for environmental data"""
    __tablename__ = "measurements"
    
    id = Column(String, primary_key=True, index=True)
    greenhouse_id = Column(String, ForeignKey("greenhouses.id"), nullable=False)
    date = Column(DateTime, nullable=False)
    
    # Temperature measurements
    temp_max_ext = Column(Float, nullable=True)  # Max external temperature (°C)
    temp_min_ext = Column(Float, nullable=True)  # Min external temperature (°C)
    temp_avg_ext = Column(Float, nullable=True)  # Average external temperature (°C)
    temp_max_int = Column(Float, nullable=True)  # Max internal temperature (°C)
    temp_min_int = Column(Float, nullable=True)  # Min internal temperature (°C)
    temp_avg_int = Column(Float, nullable=True)  # Average internal temperature (°C)
    
    # Humidity measurements
    humidity_max_ext = Column(Float, nullable=True)  # Max external humidity (%)
    humidity_min_ext = Column(Float, nullable=True)  # Min external humidity (%)
    humidity_avg_ext = Column(Float, nullable=True)  # Average external humidity (%)
    humidity_max_int = Column(Float, nullable=True)  # Max internal humidity (%)
    humidity_min_int = Column(Float, nullable=True)  # Min internal humidity (%)
    humidity_avg_int = Column(Float, nullable=True)  # Average internal humidity (%)
    
    # Other environmental factors
    solar_radiation = Column(Float, nullable=True)  # Solar radiation (W/m²)
    wind_speed = Column(Float, nullable=True)  # Wind speed (m/s)
    etp = Column(Float, nullable=True)  # Evapotranspiration (mm)
    etc = Column(Float, nullable=True)  # Crop evapotranspiration (mm)
    gdd = Column(Float, nullable=True)  # Growing degree days
    
    # Water and fertilizer data
    water_morning = Column(Float, nullable=True)  # Morning water usage (L)
    water_evening = Column(Float, nullable=True)  # Evening water usage (L)
    total_water = Column(Float, nullable=True)  # Total water usage (L)
    
    # Store fertilizer data in JSON format for flexibility
    fertilizers = Column(JSON, nullable=True)  # Fertilizer usage in JSON format
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    greenhouse = relationship("Greenhouse", back_populates="measurements")
    
    def __repr__(self):
        return f"<Measurement {self.id} for Greenhouse {self.greenhouse_id} on {self.date}>"