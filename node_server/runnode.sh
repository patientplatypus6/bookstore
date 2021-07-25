#!/bin/bash

echo "building node_server..."
docker build . -t patientplatypus/node_server --no-cache
echo "running node_server..."
docker run -d --name node_server --net=bookstorenetwork --restart=always -p 4000:4000 patientplatypus/node_server