# ------------------------------------
# STAGE 01 - deps
# ------------------------------------
# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ------------------------------------
# STAGE 02 - builder
# ------------------------------------
# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn generate

# Build code
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# ------------------------------------
# STAGE 03 - runner
# ------------------------------------
# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

# Arg to manage production state
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG NEXT_PUBLIC_UMAMI_SRC
ENV NEXT_PUBLIC_UMAMI_SRC $NEXT_PUBLIC_UMAMI_SRC

ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID $NEXT_PUBLIC_UMAMI_WEBSITE_ID

# Arg to port for node
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

CMD ["yarn", "start"]