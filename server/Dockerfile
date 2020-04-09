FROM node:12
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 4000
CMD [ "node", "app.js" ]
