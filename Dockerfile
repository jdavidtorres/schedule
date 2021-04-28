FROM nginx:1.20.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/schedule /usr/share/nginx/html