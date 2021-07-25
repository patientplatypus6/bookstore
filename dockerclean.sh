#!/bin/bash

yes | docker image prune
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
yes | docker system prune


## echo below works but use above for testing purposes

# echo "pruning all prior networks"

# docker network prune

# echo "removing prior containers..."

# docker ps -a | grep "patientplatypus/node_server" | awk '{print $1}' | xargs docker rm
# docker ps -a | grep "patientplatypus/react_ui" | awk '{print $1}' | xargs docker rm
# docker ps -a | grep "redis" | awk '{print $1}' | xargs docker rm

# echo "removing prior images..."

# docker images -a | grep "patientplatypus/node_server" | awk '{print $3}' | xargs docker rmi
# docker images -a | grep "patientplatypus/react_ui" | awk '{print $3}' | xargs docker rmi
# docker images -a | grep "redis" | awk '{print $3}' | xargs docker rmi
