# Prediction schemas

from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field, ConfigDict
from datetime import date, datetime


class PredictionInput(BaseModel):
    """Input schema for prediction endpoints"""
    greenhouse_id: Optional[str] = None
    date: Optional[date] = None
    
    # Environmental factors
    temp_max: Optional[float] = Field(None, description="Maximum temperature (°C)")
    temp_min: Optional[float] = Field(None, description="Minimum temperature (°C)")
    temp_avg: Optional[float] = Field(None, description="Average temperature (°C)")
    humidity_max: Optional[float] = Field(None, description="Maximum humidity (%)")
    humidity_min: Optional[float] = Field(None, description="Minimum humidity (%)")
    humidity_avg: Optional[float] = Field(None, description="Average humidity (%)")
    
    # Greenhouse specific data
    greenhouse_area: Optional[float] = Field(None, description="Greenhouse area (m²)")
    plant_count: Optional[int] = Field(None, description="Number of plants")
    greenhouse_type: Optional[str] = Field(None, description="Type of greenhouse")
    plant_type: Optional[str] = Field(None, description="Type of plant")
    plant_variety: Optional[str] = Field(None, description="Variety of plant")
    planting_date: Optional[date] = Field(None, description="Date of planting")
    
    # Custom features
    features: Optional[Dict[str, Any]] = Field(None, description="Additional features for prediction")
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "greenhouse_id": "GH001",
                "date": "2025-03-15",
                "temp_max": 30.5,
                "temp_min": 18.2,
                "temp_avg": 24.3,
                "humidity_max": 85.0,
                "humidity_min": 55.0,
                "humidity_avg": 70.0,
                "greenhouse_area": 500.0,
                "plant_count": 1200,
                "greenhouse_type": "Type_Serre_A",
                "plant_type": "Tomate",
                "plant_variety": "Cherry",
                "planting_date": "2025-02-01",
                "features": {
                    "water_consumption": 250.5,
                    "fertilizer_amount": 45.2
                }
            }
        }
    )


class PredictionResult(BaseModel):
    """Output schema for prediction results"""
    prediction: float = Field(..., description="Predicted value")
    confidence: Optional[float] = Field(None, description="Confidence score (0-1)")
    prediction_date: datetime = Field(..., description="Date of prediction")
    model_version: Optional[str] = Field(None, description="Version of the model used")
    features_importance: Optional[Dict[str, float]] = Field(None, description="Importance of each feature")
    
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "prediction": 120.5,
                "confidence": 0.85,
                "prediction_date": "2025-03-29T12:00:00",
                "model_version": "1.0.0",
                "features_importance": {
                    "temp_avg": 0.35,
                    "humidity_avg": 0.25,
                    "plant_count": 0.20,
                    "water_consumption": 0.15,
                    "fertilizer_amount": 0.05
                }
            }
        }
    )


class PredictionHistory(BaseModel):
    """Schema for prediction history results"""
    predictions: List[PredictionResult]
    total: int