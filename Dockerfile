FROM node:22.12.0-alpine AS build

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm && pnpm install

COPY prisma ./prisma

RUN npx prisma generate || true

COPY . .
