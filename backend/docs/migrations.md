# Database Migrations with Alembic

This document describes how to work with database migrations using Alembic.

## Creating a New Migration

To create a new migration after making changes to your SQLAlchemy models:

```bash
alembic revision --autogenerate -m "description of changes"
```

This will create a new migration script in the `alembic/versions` directory.

## Applying Migrations

To apply all pending migrations:

```bash
alembic upgrade head
```

To apply migrations up to a specific revision:

```bash
alembic upgrade <revision_id>
```

## Rolling Back Migrations

To roll back the last migration:

```bash
alembic downgrade -1
```

To roll back to a specific revision:

```bash
alembic downgrade <revision_id>
```

## Viewing Migration History

To see the current revision:

```bash
alembic current
```

To see the migration history:

```bash
alembic history
```

## Working with Docker

When running the application with Docker, migrations are automatically applied on startup. To manually apply migrations in the Docker environment:

```bash
docker-compose exec backend alembic upgrade head
```