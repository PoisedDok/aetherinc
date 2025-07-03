# EC2 Deployment Guide for AetherInc

This guide explains how to deploy the AetherInc application on an Amazon EC2 instance using Docker.

## Prerequisites

- An Amazon EC2 instance (t2.micro or larger recommended)
- Docker and Docker Compose installed on the EC2 instance
- Git installed on the EC2 instance
- Basic knowledge of SSH and terminal commands

## Installation Steps

### 1. Connect to your EC2 instance

```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

Replace `your-key.pem` with your EC2 key pair file and `your-ec2-ip` with your instance's public IP address.

### 2. Install Docker and Git (if not already installed)

```bash
# Update packages
sudo yum update -y

# Install Git
sudo yum install git -y

# Install Docker
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo chkconfig docker on

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
git --version
```

You may need to log out and log back in for the Docker group changes to take effect.

### 3. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/aetherinc.git
cd aetherinc
```

Replace `YOUR_USERNAME` with your GitHub username.

### 4. Set Up Environment Variables

Create a `.env.production` file with the necessary environment variables:

```bash
nano .env.production
```

Add the following content, adjusting values as needed:

```
# Production Environment Variables
NODE_ENV=production

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=aether
DATABASE_URL=postgresql://postgres:your_secure_password@db:5432/aether?schema=public

# NextAuth Configuration
NEXTAUTH_SECRET=your_secure_random_string
NEXTAUTH_URL=http://your_ec2_ip_or_domain

# API URL
NEXT_PUBLIC_API_URL=http://your_ec2_ip_or_domain

# Feature flags
ANALYTICS_ENABLED=true
CONTACT_FORM_ENABLED=true

# Admin credentials
ADMIN_EMAIL="admin@aetherinc.com"
ADMIN_PASSWORD="your_secure_admin_password"
```

Replace placeholder values with your actual configuration.

### 5. Load the Docker Image

```bash
# Extract the Docker image from the Git repository
gunzip -c aetherinc-production.tar.gz | docker load
```

### 6. Configure Nginx (Optional)

If you want to use a custom domain with SSL:

```bash
# Create SSL directory if it doesn't exist
mkdir -p nginx/ssl

# Copy your SSL certificates
# For Let's Encrypt certificates:
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/

# Set proper permissions
sudo chmod 644 nginx/ssl/fullchain.pem
sudo chmod 644 nginx/ssl/privkey.pem
```

Edit the Nginx configuration:

```bash
nano nginx/conf.d/default.conf
```

Update the server_name to your domain and ensure SSL paths are correct.

### 7. Start the Application

```bash
docker compose -f docker-compose.prod.yml up -d
```

### 8. Verify the Deployment

Check if containers are running:

```bash
docker compose -f docker-compose.prod.yml ps
```

View logs if needed:

```bash
docker compose -f docker-compose.prod.yml logs
```

### 9. Accessing Your Application

Your application should now be accessible at:
- `http://your_ec2_ip` if you're not using a custom domain
- `https://yourdomain.com` if you've set up a domain with SSL

## Troubleshooting

### Container startup issues

Check logs for specific errors:

```bash
docker compose -f docker-compose.prod.yml logs web
docker compose -f docker-compose.prod.yml logs db
docker compose -f docker-compose.prod.yml logs nginx
```

### Database connection issues

Verify the database container is running:

```bash
docker compose -f docker-compose.prod.yml ps db
```

Check the database logs:

```bash
docker compose -f docker-compose.prod.yml logs db
```

### Nginx configuration issues

Check Nginx logs:

```bash
docker compose -f docker-compose.prod.yml logs nginx
```

## Maintenance

### Updating the Application

To update the application with a new Docker image:

1. Pull the latest changes from Git:
   ```bash
   git pull origin main
   ```

2. Extract the updated Docker image:
   ```bash
   gunzip -c aetherinc-production.tar.gz | docker load
   ```

3. Restart the containers:
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

### Backing Up the Database

To back up the PostgreSQL database:

```bash
docker compose -f docker-compose.prod.yml exec db pg_dump -U postgres aether > backup_$(date +%Y%m%d).sql
```

### Restoring a Database Backup

```bash
cat backup_file.sql | docker compose -f docker-compose.prod.yml exec -T db psql -U postgres aether
``` 