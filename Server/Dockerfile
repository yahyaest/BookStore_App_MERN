# Stage 1: Build the application
FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Stage 2: Final image
FROM node:14-alpine

WORKDIR /app

# Copy only necessary files from the previous stage
COPY --from=builder /app .

EXPOSE 3900

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret

CMD ["npm","start"]