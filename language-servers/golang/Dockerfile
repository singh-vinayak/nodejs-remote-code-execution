FROM node:22-alpine
RUN apk add --no-cache go
WORKDIR /app
COPY server.js /app/
RUN npm install express
CMD ["node", "server.js"]
