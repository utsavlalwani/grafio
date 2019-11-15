FROM openjdk:11
ADD ./wait /wait
RUN chmod +x /wait
WORKDIR usr/src
ADD ./target/login-service-0.0.1-SNAPSHOT.jar /usr/src/login-service-0.0.1-SNAPSHOT.jar
CMD /wait && java -jar login-service-0.0.1-SNAPSHOT.jar
