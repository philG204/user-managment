FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
RUN npm install --save @nestjs/typeorm typeorm pg
RUN npm install uuid

WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN mkdir /api_key

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
