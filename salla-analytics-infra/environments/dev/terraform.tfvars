# -----------------------------------------------------------------------------
# Development Environment Variable Definitions
# -----------------------------------------------------------------------------
# Contains non-sensitive configuration values for the DEV environment.
# Sensitive values (like passwords) should be passed via Environment Variables
# or a secure secrets store, not committed here.
# -----------------------------------------------------------------------------

# General Configuration
environment = "dev"
aws_region  = "us-east-1"

# ClickHouse Configuration
# Naming convention includes environment to prevent collisions
clickhouse_service_name = "salla-analytics-dev-dw"
cloud_region_clickhouse = "us-east-1"

# Network Security
# In Development, we might allow broader access for developers working remotely.
# NOTE: In a real scenario, this would likely be a VPN IP or specific office IPs.
# 0.0.0.0/0 is used here for illustration of a permissive dev policy vs prod.
clickhouse_ip_allow_list = [
  "0.0.0.0/0" 
]

# Upstash Redis Configuration
# Naming convention includes environment
redis_database_name  = "salla-cache-dev"
cloud_region_upstash = "us-east-1"

# Upstash QStash Configuration
# Topics strictly scoped to dev to ensure event isolation
qstash_topic_names = [
  "cdc-events-dev",
  "notifications-dev",
  "data-sync-jobs-dev"
]