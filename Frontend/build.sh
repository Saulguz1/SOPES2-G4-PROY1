#!/bin/bash
docker login
docker build \
    -t frontendso2 \
    .
docker tag frontendso2 $1/frontendso2
docker push $1/frontendso2
