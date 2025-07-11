FROM node:20-slim AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install system dependencies for Prisma
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then npm install; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install additional packages needed for the build
RUN npm install --save-dev @tailwindcss/postcss

# Generate Prisma client
RUN npx prisma generate

# Environment setup for build
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_TRANSFORM_CSS=true
# Required environment variables for build
ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/aether?schema=public"
ENV NEXTAUTH_URL="https://aetherinc.xyz"
ENV NEXTAUTH_SECRET="temp_build_secret_not_for_production"
ENV NEXT_PUBLIC_API_URL="https://aetherinc.xyz"
ENV ANALYTICS_ENABLED=true
ENV CONTACT_FORM_ENABLED=true

# Copy PostCSS config and simplified CSS file
COPY postcss.config.mjs ./postcss.config.mjs

# Build the Next.js application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs nextjs

# Install PostgreSQL client and OpenSSL for Prisma
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set the correct permission for next.js standalone server
RUN mkdir -p /app/.next/standalone /app/.next/static /app/.npm
RUN chown -R nextjs:nodejs /app

# Copy necessary files for the application
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy the API routes to ensure they are available
COPY --from=builder --chown=nextjs:nodejs /app/src/app/api ./src/app/api
COPY --from=builder --chown=nextjs:nodejs /app/src/lib/analytics.ts ./src/lib/analytics.ts
COPY --from=builder --chown=nextjs:nodejs /app/src/lib/database.ts ./src/lib/database.ts
COPY --from=builder --chown=nextjs:nodejs /app/scripts/seed.mjs ./scripts/

# Copy Excel file if it exists
COPY --from=builder --chown=nextjs:nodejs /app/AI_Tools.xlsx* ./

# Run database migrations during startup
COPY --from=builder --chown=nextjs:nodejs /app/scripts/docker-entrypoint.sh ./scripts/
RUN chmod +x ./scripts/docker-entrypoint.sh

# Set npm cache directory
ENV npm_config_cache=/app/.npm

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"] 