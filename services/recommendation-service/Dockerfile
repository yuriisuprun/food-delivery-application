FROM gradle:9.1.0-jdk21 AS build
WORKDIR /repo
COPY . .
RUN ./gradlew :services:recommendation-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /repo/services/recommendation-service/build/libs/recommendation-service-*.jar /app/app.jar
EXPOSE 8084
ENTRYPOINT ["java","-jar","/app/app.jar"]

