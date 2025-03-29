#!/bin/bash
# Setup script for OpenAPI documentation static files
# This script creates and populates the static directory for Swagger UI and ReDoc

# Navigate to project root (assuming script is run from scripts/ directory)
cd "$(dirname "$0")/.."

# Create static directory inside backend
mkdir -p backend/static
cd backend/static

echo "Creating static assets for API documentation..."

# Download Swagger UI files
echo "Downloading Swagger UI assets..."
curl -L https://unpkg.com/swagger-ui-dist@4.18.3/swagger-ui.css > swagger-ui.css
curl -L https://unpkg.com/swagger-ui-dist@4.18.3/swagger-ui-bundle.js > swagger-ui-bundle.js
curl -L https://unpkg.com/swagger-ui-dist@4.18.3/favicon-32x32.png > favicon.png

# Download ReDoc files
echo "Downloading ReDoc assets..."
curl -L https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js > redoc.standalone.js

# Create a custom CSS file for Swagger UI
echo "Creating custom CSS..."
cat > custom-swagger.css << EOL
.swagger-ui .topbar {
  background-color: #2C3E50;
}

.swagger-ui .info .title {
  color: #2C3E50;
}

.swagger-ui .btn.execute {
  background-color: #27AE60;
}

.swagger-ui .info .title small.version-stamp {
  background-color: #27AE60;
}
EOL

# Add OpenFirma logo for branding
echo "Creating placeholder for logo..."
cat > openfirma-logo.svg << EOL
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <rect width="200" height="50" fill="#2C3E50"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-family="Arial" font-size="20">OpenFirma</text>
</svg>
EOL

# Update .gitignore to handle these files
if ! grep -q "# API Documentation static files" "../../.gitignore"; then
  echo "" >> ../../.gitignore
  echo "# API Documentation static files" >> ../../.gitignore
  echo "/backend/static/swagger-ui.css" >> ../../.gitignore
  echo "/backend/static/swagger-ui-bundle.js" >> ../../.gitignore
  echo "/backend/static/redoc.standalone.js" >> ../../.gitignore
  echo "/backend/static/favicon.png" >> ../../.gitignore
fi

# Return to the original directory
cd "$(dirname "$0")/.."

echo "Static files for API documentation have been set up successfully!"
echo "Don't forget to update main.py to mount the static directory correctly."