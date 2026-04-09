FROM gradle:9.1.0-jdk21 AS build
ENV GRADLE_USER_HOME=/home/gradle/.gradle-ai-service
WORKDIR /repo
COPY . .
RUN --mount=type=cache,target=/home/gradle/.gradle-ai-service \
    ./gradlew :services:ai-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /repo/services/ai-service/build/libs/ai-service-*.jar /app/app.jar
EXPOSE 8083
ENTRYPOINT ["java","-jar","/app/app.jar"]
