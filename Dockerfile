FROM node:8
WORKDIR /home/niveus/blog-likeend
COPY package.json /home/niveus/blog-likeend/
RUN npm install 
COPY . . 
CMD node server.js
EXPOSE 8080



