FROM gradle:9.1.0-jdk21 AS build
WORKDIR /repo
COPY . .
RUN ./gradlew :services:user-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /repo/services/user-service/build/libs/user-service-*.jar /app/app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app/app.jar"]

