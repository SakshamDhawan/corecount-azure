FROM node:20-slim AS node_base
RUN corepack enable
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update -y && apt-get install -y openssl

FROM node_base AS build
WORKDIR /corecount


COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build-prisma



FROM node_base AS backend
WORKDIR /app
COPY --from=build /corecount/ db
COPY --from=build /corecount/apps/backend/dist .
COPY --from=build /corecount/node_modules/.prisma/client /.prisma/client
COPY --from=build /corecount/node_modules/.prisma/client node_modules/.prisma/client
WORKDIR /app/db
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
WORKDIR /app
CMD ["node", "--enable-source-maps", "index.js"]

FROM nginx:alpine-slim AS dashboard
WORKDIR /app

EXPOSE 80

COPY apps/dashboard/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /corecount/apps/dashboard/dist .