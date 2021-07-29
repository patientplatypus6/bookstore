#!/bin/bash

docker image prune -f

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker system prune --volumes -f


## echo below works but use above for testing purposes

# echo "pruning all prior networks"

# docker network prune

# echo "removing prior containers..."

# docker ps -a | grep "patientplatypus/nodeserver" | awk '{print $1}' | xargs docker rm
# docker ps -a | grep "patientplatypus/react_ui" | awk '{print $1}' | xargs docker rm
# docker ps -a | grep "redis" | awk '{print $1}' | xargs docker rm

# echo "removing prior images..."

# docker images -a | grep "patientplatypus/nodeserver" | awk '{print $3}' | xargs docker rmi
# docker images -a | grep "patientplatypus/react_ui" | awk '{print $3}' | xargs docker rmi
# docker images -a | grep "redis" | awk '{print $3}' | xargs docker rmi
