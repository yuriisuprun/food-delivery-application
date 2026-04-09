FROM gradle:9.1.0-jdk21 AS build
ENV GRADLE_USER_HOME=/home/gradle/.gradle-user-service
WORKDIR /repo
COPY . .
RUN --mount=type=cache,target=/home/gradle/.gradle-user-service \
    ./gradlew :services:user-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /repo/services/user-service/build/libs/user-service-*.jar /app/app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app/app.jar"]
