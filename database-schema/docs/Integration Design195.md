# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-LIB-DATA-001 |
| Extraction Timestamp | 2025-05-22T16:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | Production-Ready |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-TEC-002

#### 1.2.1.2 Requirement Text

The system shall use PostgreSQL as the primary transactional (OLTP) database, ensuring a single source of truth for the application's data schema.

#### 1.2.1.3 Validation Criteria

- Schema definition exists in schema.prisma
- Client generation targets PostgreSQL
- Migrations are version controlled

#### 1.2.1.4 Implementation Implications

- Export typed PrismaClient for consumers
- Manage connection pooling via singleton pattern

#### 1.2.1.5 Extraction Reasoning

This repository is the direct implementation of the OLTP data layer requirement.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-OVR-005

#### 1.2.2.2 Requirement Text

The system must enforce data integrity and prevent schema drift across distributed services by centralizing the data model definition.

#### 1.2.2.3 Validation Criteria

- All services import types from this single package
- No ad-hoc SQL queries outside of this library

#### 1.2.2.4 Implementation Implications

- Publish as versioned NPM package
- Strict TypeScript definition exports

#### 1.2.2.5 Extraction Reasoning

Centralization of the data model is the primary architectural purpose of this library.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-SCAL-001

#### 1.2.3.2 Requirement Text

The system's backend architecture shall be composed of stateless serverless functions that can be automatically scaled.

#### 1.2.3.3 Validation Criteria

- Database connections do not exhaust limits during scaling events

#### 1.2.3.4 Implementation Implications

- Implement PrismaClientSingleton to reuse connections in hot lambdas
- Configure PgBouncer compatibility in connection strings

#### 1.2.3.5 Extraction Reasoning

Critical integration constraint for consuming serverless repositories (REPO-APP-CORE-001, REPO-SVC-DATA-001).

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

PrismaClientSingleton

#### 1.3.1.2 Component Specification

A wrapper around the PrismaClient that ensures a single connection pool is instantiated and reused across serverless function invocations.

#### 1.3.1.3 Implementation Requirements

- Attach instance to global scope in development
- Lazy initialization logic
- Configuration injection from environment variables

#### 1.3.1.4 Architectural Context

Data Access Layer / Integration Pattern

#### 1.3.1.5 Extraction Reasoning

Essential for integrating a connection-heavy ORM with ephemeral serverless runtimes.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

Schema Definitions

#### 1.3.2.2 Component Specification

The `schema.prisma` file defining the exact structure of the database, relationships, and indexes.

#### 1.3.2.3 Implementation Requirements

- Define all models (User, Merchant, Order, etc.)
- Define composite indexes for multi-tenant performance
- Generate TypeScript types

#### 1.3.2.4 Architectural Context

Data Access Layer / Contract Definition

#### 1.3.2.5 Extraction Reasoning

Defines the data contract used by all dependent repositories.

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Data Access Layer', 'layer_responsibilities': 'Abstracts the physical database storage, manages connection lifecycle, and provides type-safe query interfaces to the application layer.', 'layer_constraints': ['Must be stateless (configuration provided at runtime)', 'Must not contain business logic beyond data integrity rules'], 'implementation_patterns': ['Active Record', 'Singleton', 'Repository'], 'extraction_reasoning': 'This library constitutes the entire Data Access Layer for the OLTP system.'}

## 1.5.0.0 Dependency Interfaces

- {'interface_name': 'PostgreSQL Wire Protocol', 'source_repository': 'Infrastructure (AWS RDS / Supabase)', 'method_contracts': [{'method_name': 'Connect', 'method_signature': 'tcp://host:5432', 'method_purpose': 'Establishes secure TCP connection to the database instance.', 'integration_context': 'Invoked automatically by PrismaClient.$connect()'}], 'integration_pattern': 'TCP Socket / Connection Pool', 'communication_protocol': 'PostgreSQL Wire Protocol (v3.0)', 'extraction_reasoning': 'The library depends on a running PostgreSQL instance provided by the infrastructure.'}

## 1.6.0.0 Exposed Interfaces

- {'interface_name': 'DataClientLibrary', 'consumer_repositories': ['REPO-APP-CORE-001', 'REPO-SVC-DATA-001', 'REPO-SVC-AI-001'], 'method_contracts': [{'method_name': 'db.model.findMany', 'method_signature': '(args?: { where?: TWhere, include?: TInclude, select?: TSelect }): Promise<TModel[]>', 'method_purpose': 'Retrieves filtered records from the database.', 'implementation_requirements': 'Generated by Prisma'}, {'method_name': 'db.model.create', 'method_signature': '(args: { data: TCreateInput }): Promise<TModel>', 'method_purpose': 'Persists a new record to the database.', 'implementation_requirements': 'Generated by Prisma'}, {'method_name': 'db.$transaction', 'method_signature': '(fn: (prisma: PrismaClient) => Promise<T>): Promise<T>', 'method_purpose': 'Executes a sequence of operations atomically.', 'implementation_requirements': 'Used for complex writes (e.g., User + Merchant creation)'}], 'service_level_requirements': ['Type definitions must match database schema 1:1', 'Client initialization must be under 50ms (excluding connection)'], 'implementation_constraints': ['Must support tree-shaking for lighter bundles', 'Must rely on environment variables for credentials'], 'extraction_reasoning': 'This is the primary interface consumed by application code to interact with the database.'}

## 1.7.0.0 Technology Context

### 1.7.1.0 Framework Requirements

Node.js 20.x, Prisma 5.x

### 1.7.2.0 Integration Technologies

- Prisma Client
- PostgreSQL
- TypeScript

### 1.7.3.0 Performance Constraints

Connection pooling is mandatory for serverless consumers. Schema must support high-throughput writes for the CDC pipeline sync.

### 1.7.4.0 Security Requirements

Credentials must be loaded from environment variables. SSL/TLS must be enforced for database connections.

## 1.8.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | 100% - All dependencies and consumers mapped. |
| Cross Reference Validation | Validated against REPO-APP-CORE-001 (BFF usage) an... |
| Implementation Readiness Assessment | High - Specific class (PrismaClientSingleton) and ... |
| Quality Assurance Confirmation | Integration design adheres to serverless architect... |

