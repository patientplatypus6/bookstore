FROM ubuntu:20.04


WORKDIR /

COPY ./ ./

RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y unzip && \
    apt-get -y install default-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN wget https://services.gradle.org/distributions/gradle-7.1.1-bin.zip -P /tmp
RUN unzip -d /opt/gradle /tmp/gradle-*.zip

RUN ./gradlew clean build

CMD java -jar ./build/libs/bookstore-0.0.1-SNAPSHOT.jar 