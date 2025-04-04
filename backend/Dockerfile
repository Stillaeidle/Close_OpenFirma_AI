FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set Python environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV ENVIRONMENT production

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create directory for ML models if it doesn't exist
RUN mkdir -p app/ml/models

# Create scripts directory and add start.sh script
RUN mkdir -p scripts
COPY scripts/start.sh scripts/start.sh
RUN chmod +x scripts/start.sh

# Expose port
EXPOSE 8000

# Use start script to run migrations before starting app
CMD ["./scripts/start.sh"]