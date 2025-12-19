{
  "diagram_info": {
    "diagram_name": "SaaS Platform Merchant User Journey",
    "diagram_type": "flowchart",
    "purpose": "To visualize the complete end-to-end workflow of a Merchant user within the SaaS platform, encompassing onboarding, data analysis, AI interaction, and cart recovery automation.",
    "target_audience": [
      "Product Managers",
      "UX Designers",
      "Frontend Developers",
      "QA Engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "diagram_elements": {
    "actors_systems": [
      "Merchant User",
      "SaaS Platform",
      "Salla Platform",
      "Shopper (Indirect)"
    ],
    "key_processes": [
      "Registration",
      "OAuth Connection",
      "Data Synchronization",
      "Analytics Exploration",
      "Cart Recovery Setup"
    ],
    "decision_points": [
      "Connect Salla Store?",
      "Select Sync Depth",
      "Interact with AI or Reports?",
      "Configure Recovery Campaign?"
    ],
    "success_paths": [
      "Complete Onboarding -> Dashboard -> Insights -> Action"
    ],
    "error_scenarios": [
      "Salla Connection Denied",
      "Sync Failure"
    ],
    "edge_cases_covered": [
      "Waiting for Sync",
      "No Data Available"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart depicting the merchant's journey from sign-up to managing cart recovery campaigns, including onboarding steps and analytical interactions.",
    "color_independence": "Shapes and text labels distinguish process steps from decisions and outcomes",
    "screen_reader_friendly": "Flow is structured logically top-to-bottom",
    "print_compatibility": "High contrast borders and text"
  },
  "technical_specifications": {
    "mermaid_version": "10.0+",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Neutral colors suitable for light and dark modes",
    "performance_notes": "Standard node count, fast rendering"
  },
  "usage_guidelines": {
    "when_to_reference": "During UX design reviews, onboarding flow implementation, and integration testing planning.",
    "stakeholder_value": {
      "developers": "Understanding the dependencies between onboarding and feature availability",
      "designers": "Mapping UI states for empty, loading, and active data views",
      "product_managers": "Validating the user value loop from insight to action",
      "qa_engineers": "Defining end-to-end test scenarios"
    },
    "maintenance_notes": "Update if new modules (e.g., Inventory Management) are added to the user journey.",
    "integration_recommendations": "Include in the Onboarding Epic documentation."
  },
  "validation_checklist": [
    "✅ Registration and Auth flow included",
    "✅ Critical Salla OAuth step mapped",
    "✅ Data Sync wait states represented",
    "✅ Core feature usage (Analytics, AI, Recovery) shown",
    "✅ Loop closing (Actions leading to results) visualized",
    "✅ Error handling for initial connection included",
    "✅ Mermaid syntax validated"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Nodes
    Start([User Visits Landing Page])
    SignUp[Sign Up / Register]
    
    subgraph Onboarding [Phase 1: Onboarding & Connection]
        direction TB
        AuthDetails{Valid Credentials?}
        Terms[Accept Terms & Privacy]
        ConnectSalla[Click 'Connect Salla Store']
        SallaOAuth{{Redirect to Salla OAuth}}
        SallaAuthDecision{User Approves?}
        ImportDepth[Select Data History Depth\n12 vs 24 Months]
        StartSync[Initiate Data Sync]
        SyncWait[Dashboard: Sync In-Progress State]
    end

    subgraph CoreExperience [Phase 2: Insights & Analysis]
        direction TB
        Dashboard([Main Dashboard])
        
        subgraph DeepAnalytics [Analytics Module]
            ViewReports[View Reports]
            FilterData{Apply Filters?}
            DrillDown[Drill Down: Sales/Product/Customer]
            ExportCSV[Export Data to CSV]
        end
        
        subgraph AI_Interaction [AI Assistant Module]
            AskAI[Ask Natural Language Question]
            AIProcess{{RAG Processing}}
            AIResult[View Text/Chart Answer]
            AISuggest[View Proactive Insight Cards]
        end
    end

    subgraph ActionLoop [Phase 3: Action & Recovery]
        direction TB
        NavRecovery[Navigate to Cart Recovery]
        ConfigDomain[Configure Sending Domain]
        CreateTemplate[Create/Edit Email Template]
        DefineSequence[Define Multi-step Sequence]
        ActivateCampaign{Activate Campaign?}
        CampaignRunning((Campaign Active))
    end

    %% Relationships
    Start --> SignUp
    SignUp --> AuthDetails
    AuthDetails -- Invalid --> SignUp
    AuthDetails -- Valid --> Terms
    Terms --> ConnectSalla
    ConnectSalla --> SallaOAuth
    SallaOAuth --> SallaAuthDecision
    
    SallaAuthDecision -- Denied --> ErrorConn[Show Connection Error]
    ErrorConn --> ConnectSalla
    
    SallaAuthDecision -- Approved --> ImportDepth
    ImportDepth --> StartSync
    StartSync --> SyncWait
    
    SyncWait -- Sync Complete Notification --> Dashboard
    
    Dashboard --> ViewReports
    ViewReports --> FilterData
    FilterData -- Yes --> DrillDown
    FilterData -- No --> DrillDown
    DrillDown --> ExportCSV
    
    Dashboard --> AskAI
    AskAI --> AIProcess --> AIResult
    Dashboard --> AISuggest
    
    Dashboard -- Identify Opportunity --> NavRecovery
    AISuggest -- "Suggestion: Fix Abandoned Carts" --> NavRecovery
    
    NavRecovery --> ConfigDomain
    ConfigDomain --> CreateTemplate
    CreateTemplate --> DefineSequence
    DefineSequence --> ActivateCampaign
    
    ActivateCampaign -- No --> DefineSequence
    ActivateCampaign -- Yes --> CampaignRunning
    
    CampaignRunning -- "Recovered Sales Data" --> Dashboard

    %% Styling
    classDef startend fill:#f9f9f9,stroke:#333,stroke-width:2px,color:#000
    classDef process fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000
    classDef external fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,stroke-dasharray: 5 5,color:#000
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#000
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000

    class Start,Dashboard startend
    class SignUp,Terms,ConnectSalla,ImportDepth,StartSync,ViewReports,DrillDown,ExportCSV,AskAI,AIResult,AISuggest,NavRecovery,ConfigDomain,CreateTemplate,DefineSequence process
    class AuthDetails,SallaAuthDecision,FilterData,ActivateCampaign decision
    class SallaOAuth,AIProcess external
    class ErrorConn error
    class CampaignRunning,SyncWait success
```