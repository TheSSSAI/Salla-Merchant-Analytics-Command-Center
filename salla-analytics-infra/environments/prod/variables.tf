variable "aws_region" {
  description = "AWS region for backend services"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "salla-analytics"
}

variable "environment" {
  description = "Deployment environment (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "clickhouse_password" {
  description = "Admin password for ClickHouse Cloud"
  type        = string
  sensitive   = true
}

variable "upstash_email" {
  description = "Email associated with Upstash account"
  type        = string
}

variable "upstash_api_key" {
  description = "API Key for Upstash"
  type        = string
  sensitive   = true
}

variable "production_allow_list" {
  description = "List of IP CIDR blocks allowed to access production databases"
  type        = list(string)
  default     = []
}