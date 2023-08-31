# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app
# copy .npmrc to get npm packages
# COPY .npmrc ./

#copy package*.json
COPY package*.json ./

# install npm dependencies
RUN npm ci

# clean up the npmrc files
# RUN rm .npmrc

#cop other project files except in .dockerignore
COPY . ./

# describe the container is listening on port 4000
EXPOSE 4000

# start container with npm run service
CMD [ "npm", "run", "service" ]