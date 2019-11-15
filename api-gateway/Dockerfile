FROM openjdk:11
ADD ./wait /wait
RUN chmod +x /wait
ADD ./target/api-gateway-0.0.1-SNAPSHOT.jar /usr/src/api-gateway-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
CMD /wait && java -jar api-gateway-0.0.1-SNAPSHOT.jar
