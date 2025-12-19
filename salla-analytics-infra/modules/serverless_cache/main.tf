# ---------------------------------------------------------------------------------------------------------------------
# MODULE: SERVERLESS CACHE (UPSTASH REDIS)
# ---------------------------------------------------------------------------------------------------------------------
# Provisions a serverless Redis instance using Upstash.
# Supports session storage, API caching, and coordination for the data pipeline.
# ---------------------------------------------------------------------------------------------------------------------

terraform {
  required_providers {
    upstash = {
      source  = "upstash/upstash"
      version = "~> 1.0"
    }
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# RESOURCE: REDIS DATABASE
# ---------------------------------------------------------------------------------------------------------------------
# Creates the Redis database with TLS enforcement.
# ---------------------------------------------------------------------------------------------------------------------
resource "upstash_redis_database" "this" {
  database_name = var.database_name
  region        = var.region
  tls_enabled   = var.tls_enabled
  
  # When creating a database, we ensure multizone is enabled for production resilience if supported by the region plan,
  # but for the standard provider resource, we stick to core arguments.
  # The 'eviction' policy defaults to 'noeviction' but can be configured if the provider exposes it in future versions.
  # For now, we rely on the serverless nature to scale.
}