# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-SVC-AI-001 |
| Extraction Timestamp | 2023-10-27T10:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-FUNC-014

#### 1.2.1.2 Requirement Text

The system shall provide an AI Assistant that allows users to query their business data using natural language questions.

#### 1.2.1.3 Validation Criteria

- System interprets natural language questions regarding KPIs.
- System returns concise, accurate answers (text, number, or visualization).
- System responds with helper message if query is misunderstood.

#### 1.2.1.4 Implementation Implications

- Implement Natural Language Query (NLQ) parsing logic.
- Integrate with Vector DB for context retrieval.
- Ensure responses are strictly scoped to the requesting merchant.

#### 1.2.1.5 Extraction Reasoning

Primary functional requirement mapped directly to this repository's purpose.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-FUNC-015

#### 1.2.2.2 Requirement Text

The system's AI Assistant shall proactively analyze data to generate and display insight cards on the main dashboard, highlighting significant trends and anomalies.

#### 1.2.2.3 Validation Criteria

- System detects significant metric deviations.
- System detects data anomalies (e.g., spikes in abandoned carts).
- Insights are formatted for dashboard display.

#### 1.2.2.4 Implementation Implications

- Implement algorithms for trend detection and anomaly detection.
- Develop logic to generate insight objects from analytical data.

#### 1.2.2.5 Extraction Reasoning

Primary functional requirement regarding proactive insights, explicitly assigned to this library.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-INTG-004

#### 1.2.3.2 Requirement Text

The system's AI Assistant shall integrate with the OpenAI API, using a Retrieval-Augmented Generation (RAG) pattern to provide contextually aware responses based on the merchant's data.

#### 1.2.3.3 Validation Criteria

- System retrieves relevant context using vector search.
- Context and query are passed to OpenAI API.
- PII is not sent to OpenAI unless covered by DPA.

#### 1.2.3.4 Implementation Implications

- Implement the RAG orchestration pipeline.
- Handle text embedding generation requests.
- Manage prompt construction with context window constraints.

#### 1.2.3.5 Extraction Reasoning

Critical technical requirement defining the core architectural pattern (RAG) this library must implement.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

REQ-FUNC-016

#### 1.2.4.2 Requirement Text

The system's AI Assistant shall provide actionable optimization suggestions based on the analysis of predefined data patterns.

#### 1.2.4.3 Validation Criteria

- System generates suggestions based on rules (e.g., high add-to-cart, low purchase).
- Suggestions include rationale.

#### 1.2.4.4 Implementation Implications

- Implement a rule-based engine for suggestion generation.
- Define extensible interfaces for adding new suggestion rules.

#### 1.2.4.5 Extraction Reasoning

Implicitly mapped via the 'extension points' and 'suggestion generation' responsibilities described in the repository definition.

### 1.2.5.0 Requirement Id

#### 1.2.5.1 Requirement Id

US-037

#### 1.2.5.2 Requirement Text

AI Assistant provides helpful feedback for unanswerable queries.

#### 1.2.5.3 Validation Criteria

- System detects out-of-scope or nonsensical queries.
- System returns a specific response type indicating failure with example valid queries.

#### 1.2.5.4 Implementation Implications

- Implement fallback logic when RAG retrieval score is low.
- Design response DTOs to support error/help states.

#### 1.2.5.5 Extraction Reasoning

Determines the error handling logic within the domain service.

## 1.3.0.0 Relevant Components

### 1.3.1.0 Component Name

#### 1.3.1.1 Component Name

AIAssistantService

#### 1.3.1.2 Component Specification

Core domain service responsible for orchestrating the AI logic, including RAG pipeline execution, query processing, and insight generation. It acts as the logic container independent of the transport layer.

#### 1.3.1.3 Implementation Requirements

- Must be instantiated with IOpenAIGateway and data repository dependencies.
- Must implement prompt engineering logic.
- Must handle vector similarity search coordination.

#### 1.3.1.4 Architectural Context

Domain Logic Layer - Encapsulates complex business rules for AI.

#### 1.3.1.5 Extraction Reasoning

Central component defined in the repository mapping.

### 1.3.2.0 Component Name

#### 1.3.2.1 Component Name

RAGOrchestrator

#### 1.3.2.2 Component Specification

Internal logic handler that manages the specific steps of the Retrieval-Augmented Generation flow: Embedding -> Search -> Prompting -> Completion.

#### 1.3.2.3 Implementation Requirements

- Coordinate calls between SDK (embedding) and Data Lib (Vector Search).
- Construct final prompts with retrieved context.
- Sanitize inputs and outputs.

#### 1.3.2.4 Architectural Context

Domain Logic Layer - Internal helper for AIAssistantService.

#### 1.3.2.5 Extraction Reasoning

Derived from the 'extracted_responsibilities' specifically mentioning RAG pattern implementation.

### 1.3.3.0 Component Name

#### 1.3.3.1 Component Name

InsightGenerator

#### 1.3.3.2 Component Specification

Rule-based engine that processes historical data to identify trends, anomalies, and optimization suggestions.

#### 1.3.3.3 Implementation Requirements

- Implement strategy pattern for extensible insight rules.
- Consume aggregated OLAP data to perform statistical analysis (e.g., standard deviation checks).

#### 1.3.3.4 Architectural Context

Domain Logic Layer - Business Intelligence Logic.

#### 1.3.3.5 Extraction Reasoning

Required to fulfill REQ-FUNC-015 and REQ-FUNC-016.

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Domain Logic Layer', 'layer_responsibilities': 'Encapsulate business rules, algorithms, and domain-specific processing logic without knowledge of HTTP or UI concerns.', 'layer_constraints': ['Must not contain API route definitions.', 'Must be framework-agnostic.', 'Must rely on dependency injection for external services.'], 'implementation_patterns': ['Service Object Pattern', 'Strategy Pattern (for different insight rules)'], 'extraction_reasoning': "Explicitly defined in the repository definition 'layerIds'."}

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

IOpenAIGateway

#### 1.5.1.2 Source Repository

REPO-LIB-SDK-001

#### 1.5.1.3 Method Contracts

##### 1.5.1.3.1 Method Name

###### 1.5.1.3.1.1 Method Name

getCompletion

###### 1.5.1.3.1.2 Method Signature

getCompletion(prompt: string): Promise<string>

###### 1.5.1.3.1.3 Method Purpose

Sends a constructed prompt to the LLM and returns the generated text.

###### 1.5.1.3.1.4 Integration Context

Called during the final step of the RAG pipeline after context retrieval.

##### 1.5.1.3.2.0 Method Name

###### 1.5.1.3.2.1 Method Name

createEmbedding

###### 1.5.1.3.2.2 Method Signature

createEmbedding(text: string): Promise<number[]>

###### 1.5.1.3.2.3 Method Purpose

Converts input text into a vector representation.

###### 1.5.1.3.2.4 Integration Context

Called immediately upon receiving a user query to prepare for vector search.

#### 1.5.1.4.0.0 Integration Pattern

Dependency Injection (Interface defined in SDK)

#### 1.5.1.5.0.0 Communication Protocol

In-process library call (async/await)

#### 1.5.1.6.0.0 Extraction Reasoning

Explicitly defined in 'dependency_contracts'.

### 1.5.2.0.0.0 Interface Name

#### 1.5.2.1.0.0 Interface Name

IVectorDbRepository

#### 1.5.2.2.0.0 Source Repository

REPO-LIB-DATA-001

#### 1.5.2.3.0.0 Method Contracts

- {'method_name': 'findRelevantContext', 'method_signature': 'findRelevantContext(embedding: number[], merchantId: string, limit: number): Promise<string[]>', 'method_purpose': 'Queries the pgvector database for text chunks similar to the query embedding.', 'integration_context': 'Called after embedding generation to retrieve RAG context.'}

#### 1.5.2.4.0.0 Integration Pattern

Dependency Injection

#### 1.5.2.5.0.0 Communication Protocol

In-process library call (async/await)

#### 1.5.2.6.0.0 Extraction Reasoning

Inferred from the description mentioning pgvector interaction and dependency on REPO-LIB-DATA-001.

### 1.5.3.0.0.0 Interface Name

#### 1.5.3.1.0.0 Interface Name

IAnalyticsDataRepository

#### 1.5.3.2.0.0 Source Repository

REPO-LIB-DATA-001

#### 1.5.3.3.0.0 Method Contracts

- {'method_name': 'getAggregatedSales', 'method_signature': 'getAggregatedSales(merchantId: string, startDate: Date, endDate: Date): Promise<SalesData[]>', 'method_purpose': 'Retrieves historical sales data from the OLAP store.', 'integration_context': 'Called by InsightGenerator to detect trends and anomalies.'}

#### 1.5.3.4.0.0 Integration Pattern

Dependency Injection

#### 1.5.3.5.0.0 Communication Protocol

In-process library call (async/await)

#### 1.5.3.6.0.0 Extraction Reasoning

Required to fetch the data needed for REQ-FUNC-015 (Insight Generation).

## 1.6.0.0.0.0 Exposed Interfaces

- {'interface_name': 'IAssistantService', 'consumer_repositories': ['REPO-APP-CORE-001'], 'method_contracts': [{'method_name': 'processNaturalLanguageQuery', 'method_signature': 'processNaturalLanguageQuery(query: string, merchantId: string): Promise<AIQueryResponse>', 'method_purpose': 'Main entry point for handling user questions via the BFF API.', 'implementation_requirements': 'Must implement the full RAG pipeline and error handling. Returns payload distinguishing between text, chart, or error responses.'}, {'method_name': 'generateProactiveInsights', 'method_signature': 'generateProactiveInsights(merchantId: string): Promise<Insight[]>', 'method_purpose': 'Entry point for scheduled jobs or dashboard loading to trigger analysis.', 'implementation_requirements': 'Must execute analysis algorithms against historical data.'}, {'method_name': 'generateOptimizationSuggestions', 'method_signature': 'generateOptimizationSuggestions(merchantId: string): Promise<Suggestion[]>', 'method_purpose': 'Generates actionable advice based on predefined rules (e.g., high add-to-cart, low conversion).', 'implementation_requirements': 'Execute rule engine against merchant analytics.'}], 'service_level_requirements': ['Processing time should be optimized for real-time interaction (target < 5s inclusive of LLM latency).', 'High reliability for insight generation.'], 'implementation_constraints': ['Input sanitization is mandatory.', 'Strict merchant_id scoping is mandatory.'], 'extraction_reasoning': "Explicitly defined in 'exposed_contracts' and aligned with BFF consumption patterns."}

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

Node.js environment, pure TypeScript (no specific web framework like Express within the lib).

### 1.7.2.0.0.0 Integration Technologies

- pgvector (via Data Lib)
- OpenAI API (via SDK Lib)

### 1.7.3.0.0.0 Performance Constraints

Vector search queries must be highly optimized. Processing logic must be non-blocking (async). Response generation must fit within serverless timeout limits.

### 1.7.4.0.0.0 Security Requirements

Strict tenant isolation via merchantId. Prompt injection defense mechanisms (e.g., delimiters, system instructions). PII redaction.

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | 100% - All stated requirements and dependencies fr... |
| Cross Reference Validation | Validated against Requirements list (REQ-FUNC-014,... |
| Implementation Readiness Assessment | High - Interfaces, dependencies, and logical respo... |
| Quality Assurance Confirmation | Logic isolation confirmed. RAG pattern requirement... |

