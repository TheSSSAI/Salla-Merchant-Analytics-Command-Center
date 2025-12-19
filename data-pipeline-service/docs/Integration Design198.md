# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-SVC-DATA-001 |
| Extraction Timestamp | 2025-05-22T15:30:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-DATA-002

#### 1.2.1.2 Requirement Text

The system shall implement a Change Data Capture (CDC) based data pipeline to synchronize data from the OLTP database (PostgreSQL) to the OLAP data warehouse (ClickHouse).

#### 1.2.1.3 Validation Criteria

- Events are reliably captured and queued via Upstash QStash
- Data is transformed and loaded into ClickHouse within 5 minutes

#### 1.2.1.4 Implementation Implications

- Expose webhook endpoints for real-time data ingestion
- Implement idempotent consumers for QStash events
- Configure Dead Letter Queues (DLQ) for failed transformations

#### 1.2.1.5 Extraction Reasoning

Core responsibility of the data-pipeline-service.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

FR-104

#### 1.2.2.2 Requirement Text

The system shall support an initial bulk import of historical data from the Salla platform.

#### 1.2.2.3 Validation Criteria

- Recursive job handling for pagination
- Resilient to API rate limits

#### 1.2.2.4 Implementation Implications

- Implement 'Recursive Function' pattern using QStash to chain page fetches
- Use SallaGateway for data fetching

#### 1.2.2.5 Extraction Reasoning

Historical sync logic resides in this service.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-INTG-004

#### 1.2.3.2 Requirement Text

The system's AI Assistant shall integrate with the OpenAI API... using a RAG pattern.

#### 1.2.3.3 Validation Criteria

- Textual data is embedded during the pipeline processing
- Embeddings are upserted to Vector DB

#### 1.2.3.4 Implementation Implications

- Call OpenAIGateway during the ELT process
- Push vectors to PineconeRepository

#### 1.2.3.5 Extraction Reasoning

Data enrichment step within the pipeline.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

WebhookHandler

#### 1.3.1.2 Component Specification

API route responsible for receiving, validating, and acknowledging Salla webhooks immediately.

#### 1.3.1.3 Implementation Requirements

- Verify HMAC-SHA256 signature using `ISignatureValidator`
- Publish raw payload to QStash 'raw-events' topic
- Return 200 OK within 200ms

#### 1.3.1.4 Architectural Context

Ingestion Layer - Public Entry Point

#### 1.3.1.5 Extraction Reasoning

Ingestion point defined in Sequence 426.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

ETLWorker

#### 1.3.2.2 Component Specification

Background worker responsible for consuming events, transforming data, and loading to data stores.

#### 1.3.2.3 Implementation Requirements

- Consume from QStash 'process-event' queue
- Transform Salla DTOs to Domain Entities
- Insert into ClickHouse (OLAP) and Pinecone (Vector)

#### 1.3.2.4 Architectural Context

Processing Layer - Asynchronous Worker

#### 1.3.2.5 Extraction Reasoning

Processing unit defined in Sequence 427.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

SyncOrchestrator

#### 1.3.3.2 Component Specification

Manages long-running historical sync jobs via recursion.

#### 1.3.3.3 Implementation Requirements

- Fetch page N
- Process page N
- Trigger self for page N+1 via QStash

#### 1.3.3.4 Architectural Context

Orchestration Layer

#### 1.3.3.5 Extraction Reasoning

Required for FR-104 implementation on serverless infrastructure.

## 1.4.0.0 Architectural Layers

### 1.4.1.0 Layer Name

#### 1.4.1.1 Layer Name

Ingestion Layer

#### 1.4.1.2 Layer Responsibilities

Securely receiving external data and buffering it for processing.

#### 1.4.1.3 Layer Constraints

- Must be stateless
- Must verify signatures before processing

#### 1.4.1.4 Implementation Patterns

- Facade Pattern
- Publisher/Subscriber

#### 1.4.1.5 Extraction Reasoning

Decouples reception from processing.

### 1.4.2.0 Layer Name

#### 1.4.2.1 Layer Name

Processing Layer

#### 1.4.2.2 Layer Responsibilities

Transformation, enrichment, and loading of data.

#### 1.4.2.3 Layer Constraints

- Must be idempotent
- Must handle external API rate limits (OpenAI, Salla)

#### 1.4.2.4 Implementation Patterns

- Pipeline Pattern
- Circuit Breaker

#### 1.4.2.5 Extraction Reasoning

Core ELT logic location.

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

ISallaGateway

#### 1.5.1.2 Source Repository

REPO-LIB-SDK-001

#### 1.5.1.3 Method Contracts

##### 1.5.1.3.1 Method Name

###### 1.5.1.3.1.1 Method Name

fetchOrders

###### 1.5.1.3.1.2 Method Signature

fetchOrders(criteria: OrderSearchCriteria): Promise<GatewayResult<Order[]>>

###### 1.5.1.3.1.3 Method Purpose

Retrieves historical orders from Salla API during sync.

###### 1.5.1.3.1.4 Integration Context

Used by SyncOrchestrator.

##### 1.5.1.3.2.0 Method Name

###### 1.5.1.3.2.1 Method Name

validateSignature

###### 1.5.1.3.2.2 Method Signature

validateSignature(payload: string, signature: string): boolean

###### 1.5.1.3.2.3 Method Purpose

Verifies authenticity of incoming webhooks.

###### 1.5.1.3.2.4 Integration Context

Used by WebhookHandler.

#### 1.5.1.4.0.0 Integration Pattern

Library Import (SDK)

#### 1.5.1.5.0.0 Communication Protocol

In-process / HTTP (underlying)

#### 1.5.1.6.0.0 Extraction Reasoning

Dependency on integration-gateways for external comms.

### 1.5.2.0.0.0 Interface Name

#### 1.5.2.1.0.0 Interface Name

IOpenAIGateway

#### 1.5.2.2.0.0 Source Repository

REPO-LIB-SDK-001

#### 1.5.2.3.0.0 Method Contracts

- {'method_name': 'generateEmbedding', 'method_signature': 'generateEmbedding(text: string): Promise<number[]>', 'method_purpose': 'Generates vector embeddings for product/order text.', 'integration_context': 'Used by ETLWorker during processing.'}

#### 1.5.2.4.0.0 Integration Pattern

Library Import (SDK)

#### 1.5.2.5.0.0 Communication Protocol

In-process / HTTP (underlying)

#### 1.5.2.6.0.0 Extraction Reasoning

Dependency for RAG feature support.

### 1.5.3.0.0.0 Interface Name

#### 1.5.3.1.0.0 Interface Name

IMessageQueue

#### 1.5.3.2.0.0 Source Repository

REPO-INFRA-001

#### 1.5.3.3.0.0 Method Contracts

- {'method_name': 'publish', 'method_signature': 'publish(topic: string, body: any): Promise<MessageId>', 'method_purpose': 'Enqueues event for async processing.', 'integration_context': 'Used by WebhookHandler and SyncOrchestrator.'}

#### 1.5.3.4.0.0 Integration Pattern

Infrastructure Client (Upstash QStash)

#### 1.5.3.5.0.0 Communication Protocol

HTTP REST

#### 1.5.3.6.0.0 Extraction Reasoning

Infrastructure dependency for async architecture.

### 1.5.4.0.0.0 Interface Name

#### 1.5.4.1.0.0 Interface Name

IAnalyticsRepository

#### 1.5.4.2.0.0 Source Repository

REPO-INFRA-001

#### 1.5.4.3.0.0 Method Contracts

- {'method_name': 'insertSalesFact', 'method_signature': 'insertSalesFact(facts: SalesFact[]): Promise<void>', 'method_purpose': 'Persists transformed data to ClickHouse.', 'integration_context': 'Used by ETLWorker.'}

#### 1.5.4.4.0.0 Integration Pattern

Database Client (ClickHouse)

#### 1.5.4.5.0.0 Communication Protocol

HTTP / TCP

#### 1.5.4.6.0.0 Extraction Reasoning

Data sink dependency.

## 1.6.0.0.0.0 Exposed Interfaces

### 1.6.1.0.0.0 Interface Name

#### 1.6.1.1.0.0 Interface Name

WebhookIngress

#### 1.6.1.2.0.0 Consumer Repositories

- Salla Platform (External)

#### 1.6.1.3.0.0 Method Contracts

- {'method_name': 'POST /api/webhooks/salla', 'method_signature': "Headers: { 'x-salla-signature': string }, Body: JSON", 'method_purpose': 'Receives real-time events (order.created, cart.updated).', 'implementation_requirements': 'Must acknowledge with 200 OK within 3 seconds (Salla timeout).'}

#### 1.6.1.4.0.0 Service Level Requirements

- 99.9% Availability
- <200ms Latency

#### 1.6.1.5.0.0 Implementation Constraints

- No heavy processing synchronously
- Publicly accessible

#### 1.6.1.6.0.0 Extraction Reasoning

Public interface for data ingestion.

### 1.6.2.0.0.0 Interface Name

#### 1.6.2.1.0.0 Interface Name

SyncJobControl

#### 1.6.2.2.0.0 Consumer Repositories

- REPO-APP-CORE-001

#### 1.6.2.3.0.0 Method Contracts

##### 1.6.2.3.1.0 Method Name

###### 1.6.2.3.1.1 Method Name

POST /api/jobs/sync/initiate

###### 1.6.2.3.1.2 Method Signature

Body: { merchantId: string, depth: '12m' | '24m' }

###### 1.6.2.3.1.3 Method Purpose

Triggers the historical data synchronization process.

###### 1.6.2.3.1.4 Implementation Requirements

Validates merchant state, queues initial job, returns Job ID.

##### 1.6.2.3.2.0 Method Name

###### 1.6.2.3.2.1 Method Name

GET /api/jobs/sync/status

###### 1.6.2.3.2.2 Method Signature

Query: ?merchantId=... -> Returns { status: 'RUNNING', progress: 45 }

###### 1.6.2.3.2.3 Method Purpose

Provides polling endpoint for frontend progress UI.

###### 1.6.2.3.2.4 Implementation Requirements

Reads from low-latency store (Redis/Postgres).

#### 1.6.2.4.0.0 Service Level Requirements

- Internal auth required
- High consistency

#### 1.6.2.5.0.0 Implementation Constraints

- Protected by Service-to-Service auth

#### 1.6.2.6.0.0 Extraction Reasoning

Interface for Application Core to manage data syncs.

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

Vercel Serverless Functions, Node.js 20.x

### 1.7.2.0.0.0 Integration Technologies

- Upstash QStash (Queuing)
- ClickHouse (OLAP)
- Pinecone (Vector)
- PostgreSQL (State)

### 1.7.3.0.0.0 Performance Constraints

Webhook response < 200ms. End-to-end data latency < 5 min.

### 1.7.4.0.0.0 Security Requirements

HMAC validation for webhooks. Internal API keys for service-to-service calls.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | 100% mapped to REQ-DATA-002, REQ-TEC-003, FR-104. |
| Cross Reference Validation | Validated against Salla Gateway usage and QStash i... |
| Implementation Readiness Assessment | High. Contracts defined for both Ingress and Worke... |
| Quality Assurance Confirmation | Integration logic isolates ingress from processing... |

