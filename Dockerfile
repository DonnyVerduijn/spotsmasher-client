
FROM node:alpine AS build
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install --only=production --silent
# Bundle app source
COPY . .

ARG ENGINE_API_KEY

# fetch introspection result from Apollo Graph Manager
RUN npx apollo client:download-schema --key ${ENGINE_API_KEY} -c ./apollo.config.js ./src/generated/introspection-result.json
# create a production build
RUN npx react-scripts build

# fetch nginx as image base
FROM nginx:alpine
# change root dir
WORKDIR /var/www
# copy the static files from the build
COPY --from=build /usr/src/app/build ./
# apply nginx configuration from nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# expose port 80
EXPOSE 80
# run nginx
CMD ["nginx", "-g", "daemon off;"]