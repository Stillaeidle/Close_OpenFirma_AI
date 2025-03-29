FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the Next.js app (creates 'out' directory with static files)
RUN npm run build

# Production image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy static files from builder
COPY --from=builder /app/out ./out

# Expose port
EXPOSE 3000

# Start serve
CMD ["serve", "-s", "out", "-l", "3000"]