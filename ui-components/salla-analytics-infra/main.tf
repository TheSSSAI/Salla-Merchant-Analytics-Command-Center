provider "vercel" {
  # VERCEL_API_TOKEN must be set in environment variables
}

provider "aws" {
  region = var.aws_region
}

# ------------------------------------------------------------------------------
# Vercel Project Configuration
# ------------------------------------------------------------------------------

resource "vercel_project" "pwa_main" {
  name      = "salla-analytics-pwa"
  framework = "nextjs"

  git_repository {
    type = "github"
    repo = "org/salla-analytics-platform"
  }

  environment = [
    {
      key    = "DATABASE_URL"
      target = ["production", "preview", "development"]
      value  = var.database_url
    },
    {
      key    = "NEXTAUTH_URL"
      target = ["production"]
      value  = "https://${var.production_domain}"
    },
    {
      key    = "NEXT_PUBLIC_APP_URL"
      target = ["production", "preview", "development"]
      value  = "https://${var.production_domain}"
    }
  ]
}

resource "vercel_project_domain" "pwa_domain" {
  project_id = vercel_project.pwa_main.id
  domain     = var.production_domain
}

# ------------------------------------------------------------------------------
# Infrastructure Dependencies (Defined abstractly, typically managed via 
# their respective cloud consoles or dedicated providers if available)
# ------------------------------------------------------------------------------

# Note: In a real-world scenario with Neon (Postgres), ClickHouse Cloud, and 
# Upstash (Redis/QStash), we would either use their specific Terraform providers 
# or manage them as external resources and pass connection strings as variables.

variable "aws_region" {
  description = "AWS Region for auxiliary services"
  default     = "us-east-1"
}

variable "production_domain" {
  description = "Primary domain for the application"
  type        = string
}

variable "database_url" {
  description = "Connection string for PostgreSQL (Neon/Supabase)"
  type        = string
  sensitive   = true
}

variable "clickhouse_host" {
  description = "ClickHouse Cloud Host"
  type        = string
}

variable "upstash_redis_url" {
  description = "Upstash Redis Connection URL"
  type        = string
  sensitive   = true
}