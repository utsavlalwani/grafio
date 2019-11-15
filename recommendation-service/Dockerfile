FROM openjdk:11
ADD ./wait /wait
RUN chmod +x /wait
WORKDIR usr/src
ADD ./target/recommendation-service-0.0.1-SNAPSHOT.jar /usr/src/recommendation-service-0.0.1-SNAPSHOT.jar
CMD /wait && java -jar recommendation-service-0.0.1-SNAPSHOT.jar
