#!/bin/bash

# SEO-Optimized Deployment Script for AetherInc
# This script builds and deploys the application with all SEO optimizations

set -e

echo "🚀 Starting SEO-optimized deployment for AetherInc..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
check_env_vars() {
    print_status "Checking environment variables..."

    required_vars=(
        "GOOGLE_SITE_VERIFICATION"
        "NEXT_PUBLIC_GA_ID"
        "NEXTAUTH_URL"
        "NEXT_PUBLIC_API_URL"
    )

    missing_vars=()

    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
        fi
    done

    if [ ${#missing_vars[@]} -ne 0 ]; then
        print_warning "Missing environment variables:"
        printf '  - %s\n' "${missing_vars[@]}"
        print_warning "Please set these in your .env.production file"
        print_warning "See SEO_ENV_VARS.md for details"
    else
        print_success "All required environment variables are set"
    fi
}

# Build the application
build_application() {
    print_status "Building Next.js application..."

    # Install dependencies
    npm ci

    # Generate Prisma client
    npx prisma generate

    # Build the application
    npm run build

    print_success "Application built successfully"
}

# Build Docker image
build_docker_image() {
    print_status "Building Docker image..."

    # Set Docker path for Mac
    DOCKER="/Applications/Docker.app/Contents/Resources/bin/docker"
    DOCKER_COMPOSE="/Applications/Docker.app/Contents/Resources/bin/docker compose"

    # Ensure buildx builder exists
    if ! $DOCKER buildx inspect multiarch-builder >/dev/null 2>&1; then
        print_status "Creating multiarch buildx builder..."
        $DOCKER buildx create --name multiarch-builder --use
    else
        print_status "Using existing buildx builder"
        $DOCKER buildx use multiarch-builder
    fi

    # Build the Docker image
    print_status "Building AMD64 Docker image..."
    $DOCKER buildx build --platform linux/amd64 -t aetherinc:production \
        --output type=docker,dest=aetherinc-production-amd64.tar -f Dockerfile .

    # Compress the tarball
    gzip -f aetherinc-production-amd64.tar

    print_success "Docker image built and compressed"
}

# Deploy to Git repository
deploy_to_git() {
    print_status "Deploying to Git repository..."

    # Add all files
    git add .

    # Commit changes
    git commit -m "🚀 SEO-optimized deployment $(date)"

    # Push to repository
    git push origin main

    print_success "Code deployed to repository"
}

# Print deployment summary
print_deployment_summary() {
    echo
    print_success "🎉 SEO-Optimized Deployment Complete!"
    echo
    echo "📋 SEO Features Implemented:"
    echo "  ✅ Dynamic sitemap.xml with all pages"
    echo "  ✅ robots.txt for crawler guidance"
    echo "  ✅ Open Graph images for social sharing"
    echo "  ✅ Comprehensive structured data (JSON-LD)"
    echo "  ✅ Google Analytics & Search Console integration"
    echo "  ✅ Automatic redirects for common misspellings"
    echo "  ✅ AI bot optimization meta tags"
    echo "  ✅ Nginx optimization for crawler performance"
    echo
    echo "🔗 Next Steps:"
    echo "  1. On your EC2 instance: git pull origin main"
    echo "  2. Extract Docker image: gunzip -c aetherinc-production-amd64.tar.gz | docker load"
    echo "  3. Deploy: docker compose -f docker-compose.prod.yml up -d"
    echo
    echo "🔍 After deployment, verify:"
    echo "  • https://aetherinc.xyz/sitemap.xml"
    echo "  • https://aetherinc.xyz/robots.txt"
    echo "  • Google Search Console verification"
    echo "  • Google Analytics tracking"
    echo
    echo "📊 Monitor your SEO performance:"
    echo "  • Submit sitemap to Google Search Console"
    echo "  • Monitor crawler activity"
    echo "  • Track search rankings for your keywords"
}

# Main deployment process
main() {
    echo "🤖 AetherInc SEO-Optimized Deployment Script"
    echo "=============================================="

    # Check environment
    check_env_vars

    # Build application
    build_application

    # Build Docker image
    build_docker_image

    # Deploy to Git
    deploy_to_git

    # Print summary
    print_deployment_summary
}

# Run main function
main "$@"

