#
# Build stage
#
FROM maven:3.8.6-amazoncorretto-17 as build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

#
# Package stage
#
FROM amazoncorretto:17-alpine
COPY --from=build /home/app/target/maestromapper-*.jar /usr/local/lib/maestromapper.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar", "-XX:+UseSerialGC", "-Xss512k", "-Dspring.profiles.active=prd", "/usr/local/lib/maestromapper.jar"]

