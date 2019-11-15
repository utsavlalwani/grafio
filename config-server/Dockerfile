FROM openjdk:11
ADD ./wait /wait
RUN chmod +x /wait
ADD ./target/config-server-0.0.1-SNAPSHOT.jar /usr/src/config-server-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
CMD /wait && java -jar config-server-0.0.1-SNAPSHOT.jar
