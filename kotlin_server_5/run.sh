#!/bin/bash

# ./gradlew clean
# ./gradlew build

# ./gradlew bootRun

# find ~/.gradle -type f -name "*.lock" -delete

# ./gradlew bootrun

# sudo ./gradlew clean build

#PRODUCTION
# sudo java -jar ./build/libs/bookstore-0.0.1-SNAPSHOT.jar 

#DEVELOPMENT
sudo ./gradlew clean build
./gradlew bootRun --stacktrace
# sudo java -jar -Dspring.devtools.restart.enabled=true ./build/libs/bookstore-0.0.1-SNAPSHOT.jar

#sudo ./gradlew bootRun
