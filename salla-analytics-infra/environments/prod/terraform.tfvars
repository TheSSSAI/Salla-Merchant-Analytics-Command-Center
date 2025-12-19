# -----------------------------------------------------------------------------
# Production Environment Variable Definitions
# -----------------------------------------------------------------------------
# Contains configuration values for the PRODUCTION environment.
# Focuses on stability, security, and proper naming conventions.
# -----------------------------------------------------------------------------

# General Configuration
environment = "prod"
aws_region  = "us-east-1"

# ClickHouse Configuration
clickhouse_service_name = "salla-analytics-prod-dw"
cloud_region_clickhouse = "us-east-1"

# Network Security
# REQ-TEC-001: Strict IP allow-listing.
# These IPs represent Vercel's outgoing IP ranges or specific NAT Gateways
# used by the application to communicate with the database.
# Note: Actual Vercel IPs change; typically this would be a NAT Gateway IP
# if using Vercel Secure Compute, or allow-all if using mTLS/Password auth only.
# Assuming NAT Gateway IP for enterprise security compliance.
clickhouse_ip_allow_list = [
  "52.1.2.3/32",  # Example: Vercel NAT IP 1
  "52.4.5.6/32"   # Example: Vercel NAT IP 2
]

# Upstash Redis Configuration
# Dedicated production database for cache isolation
redis_database_name  = "salla-cache-prod"
cloud_region_upstash = "us-east-1"

# Upstash QStash Configuration
# Production topic names without 'dev' suffixes
qstash_topic_names = [
  "cdc-events",
  "notifications",
  "data-sync-jobs"
]