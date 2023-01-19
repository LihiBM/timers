FROM node:alpine
COPY . /timers-server
WORKDIR /timers-server
RUN npm install
CMD node server/index.js