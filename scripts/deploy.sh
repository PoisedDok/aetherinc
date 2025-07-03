#!/bin/bash

# Deploy script for AetherInc Next.js Docker deployment
# This script builds and deploys the application to production

set -e

# Print colored status messages
print_status() {
  echo -e "\e[1;34m>>> $1\e[0m"
}

print_error() {
  echo -e "\e[1;31m>>> ERROR: $1\e[0m"
}

print_success() {
  echo -e "\e[1;32m>>> $1\e[0m"
}

# Check if running with root privileges
if [ "$(id -u)" -eq 0 ]; then
  print_error "This script should not be run as root"
  exit 1
fi

# Check if .env.production exists
if [ ! -f .env.production ]; then
  print_error ".env.production file not found"
  print_status "Please create .env.production file first"
  exit 1
fi

# Pull latest changes if in a git repository
if [ -d .git ]; then
  print_status "Pulling latest changes from git repository..."
  git pull
fi

# Check for Docker and Docker Compose
if ! command -v docker &> /dev/null; then
  print_error "Docker is not installed"
  exit 1
fi

if ! command -v docker-compose &> /dev/null; then
  print_error "Docker Compose is not installed"
  exit 1
fi

# Build and deploy with Docker Compose
print_status "Building Docker images..."
docker-compose build

print_status "Stopping existing containers..."
docker-compose down || true

print_status "Starting containers..."
docker-compose up -d

# Check if application is running
print_status "Checking application health..."
sleep 10

if curl -s http://localhost:3000/api/health &> /dev/null; then
  print_success "Application deployed successfully!"
  print_success "Check application at: http://localhost:3000"
else
  print_error "Application may not have started properly"
  print_status "Check logs with: docker-compose logs -f"
fi

# Show container status
print_status "Container status:"
docker-compose ps

print_status "Deployment complete!" 