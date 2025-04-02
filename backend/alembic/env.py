# alembic/env.py
import os
import sys
from logging.config import fileConfig
from dotenv import load_dotenv
load_dotenv()

from alembic import context
from sqlalchemy import engine_from_config, pool
from sqlalchemy.engine import Connection

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), "app"))

# Import your SQLAlchemy models
from app.db.models import farm, greenhouse, measurement  # Import all model modules
from app.db.session import Base  # Import your declarative base

# this is the Alembic Config object
config = context.config

# Load DB URL from environment variable
db_user = os.getenv("POSTGRES_USER", "postgres")
db_password = os.getenv("POSTGRES_PASSWORD", "postgres")
db_host = os.getenv("POSTGRES_SERVER", "db")
db_port = os.getenv("POSTGRES_PORT", "5432")
db_name = os.getenv("POSTGRES_DB", "openfirma_dev")

# Use synchronous PostgreSQL driver
db_url = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
config.set_main_option("sqlalchemy.url", db_url)

# Interpret the config file for Python logging
fileConfig(config.config_file_name)

# Set target metadata
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()