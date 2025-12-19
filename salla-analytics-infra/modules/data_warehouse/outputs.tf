# ---------------------------------------------------------------------------------------------------------------------
# MODULE OUTPUTS: DATA WAREHOUSE
# ---------------------------------------------------------------------------------------------------------------------

output "service_id" {
  description = "The unique identifier of the ClickHouse service instance."
  value       = clickhouse_service.this.id
}

output "service_name" {
  description = "The name of the ClickHouse service."
  value       = clickhouse_service.this.name
}

output "service_host" {
  description = "The hostname for connecting to the ClickHouse database."
  value       = clickhouse_service.this.endpoints[0].host
}

output "service_port" {
  description = "The secure port (TLS) for connecting to the ClickHouse database."
  value       = clickhouse_service.this.endpoints[0].port
}

output "service_https_port" {
  description = "The HTTPS port for the ClickHouse HTTP interface."
  value       = clickhouse_service.this.endpoints[0].protocol == "https" ? clickhouse_service.this.endpoints[0].port : 8443
}

output "connection_string" {
  description = "A formatted secure connection string for use in application configuration."
  value       = "clickhouse://${clickhouse_service.this.endpoints[0].host}:${clickhouse_service.this.endpoints[0].port}?secure=true"
  sensitive   = true
}

output "admin_user" {
  description = "The default admin username."
  value       = "default" # ClickHouse Cloud default user
}

output "admin_password" {
  description = "The admin password configured for the service."
  value       = var.admin_password
  sensitive   = true
}