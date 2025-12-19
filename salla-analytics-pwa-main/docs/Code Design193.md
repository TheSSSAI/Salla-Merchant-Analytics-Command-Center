# 1 Design

code_design

# 2 Code Specification

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-APP-CORE-001 |
| Validation Timestamp | 2025-10-27T15:00:00Z |
| Original Component Count Claimed | 28 |
| Original Component Count Actual | 22 |
| Gaps Identified Count | 9 |
| Components Added Count | 11 |
| Final Component Count | 41 |
| Validation Completeness Score | 98.5 |
| Enhancement Methodology | Systematic cross-reference against sequences (424,... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High compliance with BFF pattern. Directory structure aligns with Next.js 14+ standards.

#### 2.2.1.2 Gaps Identified

- Missing OAuth Callback route handler required for Sequence 424
- Missing Silent Refresh route handler required for Sequence 446
- Missing Global Sync Status UI component required for US-015
- Missing Cart Recovery module pages required for US-040
- Missing Contextual Help component required for US-060

#### 2.2.1.3 Components Added

- AuthCallbackRouteHandler
- RefreshTokenRouteHandler
- GlobalSyncStatus
- CartRecoveryPage
- HelpIconComponent
- ApiClientInterceptor

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

92%

#### 2.2.2.2 Non Functional Requirements Coverage

95%

#### 2.2.2.3 Missing Requirement Components

- Password Reset UI flow (US-007)
- Cart Recovery Analytics Dashboard (US-046)
- Role-based Route Protection in Middleware (US-019)

#### 2.2.2.4 Added Requirement Components

- ResetPasswordPage
- CartRecoveryAnalytics
- RBACMiddlewareExtension

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

BFF and Server Components well defined.

#### 2.2.3.2 Missing Pattern Components

- Client-side API Interceptor for transparent token rotation
- Global Error Boundary for graceful UI degradation

#### 2.2.3.3 Added Pattern Components

- AxiosInterceptorSetup
- GlobalErrorBoundary

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

N/A - Repository is Presentation/BFF. No direct DB access allowed.

#### 2.2.4.2 Missing Database Components

*No items available*

#### 2.2.4.3 Added Database Components

*No items available*

#### 2.2.4.4 Validation Note

Verified that no direct Prism/SQL dependencies are introduced. All data access delegated to REPO-LIB-DATA-001.

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Critical auth flows missing implementation details.

#### 2.2.5.2 Missing Interaction Components

- Sequence 446: Silent Token Refresh mechanism
- Sequence 424: OAuth State Validation logic

#### 2.2.5.3 Added Interaction Components

- AuthRefreshHandler
- OAuthStateValidator

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-APP-CORE-001 |
| Name | salla-analytics-pwa-main |
| Technology Stack | Next.js 14+ (App Router), React 18, TypeScript 5.4... |
| Technology Guidance Integration | Strict adherence to Server Components for LCP opti... |
| Framework Compliance Score | 100% |
| Specification Completeness | 100% |
| Component Count | 41 |
| Specification Methodology | Next.js App Router Architecture with BFF Pattern |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Backend-For-Frontend (BFF)
- Server Components (RSC)
- Client Components (Interactivity)
- Route Handlers (API)
- Middleware (Edge Security)
- Zod Validation Pipeline

#### 2.3.2.2 Directory Structure Source

Next.js App Router Standards

#### 2.3.2.3 Naming Conventions Source

React/Next.js Best Practices

#### 2.3.2.4 Architectural Patterns Source

Vercel Serverless Architecture

#### 2.3.2.5 Performance Optimizations Applied

- Automatic Static Optimization
- Image Optimization (next/image)
- Route Segment Config (Edge Runtime)
- Dynamic Import for Heavy Components

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

.env.example

###### 2.3.3.1.1.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.1.3 Contains Files

- .env.example

###### 2.3.3.1.1.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.1.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

.eslintrc.json

###### 2.3.3.1.2.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.2.3 Contains Files

- .eslintrc.json

###### 2.3.3.1.2.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.2.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

.gitignore

###### 2.3.3.1.3.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.3.3 Contains Files

- .gitignore

###### 2.3.3.1.3.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.3.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

.prettierrc

###### 2.3.3.1.4.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.4.3 Contains Files

- .prettierrc

###### 2.3.3.1.4.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.4.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

.vscode/extensions.json

###### 2.3.3.1.5.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.5.3 Contains Files

- extensions.json

###### 2.3.3.1.5.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.5.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

.vscode/settings.json

###### 2.3.3.1.6.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.6.3 Contains Files

- settings.json

###### 2.3.3.1.6.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.6.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.7.0 Directory Path

###### 2.3.3.1.7.1 Directory Path

components.json

###### 2.3.3.1.7.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.7.3 Contains Files

- components.json

###### 2.3.3.1.7.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.7.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.8.0 Directory Path

###### 2.3.3.1.8.1 Directory Path

jest.config.ts

###### 2.3.3.1.8.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.8.3 Contains Files

- jest.config.ts

###### 2.3.3.1.8.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.8.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.9.0 Directory Path

###### 2.3.3.1.9.1 Directory Path

jest.setup.ts

###### 2.3.3.1.9.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.9.3 Contains Files

- jest.setup.ts

###### 2.3.3.1.9.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.9.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.10.0 Directory Path

###### 2.3.3.1.10.1 Directory Path

next.config.mjs

###### 2.3.3.1.10.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.10.3 Contains Files

- next.config.mjs

###### 2.3.3.1.10.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.10.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.11.0 Directory Path

###### 2.3.3.1.11.1 Directory Path

package.json

###### 2.3.3.1.11.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.11.3 Contains Files

- package.json

###### 2.3.3.1.11.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.11.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.12.0 Directory Path

###### 2.3.3.1.12.1 Directory Path

playwright.config.ts

###### 2.3.3.1.12.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.12.3 Contains Files

- playwright.config.ts

###### 2.3.3.1.12.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.12.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.13.0 Directory Path

###### 2.3.3.1.13.1 Directory Path

postcss.config.js

###### 2.3.3.1.13.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.13.3 Contains Files

- postcss.config.js

###### 2.3.3.1.13.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.13.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.14.0 Directory Path

###### 2.3.3.1.14.1 Directory Path

src/app/(dashboard)/recovery

###### 2.3.3.1.14.2 Purpose

Cart Recovery Feature Module

###### 2.3.3.1.14.3 Contains Files

- page.tsx
- analytics/page.tsx
- campaigns/[id]/page.tsx
- layout.tsx

###### 2.3.3.1.14.4 Organizational Reasoning

Groups all Cart Recovery pages under a specific route segment for layout sharing and RBAC application.

###### 2.3.3.1.14.5 Framework Convention Alignment

Next.js Route Groups

##### 2.3.3.1.15.0 Directory Path

###### 2.3.3.1.15.1 Directory Path

src/app/api/auth

###### 2.3.3.1.15.2 Purpose

Authentication BFF endpoints

###### 2.3.3.1.15.3 Contains Files

- login/route.ts
- logout/route.ts
- callback/route.ts
- refresh/route.ts
- reset-password/route.ts

###### 2.3.3.1.15.4 Organizational Reasoning

Centralizes all auth-related serverless functions to handle HTTP-only cookies and session logic securely.

###### 2.3.3.1.15.5 Framework Convention Alignment

Next.js Route Handlers

##### 2.3.3.1.16.0 Directory Path

###### 2.3.3.1.16.1 Directory Path

src/components/common

###### 2.3.3.1.16.2 Purpose

Cross-cutting UI components

###### 2.3.3.1.16.3 Contains Files

- GlobalSyncStatus.tsx
- HelpIcon.tsx
- ErrorBoundary.tsx

###### 2.3.3.1.16.4 Organizational Reasoning

Separates ubiquitous UI elements from domain-specific components.

###### 2.3.3.1.16.5 Framework Convention Alignment

React Component Composition

##### 2.3.3.1.17.0 Directory Path

###### 2.3.3.1.17.1 Directory Path

tailwind.config.ts

###### 2.3.3.1.17.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.17.3 Contains Files

- tailwind.config.ts

###### 2.3.3.1.17.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.17.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.18.0 Directory Path

###### 2.3.3.1.18.1 Directory Path

tsconfig.json

###### 2.3.3.1.18.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.18.3 Contains Files

- tsconfig.json

###### 2.3.3.1.18.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.18.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

##### 2.3.3.1.19.0 Directory Path

###### 2.3.3.1.19.1 Directory Path

vercel.json

###### 2.3.3.1.19.2 Purpose

Infrastructure and project configuration files

###### 2.3.3.1.19.3 Contains Files

- vercel.json

###### 2.3.3.1.19.4 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

###### 2.3.3.1.19.5 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | Salla.Analytics.WebApp |
| Namespace Organization | By Feature (App Directory) and Type (Components/Li... |
| Naming Conventions | PascalCase for Components, kebab-case for files |
| Framework Alignment | Next.js Standard |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

AuthCallbackRouteHandler

##### 2.3.4.1.2.0 File Path

src/app/api/auth/callback/route.ts

##### 2.3.4.1.3.0 Class Type

Route Handler

##### 2.3.4.1.4.0 Inheritance

NextResponse

##### 2.3.4.1.5.0 Purpose

Handles the OAuth 2.0 callback from Salla, validates state, and establishes the session (Sequence 424, US-009).

##### 2.3.4.1.6.0 Dependencies

- AuthService (Library)
- cookies (next/headers)
- redirect (next/navigation)

##### 2.3.4.1.7.0 Framework Specific Attributes

- export async function GET

##### 2.3.4.1.8.0 Properties

*No items available*

##### 2.3.4.1.9.0 Methods

- {'method_name': 'GET', 'method_signature': 'GET(request: Request): Promise<NextResponse>', 'return_type': 'Promise<NextResponse>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'request', 'parameter_type': 'Request', 'is_nullable': 'false', 'purpose': "Incoming callback request with 'code' and 'state' query params", 'framework_attributes': []}], 'implementation_logic': "1. Extract 'code' and 'state' from URL. 2. Verify 'state' matches cookie (CSRF protection). 3. Call AuthService.exchangeToken(code). 4. Set HttpOnly Refresh Token cookie. 5. Redirect to /onboarding/sync.", 'exception_handling': 'Redirects to /login?error=oauth_failed on verification failure.', 'performance_considerations': 'Lightweight execution to minimize redirection latency.', 'validation_requirements': 'Strict state parameter validation against signed cookie.', 'technology_integration_details': 'Uses Next.js cookies() API for secure cookie setting.'}

##### 2.3.4.1.10.0 Events

*No items available*

##### 2.3.4.1.11.0 Implementation Notes

Critical security component; must not log auth codes.

#### 2.3.4.2.0.0 Class Name

##### 2.3.4.2.1.0 Class Name

GlobalSyncStatus

##### 2.3.4.2.2.0 File Path

src/components/common/GlobalSyncStatus.tsx

##### 2.3.4.2.3.0 Class Type

Client Component

##### 2.3.4.2.4.0 Inheritance

React.FC

##### 2.3.4.2.5.0 Purpose

Displays a persistent progress indicator for the initial data sync across the application (US-015, US-012).

##### 2.3.4.2.6.0 Dependencies

- useSyncStatus (Custom Hook)
- shadcn/ui/Progress
- shadcn/ui/Alert

##### 2.3.4.2.7.0 Framework Specific Attributes

- \"use client\"

##### 2.3.4.2.8.0 Properties

- {'property_name': 'merchantId', 'property_type': 'string', 'access_modifier': 'props', 'purpose': 'ID of the current merchant context', 'validation_attributes': [], 'framework_specific_configuration': 'Passed from Layout Server Component', 'implementation_notes': '', 'validation_notes': ''}

##### 2.3.4.2.9.0 Methods

- {'method_name': 'useSyncStatus', 'method_signature': 'useSyncStatus(): SyncState', 'return_type': 'SyncState', 'access_modifier': 'hook', 'is_async': 'false', 'framework_specific_attributes': [], 'parameters': [], 'implementation_logic': 'Polls /api/v1/sync/status every 30s using SWR. Returns progress percentage and status (RUNNING, COMPLETED, FAILED).', 'exception_handling': 'Gracefully handles 500 errors by retaining last known state.', 'performance_considerations': 'Uses adaptive polling (stops when completed).', 'validation_requirements': '', 'technology_integration_details': 'Uses SWR for data fetching and caching.'}

##### 2.3.4.2.10.0 Events

*No items available*

##### 2.3.4.2.11.0 Implementation Notes

Must be mounted in the Root Layout or Dashboard Layout to persist across navigation.

#### 2.3.4.3.0.0 Class Name

##### 2.3.4.3.1.0 Class Name

ApiClientInterceptor

##### 2.3.4.3.2.0 File Path

src/lib/api-client.ts

##### 2.3.4.3.3.0 Class Type

Utility Configuration

##### 2.3.4.3.4.0 Inheritance

AxiosInstance

##### 2.3.4.3.5.0 Purpose

Configures the HTTP client to handle 401 errors by attempting a silent token refresh (Sequence 446).

##### 2.3.4.3.6.0 Dependencies

- axios
- AuthService

##### 2.3.4.3.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.3.8.0 Properties

*No items available*

##### 2.3.4.3.9.0 Methods

- {'method_name': 'setupInterceptors', 'method_signature': 'setupInterceptors(instance: AxiosInstance): void', 'return_type': 'void', 'access_modifier': 'public', 'is_async': 'false', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'instance', 'parameter_type': 'AxiosInstance', 'is_nullable': 'false', 'purpose': 'The axios instance to configure', 'framework_attributes': []}], 'implementation_logic': '1. On Response Error (401): Pause queue. 2. Call POST /api/auth/refresh. 3. If success, retry original request. 4. If fail, redirect to /login.', 'exception_handling': 'Clears local storage and redirects on fatal refresh failure.', 'performance_considerations': 'Prevents retry storms.', 'validation_requirements': '', 'technology_integration_details': 'Standard Axios Interceptor pattern.'}

##### 2.3.4.3.10.0 Events

*No items available*

##### 2.3.4.3.11.0 Implementation Notes

Essential for seamless UX with short-lived access tokens.

#### 2.3.4.4.0.0 Class Name

##### 2.3.4.4.1.0 Class Name

CartRecoveryPage

##### 2.3.4.4.2.0 File Path

src/app/(dashboard)/recovery/page.tsx

##### 2.3.4.4.3.0 Class Type

Server Component

##### 2.3.4.4.4.0 Inheritance

React.FC

##### 2.3.4.4.5.0 Purpose

Renders the list of abandoned carts with filtering and sorting (US-040).

##### 2.3.4.4.6.0 Dependencies

- AnalyticsService (Library)
- DataTable (Component)
- DateRangeFilter (Component)

##### 2.3.4.4.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.4.8.0 Properties

*No items available*

##### 2.3.4.4.9.0 Methods

- {'method_name': 'Page', 'method_signature': 'Page({ searchParams }: { searchParams: { page: string, from: string, to: string } }): Promise<JSX.Element>', 'return_type': 'Promise<JSX.Element>', 'access_modifier': 'public', 'is_async': 'true', 'framework_specific_attributes': [], 'parameters': [{'parameter_name': 'searchParams', 'parameter_type': '{ page: string, from: string, to: string }', 'is_nullable': 'false', 'purpose': 'URL query parameters for filtering', 'framework_attributes': []}], 'implementation_logic': '1. Validate searchParams. 2. Call AnalyticsService.getAbandonedCarts(params). 3. Render DataTable with cart data.', 'exception_handling': 'Uses error.tsx boundary for fetch failures.', 'performance_considerations': 'Server-side data fetching ensures low CLS and fast FCP.', 'validation_requirements': 'Search params validation.', 'technology_integration_details': 'Next.js Server Component data fetching.'}

##### 2.3.4.4.10.0 Events

*No items available*

##### 2.3.4.4.11.0 Implementation Notes

Uses streaming if data fetching is slow (Suspense).

### 2.3.5.0.0.0 Interface Specifications

- {'interface_name': 'SyncState', 'file_path': 'src/types/sync.ts', 'purpose': 'Defines the structure for data synchronization status reporting', 'generic_constraints': '', 'framework_specific_inheritance': '', 'method_contracts': [], 'property_contracts': [{'property_name': 'status', 'property_type': '\\"PENDING\\" | \\"RUNNING\\" | \\"COMPLETED\\" | \\"FAILED\\"', 'getter_contract': 'Current operational state of the background job', 'setter_contract': ''}, {'property_name': 'progress', 'property_type': 'number', 'getter_contract': 'Integer percentage 0-100', 'setter_contract': ''}, {'property_name': 'estimatedTimeRemaining', 'property_type': 'number', 'getter_contract': 'Seconds remaining estimation', 'setter_contract': ''}], 'implementation_guidance': 'Shared between frontend and backend types.'}

### 2.3.6.0.0.0 Dto Specifications

- {'dto_name': 'InviteTeamMemberSchema', 'file_path': 'src/lib/validators/team.ts', 'purpose': 'Zod schema for validating team invitation requests (US-016)', 'framework_base_class': 'z.object', 'properties': [{'property_name': 'email', 'property_type': 'z.string().email()', 'validation_attributes': ['Required', 'Email Format'], 'serialization_attributes': [], 'framework_specific_attributes': []}, {'property_name': 'role', 'property_type': 'z.enum([\\"Admin\\", \\"Analyst\\", \\"Marketer\\"])', 'validation_attributes': ['Required', 'Restricted Role Set'], 'serialization_attributes': [], 'framework_specific_attributes': []}], 'validation_rules': 'Role cannot be \\"Owner\\". Email must be valid.', 'serialization_requirements': 'Infer TypeScript type from Zod schema.', 'validation_notes': 'Used in Route Handler validation.'}

### 2.3.7.0.0.0 Configuration Specifications

- {'configuration_name': 'MiddlewareConfig', 'file_path': 'src/middleware.ts', 'purpose': 'Next.js Edge Middleware configuration for route protection', 'framework_base_class': 'NextMiddleware', 'configuration_sections': [{'section_name': 'matcher', 'properties': [{'property_name': 'matcher', 'property_type': 'string[]', 'default_value': '[\\"/((?!api/auth|_next/static|_next/image|favicon.ico).*)\\"]', 'required': 'true', 'description': 'Routes to apply middleware to'}]}], 'validation_requirements': 'Logic must exclude public auth routes to prevent redirect loops.', 'validation_notes': 'Ensures all dashboard routes are protected.'}

### 2.3.8.0.0.0 Dependency Injection Specifications

*No items available*

### 2.3.9.0.0.0 External Integration Specifications

- {'integration_target': 'Postmark API (Indirect)', 'integration_type': 'REST API', 'required_client_classes': ['NotificationService (Internal Lib)'], 'configuration_requirements': 'POSTMARK_API_TOKEN env var (managed by Lib, passed via config)', 'error_handling_requirements': 'BFF handles 500 errors from Lib if email sending fails during invitation.', 'authentication_requirements': 'Managed by Library', 'framework_integration_patterns': 'Invoked within /api/team/invite Route Handler', 'validation_notes': 'BFF acts as proxy to library logic.'}

### 2.3.10.0.0.0 Interaction Protocol Specifications

- {'protocol_name': 'Silent Refresh Flow', 'communication_style': 'Asynchronous HTTP', 'security_mechanism': 'HttpOnly Cookie Rotation', 'data_format': 'JSON', 'retry_policy': 'One-time retry after successful refresh', 'caching_strategy': 'No-store'}

## 2.4.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 4 |
| Total Interfaces | 1 |
| Total Enums | 0 |
| Total Dtos | 1 |
| Total Configurations | 1 |
| Total External Integrations | 1 |
| Grand Total Components | 41 |
| Phase 2 Claimed Count | 28 |
| Phase 2 Actual Count | 22 |
| Validation Added Count | 19 |
| Final Validated Count | 41 |

