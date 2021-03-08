#!/usr/bin/env sh

if [ $(docker network ls -f name=spotsmasher -q) = "" ]; then
  docker network create --attachable spotsmasher
fi

docker-compose build
docker-compose down
docker system prune --force
docker volume prune --force
docker-compose up -d
docker-compose logs -f --tail=100 client | cut -f2 -d "|" 
