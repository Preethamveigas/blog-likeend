FROM node:8
WORKDIR /home/niveus/blog-like
COPY package.json /home/niveus/blog-like/
RUN npm install && npm install express && npm install path
CMD node server.js
EXPOSE 8080



