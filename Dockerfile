FROM node:10

WORKDIR /code

COPY app/package.json app/package-lock.json ./
RUN npm ci

ENV PATH /code/node_modules/.bin:$PATH

COPY app .
COPY src ./django-bananas
RUN cd ./django-bananas && npm ci
RUN npm run build
