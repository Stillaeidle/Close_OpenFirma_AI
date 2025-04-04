#!/bin/bash
set -e

# Run migrations
echo "Running database migrations..."
alembic upgrade head

# Start the application based on environment
if [ "$ENVIRONMENT" = "development" ]; then
    echo "Starting development server..."
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
else
    echo "Starting production server..."
    uvicorn app.main:app --host 0.0.0.0 --port 8000
fi