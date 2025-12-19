# ---------------------------------------------------------------------------------------------------------------------
# MODULE: DATA WAREHOUSE (CLICKHOUSE CLOUD)
# ---------------------------------------------------------------------------------------------------------------------
# Provisions the OLAP Data Warehouse using ClickHouse Cloud.
# Includes security configurations for network access control (IP Allow-listing).
# ---------------------------------------------------------------------------------------------------------------------

terraform {
  required_providers {
    clickhouse = {
      source  = "clickhouse/clickhouse"
      version = "~> 1.0"
    }
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# RESOURCE: CLICKHOUSE SERVICE
# ---------------------------------------------------------------------------------------------------------------------
# Provisions the main database instance.
# ---------------------------------------------------------------------------------------------------------------------
resource "clickhouse_service" "this" {
  name           = var.service_name
  cloud_provider = "aws" # Standardizing on AWS infrastructure for ClickHouse backend
  region         = var.cloud_region
  tier           = var.tier
  
  # Idle suspension settings for cost optimization in non-prod environments
  idle_scaling   = var.tier == "development" ? true : false
  
  # Basic authentication configuration
  password       = var.admin_password
  
  # Standard IP access list - Allows access from everywhere initially if list is empty, 
  # or restricts if list is provided via the separate ip_allow_list resource below.
  # However, best practice with this provider is often to rely on the ip_allow_list resource.
  ip_access = [] 
}

# ---------------------------------------------------------------------------------------------------------------------
# RESOURCE: IP ALLOW LIST
# ---------------------------------------------------------------------------------------------------------------------
# Strictly controls network access to the database.
# Implements REQ-TEC-001 security requirement.
# ---------------------------------------------------------------------------------------------------------------------
resource "clickhouse_ip_allow_list" "this" {
  service_id = clickhouse_service.this.id
  
  # Iterate over the provided list of CIDRs
  dynamic "rule" {
    for_each = var.ip_allow_list
    content {
      source      = rule.value
      description = "Allowed IP via Terraform - ${rule.key}"
    }
  }
}