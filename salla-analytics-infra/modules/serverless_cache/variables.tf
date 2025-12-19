variable "database_name" {
  description = "Name of the Redis database"
  type        = string
}

variable "region" {
  description = "Region for the Redis instance"
  type        = string
  default     = "us-east-1"
}

variable "tls_enabled" {
  description = "Enforce TLS for connections"
  type        = bool
  default     = true
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}