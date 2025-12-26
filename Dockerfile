# --- Base deps stage ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json ./
# If you add a lockfile later, switch to `npm ci`
RUN npm install --legacy-peer-deps

# --- Builder stage ---
FROM node:18-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Runner stage ---
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy the standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Persist CMS data on a mounted volume
COPY --from=builder /app/cms-data ./cms-data

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
