-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create roles and permissions if needed
-- GRANT ALL PRIVILEGES ON DATABASE openfirma TO postgres;

-- Add any additional initialization SQL here

-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS openfirma;

-- Set default permissions for new objects
ALTER DEFAULT PRIVILEGES IN SCHEMA openfirma GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA openfirma GRANT USAGE, SELECT ON SEQUENCES TO postgres;
