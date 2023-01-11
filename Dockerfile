FROM node:16 as build
ARG GITHUB_TOKEN
WORKDIR /bamconfigfrontend
COPY . .
RUN chown -R node:node /bamconfigfrontend
USER node
RUN npm install && \
    npm run lint && \
    npm run test && \
    npm run build

FROM hennihaus/bamfrontendserver:latest
WORKDIR /app
COPY --from=build /bamconfigfrontend/dist vue-app

