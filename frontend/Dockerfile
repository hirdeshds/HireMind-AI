FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Generate Prisma Client (needed before build)
RUN npx prisma generate

# Build requires certain env vars at compile time (placeholder values for type-checking)
ARG DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
ARG BETTER_AUTH_SECRET="docker-build-placeholder-secret"
ARG BETTER_AUTH_URL="http://localhost:3000"
ARG NEXT_PUBLIC_APP_URL="http://localhost:3000"

ENV DATABASE_URL=$DATABASE_URL
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
ENV BETTER_AUTH_URL=$BETTER_AUTH_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
