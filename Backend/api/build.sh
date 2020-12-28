#!/bin/bash
docker login
docker build \
    -t gamesapi \
    .
docker tag gamesapi $1/gamesapi
docker push $1/gamesapi
