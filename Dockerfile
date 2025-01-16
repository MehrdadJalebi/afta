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
USER app:app
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/project.json ./project.json
COPY --from=builder /app/.yarn ./.yarn

EXPOSE 3000

CMD [ "yarn", "start" ]
