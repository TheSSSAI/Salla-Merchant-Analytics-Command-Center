# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-LIB-SDK-001 |
| Extraction Timestamp | 2025-01-26T15:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | Production-Ready Specification |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-INTG-006

#### 1.2.1.2 Requirement Text

The system shall provide an AI Assistant that allows users to query their business data using natural language questions.

#### 1.2.1.3 Validation Criteria

- Gateway handles OpenAI API communication securely.
- Resilience patterns prevent system failure during AI API outages.

#### 1.2.1.4 Implementation Implications

- Implement OpenAIGateway with Circuit Breaker pattern.
- Ensure PII scrubbing is applied before request transmission.

#### 1.2.1.5 Extraction Reasoning

Gateway encapsulates the external AI service dependency.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-INTG-005

#### 1.2.2.2 Requirement Text

The system shall provide a secure workflow for users to reset their forgotten password via a time-sensitive link sent to their registered email address.

#### 1.2.2.3 Validation Criteria

- Email gateway reliably delivers transactional emails.
- Provider abstraction allows for future vendor switching.

#### 1.2.2.4 Implementation Implications

- Implement PostmarkGateway with strong typing for templates.

#### 1.2.2.5 Extraction Reasoning

Gateway handles the external Email Service Provider (ESP) dependency.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-DATA-002

#### 1.2.3.2 Requirement Text

The system shall implement a Change Data Capture (CDC) based data pipeline.

#### 1.2.3.3 Validation Criteria

- SallaGateway supports high-volume historical data fetching.
- Rate limits are handled gracefully to prevent sync failures.

#### 1.2.3.4 Implementation Implications

- Implement robust rate limiting and retry logic in SallaGateway.
- Expose pagination handling for bulk data retrieval.

#### 1.2.3.5 Extraction Reasoning

Gateway serves as the data source adapter for the Data Pipeline Service.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

REQ-FUNC-021

#### 1.2.4.2 Requirement Text

The system shall provide a mechanism for merchants to authenticate their sending domain using SPF and DKIM records.

#### 1.2.4.3 Validation Criteria

- Gateway exposes domain verification endpoints from the ESP.

#### 1.2.4.4 Implementation Implications

- Add methods to IEmailGateway to manage domain DNS records via Postmark API.

#### 1.2.4.5 Extraction Reasoning

Gateway must expose configuration APIs of the external provider.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

SallaGateway

#### 1.3.1.2 Component Specification

Anti-Corruption Layer adapter for Salla Platform API interaction, handling authentication, rate limiting, and DTO mapping.

#### 1.3.1.3 Implementation Requirements

- Implement OAuth2 token rotation transparently.
- Handle 429 Rate Limit responses with exponential backoff.
- Map Salla JSON to internal Domain Entities using Zod schemas.

#### 1.3.1.4 Architectural Context

Infrastructure Layer - Data Source Adapter

#### 1.3.1.5 Extraction Reasoning

Critical path for data ingestion and synchronization.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

OpenAIGateway

#### 1.3.2.2 Component Specification

Client wrapper for OpenAI API interactions, enforcing circuit breaking and security policies.

#### 1.3.2.3 Implementation Requirements

- Wrap calls in Cockatiel circuit breaker.
- Implement interceptor for PII redaction.
- Expose methods for both Chat Completion and Embeddings.

#### 1.3.2.4 Architectural Context

Infrastructure Layer - AI Service Adapter

#### 1.3.2.5 Extraction Reasoning

Enables AI features while isolating the application from vendor-specific API details.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

SallaWebhookValidator

#### 1.3.3.2 Component Specification

Security component responsible for verifying the cryptographic signature of incoming Salla webhooks.

#### 1.3.3.3 Implementation Requirements

- Verify HMAC-SHA256 signature from headers.
- Use constant-time comparison to prevent timing attacks.

#### 1.3.3.4 Architectural Context

Infrastructure Layer - Security Adapter

#### 1.3.3.5 Extraction Reasoning

Mandatory security control for data ingestion endpoints.

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Infrastructure Layer', 'layer_responsibilities': 'Encapsulate external system communications, adapt external data models to internal domain models (ACL), and implement resilience patterns.', 'layer_constraints': ['Must not contain core business rules.', 'Must be stateless.', 'Must catch and wrap all external exceptions into typed GatewayExceptions.'], 'implementation_patterns': ['Gateway Pattern', 'Anti-Corruption Layer', 'Circuit Breaker'], 'extraction_reasoning': "Defined as the repository's primary architectural role."}

## 1.5.0.0 Dependency Interfaces

- {'interface_name': 'Domain Types', 'source_repository': 'REPO-LIB-CORE-001', 'method_contracts': [], 'integration_pattern': 'Shared Library Import', 'communication_protocol': 'In-Process Module Resolution', 'extraction_reasoning': 'Gateways must map external responses to these shared internal types.'}

## 1.6.0.0 Exposed Interfaces

### 1.6.1.0 Interface Name

#### 1.6.1.1 Interface Name

ISallaGateway

#### 1.6.1.2 Consumer Repositories

- REPO-SVC-DATA-001

#### 1.6.1.3 Method Contracts

##### 1.6.1.3.1 Method Name

###### 1.6.1.3.1.1 Method Name

fetchOrders

###### 1.6.1.3.1.2 Method Signature

fetchOrders(criteria: OrderSearchCriteria): Promise<GatewayResult<Order[]>>

###### 1.6.1.3.1.3 Method Purpose

Retrieves a paginated list of orders from Salla based on filter criteria.

###### 1.6.1.3.1.4 Implementation Requirements

Must handle pagination internally or expose cursor mechanism. Must respect rate limits.

##### 1.6.1.3.2.0 Method Name

###### 1.6.1.3.2.1 Method Name

getMerchantProfile

###### 1.6.1.3.2.2 Method Signature

getMerchantProfile(): Promise<GatewayResult<MerchantProfile>>

###### 1.6.1.3.2.3 Method Purpose

Fetches current merchant details for onboarding validation.

###### 1.6.1.3.2.4 Implementation Requirements

Used during the initial connection flow.

#### 1.6.1.4.0.0 Service Level Requirements

- Automatic retry on 429 errors.
- Strict typing of response objects.

#### 1.6.1.5.0.0 Implementation Constraints

- Must use Zod for runtime validation of external payloads.

#### 1.6.1.6.0.0 Extraction Reasoning

Primary interface for the Data Pipeline Service to ingest data.

### 1.6.2.0.0.0 Interface Name

#### 1.6.2.1.0.0 Interface Name

IWebhookValidator

#### 1.6.2.2.0.0 Consumer Repositories

- REPO-SVC-DATA-001

#### 1.6.2.3.0.0 Method Contracts

- {'method_name': 'validateSignature', 'method_signature': 'validateSignature(payload: string, signature: string): boolean', 'method_purpose': 'Verifies that an incoming webhook request originated from Salla.', 'implementation_requirements': 'Pure function using crypto library.'}

#### 1.6.2.4.0.0 Service Level Requirements

- Execution time < 1ms.

#### 1.6.2.5.0.0 Implementation Constraints

- No external network calls allowed in validation logic.

#### 1.6.2.6.0.0 Extraction Reasoning

Required by Webhook Handler in Data Service.

### 1.6.3.0.0.0 Interface Name

#### 1.6.3.1.0.0 Interface Name

IOpenAIGateway

#### 1.6.3.2.0.0 Consumer Repositories

- REPO-SVC-AI-001
- REPO-APP-CORE-001

#### 1.6.3.3.0.0 Method Contracts

##### 1.6.3.3.1.0 Method Name

###### 1.6.3.3.1.1 Method Name

generateCompletion

###### 1.6.3.3.1.2 Method Signature

generateCompletion(prompt: string, context?: string): Promise<GatewayResult<string>>

###### 1.6.3.3.1.3 Method Purpose

Sends a prompt to the LLM and returns the generated text response.

###### 1.6.3.3.1.4 Implementation Requirements

Must include circuit breaker logic.

##### 1.6.3.3.2.0 Method Name

###### 1.6.3.3.2.1 Method Name

generateEmbedding

###### 1.6.3.3.2.2 Method Signature

generateEmbedding(text: string): Promise<GatewayResult<number[]>>

###### 1.6.3.3.2.3 Method Purpose

Converts text into a vector embedding for RAG operations.

###### 1.6.3.3.2.4 Implementation Requirements

Optimized for batch processing if possible.

#### 1.6.3.4.0.0 Service Level Requirements

- Fail-fast behavior during provider outages.

#### 1.6.3.5.0.0 Implementation Constraints

- Strict PII scrubbing before transmission.

#### 1.6.3.6.0.0 Extraction Reasoning

Core dependency for AI Assistant Service.

### 1.6.4.0.0.0 Interface Name

#### 1.6.4.1.0.0 Interface Name

IEmailGateway

#### 1.6.4.2.0.0 Consumer Repositories

- REPO-APP-CORE-001

#### 1.6.4.3.0.0 Method Contracts

##### 1.6.4.3.1.0 Method Name

###### 1.6.4.3.1.1 Method Name

sendTransactionalEmail

###### 1.6.4.3.1.2 Method Signature

sendTransactionalEmail(to: string, templateAlias: string, model: Record<string, any>): Promise<void>

###### 1.6.4.3.1.3 Method Purpose

Sends an email using a predefined template (e.g., password reset, invite).

###### 1.6.4.3.1.4 Implementation Requirements

Abstraction over Postmark sending API.

##### 1.6.4.3.2.0 Method Name

###### 1.6.4.3.2.1 Method Name

verifyDomain

###### 1.6.4.3.2.2 Method Signature

verifyDomain(domain: string): Promise<DomainVerificationStatus>

###### 1.6.4.3.2.3 Method Purpose

Checks DNS records for a merchant's custom sending domain.

###### 1.6.4.3.2.4 Implementation Requirements

Queries ESP API for DKIM/SPF status.

#### 1.6.4.4.0.0 Service Level Requirements

- High availability.

#### 1.6.4.5.0.0 Implementation Constraints

- Must not block the calling thread.

#### 1.6.4.6.0.0 Extraction Reasoning

Required for notifications and cart recovery features.

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

Node.js 20.x, TypeScript 5.4

### 1.7.2.0.0.0 Integration Technologies

- Axios (HTTP Client)
- Zod (Validation)
- Cockatiel (Resilience)
- OpenAI SDK
- Postmark.js

### 1.7.3.0.0.0 Performance Constraints

Gateways must add negligible overhead (<10ms) to external API latency. Rate limit handling must be proactive where possible.

### 1.7.4.0.0.0 Security Requirements

API Keys and Secrets injected via environment variables. HMAC validation for webhooks. PII scrubbing for AI calls.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | 100% - All external integration points (Salla, Ope... |
| Cross Reference Validation | Interfaces aligned with consumer requirements in R... |
| Implementation Readiness Assessment | High - Patterns, libraries, and method signatures ... |
| Quality Assurance Confirmation | Resilience patterns (Circuit Breaker, Rate Limitin... |

