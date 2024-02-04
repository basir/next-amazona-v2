# inherit from a existing image to add the functionality
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files into the image.
COPY package*.json ./


# Install the dependencies.
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run dev