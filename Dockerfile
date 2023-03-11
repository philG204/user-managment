FROM nestjs/cli

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 8080