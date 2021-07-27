FROM node:latest

WORKDIR /

COPY package.json ./
COPY ./ ./


RUN npm install
RUN npm run build
# Bundle app source


EXPOSE 3000
# If you are building your code for production
# RUN npm ci --only=production

CMD ["npm", "start"]
