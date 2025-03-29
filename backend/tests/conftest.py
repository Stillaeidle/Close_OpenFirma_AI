# Test configurations

import os
import sys
import pytest
from fastapi.testclient import TestClient

# Add the parent directory to the path so we can import app modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import the app after path adjustment
try:
    from app.main import app
except ImportError:
    # If there's an issue with importing the app, we'll provide a stub for testing
    print("Warning: Could not import app. Using test stub.")
    from fastapi import FastAPI
    app = FastAPI()

@pytest.fixture
def client():
    """Create a test client for the app."""
    with TestClient(app) as client:
        yield client