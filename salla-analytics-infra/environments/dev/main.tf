# -----------------------------------------------------------------------------
# Salla Analytics Platform - Development Environment Infrastructure
# -----------------------------------------------------------------------------
# This root module coordinates the provisioning of the development environment.
# It composes the foundational infrastructure modules: Data Warehouse (ClickHouse),
# Serverless Cache (Redis), and Async Messaging (QStash).
# -----------------------------------------------------------------------------

terraform {
  # Backend configuration is defined in backend.tf (Level 0), using S3 and DynamoDB
  # Provider versions are defined in versions.tf (Level 0)
}

# -----------------------------------------------------------------------------
# Provider Configurations
# -----------------------------------------------------------------------------
# Credentials for these providers are expected to be supplied via Environment Variables:
# - AWS: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
# - ClickHouse: CLICKHOUSE_ORG_ID, CLICKHOUSE_TOKEN
# - Upstash: UPSTASH_EMAIL, UPSTASH_API_KEY

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "SallaAnalytics"
      Environment = "Development"
      ManagedBy   = "Terraform"
      Repository  = "salla-analytics-infra"
    }
  }
}

provider "clickhouse" {
  # Organization ID and Token sourced from Env Vars
  # api_url can be overridden if necessary, usually defaults to SaaS endpoint
}

provider "upstash" {
  # Email and API Key sourced from Env Vars
}

# -----------------------------------------------------------------------------
# Module: Data Warehouse (OLAP)
# -----------------------------------------------------------------------------
# Provisions the ClickHouse Cloud service for analytical workloads.
# In Dev, we may use a lower tier or allow broader access for developer ease.
module "analytics_dw" {
  source = "../../modules/data_warehouse"

  service_name   = var.clickhouse_service_name
  cloud_region   = var.cloud_region_clickhouse
  ip_allow_list  = var.clickhouse_ip_allow_list
  admin_password = var.clickhouse_admin_password
}

# -----------------------------------------------------------------------------
# Module: Serverless Cache
# -----------------------------------------------------------------------------
# Provisions Upstash Redis for session management and high-speed caching.
module "session_cache" {
  source = "../../modules/serverless_cache"

  database_name = var.redis_database_name
  region        = var.cloud_region_upstash
  tls_enabled   = true
}

# -----------------------------------------------------------------------------
# Module: Async Messaging (Event Bus)
# -----------------------------------------------------------------------------
# Provisions Upstash QStash topics for the CDC pipeline and notifications.
module "event_bus" {
  source = "../../modules/async_messaging"

  topic_names = var.qstash_topic_names
}