#!/bin/bash

echo "stop reddis..."
docker stop redis
docker rm redis
echo "remove redis..."
echo "docker run redis..."
docker run -d --name redis --net=bookstorenetwork --restart=always -p 6379:6379 redis:4.0.5-alpine