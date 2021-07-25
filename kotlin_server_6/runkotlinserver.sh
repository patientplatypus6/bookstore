#!/bin/bash


echo "building kotlin_server_6..."
docker build . -t patientplatypus/kotlin_server_6 --no-cache
echo "running kotlin_server_6..."
docker run -d --name kotlin_server_6 --net=bookstorenetwork --restart=always -p 8080:8080 patientplatypus/kotlin_server_6
