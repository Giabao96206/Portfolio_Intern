# ==========================================
# STAGE 1: Build Frontend Assets
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for optimal Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and build project
COPY . .
RUN npm run build

# ==========================================
# STAGE 2: Production Nginx Server
# ==========================================
FROM nginx:alpine AS runner

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built production assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
