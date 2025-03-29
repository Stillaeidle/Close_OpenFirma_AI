# ML prediction endpoints

from datetime import datetime
from typing import Any, List, Optional
from uuid import uuid4

from fastapi import APIRouter, Depends, Query, Path, Body
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.core.errors import NotFoundError, PredictionError
from app.schemas.prediction import PredictionInput, PredictionResult, PredictionHistory
from app.schemas.auth_schemas import User

router = APIRouter()


@router.post("/yield", response_model=PredictionResult)
def predict_yield(
    *,
    db: Session = Depends(get_db),
    input_data: PredictionInput = Body(...),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Predict crop yield based on greenhouse data and environmental factors
    """
    try:
        # Mock prediction result
        # In a real app, you would call your ML model
        result = PredictionResult(
            prediction=120.5,
            confidence=0.85,
            prediction_date=datetime.now(),
            model_version="0.1.0",
            features_importance={
                "temp_avg": 0.35,
                "humidity_avg": 0.25,
                "plant_count": 0.20,
                "water_consumption": 0.15,
                "fertilizer_amount": 0.05
            }
        )
        return result
    except Exception as e:
        raise PredictionError(f"Error making yield prediction: {str(e)}")


@router.post("/growth-rate", response_model=PredictionResult)
def predict_growth_rate(
    *,
    db: Session = Depends(get_db),
    input_data: PredictionInput = Body(...),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Predict plant growth rate based on environmental conditions
    """
    try:
        # Mock prediction result
        # In a real app, you would call your ML model
        result = PredictionResult(
            prediction=0.75,  # cm/day
            confidence=0.80,
            prediction_date=datetime.now(),
            model_version="0.1.0",
            features_importance={
                "temp_avg": 0.40,
                "humidity_avg": 0.30,
                "water_consumption": 0.20,
                "solar_radiation": 0.10
            }
        )
        return result
    except Exception as e:
        raise PredictionError(f"Error making growth rate prediction: {str(e)}")


@router.get("/greenhouse/{greenhouse_id}/history", response_model=PredictionHistory)
def get_prediction_history(
    *,
    db: Session = Depends(get_db),
    greenhouse_id: str = Path(..., description="The ID of the greenhouse"),
    start_date: Optional[datetime] = Query(None, description="Start date for filtering history"),
    end_date: Optional[datetime] = Query(None, description="End date for filtering history"),
    limit: int = Query(10, ge=1, le=100, description="Maximum number of records to return"),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get prediction history for a greenhouse
    """
    # Check if greenhouse exists
    if greenhouse_id not in ["gh1", "gh2", "gh3"]:
        raise NotFoundError(f"Greenhouse with ID {greenhouse_id} not found")
    
    # Mock prediction history
    predictions = [
        PredictionResult(
            prediction=120.5,
            confidence=0.85,
            prediction_date=datetime.fromisoformat("2025-03-01T12:00:00"),
            model_version="0.1.0",
            features_importance={
                "temp_avg": 0.35,
                "humidity_avg": 0.25,
                "plant_count": 0.20,
                "water_consumption": 0.15,
                "fertilizer_amount": 0.05
            }
        ),
        PredictionResult(
            prediction=125.2,
            confidence=0.82,
            prediction_date=datetime.fromisoformat("2025-03-15T12:00:00"),
            model_version="0.1.0",
            features_importance={
                "temp_avg": 0.35,
                "humidity_avg": 0.25,
                "plant_count": 0.20,
                "water_consumption": 0.15,
                "fertilizer_amount": 0.05
            }
        ),
        PredictionResult(
            prediction=118.7,
            confidence=0.88,
            prediction_date=datetime.fromisoformat("2025-03-29T12:00:00"),
            model_version="0.1.0",
            features_importance={
                "temp_avg": 0.35,
                "humidity_avg": 0.25,
                "plant_count": 0.20,
                "water_consumption": 0.15,
                "fertilizer_amount": 0.05
            }
        )
    ]
    
    # Apply date filtering if provided
    if start_date:
        predictions = [p for p in predictions if p.prediction_date >= start_date]
    
    if end_date:
        predictions = [p for p in predictions if p.prediction_date <= end_date]
    
    # Apply limit
    predictions = predictions[:limit]
    
    return PredictionHistory(predictions=predictions, total=len(predictions))