FROM node:14-alpine3.10

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install dependencies
COPY package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 5000
CMD ["npm", "start"]