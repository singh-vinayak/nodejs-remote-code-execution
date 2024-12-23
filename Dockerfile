# Dockerfile
FROM node:22-alpine

# install docker cli
RUN apk add --no-cache docker-cli

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json from the parent folder
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the entire project folder to the container
COPY . .

# Expose ports (only relevant for the server process)
EXPOSE 8000

# Default command (overridden by Docker Compose per service)
CMD ["node", "index.js"]