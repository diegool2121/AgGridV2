# Etapa 1: build de Angular
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa 2: servir Angular con NGINX
FROM nginx:alpine
COPY --from=build /app/dist/appgridv2/browser /usr/share/nginx/html
EXPOSE 80
