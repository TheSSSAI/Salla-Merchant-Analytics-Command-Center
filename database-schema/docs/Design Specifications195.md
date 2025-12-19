# 1 Analysis Metadata

| Property | Value |
|----------|-------|
| Analysis Timestamp | 2025-05-22T14:35:00Z |
| Repository Component Id | database-schema |
| Analysis Completeness Score | 100 |
| Critical Findings Count | 4 |
| Analysis Methodology | Systematic decomposition of ERD diagrams (78, 79),... |

# 2 Repository Analysis

## 2.1 Repository Definition

### 2.1.1 Scope Boundaries

- OLTP Database Schema Definition (Prisma)
- Database Migration Management
- Type-safe Database Client Generation
- Seed Data Management (Roles, Static Config)

### 2.1.2 Technology Stack

- Prisma ORM (Schema & Client)
- PostgreSQL 16
- TypeScript 5.4
- Node.js 20.x

### 2.1.3 Architectural Constraints

- Stateless client instantiation for serverless environments (Connection Pooling)
- Strict Multi-tenant Data Isolation via merchantId
- Zero-downtime migration compatibility

### 2.1.4 Dependency Relationships

#### 2.1.4.1 Consumed_By: user-management-service

##### 2.1.4.1.1 Dependency Type

Consumed_By

##### 2.1.4.1.2 Target Component

user-management-service

##### 2.1.4.1.3 Integration Pattern

Library Import (@acme/db)

##### 2.1.4.1.4 Reasoning

Provides User, Role, and Merchant entities for auth flows.

#### 2.1.4.2.0 Consumed_By: data-pipeline-processor

##### 2.1.4.2.1 Dependency Type

Consumed_By

##### 2.1.4.2.2 Target Component

data-pipeline-processor

##### 2.1.4.2.3 Integration Pattern

Library Import (@acme/db)

##### 2.1.4.2.4 Reasoning

Provides CreateMany and Upsert interfaces for bulk data ingestion.

#### 2.1.4.3.0 Source_For: cdc-pipeline

##### 2.1.4.3.1 Dependency Type

Source_For

##### 2.1.4.3.2 Target Component

cdc-pipeline

##### 2.1.4.3.3 Integration Pattern

Database Log (WAL)

##### 2.1.4.3.4 Reasoning

PostgreSQL WAL logs act as the source for the CDC pipeline feeding ClickHouse.

### 2.1.5.0.0 Analysis Insights

This repository acts as the foundational contract for the entire system's state. Its correctness is critical for the type safety of all upstream services. The serverless architecture necessitates rigorous connection pooling configuration within the exported client.

# 3.0.0.0.0 Requirements Mapping

## 3.1.0.0.0 Functional Requirements

### 3.1.1.0.0 Requirement Id

#### 3.1.1.1.0 Requirement Id

REQ-FUNC-001

#### 3.1.1.2.0 Requirement Description

User registration and account creation

#### 3.1.1.3.0 Implementation Implications

- User entity definition with unique email constraint
- MerchantAccount entity creation transactionally linked to User

#### 3.1.1.4.0 Required Components

- User Model
- MerchantAccount Model
- UserMerchantAccount Model

#### 3.1.1.5.0 Analysis Reasoning

Direct mapping to ERD entities from Diagram 79.

### 3.1.2.0.0 Requirement Id

#### 3.1.2.1.0 Requirement Id

REQ-FUNC-020

#### 3.1.2.2.0 Requirement Description

Abandoned Cart Recovery

#### 3.1.2.3.0 Implementation Implications

- AbandonedCart entity with recovery status enum
- Indexing on createdAt for retention policy enforcement

#### 3.1.2.4.0 Required Components

- AbandonedCart Model
- AbandonedCartItem Model

#### 3.1.2.5.0 Analysis Reasoning

Requires specific schema to track cart state and recovery tokens.

### 3.1.3.0.0 Requirement Id

#### 3.1.3.1.0 Requirement Id

REQ-SEC-005

#### 3.1.3.2.0 Requirement Description

Immutable Audit Logging

#### 3.1.3.3.0 Implementation Implications

- AuditLog table with composite indices on [merchantId, timestamp]
- Database-level constraints or middleware to prevent updates/deletes (Immutability)

#### 3.1.3.4.0 Required Components

- AuditLog Model

#### 3.1.3.5.0 Analysis Reasoning

Compliance requirement dictates strict schema structure for logs.

## 3.2.0.0.0 Non Functional Requirements

### 3.2.1.0.0 Requirement Type

#### 3.2.1.1.0 Requirement Type

Data Isolation

#### 3.2.1.2.0 Requirement Specification

REQ-OVR-005: Strict scoping to merchant data

#### 3.2.1.3.0 Implementation Impact

Every domain entity must include a merchantId foreign key.

#### 3.2.1.4.0 Design Constraints

- Composite Primary Keys often beneficial
- Mandatory Indexing on merchantId

#### 3.2.1.5.0 Analysis Reasoning

Multi-tenancy is a core architectural driver.

### 3.2.2.0.0 Requirement Type

#### 3.2.2.1.0 Requirement Type

Data Retention

#### 3.2.2.2.0 Requirement Specification

REQ-DATA-001: Purge abandoned carts > 90 days

#### 3.2.2.3.0 Implementation Impact

AbandonedCart table requires index on createdAt to optimize delete operations.

#### 3.2.2.4.0 Design Constraints

- Index: [merchantId, createdAt]

#### 3.2.2.5.0 Analysis Reasoning

Efficient purging requires indexing to prevent full table scans during cleanup jobs.

## 3.3.0.0.0 Requirements Analysis Summary

The schema must support a high-write volume for the initial sync (REQ-FUNC-012) while maintaining strict referential integrity for the multi-tenant architecture. Security and isolation are enforced at the schema level via foreign keys.

# 4.0.0.0.0 Architecture Analysis

## 4.1.0.0.0 Architectural Patterns

### 4.1.1.0.0 Pattern Name

#### 4.1.1.1.0 Pattern Name

Schema-First Development

#### 4.1.1.2.0 Pattern Application

Prisma schema serves as the single source of truth for database structure and application types.

#### 4.1.1.3.0 Required Components

- schema.prisma
- Prisma Client Generator

#### 4.1.1.4.0 Implementation Strategy

Define models in DSL, generate SQL migrations, generate TypeScript definitions.

#### 4.1.1.5.0 Analysis Reasoning

Ensures consistency between the database and the application layer in a distributed system.

### 4.1.2.0.0 Pattern Name

#### 4.1.2.1.0 Pattern Name

Shared Database

#### 4.1.2.2.0 Pattern Application

All services connect to the same PostgreSQL cluster (OLTP) but utilize different subsets of the schema.

#### 4.1.2.3.0 Required Components

- PostgreSQL

#### 4.1.2.4.0 Implementation Strategy

Logical separation via foreign keys (merchantId); services import the same client library.

#### 4.1.2.5.0 Analysis Reasoning

Simplifies infrastructure for the initial scale; data pipeline offloads read-heavy analytical work to ClickHouse.

## 4.2.0.0.0 Integration Points

- {'integration_type': 'Database Connection', 'target_components': ['PostgreSQL'], 'communication_pattern': 'TCP/IP with Connection Pooling (Transaction Mode)', 'interface_requirements': ['DATABASE_URL env var', 'TLS enabled'], 'analysis_reasoning': 'Serverless functions require efficient connection management via external poolers (PgBouncer/Supabase/Prisma Accelerate).'}

## 4.3.0.0.0 Layering Strategy

| Property | Value |
|----------|-------|
| Layer Organization | Infrastructure / Persistence Layer Shared Library |
| Component Placement | Repositories consume this library to implement dat... |
| Analysis Reasoning | Decouples the database schema definition from the ... |

# 5.0.0.0.0 Database Analysis

## 5.1.0.0.0 Entity Mappings

### 5.1.1.0.0 Entity Name

#### 5.1.1.1.0 Entity Name

MerchantAccount

#### 5.1.1.2.0 Database Table

merchant_accounts

#### 5.1.1.3.0 Required Properties

- id (PK, UUID)
- account_name
- salla_merchant_id (Unique)

#### 5.1.1.4.0 Relationship Mappings

- One-to-Many with UserMerchantAccount
- One-to-Many with SalesOrder
- One-to-Many with Product

#### 5.1.1.5.0 Access Patterns

- Key lookup by ID
- Lookup by Salla Merchant ID during auth

#### 5.1.1.6.0 Analysis Reasoning

Root aggregate for tenancy.

### 5.1.2.0.0 Entity Name

#### 5.1.2.1.0 Entity Name

SalesOrder

#### 5.1.2.2.0 Database Table

sales_orders

#### 5.1.2.3.0 Required Properties

- id (PK, UUID)
- merchant_id (FK)
- salla_order_id
- total_amount
- currency
- created_at

#### 5.1.2.4.0 Relationship Mappings

- Many-to-One with MerchantAccount
- Many-to-One with Customer
- One-to-Many with OrderItem

#### 5.1.2.5.0 Access Patterns

- Write-heavy during sync
- Read by merchantId + date range

#### 5.1.2.6.0 Analysis Reasoning

Core transactional entity; source for analytical pipeline.

### 5.1.3.0.0 Entity Name

#### 5.1.3.1.0 Entity Name

AuditLog

#### 5.1.3.2.0 Database Table

audit_logs

#### 5.1.3.3.0 Required Properties

- id (PK, BigInt)
- merchant_id (FK)
- user_id (FK)
- action
- resource
- timestamp

#### 5.1.3.4.0 Relationship Mappings

- Many-to-One with MerchantAccount
- Many-to-One with User

#### 5.1.3.5.0 Access Patterns

- Append-only
- Range read by merchantId + date

#### 5.1.3.6.0 Analysis Reasoning

Compliance requirement; BigInt used for ID due to potentially high volume.

## 5.2.0.0.0 Data Access Requirements

### 5.2.1.0.0 Operation Type

#### 5.2.1.1.0 Operation Type

Bulk Insert

#### 5.2.1.2.0 Required Methods

- createMany

#### 5.2.1.3.0 Performance Constraints

Must handle batch sizes of 1000+ records during initial sync.

#### 5.2.1.4.0 Analysis Reasoning

Critical for onboarding performance (REQ-FUNC-012).

### 5.2.2.0.0 Operation Type

#### 5.2.2.1.0 Operation Type

Upsert

#### 5.2.2.2.0 Required Methods

- upsert

#### 5.2.2.3.0 Performance Constraints

Idempotent handling of webhook events.

#### 5.2.2.4.0 Analysis Reasoning

Prevents data duplication during webhook retries.

## 5.3.0.0.0 Persistence Strategy

| Property | Value |
|----------|-------|
| Orm Configuration | Prisma with specific Preview Features (if needed, ... |
| Migration Requirements | Automated migrations via CI/CD pipeline using 'pri... |
| Analysis Reasoning | Ensures schema changes are versioned and applied c... |

# 6.0.0.0.0 Sequence Analysis

## 6.1.0.0.0 Interaction Patterns

### 6.1.1.0.0 Sequence Name

#### 6.1.1.1.0 Sequence Name

Initial Data Sync

#### 6.1.1.2.0 Repository Role

Data Sink

#### 6.1.1.3.0 Required Interfaces

- createMany(orders)
- createMany(products)
- createMany(customers)

#### 6.1.1.4.0 Method Specifications

- {'method_name': 'createMany', 'interaction_context': 'Background Job execution', 'parameter_analysis': 'Array of domain objects mapped to Prisma types', 'return_type_analysis': 'BatchPayload (count)', 'analysis_reasoning': 'Optimized for throughput over individual record latency.'}

#### 6.1.1.5.0 Analysis Reasoning

Supports REQ-FUNC-012.

### 6.1.2.0.0 Sequence Name

#### 6.1.2.1.0 Sequence Name

User Registration

#### 6.1.2.2.0 Repository Role

Transactional Actor

#### 6.1.2.3.0 Required Interfaces

- $transaction

#### 6.1.2.4.0 Method Specifications

- {'method_name': '$transaction', 'interaction_context': 'API Request', 'parameter_analysis': 'Array of promises (createUser, createMerchant, linkUser)', 'return_type_analysis': 'Tuple of created entities', 'analysis_reasoning': 'Ensures User and MerchantAccount are created atomically.'}

#### 6.1.2.5.0 Analysis Reasoning

Supports REQ-FUNC-001.

## 6.2.0.0.0 Communication Protocols

- {'protocol_type': 'Database Protocol (PostgreSQL Wire)', 'implementation_requirements': 'Connection string with pooler parameters (e.g., ?pgbouncer=true)', 'analysis_reasoning': 'Necessary for reliable serverless operation.'}

# 7.0.0.0.0 Critical Analysis Findings

## 7.1.0.0.0 Finding Category

### 7.1.1.0.0 Finding Category

Architectural Risk

### 7.1.2.0.0 Finding Description

Serverless Connection Exhaustion

### 7.1.3.0.0 Implementation Impact

Prisma Client must be instantiated as a singleton and configured to use a connection pooler (e.g., Supabase Transaction Pooler or Prisma Accelerate). Direct connection in Lambda will cause 'too many connections' errors.

### 7.1.4.0.0 Priority Level

High

### 7.1.5.0.0 Analysis Reasoning

Standard PostgreSQL connection limits are incompatible with the scaling characteristics of serverless functions.

## 7.2.0.0.0 Finding Category

### 7.2.1.0.0 Finding Category

Data Integrity

### 7.2.2.0.0 Finding Description

Strict Tenant Isolation Enforcement

### 7.2.3.0.0 Implementation Impact

Every model in schema.prisma (except global config) must explicitly include a merchantId field and relation to MerchantAccount.

### 7.2.4.0.0 Priority Level

High

### 7.2.5.0.0 Analysis Reasoning

Failure to include this in the schema definition makes downstream RBAC enforcement impossible (REQ-OVR-005).

## 7.3.0.0.0 Finding Category

### 7.3.1.0.0 Finding Category

Performance

### 7.3.2.0.0 Finding Description

Indexing Strategy for Analytics

### 7.3.3.0.0 Implementation Impact

Composite indices on [merchantId, createdAt] are mandatory for SalesOrder, AbandonedCart, and AuditLog tables.

### 7.3.4.0.0 Priority Level

Medium

### 7.3.5.0.0 Analysis Reasoning

Without these indices, dashboards and purge jobs will perform full table scans, degrading performance as data grows.

## 7.4.0.0.0 Finding Category

### 7.4.1.0.0 Finding Category

Compliance

### 7.4.2.0.0 Finding Description

PII Management for DSAR

### 7.4.3.0.0 Implementation Impact

Schema should clearly identify or isolate tables containing PII (Customer, User, Address) to facilitate the 'Erasure' logic required by REQ-CMPL-001.

### 7.4.4.0.0 Priority Level

Medium

### 7.4.5.0.0 Analysis Reasoning

Scattered PII makes complying with GDPR deletion requests complex and error-prone.

# 8.0.0.0.0 Analysis Traceability

## 8.1.0.0.0 Cached Context Utilization

Utilized ERD diagrams (78, 79) for entity mapping, Requirements (REQ-TEC-002, REQ-OVR-005) for constraint analysis, and Architecture Definition for serverless context.

## 8.2.0.0.0 Analysis Decision Trail

- Mapped ERD entities to Prisma Models
- Identified Serverless constraint -> Connection Pooling Requirement
- Mapped CDC requirement -> Standard PostgreSQL Schema (WAL compatible)
- Mapped Compliance requirements -> AuditLog & Retention Indexing

## 8.3.0.0.0 Assumption Validations

- Assumed PostgreSQL 16 based on architecture stack.
- Assumed infrastructure provides connection pooling URL.

## 8.4.0.0.0 Cross Reference Checks

- Validated User Management entities against Diagram 79
- Validated Sales entities against Diagram 78
- Checked functional requirements for missing entities (e.g., DomainAuthentication)

