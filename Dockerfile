FROM node:16 as build_package

WORKDIR /usr/src/package

# Copy package source
COPY . .

# Install dependencies
RUN npm ci

# Build the package source
RUN npm run build

FROM node:16 as build_app

WORKDIR /usr/src/app

# Copy example source
COPY ./example .

# Copy bananas-commerce-admin to parent directory
COPY --from=build_package /usr/src/package/package.json ../
COPY --from=build_package /usr/src/package/dist ../

# Install dependencies
RUN npm link ../
RUN npm ci

# Build the app source
RUN npm run build

FROM nginx:alpine

# Copy the built app from the build step
COPY --from=build_app /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 by default
EXPOSE 80
