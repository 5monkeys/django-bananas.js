FROM node:20

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm ci

ENV PATH /code/node_modules/.bin:$PATH
