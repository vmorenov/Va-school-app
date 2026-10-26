FROM node:24.22.1-alpine AS build
WORKDIR /src
COPY package*.json ./
COPY apps apps
COPY packages packages
COPY tsconfig.json ./
RUN npm ci
ARG APP=shell
ARG VQ_BASE=/
ARG VQ_ACADEMIC_URL=http://localhost:8080/mfe/academic/remoteEntry.js
ARG VQ_LEARNING_URL=http://localhost:8080/mfe/learning/remoteEntry.js
RUN VQ_BASE=$VQ_BASE VQ_ACADEMIC_URL=$VQ_ACADEMIC_URL VQ_LEARNING_URL=$VQ_LEARNING_URL npm run build -w @vq/$APP && cp -r apps/$APP/dist /output
FROM nginxinc/nginx-unprivileged:1.28-alpine
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /output /usr/share/nginx/html
EXPOSE 8080
