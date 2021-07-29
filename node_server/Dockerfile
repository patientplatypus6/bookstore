FROM node:latest

WORKDIR /

COPY package*.json ./
COPY ./ ./


RUN npm install

# Bundle app source


#node app port
EXPOSE 4000 
#socket.io port
EXPOSE 5000

CMD ["npm", "start"]