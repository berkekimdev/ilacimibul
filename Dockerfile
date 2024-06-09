# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Development stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5173
CMD ["npm", "run", "dev"]
