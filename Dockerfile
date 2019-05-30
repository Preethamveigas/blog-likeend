FROM node:8
WORKDIR /home/niveus/blog-like
COPY package.json /home/niveus/blog-like/
RUN npm install 
COPY . . 
CMD node server.js
EXPOSE 8080



