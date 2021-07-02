#!/bin/bash

sudo ./gradlew clean build
sudo java -jar ./build/libs/bookstore-0.0.1-SNAPSHOT.jar 

#sudo ./gradlew bootRun
