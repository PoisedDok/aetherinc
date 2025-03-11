# -------------------------
# 1) Build Stage
# -------------------------
    FROM node:18-alpine AS builder

    # Create app directory
    WORKDIR /app
    
    # Copy package.json & package-lock.json
    COPY package*.json ./
    
    # Install all dependencies (including dev)
    RUN npm install
    
    # Copy all source files
    COPY . .
    
    # Build Next.js (generates .next folder)
    RUN npm run build
    
    # -------------------------
    # 2) Production Stage
    # -------------------------
    FROM node:18-alpine AS runner
    
    # Set working directory
    WORKDIR /app
    
    # Copy only necessary files from builder
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    
    # (Optional) If you want to re-install only production deps:
    # RUN npm ci --production
    
    # Expose port 3000
    EXPOSE 3000
    
    # Set the startup command
    CMD ["npm", "run", "start"]
    