FROM gradle:9.1.0-jdk21 AS build
ENV GRADLE_USER_HOME=/home/gradle/.gradle-recommendation-service
WORKDIR /repo
COPY . .
RUN --mount=type=cache,target=/home/gradle/.gradle-recommendation-service \
    ./gradlew :services:recommendation-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /repo/services/recommendation-service/build/libs/recommendation-service-*.jar /app/app.jar
EXPOSE 8084
ENTRYPOINT ["java","-jar","/app/app.jar"]
