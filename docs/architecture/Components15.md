# 1 Components

## 1.1 Components

### 1.1.1 spa-frontend-001

#### 1.1.1.1 Id

spa-frontend-001

#### 1.1.1.2 Name

Frontend SPA (React)

#### 1.1.1.3 Description

The client-side Single Page Application responsible for the entire user interface and experience. It is hosted on a CDN and communicates with backend services via the API Gateway.

#### 1.1.1.4 Type

🔹 FrontendApplication

#### 1.1.1.5 Dependencies

- api-gateway-001

#### 1.1.1.6 Properties

| Property | Value |
|----------|-------|
| Framework | React 18 |
| Language | TypeScript 5.4 |

#### 1.1.1.7 Interfaces

*No items available*

#### 1.1.1.8 Technology

React, Material-UI, Recharts, Quill.js

#### 1.1.1.9 Resources

*No data available*

#### 1.1.1.10 Configuration

##### 1.1.1.10.1 Api Endpoint

🔗 [https://api.example.com](https://api.example.com)

#### 1.1.1.11.0 Health Check

*No data available*

#### 1.1.1.12.0 Responsible Features

- REQ-FUNC-009
- REQ-FUNC-010
- REQ-FUNC-011
- REQ-FUNC-013
- REQ-FUNC-014
- REQ-FUNC-019
- REQ-FUNC-020
- REQ-UI-001
- REQ-UI-002
- REQ-UI-003
- REQ-UI-004
- REQ-UI-005

#### 1.1.1.13.0 Security

##### 1.1.1.13.1 Requires Authentication

❌ No

### 1.1.2.0.0 api-gateway-001

#### 1.1.2.1.0 Id

api-gateway-001

#### 1.1.2.2.0 Name

API Gateway

#### 1.1.2.3.0 Description

The single, managed entry point for all API calls. It handles routing, authentication, authorization, and request validation before forwarding requests to the appropriate backend service function.

#### 1.1.2.4.0 Type

🔹 Gateway

#### 1.1.2.5.0 Dependencies

- auth-service-001
- user-service-001
- analytics-service-001
- ai-assistant-service-001
- campaign-service-001

#### 1.1.2.6.0 Properties

*No data available*

#### 1.1.2.7.0 Interfaces

- REST API

#### 1.1.2.8.0 Technology

AWS API Gateway

#### 1.1.2.9.0 Resources

*No data available*

#### 1.1.2.10.0 Configuration

##### 1.1.2.10.1 Cors Policy

Strict

##### 1.1.2.10.2 Rate Limit

1000 requests/second

#### 1.1.2.11.0 Health Check

*No data available*

#### 1.1.2.12.0 Responsible Features

*No items available*

#### 1.1.2.13.0 Security

##### 1.1.2.13.1 Requires Authentication

✅ Yes

##### 1.1.2.13.2 Requires Authorization

✅ Yes

### 1.1.3.0.0 auth-service-001

#### 1.1.3.1.0 Id

auth-service-001

#### 1.1.3.2.0 Name

Authentication Service

#### 1.1.3.3.0 Description

Handles user authentication, session management using JWTs, and the secure password reset workflow. Implemented as one or more serverless functions.

#### 1.1.3.4.0 Type

🔹 Service

#### 1.1.3.5.0 Dependencies

- postgres-repository-001
- email-gateway-001
- audit-log-service-001

#### 1.1.3.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

#### 1.1.3.7.0 Interfaces

- POST /auth/login
- POST /auth/refresh
- POST /auth/forgot-password
- POST /auth/reset-password

#### 1.1.3.8.0 Technology

AWS Lambda

#### 1.1.3.9.0 Resources

##### 1.1.3.9.1 Memory

256MB

#### 1.1.3.10.0 Configuration

##### 1.1.3.10.1 Jwt Secret Key

@SecretsManager

##### 1.1.3.10.2 Password Reset Token Ttl

60 minutes

#### 1.1.3.11.0 Health Check

*No data available*

#### 1.1.3.12.0 Responsible Features

- REQ-FUNC-003

#### 1.1.3.13.0 Security

##### 1.1.3.13.1 Requires Authentication

❌ No

### 1.1.4.0.0 user-service-001

#### 1.1.4.1.0 Id

user-service-001

#### 1.1.4.2.0 Name

User & Merchant Service

#### 1.1.4.3.0 Description

Manages users, merchant accounts, roles, and invitations. Handles logic for team management, account switching, and compliance-related data requests. Implemented as a set of serverless functions.

#### 1.1.4.4.0 Type

🔹 Service

#### 1.1.4.5.0 Dependencies

- postgres-repository-001
- email-gateway-001
- audit-log-service-001

#### 1.1.4.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

#### 1.1.4.7.0 Interfaces

- POST /users/invite
- PUT /users/{userId}/role
- DELETE /users/{userId}
- POST /dsar

#### 1.1.4.8.0 Technology

AWS Lambda

#### 1.1.4.9.0 Resources

##### 1.1.4.9.1 Memory

256MB

#### 1.1.4.10.0 Configuration

##### 1.1.4.10.1 Invitation Token Ttl

7 days

#### 1.1.4.11.0 Health Check

*No data available*

#### 1.1.4.12.0 Responsible Features

- REQ-FUNC-006
- REQ-FUNC-007
- REQ-UI-001
- REQ-CMPL-001

#### 1.1.4.13.0 Security

##### 1.1.4.13.1 Requires Authentication

✅ Yes

##### 1.1.4.13.2 Requires Authorization

✅ Yes

##### 1.1.4.13.3 Allowed Roles

- Owner

### 1.1.5.0.0 analytics-service-001

#### 1.1.5.1.0 Id

analytics-service-001

#### 1.1.5.2.0 Name

Analytics Service

#### 1.1.5.3.0 Description

Generates and serves all analytical reports and sales forecasts by querying the OLAP data warehouse. Handles data filtering, comparison, and grouping logic. Implemented as a set of serverless functions.

#### 1.1.5.4.0 Type

🔹 Service

#### 1.1.5.5.0 Dependencies

- clickhouse-repository-001

#### 1.1.5.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

#### 1.1.5.7.0 Interfaces

- GET /reports/sales-trends
- GET /reports/customer-segmentation
- GET /reports/product-performance
- GET /reports/sales-forecast

#### 1.1.5.8.0 Technology

AWS Lambda

#### 1.1.5.9.0 Resources

##### 1.1.5.9.1 Memory

1024MB

##### 1.1.5.9.2 Timeout

30s

#### 1.1.5.10.0 Configuration

*No data available*

#### 1.1.5.11.0 Health Check

*No data available*

#### 1.1.5.12.0 Responsible Features

- REQ-FUNC-009
- REQ-FUNC-010
- REQ-FUNC-011
- REQ-FUNC-012

#### 1.1.5.13.0 Security

##### 1.1.5.13.1 Requires Authentication

✅ Yes

##### 1.1.5.13.2 Requires Authorization

✅ Yes

### 1.1.6.0.0 ai-assistant-service-001

#### 1.1.6.1.0 Id

ai-assistant-service-001

#### 1.1.6.2.0 Name

AI Assistant Service

#### 1.1.6.3.0 Description

Provides AI-powered features. Handles natural language queries using the RAG pattern and proactively generates insight cards. Implemented as one or more serverless functions.

#### 1.1.6.4.0 Type

🔹 Service

#### 1.1.6.5.0 Dependencies

- vector-db-repository-001
- openai-gateway-001
- postgres-repository-001

#### 1.1.6.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

#### 1.1.6.7.0 Interfaces

- POST /ai/query
- GET /ai/insights

#### 1.1.6.8.0 Technology

AWS Lambda

#### 1.1.6.9.0 Resources

##### 1.1.6.9.1 Memory

512MB

##### 1.1.6.9.2 Timeout

60s

#### 1.1.6.10.0 Configuration

*No data available*

#### 1.1.6.11.0 Health Check

*No data available*

#### 1.1.6.12.0 Responsible Features

- REQ-FUNC-014
- REQ-FUNC-015
- REQ-FUNC-016
- REQ-INTG-004

#### 1.1.6.13.0 Security

##### 1.1.6.13.1 Requires Authentication

✅ Yes

##### 1.1.6.13.2 Requires Authorization

✅ Yes

### 1.1.7.0.0 campaign-service-001

#### 1.1.7.1.0 Id

campaign-service-001

#### 1.1.7.2.0 Name

Cart Recovery & Campaign Service

#### 1.1.7.3.0 Description

Manages abandoned carts, email templates, and domain authentication for cart recovery campaigns. Implemented as a set of serverless functions.

#### 1.1.7.4.0 Type

🔹 Service

#### 1.1.7.5.0 Dependencies

- postgres-repository-001
- email-gateway-001

#### 1.1.7.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

#### 1.1.7.7.0 Interfaces

- GET /campaigns/templates
- POST /campaigns/templates
- GET /campaigns/analytics
- POST /domain/authenticate

#### 1.1.7.8.0 Technology

AWS Lambda

#### 1.1.7.9.0 Resources

##### 1.1.7.9.1 Memory

256MB

#### 1.1.7.10.0 Configuration

*No data available*

#### 1.1.7.11.0 Health Check

*No data available*

#### 1.1.7.12.0 Responsible Features

- REQ-FUNC-019
- REQ-FUNC-020
- REQ-FUNC-021

#### 1.1.7.13.0 Security

##### 1.1.7.13.1 Requires Authentication

✅ Yes

##### 1.1.7.13.2 Requires Authorization

✅ Yes

### 1.1.8.0.0 async-jobs-service-001

#### 1.1.8.1.0 Id

async-jobs-service-001

#### 1.1.8.2.0 Name

Asynchronous Jobs Service

#### 1.1.8.3.0 Description

Handles long-running, asynchronous tasks that are triggered by other services, such as exporting large reports to CSV. Uses a message queue for decoupling.

#### 1.1.8.4.0 Type

🔹 Service

#### 1.1.8.5.0 Dependencies

- clickhouse-repository-001
- notification-service-001

#### 1.1.8.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |
| Trigger | SQS Queue |

#### 1.1.8.7.0 Interfaces

- Event: ReportExportRequested

#### 1.1.8.8.0 Technology

AWS Lambda

#### 1.1.8.9.0 Resources

##### 1.1.8.9.1 Memory

2048MB

##### 1.1.8.9.2 Timeout

300s

#### 1.1.8.10.0 Configuration

*No data available*

#### 1.1.8.11.0 Health Check

*No data available*

#### 1.1.8.12.0 Responsible Features

- REQ-FUNC-013
- REQ-PERF-002

#### 1.1.8.13.0 Security

##### 1.1.8.13.1 Requires Authentication

❌ No

### 1.1.9.0.0 scheduled-tasks-service-001

#### 1.1.9.1.0 Id

scheduled-tasks-service-001

#### 1.1.9.2.0 Name

Scheduled Tasks Service

#### 1.1.9.3.0 Description

Executes periodic background jobs based on a schedule. Responsible for expiring tokens, purging old data according to retention policies, and triggering proactive AI analysis.

#### 1.1.9.4.0 Type

🔹 Service

#### 1.1.9.5.0 Dependencies

- postgres-repository-001
- ai-assistant-service-001

#### 1.1.9.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |
| Trigger | Scheduled Event (Cron) |

#### 1.1.9.7.0 Interfaces

- Event: HourlyTrigger
- Event: DailyTrigger

#### 1.1.9.8.0 Technology

AWS Lambda, AWS EventBridge Scheduler

#### 1.1.9.9.0 Resources

##### 1.1.9.9.1 Memory

512MB

#### 1.1.9.10.0 Configuration

##### 1.1.9.10.1 Purge Abandoned Cart Days

90

#### 1.1.9.11.0 Health Check

*No data available*

#### 1.1.9.12.0 Responsible Features

- REQ-FUNC-003
- REQ-FUNC-006
- REQ-DATA-001
- REQ-FUNC-015

#### 1.1.9.13.0 Security

##### 1.1.9.13.1 Requires Authentication

❌ No

### 1.1.10.0.0 data-pipeline-service-001

#### 1.1.10.1.0 Id

data-pipeline-service-001

#### 1.1.10.2.0 Name

Data Pipeline Service (CDC)

#### 1.1.10.3.0 Description

A managed data pipeline responsible for capturing changes from the OLTP database (PostgreSQL) and synchronizing them to the OLAP data warehouse (ClickHouse) for analytical queries.

#### 1.1.10.4.0 Type

🔹 DataPipeline

#### 1.1.10.5.0 Dependencies

*No items available*

#### 1.1.10.6.0 Properties

| Property | Value |
|----------|-------|
| Source | PostgreSQL |
| Target | ClickHouse |

#### 1.1.10.7.0 Interfaces

*No items available*

#### 1.1.10.8.0 Technology

AWS DMS or Debezium with Kafka/Kinesis

#### 1.1.10.9.0 Resources

*No data available*

#### 1.1.10.10.0 Configuration

##### 1.1.10.10.1 Replication Lag Target

< 5 minutes

#### 1.1.10.11.0 Health Check

*No data available*

#### 1.1.10.12.0 Responsible Features

- REQ-DATA-002

#### 1.1.10.13.0 Security

##### 1.1.10.13.1 Requires Authentication

❌ No

### 1.1.11.0.0 postgres-repository-001

#### 1.1.11.1.0 Id

postgres-repository-001

#### 1.1.11.2.0 Name

Postgres Repository

#### 1.1.11.3.0 Description

Data access layer for the primary OLTP database (PostgreSQL). Implements repository interfaces defined in the domain layer to handle all transactional data operations.

#### 1.1.11.4.0 Type

🔹 Repository

#### 1.1.11.5.0 Dependencies

*No items available*

#### 1.1.11.6.0 Properties

| Property | Value |
|----------|-------|
| Orm | Prisma 5.x |

#### 1.1.11.7.0 Interfaces

- IUserRepository
- ISalesOrderRepository
- ICampaignRepository

#### 1.1.11.8.0 Technology

Prisma

#### 1.1.11.9.0 Resources

*No data available*

#### 1.1.11.10.0 Configuration

*No data available*

#### 1.1.11.11.0 Health Check

*No data available*

#### 1.1.11.12.0 Responsible Features

*No items available*

#### 1.1.11.13.0 Security

##### 1.1.11.13.1 Requires Authentication

❌ No

### 1.1.12.0.0 clickhouse-repository-001

#### 1.1.12.1.0 Id

clickhouse-repository-001

#### 1.1.12.2.0 Name

ClickHouse Repository

#### 1.1.12.3.0 Description

Data access layer for the OLAP data warehouse (ClickHouse). Optimized for fast, complex analytical queries required for reports and dashboards.

#### 1.1.12.4.0 Type

🔹 Repository

#### 1.1.12.5.0 Dependencies

*No items available*

#### 1.1.12.6.0 Properties

*No data available*

#### 1.1.12.7.0 Interfaces

- IAnalyticsRepository

#### 1.1.12.8.0 Technology

@clickhouse/client

#### 1.1.12.9.0 Resources

*No data available*

#### 1.1.12.10.0 Configuration

*No data available*

#### 1.1.12.11.0 Health Check

*No data available*

#### 1.1.12.12.0 Responsible Features

*No items available*

#### 1.1.12.13.0 Security

##### 1.1.12.13.1 Requires Authentication

❌ No

### 1.1.13.0.0 vector-db-repository-001

#### 1.1.13.1.0 Id

vector-db-repository-001

#### 1.1.13.2.0 Name

Vector Database Repository

#### 1.1.13.3.0 Description

Handles storage and retrieval of vector embeddings of merchant data. This is the retrieval component for the RAG pattern used by the AI Assistant.

#### 1.1.13.4.0 Type

🔹 Repository

#### 1.1.13.5.0 Dependencies

*No items available*

#### 1.1.13.6.0 Properties

*No data available*

#### 1.1.13.7.0 Interfaces

- findSimilar(vector, merchantId)

#### 1.1.13.8.0 Technology

Pinecone

#### 1.1.13.9.0 Resources

*No data available*

#### 1.1.13.10.0 Configuration

*No data available*

#### 1.1.13.11.0 Health Check

*No data available*

#### 1.1.13.12.0 Responsible Features

- REQ-INTG-004

#### 1.1.13.13.0 Security

##### 1.1.13.13.1 Requires Authentication

❌ No

### 1.1.14.0.0 email-gateway-001

#### 1.1.14.1.0 Id

email-gateway-001

#### 1.1.14.2.0 Name

Email Gateway

#### 1.1.14.3.0 Description

A gateway component that abstracts the interaction with a third-party email service provider (e.g., AWS SES, SendGrid).

#### 1.1.14.4.0 Type

🔹 Gateway

#### 1.1.14.5.0 Dependencies

*No items available*

#### 1.1.14.6.0 Properties

*No data available*

#### 1.1.14.7.0 Interfaces

- sendEmail(to, subject, body)

#### 1.1.14.8.0 Technology

AWS SDK for SES

#### 1.1.14.9.0 Resources

*No data available*

#### 1.1.14.10.0 Configuration

*No data available*

#### 1.1.14.11.0 Health Check

*No data available*

#### 1.1.14.12.0 Responsible Features

- REQ-FUNC-003
- REQ-FUNC-006
- REQ-FUNC-019

#### 1.1.14.13.0 Security

##### 1.1.14.13.1 Requires Authentication

❌ No

### 1.1.15.0.0 openai-gateway-001

#### 1.1.15.1.0 Id

openai-gateway-001

#### 1.1.15.2.0 Name

OpenAI Gateway

#### 1.1.15.3.0 Description

A gateway component that encapsulates all communication with the OpenAI API, handling API key management, request formatting, and error handling.

#### 1.1.15.4.0 Type

🔹 Gateway

#### 1.1.15.5.0 Dependencies

*No items available*

#### 1.1.15.6.0 Properties

*No data available*

#### 1.1.15.7.0 Interfaces

- generateCompletion(prompt)

#### 1.1.15.8.0 Technology

OpenAI Node.js SDK

#### 1.1.15.9.0 Resources

*No data available*

#### 1.1.15.10.0 Configuration

##### 1.1.15.10.1 Api Key

@SecretsManager

#### 1.1.15.11.0 Health Check

*No data available*

#### 1.1.15.12.0 Responsible Features

- REQ-INTG-004

#### 1.1.15.13.0 Security

##### 1.1.15.13.1 Requires Authentication

❌ No

### 1.1.16.0.0 audit-log-service-001

#### 1.1.16.1.0 Id

audit-log-service-001

#### 1.1.16.2.0 Name

Audit Log Service

#### 1.1.16.3.0 Description

A centralized service or shared library for writing to the immutable audit log. Ensures all security-sensitive events are recorded consistently.

#### 1.1.16.4.0 Type

🔹 Service

#### 1.1.16.5.0 Dependencies

- postgres-repository-001

#### 1.1.16.6.0 Properties

*No data available*

#### 1.1.16.7.0 Interfaces

- logEvent(eventType, details)

#### 1.1.16.8.0 Technology

TypeScript Library

#### 1.1.16.9.0 Resources

*No data available*

#### 1.1.16.10.0 Configuration

##### 1.1.16.10.1 Retention Period

12 months

#### 1.1.16.11.0 Health Check

*No data available*

#### 1.1.16.12.0 Responsible Features

- REQ-SEC-005

#### 1.1.16.13.0 Security

##### 1.1.16.13.1 Requires Authentication

❌ No

## 1.2.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Environment | production |
| Logging Level | INFO |
| Cache Ttl | 3600 |
| Max Threads | N/A (Serverless) |

# 2.0.0.0.0 Component Relations

## 2.1.0.0.0 Architecture

### 2.1.1.0.0 Components

#### 2.1.1.1.0 spa-frontend-001

##### 2.1.1.1.1 Id

spa-frontend-001

##### 2.1.1.1.2 Name

WebApp

##### 2.1.1.1.3 Description

The client-side Single Page Application that serves as the user interface. It is responsible for all rendering, client-side logic, and communication with the backend.

##### 2.1.1.1.4 Type

🔹 SPA

##### 2.1.1.1.5 Dependencies

- api-gateway-002

##### 2.1.1.1.6 Properties

| Property | Value |
|----------|-------|
| Version | 1.0.0 |
| Deployment | CDN (e.g., AWS CloudFront) |

##### 2.1.1.1.7 Interfaces

*No items available*

##### 2.1.1.1.8 Technology

React 18, TypeScript, Material-UI, Recharts

##### 2.1.1.1.9 Resources

*No data available*

##### 2.1.1.1.10 Configuration

*No data available*

##### 2.1.1.1.11 Health Check

*No data available*

##### 2.1.1.1.12 Responsible Features

- REQ-UI-001
- REQ-UI-002
- REQ-UI-003
- REQ-UI-004
- REQ-UI-005
- REQ-FUNC-009
- REQ-FUNC-019

##### 2.1.1.1.13 Security

###### 2.1.1.1.13.1 Requires Authentication

❌ No

#### 2.1.1.2.0.0 api-gateway-002

##### 2.1.1.2.1.0 Id

api-gateway-002

##### 2.1.1.2.2.0 Name

ApiGateway

##### 2.1.1.2.3.0 Description

A managed API Gateway that acts as the single entry point for all client requests. It handles routing, authentication, authorization, and rate limiting.

##### 2.1.1.2.4.0 Type

🔹 Gateway

##### 2.1.1.2.5.0 Dependencies

- user-management-service-003
- analytics-service-004
- ai-assistant-service-005
- cart-recovery-service-006
- compliance-service-007

##### 2.1.1.2.6.0 Properties

*No data available*

##### 2.1.1.2.7.0 Interfaces

- REST API

##### 2.1.1.2.8.0 Technology

AWS API Gateway

##### 2.1.1.2.9.0 Resources

*No data available*

##### 2.1.1.2.10.0 Configuration

| Property | Value |
|----------|-------|
| Cors Policy | Strict |
| Jwt Authorizer | Enabled |
| Request Validation | Enabled |

##### 2.1.1.2.11.0 Health Check

*No data available*

##### 2.1.1.2.12.0 Responsible Features

- REQ-SEC-005 (Audit Logging Trigger)
- REQ-SCAL-001 (Entry Point)

##### 2.1.1.2.13.0 Security

###### 2.1.1.2.13.1 Requires Authentication

✅ Yes

###### 2.1.1.2.13.2 Requires Authorization

✅ Yes

###### 2.1.1.2.13.3 Allowed Roles

- Owner
- Admin
- Analyst
- Marketer

#### 2.1.1.3.0.0 user-management-service-003

##### 2.1.1.3.1.0 Id

user-management-service-003

##### 2.1.1.3.2.0 Name

UserManagementService

##### 2.1.1.3.3.0 Description

A collection of serverless functions that handle all aspects of user and merchant account management, including invitations and password resets.

##### 2.1.1.3.4.0 Type

🔹 Serverless Function Group

##### 2.1.1.3.5.0 Dependencies

- oltp-repository-008
- notification-gateway-009
- audit-logger-010

##### 2.1.1.3.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

##### 2.1.1.3.7.0 Interfaces

*No items available*

##### 2.1.1.3.8.0 Technology

AWS Lambda, TypeScript

##### 2.1.1.3.9.0 Resources

###### 2.1.1.3.9.1 Memory

256MB

##### 2.1.1.3.10.0 Configuration

###### 2.1.1.3.10.1 Password Reset Token Ttl

60m

###### 2.1.1.3.10.2 Invitation Token Ttl

7d

##### 2.1.1.3.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 300 |
| Timeout | 10 |

##### 2.1.1.3.12.0 Responsible Features

- REQ-FUNC-003
- REQ-FUNC-006
- REQ-FUNC-007

##### 2.1.1.3.13.0 Security

###### 2.1.1.3.13.1 Requires Authentication

✅ Yes

###### 2.1.1.3.13.2 Requires Authorization

✅ Yes

#### 2.1.1.4.0.0 analytics-service-004

##### 2.1.1.4.1.0 Id

analytics-service-004

##### 2.1.1.4.2.0 Name

AnalyticsService

##### 2.1.1.4.3.0 Description

A collection of serverless functions for generating and exporting analytical reports and sales forecasts. Employs asynchronous processing for long-running reports.

##### 2.1.1.4.4.0 Type

🔹 Serverless Function Group

##### 2.1.1.4.5.0 Dependencies

- olap-repository-008
- async-task-queue-013

##### 2.1.1.4.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

##### 2.1.1.4.7.0 Interfaces

*No items available*

##### 2.1.1.4.8.0 Technology

AWS Lambda, TypeScript

##### 2.1.1.4.9.0 Resources

###### 2.1.1.4.9.1 Memory

1024MB

###### 2.1.1.4.9.2 Timeout

300s

##### 2.1.1.4.10.0 Configuration

###### 2.1.1.4.10.1 Forecast Horizon

30d

##### 2.1.1.4.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 300 |
| Timeout | 10 |

##### 2.1.1.4.12.0 Responsible Features

- REQ-FUNC-009
- REQ-FUNC-010
- REQ-FUNC-011
- REQ-FUNC-012
- REQ-FUNC-013
- REQ-PERF-002

##### 2.1.1.4.13.0 Security

###### 2.1.1.4.13.1 Requires Authentication

✅ Yes

###### 2.1.1.4.13.2 Requires Authorization

✅ Yes

#### 2.1.1.5.0.0 ai-assistant-service-005

##### 2.1.1.5.1.0 Id

ai-assistant-service-005

##### 2.1.1.5.2.0 Name

AIAssistantService

##### 2.1.1.5.3.0 Description

A collection of serverless functions that power the AI Assistant, implementing the RAG pattern for natural language queries and proactive insight generation.

##### 2.1.1.5.4.0 Type

🔹 Serverless Function Group

##### 2.1.1.5.5.0 Dependencies

- olap-repository-008
- vector-db-repository-011
- openai-gateway-012

##### 2.1.1.5.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

##### 2.1.1.5.7.0 Interfaces

*No items available*

##### 2.1.1.5.8.0 Technology

AWS Lambda, TypeScript

##### 2.1.1.5.9.0 Resources

###### 2.1.1.5.9.1 Memory

512MB

###### 2.1.1.5.9.2 Timeout

30s

##### 2.1.1.5.10.0 Configuration

###### 2.1.1.5.10.1 Open Aimodel

gpt-4-turbo

##### 2.1.1.5.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 300 |
| Timeout | 10 |

##### 2.1.1.5.12.0 Responsible Features

- REQ-FUNC-014
- REQ-FUNC-015
- REQ-FUNC-016
- REQ-INTG-004

##### 2.1.1.5.13.0 Security

###### 2.1.1.5.13.1 Requires Authentication

✅ Yes

###### 2.1.1.5.13.2 Requires Authorization

✅ Yes

#### 2.1.1.6.0.0 cart-recovery-service-006

##### 2.1.1.6.1.0 Id

cart-recovery-service-006

##### 2.1.1.6.2.0 Name

CartRecoveryService

##### 2.1.1.6.3.0 Description

A collection of serverless functions for managing abandoned cart recovery campaigns, including email templates and domain authentication.

##### 2.1.1.6.4.0 Type

🔹 Serverless Function Group

##### 2.1.1.6.5.0 Dependencies

- oltp-repository-008
- notification-gateway-009

##### 2.1.1.6.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

##### 2.1.1.6.7.0 Interfaces

*No items available*

##### 2.1.1.6.8.0 Technology

AWS Lambda, TypeScript

##### 2.1.1.6.9.0 Resources

###### 2.1.1.6.9.1 Memory

256MB

##### 2.1.1.6.10.0 Configuration

*No data available*

##### 2.1.1.6.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 300 |
| Timeout | 10 |

##### 2.1.1.6.12.0 Responsible Features

- REQ-FUNC-019
- REQ-FUNC-020
- REQ-FUNC-021

##### 2.1.1.6.13.0 Security

###### 2.1.1.6.13.1 Requires Authentication

✅ Yes

###### 2.1.1.6.13.2 Requires Authorization

✅ Yes

#### 2.1.1.7.0.0 compliance-service-007

##### 2.1.1.7.1.0 Id

compliance-service-007

##### 2.1.1.7.2.0 Name

ComplianceService

##### 2.1.1.7.3.0 Description

A collection of serverless functions for handling compliance-related tasks, specifically managing Data Subject Access Requests (DSARs).

##### 2.1.1.7.4.0 Type

🔹 Serverless Function Group

##### 2.1.1.7.5.0 Dependencies

- oltp-repository-008
- audit-logger-010

##### 2.1.1.7.6.0 Properties

| Property | Value |
|----------|-------|
| Runtime | Node.js 20.x |

##### 2.1.1.7.7.0 Interfaces

*No items available*

##### 2.1.1.7.8.0 Technology

AWS Lambda, TypeScript

##### 2.1.1.7.9.0 Resources

###### 2.1.1.7.9.1 Memory

256MB

##### 2.1.1.7.10.0 Configuration

*No data available*

##### 2.1.1.7.11.0 Health Check

| Property | Value |
|----------|-------|
| Path | /health |
| Interval | 300 |
| Timeout | 10 |

##### 2.1.1.7.12.0 Responsible Features

- REQ-CMPL-001

##### 2.1.1.7.13.0 Security

###### 2.1.1.7.13.1 Requires Authentication

✅ Yes

###### 2.1.1.7.13.2 Requires Authorization

✅ Yes

###### 2.1.1.7.13.3 Allowed Roles

- Owner

#### 2.1.1.8.0.0 oltp-repository-008

##### 2.1.1.8.1.0 Id

oltp-repository-008

##### 2.1.1.8.2.0 Name

OLTPRepository

##### 2.1.1.8.3.0 Description

An infrastructure component providing data access to the primary OLTP database (PostgreSQL). It implements the repository interfaces defined in the domain layer.

##### 2.1.1.8.4.0 Type

🔹 Repository

##### 2.1.1.8.5.0 Dependencies

*No items available*

##### 2.1.1.8.6.0 Properties

| Property | Value |
|----------|-------|
| Database | PostgreSQL |

##### 2.1.1.8.7.0 Interfaces

- IUserRepository
- ICustomerRepository
- ISalesOrderRepository

##### 2.1.1.8.8.0 Technology

Prisma

##### 2.1.1.8.9.0 Resources

*No data available*

##### 2.1.1.8.10.0 Configuration

*No data available*

##### 2.1.1.8.11.0 Security

###### 2.1.1.8.11.1 Requires Authentication

❌ No

#### 2.1.1.9.0.0 olap-repository-008

##### 2.1.1.9.1.0 Id

olap-repository-008

##### 2.1.1.9.2.0 Name

OLAPRepository

##### 2.1.1.9.3.0 Description

An infrastructure component providing data access to the OLAP data warehouse (ClickHouse) for fast analytical queries.

##### 2.1.1.9.4.0 Type

🔹 Repository

##### 2.1.1.9.5.0 Dependencies

*No items available*

##### 2.1.1.9.6.0 Properties

| Property | Value |
|----------|-------|
| Database | ClickHouse |

##### 2.1.1.9.7.0 Interfaces

- IAnalyticsRepository

##### 2.1.1.9.8.0 Technology

@clickhouse/client

##### 2.1.1.9.9.0 Resources

*No data available*

##### 2.1.1.9.10.0 Configuration

*No data available*

##### 2.1.1.9.11.0 Security

###### 2.1.1.9.11.1 Requires Authentication

❌ No

#### 2.1.1.10.0.0 notification-gateway-009

##### 2.1.1.10.1.0 Id

notification-gateway-009

##### 2.1.1.10.2.0 Name

NotificationGateway

##### 2.1.1.10.3.0 Description

An infrastructure gateway responsible for sending all transactional emails, such as password resets and user invitations.

##### 2.1.1.10.4.0 Type

🔹 Gateway

##### 2.1.1.10.5.0 Dependencies

*No items available*

##### 2.1.1.10.6.0 Properties

*No data available*

##### 2.1.1.10.7.0 Interfaces

- IEmailService

##### 2.1.1.10.8.0 Technology

AWS SES SDK

##### 2.1.1.10.9.0 Resources

*No data available*

##### 2.1.1.10.10.0 Configuration

###### 2.1.1.10.10.1 Retry Attempts

3

##### 2.1.1.10.11.0 Security

###### 2.1.1.10.11.1 Requires Authentication

❌ No

#### 2.1.1.11.0.0 audit-logger-010

##### 2.1.1.11.1.0 Id

audit-logger-010

##### 2.1.1.11.2.0 Name

AuditLogger

##### 2.1.1.11.3.0 Description

A cross-cutting service responsible for writing security-sensitive events to an immutable audit log in a standardized format.

##### 2.1.1.11.4.0 Type

🔹 Service

##### 2.1.1.11.5.0 Dependencies

- oltp-repository-008

##### 2.1.1.11.6.0 Properties

*No data available*

##### 2.1.1.11.7.0 Interfaces

- IAuditLogger

##### 2.1.1.11.8.0 Technology

Winston (structured logging)

##### 2.1.1.11.9.0 Resources

*No data available*

##### 2.1.1.11.10.0 Configuration

###### 2.1.1.11.10.1 Log Retention

12 months

##### 2.1.1.11.11.0 Responsible Features

- REQ-SEC-005

##### 2.1.1.11.12.0 Security

###### 2.1.1.11.12.1 Requires Authentication

❌ No

#### 2.1.1.12.0.0 vector-db-repository-011

##### 2.1.1.12.1.0 Id

vector-db-repository-011

##### 2.1.1.12.2.0 Name

VectorDBRepository

##### 2.1.1.12.3.0 Description

An infrastructure component that provides an interface to the vector database for storing and retrieving data embeddings as part of the RAG pattern.

##### 2.1.1.12.4.0 Type

🔹 Repository

##### 2.1.1.12.5.0 Dependencies

*No items available*

##### 2.1.1.12.6.0 Properties

| Property | Value |
|----------|-------|
| Database | Pinecone |

##### 2.1.1.12.7.0 Interfaces

- IVectorRepository

##### 2.1.1.12.8.0 Technology

Pinecone SDK

##### 2.1.1.12.9.0 Resources

*No data available*

##### 2.1.1.12.10.0 Configuration

*No data available*

##### 2.1.1.12.11.0 Responsible Features

- REQ-INTG-004

##### 2.1.1.12.12.0 Security

###### 2.1.1.12.12.1 Requires Authentication

❌ No

#### 2.1.1.13.0.0 openai-gateway-012

##### 2.1.1.13.1.0 Id

openai-gateway-012

##### 2.1.1.13.2.0 Name

OpenAIGateway

##### 2.1.1.13.3.0 Description

An infrastructure gateway that encapsulates all communication with the OpenAI API, handling API key management and request formatting.

##### 2.1.1.13.4.0 Type

🔹 Gateway

##### 2.1.1.13.5.0 Dependencies

*No items available*

##### 2.1.1.13.6.0 Properties

*No data available*

##### 2.1.1.13.7.0 Interfaces

- ILLMService

##### 2.1.1.13.8.0 Technology

OpenAI Node.js SDK

##### 2.1.1.13.9.0 Resources

*No data available*

##### 2.1.1.13.10.0 Configuration

###### 2.1.1.13.10.1 Timeout

25s

###### 2.1.1.13.10.2 Pii Scrubber

Enabled

##### 2.1.1.13.11.0 Responsible Features

- REQ-INTG-004

##### 2.1.1.13.12.0 Security

###### 2.1.1.13.12.1 Requires Authentication

❌ No

#### 2.1.1.14.0.0 async-task-queue-013

##### 2.1.1.14.1.0 Id

async-task-queue-013

##### 2.1.1.14.2.0 Name

AsyncTaskQueue

##### 2.1.1.14.3.0 Description

A managed message queue used to decouple long-running tasks, such as complex report generation, from the initial API request.

##### 2.1.1.14.4.0 Type

🔹 Queue

##### 2.1.1.14.5.0 Dependencies

*No items available*

##### 2.1.1.14.6.0 Properties

*No data available*

##### 2.1.1.14.7.0 Interfaces

*No items available*

##### 2.1.1.14.8.0 Technology

AWS SQS

##### 2.1.1.14.9.0 Resources

*No data available*

##### 2.1.1.14.10.0 Configuration

###### 2.1.1.14.10.1 Visibility Timeout

300s

###### 2.1.1.14.10.2 Dead Letter Queue

Enabled

##### 2.1.1.14.11.0 Responsible Features

- REQ-PERF-002

##### 2.1.1.14.12.0 Security

###### 2.1.1.14.12.1 Requires Authentication

❌ No

#### 2.1.1.15.0.0 data-pipeline-processor-014

##### 2.1.1.15.1.0 Id

data-pipeline-processor-014

##### 2.1.1.15.2.0 Name

DataPipelineProcessor

##### 2.1.1.15.3.0 Description

A background processing component, implemented as a serverless function, that is triggered by CDC events to synchronize data from PostgreSQL to ClickHouse.

##### 2.1.1.15.4.0 Type

🔹 Background Process

##### 2.1.1.15.5.0 Dependencies

- olap-repository-008

##### 2.1.1.15.6.0 Properties

| Property | Value |
|----------|-------|
| Trigger | CDC Event (e.g., from AWS DMS or Debezium) |

##### 2.1.1.15.7.0 Interfaces

*No items available*

##### 2.1.1.15.8.0 Technology

AWS Lambda

##### 2.1.1.15.9.0 Resources

###### 2.1.1.15.9.1 Memory

512MB

##### 2.1.1.15.10.0 Configuration

###### 2.1.1.15.10.1 Batch Size

1000

##### 2.1.1.15.11.0 Responsible Features

- REQ-DATA-002

##### 2.1.1.15.12.0 Security

###### 2.1.1.15.12.1 Requires Authentication

❌ No

#### 2.1.1.16.0.0 scheduled-jobs-processor-015

##### 2.1.1.16.1.0 Id

scheduled-jobs-processor-015

##### 2.1.1.16.2.0 Name

ScheduledJobsProcessor

##### 2.1.1.16.3.0 Description

A serverless function triggered on a schedule to perform routine maintenance and background tasks.

##### 2.1.1.16.4.0 Type

🔹 Background Process

##### 2.1.1.16.5.0 Dependencies

- oltp-repository-008
- ai-assistant-service-005

##### 2.1.1.16.6.0 Properties

| Property | Value |
|----------|-------|
| Trigger | Scheduled Cron (e.g., via AWS EventBridge Schedule... |

##### 2.1.1.16.7.0 Interfaces

*No items available*

##### 2.1.1.16.8.0 Technology

AWS Lambda

##### 2.1.1.16.9.0 Resources

###### 2.1.1.16.9.1 Memory

256MB

##### 2.1.1.16.10.0 Configuration

| Property | Value |
|----------|-------|
| Purge Schedule | daily at 02:00 UTC |
| Token Expiration Schedule | every 5 minutes |
| Insight Generation Schedule | daily at 03:00 UTC |

##### 2.1.1.16.11.0 Responsible Features

- REQ-DATA-001
- REQ-FUNC-015
- REQ-FUNC-003 (Constraint)
- REQ-FUNC-006 (Constraint)

##### 2.1.1.16.12.0 Security

###### 2.1.1.16.12.1 Requires Authentication

❌ No

### 2.1.2.0.0.0 Configuration

#### 2.1.2.1.0.0 Environment

production

#### 2.1.2.2.0.0 Logging Level

INFO

#### 2.1.2.3.0.0 Observability

| Property | Value |
|----------|-------|
| Logging | Structured JSON via Winston |
| Metrics | CloudWatch Custom Metrics |
| Tracing | AWS X-Ray |

