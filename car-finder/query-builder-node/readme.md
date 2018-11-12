# Instructions

Built using the instructions provided by https://nodejs.org/en/docs/guides/nodejs-docker-webapp/


# Usage
http://localhost:8080/ returns json of the makes


# Build and run docker
docker build -t pngan/car-finder-query .
docker run -p 8080:8080 -d pngan/car-finder-query
docker images

docker ps
docker stop <container>

# Run locally
node server.js

# Debugging angular with chrome
https://code.visualstudio.com/docs/nodejs/angular-tutorial



