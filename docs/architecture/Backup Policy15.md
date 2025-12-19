# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Architecture

Serverless-First on Vercel

## 1.3 Technology Stack

- React/Next.js
- TypeScript
- PostgreSQL
- ClickHouse
- Terraform
- GitHub Actions

## 1.4 Environments

- Development (Preview)
- Staging
- Production

# 2.0 Pipelines

## 2.1 Application CI/CD Pipeline (Next.js Frontend & Serverless Backend)

### 2.1.1 Pipeline Id

app-ci-cd-pipeline

### 2.1.2 Name

Application CI/CD Pipeline (Next.js Frontend & Serverless Backend)

### 2.1.3 Description

Handles the continuous integration, testing, quality analysis, and deployment of the main web application, which includes both the frontend PWA and the backend serverless functions.

### 2.1.4 Trigger

#### 2.1.4.1 Type

🔹 Git Push/Merge

#### 2.1.4.2 Branch

main (for Staging), Git Tags v*.*.* (for Production)

### 2.1.5.0 Stages

#### 2.1.5.1 Stage Name

##### 2.1.5.1.1 Stage Name

1. Build & Static Analysis

##### 2.1.5.1.2 Jobs

###### 2.1.5.1.2.1 Job Name

####### 2.1.5.1.2.1.1 Job Name

Install Dependencies

####### 2.1.5.1.2.1.2 Tool

npm

####### 2.1.5.1.2.1.3 Commands

- npm ci

###### 2.1.5.1.2.2.0 Job Name

####### 2.1.5.1.2.2.1 Job Name

Run Linter & Code Style Check

####### 2.1.5.1.2.2.2 Tool

ESLint

####### 2.1.5.1.2.2.3 Commands

- npm run lint

####### 2.1.5.1.2.2.4 Dependencies

- Install Dependencies

###### 2.1.5.1.2.3.0 Job Name

####### 2.1.5.1.2.3.1 Job Name

Build Application

####### 2.1.5.1.2.3.2 Tool

Next.js CLI

####### 2.1.5.1.2.3.3 Commands

- npm run build

####### 2.1.5.1.2.3.4 Dependencies

- Install Dependencies

#### 2.1.5.2.0.0.0 Stage Name

##### 2.1.5.2.1.0.0 Stage Name

2. Security & Quality Scanning

##### 2.1.5.2.2.0.0 Jobs

###### 2.1.5.2.2.1.0 Job Name

####### 2.1.5.2.2.1.1 Job Name

Static Application Security Testing (SAST)

####### 2.1.5.2.2.1.2 Tool

SonarQube

####### 2.1.5.2.2.1.3 Commands

- sonar-scanner

####### 2.1.5.2.2.1.4 Dependencies

- 1. Build & Static Analysis

####### 2.1.5.2.2.1.5 Configuration

######## 2.1.5.2.2.1.5.1 Quality Gate

Must not have new Blocker or Critical vulnerabilities.

###### 2.1.5.2.2.2.0.0 Job Name

####### 2.1.5.2.2.2.1.0 Job Name

Dependency Vulnerability Scan

####### 2.1.5.2.2.2.2.0 Tool

Dependabot (or npm audit)

####### 2.1.5.2.2.2.3.0 Commands

- npm audit --audit-level=critical

####### 2.1.5.2.2.2.4.0 Dependencies

- 1. Build & Static Analysis

####### 2.1.5.2.2.2.5.0 Configuration

######## 2.1.5.2.2.2.5.1 Quality Gate

Fail on any new Critical severity vulnerabilities.

#### 2.1.5.3.0.0.0.0 Stage Name

##### 2.1.5.3.1.0.0.0 Stage Name

3. Automated Testing

##### 2.1.5.3.2.0.0.0 Jobs

###### 2.1.5.3.2.1.0.0 Job Name

####### 2.1.5.3.2.1.1.0 Job Name

Unit & Integration Tests

####### 2.1.5.3.2.1.2.0 Tool

Jest

####### 2.1.5.3.2.1.3.0 Commands

- npm test -- --coverage

####### 2.1.5.3.2.1.4.0 Dependencies

- 1. Build & Static Analysis

####### 2.1.5.3.2.1.5.0 Configuration

######## 2.1.5.3.2.1.5.1 Coverage Threshold

80%

######## 2.1.5.3.2.1.5.2 Justification

As per REQ-NFR-004 Maintainability requirements.

###### 2.1.5.3.2.2.0.0 Job Name

####### 2.1.5.3.2.2.1.0 Job Name

End-to-End Tests

####### 2.1.5.3.2.2.2.0 Tool

Playwright

####### 2.1.5.3.2.2.3.0 Commands

- npx playwright test

####### 2.1.5.3.2.2.4.0 Dependencies

- 1. Build & Static Analysis

####### 2.1.5.3.2.2.5.0 Configuration

######## 2.1.5.3.2.2.5.1 Target Environment

Vercel Preview Deployment

######## 2.1.5.3.2.2.5.2 Justification

Validates critical user journeys on a production-like preview environment as per REQ-OTH-003.

#### 2.1.5.4.0.0.0.0 Stage Name

##### 2.1.5.4.1.0.0.0 Stage Name

4. Deploy to Staging

##### 2.1.5.4.2.0.0.0 Jobs

- {'jobName': 'Deploy to Vercel Staging', 'tool': 'Vercel CLI / Git Integration', 'commands': ['vercel deploy'], 'dependencies': ['2. Security & Quality Scanning', '3. Automated Testing'], 'configuration': {'trigger': "Automatic on merge to 'main' branch."}}

#### 2.1.5.5.0.0.0.0 Stage Name

##### 2.1.5.5.1.0.0.0 Stage Name

5. Deploy to Production

##### 2.1.5.5.2.0.0.0 Jobs

###### 2.1.5.5.2.1.0.0 Job Name

####### 2.1.5.5.2.1.1.0 Job Name

Manual Approval Gate

####### 2.1.5.5.2.1.2.0 Tool

GitHub Actions

####### 2.1.5.5.2.1.3.0 Commands

- Workflow requires manual approval from 'Release Managers' group.

####### 2.1.5.5.2.1.4.0 Dependencies

- 4. Deploy to Staging

###### 2.1.5.5.2.2.0.0 Job Name

####### 2.1.5.5.2.2.1.0 Job Name

Deploy to Vercel Production

####### 2.1.5.5.2.2.2.0 Tool

Vercel CLI / Git Integration

####### 2.1.5.5.2.2.3.0 Commands

- vercel deploy --prod

####### 2.1.5.5.2.2.4.0 Dependencies

- Manual Approval Gate

####### 2.1.5.5.2.2.5.0 Configuration

######## 2.1.5.5.2.2.5.1 Trigger

Manual approval on a `v*.*.*` git tag push.

### 2.1.6.0.0.0.0.0 Artifact Management

| Property | Value |
|----------|-------|
| Strategy | Immutable Deployments |
| Repository | Vercel |
| Versioning | Git commit SHA for preview/staging deployments, Gi... |
| Promotion | Vercel promotes a specific immutable deployment to... |

### 2.1.7.0.0.0.0.0 Rollback Strategy

| Property | Value |
|----------|-------|
| Mechanism | Vercel Instant Rollback |
| Procedure | Utilize the Vercel dashboard or CLI to instantly r... |
| Trigger | Manual trigger by authorized personnel in response... |

## 2.2.0.0.0.0.0.0 Infrastructure as Code CI/CD Pipeline (Terraform)

### 2.2.1.0.0.0.0.0 Pipeline Id

infra-iac-pipeline

### 2.2.2.0.0.0.0.0 Name

Infrastructure as Code CI/CD Pipeline (Terraform)

### 2.2.3.0.0.0.0.0 Description

Manages the lifecycle of non-Vercel cloud resources, such as the ClickHouse Cloud database, using Terraform. This ensures infrastructure changes are version-controlled, reviewed, and applied systematically.

### 2.2.4.0.0.0.0.0 Trigger

#### 2.2.4.1.0.0.0.0 Type

🔹 Git Push/Merge

#### 2.2.4.2.0.0.0.0 Branch

main

#### 2.2.4.3.0.0.0.0 Paths

- *.tf
- *.tfvars

### 2.2.5.0.0.0.0.0 Stages

#### 2.2.5.1.0.0.0.0 Stage Name

##### 2.2.5.1.1.0.0.0 Stage Name

1. Validate & Plan

##### 2.2.5.1.2.0.0.0 Jobs

###### 2.2.5.1.2.1.0.0 Job Name

####### 2.2.5.1.2.1.1.0 Job Name

Initialize Terraform

####### 2.2.5.1.2.1.2.0 Tool

Terraform

####### 2.2.5.1.2.1.3.0 Commands

- terraform init -backend-config=backend.tfvars

###### 2.2.5.1.2.2.0.0 Job Name

####### 2.2.5.1.2.2.1.0 Job Name

Validate Syntax & Format

####### 2.2.5.1.2.2.2.0 Tool

Terraform

####### 2.2.5.1.2.2.3.0 Commands

- terraform fmt -check
- terraform validate

####### 2.2.5.1.2.2.4.0 Dependencies

- Initialize Terraform

###### 2.2.5.1.2.3.0.0 Job Name

####### 2.2.5.1.2.3.1.0 Job Name

Generate Staging Plan

####### 2.2.5.1.2.3.2.0 Tool

Terraform

####### 2.2.5.1.2.3.3.0 Commands

- terraform plan -workspace=staging -out=staging.tfplan

####### 2.2.5.1.2.3.4.0 Dependencies

- Validate Syntax & Format

####### 2.2.5.1.2.3.5.0 Configuration

######## 2.2.5.1.2.3.5.1 Output

Plan is posted as a comment to the pull request for review.

###### 2.2.5.1.2.4.0.0 Job Name

####### 2.2.5.1.2.4.1.0 Job Name

Generate Production Plan

####### 2.2.5.1.2.4.2.0 Tool

Terraform

####### 2.2.5.1.2.4.3.0 Commands

- terraform plan -workspace=production -out=production.tfplan

####### 2.2.5.1.2.4.4.0 Dependencies

- Validate Syntax & Format

####### 2.2.5.1.2.4.5.0 Configuration

######## 2.2.5.1.2.4.5.1 Output

Plan is posted as a comment to the pull request for review.

#### 2.2.5.2.0.0.0.0 Stage Name

##### 2.2.5.2.1.0.0.0 Stage Name

2. Apply to Staging

##### 2.2.5.2.2.0.0.0 Jobs

###### 2.2.5.2.2.1.0.0 Job Name

####### 2.2.5.2.2.1.1.0 Job Name

Manual Approval for Staging Apply

####### 2.2.5.2.2.1.2.0 Tool

GitHub Actions

####### 2.2.5.2.2.1.3.0 Commands

- Workflow requires manual approval after reviewing the plan.

####### 2.2.5.2.2.1.4.0 Dependencies

- 1. Validate & Plan

###### 2.2.5.2.2.2.0.0 Job Name

####### 2.2.5.2.2.2.1.0 Job Name

Apply Staging Plan

####### 2.2.5.2.2.2.2.0 Tool

Terraform

####### 2.2.5.2.2.2.3.0 Commands

- terraform apply staging.tfplan

####### 2.2.5.2.2.2.4.0 Dependencies

- Manual Approval for Staging Apply

####### 2.2.5.2.2.2.5.0 Configuration

######## 2.2.5.2.2.2.5.1 Trigger

Manual trigger on 'main' branch after plan review.

#### 2.2.5.3.0.0.0.0 Stage Name

##### 2.2.5.3.1.0.0.0 Stage Name

3. Apply to Production

##### 2.2.5.3.2.0.0.0 Jobs

###### 2.2.5.3.2.1.0.0 Job Name

####### 2.2.5.3.2.1.1.0 Job Name

Manual Approval for Production Apply

####### 2.2.5.3.2.1.2.0 Tool

GitHub Actions

####### 2.2.5.3.2.1.3.0 Commands

- Requires manual approval from 'Infrastructure Leads' group.

####### 2.2.5.3.2.1.4.0 Dependencies

- 2. Apply to Staging

###### 2.2.5.3.2.2.0.0 Job Name

####### 2.2.5.3.2.2.1.0 Job Name

Apply Production Plan

####### 2.2.5.3.2.2.2.0 Tool

Terraform

####### 2.2.5.3.2.2.3.0 Commands

- terraform apply production.tfplan

####### 2.2.5.3.2.2.4.0 Dependencies

- Manual Approval for Production Apply

####### 2.2.5.3.2.2.5.0 Configuration

######## 2.2.5.3.2.2.5.1 Trigger

Manual trigger only. Cannot be automated.

### 2.2.6.0.0.0.0.0 Artifact Management

| Property | Value |
|----------|-------|
| Strategy | State File Management |
| Repository | Secure Remote Backend (e.g., Terraform Cloud, AWS ... |
| Versioning | The Terraform state file is versioned automaticall... |
| Promotion | Promotion is handled by applying a validated plan ... |

### 2.2.7.0.0.0.0.0 Rollback Strategy

| Property | Value |
|----------|-------|
| Mechanism | Git Revert & Re-apply |
| Procedure | Revert the problematic commit in the Git repositor... |
| Trigger | Manual decision following a failed deployment or p... |

