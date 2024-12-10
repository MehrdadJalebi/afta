# CAVEAT: changing this file need to be approved by SRE team.

# Builder image
FROM docker.yektanet.tech/base/node:20-slim as BUILDER
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --immutable --inline-builds

COPY . .
ARG ENV
ENV NODE_ENV=production ENV=$ENV
RUN yarn build

# Final image
FROM docker.yektanet.tech/base/node:20-slim as FINAL
USER app:app
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/project.json ./project.json
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml

ENTRYPOINT ["/app/run.sh"]
