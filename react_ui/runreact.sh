#!/bin/bash

if [ $1 = 'production' ]
then
  echo 'react production build...'
  echo "building react_ui..."
  docker build . -f Dockerfile.prod -t patientplatypus/react_ui --no-cache
  echo "running react_ui..."
  docker run -d --name react_ui --net=bookstorenetwork --restart=always -p 3000:80 patientplatypus/react_ui
else
  echo 'react development build...'
  echo "building react_ui..."
  docker build . -t patientplatypus/react_ui --no-cache
  echo "running react_ui..."
  docker run -d --name react_ui --net=bookstorenetwork --restart=always -p 3000:3000 patientplatypus/react_ui
fi


