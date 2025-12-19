# 1 Id

REPO-LIB-CORE-001

# 2 Name

core-library

# 3 Description

A foundational library containing shared, non-domain-specific code, extracted from the original monorepo's `@acme/lib` package. Its responsibility is to provide common utilities, types, constants, and configuration logic that can be used across all other services and applications. This includes TypeScript types for API payloads, Zod schemas for validation, helper functions for tasks like date formatting or string manipulation, and centralized logging configurations. Isolating this code prevents duplication, enforces consistency, and allows for shared concerns to be updated in one place and distributed as a versioned package. It is the bedrock of the application's internal API, ensuring all components speak the same language.

# 4 Type

🔹 Utility Library

# 5 Namespace

Salla.Analytics.Core

# 6 Output Path

dist

# 7 Framework

N/A

# 8 Language

TypeScript

# 9 Technology

TypeScript, Zod

# 10 Thirdparty Libraries

- zod
- date-fns

# 11 Layer Ids

- cross-cutting-layer

# 12 Dependencies

*No items available*

# 13 Requirements

- {'requirementId': 'REQ-MNT-001'}

# 14 Generate Tests

✅ Yes

# 15 Generate Documentation

✅ Yes

# 16 Architecture Style

Utility Library

# 17 Architecture Map

*No items available*

# 18 Components Map

*No items available*

# 19 Requirements Map

*No items available*

# 20 Decomposition Rationale

## 20.1 Operation Type

NEW_DECOMPOSED

## 20.2 Source Repository

REPO-APP-001

## 20.3 Decomposition Reasoning

Extracted to centralize all shared, non-domain-specific code. This prevents code duplication across multiple repositories, ensures consistency in areas like validation and logging, and provides a stable, versioned foundation for other services to build upon.

## 20.4 Extracted Responsibilities

- Shared TypeScript types and interfaces.
- Zod schemas for API validation.
- Common utility functions (e.g., formatters, calculators).
- Constants and configuration models.

## 20.5 Reusability Scope

- This library is designed to be a dependency for every other application and service repository in the project.

## 20.6 Development Benefits

- Promotes DRY (Don't Repeat Yourself) principles.
- Simplifies maintenance by having a single location for shared code.
- Enforces consistency across the entire system.

# 21.0 Dependency Contracts

*No data available*

# 22.0 Exposed Contracts

## 22.1 Public Interfaces

- {'interface': 'Module Exports', 'methods': ['formatCurrency(value: number): string'], 'events': [], 'properties': ['CreateUserSchema: Zod.Schema'], 'consumers': ['REPO-APP-CORE-001', 'REPO-SVC-DATA-001', 'REPO-SVC-AI-001']}

# 23.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | N/A (Utilities are typically static functions). |
| Event Communication | N/A |
| Data Flow | Provides pure functions and data structures for us... |
| Error Handling | May provide custom error classes for standardized ... |
| Async Patterns | N/A |

# 24.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | This library must remain framework-agnostic. It sh... |
| Performance Considerations | Utilities should be written as pure, efficient fun... |
| Security Considerations | Validation schemas are a key security feature and ... |
| Testing Approach | Requires 100% unit test coverage for all utility f... |

# 25.0 Scope Boundaries

## 25.1 Must Implement

- Generic, reusable functions and types.
- Code that is needed by more than one other repository.

## 25.2 Must Not Implement

- Domain-specific business logic.
- I/O operations (e.g., database calls, API requests).
- Framework-specific code.

## 25.3 Extension Points

- New utilities and types can be added as needed.

## 25.4 Validation Rules

- Exported Zod schemas serve as the validation rules for consumers.

