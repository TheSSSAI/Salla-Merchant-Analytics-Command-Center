# -----------------------------------------------------------------------------
# Stage 1: Base
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

# Install libc6-compat for Alpine (required for some native dependencies)
RUN apk add --no-cache libc6-compat
# Enable corepack for pnpm management
RUN corepack enable

# -----------------------------------------------------------------------------
# Stage 2: Pruner (Optimizes build context for monorepos)
# -----------------------------------------------------------------------------
# Note: If turbo is not available globally, we assume a standard copy strategy in builder.
# Ideally, we would use 'turbo prune' here if the root has turbo installed.
# For robustness in this generation without assuming global tools, we use a direct builder.

# -----------------------------------------------------------------------------
# Stage 3: Builder
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

# Copy strict dependency definitions
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy the web application package.json
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies (frozen-lockfile for reproducibility)
# We mount a cache for pnpm store to speed up subsequent builds
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy the source code for the entire workspace (or specifically what's needed)
# In a rigorous production setup, use .dockerignore to exclude node_modules
COPY . .

# Build the project
# This assumes the 'build' script in apps/web/package.json invokes 'next build'
# and that turbo is configured to handle the pipeline.
RUN pnpm --filter web build

# -----------------------------------------------------------------------------
# Stage 4: Runner
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Telemetry disabled for privacy/performance
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
# We rely on Next.js 'output: standalone' mode configured in next.config.js

# Copy the public folder
COPY --from=builder /app/apps/web/public ./apps/web/public

# Copy the standalone output
# The standalone folder contains a minimal node_modules and the server entry point
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

# Set the correct user
USER nextjs

# Expose the port Next.js runs on
EXPOSE 3000
ENV PORT=3000

# The standalone output places the server.js inside the package structure
CMD ["node", "apps/web/server.js"]