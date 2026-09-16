# Stage 1: Build & Prisma Client Generation
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma/

RUN npm ci

# Copy source code and build
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src/

RUN npm run build

# Stage 2: Production Runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Install production dependencies only
COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma/

RUN npm ci --omit=dev && npx prisma generate

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Create a non-root user for security
USER node

EXPOSE 4000

CMD ["node", "dist/src/main"]
