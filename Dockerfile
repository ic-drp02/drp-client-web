FROM node:14 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY src src
COPY public public
RUN npm run build

FROM caddy:2.0.0-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/build /site
