#!/bin/bash
set -e

# Define variables
REPO_NAME=${GITHUB_REPOSITORY:-aetherinc/aetherinc}
IMAGE_NAME="ghcr.io/$REPO_NAME:latest"

# Login to GitHub Container Registry
# Note: You need to have a GitHub PAT with packages:read scope set as GITHUB_TOKEN
if [ -n "$GITHUB_TOKEN" ]; then
  echo "Logging into GitHub Container Registry..."
  echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin
else
  echo "No GITHUB_TOKEN found. Make sure you're logged in to ghcr.io"
fi

# Pull the latest image
echo "Pulling latest image: $IMAGE_NAME"
docker pull $IMAGE_NAME

# Check if .env.production exists, if not create a template
if [ ! -f .env.production ]; then
  echo "Creating template .env.production file..."
  cp .env.example .env.production 2>/dev/null || echo "# Environment Variables" > .env.production
  echo "PLEASE EDIT .env.production WITH YOUR PRODUCTION SETTINGS BEFORE CONTINUING"
  exit 1
fi

# Create or update docker-compose.yml to use the production settings
echo "Setting up docker-compose.yml for production..."
cat > docker-compose.yml <<EOL
version: '3.8'

services:
  # Next.js web application
  web:
    image: $IMAGE_NAME
    env_file:
      - .env.production
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/aether?schema=public
      - NEXTAUTH_URL=\${NEXTAUTH_URL:-https://aetherinc.xyz}
      - NEXT_PUBLIC_API_URL=https://aetherinc.xyz
      - ANALYTICS_ENABLED=true
      - CONTACT_FORM_ENABLED=true
    depends_on:
      - db
    restart: unless-stopped
    volumes:
      - ./scripts:/app/scripts
      - ./AI_Tools.xlsx:/app/AI_Tools.xlsx
    entrypoint: ["/app/scripts/docker-entrypoint.sh"]
    command: ["node", "server.js"]
    # Not exposing directly to host, only through Nginx

  # PostgreSQL database
  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=aether
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      
  # Nginx as reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
      - ./nginx/www:/var/www/html
    depends_on:
      - web
    restart: unless-stopped

volumes:
  postgres_data:
    driver: local
EOL

# Make sure nginx directories exist
mkdir -p nginx/conf.d nginx/ssl nginx/www

# Make sure scripts directory exists
mkdir -p scripts

# Check if we need to download AI_Tools.xlsx
if [ ! -f AI_Tools.xlsx ]; then
  echo "Warning: AI_Tools.xlsx not found. If this file is needed, please create it manually."
fi

# Run docker-compose
echo "Starting AetherInc services..."
docker-compose down || true
docker-compose up -d

echo "Deployment complete! Services should be running."
echo "To check container status: docker-compose ps"
echo "To view logs: docker-compose logs -f" 