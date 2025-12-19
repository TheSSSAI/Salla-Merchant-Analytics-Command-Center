# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-APP-CORE-001 |
| Extraction Timestamp | 2025-10-27T15:30:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High - Deployment Ready |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

US-009

#### 1.2.1.2 Requirement Text

User connects a Salla store via OAuth.

#### 1.2.1.3 Validation Criteria

- User is redirected to Salla
- Callback handles auth code exchange
- Tokens are securely stored

#### 1.2.1.4 Implementation Implications

- Implement Route Handler for OAuth callback
- Securely exchange code for tokens using SallaGateway
- Store encrypted credentials via Database Library

#### 1.2.1.5 Extraction Reasoning

Core integration point for the BFF layer to handle external authentication flows.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

US-013

#### 1.2.2.2 Requirement Text

User receives a notification upon completion of data sync.

#### 1.2.2.3 Validation Criteria

- In-app toast notification appears
- Notification center updates

#### 1.2.2.4 Implementation Implications

- Implement polling or Server-Sent Events (SSE) endpoint for sync status
- Integrate with Notification Service logic

#### 1.2.2.5 Extraction Reasoning

Requires real-time or near real-time integration with backend state managed by the data pipeline.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-PERF-002

#### 1.2.3.2 Requirement Text

The system shall process complex, data-intensive operations asynchronously to prevent blocking the user interface.

#### 1.2.3.3 Validation Criteria

- UI shows 'processing' state
- Operation is offloaded to background queue

#### 1.2.3.4 Implementation Implications

- BFF endpoints must publish to Upstash QStash for heavy tasks (Export, Sync)
- Return 202 Accepted immediately

#### 1.2.3.5 Extraction Reasoning

Defines the async communication pattern for the BFF API.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

REQ-INTG-006

#### 1.2.4.2 Requirement Text

The system shall implement a reconciliation job... (Context: Triggering from UI)

#### 1.2.4.3 Validation Criteria

- User can trigger manual sync/reconciliation

#### 1.2.4.4 Implementation Implications

- Expose endpoint to trigger reconciliation job via QStash

#### 1.2.4.5 Extraction Reasoning

Integration point between UI controls and backend asynchronous workers.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

AuthIntegrationService

#### 1.3.1.2 Component Specification

Orchestrates the OAuth2 flow with Salla, managing state parameters, code exchange, and session cookie generation.

#### 1.3.1.3 Implementation Requirements

- Validate 'state' parameter to prevent CSRF
- Use SallaGateway for code exchange
- Set HttpOnly Secure cookies for session

#### 1.3.1.4 Architectural Context

BFF Application Service - Security Boundary

#### 1.3.1.5 Extraction Reasoning

Centralizes external auth integration logic within the Next.js backend.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

JobDispatcher

#### 1.3.2.2 Component Specification

Utility to publish messages to Upstash QStash for asynchronous background processing (e.g., triggering data sync, sending bulk emails).

#### 1.3.2.3 Implementation Requirements

- Sign requests to QStash
- Handle QStash API responses/errors

#### 1.3.2.4 Architectural Context

Infrastructure Adapter within BFF

#### 1.3.2.5 Extraction Reasoning

Decouples the frontend from long-running processes hosted in REPO-SVC-DATA-001.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

AnalyticsQueryOrchestrator

#### 1.3.3.2 Component Specification

Aggregates data from the ClickHouse repository and applies formatting/localization before sending to the frontend.

#### 1.3.3.3 Implementation Requirements

- Call ClickHouseRepository via REPO-LIB-DATA-001
- Apply timezone conversions
- Format currency values

#### 1.3.3.4 Architectural Context

BFF Domain Service

#### 1.3.3.5 Extraction Reasoning

Ensures the UI receives consumption-ready data structures.

## 1.4.0.0 Architectural Layers

- {'layer_name': 'BFF (Backend For Frontend)', 'layer_responsibilities': 'Aggregating data from internal libraries, managing user sessions, enforcing API security, and orchestrating async tasks.', 'layer_constraints': ['No direct database access from Client Components', 'Must validate all inputs using Zod'], 'implementation_patterns': ['API Gateway Pattern', 'Facade Pattern', 'Token Mediator Pattern'], 'extraction_reasoning': 'The Next.js API Routes serve as the glue between the UI and the underlying domain/infrastructure libraries.'}

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

ISallaGateway

#### 1.5.1.2 Source Repository

REPO-LIB-SDK-001

#### 1.5.1.3 Method Contracts

- {'method_name': 'exchangeCodeForToken', 'method_signature': '(code: string): Promise<OAuthTokenResponse>', 'method_purpose': 'Swaps the temporary auth code from Salla for access/refresh tokens.', 'integration_context': 'Called in /api/auth/callback Route Handler.'}

#### 1.5.1.4 Integration Pattern

Library Import (Adapter)

#### 1.5.1.5 Communication Protocol

In-Process (Function Call)

#### 1.5.1.6 Extraction Reasoning

The BFF relies on the SDK library to handle vendor-specific OAuth logic.

### 1.5.2.0 Interface Name

#### 1.5.2.1 Interface Name

IAIAssistantService

#### 1.5.2.2 Source Repository

REPO-SVC-AI-001

#### 1.5.2.3 Method Contracts

- {'method_name': 'processQuery', 'method_signature': '(request: NaturalLanguageQueryRequest): Promise<AIQueryResponse>', 'method_purpose': 'Processes a natural language question using RAG and returns an answer.', 'integration_context': 'Called in /api/ai/query Route Handler.'}

#### 1.5.2.4 Integration Pattern

Library Import (Domain Service)

#### 1.5.2.5 Communication Protocol

In-Process (Function Call)

#### 1.5.2.6 Extraction Reasoning

The BFF delegates the complex AI logic to the dedicated AI domain library.

### 1.5.3.0 Interface Name

#### 1.5.3.1 Interface Name

IAnalyticsRepository

#### 1.5.3.2 Source Repository

REPO-LIB-DATA-001

#### 1.5.3.3 Method Contracts

- {'method_name': 'getSalesMetrics', 'method_signature': '(merchantId: string, period: DateRange): Promise<SalesMetrics>', 'method_purpose': 'Fetches aggregated sales data from the OLAP source.', 'integration_context': 'Called in /api/reports/sales Route Handler.'}

#### 1.5.3.4 Integration Pattern

Library Import (Repository)

#### 1.5.3.5 Communication Protocol

Database Protocol (via Prisma/ClickHouse Client)

#### 1.5.3.6 Extraction Reasoning

The BFF retrieves data via the standardized data access library.

### 1.5.4.0 Interface Name

#### 1.5.4.1 Interface Name

IJobQueue

#### 1.5.4.2 Source Repository

REPO-INFRA-001 (Upstash)

#### 1.5.4.3 Method Contracts

- {'method_name': 'publishJSON', 'method_signature': '(topic: string, body: object): Promise<PublishResponse>', 'method_purpose': "Queues a message for background processing (e.g., 'start_sync').", 'integration_context': 'Called when user initiates sync or export.'}

#### 1.5.4.4 Integration Pattern

HTTP API Client

#### 1.5.4.5 Communication Protocol

REST over HTTPS

#### 1.5.4.6 Extraction Reasoning

Required to trigger asynchronous workflows in REPO-SVC-DATA-001.

## 1.6.0.0 Exposed Interfaces

- {'interface_name': 'BFF REST API', 'consumer_repositories': ['Browser Client (React App)'], 'method_contracts': [{'method_name': 'POST /api/auth/salla/callback', 'method_signature': 'Query Params: code, state. Returns: 302 Redirect.', 'method_purpose': 'Handles the OAuth redirection from Salla, establishes session.', 'implementation_requirements': 'Validate state, exchange token, set cookies.'}, {'method_name': 'GET /api/sync/status', 'method_signature': "Headers: Cookie. Returns: { status: 'RUNNING', progress: 45 }", 'method_purpose': 'Provides real-time status of the data synchronization job.', 'implementation_requirements': 'Query database for job status scoped to current merchant.'}, {'method_name': 'POST /api/reports/export', 'method_signature': 'Body: { reportType, filters }. Returns: { jobId } or CSV Blob.', 'method_purpose': 'Initiates a report export.', 'implementation_requirements': 'If large data, queue job via QStash and return 202.'}], 'service_level_requirements': ['API endpoints must respond within 200ms (p95) for synchronous operations.', 'Auth callback must complete within 2s.'], 'implementation_constraints': ['Must use HttpOnly cookies for session management.', 'Must validate all request bodies with Zod.'], 'extraction_reasoning': 'The interface the PWA exposes to the client-side code.'}

## 1.7.0.0 Technology Context

### 1.7.1.0 Framework Requirements

Next.js 14+ App Router, Serverless Functions (Edge or Node.js runtime).

### 1.7.2.0 Integration Technologies

- Upstash QStash SDK (Messaging)
- Postmark SDK (Email)
- Iron-Session or JOSE (Session Management)
- SWR / React Query (Client-side Data Fetching)

### 1.7.3.0 Performance Constraints

Cold start times for serverless functions must be minimized using lightweight dependencies.

### 1.7.4.0 Security Requirements

CSRF protection on all mutation endpoints. Strict Content Security Policy (CSP). Rate limiting on public auth endpoints.

## 1.8.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | 100% - Mapped connections to all libraries (SDK, D... |
| Cross Reference Validation | Validated against US-009 (Auth), US-013 (Sync), an... |
| Implementation Readiness Assessment | High - Protocols and interface contracts are expli... |
| Quality Assurance Confirmation | The integration design supports the decoupled, ser... |

