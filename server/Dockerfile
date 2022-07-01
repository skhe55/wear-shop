FROM node:16.14.0-slim

RUN apt-get update \
&& mkdir -p /usr/src/app \
&& mkdir -p /usr/src/app/public


WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app 

RUN yarn

COPY . /usr/src/app

RUN yarn build

ENTRYPOINT ["yarn", "start:prod"]