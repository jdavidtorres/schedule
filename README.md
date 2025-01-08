# schedule

[![Backend Build](https://github.com/jdavidtorres/schedule/actions/workflows/backend-build.yml/badge.svg?branch=main)](https://github.com/jdavidtorres/schedule/actions/workflows/backend-build.yml)
[![Frontend Build](https://github.com/jdavidtorres/schedule/actions/workflows/frontend-build.yml/badge.svg?branch=main)](https://github.com/jdavidtorres/schedule/actions/workflows/frontend-build.yml)
[![CodeQL Analysis](https://github.com/jdavidtorres/schedule/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/jdavidtorres/schedule/actions/workflows/codeql-analysis.yml)

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
