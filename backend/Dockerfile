FROM node:22-alpine AS development

WORKDIR /app
COPY package*.json ./
COPY .env* ./
RUN npm i -g @nestjs/cli
RUN npm install
COPY . .

CMD ["npm", "run", "start:dev"]

FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY .env* ./

RUN npm install -g @nestjs/cli
RUN npm ci --omit=dev

COPY . .

RUN npm run build

# Stage 3: Production
FROM node:22-alpine AS production

WORKDIR /app

ARG PORT
ARG NODE_ENV=production
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV POSTGRES_HOST=$POSTGRES_HOST
ENV POSTGRES_PORT=$POSTGRES_PORT
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_DB=$POSTGRES_DB

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER node

EXPOSE $PORT

CMD ["node", "dist/main"]