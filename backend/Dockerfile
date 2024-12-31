FROM gradle:jdk17-jammy AS builder
WORKDIR /app/schedule
COPY settings.gradle .
COPY build.gradle .
COPY src src
RUN gradle clean assemble

FROM amazoncorretto:17-alpine
RUN apk update && apk upgrade
WORKDIR /app
COPY --from=builder /app/schedule/build/libs/schedule.jar .
ENTRYPOINT ["java", "-jar", "schedule.jar"]
