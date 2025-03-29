# OpenFirma Smart Farm API

Backend API for the OpenFirma Smart Farm application.

## Features

- Farm management
- Greenhouse monitoring
- Environmental data tracking
- Yield prediction
- Growth rate analysis

## Tech Stack

- **FastAPI** - Modern web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation and settings management
- **Alembic** - Database migrations
- **Docker** - Containerization

## Getting Started

### Prerequisites

- Python 3.11
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/openfirma.git
   cd openfirma/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on the example:
   ```bash
   cp ../.env.example .env
   ```

5. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

### Using Docker

1. Build and start the Docker containers:
   ```bash
   docker-compose up -d
   ```

2. The API will be available at: http://localhost:8000
3. API documentation will be at: http://localhost:8000/docs
4. PgAdmin will be available at: http://localhost:5050 (Email: admin@openfirma.com, Password: admin)

## Project Structure

```
backend/
├── app/
│   ├── api/               # API endpoints
│   ├── core/              # Core application code
│   ├── db/                # Database models and sessions
│   ├── ml/                # Machine learning models
│   ├── schemas/           # Pydantic schemas
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   └── main.py            # Application entry point
├── tests/                 # Tests
├── alembic/               # Database migrations
├── configs/               # Configuration files
├── docker-compose.yml
├── Dockerfile
└── requirements.txt
```

## Database Migrations

```bash
# Initialize migrations
alembic init alembic

# Create a migration
alembic revision --autogenerate -m "Initial migration"

# Run migrations
alembic upgrade head
```

## API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Development

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
# Format code
black app tests

# Sort imports
isort app tests
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.