FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --save @nestjs/typeorm typeorm pg
RUN npm install uuid
RUN rm -rf /etc/nginx/conf.d/*

COPY nginx.conf /etc/nginx/conf.d/

WORKDIR /app
COPY --from=builder /app/dist/user-managment/ /usr/share/nginx/html
RUN mkdir /api_key

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
