FROM node:20 AS build
WORKDIR /app

COPY package.json yarn.lock ./
COPY .yarn ./.yarn

RUN yarn install --immutable --inline-builds

COPY . .
ARG ENV
ENV NODE_ENV=production ENV=$ENV
RUN yarn build

# Final image
FROM node:20 AS production
WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/project.json ./project.json
COPY --from=build /app/.yarn ./.yarn

EXPOSE 3000

CMD [ "yarn", "start" ]
