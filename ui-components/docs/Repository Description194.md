# 1 Id

REPO-LIB-UI-001

# 2 Name

ui-components

# 3 Description

This repository contains the project's reusable React component library, extracted from the original monorepo's `@acme/ui` package. It is built upon shadcn/ui and Tailwind CSS and provides a comprehensive set of shared components like data tables, charts, modals, and layout primitives. Its single responsibility is to provide a consistent, themeable, and accessible set of UI building blocks for the main PWA and any potential future web applications. By isolating the UI library, a dedicated frontend or design systems team can iterate on it independently, running visual regression tests and managing its lifecycle through Storybook. It is published as a versioned NPM package, ensuring that consumers like `salla-analytics-pwa-main` receive stable and predictable updates, fulfilling REQ-OVR-005.

# 4 Type

🔹 Cross-Cutting Library

# 5 Namespace

Salla.Analytics.UI

# 6 Output Path

dist

# 7 Framework

React

# 8 Language

TypeScript

# 9 Technology

shadcn/ui, Tailwind CSS, Storybook, Recharts

# 10 Thirdparty Libraries

- react
- tailwindcss
- class-variance-authority
- recharts

# 11 Layer Ids

- presentation-layer

# 12 Dependencies

*No items available*

# 13 Requirements

## 13.1 Requirement Id

### 13.1.1 Requirement Id

REQ-OVR-005

## 13.2.0 Requirement Id

### 13.2.1 Requirement Id

REQ-INT-005

# 14.0.0 Generate Tests

✅ Yes

# 15.0.0 Generate Documentation

✅ Yes

# 16.0.0 Architecture Style

Component Library

# 17.0.0 Architecture Map

*No items available*

# 18.0.0 Components Map

*No items available*

# 19.0.0 Requirements Map

- REQ-UI-004
- REQ-UI-005

# 20.0.0 Decomposition Rationale

## 20.1.0 Operation Type

NEW_DECOMPOSED

## 20.2.0 Source Repository

REPO-APP-001

## 20.3.0 Decomposition Reasoning

Extracted to create a fully independent, versionable, and reusable UI component library. This separation enables specialized development by a frontend team, enforces design consistency, and allows for isolated testing and documentation (e.g., via Storybook). It decouples the application's look-and-feel from its core logic.

## 20.4.0 Extracted Responsibilities

- Implementation of all shared React components.
- Theming and styling logic.
- Component documentation and examples.

## 20.5.0 Reusability Scope

- Can be used by any React-based frontend in the organization.
- Serves as the foundation for a potential design system.

## 20.6.0 Development Benefits

- Allows UI development to proceed in parallel with backend development.
- Reduces build times for the main application.
- Enforces a clean separation between presentation and business logic.

# 21.0.0 Dependency Contracts

*No data available*

# 22.0.0 Exposed Contracts

## 22.1.0 Public Interfaces

- {'interface': 'React Component Exports', 'methods': [], 'events': [], 'properties': ['Button: React.Component', 'Chart: React.Component', 'Table: React.Component'], 'consumers': ['REPO-APP-CORE-001']}

# 23.0.0 Integration Patterns

| Property | Value |
|----------|-------|
| Dependency Injection | N/A (Components are imported and used declarativel... |
| Event Communication | Uses standard React callback props (e.g., `onClick... |
| Data Flow | Components receive data via props from their consu... |
| Error Handling | Implements local error boundaries for complex comp... |
| Async Patterns | N/A |

# 24.0.0 Technology Guidance

| Property | Value |
|----------|-------|
| Framework Specific | All components should be documented in Storybook w... |
| Performance Considerations | Use `React.memo` for expensive components. Lazy-lo... |
| Security Considerations | Sanitize any HTML passed via props to prevent XSS ... |
| Testing Approach | Unit tests for component logic using Jest and Reac... |

# 25.0.0 Scope Boundaries

## 25.1.0 Must Implement

- Purely presentational components.
- Theming variables and CSS utilities.

## 25.2.0 Must Not Implement

- Data fetching logic.
- Application-specific business logic.
- State management that affects the global application state.

## 25.3.0 Extension Points

- Components should accept a `className` prop for style overrides and be composed using `children` props.

## 25.4.0 Validation Rules

- PropTypes should be defined for all components to ensure correct usage in JavaScript environments.

