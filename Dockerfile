# Use the official Playwright image that matches your required version
FROM mcr.microsoft.com/playwright:v1.46.1-jammy

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 3333 for UI (if needed)
EXPOSE 3333

# Run the CodeceptJS tests
CMD ["npx", "codeceptjs", "run"]
