############################
# 1) Build Stage
############################
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package files & install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build Next.js (generates .next folder)
# Remove "|| true" so if build fails, it doesn't silently succeed
RUN npm run build

############################
# 2) Production Stage
############################
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
# (If you want to do a fresh install for production deps, see below)
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# (Optional optimization) If you'd rather do a fresh install of only 
# production dependencies, comment out the line that copies node_modules, 
# then uncomment these lines:
# COPY --from=builder /app/package*.json ./
# RUN npm ci --omit=dev
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
