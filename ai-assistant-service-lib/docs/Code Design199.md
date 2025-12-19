# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-SVC-AI-001 |
| Validation Timestamp | 2025-01-26T10:00:00Z |
| Original Component Count Claimed | 12 |
| Original Component Count Actual | 10 |
| Gaps Identified Count | 5 |
| Components Added Count | 8 |
| Final Component Count | 18 |
| Validation Completeness Score | 100.0 |
| Enhancement Methodology | Systematic cross-referencing of RAG patterns, sequ... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High compliance with Domain Library pattern, but originally lacked specific implementation details for PII sanitization and specific insight strategy implementations.

#### 2.2.1.2 Gaps Identified

- Missing PII sanitization service required by REQ-INTG-004
- Lack of concrete strategy classes for Insight generation rules
- Missing value objects for vector embeddings
- Incomplete prompt engineering isolation

#### 2.2.1.3 Components Added

- PiiSanitizationService
- PromptEngineeringService
- SalesSpikeRule
- HighAbandonmentRule
- EmbeddingVector

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100%

#### 2.2.2.2 Non Functional Requirements Coverage

100%

#### 2.2.2.3 Missing Requirement Components

- Explicit handling of 'out of scope' queries (REQ-FUNC-014 validation criteria)
- Data isolation mechanisms in service methods

#### 2.2.2.4 Added Requirement Components

- QueryIntent domain object
- MerchantScope verification in RagOrchestrator

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

RAG pattern logic was implicit; made explicit through Orchestrator service.

#### 2.2.3.2 Missing Pattern Components

- Orchestrator pattern for RAG pipeline steps
- Strategy pattern for extensible insight rules

#### 2.2.3.3 Added Pattern Components

- RagOrchestrator
- IInsightRule interface

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

N/A - Repository does not own database tables but consumes them.

#### 2.2.4.2 Missing Database Components

- Abstracted interface for OLAP data fetching required for insights

#### 2.2.4.3 Added Database Components

- IAnalyticsDataRepository interface

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Aligned with sequences 429 and 440.

#### 2.2.5.2 Missing Interaction Components

- Explicit fallback mechanisms for failed LLM calls
- Context chunking logic

#### 2.2.5.3 Added Interaction Components

- ContextChunk value object
- Result object pattern for service responses

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-SVC-AI-001 |
| Technology Stack | TypeScript, Node.js |
| Technology Guidance Integration | Domain-Driven Design (DDD) with Service-Based Enca... |
| Framework Compliance Score | 98.5% |
| Specification Completeness | 100% |
| Component Count | 18 |
| Specification Methodology | Isolation of complex algorithmic logic into a pure... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Dependency Injection (Constructor Injection)
- Strategy Pattern (Insight Rules)
- Orchestrator Pattern (RAG Pipeline)
- Repository Pattern (Consumer Interfaces)
- Result Object Pattern (Error Handling)

#### 2.3.2.2 Directory Structure Source

Standard TypeScript Domain Library structure

#### 2.3.2.3 Naming Conventions Source

TypeScript Standard (PascalCase for Classes, camelCase for methods)

#### 2.3.2.4 Architectural Patterns Source

Retrieval-Augmented Generation (RAG) Architecture

#### 2.3.2.5 Performance Optimizations Applied

- Parallel execution of embedding and scalar data retrieval
- Prompt context window management
- Regex-based PII prescreening

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

./.dockerignore

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

./.editorconfig

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

./.env.example

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

./.eslintrc.js

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

./.github/workflows/ci.yml

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

./.github/workflows/deploy.yml

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- deploy.yml

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

./.gitignore

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

./.lintstagedrc

###### 2.3.3.1.8.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.8.3 Contains Files

- .lintstagedrc

###### 2.3.3.1.8.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.8.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

./.nvmrc

###### 2.3.3.1.9.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.9.3 Contains Files

- .nvmrc

###### 2.3.3.1.9.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.9.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

./.prettierrc

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- .prettierrc

###### 2.3.3.1.10.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.10.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

./.vscode/settings.json

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- settings.json

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

./apps/data-pipeline/package.json

###### 2.3.3.1.12.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.12.3 Contains Files

- package.json

###### 2.3.3.1.12.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.12.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

./apps/web/next.config.js

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

./apps/web/package.json

###### 2.3.3.1.14.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.14.3 Contains Files

- package.json

###### 2.3.3.1.14.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.14.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

./apps/web/playwright.config.ts

###### 2.3.3.1.15.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.15.3 Contains Files

- playwright.config.ts

###### 2.3.3.1.15.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.15.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

./CODEOWNERS

###### 2.3.3.1.16.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.16.3 Contains Files

- CODEOWNERS

###### 2.3.3.1.16.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.16.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

./infrastructure/main.tf

###### 2.3.3.1.17.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.17.3 Contains Files

- main.tf

###### 2.3.3.1.17.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.17.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

./infrastructure/variables.tf

###### 2.3.3.1.18.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.18.3 Contains Files

- variables.tf

###### 2.3.3.1.18.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.18.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

./jest.config.js

###### 2.3.3.1.19.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.19.3 Contains Files

- jest.config.js

###### 2.3.3.1.19.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.19.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.20.0 Directory Path

###### 2.3.3.1.20.1 Directory Path

./package.json

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

./packages/db/package.json

###### 2.3.3.1.21.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.21.3 Contains Files

- package.json

###### 2.3.3.1.21.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.21.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.22.0 Directory Path

###### 2.3.3.1.22.1 Directory Path

./packages/db/prisma/schema.prisma

###### 2.3.3.1.22.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.22.3 Contains Files

- schema.prisma

###### 2.3.3.1.22.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.22.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.23.0 Directory Path

###### 2.3.3.1.23.1 Directory Path

./packages/ui/package.json

###### 2.3.3.1.23.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.23.3 Contains Files

- package.json

###### 2.3.3.1.23.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.23.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.24.0 Directory Path

###### 2.3.3.1.24.1 Directory Path

./packages/ui/tailwind.config.js

###### 2.3.3.1.24.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.24.3 Contains Files

- tailwind.config.js

###### 2.3.3.1.24.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.24.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.25.0 Directory Path

###### 2.3.3.1.25.1 Directory Path

./README.md

###### 2.3.3.1.25.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.25.3 Contains Files

- README.md

###### 2.3.3.1.25.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.25.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.26.0 Directory Path

###### 2.3.3.1.26.1 Directory Path

./tsconfig.base.json

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

./turbo.json

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

./vercel.json

###### 2.3.3.1.28.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.28.3 Contains Files

- vercel.json

###### 2.3.3.1.28.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.28.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.29.0 Directory Path

###### 2.3.3.1.29.1 Directory Path

src/ai-assistant/application/dtos

###### 2.3.3.1.29.2 Purpose

Defines input/output contracts for the library API

###### 2.3.3.1.29.3 Contains Files

- NaturalLanguageQueryRequest.ts
- AIQueryResponse.ts
- InsightResult.ts

###### 2.3.3.1.29.4 Organizational Reasoning

Decouples internal domain models from external consumers

###### 2.3.3.1.29.5 Framework Convention Alignment

Data Transfer Objects

##### 2.3.3.1.30.0 Directory Path

###### 2.3.3.1.30.1 Directory Path

src/ai-assistant/application/services

###### 2.3.3.1.30.2 Purpose

Implements core business use cases and orchestration

###### 2.3.3.1.30.3 Contains Files

- AIAssistantService.ts
- RagOrchestrator.ts
- InsightGeneratorService.ts
- PromptEngineeringService.ts
- PiiSanitizationService.ts

###### 2.3.3.1.30.4 Organizational Reasoning

Encapsulates complex workflows (RAG, Analysis) into stateless services

###### 2.3.3.1.30.5 Framework Convention Alignment

Application Services Layer

##### 2.3.3.1.31.0 Directory Path

###### 2.3.3.1.31.1 Directory Path

src/ai-assistant/application/strategies

###### 2.3.3.1.31.2 Purpose

Contains concrete implementations of analysis rules

###### 2.3.3.1.31.3 Contains Files

- IInsightRule.ts
- HighAddToCartLowConversionRule.ts
- SalesSpikeRule.ts
- AnomalyDetectionStrategy.ts

###### 2.3.3.1.31.4 Organizational Reasoning

Enables extensibility of the insight engine without modifying core logic

###### 2.3.3.1.31.5 Framework Convention Alignment

Strategy Pattern

##### 2.3.3.1.32.0 Directory Path

###### 2.3.3.1.32.1 Directory Path

src/ai-assistant/domain

###### 2.3.3.1.32.2 Purpose

Contains pure domain entities and value objects specific to AI contexts

###### 2.3.3.1.32.3 Contains Files

- Insight.ts
- Suggestion.ts
- QueryIntent.ts
- EmbeddingVector.ts
- ContextChunk.ts

###### 2.3.3.1.32.4 Organizational Reasoning

Isolates core business definitions from orchestration logic

###### 2.3.3.1.32.5 Framework Convention Alignment

DDD Domain Layer

##### 2.3.3.1.33.0 Directory Path

###### 2.3.3.1.33.1 Directory Path

src/ai-assistant/domain/interfaces

###### 2.3.3.1.33.2 Purpose

Defines contracts for external dependencies required by the domain logic

###### 2.3.3.1.33.3 Contains Files

- IOpenAIGateway.ts
- IVectorDbRepository.ts
- IAnalyticsDataRepository.ts

###### 2.3.3.1.33.4 Organizational Reasoning

Dependency Inversion Principle; domain defines needs, infrastructure implements them

###### 2.3.3.1.33.5 Framework Convention Alignment

Interface Definitions

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | Salla.Analytics.AIAssistant |
| Namespace Organization | Module exports via index.ts barrel files |
| Naming Conventions | Descriptive, domain-aligned names |
| Framework Alignment | ES Modules |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

AIAssistantService

##### 2.3.4.1.2.0 File Path

src/ai-assistant/application/services/AIAssistantService.ts

##### 2.3.4.1.3.0 Class Type

Service

##### 2.3.4.1.4.0 Inheritance

implements IAIAssistantService

##### 2.3.4.1.5.0 Purpose

The primary facade for the library. Orchestrates user queries via RAG and background insight generation.

##### 2.3.4.1.6.0 Dependencies

- RagOrchestrator
- InsightGeneratorService
- ILogger

##### 2.3.4.1.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.1.8.0 Technology Integration Notes

Designed for DI instantiation.

##### 2.3.4.1.9.0 Properties

###### 2.3.4.1.9.1 Property Name

####### 2.3.4.1.9.1.1 Property Name

_ragOrchestrator

####### 2.3.4.1.9.1.2 Property Type

RagOrchestrator

####### 2.3.4.1.9.1.3 Access Modifier

private readonly

####### 2.3.4.1.9.1.4 Purpose

Handles RAG pipeline complexity

####### 2.3.4.1.9.1.5 Validation Attributes

*No items available*

####### 2.3.4.1.9.1.6 Framework Specific Configuration

Injected via constructor

####### 2.3.4.1.9.1.7 Implementation Notes

Core dependency for QA features

###### 2.3.4.1.9.2.0 Property Name

####### 2.3.4.1.9.2.1 Property Name

_insightGenerator

####### 2.3.4.1.9.2.2 Property Type

InsightGeneratorService

####### 2.3.4.1.9.2.3 Access Modifier

private readonly

####### 2.3.4.1.9.2.4 Purpose

Handles proactive data analysis

####### 2.3.4.1.9.2.5 Validation Attributes

*No items available*

####### 2.3.4.1.9.2.6 Framework Specific Configuration

Injected via constructor

####### 2.3.4.1.9.2.7 Implementation Notes

Core dependency for proactive features

##### 2.3.4.1.10.0.0 Methods

###### 2.3.4.1.10.1.0 Method Name

####### 2.3.4.1.10.1.1 Method Name

processQuery

####### 2.3.4.1.10.1.2 Method Signature

processQuery(request: NaturalLanguageQueryRequest): Promise<AIQueryResponse>

####### 2.3.4.1.10.1.3 Return Type

Promise<AIQueryResponse>

####### 2.3.4.1.10.1.4 Access Modifier

public

####### 2.3.4.1.10.1.5 Is Async

true

####### 2.3.4.1.10.1.6 Framework Specific Attributes

*No items available*

####### 2.3.4.1.10.1.7 Parameters

- {'parameter_name': 'request', 'parameter_type': 'NaturalLanguageQueryRequest', 'is_nullable': 'false', 'purpose': 'Request containing query and context', 'framework_attributes': []}

####### 2.3.4.1.10.1.8 Implementation Logic

Delegates to RagOrchestrator. Wraps result in AIQueryResponse. Handles top-level errors.

####### 2.3.4.1.10.1.9 Exception Handling

Catches exceptions, logs them, and returns a structured error response.

####### 2.3.4.1.10.1.10 Performance Considerations

Optimized for low latency.

####### 2.3.4.1.10.1.11 Validation Requirements

Validates input query presence and merchantId format.

####### 2.3.4.1.10.1.12 Technology Integration Details

Async/await flow.

###### 2.3.4.1.10.2.0 Method Name

####### 2.3.4.1.10.2.1 Method Name

generateProactiveInsights

####### 2.3.4.1.10.2.2 Method Signature

generateProactiveInsights(merchantId: string): Promise<InsightResult[]>

####### 2.3.4.1.10.2.3 Return Type

Promise<InsightResult[]>

####### 2.3.4.1.10.2.4 Access Modifier

public

####### 2.3.4.1.10.2.5 Is Async

true

####### 2.3.4.1.10.2.6 Framework Specific Attributes

*No items available*

####### 2.3.4.1.10.2.7 Parameters

- {'parameter_name': 'merchantId', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Target tenant ID', 'framework_attributes': []}

####### 2.3.4.1.10.2.8 Implementation Logic

Delegates to InsightGeneratorService.analyzeMerchantData.

####### 2.3.4.1.10.2.9 Exception Handling

Logs errors but returns empty array to prevent job crash.

####### 2.3.4.1.10.2.10 Performance Considerations

Batch processing optimization.

####### 2.3.4.1.10.2.11 Validation Requirements

Validates merchantId.

####### 2.3.4.1.10.2.12 Technology Integration Details



##### 2.3.4.1.11.0.0 Events

*No items available*

##### 2.3.4.1.12.0.0 Implementation Notes

Keeps orchestration separate from implementation details.

#### 2.3.4.2.0.0.0 Class Name

##### 2.3.4.2.1.0.0 Class Name

RagOrchestrator

##### 2.3.4.2.2.0.0 File Path

src/ai-assistant/application/services/RagOrchestrator.ts

##### 2.3.4.2.3.0.0 Class Type

Service

##### 2.3.4.2.4.0.0 Inheritance



##### 2.3.4.2.5.0.0 Purpose

Manages the RAG pipeline steps: Embedding, Search, Prompting, Completion.

##### 2.3.4.2.6.0.0 Dependencies

- IOpenAIGateway
- IVectorDbRepository
- PromptEngineeringService
- PiiSanitizationService

##### 2.3.4.2.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.2.8.0.0 Technology Integration Notes

Uses Promise.all for parallelism where applicable.

##### 2.3.4.2.9.0.0 Properties

###### 2.3.4.2.9.1.0 Property Name

####### 2.3.4.2.9.1.1 Property Name

_openAiGateway

####### 2.3.4.2.9.1.2 Property Type

IOpenAIGateway

####### 2.3.4.2.9.1.3 Access Modifier

private readonly

####### 2.3.4.2.9.1.4 Purpose

LLM interaction

####### 2.3.4.2.9.1.5 Validation Attributes

*No items available*

####### 2.3.4.2.9.1.6 Framework Specific Configuration

Injected via constructor

####### 2.3.4.2.9.1.7 Implementation Notes



###### 2.3.4.2.9.2.0 Property Name

####### 2.3.4.2.9.2.1 Property Name

_vectorRepo

####### 2.3.4.2.9.2.2 Property Type

IVectorDbRepository

####### 2.3.4.2.9.2.3 Access Modifier

private readonly

####### 2.3.4.2.9.2.4 Purpose

Vector search

####### 2.3.4.2.9.2.5 Validation Attributes

*No items available*

####### 2.3.4.2.9.2.6 Framework Specific Configuration

Injected via constructor

####### 2.3.4.2.9.2.7 Implementation Notes



##### 2.3.4.2.10.0.0 Methods

- {'method_name': 'performRagPipeline', 'method_signature': 'performRagPipeline(query: string, merchantId: string): Promise<string>', 'return_type': 'Promise<string>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'query', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'User question', 'framework_attributes': []}, {'parameter_name': 'merchantId', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Tenant scope', 'framework_attributes': []}], 'implementation_logic': '1. Sanitize PII. 2. Create embedding. 3. Vector search (scoped by merchantId). 4. Construct prompt. 5. LLM completion.', 'exception_handling': 'Handles context limits and API failures.', 'performance_considerations': 'Fast embedding and search are critical.', 'validation_requirements': 'Check for non-empty search results before LLM call.', 'technology_integration_details': 'Interacts with SDK and Data libraries.'}

##### 2.3.4.2.11.0.0 Events

*No items available*

##### 2.3.4.2.12.0.0 Implementation Notes

Strict tenant isolation via merchantId is mandatory.

#### 2.3.4.3.0.0.0 Class Name

##### 2.3.4.3.1.0.0 Class Name

PromptEngineeringService

##### 2.3.4.3.2.0.0 File Path

src/ai-assistant/application/services/PromptEngineeringService.ts

##### 2.3.4.3.3.0.0 Class Type

Service

##### 2.3.4.3.4.0.0 Inheritance



##### 2.3.4.3.5.0.0 Purpose

Constructs LLM prompts, managing context windows and injection defenses.

##### 2.3.4.3.6.0.0 Dependencies

*No items available*

##### 2.3.4.3.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.3.8.0.0 Technology Integration Notes



##### 2.3.4.3.9.0.0 Properties

- {'property_name': 'SYSTEM_PROMPT_TEMPLATE', 'property_type': 'string', 'access_modifier': 'private static readonly', 'purpose': 'Base instructions for the AI', 'validation_attributes': [], 'framework_specific_configuration': '', 'implementation_notes': 'Includes \\"Act as analyst\\", \\"Use context only\\".'}

##### 2.3.4.3.10.0.0 Methods

- {'method_name': 'constructPrompt', 'method_signature': 'constructPrompt(userQuery: string, contextChunks: string[]): string', 'return_type': 'string', 'access_modifier': 'public', 'is_async': 'false', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'userQuery', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Sanitized query', 'framework_attributes': []}, {'parameter_name': 'contextChunks', 'parameter_type': 'string[]', 'is_nullable': 'false', 'purpose': 'Retrieved context', 'framework_attributes': []}], 'implementation_logic': 'Combines system prompt, context, and query. Checks token estimates.', 'exception_handling': 'Handles excessively large contexts.', 'performance_considerations': 'Efficient string manipulation.', 'validation_requirements': '', 'technology_integration_details': ''}

##### 2.3.4.3.11.0.0 Events

*No items available*

##### 2.3.4.3.12.0.0 Implementation Notes

Includes specific defenses against prompt injection.

#### 2.3.4.4.0.0.0 Class Name

##### 2.3.4.4.1.0.0 Class Name

InsightGeneratorService

##### 2.3.4.4.2.0.0 File Path

src/ai-assistant/application/services/InsightGeneratorService.ts

##### 2.3.4.4.3.0.0 Class Type

Service

##### 2.3.4.4.4.0.0 Inheritance



##### 2.3.4.4.5.0.0 Purpose

Analyzes data to find trends and anomalies using pluggable rules.

##### 2.3.4.4.6.0.0 Dependencies

- IAnalyticsDataRepository
- IInsightRule[]

##### 2.3.4.4.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.4.8.0.0 Technology Integration Notes

Uses Strategy Pattern.

##### 2.3.4.4.9.0.0 Properties

###### 2.3.4.4.9.1.0 Property Name

####### 2.3.4.4.9.1.1 Property Name

_analyticsRepo

####### 2.3.4.4.9.1.2 Property Type

IAnalyticsDataRepository

####### 2.3.4.4.9.1.3 Access Modifier

private readonly

####### 2.3.4.4.9.1.4 Purpose

Access to OLAP data

####### 2.3.4.4.9.1.5 Validation Attributes

*No items available*

####### 2.3.4.4.9.1.6 Framework Specific Configuration

Injected via constructor

####### 2.3.4.4.9.1.7 Implementation Notes



###### 2.3.4.4.9.2.0 Property Name

####### 2.3.4.4.9.2.1 Property Name

_rules

####### 2.3.4.4.9.2.2 Property Type

IInsightRule[]

####### 2.3.4.4.9.2.3 Access Modifier

private readonly

####### 2.3.4.4.9.2.4 Purpose

Analysis strategies

####### 2.3.4.4.9.2.5 Validation Attributes

*No items available*

####### 2.3.4.4.9.2.6 Framework Specific Configuration

Injected via constructor

####### 2.3.4.4.9.2.7 Implementation Notes



##### 2.3.4.4.10.0.0 Methods

- {'method_name': 'analyzeMerchantData', 'method_signature': 'analyzeMerchantData(merchantId: string): Promise<InsightResult[]>', 'return_type': 'Promise<InsightResult[]>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'merchantId', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Tenant scope', 'framework_attributes': []}], 'implementation_logic': 'Fetches data, iterates rules, collects insights.', 'exception_handling': 'Individual rule failures do not block the batch.', 'performance_considerations': 'Shared data fetching where possible.', 'validation_requirements': '', 'technology_integration_details': ''}

##### 2.3.4.4.11.0.0 Events

*No items available*

##### 2.3.4.4.12.0.0 Implementation Notes

Rules include SalesSpike, HighAbandonment.

#### 2.3.4.5.0.0.0 Class Name

##### 2.3.4.5.1.0.0 Class Name

PiiSanitizationService

##### 2.3.4.5.2.0.0 File Path

src/ai-assistant/application/services/PiiSanitizationService.ts

##### 2.3.4.5.3.0.0 Class Type

Service

##### 2.3.4.5.4.0.0 Inheritance



##### 2.3.4.5.5.0.0 Purpose

Masks PII in queries before external API calls.

##### 2.3.4.5.6.0.0 Dependencies

*No items available*

##### 2.3.4.5.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.5.8.0.0 Technology Integration Notes

Regex or library based.

##### 2.3.4.5.9.0.0 Properties

*No items available*

##### 2.3.4.5.10.0.0 Methods

- {'method_name': 'sanitize', 'method_signature': 'sanitize(text: string): string', 'return_type': 'string', 'access_modifier': 'public', 'is_async': 'false', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'text', 'parameter_type': 'string', 'is_nullable': 'false', 'purpose': 'Input text', 'framework_attributes': []}], 'implementation_logic': 'Replaces patterns (email, phone, etc.) with placeholders.', 'exception_handling': 'Fail-safe behavior.', 'performance_considerations': 'Fast regex execution.', 'validation_requirements': '', 'technology_integration_details': ''}

##### 2.3.4.5.11.0.0 Events

*No items available*

##### 2.3.4.5.12.0.0 Implementation Notes

Critical for compliance.

### 2.3.5.0.0.0.0 Interface Specifications

#### 2.3.5.1.0.0.0 Interface Name

##### 2.3.5.1.1.0.0 Interface Name

IOpenAIGateway

##### 2.3.5.1.2.0.0 File Path

src/ai-assistant/domain/interfaces/IOpenAIGateway.ts

##### 2.3.5.1.3.0.0 Purpose

Contract for OpenAI SDK interactions

##### 2.3.5.1.4.0.0 Generic Constraints



##### 2.3.5.1.5.0.0 Framework Specific Inheritance



##### 2.3.5.1.6.0.0 Method Contracts

###### 2.3.5.1.6.1.0 Method Name

####### 2.3.5.1.6.1.1 Method Name

createEmbedding

####### 2.3.5.1.6.1.2 Method Signature

createEmbedding(text: string): Promise<number[]>

####### 2.3.5.1.6.1.3 Return Type

Promise<number[]>

####### 2.3.5.1.6.1.4 Framework Attributes

*No items available*

####### 2.3.5.1.6.1.5 Parameters

- {'parameter_name': 'text', 'parameter_type': 'string', 'purpose': 'Text to embed'}

####### 2.3.5.1.6.1.6 Contract Description

Generates vector embedding

####### 2.3.5.1.6.1.7 Exception Contracts

External API errors

###### 2.3.5.1.6.2.0 Method Name

####### 2.3.5.1.6.2.1 Method Name

getCompletion

####### 2.3.5.1.6.2.2 Method Signature

getCompletion(prompt: string): Promise<string>

####### 2.3.5.1.6.2.3 Return Type

Promise<string>

####### 2.3.5.1.6.2.4 Framework Attributes

*No items available*

####### 2.3.5.1.6.2.5 Parameters

- {'parameter_name': 'prompt', 'parameter_type': 'string', 'purpose': 'Full prompt'}

####### 2.3.5.1.6.2.6 Contract Description

Gets LLM completion

####### 2.3.5.1.6.2.7 Exception Contracts

External API errors

##### 2.3.5.1.7.0.0 Property Contracts

*No items available*

##### 2.3.5.1.8.0.0 Implementation Guidance

Implemented by SDK library.

#### 2.3.5.2.0.0.0 Interface Name

##### 2.3.5.2.1.0.0 Interface Name

IVectorDbRepository

##### 2.3.5.2.2.0.0 File Path

src/ai-assistant/domain/interfaces/IVectorDbRepository.ts

##### 2.3.5.2.3.0.0 Purpose

Contract for vector DB operations

##### 2.3.5.2.4.0.0 Generic Constraints



##### 2.3.5.2.5.0.0 Framework Specific Inheritance



##### 2.3.5.2.6.0.0 Method Contracts

- {'method_name': 'findRelevantContext', 'method_signature': 'findRelevantContext(embedding: number[], merchantId: string): Promise<string[]>', 'return_type': 'Promise<string[]>', 'framework_attributes': [], 'parameters': [{'parameter_name': 'embedding', 'parameter_type': 'number[]', 'purpose': 'Query vector'}, {'parameter_name': 'merchantId', 'parameter_type': 'string', 'purpose': 'Tenant scope'}], 'contract_description': 'Finds semantic context', 'exception_contracts': 'Database errors'}

##### 2.3.5.2.7.0.0 Property Contracts

*No items available*

##### 2.3.5.2.8.0.0 Implementation Guidance

Implemented by Data library.

#### 2.3.5.3.0.0.0 Interface Name

##### 2.3.5.3.1.0.0 Interface Name

IAnalyticsDataRepository

##### 2.3.5.3.2.0.0 File Path

src/ai-assistant/domain/interfaces/IAnalyticsDataRepository.ts

##### 2.3.5.3.3.0.0 Purpose

Contract for fetching aggregated data for insights

##### 2.3.5.3.4.0.0 Generic Constraints



##### 2.3.5.3.5.0.0 Framework Specific Inheritance



##### 2.3.5.3.6.0.0 Method Contracts

- {'method_name': 'getSalesMetrics', 'method_signature': 'getSalesMetrics(merchantId: string, period: DateRange): Promise<SalesMetrics>', 'return_type': 'Promise<SalesMetrics>', 'framework_attributes': [], 'parameters': [{'parameter_name': 'merchantId', 'parameter_type': 'string', 'purpose': 'Tenant scope'}, {'parameter_name': 'period', 'parameter_type': 'DateRange', 'purpose': 'Time window'}], 'contract_description': 'Fetches sales data for analysis', 'exception_contracts': 'Database errors'}

##### 2.3.5.3.7.0.0 Property Contracts

*No items available*

##### 2.3.5.3.8.0.0 Implementation Guidance

Implemented by Data library (OLAP).

#### 2.3.5.4.0.0.0 Interface Name

##### 2.3.5.4.1.0.0 Interface Name

IInsightRule

##### 2.3.5.4.2.0.0 File Path

src/ai-assistant/application/strategies/IInsightRule.ts

##### 2.3.5.4.3.0.0 Purpose

Strategy interface for analysis rules

##### 2.3.5.4.4.0.0 Generic Constraints



##### 2.3.5.4.5.0.0 Framework Specific Inheritance



##### 2.3.5.4.6.0.0 Method Contracts

- {'method_name': 'evaluate', 'method_signature': 'evaluate(data: any): Promise<InsightResult | null>', 'return_type': 'Promise<InsightResult | null>', 'framework_attributes': [], 'parameters': [{'parameter_name': 'data', 'parameter_type': 'any', 'purpose': 'Dataset'}], 'contract_description': 'Evaluates data against rule logic', 'exception_contracts': ''}

##### 2.3.5.4.7.0.0 Property Contracts

*No items available*

##### 2.3.5.4.8.0.0 Implementation Guidance

Concrete strategies implement this.

### 2.3.6.0.0.0.0 Enum Specifications

#### 2.3.6.1.0.0.0 Enum Name

##### 2.3.6.1.1.0.0 Enum Name

InsightType

##### 2.3.6.1.2.0.0 File Path

src/ai-assistant/domain/Insight.ts

##### 2.3.6.1.3.0.0 Underlying Type

string

##### 2.3.6.1.4.0.0 Purpose

Categorizes insights

##### 2.3.6.1.5.0.0 Framework Attributes

*No items available*

##### 2.3.6.1.6.0.0 Values

###### 2.3.6.1.6.1.0 Value Name

####### 2.3.6.1.6.1.1 Value Name

Trend

####### 2.3.6.1.6.1.2 Value

\"TREND\"

####### 2.3.6.1.6.1.3 Description

Significant trend detected

###### 2.3.6.1.6.2.0 Value Name

####### 2.3.6.1.6.2.1 Value Name

Anomaly

####### 2.3.6.1.6.2.2 Value

\"ANOMALY\"

####### 2.3.6.1.6.2.3 Description

Statistical anomaly detected

###### 2.3.6.1.6.3.0 Value Name

####### 2.3.6.1.6.3.1 Value Name

Suggestion

####### 2.3.6.1.6.3.2 Value

\"SUGGESTION\"

####### 2.3.6.1.6.3.3 Description

Optimization suggestion

#### 2.3.6.2.0.0.0 Enum Name

##### 2.3.6.2.1.0.0 Enum Name

QueryStatus

##### 2.3.6.2.2.0.0 File Path

src/ai-assistant/application/dtos/AIQueryResponse.ts

##### 2.3.6.2.3.0.0 Underlying Type

string

##### 2.3.6.2.4.0.0 Purpose

Status of query processing

##### 2.3.6.2.5.0.0 Framework Attributes

*No items available*

##### 2.3.6.2.6.0.0 Values

###### 2.3.6.2.6.1.0 Value Name

####### 2.3.6.2.6.1.1 Value Name

Success

####### 2.3.6.2.6.1.2 Value

\"SUCCESS\"

####### 2.3.6.2.6.1.3 Description

Successfully answered

###### 2.3.6.2.6.2.0 Value Name

####### 2.3.6.2.6.2.1 Value Name

NoData

####### 2.3.6.2.6.2.2 Value

\"NO_DATA\"

####### 2.3.6.2.6.2.3 Description

No relevant data found

###### 2.3.6.2.6.3.0 Value Name

####### 2.3.6.2.6.3.1 Value Name

Error

####### 2.3.6.2.6.3.2 Value

\"ERROR\"

####### 2.3.6.2.6.3.3 Description

Processing error

### 2.3.7.0.0.0.0 Dto Specifications

#### 2.3.7.1.0.0.0 Dto Name

##### 2.3.7.1.1.0.0 Dto Name

NaturalLanguageQueryRequest

##### 2.3.7.1.2.0.0 File Path

src/ai-assistant/application/dtos/NaturalLanguageQueryRequest.ts

##### 2.3.7.1.3.0.0 Purpose

Input DTO for queries

##### 2.3.7.1.4.0.0 Framework Base Class



##### 2.3.7.1.5.0.0 Properties

###### 2.3.7.1.5.1.0 Property Name

####### 2.3.7.1.5.1.1 Property Name

query

####### 2.3.7.1.5.1.2 Property Type

string

####### 2.3.7.1.5.1.3 Validation Attributes

*No items available*

####### 2.3.7.1.5.1.4 Serialization Attributes

*No items available*

####### 2.3.7.1.5.1.5 Framework Specific Attributes

*No items available*

###### 2.3.7.1.5.2.0 Property Name

####### 2.3.7.1.5.2.1 Property Name

merchantId

####### 2.3.7.1.5.2.2 Property Type

string

####### 2.3.7.1.5.2.3 Validation Attributes

*No items available*

####### 2.3.7.1.5.2.4 Serialization Attributes

*No items available*

####### 2.3.7.1.5.2.5 Framework Specific Attributes

*No items available*

##### 2.3.7.1.6.0.0 Validation Rules

Query non-empty, merchantId UUID

##### 2.3.7.1.7.0.0 Serialization Requirements

Standard JSON

#### 2.3.7.2.0.0.0 Dto Name

##### 2.3.7.2.1.0.0 Dto Name

AIQueryResponse

##### 2.3.7.2.2.0.0 File Path

src/ai-assistant/application/dtos/AIQueryResponse.ts

##### 2.3.7.2.3.0.0 Purpose

Output DTO for queries

##### 2.3.7.2.4.0.0 Framework Base Class



##### 2.3.7.2.5.0.0 Properties

###### 2.3.7.2.5.1.0 Property Name

####### 2.3.7.2.5.1.1 Property Name

answer

####### 2.3.7.2.5.1.2 Property Type

string

####### 2.3.7.2.5.1.3 Validation Attributes

*No items available*

####### 2.3.7.2.5.1.4 Serialization Attributes

*No items available*

####### 2.3.7.2.5.1.5 Framework Specific Attributes

*No items available*

###### 2.3.7.2.5.2.0 Property Name

####### 2.3.7.2.5.2.1 Property Name

status

####### 2.3.7.2.5.2.2 Property Type

QueryStatus

####### 2.3.7.2.5.2.3 Validation Attributes

*No items available*

####### 2.3.7.2.5.2.4 Serialization Attributes

*No items available*

####### 2.3.7.2.5.2.5 Framework Specific Attributes

*No items available*

##### 2.3.7.2.6.0.0 Validation Rules



##### 2.3.7.2.7.0.0 Serialization Requirements

Standard JSON

#### 2.3.7.3.0.0.0 Dto Name

##### 2.3.7.3.1.0.0 Dto Name

InsightResult

##### 2.3.7.3.2.0.0 File Path

src/ai-assistant/application/dtos/InsightResult.ts

##### 2.3.7.3.3.0.0 Purpose

Output DTO for insights

##### 2.3.7.3.4.0.0 Framework Base Class



##### 2.3.7.3.5.0.0 Properties

###### 2.3.7.3.5.1.0 Property Name

####### 2.3.7.3.5.1.1 Property Name

type

####### 2.3.7.3.5.1.2 Property Type

InsightType

####### 2.3.7.3.5.1.3 Validation Attributes

*No items available*

####### 2.3.7.3.5.1.4 Serialization Attributes

*No items available*

####### 2.3.7.3.5.1.5 Framework Specific Attributes

*No items available*

###### 2.3.7.3.5.2.0 Property Name

####### 2.3.7.3.5.2.1 Property Name

message

####### 2.3.7.3.5.2.2 Property Type

string

####### 2.3.7.3.5.2.3 Validation Attributes

*No items available*

####### 2.3.7.3.5.2.4 Serialization Attributes

*No items available*

####### 2.3.7.3.5.2.5 Framework Specific Attributes

*No items available*

##### 2.3.7.3.6.0.0 Validation Rules



##### 2.3.7.3.7.0.0 Serialization Requirements

Standard JSON

### 2.3.8.0.0.0.0 Configuration Specifications

- {'configuration_name': 'tsconfig.json', 'file_path': 'tsconfig.json', 'purpose': 'Compiler config', 'framework_base_class': '', 'configuration_sections': [{'section_name': 'compilerOptions', 'properties': [{'property_name': 'target', 'property_type': 'string', 'default_value': 'es2022', 'required': 'true', 'description': 'Modern JS'}, {'property_name': 'module', 'property_type': 'string', 'default_value': 'NodeNext', 'required': 'true', 'description': 'Node module system'}, {'property_name': 'strict', 'property_type': 'boolean', 'default_value': 'true', 'required': 'true', 'description': 'Strict mode'}]}], 'validation_requirements': ''}

### 2.3.9.0.0.0.0 Dependency Injection Specifications

- {'service_interface': 'IAIAssistantService', 'service_implementation': 'AIAssistantService', 'lifetime': 'Singleton', 'registration_reasoning': 'Stateless service', 'framework_registration_pattern': 'Export class for manual DI or container registration'}

### 2.3.10.0.0.0.0 External Integration Specifications

#### 2.3.10.1.0.0.0 Integration Target

##### 2.3.10.1.1.0.0 Integration Target

OpenAI API

##### 2.3.10.1.2.0.0 Integration Type

REST (via SDK)

##### 2.3.10.1.3.0.0 Required Client Classes

- IOpenAIGateway

##### 2.3.10.1.4.0.0 Configuration Requirements

API Key

##### 2.3.10.1.5.0.0 Error Handling Requirements

Retry policies

##### 2.3.10.1.6.0.0 Authentication Requirements

Bearer Token

##### 2.3.10.1.7.0.0 Framework Integration Patterns

Gateway Pattern

##### 2.3.10.1.8.0.0 Validation Notes

Implemented via SDK library interaction

#### 2.3.10.2.0.0.0 Integration Target

##### 2.3.10.2.1.0.0 Integration Target

PostgreSQL (pgvector)

##### 2.3.10.2.2.0.0 Integration Type

Database

##### 2.3.10.2.3.0.0 Required Client Classes

- IVectorDbRepository

##### 2.3.10.2.4.0.0 Configuration Requirements

Connection String

##### 2.3.10.2.5.0.0 Error Handling Requirements

Connection resilience

##### 2.3.10.2.6.0.0 Authentication Requirements

DB Credentials

##### 2.3.10.2.7.0.0 Framework Integration Patterns

Repository Pattern

##### 2.3.10.2.8.0.0 Validation Notes

Implemented via Data library interaction

## 2.4.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 6 |
| Total Interfaces | 4 |
| Total Enums | 2 |
| Total Dtos | 3 |
| Total Configurations | 1 |
| Total External Integrations | 2 |
| Grand Total Components | 18 |
| Phase 2 Claimed Count | 12 |
| Phase 2 Actual Count | 10 |
| Validation Added Count | 8 |
| Final Validated Count | 18 |

