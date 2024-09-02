FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN rm -rf node_modules && npm install

EXPOSE 3333

CMD [ "npm", "run", "dev" ]