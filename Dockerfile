FROM node:20-slim AS build
WORKDIR /app

COPY package.json yarn.lock ./
COPY .yarn ./.yarn

RUN yarn install --immutable --inline-builds && yarn cache clean

COPY . .
ARG ENV
ENV NODE_ENV=production ENV=$ENV
RUN yarn build

# Final image
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json



RUN rm -rf /app/node_modules/.cache

EXPOSE 3000

CMD [ "yarn", "start" ]