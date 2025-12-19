# ---------------------------------------------------------------------------------------------------------------------
# SALLA ANALYTICS INFRASTRUCTURE COMPOSITION ROOT
# ---------------------------------------------------------------------------------------------------------------------
# This is the main composition module that ties together all foundational infrastructure components
# (Data Warehouse, Messaging, Caching) into a cohesive architecture.
# Environments (Dev, Prod) will instantiate this module to ensure infrastructure parity.
# ---------------------------------------------------------------------------------------------------------------------

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    clickhouse = {
      source  = "clickhouse/clickhouse"
      version = "~> 1.0"
    }
    upstash = {
      source  = "upstash/upstash"
      version = "~> 1.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# LOCALS
# ---------------------------------------------------------------------------------------------------------------------
locals {
  # Standardized naming convention: salla-analytics-{env}-{resource}
  resource_prefix = "${var.project_name}-${var.environment}"
  
  # Common tags for cost allocation and governance
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "SallaAnalyticsTeam"
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# MODULE: DATA WAREHOUSE (OLAP)
# ---------------------------------------------------------------------------------------------------------------------
# Provisions the ClickHouse Cloud service for high-performance analytics.
# Implements REQ-TEC-001: Dedicated OLAP Data Warehouse.
# ---------------------------------------------------------------------------------------------------------------------
module "data_warehouse" {
  source = "../../modules/data_warehouse"

  service_name   = "${local.resource_prefix}-dw"
  cloud_region   = var.clickhouse_region
  ip_allow_list  = var.clickhouse_ip_allow_list
  admin_password = var.clickhouse_admin_password
  
  # Environment specific tiers allowed via variables
  tier           = var.clickhouse_tier # e.g., "development" or "production"
}

# ---------------------------------------------------------------------------------------------------------------------
# MODULE: SERVERLESS CACHE
# ---------------------------------------------------------------------------------------------------------------------
# Provisions Upstash Redis for session management, API caching, and deduplication.
# Implements REQ-SCAL-001: Stateless backend support via external caching.
# ---------------------------------------------------------------------------------------------------------------------
module "serverless_cache" {
  source = "../../modules/serverless_cache"

  database_name = "${local.resource_prefix}-cache"
  region        = var.upstash_region
  tls_enabled   = true # Enforcing Security Rule: Encryption in transit
}

# ---------------------------------------------------------------------------------------------------------------------
# MODULE: ASYNC MESSAGING (EVENT BUS)
# ---------------------------------------------------------------------------------------------------------------------
# Provisions Upstash QStash topics for the Event-Driven Architecture.
# Implements REQ-DATA-002: CDC Pipeline Infrastructure.
# ---------------------------------------------------------------------------------------------------------------------
module "async_messaging" {
  source = "../../modules/async_messaging"

  # Dynamic topic creation based on CDC requirements
  topic_names = var.qstash_topics
}