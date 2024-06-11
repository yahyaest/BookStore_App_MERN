# Stage 1: Build the application
FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

RUN npm run build

# Stage 2: Final image
FROM node:14-alpine

WORKDIR /app

# Copy only necessary files from the previous stage
COPY --from=builder /app .

EXPOSE 3000

# Run the application
CMD ["npm", "start"]