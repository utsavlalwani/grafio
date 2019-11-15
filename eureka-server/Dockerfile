FROM openjdk:11
ADD ./wait /wait
RUN chmod +x /wait
ADD ./target/eureka-server-0.0.1-SNAPSHOT.jar /usr/src/eureka-server-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
CMD /wait && java -jar eureka-server-0.0.1-SNAPSHOT.jar
