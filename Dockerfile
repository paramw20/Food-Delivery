FROM node:17-alpine
WORKDIR /app
COPY package.json /app 
RUN yarn 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
