# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies with reduced concurrency to save memory
RUN npm install --maxsockets=2

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy everything from builder (including node_modules)
COPY --from=builder /app ./

# Expose the application port
EXPOSE 6060

# Start the application
CMD ["npm", "run", "dev"]
