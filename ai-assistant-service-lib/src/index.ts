/**
 * Salla AI Assistant Service Library
 * 
 * This library acts as the Domain Logic Layer for the AI Assistant features.
 * It encapsulates the complexities of RAG (Retrieval-Augmented Generation),
 * Prompt Engineering, and Proactive Insight Generation.
 * 
 * Architecture: Clean Architecture / Domain-Driven Design
 */

// ---------------------------------------------------------
// 1. Domain Layer - Interfaces (Contracts)
// ---------------------------------------------------------
// These interfaces define the dependencies required by this library.
// Consumers must provide concrete implementations for these interfaces.
export * from './ai-assistant/domain/interfaces/IAIAssistantService';
export * from './ai-assistant/domain/interfaces/IAnalyticsDataRepository';
export * from './ai-assistant/domain/interfaces/IOpenAIGateway';
export * from './ai-assistant/domain/interfaces/IVectorDbRepository';

// ---------------------------------------------------------
// 2. Domain Layer - Entities & Value Objects
// ---------------------------------------------------------
// Core business objects and types used throughout the system.
export * from './ai-assistant/domain/ContextChunk';
export * from './ai-assistant/domain/EmbeddingVector';
export * from './ai-assistant/domain/Insight';
export * from './ai-assistant/domain/QueryIntent';
export * from './ai-assistant/domain/Suggestion';

// ---------------------------------------------------------
// 3. Application Layer - DTOs (Data Transfer Objects)
// ---------------------------------------------------------
// Objects defining the input/output contracts for the service API.
export * from './ai-assistant/application/dtos/AIQueryResponse';
export * from './ai-assistant/application/dtos/InsightResult';
export * from './ai-assistant/application/dtos/NaturalLanguageQueryRequest';

// ---------------------------------------------------------
// 4. Application Layer - Strategies (Business Rules)
// ---------------------------------------------------------
// Extensible rules for generating insights and detecting anomalies.
export * from './ai-assistant/application/strategies/IInsightRule';
export * from './ai-assistant/application/strategies/AnomalyDetectionStrategy';
export * from './ai-assistant/application/strategies/HighAddToCartLowConversionRule';
export * from './ai-assistant/application/strategies/SalesSpikeRule';

// ---------------------------------------------------------
// 5. Application Layer - Services (Implementation)
// ---------------------------------------------------------
// Concrete implementations of the business logic.
// Note: While these are implementations, they are exported to allow
// Dependency Injection containers to register them.

// Support Services
export * from './ai-assistant/application/services/PiiSanitizationService';
export * from './ai-assistant/application/services/PromptEngineeringService';

// Logic Engines
export * from './ai-assistant/application/services/InsightGeneratorService';
export * from './ai-assistant/application/services/RagOrchestrator';

// Main Facade Service
export * from './ai-assistant/application/services/AIAssistantService';