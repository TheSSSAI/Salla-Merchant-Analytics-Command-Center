# 1 Id

REPO-APP-CORE-001

# 2 Name

salla-analytics-pwa-main

# 3 Description

This repository serves as the primary integration point and host for the user-facing Progressive Web App (PWA). It has been refactored from the original monorepo to focus solely on presentation and API orchestration. It contains the Next.js application, which is responsible for rendering all UI pages and exposing the Backend-For-Frontend (BFF) API endpoints. Its core responsibility is to assemble the user experience by consuming and integrating the versioned libraries from the dedicated UI, data, core, and SDK repositories. This lean structure dramatically reduces its cognitive overhead and build times, focusing development on the end-user journey and API composition rather than on underlying component implementation. It directly fulfills the UI and synchronous API requirements by acting as the central hub for user interaction.

# 4 Type

🔹 Application Services

# 5 Namespace

Salla.Analytics.WebApp

# 6 Output Path

apps/web

# 7 Framework

Next.js

# 8 Language

TypeScript

# 9 Technology

React, Vercel Functions, Fastify

# 10 Thirdparty Libraries

- next
- react
- zod
- fastify

# 11 Layer Ids

- presentation-layer
- bff-api-layer

# 12 Dependencies

- REPO-LIB-UI-001
- REPO-LIB-DATA-001
- REPO-LIB-CORE-001
- REPO-LIB-SDK-001
- REPO-SVC-AI-001

# 13 Requirements

## 13.1 Requirement Id

### 13.1.1 Requirement Id

REQ-INT-002

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

REQ-OVR-001

## 13.3.0 Requirement Id

### 13.3.1 Requirement Id

REQ-FUN-301

## 13.4.0 Requirement Id

### 13.4.1 Requirement Id

REQ-FUN-100

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

BFF (Backend-For-Frontend)

# 17.0.0 Architecture Map

- spa-frontend-001
- api-gateway-001

# 18.0.0 Components Map

- spa-frontend-001
- api-gateway-002

# 19.0.0 Requirements Map

- REQ-UI-001
- REQ-UI-002
- REQ-UI-003

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

REFACTOR_PRESERVED

## 20.2.0 Source Repository

REPO-APP-001

## 20.3.0 Decomposition Reasoning

This repository was preserved but significantly refactored to serve as the core application host, separating the integration and assembly logic from the implementation details of its constituent parts. This aligns with the Single Responsibility Principle, where this repository's sole purpose is to build and deploy the user-facing application, improving focus and simplifying its CI/CD pipeline.

## 20.4.0 Extracted Responsibilities

- UI Component Library Implementation
- Database Schema and Migrations
- Third-Party API Client Logic
- Core Data Pipeline Processing

## 20.5.0 Reusability Scope

- This repository itself is not reusable, but it is the primary consumer of all the new reusable libraries.

## 20.6.0 Development Benefits

- Allows the application team to focus on feature development and user experience without managing the complexity of shared libraries.
- Enables faster build times as it only builds the application code, leveraging pre-built library packages.

# 21.0.0 Dependency Contracts

## 21.1.0 Repo-Lib-Ui-001

### 21.1.1 Required Interfaces

- {'interface': 'ComponentLibrary', 'methods': ['DashboardCard', 'DataTable', 'DatePicker'], 'events': [], 'properties': []}

### 21.1.2 Integration Pattern

NPM Package Dependency (versioned)

### 21.1.3 Communication Protocol

Compile-time Import

## 21.2.0 Repo-Lib-Sdk-001

### 21.2.1 Required Interfaces

- {'interface': 'IOpenAIGateway', 'methods': ['askQuery(query: string, context: object): Promise<string>'], 'events': [], 'properties': []}

### 21.2.2 Integration Pattern

NPM Package Dependency (versioned)

### 21.2.3 Communication Protocol

Compile-time Import & Method Call

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'REST API', 'methods': ['GET /api/v1/reports/sales', 'POST /api/v1/ai/query', 'POST /api/v1/team/invite'], 'events': [], 'properties': [], 'consumers': ['End-user browser (PWA)']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | Dependencies (e.g., service clients from SDKs) are... |
| Event Communication | Primarily handles client-side events and translate... |
| Data Flow | Acts as the orchestrator for data flow between the... |
| Error Handling | Implements a global API error handler to catch exc... |
| Async Patterns | Utilizes async/await for all I/O-bound operations ... |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Adhere strictly to Next.js best practices for page... |
| Performance Considerations | Leverage Next.js features like Server Components, ... |
| Security Considerations | All API routes must be protected by authentication... |
| Testing Approach | Focus on integration tests for API routes (using s... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- Next.js pages and layouts.
- API route handlers for the BFF.
- Authentication and authorization middleware.
- Integration logic for consuming shared libraries.

## 25.2.0 Must Not Implement

- Reusable UI components.
- Database schema definitions or migrations.
- Direct third-party API calls (should use the SDK library).
- Core business logic that could be shared or used by a background process.

## 25.3.0 Extension Points

- New pages and API routes can be added to support new features.

## 25.4.0 Validation Rules

- All incoming API requests must be validated against a Zod schema before processing.

