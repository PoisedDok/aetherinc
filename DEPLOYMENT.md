# Deployment Guide for AetherInc

This guide outlines the steps to deploy the AetherInc application to an AWS EC2 instance using Docker.

## Prerequisites

- AWS EC2 instance (Ubuntu recommended)
- Domain name (aetherinc.xyz) with DNS pointing to your EC2 IP
- Docker and Docker Compose installed on the EC2 instance
- Git installed on the EC2 instance
- SSL certificates for your domain

## Local Setup

1. Configure your git user:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. Push your code to a git repository:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

## EC2 Setup

1. SSH into your EC2 instance:
   ```bash
   ssh -i /path/to/your/key.pem ubuntu@your-ec2-ip
   ```

2. Install dependencies if not already installed:
   ```bash
   sudo apt update
   sudo apt install -y docker.io docker-compose git
   sudo systemctl enable docker
   sudo systemctl start docker
   sudo usermod -aG docker $USER
   ```

3. Clone your repository:
   ```bash
   git clone https://github.com/yourusername/aetherinc.git
   cd aetherinc
   ```

## SSL Certificate Setup

1. If you have existing certificates, create the SSL directory and copy them:
   ```bash
   mkdir -p nginx/ssl
   # Copy your fullchain.pem and privkey.pem to nginx/ssl/
   ```

2. If you need new certificates, you can use Certbot (Let's Encrypt):
   ```bash
   sudo apt install -y certbot
   sudo certbot certonly --standalone -d aetherinc.xyz -d www.aetherinc.xyz
   
   # Copy certificates to nginx/ssl
   sudo cp /etc/letsencrypt/live/aetherinc.xyz/fullchain.pem nginx/ssl/
   sudo cp /etc/letsencrypt/live/aetherinc.xyz/privkey.pem nginx/ssl/
   sudo chmod -R 755 nginx/ssl
   ```

## Deployment

1. Create a `.env` file with your environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

2. Deploy using Docker Compose:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. Alternatively, run the deployment script:
   ```bash
   bash scripts/ec2-deploy.sh
   ```

## Automatic Deployment with GitHub Actions

To enable automatic deployments via GitHub Actions:

1. Add these secrets to your GitHub repository:
   - `SSH_PRIVATE_KEY`: Your private SSH key for EC2 access
   - `EC2_HOST`: Your EC2 instance's IP or hostname
   - `EC2_USER`: The username for SSH access (usually 'ubuntu')

2. Update the path in the GitHub Actions workflow file:
   ```yaml
   # In .github/workflows/deploy.yml
   ssh ${{ secrets.EC2_USER }}@${{ secrets.EC2_HOST }} 'cd /actual/path/to/repo && bash scripts/ec2-deploy.sh'
   ```

3. Push to the main branch, and GitHub Actions will deploy automatically.

## Troubleshooting

- **Database Issues**: Check logs with `docker-compose -f docker-compose.prod.yml logs db`
- **Web App Issues**: Check logs with `docker-compose -f docker-compose.prod.yml logs web`
- **Nginx Issues**: Check logs with `docker-compose -f docker-compose.prod.yml logs nginx`

## Updating the Deployment

To update your deployment after making changes:

1. Push changes to your repository
2. Pull changes on the EC2 instance:
   ```bash
   git pull origin main
   ```
3. Rebuild containers:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

Or simply run the deployment script:
```bash
bash scripts/ec2-deploy.sh
``` 