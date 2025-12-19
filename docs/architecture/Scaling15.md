# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Architecture Style

Serverless-First, Multi-Tenant SaaS

## 1.3 Primary Cloud Providers

- Vercel
- ClickHouse Cloud
- Upstash
- Cloudflare

## 1.4 Key Requirements

- REQ-TEC-001 (Serverless)
- BR-005 (EU Data Residency)
- REQ-NFR-004 (99.9% Uptime)
- REQ-NFR-002 (RPO 24h, RTO 4h)

# 2.0 Hosting Strategy

| Property | Value |
|----------|-------|
| Model | Cloud-Native |
| Approach | The system utilizes a multi-cloud, managed service... |
| On Premise Considerations | Not applicable; the architecture is entirely cloud... |

# 3.0 Regional Design

| Property | Value |
|----------|-------|
| Primary Data Region | eu-central-1 (Frankfurt) |
| Justification | Mandated by BR-005 to ensure all PII data is store... |
| Compute Distribution | Vercel Serverless Functions are deployed with the ... |
| Availability Strategy | High availability is achieved by leveraging the na... |
| Disaster Recovery Region | eu-west-1 (Ireland) |
| Disaster Recovery Approach | Active-Passive. In a declared disaster, service wi... |

# 4.0 Environment Breakdown

## 4.1 Environment

### 4.1.1 Environment

Production

### 4.1.2 Description

Live environment for merchant use. Highest level of monitoring, security, and performance.

### 4.1.3 Custom Domain

app.example.com

### 4.1.4 Components

#### 4.1.4.1 Serverless Compute

##### 4.1.4.1.1 Name

Serverless Compute

##### 4.1.4.1.2 Provider

Vercel

##### 4.1.4.1.3 Configuration

| Property | Value |
|----------|-------|
| Type | Vercel Functions |
| Region | eu-central-1 (Frankfurt) |
| Scaling | Automatic, managed by Vercel based on traffic. |
| Timeout | Configured per function (e.g., 15s for API, 300s f... |

#### 4.1.4.2.0 OLTP Database

##### 4.1.4.2.1 Name

OLTP Database

##### 4.1.4.2.2 Provider

Vercel Postgres

##### 4.1.4.2.3 Configuration

| Property | Value |
|----------|-------|
| Version | 15+ |
| Instance Size | Production-tier, vertically scalable based on moni... |
| Region | eu-central-1 (Frankfurt) |
| High Availability | Enabled (e.g., read replica, automated failover). |

#### 4.1.4.3.0 OLAP Data Warehouse

##### 4.1.4.3.1 Name

OLAP Data Warehouse

##### 4.1.4.3.2 Provider

ClickHouse Cloud

##### 4.1.4.3.3 Configuration

| Property | Value |
|----------|-------|
| Instance Size | Production-tier, vertically scalable. |
| Region | eu-central-1 (Frankfurt) |
| High Availability | Enabled (multi-node cluster as per provider offeri... |

#### 4.1.4.4.0 Cache & Queues

##### 4.1.4.4.1 Name

Cache & Queues

##### 4.1.4.4.2 Provider

Upstash (Redis & QStash)

##### 4.1.4.4.3 Configuration

| Property | Value |
|----------|-------|
| Type | Global, low-latency |
| Region | eu-central-1 (primary region for data) |
| Persistence | Enabled for Redis where necessary. |

#### 4.1.4.5.0 Object Storage

##### 4.1.4.5.1 Name

Object Storage

##### 4.1.4.5.2 Provider

Cloudflare R2

##### 4.1.4.5.3 Configuration

| Property | Value |
|----------|-------|
| Primary Use | Database backups (REQ-NFR-002), data exports. |
| Location | EU |
| Storage Class | Standard |

## 4.2.0.0.0 Environment

### 4.2.1.0.0 Environment

Staging

### 4.2.2.0.0 Description

High-fidelity replica of Production for E2E testing, QA, and pre-release validation. Uses anonymized or synthetic data.

### 4.2.3.0.0 Custom Domain

staging.example.com

### 4.2.4.0.0 Components

#### 4.2.4.1.0 Serverless Compute

##### 4.2.4.1.1 Name

Serverless Compute

##### 4.2.4.1.2 Provider

Vercel

##### 4.2.4.1.3 Configuration

| Property | Value |
|----------|-------|
| Type | Vercel Functions |
| Region | eu-central-1 (Frankfurt) |
| Scaling | Automatic, managed by Vercel. |

#### 4.2.4.2.0 OLTP Database

##### 4.2.4.2.1 Name

OLTP Database

##### 4.2.4.2.2 Provider

Vercel Postgres

##### 4.2.4.2.3 Configuration

| Property | Value |
|----------|-------|
| Instance Size | Scaled-down version of Production (e.g., 1/4 size)... |
| Region | eu-central-1 (Frankfurt) |
| High Availability | Disabled to reduce cost. |

#### 4.2.4.3.0 OLAP Data Warehouse

##### 4.2.4.3.1 Name

OLAP Data Warehouse

##### 4.2.4.3.2 Provider

ClickHouse Cloud

##### 4.2.4.3.3 Configuration

| Property | Value |
|----------|-------|
| Instance Size | Scaled-down version of Production. |
| Region | eu-central-1 (Frankfurt) |
| High Availability | Disabled. |

#### 4.2.4.4.0 Cache & Queues

##### 4.2.4.4.1 Name

Cache & Queues

##### 4.2.4.4.2 Provider

Upstash (Redis & QStash)

##### 4.2.4.4.3 Configuration

###### 4.2.4.4.3.1 Type

🔹 Lower-tier plan.

###### 4.2.4.4.3.2 Region

eu-central-1

#### 4.2.4.5.0.0 Object Storage

##### 4.2.4.5.1.0 Name

Object Storage

##### 4.2.4.5.2.0 Provider

Cloudflare R2

##### 4.2.4.5.3.0 Configuration

###### 4.2.4.5.3.1 Primary Use

Testing backup and restore procedures.

###### 4.2.4.5.3.2 Location

EU

## 4.3.0.0.0.0 Environment

### 4.3.1.0.0.0 Environment

Development

### 4.3.2.0.0.0 Description

Individual developer environments, typically run locally or through Vercel's preview deployments for feature branches.

### 4.3.3.0.0.0 Custom Domain

N/A (feature-branch URLs)

### 4.3.4.0.0.0 Components

#### 4.3.4.1.0.0 Serverless Compute

##### 4.3.4.1.1.0 Name

Serverless Compute

##### 4.3.4.1.2.0 Provider

Vercel

##### 4.3.4.1.3.0 Configuration

###### 4.3.4.1.3.1 Type

🔹 Preview Deployments per Git push.

#### 4.3.4.2.0.0 OLTP Database

##### 4.3.4.2.1.0 Name

OLTP Database

##### 4.3.4.2.2.0 Provider

Vercel Postgres or Local Docker

##### 4.3.4.2.3.0 Configuration

###### 4.3.4.2.3.1 Type

🔹 Developer-tier or local instance with seed data.

# 5.0.0.0.0.0 Networking Topology

| Property | Value |
|----------|-------|
| Ingress | All user traffic is directed to Vercel's Edge Netw... |
| Service Communication | Serverless functions communicate with managed data... |
| Network Security | Access to all data stores MUST be restricted by IP... |

# 6.0.0.0.0.0 Ci Cd And Ia C

| Property | Value |
|----------|-------|
| Ci Cd Pipeline | GitHub Actions, as per REQ-TEC-002. |
| Pipeline Triggers | Triggered on push/merge to main (Production deploy... |
| Deployment Strategy | Continuous Deployment. Merges to the `main` branch... |
| Infrastructure As Code | Terraform is used to provision and manage all non-... |

# 7.0.0.0.0.0 Security And Compliance

## 7.1.0.0.0.0 Secrets Management

Vercel Environment Variables are used to store all secrets (database connection strings, API keys, JWT secrets), with distinct sets for Production, Staging, and Preview environments, as per REQ-NFR-003.

## 7.2.0.0.0.0 Identity And Access Management

IAM roles are configured in cloud providers (e.g., ClickHouse Cloud, Cloudflare) to grant least-privilege access to the Terraform service principal for automated resource management. A separate IAM role is used for the GitHub Actions CI/CD pipeline to grant deployment permissions to Vercel.

# 8.0.0.0.0.0 Disaster Recovery Plan

| Property | Value |
|----------|-------|
| Oltp Database | Utilize Vercel Postgres's managed point-in-time re... |
| Olap Data Warehouse | Restore the latest daily backup from Cloudflare R2... |
| Application | Update Vercel Environment Variables with the new d... |
| Validation | The full DR plan must be documented in a runbook a... |

