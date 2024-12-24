FROM node:22-alpine
RUN apk add --no-cache openjdk11
WORKDIR /app
COPY server.js /app/
RUN npm install express
CMD ["node", "server.js"]
