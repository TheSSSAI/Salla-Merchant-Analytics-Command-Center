# ---------------------------------------------------------------------------------------------------------------------
# MODULE OUTPUTS: SERVERLESS CACHE
# ---------------------------------------------------------------------------------------------------------------------

output "database_id" {
  description = "The unique identifier of the Redis database."
  value       = upstash_redis_database.this.database_id
}

output "endpoint" {
  description = "The endpoint URL for the Redis database."
  value       = upstash_redis_database.this.endpoint
}

output "port" {
  description = "The port number for the Redis database."
  value       = upstash_redis_database.this.port
}

output "password" {
  description = "The access password for the Redis database."
  value       = upstash_redis_database.this.password
  sensitive   = true
}

output "tls_enabled" {
  description = "Whether TLS is enabled for connections."
  value       = upstash_redis_database.this.tls_enabled
}

output "connection_string" {
  description = "A standard Redis connection URL (rediss://) for use in application configuration."
  # Format: rediss://default:[password]@[endpoint]:[port]
  value       = "rediss://default:${upstash_redis_database.this.password}@${upstash_redis_database.this.endpoint}:${upstash_redis_database.this.port}"
  sensitive   = true
}