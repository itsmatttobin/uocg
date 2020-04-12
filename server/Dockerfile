# Build
FROM node:lts-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

#Deploy
FROM node:lts-alpine
COPY --from=build-deps /usr/src/app/build .
EXPOSE 4000
CMD ["node", "app.js"]
