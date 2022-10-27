FROM node:16 as build
WORKDIR /bamconfigfrontend
COPY . .
RUN chown -R node:node /bamconfigfrontend
USER node
RUN npm install && \
    npm run lint && \
    npm run test:unit && \
    npm run build

FROM hennihaus/bamfrontendserver:latest
WORKDIR /app
COPY --from=build /bamconfigfrontend/dist vue-app

