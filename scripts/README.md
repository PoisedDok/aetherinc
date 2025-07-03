# Scripts Directory

This directory contains various utility scripts for the Aether Inc. project.

## Database Scripts

- `seed.mjs` - Seeds the database with initial data including admin user and AI tools
- `db-setup.sh` - Sets up the database for development
- `import-excel-tools.mjs` - Imports AI tools from an Excel file
- `check-tools-count.mjs` - Checks how many AI tools are in the database
- `update-admin-password.mjs` - Updates the admin password

## Deployment Scripts

- `deploy.sh` - Deploys the application
- `ec2-deploy.sh` - Deploys the application to EC2
- `docker-entrypoint.sh` - Entrypoint script for Docker
- `start-production.mjs` - Starts the application in production mode
- `verify-build.mjs` - Verifies the build

## Excel Import Functionality

The application can import AI tools from an Excel file. The Excel file should be named `AI_Tools.xlsx` and placed in the root directory of the project.

### Excel File Format

The Excel file should have the following columns:
- `Name` (required) - The name of the tool
- `Category` (required) - The category of the tool
- `Type` - The type of the tool (e.g., Open Source, Paid)
- `License` - The license of the tool
- `Description` - A description of the tool
- `URL` - The URL of the tool
- `Pricing` - The pricing information of the tool

### Using the Excel Import

There are two ways to use the Excel import functionality:

1. **During Development:**
   - Place the `AI_Tools.xlsx` file in the root directory
   - Run `npm run db:seed` to seed the database with the tools from the Excel file

2. **In Docker:**
   - Place the `AI_Tools.xlsx` file in the root directory
   - The Docker container will automatically import the tools during startup

### Checking Imported Tools

To check how many tools are in the database, run:

```bash
npm run db:check-tools
```

This will show the total number of tools and a breakdown by category.

## Essential Scripts

- **deploy.sh** - Deployment script for Amazon Linux EC2, handles installation of dependencies and application startup
- **seed.mjs** - Database seeding script that populates initial data (admin user, sample AI tools)
- **import-tools.mjs** - Imports AI tools data from tools.txt file into the database
- **fix-admin.mjs** - Resets or creates admin credentials in the database (use when admin login isn't working)
- **check-tools-count.mjs** - Utility to verify the count of tools in tools.txt vs. database

## Usage

### Deployment
```bash
# Deploy application on EC2
./deploy.sh

# Deploy with Docker
./deploy.sh --docker
```

### Database Management
```bash
# Seed initial database data
node scripts/seed.mjs

# Import tools from tools.txt
node scripts/import-tools.mjs

# Fix admin login
node scripts/fix-admin.mjs

# Check tools count
node scripts/check-tools-count.mjs
```

## Cleanup Notes

The following non-essential scripts were removed during cleanup:
- ~~fix-admin.js~~ - Redundant (CommonJS version)
- ~~import-tools.js~~ - Redundant (CommonJS version)
- ~~seed.js~~ - Simplified version, replaced by seed.mjs
- ~~check-tools.js~~ - Detailed tools check, functionality covered by check-tools-count.mjs
- ~~send-email-resend.js~~ - Email utility using Resend service (test script)
- ~~send-email.js~~ - Email utility using Zoho SMTP (test script)
- ~~test-resend-quick.js~~ - Test script for Resend
- ~~test-resend-working.js~~ - Test script for Resend
- ~~test-resend.js~~ - Test script for Resend
- ~~test-zoho.js~~ - Test script for Zoho
- ~~verify-resend.js~~ - Verification script for Resend API
- ~~verify-zoho.js~~ - Verification script for Zoho SMTP 