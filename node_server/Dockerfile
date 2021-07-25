FROM node:latest

WORKDIR /

COPY package*.json ./
COPY ./ ./


RUN npm install

# Bundle app source


EXPOSE 4000
# If you are building your code for production
# RUN npm ci --only=production

CMD ["npm", "start"]

# CMD "node ./bin/www"
# /bin/sh: 1: node ./bin/www: not found

# CMD "npm run start"
# /bin/sh: 1: npm run start: not found

# CMD [ "npm run start" ]

# node:internal/modules/cjs/loader:930
#   throw err;
#   ^

# Error: Cannot find module '/npm run start'
#     at Function.Module._resolveFilename (node:internal/modules/cjs/loader:927:15)
#     at Function.Module._load (node:internal/modules/cjs/loader:772:27)
#     at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:79:12)
#     at node:internal/main/run_main_module:17:47 {
#   code: 'MODULE_NOT_FOUND',
#   requireStack: []
# }
