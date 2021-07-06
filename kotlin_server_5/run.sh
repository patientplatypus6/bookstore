#!/bin/bash

sudo ./gradlew clean build

#PRODUCTION
#sudo java -jar ./build/libs/bookstore-0.0.1-SNAPSHOT.jar 

#DEVELOPMENT
sudo java -jar -Dspring.devtools.restart.enabled=true ./build/libs/bookstore-0.0.1-SNAPSHOT.jar

#sudo ./gradlew bootRun
