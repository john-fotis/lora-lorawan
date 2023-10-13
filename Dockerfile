FROM node:19
ARG node_env=production
ARG port=3000
ENV NODE_ENV=${node_env}
EXPOSE ${port}
WORKDIR /home/node/app
COPY package*.json .
COPY public ./public
COPY src ./src
RUN npm install
ENTRYPOINT [ "npm" ]
CMD [ "start" ]