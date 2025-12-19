# 1 Id

REPO-LIB-DATA-001

# 2 Name

database-schema

# 3 Description

This repository is the single source of truth for the application's OLTP data layer, extracted from the original monorepo's `@acme/db` package. It contains the Prisma schema file (`schema.prisma`), all database migration files, and the generation script for the type-safe Prisma Client. Its sole responsibility is to define and manage the lifecycle of the PostgreSQL database schema. By centralizing the data model, any service that needs to interact with the transactional database can depend on this versioned package to get a consistent, up-to-date, and type-safe client. This decouples the data model from the services that use it, preventing schema drift and enabling safe, predictable database changes across the entire distributed system.

# 4 Type

🔹 Data Access Library

# 5 Namespace

Salla.Analytics.DataAccess

# 6 Output Path

dist

# 7 Framework

Prisma

# 8 Language

TypeScript

# 9 Technology

Prisma, PostgreSQL

# 10 Thirdparty Libraries

- @prisma/client

# 11 Layer Ids

- data-access-layer

# 12 Dependencies

*No items available*

# 13 Requirements

## 13.1 Requirement Id

### 13.1.1 Requirement Id

REQ-TEC-002

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

REQ-OVR-005

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

Data Access Layer

# 17.0.0 Architecture Map

- postgres-repository-001

# 18.0.0 Components Map

- oltp-repository-008

# 19.0.0 Requirements Map

*No items available*

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

NEW_DECOMPOSED

## 20.2.0 Source Repository

REPO-APP-001

## 20.3.0 Decomposition Reasoning

Extracted to establish a single source of truth for the OLTP database schema and data access client. This prevents schema drift between different services, simplifies dependency management, and allows the data model to be versioned and evolved independently of the application logic that consumes it.

## 20.4.0 Extracted Responsibilities

- Prisma schema definition.
- Database migration files and management.
- Generation of the type-safe Prisma Client.

## 20.5.0 Reusability Scope

- Consumed by any service or application that needs to perform transactional operations against the PostgreSQL database.

## 20.6.0 Development Benefits

- Ensures all developers are using the exact same data model and client.
- Decouples application code from the database schema, making both easier to maintain.
- Centralizes database migration management.

# 21.0.0 Dependency Contracts

*No data available*

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'PrismaClient', 'methods': ['user.create()', 'salesOrder.findMany()'], 'events': [], 'properties': ['user: Prisma.UserDelegate', 'salesOrder: Prisma.SalesOrderDelegate'], 'consumers': ['REPO-APP-CORE-001', 'REPO-SVC-DATA-001']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | The generated `PrismaClient` is designed to be ins... |
| Event Communication | N/A |
| Data Flow | Provides the low-level functions for creating, rea... |
| Error Handling | Exposes specific Prisma error types (e.g., `Prisma... |
| Async Patterns | All database query methods are asynchronous and re... |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Use `prisma migrate dev` for local development and... |
| Performance Considerations | Consumers should use Prisma's features for selecti... |
| Security Considerations | The consuming service is responsible for handling ... |
| Testing Approach | This repository's tests should focus on validating... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- The complete `schema.prisma` file.
- All migration history.

## 25.2.0 Must Not Implement

- Business logic or data transformation logic.
- Repositories or service layers; it only provides the raw client.

## 25.3.0 Extension Points

- The Prisma schema can be extended with new models and fields.

## 25.4.0 Validation Rules

- Database-level constraints (e.g., unique, not null) should be defined in the schema.

