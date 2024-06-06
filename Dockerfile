# First stage: Build the application with Node.js and Java
FROM openjdk:17-slim as java-node

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the application code and build it
COPY . .
RUN pnpm run build

# Second stage: Use existing Nginx setup to serve the application
FROM nginx:1.21

# Copy the build artifacts from the previous stage
COPY --from=java-node /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
