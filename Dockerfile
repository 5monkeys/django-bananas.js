FROM node:16 as build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies, do this first to enable caching and re-running only
# when dependencies change!
COPY package*.json .
RUN npm ci

# Copy the source
COPY . .

# Pre-build bananas-commerce-admin
WORKDIR /usr/src/app/node_modules/bananas-commerce-admin
RUN npm run build

# Return back to the correct working directory
WORKDIR /usr/src/app

# Build the app source
RUN npm run build

FROM lipanski/docker-static-website

# Copy the built app from the build step
COPY --from=build /usr/src/app/dist .
