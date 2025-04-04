# Main router for the API

from fastapi import APIRouter

from app.api.endpoints import farms, greenhouses, predictions, auth, db

api_router = APIRouter()

# Include routers from endpoints
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(farms.router, prefix="/farms", tags=["farms"])
api_router.include_router(greenhouses.router, prefix="/greenhouses", tags=["greenhouses"])
api_router.include_router(predictions.router, prefix="/predictions", tags=["predictions"])
api_router.include_router(db.router, prefix="/db", tags=["database"])

# Health check endpoint
@api_router.get("/health", tags=["health"])
def health_check():
    return {"status": "healthy"}