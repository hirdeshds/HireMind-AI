FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Generate Prisma Client (needed before build)
RUN npx prisma generate

# Build-time env vars (placeholders for type-checking — override at runtime)
ARG DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
ARG BETTER_AUTH_SECRET="docker-build-placeholder-secret"
ARG BETTER_AUTH_URL="http://localhost:3000"
ARG NEXT_PUBLIC_APP_URL="http://localhost:3000"
ARG GOOGLE_CLIENT_ID="placeholder"
ARG GOOGLE_CLIENT_SECRET="placeholder"

ENV DATABASE_URL=$DATABASE_URL \
    BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
    BETTER_AUTH_URL=$BETTER_AUTH_URL \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
    GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
