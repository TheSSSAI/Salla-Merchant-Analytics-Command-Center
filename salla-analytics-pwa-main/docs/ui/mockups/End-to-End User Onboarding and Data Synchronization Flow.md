{
  "diagram_info": {
    "diagram_name": "End-to-End User Onboarding and Data Synchronization Flow",
    "diagram_type": "flowchart",
    "purpose": "To visualize the complete user journey from initial registration through legal compliance, Salla store connection, and the asynchronous historical data synchronization process, including error handling and state updates.",
    "target_audience": [
      "Developers",
      "Product Managers",
      "QA Engineers"
    ],
    "complexity_level": "High",
    "estimated_review_time": "5-10 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for vertical flow with clear separation between User/Frontend actions and Backend/Async processes.",
  "diagram_elements": {
    "actors_systems": [
      "New Merchant",
      "Frontend SPA",
      "Backend API",
      "Salla Platform",
      "PostgreSQL DB",
      "Worker Service (QStash)"
    ],
    "key_processes": [
      "Account Registration",
      "DPA Acceptance",
      "OAuth 2.0 Flow",
      "Import Depth Selection",
      "ETL Data Sync"
    ],
    "decision_points": [
      "Validation Checks",
      "OAuth Consent",
      "Sync Success/Failure",
      "User Retry Action"
    ],
    "success_paths": [
      "Registration -> Connection -> Sync -> Dashboard Ready"
    ],
    "error_scenarios": [
      "Registration Validation Fail",
      "Salla Auth Denied",
      "Sync Job Terminal Failure"
    ],
    "edge_cases_covered": [
      "Retry Logic for Failed Sync",
      "Partial Dashboard Access during Sync"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart detailing the merchant onboarding process: Registration, Legal Acceptance, Salla OAuth Connection, Historical Data Import selection, and the asynchronous synchronization loop leading to a populated dashboard.",
    "color_independence": "Shapes and text labels distinguish process steps from decisions and data storage.",
    "screen_reader_friendly": "Logical flow from top to bottom with clearly labeled decision branches.",
    "print_compatibility": "High contrast lines and text suitable for black and white printing."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Uses subgraphs to maintain structure on different screen widths",
    "theme_compatibility": "Neutral color palette works in light and dark modes",
    "performance_notes": "Nodes grouped logically to minimize crossing lines"
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of the onboarding wizard and background sync architecture.",
    "stakeholder_value": {
      "developers": "Defines exact state transitions and API trigger points.",
      "designers": "Maps the required UI states (Loading, Success, Failure, Dashboard Placeholder).",
      "product_managers": "Visualizes the critical path to value (TTV).",
      "QA_engineers": "Provides a map for creating end-to-end integration test scenarios."
    },
    "maintenance_notes": "Update if Salla OAuth requirements change or if new onboarding steps (e.g., Payment Setup) are added.",
    "integration_recommendations": "Link to US-001, US-009, and US-012 in Jira/Linear."
  },
  "validation_checklist": [
    "✅ Registration validation logic included",
    "✅ Salla OAuth failure paths covered",
    "✅ Async job queueing and status polling visualized",
    "✅ Error recovery (Restart Sync) path included",
    "✅ Legal compliance (DPA) step included",
    "✅ Clear separation of client-side and server-side logic"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Define Styles
    classDef userAction fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000
    classDef systemProcess fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    classDef external fill:#fff3e0,stroke:#e65100,stroke-width:2px,stroke-dasharray: 5 5,color:#000
    classDef database fill:#e0f2f1,stroke:#004d40,stroke-width:2px,shape:cylinder,color:#000
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,shape:rhombus,color:#000
    classDef error fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000

    start((Start)) --> RegForm[User Fills Registration Form]
    class RegForm userAction

    subgraph "Phase 1: Registration & Compliance"
        RegForm --> Validate{Input Valid?}
        class Validate decision
        Validate -- No --> RegError[Show Validation Errors]
        class RegError error
        RegError --> RegForm
        Validate -- Yes --> CreateUser[Create User & Merchant Account]
        class CreateUser systemProcess
        CreateUser --> DB_User[(Insert User/Merchant)]
        class DB_User database
        DB_User --> ShowDPA[Display Data Processing Addendum]
        class ShowDPA userAction
        ShowDPA --> AcceptDPA{User Accepts DPA?}
        class AcceptDPA decision
        AcceptDPA -- No --> Block[Block Access / Stay on Page]
        AcceptDPA -- Yes --> LogDPA[Log Acceptance & timestamp]
        class LogDPA systemProcess
    end

    subgraph "Phase 2: Store Integration (Salla)"
        LogDPA --> ConnectClick[User Clicks 'Connect Salla Store']
        class ConnectClick userAction
        ConnectClick --> OAuthStart[Redirect to Salla Authorization]
        OAuthStart --> SallaLogin[User Logs in to Salla & Grants Permissions]
        class SallaLogin external
        SallaLogin --> Callback{Auth Success?}
        class Callback decision
        Callback -- Denied/Error --> AuthError[Show 'Connection Failed' Error]
        class AuthError error
        AuthError --> ConnectClick
        Callback -- Success (Code) --> TokenEx[Exchange Code for Tokens]
        class TokenEx systemProcess
        TokenEx --> EncryptTokens[Encrypt & Store Tokens]
        class EncryptTokens systemProcess
        EncryptTokens --> DB_Tokens[(Update Merchant Credentials)]
        class DB_Tokens database
    end

    subgraph "Phase 3: Data Synchronization Setup"
        DB_Tokens --> SelectDepth[User Selects Import Depth\n12 vs 24 Months]
        class SelectDepth userAction
        SelectDepth --> TriggerSync[User Clicks 'Start Import']
        TriggerSync --> QueueJob[Enqueue 'InitialSync' Job]
        class QueueJob systemProcess
        QueueJob --> QStash{Queue System}
        class QStash external
    end

    subgraph "Phase 4: Asynchronous Processing & UX"
        QStash --> Worker[Worker Consumes Job]
        class Worker systemProcess
        
        %% Frontend Polling Loop
        TriggerSync --> Dashboard[Redirect to Dashboard\n'Sync In Progress' State]
        class Dashboard userAction
        Dashboard --> PollStatus[Frontend Polls /api/sync/status]
        PollStatus -- Status: RUNNING --> UpdateBar[Update Progress Bar]
        UpdateBar --> PollStatus
        
        %% Backend Worker Logic
        Worker --> FetchData[Fetch Salla Data Pages]
        class FetchData systemProcess
        FetchData --> Transform[Transform & Bulk Insert]
        Transform --> DB_Data[(Write to OLTP DB)]
        class DB_Data database
        DB_Data --> UpdateProgress[Update Job Status %]
        
        %% Sync Decision
        FetchData --> SyncSuccess{Job Success?}
        class SyncSuccess decision
        SyncSuccess -- No (Retries Exhausted) --> MarkFailed[Set Status: FAILED]
        class MarkFailed error
        MarkFailed --> NotifyFail[Send Failure Email & In-App Alert]
        
        SyncSuccess -- Yes --> MarkComplete[Set Status: COMPLETED]
        class MarkComplete systemProcess
        MarkComplete --> TriggerCDC[Trigger CDC for OLAP]
        MarkComplete --> NotifySuccess[Send Success Email & In-App Toast]
    end

    subgraph "Phase 5: User Activation"
        NotifyFail --> ShowFailUI[Dashboard: Show 'Sync Failed' Banner]
        ShowFailUI --> RestartClick[User Clicks 'Restart Sync']
        class RestartClick userAction
        RestartClick --> QueueJob
        
        NotifySuccess --> UnlockUI[Dashboard: Enable Full Analytics]
        class UnlockUI systemProcess
        PollStatus -- Status: COMPLETED --> UnlockUI
        UnlockUI --> End((Onboarding Complete))
    end

    %% Relationships
    UpdateProgress -.-> PollStatus
```