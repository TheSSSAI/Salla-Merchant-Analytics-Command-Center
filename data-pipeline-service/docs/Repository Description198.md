# 1 Id

REPO-SVC-DATA-001

# 2 Name

data-pipeline-service

# 3 Description

A dedicated, backend-only service responsible for the entire Change Data Capture (CDC) and Extract, Load, Transform (ELT) pipeline, as mandated by REQ-TEC-003. This service was extracted from the original monorepo to isolate this critical, high-throughput infrastructure component. Its sole responsibility is to ingest real-time data from Salla via Webhooks, process it, and synchronize it from the OLTP (PostgreSQL) database to the OLAP (ClickHouse) data warehouse. It also handles the initial bulk data import (FR-104) and nightly reconciliation jobs. Because it has a different scaling profile and deployment lifecycle from the user-facing web app, its separation allows it to be optimized, scaled, and deployed independently, ensuring the reliability and freshness of the analytical data without impacting the main application.

# 4 Type

🔹 Business Logic

# 5 Namespace

Salla.Analytics.DataPipeline

# 6 Output Path

dist

# 7 Framework

N/A (Serverless Functions)

# 8 Language

TypeScript

# 9 Technology

Vercel Functions, Upstash QStash, ClickHouse

# 10 Thirdparty Libraries

- @clickhouse/client

# 11 Layer Ids

- data-pipeline-layer

# 12 Dependencies

- REPO-LIB-DATA-001
- REPO-LIB-CORE-001
- REPO-LIB-SDK-001

# 13 Requirements

## 13.1 Requirement Id

### 13.1.1 Requirement Id

REQ-TEC-003

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

REQ-NFR-001

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

Event-Driven / ETL

# 17.0.0 Architecture Map

- data-pipeline-service-001

# 18.0.0 Components Map

- data-pipeline-processor-014

# 19.0.0 Requirements Map

- REQ-DATA-002

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

NEW_DECOMPOSED

## 20.2.0 Source Repository

REPO-APP-001

## 20.3.0 Decomposition Reasoning

This critical background process has a completely different operational profile (high-throughput, asynchronous, event-driven) than the synchronous, user-facing web app. Separating it into its own service allows it to be scaled, deployed, and monitored independently, preventing data ingestion issues from affecting the main application's availability.

## 20.4.0 Extracted Responsibilities

- Webhook ingestion.
- Initial historical data sync.
- CDC event processing from OLTP to OLAP.
- Data validation and transformation logic.

## 20.5.0 Reusability Scope

- This service is highly specific to this application's data architecture.

## 20.6.0 Development Benefits

- Allows a dedicated data engineering team to own the data pipeline.
- Decouples the data ingestion lifecycle from the feature development lifecycle.
- Simplifies performance tuning and resource allocation for data processing.

# 21.0.0 Dependency Contracts

## 21.1.0 Repo-Lib-Sdk-001

### 21.1.1 Required Interfaces

- {'interface': 'ISallaGateway', 'methods': ['getOrders(since: Date)', 'getProducts(page: number)'], 'events': [], 'properties': []}

### 21.1.2 Integration Pattern

NPM Package Dependency

### 21.1.3 Communication Protocol

Compile-time Import

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'Webhook Endpoints', 'methods': ['POST /webhooks/salla/order-created'], 'events': [], 'properties': [], 'consumers': ['Salla Platform']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | N/A |
| Event Communication | Core of the service. It consumes webhook events an... |
| Data Flow | Extracts from Salla API / OLTP DB -> Transforms da... |
| Error Handling | Uses a Dead-Letter Queue (DLQ) for messages that f... |
| Async Patterns | The entire service is asynchronous, built on messa... |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Functions should be stateless and idempotent. Use ... |
| Performance Considerations | Monitor queue depth and processing latency closely... |
| Security Considerations | Webhook endpoints must validate the cryptographic ... |
| Testing Approach | Focus on integration tests that simulate webhook e... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- Data ingestion from Salla.
- Data transformation and loading into ClickHouse.
- Error handling and logging for the pipeline.

## 25.2.0 Must Not Implement

- Any user-facing UI or APIs.
- Business logic unrelated to data synchronization.

## 25.3.0 Extension Points

- New handlers can be added to process additional webhook events or sync new data entities.

## 25.4.0 Validation Rules

- All incoming data must be validated against a schema before being loaded into the data warehouse.

