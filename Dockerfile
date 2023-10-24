FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env.* ./
RUN npm install

COPY . ./

# Run migration
CMD ["npx", "sequelize-cli", "db:migrate"]

# Run seeders
CMD ["npx", "sequelize-cli", "db:seed:all"]

EXPOSE 5500

# Run application
CMD ["npm", "run", "start"]
