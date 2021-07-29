#!/bin/bash

if [[ $1 == "production" ]]
then
  echo "building nodeserver..."
  docker build . -f Dockerfile.prod -t patientplatypus/nodeserver --no-cache
  echo "running nodeserver..."
  docker run -d --name nodeserver --net=bookstorenetwork --restart=always -p 4000:4000 -p 5000:5000 patientplatypus/nodeserver
else
  echo "building nodeserver..."
  docker build . -t patientplatypus/nodeserver --no-cache
  echo "running nodeserver..."
  docker run -d --name nodeserver --net=bookstorenetwork --restart=always -p 4000:4000 -p 5000:5000 patientplatypus/nodeserver
fi