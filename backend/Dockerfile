# Use an official Node.js runtime as the base image
FROM node:19-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the backend runs on
EXPOSE $PORT

# Command to run the backend
CMD ["node", "./index.js"]