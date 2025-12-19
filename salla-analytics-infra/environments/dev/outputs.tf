# ---------------------------------------------------------------------------------------------------------------------
# DEVELOPMENT ENVIRONMENT OUTPUTS
# ---------------------------------------------------------------------------------------------------------------------
# These outputs expose the necessary connection details, credentials, and resource identifiers 
# for the development environment. These values are consumed by the CI/CD pipeline to inject 
# environment variables into the application runtime (Vercel) and other dependent services.
#
# SENSITIVE DATA:
# All outputs containing secrets (passwords, tokens, keys, connection strings) are marked as 
# `sensitive = true` to prevent them from being displayed in cleartext in console logs.
# ---------------------------------------------------------------------------------------------------------------------

# ---------------------------------------------------------------------------------------------------------------------
# DATA WAREHOUSE (CLICKHOUSE) OUTPUTS
# ---------------------------------------------------------------------------------------------------------------------

output "clickhouse_connection_string" {
  description = "The secure, TLS-enabled connection string for the ClickHouse Cloud development instance. Used by the data pipeline and analytical services."
  value       = module.analytics_dw.connection_string
  sensitive   = true
}

output "clickhouse_service_id" {
  description = "The unique identifier of the ClickHouse service instance. Useful for monitoring, auditing, and support."
  value       = module.analytics_dw.service_id
}

# ---------------------------------------------------------------------------------------------------------------------
# SERVERLESS CACHE (UPSTASH REDIS) OUTPUTS
# ---------------------------------------------------------------------------------------------------------------------

output "redis_endpoint" {
  description = "The endpoint URL (host:port) for the Upstash Redis development instance."
  value       = module.session_cache.redis_endpoint
}

output "redis_password" {
  description = "The access password for the Upstash Redis development instance."
  value       = module.session_cache.redis_password
  sensitive   = true
}

output "redis_url" {
  description = "A constructed connection URL for Redis (rediss://:password@endpoint) using TLS. Suitable for direct use in application libraries."
  value       = "rediss://:${module.session_cache.redis_password}@${module.session_cache.redis_endpoint}"
  sensitive   = true
}

# ---------------------------------------------------------------------------------------------------------------------
# ASYNC MESSAGING (UPSTASH QSTASH) OUTPUTS
# ---------------------------------------------------------------------------------------------------------------------

output "qstash_token" {
  description = "The authentication token for publishing messages to the QStash development topic. Used by the CDC pipeline."
  value       = module.event_bus.qstash_token
  sensitive   = true
}

output "qstash_current_signing_key" {
  description = "The current signing key used to verify the integrity of incoming webhooks from QStash in the development environment."
  value       = module.event_bus.qstash_current_signing_key
  sensitive   = true
}

output "qstash_next_signing_key" {
  description = "The next signing key for QStash webhooks, used for key rotation support in the development environment."
  value       = module.event_bus.qstash_next_signing_key
  sensitive   = true
}