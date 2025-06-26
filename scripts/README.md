# Scripts Directory

This directory contains essential scripts for managing the AetherInc project.

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