FROM node:18.16.1

WORKDIR /front

COPY . .
RUN rm -rf package-lock.json

#RUN npm install -g npm@9.5.1

RUN npm install

EXPOSE 80

CMD ["npm", "run", "dev"]