FROM node:8
WORKDIR /home/niveus/blog-likeend
COPY package.json /home/niveus/blog-likeend/
RUN npm install && npm install express && npm install path
COPY --from=build-env /home/niveus/blog-likeend .
CMD node server.js
EXPOSE 8080



