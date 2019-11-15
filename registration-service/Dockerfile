FROM openjdk:11
ADD ./wait /wait
RUN chmod +x /wait
WORKDIR usr/src
ADD ./target/registration-service-0.0.1-SNAPSHOT.jar /usr/src/registration-service-0.0.1-SNAPSHOT.jar
CMD /wait && java -jar registration-service-0.0.1-SNAPSHOT.jar
