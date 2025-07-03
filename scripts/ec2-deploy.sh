#!/bin/bash

# EC2 Deployment script for AetherInc
# This script helps build and deploy the Docker image to an EC2 instance

# Set the Docker path for Mac
DOCKER="/Applications/Docker.app/Contents/Resources/bin/docker"
DOCKER_COMPOSE="/Applications/Docker.app/Contents/Resources/bin/docker compose"

# Stop any running containers
echo "🛑 Stopping existing containers..."
$DOCKER_COMPOSE -f docker-compose.prod.yml down || echo "No containers to stop"

# Build the Docker image for production
echo "🏗️ Building Docker image for production..."
$DOCKER_COMPOSE -f docker-compose.prod.yml build

# Check if build succeeded
if [ $? -ne 0 ]; then
  echo "❌ Build failed! Exiting."
  exit 1
fi

# Get the name of the web service image
IMAGE_NAME=$($DOCKER images --format "{{.Repository}}:{{.Tag}}" | grep "aetherinc_web" | head -1)
if [ -z "$IMAGE_NAME" ]; then
  echo "❌ Could not find built image. Looking for any recent builds..."
  IMAGE_NAME=$($DOCKER images --format "{{.Repository}}:{{.Tag}}" | grep "web" | head -1)
  
  if [ -z "$IMAGE_NAME" ]; then
    echo "❌ No suitable image found. Exiting."
    exit 1
  fi
fi

echo "✅ Found image: $IMAGE_NAME"

# Tag the image
echo "🏷️ Tagging Docker image..."
$DOCKER tag "$IMAGE_NAME" aetherinc:production

# Save the image to a compressed tarball
echo "📦 Saving Docker image to a compressed tarball..."
$DOCKER save aetherinc:production | gzip > aetherinc-production.tar.gz

# Verify the tarball was created
if [ ! -f aetherinc-production.tar.gz ]; then
  echo "❌ Failed to create Docker image tarball!"
  exit 1
fi

echo "✅ Docker image saved to aetherinc-production.tar.gz ($(du -h aetherinc-production.tar.gz | cut -f1))"

# Make sure .gitattributes includes LFS configuration for the Docker image
if [ ! -f ".gitattributes" ] || ! grep -q "*.tar.gz filter=lfs" .gitattributes; then
  echo "📝 Configuring Git LFS for large files..."
  echo "*.tar.gz filter=lfs diff=lfs merge=lfs -text" >> .gitattributes
  
  # Initialize Git LFS if not already done
  if ! command -v git-lfs &> /dev/null || ! git lfs status &> /dev/null; then
    echo "⚠️ Git LFS is not installed or initialized. Installing and initializing..."
    # Try to install Git LFS if it's not installed
    if [ "$(uname)" == "Darwin" ]; then
      # macOS
      brew install git-lfs || echo "⚠️ Please install Git LFS manually: https://git-lfs.github.com/"
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
      # Linux
      apt-get update && apt-get install -y git-lfs || echo "⚠️ Please install Git LFS manually: https://git-lfs.github.com/"
    fi
    git lfs install
  fi
fi

# Add the Docker image to git
echo "📤 Adding Docker image to Git..."
git add aetherinc-production.tar.gz
git add docker-compose.prod.yml
git add scripts/ec2-deploy.sh
git add .gitattributes 2>/dev/null || true

# Commit the changes
echo "💾 Committing changes..."
git commit -m "Add production Docker image for EC2 deployment"

# Push to remote repository
echo "🚀 Pushing to remote repository..."
git push origin main

echo "✅ Docker image built, compressed, and pushed to Git repository!"
echo "📝 Instructions for EC2 deployment:"
echo "1. On your EC2 instance, pull the latest repository changes:"
echo "   git pull origin main"
echo ""
echo "2. Extract the Docker image:"
echo "   gunzip -c aetherinc-production.tar.gz | docker load"
echo ""
echo "3. Make sure you have the .env.production file in place with proper values"
echo ""
echo "4. Run the application:"
echo "   docker compose -f docker-compose.prod.yml up -d"
echo ""
echo "Your application should be available through the configured Nginx server" 