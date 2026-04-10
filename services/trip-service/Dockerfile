FROM gradle:9.1.0-jdk21 AS build
ENV GRADLE_USER_HOME=/home/gradle/.gradle-trip-service
WORKDIR /repo

COPY . .

RUN --mount=type=cache,target=/home/gradle/.gradle-trip-service \
    ./gradlew :services:trip-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /repo/services/trip-service/build/libs/trip-service-*.jar /app/app.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","/app/app.jar"]