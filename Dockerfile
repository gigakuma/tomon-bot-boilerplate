FROM node:alpine AS base
WORKDIR /app

FROM base AS builder
COPY . .

RUN yarn install --production && \
  cp -R node_modules /tmp/node_modules && \
  yarn install && \
  yarn build

FROM base AS release
COPY --from=builder /app/resources ./resources
COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
EXPOSE 3000
ENTRYPOINT [ "node", "dist/index.js" ]
