#!/bin/sh

# ==============================================================================
# Database Migration Deployment Script
# 
# Purpose:
#   This script is responsible for applying pending database migrations to the
#   target environment (Production, Staging, Dev). It is designed to be run
#   within a CI/CD pipeline or a container startup sequence.
#
# Usage:
#   ./scripts/migrate-deploy.sh
#
# Environment Variables Required:
#   - DATABASE_URL: Connection string to the PostgreSQL database.
# ==============================================================================

set -e # Exit immediately if a command exits with a non-zero status

echo "[Migration] Starting database migration deployment..."

# Check if Prisma CLI is available
if ! command -v npx > /dev/null; then
    echo "[Migration] Error: npx is not installed or not in PATH."
    exit 1
fi

# Apply migrations
# 'migrate deploy' is used for CI/CD environments. It applies all pending migrations
# and ensures the database schema matches the history. It does not strictly reset
# the database like 'migrate dev' might.
echo "[Migration] Applying migrations using 'prisma migrate deploy'..."
npx prisma migrate deploy

# Verify migration status
if [ $? -eq 0 ]; then
    echo "[Migration] Successfully applied migrations."
else
    echo "[Migration] Failed to apply migrations."
    exit 1
fi

# Optional: Run Seeding
# In some workflows, we might want to ensure system roles are seeded immediately after migration.
# This makes the script self-contained for setting up a fresh DB.
if [ "$RUN_SEED_ON_DEPLOY" = "true" ]; then
    echo "[Migration] RUN_SEED_ON_DEPLOY is set. Running database seeder..."
    npx prisma db seed
    echo "[Migration] Seeding completed."
fi

echo "[Migration] Database deployment sequence finished successfully."