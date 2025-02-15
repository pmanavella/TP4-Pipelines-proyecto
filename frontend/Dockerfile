FROM node:18

EXPOSE 3000

ADD . /frontend
WORKDIR /frontend

COPY package*.json ./
COPY . .
RUN npm install

CMD ["npm", "run", "start"]