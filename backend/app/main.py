# FastAPI application entry point

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html
from fastapi.staticfiles import StaticFiles

from app.api.api import api_router
from app.core.config import settings

# Create FastAPI app with metadata
app = FastAPI(
    title=settings.APP_NAME,
    description="""
    # OpenFirma Smart Farm API
    
    This API provides endpoints to monitor and predict greenhouse performance in smart farms.
    
    ## Key Features
    
    * **Farm Management** - Monitor and manage farm data
    * **Greenhouse Monitoring** - Track environmental conditions in greenhouses
    * **Yield Prediction** - AI-based predictions for crop yield
    * **Growth Rate Analysis** - Monitor and predict plant growth rates
    """,
    version="0.1.0",
    openapi_url="/api/openapi.json",
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api")

# Mount static files if they exist
try:
    app.mount("/static", StaticFiles(directory="static"), name="static")
except RuntimeError:
    # Static directory not found, skipping
    pass

@app.get("/")
def root():
    return {
        "status": "online",
        "message": "Welcome to OpenFirma Smart Farm API",
        "documentation": "/docs",
        "version": app.version
    }

# Add startup event
@app.on_event("startup")
async def startup_event():
    print(f"Starting {settings.APP_NAME} {app.version}")