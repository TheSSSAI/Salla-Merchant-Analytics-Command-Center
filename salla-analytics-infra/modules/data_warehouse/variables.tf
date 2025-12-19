variable "service_name" {
  description = "Unique identifier for the ClickHouse service instance"
  type        = string
}

variable "cloud_region" {
  description = "Cloud provider region for ClickHouse deployment"
  type        = string
  default     = "us-east-1"
}

variable "ip_allow_list" {
  description = "List of IP CIDR blocks allowed to access the database"
  type        = list(string)
  default     = []
}

variable "admin_password" {
  description = "Password for the default admin user"
  type        = string
  sensitive   = true
  
  validation {
    condition     = length(var.admin_password) >= 12
    error_message = "Admin password must be at least 12 characters long."
  }
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}