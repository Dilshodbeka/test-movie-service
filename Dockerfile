FROM node:14.15-alpine

WORKDIR /movie_app

COPY ./package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./src ./src

CMD ["node", "./movie.js"]