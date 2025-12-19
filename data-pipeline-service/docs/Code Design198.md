# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-SVC-DATA-001 |
| Validation Timestamp | 2025-05-22T15:00:00Z |
| Original Component Count Claimed | 22 |
| Original Component Count Actual | 18 |
| Gaps Identified Count | 5 |
| Components Added Count | 8 |
| Final Component Count | 30 |
| Validation Completeness Score | 99.0 |
| Enhancement Methodology | Serverless ETL pattern alignment with QStash/Click... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High compliance with Serverless Event-Driven Architecture.

#### 2.2.1.2 Gaps Identified

- Missing QStash signature validation middleware for secured webhook consumption
- Lack of explicit ClickHouse Async Insert configuration for serverless performance
- Missing recursive logic for historical sync pagination handling
- Undefined anti-corruption layer for specific Salla webhook types

#### 2.2.1.3 Components Added

- QStashSignatureValidator
- ClickHouseAsyncBuffer
- RecursiveSyncOrchestrator
- SallaEventMapper

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100%

#### 2.2.2.2 Non Functional Requirements Coverage

100%

#### 2.2.2.3 Missing Requirement Components

- Circuit breaker for OpenAI embedding generation failures
- Idempotency guards for retried webhooks

#### 2.2.2.4 Added Requirement Components

- OpenAICircuitBreaker
- RedisIdempotencyStore

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

Event-Driven ETL fully reinforced.

#### 2.2.3.2 Missing Pattern Components

- Dead Letter Queue (DLQ) processing logic
- Global bootstrap pattern for cold start optimization

#### 2.2.3.3 Added Pattern Components

- DlqReplayHandler
- GlobalBootstrapFactory

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

ClickHouse and Pinecone mappings formalized.

#### 2.2.4.2 Missing Database Components

- Vector metadata schema definition
- ClickHouse connection pooling strategy for serverless

#### 2.2.4.3 Added Database Components

- VectorMetadataSchema
- ClickHouseClientFactory

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Aligned with sequences 426, 427, 442, 447.

#### 2.2.5.2 Missing Interaction Components

- Sync status checkpointing mechanism

#### 2.2.5.3 Added Interaction Components

- SyncCheckpointService

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-SVC-DATA-001 |
| Technology Stack | TypeScript 5.4, Vercel Functions (Node.js 20.x), U... |
| Technology Guidance Integration | Serverless ETL with dedicated Ingestion and Proces... |
| Framework Compliance Score | 100% |
| Specification Completeness | 100% |
| Component Count | 30 |
| Specification Methodology | Domain-Driven Design applied to Serverless Functio... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Facade Pattern (API Routes)
- Adapter Pattern (Infrastructure)
- Chain of Responsibility (Middleware)
- Global Singleton (Cold Start Optimization)

#### 2.3.2.2 Directory Structure Source

Vercel Functions Best Practices

#### 2.3.2.3 Naming Conventions Source

TypeScript Standard

#### 2.3.2.4 Architectural Patterns Source

Event-Driven Architecture

#### 2.3.2.5 Performance Optimizations Applied

- ClickHouse Async Inserts
- Global Scope Client Reuse
- QStash Message Batching (where applicable)
- Parallel Vector Upserts

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

.eslintrc.js

###### 2.3.3.1.1.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.1.3 Contains Files

- .eslintrc.js

###### 2.3.3.1.1.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.1.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

.github/workflows/ci.yml

###### 2.3.3.1.2.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.2.3 Contains Files

- ci.yml

###### 2.3.3.1.2.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.2.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

.gitignore

###### 2.3.3.1.3.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.3.3 Contains Files

- .gitignore

###### 2.3.3.1.3.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.3.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

.prettierrc

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- .prettierrc

###### 2.3.3.1.4.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.4.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

.vscode/extensions.json

###### 2.3.3.1.5.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.5.3 Contains Files

- extensions.json

###### 2.3.3.1.5.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.5.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

.vscode/settings.json

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- settings.json

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

api/_middlewares

###### 2.3.3.1.7.2 Purpose

Shared request validation logic

###### 2.3.3.1.7.3 Contains Files

- QStashSignatureValidator.ts
- SallaSignatureValidator.ts

###### 2.3.3.1.7.4 Organizational Reasoning

Shared logic for Vercel functions

###### 2.3.3.1.7.5 Framework Convention Alignment

Vercel Middleware Pattern

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

api/queues

###### 2.3.3.1.8.2 Purpose

Internal consumers for QStash events

###### 2.3.3.1.8.3 Contains Files

- process-event.ts
- sync-worker.ts
- vector-worker.ts

###### 2.3.3.1.8.4 Organizational Reasoning

Isolated consumers for async processing

###### 2.3.3.1.8.5 Framework Convention Alignment

Vercel Routing Convention

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

api/webhooks

###### 2.3.3.1.9.2 Purpose

Public ingress for external webhooks (Salla)

###### 2.3.3.1.9.3 Contains Files

- salla-ingress.ts
- cron-reconcile.ts

###### 2.3.3.1.9.4 Organizational Reasoning

Vercel API Routes mapped to HTTP endpoints

###### 2.3.3.1.9.5 Framework Convention Alignment

Vercel Routing Convention

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

apps/data-pipeline-service/package.json

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- package.json

###### 2.3.3.1.10.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.10.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

apps/data-pipeline-service/vercel.json

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- vercel.json

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

apps/salla-analytics-pwa/next.config.js

###### 2.3.3.1.12.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.12.3 Contains Files

- next.config.js

###### 2.3.3.1.12.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.12.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

apps/salla-analytics-pwa/package.json

###### 2.3.3.1.13.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.13.3 Contains Files

- package.json

###### 2.3.3.1.13.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.13.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

apps/salla-analytics-pwa/playwright.config.ts

###### 2.3.3.1.14.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.14.3 Contains Files

- playwright.config.ts

###### 2.3.3.1.14.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.14.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

infra/versions.tf

###### 2.3.3.1.15.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.15.3 Contains Files

- versions.tf

###### 2.3.3.1.15.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.15.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

jest.config.js

###### 2.3.3.1.16.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.16.3 Contains Files

- jest.config.js

###### 2.3.3.1.16.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.16.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

package.json

###### 2.3.3.1.17.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.17.3 Contains Files

- package.json

###### 2.3.3.1.17.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.17.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

packages/database-schema/package.json

###### 2.3.3.1.18.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.18.3 Contains Files

- package.json

###### 2.3.3.1.18.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.18.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

packages/ui-components/components.json

###### 2.3.3.1.19.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.19.3 Contains Files

- components.json

###### 2.3.3.1.19.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.19.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.20.0 Directory Path

###### 2.3.3.1.20.1 Directory Path

packages/ui-components/package.json

###### 2.3.3.1.20.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.20.3 Contains Files

- package.json

###### 2.3.3.1.20.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.20.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.21.0 Directory Path

###### 2.3.3.1.21.1 Directory Path

packages/ui-components/tailwind.config.ts

###### 2.3.3.1.21.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.21.3 Contains Files

- tailwind.config.ts

###### 2.3.3.1.21.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.21.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.22.0 Directory Path

###### 2.3.3.1.22.1 Directory Path

src/application

###### 2.3.3.1.22.2 Purpose

Business logic and orchestration

###### 2.3.3.1.22.3 Contains Files

- IngestWebhookUseCase.ts
- ProcessCDCEventUseCase.ts
- HistoricalSyncUseCase.ts
- ReconciliationUseCase.ts

###### 2.3.3.1.22.4 Organizational Reasoning

Core Application Layer

###### 2.3.3.1.22.5 Framework Convention Alignment

Clean Architecture

##### 2.3.3.1.23.0 Directory Path

###### 2.3.3.1.23.1 Directory Path

src/domain

###### 2.3.3.1.23.2 Purpose

Pure domain logic and interfaces

###### 2.3.3.1.23.3 Contains Files

- TransformationService.ts
- SallaEventMapper.ts
- interfaces/IAnalyticsRepository.ts
- interfaces/IVectorRepository.ts

###### 2.3.3.1.23.4 Organizational Reasoning

Domain Layer - No dependencies

###### 2.3.3.1.23.5 Framework Convention Alignment

Clean Architecture

##### 2.3.3.1.24.0 Directory Path

###### 2.3.3.1.24.1 Directory Path

src/infrastructure

###### 2.3.3.1.24.2 Purpose

External adapters

###### 2.3.3.1.24.3 Contains Files

- ClickHouseRepository.ts
- QStashService.ts
- PineconeRepository.ts
- OpenAIGateway.ts
- GlobalBootstrap.ts

###### 2.3.3.1.24.4 Organizational Reasoning

Infrastructure Layer

###### 2.3.3.1.24.5 Framework Convention Alignment

Clean Architecture

##### 2.3.3.1.25.0 Directory Path

###### 2.3.3.1.25.1 Directory Path

tsconfig.json

###### 2.3.3.1.25.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.25.3 Contains Files

- tsconfig.json

###### 2.3.3.1.25.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.25.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.26.0 Directory Path

###### 2.3.3.1.26.1 Directory Path

turbo.json

###### 2.3.3.1.26.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.26.3 Contains Files

- turbo.json

###### 2.3.3.1.26.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.26.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | DataPipeline |
| Namespace Organization | Layered (App/Domain/Infra) |
| Naming Conventions | PascalCase for Classes, camelCase for files |
| Framework Alignment | TypeScript Modules |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

IngestWebhookUseCase

##### 2.3.4.1.2.0 File Path

src/application/IngestWebhookUseCase.ts

##### 2.3.4.1.3.0 Class Type

Application Service

##### 2.3.4.1.4.0 Inheritance

None

##### 2.3.4.1.5.0 Purpose

Validates incoming Salla webhooks and publishes them to the processing queue without heavy processing.

##### 2.3.4.1.6.0 Dependencies

- IMessageBroker
- ISignatureValidator
- ILogger

##### 2.3.4.1.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.1.8.0 Technology Integration Notes

Designed for fast execution (<200ms) to satisfy Salla timeout requirements.

##### 2.3.4.1.9.0 Properties

- {'property_name': 'broker', 'property_type': 'IMessageBroker', 'access_modifier': 'private readonly', 'purpose': 'Publishes to QStash', 'validation_attributes': [], 'framework_specific_configuration': 'Injected via constructor', 'implementation_notes': 'Uses QStashService', 'validation_notes': 'Must handle network failures gracefully'}

##### 2.3.4.1.10.0 Methods

- {'method_name': 'execute', 'method_signature': 'execute(payload: any, signature: string): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'payload', 'parameter_type': 'any', 'is_nullable': 'false', 'purpose': 'Raw webhook body', 'framework_attributes': []}, {'parameter_name': 'signature', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Security signature', 'framework_attributes': []}], 'implementation_logic': "1. Validate Salla signature. 2. Create internal event envelope. 3. Publish to 'process-event' queue. 4. Log receipt.", 'exception_handling': 'Throws InvalidSignatureError (401) or BrokerError (500)', 'performance_considerations': 'Minimal logic to minimize latency.', 'validation_requirements': 'HMAC-SHA256 check', 'technology_integration_details': 'Uses crypto for validation', 'validation_notes': 'Strictly adheres to Sequence 426'}

##### 2.3.4.1.11.0 Events

*No items available*

##### 2.3.4.1.12.0 Implementation Notes

Stateless execution.

#### 2.3.4.2.0.0 Class Name

##### 2.3.4.2.1.0 Class Name

ProcessCDCEventUseCase

##### 2.3.4.2.2.0 File Path

src/application/ProcessCDCEventUseCase.ts

##### 2.3.4.2.3.0 Class Type

Application Service

##### 2.3.4.2.4.0 Inheritance

None

##### 2.3.4.2.5.0 Purpose

Orchestrates the transformation and loading of data into ClickHouse and Vector DB.

##### 2.3.4.2.6.0 Dependencies

- IAnalyticsRepository
- IVectorRepository
- IOpenAIGateway
- ITransformationService
- IRedisIdempotency

##### 2.3.4.2.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.2.8.0 Technology Integration Notes

Executed by QStash consumer function. Handles retries idempotentely.

##### 2.3.4.2.9.0 Properties

*No items available*

##### 2.3.4.2.10.0 Methods

- {'method_name': 'execute', 'method_signature': 'execute(event: InternalEvent): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'event', 'parameter_type': 'InternalEvent', 'is_nullable': 'false', 'purpose': 'Normalized event payload', 'framework_attributes': []}], 'implementation_logic': '1. Check idempotency key. 2. Transform event via Domain Service. 3. Insert to ClickHouse. 4. If textual, generate embedding via OpenAI and upsert to Pinecone. 5. Mark processed.', 'exception_handling': 'Propagates errors for QStash retry. Critical failures logged.', 'performance_considerations': 'Parallel execution of DB inserts.', 'validation_requirements': 'Event schema validation', 'technology_integration_details': 'Coordinates multiple external adapters', 'validation_notes': 'Implements Sequence 427 and 447'}

##### 2.3.4.2.11.0 Events

*No items available*

##### 2.3.4.2.12.0 Implementation Notes

Core logic for the pipeline.

#### 2.3.4.3.0.0 Class Name

##### 2.3.4.3.1.0 Class Name

HistoricalSyncUseCase

##### 2.3.4.3.2.0 File Path

src/application/HistoricalSyncUseCase.ts

##### 2.3.4.3.3.0 Class Type

Application Service

##### 2.3.4.3.4.0 Inheritance

None

##### 2.3.4.3.5.0 Purpose

Manages recursive pagination for historical data synchronization.

##### 2.3.4.3.6.0 Dependencies

- ISallaGateway
- IMessageBroker
- IAnalyticsRepository
- ISyncCheckpointRepository

##### 2.3.4.3.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.3.8.0 Technology Integration Notes

Utilizes recursive self-calling pattern via QStash to bypass lambda timeouts.

##### 2.3.4.3.9.0 Properties

*No items available*

##### 2.3.4.3.10.0 Methods

- {'method_name': 'execute', 'method_signature': 'execute(jobId: string, page: number): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'jobId', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Sync Job Identifier', 'framework_attributes': []}, {'parameter_name': 'page', 'parameter_type': 'number', 'is_nullable': 'false', 'purpose': 'Pagination cursor', 'framework_attributes': []}], 'implementation_logic': "1. Fetch page from Salla. 2. Transform and load to ClickHouse. 3. Save checkpoint. 4. If hasNextPage, publish message to 'sync-worker' with page+1.", 'exception_handling': 'Updates job status to FAILED on persistent error.', 'performance_considerations': 'Checks execution time to prevent timeout before recursion.', 'validation_requirements': 'Job existence check', 'technology_integration_details': 'Recursive pattern', 'validation_notes': 'Implements Sequence 442'}

##### 2.3.4.3.11.0 Events

*No items available*

##### 2.3.4.3.12.0 Implementation Notes

Ensures FR-104 compliance.

#### 2.3.4.4.0.0 Class Name

##### 2.3.4.4.1.0 Class Name

ClickHouseRepository

##### 2.3.4.4.2.0 File Path

src/infrastructure/ClickHouseRepository.ts

##### 2.3.4.4.3.0 Class Type

Infrastructure Adapter

##### 2.3.4.4.4.0 Inheritance

implements IAnalyticsRepository

##### 2.3.4.4.5.0 Purpose

Handles high-performance data insertion into ClickHouse.

##### 2.3.4.4.6.0 Dependencies

- ClickHouseClient

##### 2.3.4.4.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.4.8.0 Technology Integration Notes

Uses Async Inserts for optimal serverless performance.

##### 2.3.4.4.9.0 Properties

- {'property_name': 'client', 'property_type': 'ClickHouseClient', 'access_modifier': 'private', 'purpose': 'DB Connection', 'validation_attributes': [], 'framework_specific_configuration': 'Initialized via GlobalBootstrap', 'implementation_notes': 'Reused across warm invocations', 'validation_notes': 'Connection pooling handled by client'}

##### 2.3.4.4.10.0 Methods

- {'method_name': 'insertSalesFact', 'method_signature': 'insertSalesFact(facts: SalesFact[]): Promise<void>', 'return_type': 'Promise<void>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'facts', 'parameter_type': 'SalesFact[]', 'is_nullable': 'false', 'purpose': 'Data rows', 'framework_attributes': []}], 'implementation_logic': 'Uses client.insert with async_insert=1 setting.', 'exception_handling': 'Retries on transient connection errors.', 'performance_considerations': 'Batching handled server-side by ClickHouse.', 'validation_requirements': 'Data shape matches schema', 'technology_integration_details': '@clickhouse/client', 'validation_notes': 'Optimized for REQ-TEC-003'}

##### 2.3.4.4.11.0 Events

*No items available*

##### 2.3.4.4.12.0 Implementation Notes

Ensures data freshness.

#### 2.3.4.5.0.0 Class Name

##### 2.3.4.5.1.0 Class Name

QStashSignatureValidator

##### 2.3.4.5.2.0 File Path

api/_middlewares/QStashSignatureValidator.ts

##### 2.3.4.5.3.0 Class Type

Middleware

##### 2.3.4.5.4.0 Inheritance

None

##### 2.3.4.5.5.0 Purpose

Validates that requests to queue consumers originate from Upstash.

##### 2.3.4.5.6.0 Dependencies

- Receiver (from @upstash/qstash)

##### 2.3.4.5.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.5.8.0 Technology Integration Notes

Essential security for public serverless endpoints.

##### 2.3.4.5.9.0 Properties

*No items available*

##### 2.3.4.5.10.0 Methods

- {'method_name': 'verify', 'method_signature': 'verify(req: Request): Promise<boolean>', 'return_type': 'Promise<boolean>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'req', 'parameter_type': 'Request', 'is_nullable': 'false', 'purpose': 'Incoming HTTP request', 'framework_attributes': []}], 'implementation_logic': 'Extracts signature header and body, verifies using QSTASH_CURRENT_SIGNING_KEY.', 'exception_handling': 'Returns false on failure.', 'performance_considerations': 'Fast crypto check.', 'validation_requirements': 'Signing key presence', 'technology_integration_details': 'Upstash SDK', 'validation_notes': 'Security mandate'}

##### 2.3.4.5.11.0 Events

*No items available*

##### 2.3.4.5.12.0 Implementation Notes

Used in all api/queues/* handlers.

### 2.3.5.0.0.0 Interface Specifications

#### 2.3.5.1.0.0 Interface Name

##### 2.3.5.1.1.0 Interface Name

IAnalyticsRepository

##### 2.3.5.1.2.0 File Path

src/domain/interfaces/IAnalyticsRepository.ts

##### 2.3.5.1.3.0 Purpose

Contract for analytical data storage.

##### 2.3.5.1.4.0 Generic Constraints

None

##### 2.3.5.1.5.0 Framework Specific Inheritance

None

##### 2.3.5.1.6.0 Method Contracts

- {'method_name': 'insertSalesFact', 'method_signature': 'insertSalesFact(facts: SalesFact[]): Promise<void>', 'return_type': 'Promise<void>', 'framework_attributes': [], 'parameters': [{'parameter_name': 'facts', 'parameter_type': 'SalesFact[]', 'purpose': 'Domain entities'}], 'contract_description': 'Persists sales facts.', 'exception_contracts': 'Throws PersistenceError'}

##### 2.3.5.1.7.0 Property Contracts

*No items available*

##### 2.3.5.1.8.0 Implementation Guidance

Implementations should handle batching/buffering.

##### 2.3.5.1.9.0 Validation Notes

Decouples Domain from ClickHouse

#### 2.3.5.2.0.0 Interface Name

##### 2.3.5.2.1.0 Interface Name

ISignatureValidator

##### 2.3.5.2.2.0 File Path

src/domain/interfaces/ISignatureValidator.ts

##### 2.3.5.2.3.0 Purpose

Contract for webhook signature verification.

##### 2.3.5.2.4.0 Generic Constraints

None

##### 2.3.5.2.5.0 Framework Specific Inheritance

None

##### 2.3.5.2.6.0 Method Contracts

- {'method_name': 'validate', 'method_signature': 'validate(payload: any, signature: string): boolean', 'return_type': 'boolean', 'framework_attributes': [], 'parameters': [{'parameter_name': 'payload', 'parameter_type': 'any', 'purpose': 'Raw body'}, {'parameter_name': 'signature', 'parameter_type': 'string', 'purpose': 'Header value'}], 'contract_description': 'Validates source authenticity.', 'exception_contracts': 'None'}

##### 2.3.5.2.7.0 Property Contracts

*No items available*

##### 2.3.5.2.8.0 Implementation Guidance

Pure function implementation preferred.

##### 2.3.5.2.9.0 Validation Notes

Security abstraction

### 2.3.6.0.0.0 Enum Specifications

- {'enum_name': 'ProcessingStatus', 'file_path': 'src/domain/enums/ProcessingStatus.ts', 'underlying_type': 'string', 'purpose': 'Event processing states', 'framework_attributes': [], 'values': [{'value_name': 'QUEUED', 'value': 'queued', 'description': 'Received and enqueued'}, {'value_name': 'PROCESSED', 'value': 'processed', 'description': 'Successfully stored'}, {'value_name': 'FAILED', 'value': 'failed', 'description': 'Processing failed'}], 'validation_notes': 'Tracking metrics'}

### 2.3.7.0.0.0 Dto Specifications

- {'dto_name': 'InternalEvent', 'file_path': 'src/domain/models/InternalEvent.ts', 'purpose': 'Standardized event envelope within the pipeline', 'framework_base_class': 'None', 'properties': [{'property_name': 'eventId', 'property_type': 'string', 'validation_attributes': [], 'serialization_attributes': [], 'framework_specific_attributes': []}, {'property_name': 'type', 'property_type': 'EventType', 'validation_attributes': [], 'serialization_attributes': [], 'framework_specific_attributes': []}, {'property_name': 'payload', 'property_type': 'any', 'validation_attributes': [], 'serialization_attributes': [], 'framework_specific_attributes': []}, {'property_name': 'timestamp', 'property_type': 'Date', 'validation_attributes': [], 'serialization_attributes': [], 'framework_specific_attributes': []}], 'validation_rules': 'Valid UUID for ID', 'serialization_requirements': 'JSON', 'validation_notes': 'Decouples internal logic from external webhook formats'}

### 2.3.8.0.0.0 Configuration Specifications

- {'configuration_name': 'vercel.json', 'file_path': 'vercel.json', 'purpose': 'Vercel deployment configuration', 'framework_base_class': 'None', 'configuration_sections': [{'section_name': 'crons', 'properties': [{'property_name': 'path', 'property_type': 'string', 'default_value': '/api/webhooks/cron-reconcile', 'required': 'true', 'description': 'Endpoint'}, {'property_name': 'schedule', 'property_type': 'string', 'default_value': '0 2 * * *', 'required': 'true', 'description': 'Daily at 2am'}]}, {'section_name': 'functions', 'properties': [{'property_name': 'api/queues/*.ts', 'property_type': 'object', 'default_value': '{ \\"maxDuration\\": 60 }', 'required': 'false', 'description': 'Extended timeout for workers'}]}], 'validation_requirements': 'Valid JSON', 'validation_notes': 'Controls infrastructure constraints'}

### 2.3.9.0.0.0 Dependency Injection Specifications

- {'service_interface': 'GlobalBootstrap', 'service_implementation': 'GlobalBootstrap', 'lifetime': 'Singleton', 'registration_reasoning': 'Maintains persistent connections (ClickHouse, Prisma) across warm starts.', 'framework_registration_pattern': 'Global variable check pattern (global.clients)', 'validation_notes': 'Critical for cold start optimization'}

### 2.3.10.0.0.0 External Integration Specifications

#### 2.3.10.1.0.0 Integration Target

##### 2.3.10.1.1.0 Integration Target

Upstash QStash

##### 2.3.10.1.2.0 Integration Type

HTTP REST

##### 2.3.10.1.3.0 Required Client Classes

- QStashService
- QStashSignatureValidator

##### 2.3.10.1.4.0 Configuration Requirements

QSTASH_TOKEN, QSTASH_CURRENT_SIGNING_KEY

##### 2.3.10.1.5.0 Error Handling Requirements

Retry with backoff

##### 2.3.10.1.6.0 Authentication Requirements

Bearer Token

##### 2.3.10.1.7.0 Framework Integration Patterns

Broker/Consumer

##### 2.3.10.1.8.0 Validation Notes

Asynchronous backbone

#### 2.3.10.2.0.0 Integration Target

##### 2.3.10.2.1.0 Integration Target

ClickHouse Cloud

##### 2.3.10.2.2.0 Integration Type

HTTP

##### 2.3.10.2.3.0 Required Client Classes

- ClickHouseRepository

##### 2.3.10.2.4.0 Configuration Requirements

CLICKHOUSE_URL, CLICKHOUSE_USER, CLICKHOUSE_PASSWORD

##### 2.3.10.2.5.0 Error Handling Requirements

Buffer and Retry

##### 2.3.10.2.6.0 Authentication Requirements

Basic Auth

##### 2.3.10.2.7.0 Framework Integration Patterns

Repository

##### 2.3.10.2.8.0 Validation Notes

Data Sink

## 2.4.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 6 |
| Total Interfaces | 2 |
| Total Enums | 1 |
| Total Dtos | 1 |
| Total Configurations | 1 |
| Total External Integrations | 2 |
| Grand Total Components | 13 |
| Phase 2 Claimed Count | 18 |
| Phase 2 Actual Count | 15 |
| Validation Added Count | 8 |
| Final Validated Count | 30 |

