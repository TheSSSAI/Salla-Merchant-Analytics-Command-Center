# 1 Analysis Metadata

| Property | Value |
|----------|-------|
| Analysis Timestamp | 2025-05-21T14:30:00Z |
| Repository Component Id | data-pipeline-service |
| Analysis Completeness Score | 98 |
| Critical Findings Count | 4 |
| Analysis Methodology | Systematic decomposition of architectural sequence... |

# 2 Repository Analysis

## 2.1 Repository Definition

### 2.1.1 Scope Boundaries

- Primary: Real-time webhook ingestion and cryptographic verification from Salla Platform
- Primary: Asynchronous ETL/ELT orchestration using Upstash QStash for reliable message delivery
- Primary: Data synchronization and transformation between PostgreSQL (OLTP) and ClickHouse (OLAP)
- Secondary: Management of long-running historical data import jobs via recursive serverless patterns

### 2.1.2 Technology Stack

- Runtime: Vercel Functions (Node.js 20.x)
- Queue/Scheduler: Upstash QStash
- Analytical DB: ClickHouse (via HTTP/Client)
- Operational DB: PostgreSQL (via Prisma)
- Language: TypeScript 5.4

### 2.1.3 Architectural Constraints

- Statelessness: Functions must not retain state between Webhook or QStash events
- Execution Time: Processing logic must fit within Vercel Function timeout limits (10s-60s)
- Cold Starts: Infrastructure initialization must be externalized to global scope
- Idempotency: Message handling must withstand at-least-once delivery guarantees

### 2.1.4 Dependency Relationships

#### 2.1.4.1 Upstream_Source: Salla Platform API / Webhooks

##### 2.1.4.1.1 Dependency Type

Upstream_Source

##### 2.1.4.1.2 Target Component

Salla Platform API / Webhooks

##### 2.1.4.1.3 Integration Pattern

Push (Webhook) & Pull (REST API)

##### 2.1.4.1.4 Reasoning

Source of truth for e-commerce transactions and catalog data.

#### 2.1.4.2.0 Infrastructure: Upstash QStash

##### 2.1.4.2.1 Dependency Type

Infrastructure

##### 2.1.4.2.2 Target Component

Upstash QStash

##### 2.1.4.2.3 Integration Pattern

Async Message Broker

##### 2.1.4.2.4 Reasoning

Decouples ingestion from processing to handle burst loads and manage retry policies.

#### 2.1.4.3.0 Data_Sink: ClickHouse Data Warehouse

##### 2.1.4.3.1 Dependency Type

Data_Sink

##### 2.1.4.3.2 Target Component

ClickHouse Data Warehouse

##### 2.1.4.3.3 Integration Pattern

Batch/Async Insert

##### 2.1.4.3.4 Reasoning

Destination for denormalized analytical data (SalesFact, AbandonedCartFact).

### 2.1.5.0.0 Analysis Insights

The repository is a high-throughput, backend-only service functioning as the nervous system of the platform. It creates a strict separation between the user-facing application and heavy data processing, leveraging QStash to overcome serverless timeout limitations for bulk operations.

# 3.0.0.0.0 Requirements Mapping

## 3.1.0.0.0 Functional Requirements

### 3.1.1.0.0 Requirement Id

#### 3.1.1.1.0 Requirement Id

REQ-TEC-003

#### 3.1.1.2.0 Requirement Description

Implement Change Data Capture (CDC) pipeline to sync OLTP to OLAP.

#### 3.1.1.3.0 Implementation Implications

- Requires event transformation logic to convert normalized Postgres entities into denormalized ClickHouse wide tables.
- Must use QStash to buffer high-velocity write events preventing ClickHouse connection saturation.

#### 3.1.1.4.0 Required Components

- WebhookHandler
- DataTransformer
- ClickHouseRepository

#### 3.1.1.5.0 Analysis Reasoning

Directly maps to the Sequence Diagram #427 defining the CDC flow.

### 3.1.2.0.0 Requirement Id

#### 3.1.2.1.0 Requirement Id

FR-104

#### 3.1.2.2.0 Requirement Description

Initial historical data synchronization with depth selection.

#### 3.1.2.3.0 Implementation Implications

- Requires a 'Recursive Function' pattern where a function processes a page of data and enqueues itself for the next page via QStash.
- Needs robust error handling to checkpoint progress in PostgreSQL.

#### 3.1.2.4.0 Required Components

- HistoricalSyncService
- JobStatusManager

#### 3.1.2.5.0 Analysis Reasoning

Serverless functions cannot handle long-running bulk imports in a single execution; recursive chaining is required.

## 3.2.0.0.0 Non Functional Requirements

### 3.2.1.0.0 Requirement Type

#### 3.2.1.1.0 Requirement Type

Performance

#### 3.2.1.2.0 Requirement Specification

Data freshness under 5 minutes (REQ-TEC-003).

#### 3.2.1.3.0 Implementation Impact

Processing pipeline must minimize latency; QStash delivery delay must be configured to zero/immediate.

#### 3.2.1.4.0 Design Constraints

- Avoid batching windows > 60 seconds
- Optimize ClickHouse inserts using Async Insert mode

#### 3.2.1.5.0 Analysis Reasoning

Strict latency requirement rules out purely scheduled batch jobs; event-driven near-real-time flow is necessary.

### 3.2.2.0.0 Requirement Type

#### 3.2.2.1.0 Requirement Type

Reliability

#### 3.2.2.2.0 Requirement Specification

Dead Letter Queue (DLQ) for failed messages.

#### 3.2.2.3.0 Implementation Impact

QStash DLQ configuration must be enabled; Vercel functions must explicitly return non-200 codes on retryable errors.

#### 3.2.2.4.0 Design Constraints

- Atomic database operations
- Idempotent message consumers

#### 3.2.2.5.0 Analysis Reasoning

Ensures no data loss during transformation failures or database outages.

## 3.3.0.0.0 Requirements Analysis Summary

The repository is driven by the need for high-fidelity data replication under strict timing constraints within a stateless environment. The primary challenge is balancing data freshness with the ephemeral nature of Vercel Functions.

# 4.0.0.0.0 Architecture Analysis

## 4.1.0.0.0 Architectural Patterns

### 4.1.1.0.0 Pattern Name

#### 4.1.1.1.0 Pattern Name

Pipes and Filters

#### 4.1.1.2.0 Pattern Application

Data ingestion pipeline where data flows through Ingestion -> Validation -> Transformation -> Loading steps.

#### 4.1.1.3.0 Required Components

- SignatureValidator
- PayloadTransformer
- LoaderService

#### 4.1.1.4.0 Implementation Strategy

Implemented via function composition and QStash message chaining.

#### 4.1.1.5.0 Analysis Reasoning

Allows independent scaling and testing of each processing step.

### 4.1.2.0.0 Pattern Name

#### 4.1.2.1.0 Pattern Name

Anti-Corruption Layer (ACL)

#### 4.1.2.2.0 Pattern Application

Transforming external Salla DTOs into internal Domain Models before persistence.

#### 4.1.2.3.0 Required Components

- SallaAdapter
- DomainMapper

#### 4.1.2.4.0 Implementation Strategy

Strict mapping logic located in the Application layer.

#### 4.1.2.5.0 Analysis Reasoning

Prevents vendor API changes (Salla) from breaking the core analytical schema.

## 4.2.0.0.0 Integration Points

### 4.2.1.0.0 Integration Type

#### 4.2.1.1.0 Integration Type

Inbound Webhook

#### 4.2.1.2.0 Target Components

- Salla Platform

#### 4.2.1.3.0 Communication Pattern

Push-based HTTP (Async)

#### 4.2.1.4.0 Interface Requirements

- HMAC-SHA256 Signature Validation
- 200 OK Acknowledgement

#### 4.2.1.5.0 Analysis Reasoning

Entry point for real-time data; security is paramount.

### 4.2.2.0.0 Integration Type

#### 4.2.2.1.0 Integration Type

Async Broker

#### 4.2.2.2.0 Target Components

- Upstash QStash

#### 4.2.2.3.0 Communication Pattern

Publish-Subscribe (HTTP)

#### 4.2.2.4.0 Interface Requirements

- Token Authorization
- Message Deduplication ID

#### 4.2.2.5.0 Analysis Reasoning

The backbone for decoupling ingestion from heavy processing.

## 4.3.0.0.0 Layering Strategy

| Property | Value |
|----------|-------|
| Layer Organization | Clean Architecture / Hexagonal adapted for Serverl... |
| Component Placement | Vercel API routes acts as Primary Adapters; Core l... |
| Analysis Reasoning | Ensures the domain logic (Transformation rules) is... |

# 5.0.0.0.0 Database Analysis

## 5.1.0.0.0 Entity Mappings

### 5.1.1.0.0 Entity Name

#### 5.1.1.1.0 Entity Name

SalesFact

#### 5.1.1.2.0 Database Table

clickhouse.sales_facts

#### 5.1.1.3.0 Required Properties

- eventDateTime
- merchantId
- revenue
- orderId

#### 5.1.1.4.0 Relationship Mappings

- Denormalized - contains Customer and Product snapshots

#### 5.1.1.5.0 Access Patterns

- Append-only inserts
- High-volume analytical aggregation

#### 5.1.1.6.0 Analysis Reasoning

Optimized for OLAP queries; relational constraints are relaxed for speed.

### 5.1.2.0.0 Entity Name

#### 5.1.2.1.0 Entity Name

SyncJob

#### 5.1.2.2.0 Database Table

postgres.sync_jobs

#### 5.1.2.3.0 Required Properties

- jobId
- merchantId
- status
- cursor

#### 5.1.2.4.0 Relationship Mappings

- Belongs to Merchant

#### 5.1.2.5.0 Access Patterns

- Transactional status updates
- Cursor checkpointing

#### 5.1.2.6.0 Analysis Reasoning

Critical for managing the state of long-running import processes.

## 5.2.0.0.0 Data Access Requirements

- {'operation_type': 'Bulk Insert', 'required_methods': ['insertSalesFactBatch', 'insertAbandonedCartFactBatch'], 'performance_constraints': 'Must utilize ClickHouse async insert or appropriate buffering to prevent too many small parts.', 'analysis_reasoning': 'ClickHouse performs poorly with frequent single-row inserts.'}

## 5.3.0.0.0 Persistence Strategy

| Property | Value |
|----------|-------|
| Orm Configuration | Prisma for PostgreSQL (Type safety); Native HTTP C... |
| Migration Requirements | Schema evolution must be decoupled; ClickHouse mig... |
| Analysis Reasoning | Different database technologies require specialize... |

# 6.0.0.0.0 Sequence Analysis

## 6.1.0.0.0 Interaction Patterns

### 6.1.1.0.0 Sequence Name

#### 6.1.1.1.0 Sequence Name

Real-time Webhook Processing

#### 6.1.1.2.0 Repository Role

Processor

#### 6.1.1.3.0 Required Interfaces

- IWebhookHandler
- IQStashPublisher

#### 6.1.1.4.0 Method Specifications

##### 6.1.1.4.1 Method Name

###### 6.1.1.4.1.1 Method Name

handleWebhook

###### 6.1.1.4.1.2 Interaction Context

Vercel Function Entry

###### 6.1.1.4.1.3 Parameter Analysis

Raw Request, Headers (Signature)

###### 6.1.1.4.1.4 Return Type Analysis

HTTP 200/400

###### 6.1.1.4.1.5 Analysis Reasoning

Fast validation and hand-off to queue to prevent timeout.

##### 6.1.1.4.2.0 Method Name

###### 6.1.1.4.2.1 Method Name

processEvent

###### 6.1.1.4.2.2 Interaction Context

QStash Consumer

###### 6.1.1.4.2.3 Parameter Analysis

Domain Event Payload

###### 6.1.1.4.2.4 Return Type Analysis

Void (Throws on error)

###### 6.1.1.4.2.5 Analysis Reasoning

Core ELT logic; idempotency check required here.

#### 6.1.1.5.0.0 Analysis Reasoning

Two-stage process (Ingest -> Process) ensures reliability.

### 6.1.2.0.0.0 Sequence Name

#### 6.1.2.1.0.0 Sequence Name

Historical Data Sync

#### 6.1.2.2.0.0 Repository Role

Orchestrator

#### 6.1.2.3.0.0 Required Interfaces

- ISallaClient
- ISyncJobRepository

#### 6.1.2.4.0.0 Method Specifications

- {'method_name': 'syncPage', 'interaction_context': 'Recursive Job Execution', 'parameter_analysis': 'PageNumber, MerchantID', 'return_type_analysis': 'NextPageToken | null', 'analysis_reasoning': 'Fetches data, saves to DB, then triggers self if more pages exist.'}

#### 6.1.2.5.0.0 Analysis Reasoning

Handles pagination and rate limits via distributed recursion.

## 6.2.0.0.0.0 Communication Protocols

- {'protocol_type': 'HTTP/REST', 'implementation_requirements': 'Standard Vercel Function signatures; QStash signing verification.', 'analysis_reasoning': 'Native protocol for Serverless and Webhook integrations.'}

# 7.0.0.0.0.0 Critical Analysis Findings

## 7.1.0.0.0.0 Finding Category

### 7.1.1.0.0.0 Finding Category

Architectural Risk

### 7.1.2.0.0.0 Finding Description

Dependency on QStash for bulk sync recursion creates a potential infinite loop or cost runaway if not governed by strict circuit breaking.

### 7.1.3.0.0.0 Implementation Impact

Must implement max-depth checks or token buckets in the SyncService.

### 7.1.4.0.0.0 Priority Level

High

### 7.1.5.0.0.0 Analysis Reasoning

Uncontrolled recursion can exhaust budgets or hit API rate limits rapidly.

## 7.2.0.0.0.0 Finding Category

### 7.2.1.0.0.0 Finding Category

Data Integrity

### 7.2.2.0.0.0 Finding Description

Dual-write nature (Postgres + ClickHouse) in the pipeline implies eventual consistency challenges.

### 7.2.3.0.0.0 Implementation Impact

Reconciliation job (Sequence 444) is critical and must be robust.

### 7.2.4.0.0.0 Priority Level

High

### 7.2.5.0.0.0 Analysis Reasoning

Events might reach Postgres but fail for ClickHouse; system needs self-healing.

## 7.3.0.0.0.0 Finding Category

### 7.3.1.0.0.0 Finding Category

Security

### 7.3.2.0.0.0 Finding Description

Vercel Functions are publicly accessible by default.

### 7.3.3.0.0.0 Implementation Impact

Strict middleware required to validate QStash signatures on consumer endpoints.

### 7.3.4.0.0.0 Priority Level

High

### 7.3.5.0.0.0 Analysis Reasoning

Prevents unauthorized triggering of heavy processing jobs.

# 8.0.0.0.0.0 Analysis Traceability

## 8.1.0.0.0.0 Cached Context Utilization

Utilized Sequences 424, 426, 427, 442, 444; Requirements REQ-TEC-003, FR-104; Database Design 80.

## 8.2.0.0.0.0 Analysis Decision Trail

- Identified Serverless constraints -> Mandated QStash for sync.
- Analyzed ELT requirement -> Separated ClickHouse DAO.
- Reviewed Webhook sequence -> Defined Signature Validation middleware.

## 8.3.0.0.0.0 Assumption Validations

- Verified that Salla API supports pagination for historical sync (Sequence 442).
- Confirmed QStash supports HTTP callbacks for Vercel Functions.

## 8.4.0.0.0.0 Cross Reference Checks

- Aligned Sequence 427 (CDC) with Architecture Layer definitions.
- Matched REQ-NFR-001 (Performance) with ClickHouse Async Insert strategy.

