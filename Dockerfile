FROM node:alpine
WORKDIR /app
COPY package.json /app 
RUN yarn --network-timeout 500000 
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]