#!/bin/bash

if [ $1 = 'production' ]
then
  echo 'kotlin production build'
  echo 'building kotlin_server_6...'
  docker build . -f Dockerfile.prod -t patientplatypus/kotlin_server_6 --no-cache
  echo 'running kotlin_server_6...'
  docker run -d --name kotlin_server_6 --net=bookstorenetwork --restart=always -p 8080:8080 patientplatypus/kotlin_server_6 
else
  echo 'kotlin development build'
  echo 'building kotlin_server_6...'
  docker build . -t patientplatypus/kotlin_server_6 --no-cache
  echo 'running kotlin_server_6...'
  docker run -d --name kotlin_server_6 --net=bookstorenetwork --restart=always -p 8080:8080 patientplatypus/kotlin_server_6 
fi