#!/bin/bash

# EC2 Deployment script for AetherInc
# This script helps build and deploy the Docker image to an EC2 instance

# Set the Docker path for Mac
DOCKER="/Applications/Docker.app/Contents/Resources/bin/docker"
DOCKER_COMPOSE="/Applications/Docker.app/Contents/Resources/bin/docker compose"

# Ensure buildx builder exists and is used
if ! $DOCKER buildx inspect multiarch-builder >/dev/null 2>&1; then
  echo "🛠️  Creating multiarch buildx builder (multiarch-builder)..."
  $DOCKER buildx create --name multiarch-builder --use
else
  echo "🏗️  Using existing buildx builder (multiarch-builder)"
  $DOCKER buildx use multiarch-builder
fi

# Build the Docker image for production and export it as a tarball (AMD64 only)
echo "🏗️ Building AMD64 Docker image and exporting to tar..."
$DOCKER buildx build --platform linux/amd64 -t aetherinc:production \
  --output type=docker,dest=aetherinc-production-amd64.tar -f Dockerfile .

# Compress the tarball for transfer
gzip -f aetherinc-production-amd64.tar

# Verify the tarball was created
if [ ! -f aetherinc-production-amd64.tar.gz ]; then
  echo "❌ Failed to create Docker image tarball!"
  exit 1
fi

echo "✅ Docker image saved to aetherinc-production-amd64.tar.gz ($(du -h aetherinc-production-amd64.tar.gz | cut -f1))"

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
git add aetherinc-production-amd64.tar.gz
git add docker-compose.prod.yml
git add scripts/ec2-deploy.sh
git add .gitattributes 2>/dev/null || true

# Commit the changes
echo "💾 Committing changes..."
git commit -m "Add AMD64 production Docker image for EC2 deployment"

# Push to remote repository
echo "🚀 Pushing to remote repository..."
git push origin main

echo "✅ Docker images built, compressed, and pushed to Git repository!"
echo "📝 Instructions for EC2 deployment:"
echo "1. On your EC2 instance, pull the latest repository changes:"
echo "   git pull origin main"
echo ""
echo "2. Choose the appropriate image for your architecture:"
echo "   - For AMD64 (x86_64): gunzip -c aetherinc-production-amd64.tar.gz | docker load"
echo "   - For ARM64: gunzip -c aetherinc-production-arm64.tar.gz | docker load"
echo ""
echo "3. Make sure you have the .env.production file in place with proper values"
echo ""
echo "4. Run the application:"
echo "   docker compose -f docker-compose.prod.yml up -d"
echo ""
echo "Your application should be available through the configured Nginx server" 