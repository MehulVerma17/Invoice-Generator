# Use a Node base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port (default for Render)
EXPOSE 3000

# Run the server
CMD ["node", "index.js"]
