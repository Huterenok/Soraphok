 FROM node:18-alpine
 WORKDIR /packages/frontend
 COPY . .
 RUN npm install
 COPY . .
 CMD ["npm run", "dev"]