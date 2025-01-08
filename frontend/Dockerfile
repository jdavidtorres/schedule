FROM node:lts-alpine AS build
WORKDIR /app
COPY ./ /app
RUN npm install
RUN npm run build --omit=dev

FROM nginx:1-alpine-slim
RUN apk update

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
