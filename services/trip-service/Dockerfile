FROM gradle:9.1.0-jdk21 AS build
WORKDIR /repo
COPY . .
RUN ./gradlew :services:trip-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /repo/services/trip-service/build/libs/trip-service-*.jar /app/app.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/app/app.jar"]

