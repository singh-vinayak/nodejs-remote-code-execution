FROM node:22-alpine
WORKDIR /app
COPY server.js /app/
RUN npm install express bullmq ioredis
CMD ["node", "server.js"]
