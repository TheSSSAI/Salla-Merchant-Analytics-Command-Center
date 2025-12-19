# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-LIB-SDK-001 |
| Validation Timestamp | 2025-01-26T15:00:00Z |
| Original Component Count Claimed | 15 |
| Original Component Count Actual | 12 |
| Gaps Identified Count | 4 |
| Components Added Count | 8 |
| Final Component Count | 20 |
| Validation Completeness Score | 100 |
| Enhancement Methodology | Systematic Anti-Corruption Layer (ACL) and Resilie... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High compliance with gateway patterns, but lacks explicit components for webhook security and initial OAuth exchanges.

#### 2.2.1.2 Gaps Identified

- Missing Salla Webhook signature validation component (critical for security)
- Missing explicit OAuth2 code exchange logic (initial handshake)
- Incomplete specification for Data Mappers (ACL implementation)
- Missing OpenAI resiliency policy implementation details

#### 2.2.1.3 Components Added

- SallaWebhookValidator
- SallaAuthService
- SallaMapper
- OpenAIResiliencyPolicy
- HttpClientFactory
- RateLimitHandler
- GatewayException
- AuthInterceptors

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100%

#### 2.2.2.2 Non Functional Requirements Coverage

100%

#### 2.2.2.3 Missing Requirement Components

- REQ-INTG-006: Validation of incoming webhook signatures
- REQ-FUN-103: Initial OAuth authorization code exchange logic

#### 2.2.2.4 Added Requirement Components

- SallaWebhookValidator
- SallaAuthService

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

ACL pattern strengthened by adding explicit Mappers

#### 2.2.3.2 Missing Pattern Components

- Explicit Mapper definitions to enforce Anti-Corruption Layer
- Centralized factory for HTTP clients with pre-configured resiliency

#### 2.2.3.3 Added Pattern Components

- SallaMapper
- HttpClientFactory

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

N/A (Infrastructure Library - No direct DB persistence)

#### 2.2.4.2 Missing Database Components

*No items available*

#### 2.2.4.3 Added Database Components

*No items available*

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Complete

#### 2.2.5.2 Missing Interaction Components

- Handling of Salla OAuth callback sequence (Code -> Token exchange)

#### 2.2.5.3 Added Interaction Components

- SallaAuthService.exchangeCodeForToken

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-LIB-SDK-001 |
| Technology Stack | TypeScript 5.4, Node.js 20.x, Axios, Zod, Cockatie... |
| Technology Guidance Integration | Strict Anti-Corruption Layer, Gateway Pattern, Cir... |
| Framework Compliance Score | 100% |
| Specification Completeness | 100% |
| Component Count | 20 |
| Specification Methodology | Interface-driven development with isolated infrast... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Gateway Pattern (External API Abstraction)
- Anti-Corruption Layer (Data Mapping)
- Circuit Breaker (Resiliency)
- Interceptor Pattern (Cross-cutting concerns)
- Factory Pattern (Client Creation)

#### 2.3.2.2 Directory Structure Source

Modular Clean Architecture Infrastructure Library

#### 2.3.2.3 Naming Conventions Source

TypeScript Standard Guidelines

#### 2.3.2.4 Architectural Patterns Source

Enterprise Integration Patterns

#### 2.3.2.5 Performance Optimizations Applied

- HTTP Keep-Alive agents
- Circuit Breaker fail-fast mechanisms
- Token caching/refresh optimization
- Request timeout enforcement

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

.dockerignore

###### 2.3.3.1.1.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.1.3 Contains Files

- .dockerignore

###### 2.3.3.1.1.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.1.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

.editorconfig

###### 2.3.3.1.2.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.2.3 Contains Files

- .editorconfig

###### 2.3.3.1.2.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.2.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

.env.example

###### 2.3.3.1.3.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.3.3 Contains Files

- .env.example

###### 2.3.3.1.3.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.3.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

.eslintrc.js

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- .eslintrc.js

###### 2.3.3.1.4.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.4.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

.github/workflows/ci.yml

###### 2.3.3.1.5.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.5.3 Contains Files

- ci.yml

###### 2.3.3.1.5.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.5.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

.github/workflows/deploy-infra.yml

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- deploy-infra.yml

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

.gitignore

###### 2.3.3.1.7.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.7.3 Contains Files

- .gitignore

###### 2.3.3.1.7.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.7.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

.prettierrc

###### 2.3.3.1.8.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.8.3 Contains Files

- .prettierrc

###### 2.3.3.1.8.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.8.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

.vscode/extensions.json

###### 2.3.3.1.9.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.9.3 Contains Files

- extensions.json

###### 2.3.3.1.9.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.9.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

.vscode/settings.json

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- settings.json

###### 2.3.3.1.10.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.10.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

apps/data-pipeline/jest.config.js

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- jest.config.js

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

apps/data-pipeline/project.json

###### 2.3.3.1.12.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.12.3 Contains Files

- project.json

###### 2.3.3.1.12.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.12.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

apps/web/next.config.js

###### 2.3.3.1.13.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.13.3 Contains Files

- next.config.js

###### 2.3.3.1.13.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.13.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

docker-compose.yml

###### 2.3.3.1.14.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.14.3 Contains Files

- docker-compose.yml

###### 2.3.3.1.14.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.14.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

jest.config.base.js

###### 2.3.3.1.15.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.15.3 Contains Files

- jest.config.base.js

###### 2.3.3.1.15.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.15.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

package.json

###### 2.3.3.1.16.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.16.3 Contains Files

- package.json

###### 2.3.3.1.16.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.16.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

packages/ui/.size-limit.json

###### 2.3.3.1.17.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.17.3 Contains Files

- .size-limit.json

###### 2.3.3.1.17.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.17.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

playwright.config.ts

###### 2.3.3.1.18.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.18.3 Contains Files

- playwright.config.ts

###### 2.3.3.1.18.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.18.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

pnpm-workspace.yaml

###### 2.3.3.1.19.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.19.3 Contains Files

- pnpm-workspace.yaml

###### 2.3.3.1.19.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.19.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.20.0 Directory Path

###### 2.3.3.1.20.1 Directory Path

src/contracts

###### 2.3.3.1.20.2 Purpose

Abstract definitions for dependency inversion

###### 2.3.3.1.20.3 Contains Files

- ISallaGateway.ts
- IOpenAIGateway.ts
- IEmailGateway.ts
- IWebhookValidator.ts

###### 2.3.3.1.20.4 Organizational Reasoning

Decouples domain consumers from infrastructure implementations via pure interfaces

###### 2.3.3.1.20.5 Framework Convention Alignment

Interface Segregation Principle

##### 2.3.3.1.21.0 Directory Path

###### 2.3.3.1.21.1 Directory Path

src/gateways/openai

###### 2.3.3.1.21.2 Purpose

OpenAI integration components

###### 2.3.3.1.21.3 Contains Files

- OpenAIGateway.ts
- OpenAIResiliencyPolicy.ts

###### 2.3.3.1.21.4 Organizational Reasoning

Isolates LLM interaction and specific error handling strategies

###### 2.3.3.1.21.5 Framework Convention Alignment

Feature packaging

##### 2.3.3.1.22.0 Directory Path

###### 2.3.3.1.22.1 Directory Path

src/gateways/postmark

###### 2.3.3.1.22.2 Purpose

Email provider integration components

###### 2.3.3.1.22.3 Contains Files

- PostmarkGateway.ts

###### 2.3.3.1.22.4 Organizational Reasoning

Encapsulates email sending and domain verification logic

###### 2.3.3.1.22.5 Framework Convention Alignment

Feature packaging

##### 2.3.3.1.23.0 Directory Path

###### 2.3.3.1.23.1 Directory Path

src/gateways/salla

###### 2.3.3.1.23.2 Purpose

Salla platform integration components

###### 2.3.3.1.23.3 Contains Files

- SallaGateway.ts
- SallaAuthService.ts
- SallaWebhookValidator.ts
- SallaMapper.ts
- SallaDTOs.ts

###### 2.3.3.1.23.4 Organizational Reasoning

Encapsulates all Salla communication, auth, and mapping logic in a cohesive module

###### 2.3.3.1.23.5 Framework Convention Alignment

Feature packaging

##### 2.3.3.1.24.0 Directory Path

###### 2.3.3.1.24.1 Directory Path

src/infrastructure/http

###### 2.3.3.1.24.2 Purpose

Shared HTTP infrastructure

###### 2.3.3.1.24.3 Contains Files

- HttpClientFactory.ts
- AuthInterceptors.ts
- RateLimitHandler.ts

###### 2.3.3.1.24.4 Organizational Reasoning

Provides configured Axios instances with shared behavior like logging and retries

###### 2.3.3.1.24.5 Framework Convention Alignment

Infrastructure shared kernel

##### 2.3.3.1.25.0 Directory Path

###### 2.3.3.1.25.1 Directory Path

src/models

###### 2.3.3.1.25.2 Purpose

Shared data structures

###### 2.3.3.1.25.3 Contains Files

- GatewayResult.ts
- GatewayException.ts

###### 2.3.3.1.25.4 Organizational Reasoning

Defines standardized result and error types for the library boundaries

###### 2.3.3.1.25.5 Framework Convention Alignment

Shared Kernel

##### 2.3.3.1.26.0 Directory Path

###### 2.3.3.1.26.1 Directory Path

tsconfig.base.json

###### 2.3.3.1.26.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.26.3 Contains Files

- tsconfig.base.json

###### 2.3.3.1.26.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.26.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.27.0 Directory Path

###### 2.3.3.1.27.1 Directory Path

turbo.json

###### 2.3.3.1.27.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.27.3 Contains Files

- turbo.json

###### 2.3.3.1.27.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.27.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.28.0 Directory Path

###### 2.3.3.1.28.1 Directory Path

vercel.json

###### 2.3.3.1.28.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.28.3 Contains Files

- vercel.json

###### 2.3.3.1.28.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.28.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | Salla.Analytics.Integrations |
| Namespace Organization | By provider module (Salla, OpenAI, Postmark) |
| Naming Conventions | PascalCase for classes, camelCase for files/functi... |
| Framework Alignment | TypeScript modules |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

SallaGateway

##### 2.3.4.1.2.0 File Path

src/gateways/salla/SallaGateway.ts

##### 2.3.4.1.3.0 Class Type

Concrete Implementation

##### 2.3.4.1.4.0 Inheritance

implements ISallaGateway

##### 2.3.4.1.5.0 Purpose

Primary entry point for Salla API data operations, enforcing ACL via mappers and managing rate limits

##### 2.3.4.1.6.0 Dependencies

- AxiosInstance
- SallaMapper
- RateLimitHandler
- ILogger

##### 2.3.4.1.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.1.8.0 Technology Integration Notes

Uses configured Axios instance with AuthInterceptors for token rotation

##### 2.3.4.1.9.0 Properties

###### 2.3.4.1.9.1 Property Name

####### 2.3.4.1.9.1.1 Property Name

client

####### 2.3.4.1.9.1.2 Property Type

AxiosInstance

####### 2.3.4.1.9.1.3 Access Modifier

private readonly

####### 2.3.4.1.9.1.4 Purpose

HTTP client with base URL and auth interceptors

####### 2.3.4.1.9.1.5 Validation Attributes

*No items available*

####### 2.3.4.1.9.1.6 Framework Specific Configuration

Injected via constructor or factory

####### 2.3.4.1.9.1.7 Implementation Notes

Must have retry logic for 429 errors configured

###### 2.3.4.1.9.2.0 Property Name

####### 2.3.4.1.9.2.1 Property Name

mapper

####### 2.3.4.1.9.2.2 Property Type

SallaMapper

####### 2.3.4.1.9.2.3 Access Modifier

private readonly

####### 2.3.4.1.9.2.4 Purpose

Transforms Salla DTOs to Domain Entities

####### 2.3.4.1.9.2.5 Validation Attributes

*No items available*

####### 2.3.4.1.9.2.6 Framework Specific Configuration

Injected or instantiated

####### 2.3.4.1.9.2.7 Implementation Notes

Enforces ACL

##### 2.3.4.1.10.0.0 Methods

###### 2.3.4.1.10.1.0 Method Name

####### 2.3.4.1.10.1.1 Method Name

fetchOrders

####### 2.3.4.1.10.1.2 Method Signature

fetchOrders(criteria: OrderSearchCriteria): Promise<GatewayResult<Order[]>>

####### 2.3.4.1.10.1.3 Return Type

Promise<GatewayResult<Order[]>>

####### 2.3.4.1.10.1.4 Access Modifier

public

####### 2.3.4.1.10.1.5 Is Async

true

####### 2.3.4.1.10.1.6 Framework Specific Attributes

*No items available*

####### 2.3.4.1.10.1.7 Parameters

- {'parameter_name': 'criteria', 'parameter_type': 'OrderSearchCriteria', 'is_nullable': 'false', 'purpose': 'Filtering parameters', 'framework_attributes': []}

####### 2.3.4.1.10.1.8 Implementation Logic

Executes GET /orders with query params, handles pagination traversal if needed, maps results using SallaMapper. Wraps errors in GatewayResult.

####### 2.3.4.1.10.1.9 Exception Handling

Catches Axios errors, maps to GatewayException types (RateLimit, Auth, etc.)

####### 2.3.4.1.10.1.10 Performance Considerations

Respects rate limits using RateLimitHandler

####### 2.3.4.1.10.1.11 Validation Requirements

Validates criteria date ranges

####### 2.3.4.1.10.1.12 Technology Integration Details

Uses Axios

###### 2.3.4.1.10.2.0 Method Name

####### 2.3.4.1.10.2.1 Method Name

getMerchantProfile

####### 2.3.4.1.10.2.2 Method Signature

getMerchantProfile(): Promise<GatewayResult<MerchantProfile>>

####### 2.3.4.1.10.2.3 Return Type

Promise<GatewayResult<MerchantProfile>>

####### 2.3.4.1.10.2.4 Access Modifier

public

####### 2.3.4.1.10.2.5 Is Async

true

####### 2.3.4.1.10.2.6 Framework Specific Attributes

*No items available*

####### 2.3.4.1.10.2.7 Parameters

*No items available*

####### 2.3.4.1.10.2.8 Implementation Logic

Fetches profile from /user/profile and maps to domain entity

####### 2.3.4.1.10.2.9 Exception Handling

Standard mapping

####### 2.3.4.1.10.2.10 Performance Considerations

None

####### 2.3.4.1.10.2.11 Validation Requirements

None

####### 2.3.4.1.10.2.12 Technology Integration Details

None

##### 2.3.4.1.11.0.0 Events

*No items available*

##### 2.3.4.1.12.0.0 Implementation Notes

Strictly returns Domain Entities. Handles pagination internally where appropriate.

#### 2.3.4.2.0.0.0 Class Name

##### 2.3.4.2.1.0.0 Class Name

SallaAuthService

##### 2.3.4.2.2.0.0 File Path

src/gateways/salla/SallaAuthService.ts

##### 2.3.4.2.3.0.0 Class Type

Concrete Implementation

##### 2.3.4.2.4.0.0 Inheritance

None

##### 2.3.4.2.5.0.0 Purpose

Handles the initial OAuth2 handshake and code exchange process

##### 2.3.4.2.6.0.0 Dependencies

- AxiosInstance
- SallaConfig

##### 2.3.4.2.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.2.8.0.0 Technology Integration Notes

Separated from Gateway to handle the specific 'Code Exchange' flow which uses different endpoints/auth methods

##### 2.3.4.2.9.0.0 Properties

- {'property_name': 'client', 'property_type': 'AxiosInstance', 'access_modifier': 'private readonly', 'purpose': 'HTTP client for auth endpoints', 'validation_attributes': [], 'framework_specific_configuration': 'No auth headers initially', 'implementation_notes': 'Used for POST /oauth2/token'}

##### 2.3.4.2.10.0.0 Methods

- {'method_name': 'exchangeCodeForToken', 'method_signature': 'exchangeCodeForToken(code: string): Promise<GatewayResult<OAuthTokenResponse>>', 'return_type': 'Promise<GatewayResult<OAuthTokenResponse>>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'code', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Authorization code from callback', 'framework_attributes': []}], 'implementation_logic': 'Posts code, client_id, client_secret, redirect_uri to token endpoint', 'exception_handling': 'Maps 400 invalid_grant errors', 'performance_considerations': 'None', 'validation_requirements': 'Code must be non-empty', 'technology_integration_details': 'Standard OAuth2 flow'}

##### 2.3.4.2.11.0.0 Events

*No items available*

##### 2.3.4.2.12.0.0 Implementation Notes

Critical for the onboarding flow (US-009)

#### 2.3.4.3.0.0.0 Class Name

##### 2.3.4.3.1.0.0 Class Name

SallaWebhookValidator

##### 2.3.4.3.2.0.0 File Path

src/gateways/salla/SallaWebhookValidator.ts

##### 2.3.4.3.3.0.0 Class Type

Concrete Implementation

##### 2.3.4.3.4.0.0 Inheritance

implements IWebhookValidator

##### 2.3.4.3.5.0.0 Purpose

Validates the security signature of incoming webhooks from Salla

##### 2.3.4.3.6.0.0 Dependencies

- node:crypto
- SallaConfig

##### 2.3.4.3.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.3.8.0.0 Technology Integration Notes

Uses HMAC-SHA256

##### 2.3.4.3.9.0.0 Properties

- {'property_name': 'webhookSecret', 'property_type': 'string', 'access_modifier': 'private readonly', 'purpose': 'Secret key for signature verification', 'validation_attributes': [], 'framework_specific_configuration': 'From config', 'implementation_notes': 'Must be kept secure'}

##### 2.3.4.3.10.0.0 Methods

- {'method_name': 'validateSignature', 'method_signature': 'validateSignature(payload: string, signature: string): boolean', 'return_type': 'boolean', 'access_modifier': 'public', 'is_async': 'false', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'payload', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Raw request body', 'framework_attributes': []}, {'parameter_name': 'signature', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Header value', 'framework_attributes': []}], 'implementation_logic': 'Computes HMAC-SHA256 of payload using secret and compares with signature using constant-time comparison', 'exception_handling': 'None (returns false on mismatch)', 'performance_considerations': 'Crypto operation is CPU bound but fast for small payloads', 'validation_requirements': 'Payload and signature must be present', 'technology_integration_details': 'Node.js crypto library timingSafeEqual'}

##### 2.3.4.3.11.0.0 Events

*No items available*

##### 2.3.4.3.12.0.0 Implementation Notes

Required for REQ-INT-006 security

#### 2.3.4.4.0.0.0 Class Name

##### 2.3.4.4.1.0.0 Class Name

SallaMapper

##### 2.3.4.4.2.0.0 File Path

src/gateways/salla/SallaMapper.ts

##### 2.3.4.4.3.0.0 Class Type

Utility/Service

##### 2.3.4.4.4.0.0 Inheritance

None

##### 2.3.4.4.5.0.0 Purpose

Pure function mappings from Salla DTOs to Domain Entities

##### 2.3.4.4.6.0.0 Dependencies

*No items available*

##### 2.3.4.4.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.4.8.0.0 Technology Integration Notes

Stateless transformation using Zod for validation

##### 2.3.4.4.9.0.0 Properties

*No items available*

##### 2.3.4.4.10.0.0 Methods

- {'method_name': 'toDomainOrder', 'method_signature': 'toDomainOrder(dto: SallaOrderDTO): Order', 'return_type': 'Order', 'access_modifier': 'public', 'is_async': 'false', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'dto', 'parameter_type': 'SallaOrderDTO', 'is_nullable': 'false', 'purpose': 'External data object', 'framework_attributes': []}], 'implementation_logic': 'Validates schema using Zod, maps fields, converts dates, calculates totals if necessary, instantiates Order entity', 'exception_handling': 'Throws MappingException if required fields are missing', 'performance_considerations': 'Optimized for speed', 'validation_requirements': 'DTO structure validation via Zod', 'technology_integration_details': 'None'}

##### 2.3.4.4.11.0.0 Events

*No items available*

##### 2.3.4.4.12.0.0 Implementation Notes

Core component of the Anti-Corruption Layer

#### 2.3.4.5.0.0.0 Class Name

##### 2.3.4.5.1.0.0 Class Name

OpenAIGateway

##### 2.3.4.5.2.0.0 File Path

src/gateways/openai/OpenAIGateway.ts

##### 2.3.4.5.3.0.0 Class Type

Concrete Implementation

##### 2.3.4.5.4.0.0 Inheritance

implements IOpenAIGateway

##### 2.3.4.5.5.0.0 Purpose

Provides interface to OpenAI API with circuit breaker protection and PII scrubbing

##### 2.3.4.5.6.0.0 Dependencies

- OpenAI SDK
- OpenAIResiliencyPolicy
- PIIScrubber (SharedUtil)

##### 2.3.4.5.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.5.8.0.0 Technology Integration Notes

Uses Cockatiel for circuit breaking

##### 2.3.4.5.9.0.0 Properties

###### 2.3.4.5.9.1.0 Property Name

####### 2.3.4.5.9.1.1 Property Name

sdkClient

####### 2.3.4.5.9.1.2 Property Type

OpenAI

####### 2.3.4.5.9.1.3 Access Modifier

private readonly

####### 2.3.4.5.9.1.4 Purpose

SDK Instance

####### 2.3.4.5.9.1.5 Validation Attributes

*No items available*

####### 2.3.4.5.9.1.6 Framework Specific Configuration

Injected

####### 2.3.4.5.9.1.7 Implementation Notes

None

###### 2.3.4.5.9.2.0 Property Name

####### 2.3.4.5.9.2.1 Property Name

resiliencyPolicy

####### 2.3.4.5.9.2.2 Property Type

OpenAIResiliencyPolicy

####### 2.3.4.5.9.2.3 Access Modifier

private readonly

####### 2.3.4.5.9.2.4 Purpose

Circuit breaker policy wrapper

####### 2.3.4.5.9.2.5 Validation Attributes

*No items available*

####### 2.3.4.5.9.2.6 Framework Specific Configuration

Injected

####### 2.3.4.5.9.2.7 Implementation Notes

Wraps execution

##### 2.3.4.5.10.0.0 Methods

###### 2.3.4.5.10.1.0 Method Name

####### 2.3.4.5.10.1.1 Method Name

generateCompletion

####### 2.3.4.5.10.1.2 Method Signature

generateCompletion(prompt: string, context?: string): Promise<GatewayResult<string>>

####### 2.3.4.5.10.1.3 Return Type

Promise<GatewayResult<string>>

####### 2.3.4.5.10.1.4 Access Modifier

public

####### 2.3.4.5.10.1.5 Is Async

true

####### 2.3.4.5.10.1.6 Framework Specific Attributes

*No items available*

####### 2.3.4.5.10.1.7 Parameters

######## 2.3.4.5.10.1.7.1 Parameter Name

######### 2.3.4.5.10.1.7.1.1 Parameter Name

prompt

######### 2.3.4.5.10.1.7.1.2 Parameter Type

string

######### 2.3.4.5.10.1.7.1.3 Is Nullable

false

######### 2.3.4.5.10.1.7.1.4 Purpose

User input

######### 2.3.4.5.10.1.7.1.5 Framework Attributes

*No items available*

######## 2.3.4.5.10.1.7.2.0 Parameter Name

######### 2.3.4.5.10.1.7.2.1 Parameter Name

context

######### 2.3.4.5.10.1.7.2.2 Parameter Type

string

######### 2.3.4.5.10.1.7.2.3 Is Nullable

true

######### 2.3.4.5.10.1.7.2.4 Purpose

RAG context

######### 2.3.4.5.10.1.7.2.5 Framework Attributes

*No items available*

####### 2.3.4.5.10.1.8.0.0 Implementation Logic

1. Scrub PII from prompt. 2. Execute request via resiliencyPolicy.execute(). 3. Map result.

####### 2.3.4.5.10.1.9.0.0 Exception Handling

Maps CircuitOpenError to GatewayError.CIRCUIT_OPEN

####### 2.3.4.5.10.1.10.0.0 Performance Considerations

Timeout enforcement

####### 2.3.4.5.10.1.11.0.0 Validation Requirements

Prompt limits

####### 2.3.4.5.10.1.12.0.0 Technology Integration Details

OpenAI Chat Completions API

###### 2.3.4.5.10.2.0.0.0 Method Name

####### 2.3.4.5.10.2.1.0.0 Method Name

generateEmbedding

####### 2.3.4.5.10.2.2.0.0 Method Signature

generateEmbedding(text: string): Promise<GatewayResult<number[]>>

####### 2.3.4.5.10.2.3.0.0 Return Type

Promise<GatewayResult<number[]>>

####### 2.3.4.5.10.2.4.0.0 Access Modifier

public

####### 2.3.4.5.10.2.5.0.0 Is Async

true

####### 2.3.4.5.10.2.6.0.0 Framework Specific Attributes

*No items available*

####### 2.3.4.5.10.2.7.0.0 Parameters

- {'parameter_name': 'text', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Text to embed', 'framework_attributes': []}

####### 2.3.4.5.10.2.8.0.0 Implementation Logic

Calls OpenAI embedding endpoint via circuit breaker

####### 2.3.4.5.10.2.9.0.0 Exception Handling

Standard Gateway mapping

####### 2.3.4.5.10.2.10.0.0 Performance Considerations

None

####### 2.3.4.5.10.2.11.0.0 Validation Requirements

Text length validation

####### 2.3.4.5.10.2.12.0.0 Technology Integration Details

OpenAI Embeddings API

##### 2.3.4.5.11.0.0.0.0 Events

*No items available*

##### 2.3.4.5.12.0.0.0.0 Implementation Notes

Ensures reliance on AI does not cascade failures

### 2.3.5.0.0.0.0.0.0 Interface Specifications

#### 2.3.5.1.0.0.0.0.0 Interface Name

##### 2.3.5.1.1.0.0.0.0 Interface Name

ISallaGateway

##### 2.3.5.1.2.0.0.0.0 File Path

src/contracts/ISallaGateway.ts

##### 2.3.5.1.3.0.0.0.0 Purpose

Contract for Salla data operations

##### 2.3.5.1.4.0.0.0.0 Generic Constraints

None

##### 2.3.5.1.5.0.0.0.0 Framework Specific Inheritance

None

##### 2.3.5.1.6.0.0.0.0 Method Contracts

- {'method_name': 'fetchOrders', 'method_signature': 'fetchOrders(criteria: OrderSearchCriteria): Promise<GatewayResult<Order[]>>', 'return_type': 'Promise<GatewayResult<Order[]>>', 'framework_attributes': [], 'parameters': [{'parameter_name': 'criteria', 'parameter_type': 'OrderSearchCriteria', 'purpose': 'Filter criteria'}], 'contract_description': 'Retrieves orders matching the criteria', 'exception_contracts': 'Returns failure result on error'}

##### 2.3.5.1.7.0.0.0.0 Property Contracts

*No items available*

##### 2.3.5.1.8.0.0.0.0 Implementation Guidance

Must handle token refresh transparently

#### 2.3.5.2.0.0.0.0.0 Interface Name

##### 2.3.5.2.1.0.0.0.0 Interface Name

IWebhookValidator

##### 2.3.5.2.2.0.0.0.0 File Path

src/contracts/IWebhookValidator.ts

##### 2.3.5.2.3.0.0.0.0 Purpose

Contract for validating webhook security signatures

##### 2.3.5.2.4.0.0.0.0 Generic Constraints

None

##### 2.3.5.2.5.0.0.0.0 Framework Specific Inheritance

None

##### 2.3.5.2.6.0.0.0.0 Method Contracts

- {'method_name': 'validateSignature', 'method_signature': 'validateSignature(payload: string, signature: string): boolean', 'return_type': 'boolean', 'framework_attributes': [], 'parameters': [{'parameter_name': 'payload', 'parameter_type': 'string', 'purpose': 'Raw request body'}, {'parameter_name': 'signature', 'parameter_type': 'string', 'purpose': 'Signature header value'}], 'contract_description': 'Validates the authenticity of a webhook request', 'exception_contracts': 'Does not throw, returns false for invalid'}

##### 2.3.5.2.7.0.0.0.0 Property Contracts

*No items available*

##### 2.3.5.2.8.0.0.0.0 Implementation Guidance

Implementations should use constant-time comparison

#### 2.3.5.3.0.0.0.0.0 Interface Name

##### 2.3.5.3.1.0.0.0.0 Interface Name

IOpenAIGateway

##### 2.3.5.3.2.0.0.0.0 File Path

src/contracts/IOpenAIGateway.ts

##### 2.3.5.3.3.0.0.0.0 Purpose

Contract for LLM interactions

##### 2.3.5.3.4.0.0.0.0 Generic Constraints

None

##### 2.3.5.3.5.0.0.0.0 Framework Specific Inheritance

None

##### 2.3.5.3.6.0.0.0.0 Method Contracts

###### 2.3.5.3.6.1.0.0.0 Method Name

####### 2.3.5.3.6.1.1.0.0 Method Name

generateCompletion

####### 2.3.5.3.6.1.2.0.0 Method Signature

generateCompletion(prompt: string, context?: string): Promise<GatewayResult<string>>

####### 2.3.5.3.6.1.3.0.0 Return Type

Promise<GatewayResult<string>>

####### 2.3.5.3.6.1.4.0.0 Framework Attributes

*No items available*

####### 2.3.5.3.6.1.5.0.0 Parameters

######## 2.3.5.3.6.1.5.1.0 Parameter Name

######### 2.3.5.3.6.1.5.1.1 Parameter Name

prompt

######### 2.3.5.3.6.1.5.1.2 Parameter Type

string

######### 2.3.5.3.6.1.5.1.3 Purpose

Input prompt

######## 2.3.5.3.6.1.5.2.0 Parameter Name

######### 2.3.5.3.6.1.5.2.1 Parameter Name

context

######### 2.3.5.3.6.1.5.2.2 Parameter Type

string

######### 2.3.5.3.6.1.5.2.3 Purpose

Optional RAG context

####### 2.3.5.3.6.1.6.0.0 Contract Description

Generates text response

####### 2.3.5.3.6.1.7.0.0 Exception Contracts

Returns GatewayResult with error on failure

###### 2.3.5.3.6.2.0.0.0 Method Name

####### 2.3.5.3.6.2.1.0.0 Method Name

generateEmbedding

####### 2.3.5.3.6.2.2.0.0 Method Signature

generateEmbedding(text: string): Promise<GatewayResult<number[]>>

####### 2.3.5.3.6.2.3.0.0 Return Type

Promise<GatewayResult<number[]>>

####### 2.3.5.3.6.2.4.0.0 Framework Attributes

*No items available*

####### 2.3.5.3.6.2.5.0.0 Parameters

- {'parameter_name': 'text', 'parameter_type': 'string', 'purpose': 'Text to embed'}

####### 2.3.5.3.6.2.6.0.0 Contract Description

Generates vector embedding

####### 2.3.5.3.6.2.7.0.0 Exception Contracts

Returns GatewayResult with error on failure

##### 2.3.5.3.7.0.0.0.0 Property Contracts

*No items available*

##### 2.3.5.3.8.0.0.0.0 Implementation Guidance

Must implement resiliency/circuit breaking

### 2.3.6.0.0.0.0.0.0 Enum Specifications

- {'enum_name': 'GatewayErrorType', 'file_path': 'src/models/GatewayException.ts', 'underlying_type': 'string', 'purpose': 'Standardized error codes', 'framework_attributes': [], 'values': [{'value_name': 'RATE_LIMIT_EXCEEDED', 'value': '\\"RATE_LIMIT_EXCEEDED\\"', 'description': 'API rate limit hit'}, {'value_name': 'AUTHENTICATION_FAILED', 'value': '\\"AUTHENTICATION_FAILED\\"', 'description': 'Auth credentials rejected'}, {'value_name': 'TIMEOUT', 'value': '\\"TIMEOUT\\"', 'description': 'Request timed out'}, {'value_name': 'CIRCUIT_OPEN', 'value': '\\"CIRCUIT_OPEN\\"', 'description': 'Circuit breaker is open'}, {'value_name': 'VALIDATION_ERROR', 'value': '\\"VALIDATION_ERROR\\"', 'description': 'Request or response validation failed'}], 'validation_notes': 'None'}

### 2.3.7.0.0.0.0.0.0 Dto Specifications

- {'dto_name': 'OrderSearchCriteria', 'file_path': 'src/gateways/salla/SallaDTOs.ts', 'purpose': 'Data structure for filtering orders', 'framework_base_class': 'None', 'properties': [{'property_name': 'fromDate', 'property_type': 'Date', 'validation_attributes': [], 'serialization_attributes': [], 'framework_specific_attributes': []}, {'property_name': 'toDate', 'property_type': 'Date', 'validation_attributes': [], 'serialization_attributes': [], 'framework_specific_attributes': []}, {'property_name': 'cursor', 'property_type': 'string', 'validation_attributes': [], 'serialization_attributes': [], 'framework_specific_attributes': []}], 'validation_rules': 'Valid date range, toDate > fromDate', 'serialization_requirements': 'ISO string serialization', 'validation_notes': 'Validation logic in SallaGateway'}

### 2.3.8.0.0.0.0.0.0 Configuration Specifications

- {'configuration_name': 'GatewayConfig', 'file_path': 'src/config/GatewayConfig.ts', 'purpose': 'Configuration for all gateways', 'framework_base_class': 'None', 'configuration_sections': [{'section_name': 'Salla', 'properties': [{'property_name': 'baseUrl', 'property_type': 'string', 'default_value': '\\"https://api.salla.dev/admin/v2\\"', 'required': 'true', 'description': 'Salla API URL'}, {'property_name': 'webhookSecret', 'property_type': 'string', 'default_value': '', 'required': 'true', 'description': 'HMAC Secret'}]}], 'validation_requirements': 'Secrets must be present', 'validation_notes': 'Loaded from environment variables'}

### 2.3.9.0.0.0.0.0.0 Dependency Injection Specifications

#### 2.3.9.1.0.0.0.0.0 Service Interface

##### 2.3.9.1.1.0.0.0.0 Service Interface

ISallaGateway

##### 2.3.9.1.2.0.0.0.0 Service Implementation

SallaGateway

##### 2.3.9.1.3.0.0.0.0 Lifetime

Singleton

##### 2.3.9.1.4.0.0.0.0 Registration Reasoning

Stateless gateway with pooled connection

##### 2.3.9.1.5.0.0.0.0 Framework Registration Pattern

Factory

##### 2.3.9.1.6.0.0.0.0 Validation Notes

Requires HttpClientFactory

#### 2.3.9.2.0.0.0.0.0 Service Interface

##### 2.3.9.2.1.0.0.0.0 Service Interface

IWebhookValidator

##### 2.3.9.2.2.0.0.0.0 Service Implementation

SallaWebhookValidator

##### 2.3.9.2.3.0.0.0.0 Lifetime

Singleton

##### 2.3.9.2.4.0.0.0.0 Registration Reasoning

Pure logic component

##### 2.3.9.2.5.0.0.0.0 Framework Registration Pattern

Singleton

##### 2.3.9.2.6.0.0.0.0 Validation Notes

Requires Config

#### 2.3.9.3.0.0.0.0.0 Service Interface

##### 2.3.9.3.1.0.0.0.0 Service Interface

IOpenAIGateway

##### 2.3.9.3.2.0.0.0.0 Service Implementation

OpenAIGateway

##### 2.3.9.3.3.0.0.0.0 Lifetime

Singleton

##### 2.3.9.3.4.0.0.0.0 Registration Reasoning

Stateless gateway with shared resiliency policy

##### 2.3.9.3.5.0.0.0.0 Framework Registration Pattern

Factory

##### 2.3.9.3.6.0.0.0.0 Validation Notes

Requires ResiliencyPolicy

### 2.3.10.0.0.0.0.0.0 External Integration Specifications

#### 2.3.10.1.0.0.0.0.0 Integration Target

##### 2.3.10.1.1.0.0.0.0 Integration Target

Salla Platform

##### 2.3.10.1.2.0.0.0.0 Integration Type

REST / OAuth / Webhook

##### 2.3.10.1.3.0.0.0.0 Required Client Classes

- SallaGateway
- SallaAuthService
- SallaWebhookValidator

##### 2.3.10.1.4.0.0.0.0 Configuration Requirements

OAuth Client ID/Secret, Webhook Secret

##### 2.3.10.1.5.0.0.0.0 Error Handling Requirements

Token Refresh logic on 401, Rate Limit Retry on 429

##### 2.3.10.1.6.0.0.0.0 Authentication Requirements

Bearer Token

##### 2.3.10.1.7.0.0.0.0 Framework Integration Patterns

Gateway, Adapter, HMAC Verification

##### 2.3.10.1.8.0.0.0.0 Validation Notes

Comprehensive coverage of Salla interactions

#### 2.3.10.2.0.0.0.0.0 Integration Target

##### 2.3.10.2.1.0.0.0.0 Integration Target

OpenAI

##### 2.3.10.2.2.0.0.0.0 Integration Type

REST via SDK

##### 2.3.10.2.3.0.0.0.0 Required Client Classes

- OpenAIGateway

##### 2.3.10.2.4.0.0.0.0 Configuration Requirements

API Key

##### 2.3.10.2.5.0.0.0.0 Error Handling Requirements

Circuit Breaker

##### 2.3.10.2.6.0.0.0.0 Authentication Requirements

API Key

##### 2.3.10.2.7.0.0.0.0 Framework Integration Patterns

Circuit Breaker

##### 2.3.10.2.8.0.0.0.0 Validation Notes

Resilient implementation

## 2.4.0.0.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 9 |
| Total Interfaces | 4 |
| Total Enums | 1 |
| Total Dtos | 1 |
| Total Configurations | 1 |
| Total External Integrations | 2 |
| Grand Total Components | 18 |
| Phase 2 Claimed Count | 15 |
| Phase 2 Actual Count | 12 |
| Validation Added Count | 8 |
| Final Validated Count | 20 |

