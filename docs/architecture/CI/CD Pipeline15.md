# 1 Pipelines

## 1.1 ci-cd-app-vercel

### 1.1.1 Id

ci-cd-app-vercel

### 1.1.2 Name

Application Continuous Integration & Deployment

### 1.1.3 Description

Builds, tests, validates, and orchestrates the deployment of the Next.js application to Vercel environments based on Git flow. This pipeline enforces quality and security gates before code is merged and deployed.

### 1.1.4 Stages

#### 1.1.4.1 PR Validation: Code Quality & Security

##### 1.1.4.1.1 Name

PR Validation: Code Quality & Security

##### 1.1.4.1.2 Steps

- npm ci
- npm run lint
- npm run sonar-scanner
- npm audit --audit-level=critical

##### 1.1.4.1.3 Environment

| Property | Value |
|----------|-------|
| Node Env | test |
| Sonar Host Url | https://sonarqube.example.com |
| Sonar Token | ${{ secrets.SONAR_TOKEN }} |

##### 1.1.4.1.4 Quality Gates

- {'name': 'Static Analysis & Security Gate', 'criteria': ['SonarQube Quality Gate must pass', 'No new bugs or code smells', 'No critical vulnerabilities found in dependencies'], 'blocking': True}

#### 1.1.4.2.0 PR Validation: Unit & Integration Testing

##### 1.1.4.2.1 Name

PR Validation: Unit & Integration Testing

##### 1.1.4.2.2 Steps

- npm ci
- npm test -- --coverage

##### 1.1.4.2.3 Environment

###### 1.1.4.2.3.1 Node Env

test

###### 1.1.4.2.3.2 Database Url

${{ secrets.TEST_DB_URL }}

##### 1.1.4.2.4.0 Quality Gates

- {'name': 'Test Coverage Gate', 'criteria': ['Unit test code coverage >= 80%'], 'blocking': True}

#### 1.1.4.3.0.0 PR Validation: End-to-End Testing

##### 1.1.4.3.1.0 Name

PR Validation: End-to-End Testing

##### 1.1.4.3.2.0 Steps

- npm ci
- npx playwright install --with-deps
- npm run test:e2e -- --reporter=junit

##### 1.1.4.3.3.0 Environment

###### 1.1.4.3.3.1 Base Url

${{ env.VERCEL_PREVIEW_URL }}

###### 1.1.4.3.3.2 Ci

true

##### 1.1.4.3.4.0 Quality Gates

- {'name': 'E2E Test Suite Gate', 'criteria': ['All Playwright E2E tests must pass against the Vercel preview deployment'], 'blocking': True}

#### 1.1.4.4.0.0 Deploy to Staging

##### 1.1.4.4.1.0 Name

Deploy to Staging

##### 1.1.4.4.2.0 Steps

- echo "Deployment to staging is automatically triggered by Vercel upon merge to 'staging' branch."
- npm run smoke-test -- --baseUrl=${{ secrets.STAGING_URL }}

##### 1.1.4.4.3.0 Environment

###### 1.1.4.4.3.1 Vercel Org Id

${{ secrets.VERCEL_ORG_ID }}

###### 1.1.4.4.3.2 Vercel Project Id

${{ secrets.VERCEL_PROJECT_ID }}

##### 1.1.4.4.4.0 Quality Gates

- {'name': 'Staging Health Check', 'criteria': ['Smoke tests pass successfully against the live staging environment'], 'blocking': False}

#### 1.1.4.5.0.0 Deploy to Production

##### 1.1.4.5.1.0 Name

Deploy to Production

##### 1.1.4.5.2.0 Steps

- echo "Deployment to production is automatically triggered by Vercel upon merge to 'main' branch."
- npm run smoke-test -- --baseUrl=${{ secrets.PRODUCTION_URL }}

##### 1.1.4.5.3.0 Environment

| Property | Value |
|----------|-------|
| Vercel Org Id | ${{ secrets.VERCEL_ORG_ID }} |
| Vercel Project Id | ${{ secrets.VERCEL_PROJECT_ID }} |
| Vercel Token | ${{ secrets.VERCEL_TOKEN }} |

##### 1.1.4.5.4.0 Quality Gates

- {'name': 'Production Approval Gate', 'criteria': ["Pull request from 'staging' to 'main' branch must be manually reviewed and approved by team lead"], 'blocking': True}

## 1.2.0.0.0.0 iac-terraform-delivery

### 1.2.1.0.0.0 Id

iac-terraform-delivery

### 1.2.2.0.0.0 Name

Infrastructure (Terraform) Delivery

### 1.2.3.0.0.0 Description

Manages the lifecycle of non-Vercel cloud infrastructure (e.g., ClickHouse, Upstash) using a secure GitOps workflow.

### 1.2.4.0.0.0 Stages

#### 1.2.4.1.0.0 PR: Plan & Review

##### 1.2.4.1.1.0 Name

PR: Plan & Review

##### 1.2.4.1.2.0 Steps

- terraform init
- terraform validate
- terraform plan -out=plan.tfplan

##### 1.2.4.1.3.0 Environment

###### 1.2.4.1.3.1 Tf Var Environment

production

###### 1.2.4.1.3.2 Aws Access Key Id

${{ secrets.AWS_ACCESS_KEY_ID }}

##### 1.2.4.1.4.0 Quality Gates

- {'name': 'Manual Plan Approval', 'criteria': ['Terraform plan output must be reviewed and approved by a senior engineer in the pull request'], 'blocking': True}

#### 1.2.4.2.0.0 Apply Production Changes

##### 1.2.4.2.1.0 Name

Apply Production Changes

##### 1.2.4.2.2.0 Steps

- terraform init
- terraform apply -auto-approve plan.tfplan

##### 1.2.4.2.3.0 Environment

###### 1.2.4.2.3.1 Tf Var Environment

production

###### 1.2.4.2.3.2 Aws Access Key Id

${{ secrets.AWS_ACCESS_KEY_ID }}

##### 1.2.4.2.4.0 Quality Gates

*No items available*

# 2.0.0.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Artifact Repository | Vercel (for deployments) |
| Default Branch | main |
| Retention Policy | 90d |
| Notification Channel | slack#cicd-alerts |

