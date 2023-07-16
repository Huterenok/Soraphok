FROM node:18-alpine

WORKDIR /packages/server

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD [ "npm", "run", "start:dev" ]