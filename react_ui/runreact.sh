#!/bin/bash


# echo "building node..."
# docker build . -t patientplatypus/node_server --no-cache
# echo "running node..."
# docker run -d --name node_server --net=bookstorenetwork -p 4000:4000 patientplatypus/node_server

echo "building react_ui..."
docker build . -t patientplatypus/react_ui --no-cache
echo "running react_ui..."
docker run -d --name react_ui --net=bookstorenetwork --restart=always -p 3000:3000 patientplatypus/react_ui
