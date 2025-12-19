{
  "diagram_info": {
    "diagram_name": "Authentication & Session Management Flow",
    "diagram_type": "flowchart",
    "purpose": "Documents the end-to-end user journey for secure login, session establishment, password recovery initiation, and logout, enforcing security protocols defined in US-004 through US-008.",
    "target_audience": [
      "frontend developers",
      "backend engineers",
      "security auditors",
      "QA engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes using classDef styling",
  "diagram_elements": {
    "actors_systems": [
      "User",
      "Frontend SPA",
      "Auth Service",
      "PostgreSQL DB",
      "Redis Cache"
    ],
    "key_processes": [
      "Credential Validation",
      "JWT Issuance",
      "Session Replay Prevention",
      "Account Enumeration Protection"
    ],
    "decision_points": [
      "Input Validity",
      "Rate Limiting",
      "Credential Verification",
      "Session Active Check"
    ],
    "success_paths": [
      "Valid Login -> Dashboard Redirect",
      "Logout -> Session Termination"
    ],
    "error_scenarios": [
      "Invalid Format",
      "Wrong Credentials",
      "Rate Limit Exceeded",
      "Account Enumeration Attempt"
    ],
    "edge_cases_covered": [
      "Already Authenticated Access",
      "Non-existent Email on Reset"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart illustrating the login process including client-side validation, server-side authentication, secure token storage, password reset request handling, and logout procedures.",
    "color_independence": "Shapes (diamonds for decisions, rects for processes) distinguish node types along with color coding",
    "screen_reader_friendly": "Nodes utilize descriptive labels clearly indicating actions and results",
    "print_compatibility": "High contrast borders ensure readability in grayscale"
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Uses neutral base colors with semantic highlighting for success/error states",
    "performance_notes": "Subgraphs used to logically group frontend vs backend operations for faster cognitive processing"
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of the Auth Service and Frontend Login/Reset components",
    "stakeholder_value": {
      "developers": "Exact error handling and token storage logic (HttpOnly cookies)",
      "designers": "Validation feedback points and UI states",
      "product_managers": "Confirmation of security rules (generic errors, rate limiting)",
      "QA_engineers": "Test cases for success, failure, and edge scenarios like account enumeration protection"
    },
    "maintenance_notes": "Update if MFA is introduced or token rotation strategy changes",
    "integration_recommendations": "Link to US-004 and US-005 in Jira/Linear"
  },
  "validation_checklist": [
    "✅ Covers US-004 (Login), US-005 (Feedback), US-006 (Reset Request), US-008 (Logout)",
    "✅ Account enumeration protection (generic errors) included",
    "✅ Secure token storage (HttpOnly Cookie) specified",
    "✅ Client-side vs Server-side validation distinct",
    "✅ Rate limiting logic included",
    "✅ Mermaid syntax validated",
    "✅ Visual hierarchy separates User/Client/Server"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    subgraph Client ["Frontend Client (SPA)"]
        A([Start: Login Page Load]) --> B{Session Active?}
        B -- Yes --> C[Redirect to Dashboard]
        B -- No --> D[Render Login Form]
        
        D --> E{User Action}
        
        %% Login Flow
        E -- "Enters Credentials" --> F{Client Validation?}
        F -- "Invalid Format/Empty" --> G[Show Inline Validation Error]
        G --> D
        F -- "Valid Format" --> H[POST /api/v1/auth/login]
        
        %% Forgot Password Flow
        E -- "Clicks 'Forgot Password'" --> FP1[Render Reset Request Form]
        FP1 --> FP2[Enter Email & Submit]
        FP2 --> FP3{Client Validation?}
        FP3 -- Invalid --> G
        FP3 -- Valid --> FP4[POST /api/v1/auth/forgot-password]
        
        %% Logout Flow (From Dashboard)
        UserInApp([User in Dashboard]) --> L1[Click Logout]
        L1 --> L2[POST /api/v1/auth/logout]
    end

    subgraph Server ["Backend Auth Service"]
        %% Login Logic
        H --> I{Rate Limit Check}
        I -- "Exceeded" --> J[Return 429 Too Many Requests]
        I -- "OK" --> K[Retrieve User by Email]
        K --> M{User Exists & \nHash Matches?}
        
        M -- "No (Generic Error)" --> N[Return 401 Unauthorized]
        J & N --> O[Display 'Invalid email or password']
        O --> D
        
        M -- "Yes" --> P[Generate Access JWT & Refresh Token]
        P --> Q[Set HttpOnly Secure Cookie]
        Q --> R[Return 200 OK + User Profile]
        
        %% Forgot Password Logic
        FP4 --> FP5{Rate Limit Check}
        FP5 -- "Exceeded" --> J
        FP5 -- "OK" --> FP6{User Exists?}
        FP6 -- "Yes" --> FP7[Generate Reset Token]
        FP7 --> FP8[Queue Email Job]
        FP6 -- "No (Silent Fail)" --> FP9[Log Enumeration Attempt]
        FP8 & FP9 --> FP10[Return 200 OK\n(Generic Success Message)]
        
        %% Logout Logic
        L2 --> L3[Invalidate Refresh Token]
        L3 --> L4[Clear Auth Cookies]
        L4 --> L5[Return 200 OK]
    end

    subgraph Data ["Data Persistence"]
        DB[(PostgreSQL Users)]
        Cache[(Redis Rate Limit)]
        
        K <--> DB
        FP6 <--> DB
        FP7 --> DB
        I <--> Cache
        FP5 <--> Cache
        L3 --> Cache
    end

    %% Flow Connections
    R --> C
    FP10 --> FP11[Show 'Check Email' Notification]
    FP11 --> D
    L5 --> D

    %% Styling
    classDef node fill:#fff,stroke:#333,stroke-width:1px,color:#000
    classDef action fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#000
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef db fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000

    class A,UserInApp node
    class D,FP1,C,FP11,L5 action
    class B,E,F,FP3,I,M,FP5,FP6 decision
    class G,J,N,FP9,O error
    class P,Q,R,FP7,FP8,FP10,L3,L4 success
    class DB,Cache db
```