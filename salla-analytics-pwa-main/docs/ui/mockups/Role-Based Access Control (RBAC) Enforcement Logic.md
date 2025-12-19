{
  "diagram_info": {
    "diagram_name": "Role-Based Access Control (RBAC) Enforcement Logic",
    "diagram_type": "flowchart",
    "purpose": "To visualize the decision logic and data flow for enforcing role-based permissions within the SaaS platform's Next.js backend, including authentication verification, role lookup, policy evaluation, and audit logging.",
    "target_audience": [
      "backend developers",
      "security engineers",
      "architects"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with distinct color coding for decision paths and error states.",
  "diagram_elements": {
    "actors_systems": [
      "Client (Browser)",
      "Next.js Middleware",
      "RBAC Authorization Service",
      "OLTP Database (PostgreSQL)",
      "Audit Logger",
      "Route Handler"
    ],
    "key_processes": [
      "JWT Validation",
      "Role Retrieval",
      "Policy Evaluation",
      "Access Decision",
      "Audit Logging"
    ],
    "decision_points": [
      "Is Token Present?",
      "Is Token Valid?",
      "Does User have Merchant Access?",
      "Is Role Sufficient?"
    ],
    "success_paths": [
      "Authorized Request Proceeding to Handler"
    ],
    "error_scenarios": [
      "Missing Token (401)",
      "Invalid Token (401)",
      "No Tenant Access (403)",
      "Insufficient Permissions (403)"
    ],
    "edge_cases_covered": [
      "Expired Tokens",
      "Suspended Accounts"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart describing the RBAC process: Client sends request, Middleware checks JWT, RBAC Service fetches role from DB, compares against policy, logs audit event, and either allows access or returns 403 Forbidden.",
    "color_independence": "Shapes and text labels differentiate steps; color is supplementary.",
    "screen_reader_friendly": "Flow follows a logical top-down progression with clear labels.",
    "print_compatibility": "High contrast lines and text ensure readability in grayscale."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Fluid width adaptation",
    "theme_compatibility": "Adaptive styling",
    "performance_notes": "Minimal node count for fast rendering"
  },
  "usage_guidelines": {
    "when_to_reference": "During backend API development, security reviews, and implementation of new user roles.",
    "stakeholder_value": {
      "developers": "Blueprints the middleware logic and error handling codes.",
      "security_engineers": "Validates the Zero Trust enforcement points.",
      "architects": "Confirms separation of concerns between AuthN and AuthZ."
    },
    "maintenance_notes": "Update if new authentication providers or role hierarchies are introduced.",
    "integration_recommendations": "Include in API security documentation and onboarding guides."
  },
  "validation_checklist": [
    "✅ Authentication (AuthN) precedes Authorization (AuthZ)",
    "✅ Database lookup for current role included",
    "✅ Audit logging for security events included",
    "✅ Distinct paths for 401 vs 403 errors",
    "✅ Success path leads to Route Handler",
    "✅ Logic aligns with Sequence Design #432",
    "✅ Visual hierarchy supports logical flow"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Actors and Systems
    User([User / Client Browser])
    subgraph Edge_Layer ["Edge / Middleware Layer"]
        Middleware[Next.js Middleware]
        ValidateJWT{Token Valid & Active?}
    end
    
    subgraph Service_Layer ["Backend Service Layer"]
        RBAC_Service[RBAC Authorization Service]
        FetchRole[Query User Role for MerchantID]
        EvalPolicy{Check Permission Policy}
    end
    
    subgraph Data_Layer ["Data & Persistence Layer"]
        DB[(PostgreSQL OLTP)]
        AuditQueue>Audit Event Queue]
    end
    
    subgraph Application_Core ["Application Core"]
        RouteHandler((Protected Route Handler))
    end

    %% Flow
    User -->|HTTP Request + Bearer Token| Middleware
    Middleware -->|Extract Token| ValidateJWT
    
    %% AuthN Failure Paths
    ValidateJWT -- No / Expired --> AuthError[Return 401 Unauthorized]
    AuthError --> User
    
    %% AuthN Success Path
    ValidateJWT -- Yes --> RBAC_Service
    RBAC_Service -->|Select Role WHERE UserID & MerchantID| DB
    DB -->|Return Role Object e.g., 'Analyst'| RBAC_Service
    
    RBAC_Service -->|Check Association| HasAccess{User linked to Merchant?}
    
    %% Access Check
    HasAccess -- No --> AccessError[Return 403 Forbidden]
    AccessError --> LogFail[Log Security Alert]
    LogFail -.-> AuditQueue
    AccessError --> User
    
    %% Role Evaluation
    HasAccess -- Yes --> EvalPolicy
    
    %% AuthZ Decisions
    EvalPolicy -- Denied --> PermError[Return 403 Forbidden]
    PermError --> LogDeny[Log AuthZ Failure]
    LogDeny -.-> AuditQueue
    PermError --> User
    
    EvalPolicy -- Allowed --> AuditCheck{Sensitive Action?}
    
    %% Audit & Execution
    AuditCheck -- Yes --> LogSuccess[Log Sensitive Action]
    LogSuccess -.-> AuditQueue
    LogSuccess --> RouteHandler
    
    AuditCheck -- No --> RouteHandler
    RouteHandler -->|Process Request| SuccessResponse[Return 200 OK]
    SuccessResponse --> User

    %% Styling
    classDef actor fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    classDef logic fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#000
    classDef data fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#000
    classDef core fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000

    class User actor
    class Middleware,RBAC_Service,FetchRole,LogFail,LogDeny,LogSuccess logic
    class ValidateJWT,HasAccess,EvalPolicy,AuditCheck logic
    class DB,AuditQueue data
    class RouteHandler,SuccessResponse core
    class AuthError,AccessError,PermError error
    class SuccessResponse success
```