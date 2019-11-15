FROM openjdk:11
ADD ./wait /wait
RUN chmod +x /wait
WORKDIR usr/src
ADD ./target/content-service-0.0.1-SNAPSHOT.jar /usr/src/content-service-0.0.1-SNAPSHOT.jar
CMD /wait && java -jar content-service-0.0.1-SNAPSHOT.jar
