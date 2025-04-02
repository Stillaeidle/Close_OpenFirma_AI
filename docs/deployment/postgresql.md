# PostgreSQL Database Setup with Docker

This document explains how to set up and manage the PostgreSQL database using Docker for this application.

## Overview

The application uses PostgreSQL as its primary database, containerized with Docker for consistency across development, testing, and production environments.

## Prerequisites

- Docker and Docker Compose installed
- Basic knowledge of PostgreSQL
- Access to the project repository

## Environment Variables

The following environment variables are used for PostgreSQL configuration:

| Variable | Description | Default |
|----------|-------------|---------|
| POSTGRES_USER | Database username | postgres |
| POSTGRES_PASSWORD | Database password | postgres |
| POSTGRES_DB | Database name | app_db (varies by environment) |
| POSTGRES_SERVER | Database host | postgres |
| POSTGRES_PORT | Database port | 5432 |

## Setup Instructions

### 1. Development Environment

To set up the development environment with PostgreSQL:

```bash
# Create a .env file with your database credentials (optional)
cp .env.example .env

# Start the development environment
docker-compose -f docker-compose.dev.yml up -d
