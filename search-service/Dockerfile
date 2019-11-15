FROM openjdk:11
ADD ./wait /wait
RUN chmod +x /wait
WORKDIR usr/src
ADD ./target/search-service-0.0.1-SNAPSHOT.jar /usr/src/search-service-0.0.1-SNAPSHOT.jar
CMD /wait && java -jar search-service-0.0.1-SNAPSHOT.jar
