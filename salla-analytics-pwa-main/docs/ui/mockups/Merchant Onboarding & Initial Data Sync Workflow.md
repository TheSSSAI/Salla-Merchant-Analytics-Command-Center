{
  "diagram_info": {
    "diagram_name": "Merchant Onboarding & Initial Data Sync Workflow",
    "diagram_type": "flowchart",
    "purpose": "Documents the end-to-end user journey and backend processes for connecting a Salla store, selecting data import depth, and handling the asynchronous synchronization process, including error states and user notifications.",
    "target_audience": [
      "Frontend Developers",
      "Backend Engineers",
      "Product Managers",
      "QA Engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "diagram_elements": {
    "actors_systems": [
      "Merchant User",
      "Frontend SPA",
      "Backend API",
      "Salla OAuth",
      "Background Worker",
      "Notification Service"
    ],
    "key_processes": [
      "OAuth Authorization",
      "Import Depth Selection",
      "Async Data Sync",
      "Status Polling",
      "Failure Recovery"
    ],
    "decision_points": [
      "OAuth Success?",
      "Job Queue Success?",
      "Sync Successful?",
      "Retry Attempt?"
    ],
    "success_paths": [
      "Registration -> OAuth -> 24mo Import -> Sync Complete -> Dashboard Active"
    ],
    "error_scenarios": [
      "OAuth Denied",
      "Sync Job Failure",
      "API Error during Setup"
    ],
    "edge_cases_covered": [
      "User navigating away during sync",
      "Token mismatch",
      "Retry logic"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart illustrating the merchant onboarding process, detailing the Salla store connection, historical data import selection, background synchronization steps, and handling of success/failure notifications.",
    "color_independence": "Shapes and text labels distinguish states (diamonds for decisions, rectangles for processes).",
    "screen_reader_friendly": "Flow is logical top-down with descriptive node labels.",
    "print_compatibility": "High contrast black and white compatible."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Neutral styling with specific status colors",
    "performance_notes": "Uses subgraphs to group frontend and backend logic for clarity"
  },
  "usage_guidelines": {
    "when_to_reference": "When implementing the onboarding wizard or debugging data sync issues.",
    "stakeholder_value": {
      "developers": "Defines the state machine for sync status and API interactions.",
      "designers": "Visualizes the UI states (Loading, Error, Success) needed for the dashboard.",
      "product_managers": "Validates the user experience during long-running processes.",
      "QA_engineers": "Provides a map for testing OAuth failures and Sync retry scenarios."
    },
    "maintenance_notes": "Update if Salla API authentication flow changes or new import options are added.",
    "integration_recommendations": "Link to US-009, US-011, US-012, US-014 ticket definitions."
  },
  "validation_checklist": [
    "✅ OAuth flow includes success and failure paths",
    "✅ Data import depth selection is represented",
    "✅ Asynchronous sync job handling is detailed",
    "✅ UI states (Restricted vs. Full Access) are clear",
    "✅ Error recovery (Retry) loops are included",
    "✅ Notification triggers are mapped",
    "✅ Syntax validated"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Nodes and Styles
    classDef userAction fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000
    classDef systemProcess fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    classDef externalSystem fill:#fff3e0,stroke:#e65100,stroke-width:2px,stroke-dasharray: 5 5,color:#000
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,shape:rhombus,color:#000
    classDef stateSuccess fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef stateError fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#000

    subgraph User_Onboarding_UI ["Frontend SPA: User Journey"]
        Start([Start: Account Created]) --> ConnectStore[User Clicks 'Connect Salla Store']
        ConnectStore --> SallaRedirect[Redirect to Salla OAuth]
        
        SallaCallback{Auth Successful?}
        SallaCallback -- No/Denied --> ErrorPage[Display 'Connection Denied' Error]
        ErrorPage -- User Retries --> ConnectStore
        
        SallaCallback -- Yes --> SelectImport[Display 'Select Import Depth']
        SelectImport --> |Select 12 or 24 Months| StartSync[User Clicks 'Start Import']
        
        StartSync --> InitSyncAPI{API Req Success?}
        InitSyncAPI -- No --> APIError[Show 'Failed to Start' Toast]
        APIError --> StartSync
        
        InitSyncAPI -- Yes --> DashboardLoad[Load Main Dashboard]
        DashboardLoad --> RestrictedView[UI: 'Sync In Progress' Banner\nDisabled: Analytics/AI\nEnabled: Settings/Team]
        
        RestrictedView --> PollStatus{Poll /api/sync/status}
        
        PollStatus -- Status: FAILED --> FailBanner[UI: 'Sync Failed' Banner\nShow 'Restart Sync' Button]
        FailBanner -- User Clicks Retry --> RestartSync[Call Restart API]
        
        PollStatus -- Status: COMPLETED --> SuccessNotification[UI: Remove Banner\nShow Success Toast]
        SuccessNotification --> FullAccess[Full Dashboard Access\nAnalytics & AI Enabled]
    end

    subgraph Backend_Services ["Backend System & Infrastructure"]
        SallaRedirect -.-> SallaAuth((Salla Platform))
        SallaAuth -.-> |Callback with Code| TokenExchange[Exchange Code for Tokens]
        TokenExchange --> SaveTokens[(Store Encrypted Tokens)]
        SaveTokens --> SallaCallback
        
        StartSync -.-> |POST /api/sync/initial| QueueJob[Queue 'InitialSync' Job]
        RestartSync -.-> |POST /api/sync/restart| QueueJob
        QueueJob --> InitSyncAPI
        
        subgraph Async_Worker ["Background Worker (QStash/Lambda)"]
            ProcessJob([Worker Pick Up Job])
            ProcessJob --> FetchData[Fetch History from Salla API]
            FetchData --> TransformData[Transform & Normalize]
            TransformData --> LoadData[(Insert to Postgres/ClickHouse)]
            
            LoadData --> CheckErrors{Errors > Retry Limit?}
            CheckErrors -- Yes --> MarkFailed[Update DB: Status = FAILED]
            CheckErrors -- No --> MoreData{More Pages?}
            
            MoreData -- Yes --> UpdateProgress[Update DB: % Progress]
            UpdateProgress --> FetchData
            
            MoreData -- No --> MarkComplete[Update DB: Status = COMPLETED]
        end
        
        QueueJob -.-> ProcessJob
        MarkFailed --> NotifyFail[Trigger Email: Sync Failed]
        MarkComplete --> NotifySuccess[Trigger Email: Sync Complete]
    end

    %% Cross-graph connections for status polling
    UpdateProgress -.-> PollStatus
    MarkFailed -.-> PollStatus
    MarkComplete -.-> PollStatus

    %% Applying Styles
    class Start,ConnectStore,StartSync,RestartSync userAction
    class TokenExchange,QueueJob,FetchData,TransformData,MarkFailed,MarkComplete,NotifyFail,NotifySuccess,UpdateProgress systemProcess
    class SallaAuth externalSystem
    class SallaCallback,InitSyncAPI,CheckErrors,MoreData,PollStatus decision
    class FullAccess,SuccessNotification stateSuccess
    class ErrorPage,APIError,FailBanner stateError

    %% Explicit link descriptions
    linkStyle default stroke-width:2px,fill:none,stroke:#333
```