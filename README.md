# schedule

[![Java CI with Gradle](https://github.com/jdavidtorres/training-schedule/actions/workflows/build.yml/badge.svg)](https://github.com/jdavidtorres/training-schedule/actions/workflows/build.yml)
[![CodeQL](https://github.com/jdavidtorres/training-schedule/actions/workflows/codeql-analisys.yml/badge.svg)](https://github.com/jdavidtorres/training-schedule/actions/workflows/codeql-analisys.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jdavidtorres_training-schedule&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jdavidtorres_training-schedule)

## docker-compose
```bash
docker-compose up -d
```

## frontend

1. This project needs [Angular CLI](https://angular.io/cli).
2. Run `ng serve` for a dev server. Navigate to http://localhost:4200/
3. If you want deploy it in a server, run `ng build --prod`. The build artifacts will be stored in the `dist/` directory

## backend

1. This project needs Jre 17 and docker to run.
2. Go to the jar package folder via command line and then run `java -jar schedule-backend.jar` for a local deployment.
3. Navigate to http://localhost:8090/api/api-docs-ui.html to view the documentation.
4. **Optional** To create a new jar package run `gradle build` with your IDE.
