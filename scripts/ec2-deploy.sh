#!/bin/bash

# EC2 Deployment script for AetherInc
# This script helps build and deploy the Docker image to an EC2 instance

# Build the Docker image for production
echo "🏗️ Building Docker image for production..."
docker compose -f docker-compose.prod.yml build

# Tag the image
echo "🏷️ Tagging Docker image..."
docker tag aetherinc_web:latest aetherinc:production

# Save the image to a compressed tarball
echo "📦 Saving Docker image to a compressed tarball..."
docker save aetherinc:production | gzip > aetherinc-production.tar.gz

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