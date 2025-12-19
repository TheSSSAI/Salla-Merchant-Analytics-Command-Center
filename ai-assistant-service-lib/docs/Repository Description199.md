# 1 Id

REPO-SVC-AI-001

# 2 Name

ai-assistant-service-lib

# 3 Description

This repository houses the core, complex business logic for the AI-powered assistant. It was extracted to isolate the specialized, computationally-intensive code related to AI and Machine Learning. Its primary responsibility is to implement the Retrieval-Augmented Generation (RAG) pattern, including text embedding, vector database interaction (`pgvector`), and crafting the precise prompts for the OpenAI LLM. It also contains the logic for proactively generating insights and suggestions. By packaging this logic as an independent, versioned library, it can be tested in deep isolation and consumed by different parts of the system, such as the real-time BFF API for user queries and a separate scheduled background job for generating daily insights. This separation improves modularity and contains the complexity of the AI stack.

# 4 Type

🔹 Domain Library

# 5 Namespace

Salla.Analytics.AIAssistant

# 6 Output Path

dist

# 7 Framework

N/A

# 8 Language

TypeScript

# 9 Technology

TypeScript, pgvector

# 10 Thirdparty Libraries

*No items available*

# 11 Layer Ids

- domain-logic-layer

# 12 Dependencies

- REPO-LIB-DATA-001
- REPO-LIB-CORE-001
- REPO-LIB-SDK-001

# 13 Requirements

- {'requirementId': 'REQ-FUN-400'}

# 14 Generate Tests

✅ Yes

# 15 Generate Documentation

✅ Yes

# 16 Architecture Style

Domain Service Library

# 17 Architecture Map

- ai-assistant-service-001

# 18 Components Map

- ai-assistant-service-005

# 19 Requirements Map

- REQ-FUNC-014
- REQ-FUNC-015

# 20 Decomposition Rationale

## 20.1 Operation Type

NEW_DECOMPOSED

## 20.2 Source Repository

REPO-APP-001

## 20.3 Decomposition Reasoning

The AI/ML logic is a highly specialized and complex domain. Separating it into its own library isolates this complexity, decouples it from the API delivery mechanism, and allows it to be developed and tested by a specialized team. It also makes the core AI logic reusable by both synchronous (API) and asynchronous (scheduled jobs) consumers.

## 20.4 Extracted Responsibilities

- Natural Language Query (NLQ) parsing.
- Implementation of the RAG pattern.
- Vector embedding and similarity search logic.
- Proactive insight and suggestion generation algorithms.

## 20.5 Reusability Scope

- The library is consumed by the main BFF API and could be consumed by a separate scheduled task runner for proactive insights.

## 20.6 Development Benefits

- Isolates complex AI logic, making it easier to test and reason about.
- Enables focused development by an AI/ML specialist or team.
- Decouples the AI implementation from the choice of LLM provider (via the SDK gateway).

# 21.0 Dependency Contracts

## 21.1 Repo-Lib-Sdk-001

### 21.1.1 Required Interfaces

- {'interface': 'IOpenAIGateway', 'methods': ['getCompletion(prompt: string): Promise<string>', 'createEmbedding(text: string): Promise<number[]>'], 'events': [], 'properties': []}

### 21.1.2 Integration Pattern

NPM Package Dependency

### 21.1.3 Communication Protocol

Compile-time Import

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'IAssistantService', 'methods': ['processNaturalLanguageQuery(query: string, merchantId: string): Promise<QueryResult>', 'generateProactiveInsights(merchantId: string): Promise<Insight[]>'], 'events': [], 'properties': [], 'consumers': ['REPO-APP-CORE-001']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | The `AssistantService` class should be instantiate... |
| Event Communication | N/A |
| Data Flow | Receives a query -> Fetches relevant data from OLA... |
| Error Handling | Implements robust error handling for failed LLM ca... |
| Async Patterns | All primary methods are asynchronous and heavily r... |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | Should be entirely framework-agnostic. |
| Performance Considerations | Vector search queries must be highly optimized. Ca... |
| Security Considerations | Implement prompt injection defenses. Ensure that a... |
| Testing Approach | Heavy focus on unit tests with mocked dependencies... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- All logic related to the RAG pattern.
- Query understanding and data retrieval.
- Prompt engineering and LLM interaction.

## 25.2.0 Must Not Implement

- API endpoint definitions (this is handled by the consumer).
- UI for displaying results.

## 25.3.0 Extension Points

- The rule-based suggestion engine (FR-403) is a key extension point for adding new, more sophisticated rules.

## 25.4.0 Validation Rules

- Input queries should be sanitized and validated before processing.

