# -----------------------------------------------------------------------------
# Salla Analytics Platform - Production Environment Infrastructure
# -----------------------------------------------------------------------------
# This root module coordinates the provisioning of the PRODUCTION environment.
# It enforces stricter security controls, appropriate resource naming, and 
# creates the infrastructure backbone for the live application.
# -----------------------------------------------------------------------------

terraform {
  # Backend configuration is defined in backend.tf (Level 0)
  # Provider versions are defined in versions.tf (Level 0)
}

# -----------------------------------------------------------------------------
# Provider Configurations
# -----------------------------------------------------------------------------
# Credentials sourced from Env Vars (CI/CD Secrets) for maximum security.

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "SallaAnalytics"
      Environment = "Production"
      ManagedBy   = "Terraform"
      Repository  = "salla-analytics-infra"
      Criticality = "High"
    }
  }
}

provider "clickhouse" {
  # Configuration via Env Vars: CLICKHOUSE_ORG_ID, CLICKHOUSE_TOKEN
}

provider "upstash" {
  # Configuration via Env Vars: UPSTASH_EMAIL, UPSTASH_API_KEY
}

# -----------------------------------------------------------------------------
# Module: Data Warehouse (OLAP)
# -----------------------------------------------------------------------------
# Provisions the Production ClickHouse Cloud service.
# Includes strict IP allow-listing to only permit Vercel/App traffic.
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
# Provisions Production Upstash Redis.
# Ensures TLS is enabled for all connections.
module "session_cache" {
  source = "../../modules/serverless_cache"

  database_name = var.redis_database_name
  region        = var.cloud_region_upstash
  tls_enabled   = true
}

# -----------------------------------------------------------------------------
# Module: Async Messaging (Event Bus)
# -----------------------------------------------------------------------------
# Provisions Production QStash topics.
# Used for critical CDC events and system notifications.
module "event_bus" {
  source = "../../modules/async_messaging"

  topic_names = var.qstash_topic_names
}