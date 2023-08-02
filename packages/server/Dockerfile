FROM node:18-alpine AS builder

WORKDIR /server

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . ./

RUN npm run build

FROM node:18-alpine

COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/package*.json ./
COPY --from=builder /server/dist ./dist

EXPOSE 3001
CMD [ "npm", "run", "start:prod" ]