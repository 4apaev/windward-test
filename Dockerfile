FROM node:latest

RUN mkdir -p /usr/windward
WORKDIR /usr/windward

COPY package.json /usr/windward

# RUN npm install

COPY . /usr/windward

ENV PORT 3333
EXPOSE $PORT

CMD ["npm", "start"]
