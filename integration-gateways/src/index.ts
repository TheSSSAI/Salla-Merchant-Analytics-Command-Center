/**
 * Salla Analytics Integration Gateways Library
 * 
 * This library acts as an Anti-Corruption Layer (ACL) and Gateway layer for external services.
 * It provides resilient, type-safe, and monitored access to Salla, OpenAI, and Postmark APIs.
 */

// ----------------------------------------------------------------------
// Level 0: Contracts & Abstract Definitions
// ----------------------------------------------------------------------
export * from './contracts/ISallaGateway';
export * from './contracts/IOpenAIGateway';
export * from './contracts/IEmailGateway';
export * from './contracts/IWebhookValidator';

// ----------------------------------------------------------------------
// Level 0: Shared Models & Types
// ----------------------------------------------------------------------
export * from './models/GatewayResult';
export * from './models/GatewayException';

// ----------------------------------------------------------------------
// Level 0: Configuration
// ----------------------------------------------------------------------
export * from './config/GatewayConfig';

// ----------------------------------------------------------------------
// Level 0 & 3: Salla Integration Components
// ----------------------------------------------------------------------
// DTOs required for method inputs/outputs
export * from './gateways/salla/SallaDTOs';
// Core Gateway Implementation
export * from './gateways/salla/SallaGateway';
// Authentication Service for OAuth flows
export * from './gateways/salla/SallaAuthService';
// Webhook Security Validation
export * from './gateways/salla/SallaWebhookValidator';

// ----------------------------------------------------------------------
// Level 1 & 3: OpenAI Integration Components
// ----------------------------------------------------------------------
// Core Gateway Implementation
export * from './gateways/openai/OpenAIGateway';
// Resiliency Policy (exported for advanced configuration/inspection)
export * from './gateways/openai/OpenAIResiliencyPolicy';

// ----------------------------------------------------------------------
// Level 3: Postmark (Email) Integration Components
// ----------------------------------------------------------------------
// Core Gateway Implementation
export * from './gateways/postmark/PostmarkGateway';

// ----------------------------------------------------------------------
// Level 2: Shared Infrastructure
// ----------------------------------------------------------------------
// Factory for creating pre-configured HTTP clients
export * from './infrastructure/http/HttpClientFactory';