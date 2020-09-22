FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV REDIS_HOST=redis
EXPOSE 9990
CMD [ "npm","run", "start:prod" ]
