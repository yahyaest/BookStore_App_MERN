FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3900

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret

CMD ["npm","start"]