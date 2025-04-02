#!/bin/bash
set -e

# Run migrations
echo "Running database migrations..."
alembic upgrade head

# Start the application with hot reload for development
echo "Starting application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload