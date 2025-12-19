# Salla Analytics PWA - Enterprise Architecture Documentation

## Executive Summary
This document outlines the enterprise architecture for the Salla Analytics Progressive Web App (PWA), a cloud-native, multi-tenant B2B SaaS platform. The system provides Salla e-commerce merchants with advanced analytics, business intelligence, and marketing automation tools. 

The architecture is founded on a **serverless-first** philosophy, leveraging Vercel for compute and hosting. A key architectural decision is the adoption of the **Command Query Responsibility Segregation (CQRS)** pattern, which physically separates the transactional (OLTP) and analytical (OLAP) data stores. PostgreSQL serves as the primary OLTP database for application state, while ClickHouse provides a high-performance columnar data warehouse for all analytical queries. This separation ensures that complex reporting does not impact the application's transactional performance.

To enhance maintainability, enable parallel development, and enforce clear domain boundaries, the original monorepo has been systematically **decomposed into a set of specialized, versionable repositories**. These include a core application shell, reusable libraries for UI and data access, and dedicated services for data ingestion and AI logic. This micro-repositories approach facilitates independent team workflows and improves the overall resilience and scalability of the system.

The business value of this architecture lies in its ability to deliver a highly performant, scalable, and maintainable solution. It enables rapid feature development through decoupled components, ensures low-latency analytics for a superior user experience, and provides a robust foundation for future growth.

## Solution Architecture Overview

- **Technology Stack**: The system is built on a modern, type-safe TypeScript stack. The frontend utilizes **React/Next.js** with **shadcn/ui** and **Tailwind CSS**. The backend is powered by **Fastify** running on **Vercel Serverless Functions**. The data layer consists of **Vercel Postgres** (OLTP), **ClickHouse Cloud** (OLAP), and **Upstash Redis** for caching.

- **Architectural Patterns**:
    - **Serverless**: All compute logic is executed within stateless, auto-scaling serverless functions, minimizing operational overhead.
    - **CQRS**: Separates the write model (commands, OLTP) from the read model (queries, OLAP), optimizing each for its specific task.
    - **Multi-Tenant**: A database-level multi-tenancy model is enforced, with all data strictly partitioned by `merchant_id`.
    - **Event-Driven / CDC**: A Change Data Capture (CDC) pipeline, fed by Salla Webhooks and queued via Upstash QStash, ensures near real-time data synchronization between the OLTP and OLAP databases.
    - **Anti-Corruption Layer**: A dedicated `integration-gateways` repository isolates the application from the complexities and potential instability of third-party APIs (Salla, OpenAI, Postmark).

- **Integration Approach**: The system integrates with the external Salla platform via REST APIs and Webhooks. Internally, the frontend SPA communicates with a Backend-For-Frontend (BFF) via a REST API. Backend components are integrated through versioned NPM packages, promoting strong contracts and decoupled lifecycles.

## Repository Architecture Strategy

The architecture has evolved from a single application monorepo into a distributed ecosystem of nine specialized repositories. This decomposition was a strategic decision to manage complexity and scale the development process effectively. The core principles behind this strategy are:

- **Separation of Concerns**: Each repository has a single, well-defined responsibility. For example, `ui-components` only handles the UI library, `database-schema` only manages the OLTP data model, and `data-pipeline-service` is exclusively focused on data synchronization.

- **Independent Lifecycles**: The decoupled nature of the repositories allows for independent versioning, testing, and deployment. The UI library can be updated without requiring a redeployment of the data pipeline, significantly increasing development velocity and reducing deployment risk.

- **Enforced Consistency & Reusability**: Shared concerns are extracted into versioned libraries (`core-library`, `ui-components`, `database-schema`). This prevents code duplication and ensures that all parts of the system adhere to the same standards, types, and UI patterns.

- **Team Autonomy**: The repository structure enables teams to work in parallel with clear ownership. A frontend team can own the UI library, a data engineering team can own the data pipeline, and an application team can focus on integrating these components to deliver user-facing features.

This strategy transforms the system into a more modular, maintainable, and scalable solution, providing a solid foundation for long-term development and operational stability.

## System Architecture Diagrams

### Repository Dependency Architecture
This diagram illustrates the dependencies between the specialized repositories, grouped by their architectural layer. It shows how applications consume libraries and how services are built upon foundational data and SDK layers.



### Component Integration Patterns
This diagram shows the key runtime integration patterns between the system's logical components, both internal and external. It highlights the flow of user requests, asynchronous data pipelines, and third-party API interactions.



## Repository Catalog

| ID | Repository Name | Type | Description |
|---|---|---|---|
| **REPO-APP-CORE-001** | `salla-analytics-pwa-main` | Application | The primary Next.js application shell, serving the PWA and BFF API. It integrates all other libraries to build the final product. |
| **REPO-LIB-UI-001** | `ui-components` | UI Library | A reusable React component library based on shadcn/ui and Storybook for consistent UI/UX. |
| **REPO-LIB-DATA-001** | `database-schema` | Data Access Library | The single source of truth for the OLTP (PostgreSQL) database schema, managed with Prisma. |
| **REPO-DA-OLAP-001** | `olap-repository` | Data Access Library | A dedicated data access layer for ClickHouse, encapsulating all optimized analytical query logic. |
| **REPO-LIB-CORE-001** | `core-library` | Utility Library | Contains shared, cross-cutting code like TypeScript types, Zod schemas, and common utilities. |
| **REPO-LIB-SDK-001** | `integration-gateways` | Infrastructure Library | An anti-corruption layer providing type-safe SDKs for all third-party APIs (Salla, OpenAI, etc.). |
| **REPO-SVC-DATA-001** | `data-pipeline-service` | Backend Service | A standalone service managing the entire CDC/ELT pipeline for syncing data from OLTP to OLAP. |
| **REPO-SVC-AI-001** | `ai-assistant-service-lib` | Domain Library | A specialized library containing the core logic for the AI assistant, including the RAG pattern. |
| **REPO-INFRA-001** | `salla-analytics-infra` | Infrastructure | Infrastructure as Code (Terraform) for managing all non-Vercel cloud resources like ClickHouse and Redis. |

## Integration Architecture

- **API Contracts**: The primary user-facing contract is the **REST API** exposed by the BFF in `salla-analytics-pwa-main`. It uses JSON for data exchange.
- **Webhook Contracts**: The `data-pipeline-service` exposes **Webhook endpoints** to receive real-time events from the Salla platform.
- **Internal Contracts**: Integration between internal components is achieved through **TypeScript interfaces** and **versioned NPM packages**. For example, `salla-analytics-pwa-main` depends on a specific version of `olap-repository` and its `IAnalyticsRepository` interface, ensuring a stable contract.
- **Data Flow**: Data flows into the system via Salla Webhooks and APIs into the `data-pipeline-service`. It is then processed through a message queue (Upstash QStash) and synchronized to the ClickHouse data warehouse. The user-facing application queries this data through the BFF, which uses the `olap-repository` for efficient data retrieval.

## Technology Implementation Framework

- **Next.js (BFF)**: API routes must remain lean controllers. Complex business logic should be delegated to imported services/libraries (e.g., `ai-assistant-service-lib`). All API routes must be protected by authentication middleware.
- **Data Pipeline Service**: All message handlers and webhook consumers must be **idempotent** to handle at-least-once message delivery from the queue. Leverage batch processing to optimize writes into ClickHouse.
- **OLAP Repository**: All queries must be strictly parameterized and scoped by `merchant_id` to prevent SQL injection and data leakage. Leverage ClickHouse features like materialized views to optimize performance for common queries.
- **Prisma**: Database migrations must be managed through the `prisma migrate` CLI and be version-controlled within the `database-schema` repository.

## Performance & Scalability Architecture

- **Scalability**: The serverless nature of Vercel Functions provides automatic, request-based scaling for the entire API layer. The data ingestion pipeline is designed to scale horizontally by increasing the concurrency of the message queue consumers.
- **Performance**: The CQRS architecture is the key performance enabler. By offloading all analytical queries to a specialized ClickHouse instance via the `olap-repository`, the primary PostgreSQL database is protected from performance-degrading reports. Asynchronous processing for long-running tasks (REQ-PERF-002) ensures the UI remains responsive. Caching frequently accessed data in Redis further reduces latency.
- **Reliability**: The use of a Dead-Letter Queue (DLQ) in the data pipeline ensures that failed data synchronization events are not lost and can be reprocessed. A Circuit Breaker pattern is implemented in the `integration-gateways` library for the OpenAI integration to prevent cascading failures.

## Development & Deployment Strategy

The decomposed repository structure enables a modern, CI/CD-driven development and deployment workflow.

- **Team Organization**: Teams can be structured around repository ownership: Platform (Infra), UI/Design System (`ui-components`), Data Engineering (`data-pipeline-service`, `olap-repository`), and Application Features (`salla-analytics-pwa-main`).
- **CI/CD Pipeline**: Each repository has an independent GitHub Actions pipeline responsible for linting, testing, building, and publishing its respective artifact. 
    - **Libraries** (`ui-components`, `core-library`, etc.) are published as versioned packages to a private NPM registry.
    - **Services** (`data-pipeline-service`) are deployed as a set of serverless functions.
    - **Application** (`salla-analytics-pwa-main`) is deployed to Vercel.
- **Release Management**: This model allows for independent release cycles. A bug fix in the UI library can be published and consumed by the main application without affecting any backend services.

## Architecture Decision Records

- **ADR-001: Adopt a CQRS Architecture with PostgreSQL and ClickHouse.**
    - **Decision**: To separate the system's command (write/transactional) and query (read/analytical) operations into distinct data stores.
    - **Rationale**: Standard OLTP databases like PostgreSQL are not optimized for the complex, large-scale analytical queries required by the application. A specialized OLAP database like ClickHouse provides orders-of-magnitude faster performance for these queries. This separation prevents analytical workloads from degrading the performance of user-facing transactional operations.

- **ADR-002: Decompose the Application Monorepo into Specialized Repositories.**
    - **Decision**: To break down the original application codebase into multiple, smaller repositories, each with a single responsibility (e.g., UI library, data pipeline service, infrastructure).
    - **Rationale**: This strategy enhances maintainability, enables parallel development by autonomous teams, promotes code reuse through versioned libraries, and decouples deployment lifecycles, leading to faster, safer releases.

- **ADR-003: Utilize a Serverless-First Compute Model on Vercel.**
    - **Decision**: To build the entire backend and frontend on a managed serverless platform.
    - **Rationale**: A serverless approach eliminates the need for server provisioning and management, provides automatic scaling based on demand, and offers a cost-effective pay-per-use model. This allows the development team to focus on building business value rather than managing infrastructure.