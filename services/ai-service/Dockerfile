FROM gradle:9.1.0-jdk21 AS build
WORKDIR /repo
COPY . .
RUN ./gradlew :services:ai-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /repo/services/ai-service/build/libs/ai-service-*.jar /app/app.jar
EXPOSE 8083
ENTRYPOINT ["java","-jar","/app/app.jar"]

