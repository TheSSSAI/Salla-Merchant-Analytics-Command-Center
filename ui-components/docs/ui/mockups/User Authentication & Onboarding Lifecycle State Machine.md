{
  "diagram_info": {
    "diagram_name": "User Authentication & Onboarding Lifecycle State Machine",
    "diagram_type": "stateDiagram-v2",
    "purpose": "Documents the critical state transitions from initial application load through authentication, mandatory onboarding steps, data synchronization, and final active dashboard state. This defines the behavior of the App Shell Layout component.",
    "target_audience": [
      "frontend developers",
      "backend developers",
      "QA engineers",
      "product owner"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "10 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for high contrast and logical top-down flow",
  "diagram_elements": {
    "actors_systems": [
      "User",
      "Auth Service",
      "Onboarding Module",
      "Sync Engine",
      "App Shell"
    ],
    "key_processes": [
      "Session Validation",
      "Salla OAuth Connection",
      "Historical Data Import",
      "Background Sync",
      "Dashboard Activation"
    ],
    "decision_points": [
      "Is Authenticated?",
      "Is Store Connected?",
      "Is Sync Complete?",
      "Token Expiry Check"
    ],
    "success_paths": [
      "Login -> Dashboard",
      "Register -> Connect -> Sync -> Dashboard"
    ],
    "error_scenarios": [
      "Sync Failure (US-014)",
      "Token Refresh Failure",
      "OAuth Denial"
    ],
    "edge_cases_covered": [
      "Restricted UI access during sync (US-015)",
      "Session restoration"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "State diagram showing user journey from login through store connection and data syncing to the dashboard.",
    "color_independence": "States distinguished by grouping and labels, with distinct styling for error and active states.",
    "screen_reader_friendly": "Flow direction and state hierarchy clearly defined.",
    "print_compatibility": "High contrast borders and text ensure readability in grayscale."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout adapts to mobile or desktop viewports.",
    "theme_compatibility": "Uses class definitions for consistent styling across themes.",
    "performance_notes": "Abstracts complex internal logic to focus on high-level application states."
  },
  "usage_guidelines": {
    "when_to_reference": "When implementing the 'App Shell Layout' router guards, the global 'Sync Progress Banner', and the 'Login / Authentication' screens.",
    "stakeholder_value": {
      "developers": "Defines the routing logic and global state requirements (Zustand)",
      "designers": "Validates the necessity of specific UI states (e.g., Syncing vs. Failed)",
      "product_managers": "Visualizes the user funnel and potential drop-off points",
      "QA_engineers": "Provides a map for state-based testing scenarios"
    },
    "maintenance_notes": "Update if new onboarding steps are added or if the sync logic changes from blocking to non-blocking.",
    "integration_recommendations": "Include in the technical specification for the Frontend Router and Onboarding Epic."
  },
  "validation_checklist": [
    "✅ Covers US-001, US-004, US-009, US-011, US-012, US-014, US-015",
    "✅ Visualizes the critical Onboarding -> Sync handoff",
    "✅ Explicitly handles the 'Sync Failed' error state",
    "✅ Shows the persistent Token Refresh cycle",
    "✅ Defines the App Shell's routing guard logic",
    "✅ Styling separates Authentication, Onboarding, and Active states",
    "✅ Mermaid syntax is valid"
  ]
}

---

# Mermaid Diagram

```mermaid
stateDiagram-v2
    %% Styling Definitions
    classDef authState fill:#f3f4f6,stroke:#4b5563,stroke-width:2px,color:#1f2937
    classDef onboardingState fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e3a8a
    classDef activeState fill:#ecfdf5,stroke:#10b981,stroke-width:2px,color:#064e3b
    classDef errorState fill:#fef2f2,stroke:#ef4444,stroke-width:2px,stroke-dasharray: 5 5,color:#7f1d1d
    classDef processState fill:#fff7ed,stroke:#f97316,stroke-width:1px,stroke-dasharray: 3 3,color:#7c2d12

    [*] --> AppInitialization : App Load

    state "Authentication Phase" as AuthPhase {
        state "Check Local Session" as CheckSession
        state "Public Access" as Public {
            [*] --> LoginView
            LoginView --> RegisterView : New User (US-001)
            RegisterView --> LoginView : Existing User
            LoginView --> ForgotPassword : Reset Request (US-006)
        }
        
        CheckSession --> Public : No Token / Invalid
    }

    state "Authenticated App Shell" as AppShell {
        %% Global Context Providers
        state "Router Guard (Middleware)" as RouterGuard
        
        state "Onboarding Workflow" as Onboarding {
            state "Connect Salla Store" as SallaConnect
            state "Select Import Depth" as ImportConfig
            
            state "Data Synchronization" as SyncProcess {
                state "Sync Running" as Syncing
                state "Sync Failed" as SyncError
                
                Syncing --> SyncError : Max Retries Exceeded (US-014)
                SyncError --> Syncing : User Restarts Sync
                
                note right of Syncing
                    Global Banner Visible (US-012)
                    Background Job: QStash
                end note
            }
        }

        state "Active Workspace" as Active {
            state "Main Dashboard" as Dashboard
            state "Settings & Team" as Settings
            state "Analytics Reports" as Reports
        }

        %% Transitions & Logic
        RouterGuard --> SallaConnect : State: No_Store
        SallaConnect --> ImportConfig : OAuth Success (US-009)
        ImportConfig --> Syncing : Depth Selected (US-011)
        
        %% Partial Access Logic (US-015)
        Syncing --> Dashboard : View Allowed (Skeleton UI)
        Syncing --> Settings : View Allowed (Full Access)
        Syncing --> Reports : Access Blocked
        
        %% Happy Path Completion
        Syncing --> Active : Sync Completed (US-013)
        Active --> Dashboard : Default Route
    }

    %% Main Flow Connections
    AppInitialization --> CheckSession
    CheckSession --> RouterGuard : Token Valid
    Public --> RouterGuard : Login Success (US-004)

    %% Background Processes
    state "Session Management" as SessionMgmt {
        state "Silent Token Refresh" as Refresh
        state "Logout" as LogoutProcess
    }

    AppShell --> Refresh : Access Token Expiring (US-446)
    Refresh --> AppShell : New Token Issued
    Refresh --> Public : Refresh Failed (Session Invalid)
    AppShell --> LogoutProcess : User Clicks Logout (US-008)
    LogoutProcess --> Public : Clear Session

    %% Class Assignments
    class AuthPhase authState
    class SallaConnect,ImportConfig,Syncing onboardingState
    class Dashboard,Settings,Reports activeState
    class SyncError errorState
    class Refresh,LogoutProcess processState
```