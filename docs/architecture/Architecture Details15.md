# 1 Style

Serverless

# 2 Patterns

## 2.1 Single Page Application (SPA)

### 2.1.1 Name

Single Page Application (SPA)

### 2.1.2 Description

The entire user interface is a decoupled client-side application that communicates with the backend via APIs. This supports the responsive UI requirement (REQ-UI-003) and provides a rich, interactive user experience.

### 2.1.3 Benefits

- Rich user experience
- Decoupling of frontend and backend development
- Optimized frontend performance through client-side rendering and CDN hosting

### 2.1.4 Tradeoffs

- Initial load time can be longer
- SEO can be more complex to manage compared to server-side rendered pages

### 2.1.5 Applicability

#### 2.1.5.1 Scenarios

- Data-heavy applications with complex user interactions like dashboards and reports (REQ-FUNC-009).

#### 2.1.5.2 Constraints

- Requires JavaScript to be enabled in the user's browser.

## 2.2.0.0 API Gateway

### 2.2.1.0 Name

API Gateway

### 2.2.2.0 Description

A managed service that acts as the single entry point for all API calls from the frontend SPA to the backend serverless functions. It handles request routing, authentication, authorization, and rate limiting.

### 2.2.3.0 Benefits

- Centralized API management and security
- Decouples clients from backend microservices/functions
- Simplifies client-side logic

### 2.2.4.0 Tradeoffs

- Can become a single point of failure if not configured for high availability.
- Potential for increased latency.

### 2.2.5.0 Applicability

#### 2.2.5.1 Scenarios

- Exposing multiple serverless functions or microservices through a unified interface.

#### 2.2.5.2 Constraints

- Adds a layer of infrastructure to manage.

## 2.3.0.0 Retrieval-Augmented Generation (RAG)

### 2.3.1.0 Name

Retrieval-Augmented Generation (RAG)

### 2.3.2.0 Description

As specified in REQ-INTG-004, this pattern is used for the AI Assistant. User queries are first used to retrieve relevant, context-specific data from a merchant-scoped vector database. This context is then provided to the LLM (OpenAI) along with the original query to generate a grounded, accurate response.

### 2.3.3.0 Benefits

- Reduces model hallucinations by grounding responses in factual data
- Allows the AI to use up-to-date, private data without retraining the model
- Enforces data scoping and security (REQ-FUNC-014)

### 2.3.4.0 Tradeoffs

- Requires additional infrastructure for data embedding and vector storage.
- Introduces latency from the retrieval step.

### 2.3.5.0 Applicability

#### 2.3.5.1 Scenarios

- Building natural language interfaces over private, structured datasets.

#### 2.3.5.2 Constraints

- Effectiveness depends on the quality of data embeddings and the retrieval mechanism.

# 3.0.0.0 Layers

## 3.1.0.0 presentation

### 3.1.1.0 Id

presentation

### 3.1.2.0 Name

Presentation Layer (SPA)

### 3.1.3.0 Description

A client-side Single Page Application running in the user's browser. It is responsible for all user interface elements, interactions, and data visualization. It is hosted on a CDN for global performance.

### 3.1.4.0 Technologystack

React 18, Material-UI 5, Recharts 2, Quill.js 2

### 3.1.5.0 Language

TypeScript 5.4

### 3.1.6.0 Type

🔹 Presentation

### 3.1.7.0 Responsibilities

- Rendering the responsive user interface for desktops, tablets, and mobile (REQ-UI-003).
- Ensuring compliance with WCAG 2.1 Level AA accessibility standards (REQ-UI-004).
- Managing client-side state and routing.
- Visualizing analytics data in reports and dashboards (REQ-FUNC-009).
- Providing the rich text editor for email templates (REQ-FUNC-019).
- Communicating with the backend via the API Gateway.

### 3.1.8.0 Components

- React Components (for UI views)
- State Management Store (e.g., Zustand or Redux Toolkit)
- API Client Service (for backend communication)
- Component Library (MUI)
- Charting Components (Recharts)

### 3.1.9.0 Interfaces

*No items available*

### 3.1.10.0 Dependencies

- {'layerId': 'api_gateway', 'type': 'Required'}

### 3.1.11.0 Constraints

*No items available*

## 3.2.0.0 api_gateway

### 3.2.1.0 Id

api_gateway

### 3.2.2.0 Name

API Gateway Layer

### 3.2.3.0 Description

The public-facing entry point for all backend services. This layer is composed of serverless functions that handle incoming HTTP requests, perform initial validation and authentication, and route them to the appropriate application services.

### 3.2.4.0 Technologystack

AWS API Gateway or equivalent, Node.js 20.x

### 3.2.5.0 Language

TypeScript 5.4

### 3.2.6.0 Type

🔹 APIGateway

### 3.2.7.0 Responsibilities

- Exposing backend functionality via a secure REST or GraphQL API.
- Authenticating users using JWTs.
- Authorizing requests based on user roles.
- Routing requests to the correct serverless functions.
- Validating incoming request payloads.

### 3.2.8.0 Components

- API Route Handlers (Lambda Functions)
- Authentication Middleware
- Authorization Middleware
- Request Validation Middleware

### 3.2.9.0 Interfaces

*No items available*

### 3.2.10.0 Dependencies

- {'layerId': 'application_services', 'type': 'Required'}

### 3.2.11.0 Constraints

*No items available*

## 3.3.0.0 application_services

### 3.3.1.0 Id

application_services

### 3.3.2.0 Name

Application Services Layer

### 3.3.3.0 Description

Contains the core application logic, orchestrating domain objects and infrastructure services to fulfill use cases defined by the requirements. Implemented as a set of serverless functions, each focused on a specific feature area.

### 3.3.4.0 Technologystack

AWS Lambda or equivalent, Node.js 20.x

### 3.3.5.0 Language

TypeScript 5.4

### 3.3.6.0 Type

🔹 ApplicationServices

### 3.3.7.0 Responsibilities

- Implementing user management workflows (invitations, role changes) (REQ-FUNC-006, REQ-FUNC-007).
- Executing password reset logic (REQ-FUNC-003).
- Generating analytics reports by querying the OLAP data warehouse (REQ-FUNC-009 to REQ-FUNC-011).
- Running the sales forecasting algorithm (REQ-FUNC-012).
- Processing natural language queries via the RAG pattern (REQ-FUNC-014).
- Managing cart recovery campaigns and email templates (REQ-FUNC-019).
- Handling DSAR requests (REQ-CMPL-001).

### 3.3.8.0 Components

- UserService
- AnalyticsService
- ForecastingService
- AIAssistantService
- CampaignService
- DSARService

### 3.3.9.0 Interfaces

*No items available*

### 3.3.10.0 Dependencies

#### 3.3.10.1 Required

##### 3.3.10.1.1 Layer Id

domain

##### 3.3.10.1.2 Type

🔹 Required

#### 3.3.10.2.0 Required

##### 3.3.10.2.1 Layer Id

infrastructure

##### 3.3.10.2.2 Type

🔹 Required

### 3.3.11.0.0 Constraints

- {'type': 'Statelessness', 'description': 'All functions in this layer must be stateless to comply with REQ-SCAL-001.'}

## 3.4.0.0.0 domain

### 3.4.1.0.0 Id

domain

### 3.4.2.0.0 Name

Domain Layer

### 3.4.3.0.0 Description

The heart of the business logic. Contains domain entities, value objects, and business rules that are independent of any specific technology or framework. This layer is packaged as a shared library for use by application services.

### 3.4.4.0.0 Technologystack

None (Plain TypeScript)

### 3.4.5.0.0 Language

TypeScript 5.4

### 3.4.6.0.0 Type

🔹 Domain

### 3.4.7.0.0 Responsibilities

- Encapsulating core business entities (User, MerchantAccount, SalesOrder).
- Enforcing business rules and invariants (e.g., 'An Owner cannot change their own role') (REQ-FUNC-011).
- Defining domain-specific logic and calculations.

### 3.4.8.0.0 Components

- Domain Models (Entities, Value Objects)
- Domain Services
- Repository Interfaces

### 3.4.9.0.0 Interfaces

*No items available*

### 3.4.10.0.0 Dependencies

*No items available*

### 3.4.11.0.0 Constraints

- {'type': 'Isolation', 'description': 'This layer must not have dependencies on any other layer, especially infrastructure or application services.'}

## 3.5.0.0.0 infrastructure

### 3.5.1.0.0 Id

infrastructure

### 3.5.2.0.0 Name

Infrastructure Layer

### 3.5.3.0.0 Description

Provides implementations for interacting with external systems such as databases, caches, and third-party APIs. It implements the interfaces defined in the domain layer.

### 3.5.4.0.0 Technologystack

Prisma, @clickhouse/client, Redis client, OpenAI SDK, AWS SDK

### 3.5.5.0.0 Language

TypeScript 5.4

### 3.5.6.0.0 Type

🔹 Infrastructure

### 3.5.7.0.0 Responsibilities

- Implementing repository patterns for data access to PostgreSQL and ClickHouse.
- Interacting with the Redis cache.
- Communicating with the OpenAI API for the AI assistant (REQ-INTG-004).
- Sending emails via a third-party email service provider.
- Writing to the audit log (REQ-SEC-005).
- Managing the CDC data pipeline (REQ-DATA-002).

### 3.5.8.0.0 Components

- PostgresRepository (using Prisma)
- ClickHouseRepository
- RedisCacheService
- OpenAIGateway
- EmailServiceGateway
- AuditLogRepository
- VectorDBRepository (for RAG)

### 3.5.9.0.0 Interfaces

*No items available*

### 3.5.10.0.0 Dependencies

- {'layerId': 'domain', 'type': 'Required'}

### 3.5.11.0.0 Constraints

*No items available*

# 4.0.0.0.0 Quality Attributes

## 4.1.0.0.0 Performance

### 4.1.1.0.0 Tactics

- Asynchronous processing for data-intensive operations like report generation using message queues (e.g., SQS) to trigger functions (REQ-PERF-002).
- Cache-Aside pattern with Redis for frequently accessed, slow-changing data like products and categories.
- CDN hosting for the frontend SPA to achieve LCP < 2.5s (REQ-PERF-003).
- Use of a dedicated OLAP database (ClickHouse) for fast analytical queries.

### 4.1.2.0.0 Metrics

- p95 API response time < 200ms (REQ-PERF-001)
- LCP < 2.5s (REQ-PERF-003)

## 4.2.0.0.0 Scalability

### 4.2.1.0.0 Tactics

- Backend composed of stateless serverless functions, allowing for automatic, request-based scaling (REQ-SCAL-001).
- Use of managed, auto-scaling cloud databases and services (e.g., AWS RDS, ClickHouse Cloud, Pinecone).

### 4.2.2.0.0 Approach

Horizontal

## 4.3.0.0.0 Security

| Property | Value |
|----------|-------|
| Authentication | JWT (JSON Web Tokens) with short-lived access toke... |
| Authorization | Role-Based Access Control (RBAC) enforced at the A... |
| Data Protection | All data encrypted in transit (TLS 1.2+) and at re... |

## 4.4.0.0.0 Reliability

### 4.4.1.0.0 Tactics

- Deployment of serverless functions and databases across multiple Availability Zones.
- Automated database backups with Point-In-Time-Recovery (PITR) to meet RPO of 24 hours.
- Infrastructure as Code (IaC) for repeatable, documented disaster recovery procedures to meet RTO of 4 hours (REQ-REL-002).

## 4.5.0.0.0 Maintainability

### 4.5.1.0.0 Tactics

- Modular design with separation of concerns between layers.
- High unit test coverage (min 80%) enforced via CI/CD pipelines (REQ-MNT-001).
- Use of Dependency Injection to decouple components.
- Infrastructure defined as code (e.g., AWS CDK, Serverless Framework).

## 4.6.0.0.0 Extensibility

### 4.6.1.0.0 Tactics

- The serverless/microservice architecture allows new features to be added as independent functions without affecting existing ones.

# 5.0.0.0.0 Technology Stack

## 5.1.0.0.0 Primary Language

TypeScript 5.4

## 5.2.0.0.0 Frameworks

- React 18 (Frontend)
- Node.js 20.x (Backend Runtime)
- Serverless Framework or AWS CDK (Infrastructure as Code)

## 5.3.0.0.0 Database

| Property | Value |
|----------|-------|
| Type | PostgreSQL (OLTP), ClickHouse (OLAP), Redis (Cache... |
| Version | PostgreSQL 16, Latest Stable for others |
| Orm | Prisma 5.x |

## 5.4.0.0.0 Domain Specific Libraries

### 5.4.1.0.0 Recharts

#### 5.4.1.1.0 Name

Recharts

#### 5.4.1.2.0 Version

2.12.x

#### 5.4.1.3.0 Purpose

Declarative charting library for building analytics visualizations.

#### 5.4.1.4.0 Domain

E-commerce Analytics

### 5.4.2.0.0 Quill.js

#### 5.4.2.1.0 Name

Quill.js

#### 5.4.2.2.0 Version

2.0.x

#### 5.4.2.3.0 Purpose

Rich text editor for creating email templates (REQ-FUNC-019).

#### 5.4.2.4.0 Domain

Marketing Automation

### 5.4.3.0.0 OpenAI Node.js SDK

#### 5.4.3.1.0 Name

OpenAI Node.js SDK

#### 5.4.3.2.0 Version

4.x

#### 5.4.3.3.0 Purpose

Official SDK for integrating with the OpenAI API for the AI Assistant (REQ-INTG-004).

#### 5.4.3.4.0 Domain

AI / Machine Learning

## 5.5.0.0.0 Infrastructure

| Property | Value |
|----------|-------|
| Logging | Winston 3.x with a cloud-native logging service (e... |
| Caching | Redis 7.x |
| Testing | Jest (Unit/Integration), Playwright (E2E) |

# 6.0.0.0.0 Backend Services

## 6.1.0.0.0 Data transformation

### 6.1.1.0.0 Name

Data Ingestion Pipeline

### 6.1.2.0.0 Purpose

Handles the Change Data Capture (CDC) process to synchronize data from the OLTP (PostgreSQL) database to the OLAP (ClickHouse) data warehouse, as required by REQ-DATA-002.

### 6.1.3.0.0 Type

🔹 Data transformation

### 6.1.4.0.0 Communication

Asynchronous, event-driven (e.g., triggered by database logs via AWS DMS or Debezium).

## 6.2.0.0.0 Workflow

### 6.2.1.0.0 Name

Scheduled Tasks Service

### 6.2.2.0.0 Purpose

Runs periodic jobs for tasks such as expiring password reset links and invitations, purging old abandoned carts (REQ-DATA-001), and generating proactive AI insights (REQ-FUNC-015).

### 6.2.3.0.0 Type

🔹 Workflow

### 6.2.4.0.0 Communication

Triggered by a scheduler service (e.g., AWS EventBridge Scheduler).

# 7.0.0.0.0 Cross Cutting Concerns

| Property | Value |
|----------|-------|
| Logging | Structured, centralized logging implemented in a s... |
| Exception Handling | Global error handling middleware in the API Gatewa... |
| Configuration | Environment-specific configurations (e.g., databas... |
| Validation | Request payload validation using a schema-based li... |
| Security | Authentication and authorization are handled by mi... |

