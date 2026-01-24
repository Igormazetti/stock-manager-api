# Build stage
FROM node:20-alpine AS builder

# Install build dependencies for native modules (bcrypt)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies with legacy peer deps to handle version conflicts
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Production stage
FROM node:20-alpine

# Install build dependencies for native modules (bcrypt)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including dev (needed for tsx and TypeScript)
RUN npm install --legacy-peer-deps

# Copy prisma schema
COPY prisma ./prisma/

# Copy built application from builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy source code (since we're using tsx to run TypeScript directly)
COPY . .

# Expose the application port
EXPOSE 6060

# Start the application
CMD ["npm", "run", "dev"]
