FROM golang:1.24rc1-alpine AS build
WORKDIR /app

# Install Node.js and NPM (required for Node.js applications)
RUN apk add --no-cache nodejs npm

# Copy server files and dependencies
COPY . .
RUN npm install express

CMD ["node", "server.js"]
