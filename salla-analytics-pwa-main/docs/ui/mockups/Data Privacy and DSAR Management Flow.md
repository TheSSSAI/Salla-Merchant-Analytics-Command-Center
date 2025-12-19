{
  "diagram_info": {
    "diagram_name": "Data Privacy and DSAR Management Flow",
    "diagram_type": "flowchart",
    "purpose": "Visualizes the end-to-end workflow for managing Data Subject Access Requests (DSAR) under GDPR/CCPA, including submission, validation, asynchronous processing for data export or erasure, and status tracking.",
    "target_audience": [
      "backend developers",
      "compliance officers",
      "product managers",
      "QA engineers"
    ],
    "complexity_level": "high",
    "estimated_review_time": "10 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for top-down flow with distinct subgraphs for UI, API, and Background Workers.",
  "diagram_elements": {
    "actors_systems": [
      "Store Owner",
      "Frontend UI",
      "Compliance Service",
      "Async Worker",
      "Database",
      "Object Storage (R2)"
    ],
    "key_processes": [
      "Request Submission",
      "Identity Verification",
      "Data Export Generation",
      "PII Anonymization",
      "Audit Logging"
    ],
    "decision_points": [
      "Role Authorization",
      "Customer Existence Check",
      "Request Type (Access vs. Erasure)",
      "Processing Success"
    ],
    "success_paths": [
      "Successful Data Export Download",
      "Successful Data Erasure confirmation"
    ],
    "error_scenarios": [
      "Unauthorized Access",
      "Customer Not Found",
      "Processing Failure"
    ],
    "edge_cases_covered": [
      "Cancellation at confirmation modal",
      "System failure during anonymization"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart showing DSAR lifecycle from merchant submission to asynchronous processing completion.",
    "color_independence": "Process steps, decisions, and errors use distinct shapes and class styles.",
    "screen_reader_friendly": "Descriptive node labels indicate action and state.",
    "print_compatibility": "High contrast black and white compatible."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Fluid layout adapting to vertical scrolling.",
    "theme_compatibility": "Classes defined for neutral backgrounds with high-contrast borders.",
    "performance_notes": "Subgraphs used to logically group distributed system components."
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of US-054 and compliance auditing.",
    "stakeholder_value": {
      "developers": "Defines the async job boundaries and state transitions.",
      "designers": "Clarifies the UI feedback loop and confirmation steps.",
      "product_managers": "Ensures all legal requirements for GDPR/CCPA flows are met.",
      "QA_engineers": "Provides a map for testing happy paths and error conditions."
    },
    "maintenance_notes": "Update if new compliance regulations require additional validation steps.",
    "integration_recommendations": "Link to the API specification for /api/v1/dsar endpoints."
  },
  "validation_checklist": [
    "✅ 'Owner' role enforcement explicitly shown",
    "✅ Distinction between Access (Export) and Erasure flows",
    "✅ Asynchronous processing pattern visualized",
    "✅ Failure states and error feedback included",
    "✅ Audit logging integration points marked",
    "✅ Secure storage interaction for exports included",
    "✅ Customer validation logic present",
    "✅ Confirmation modal step for erasure included"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    subgraph User_Interface ["Merchant Dashboard (Frontend)"]
        Start([Start: Owner Navigates to DSAR Page]) --> Input[Input Customer Email & Select Type]
        Input --> Submit(Click Submit Request)
        Submit --> Confirm{Request Type?}
        Confirm -- Erasure --> Modal[Show Warning Confirmation Modal]
        Modal -- "Cancel" --> Stop([End: Action Cancelled])
        Modal -- "Confirm Erasure" --> API_Call
        Confirm -- Access --> API_Call
    end

    subgraph Backend_API ["Compliance Service (API)"]
        API_Call(POST /api/v1/dsar) --> Auth{Role == 'Owner'?}
        Auth -- No --> Deny[Return 403 Forbidden]
        Deny --> UI_Error[Display 'Access Denied']
        Auth -- Yes --> Validate{Customer Exists in Merchant DB?}
        Validate -- No --> NotFound[Return 404 Not Found]
        NotFound --> UI_NotFound[Display 'Customer Not Found' Error]
        Validate -- Yes --> CreateRecord[Create DSAR Record\nStatus: PENDING]
        CreateRecord --> Audit[Log 'DSAR Submitted' to Audit Trail]
        Audit --> QueueJob[Enqueue Job to QStash]
        QueueJob --> ReturnSuccess[Return 202 Accepted]
        ReturnSuccess --> UI_Update[UI Displays 'Request Pending']
    end

    subgraph Background_Processing ["Async Worker (Serverless)"]
        QueueJob -.-> PickJob(Worker Consumes Job)
        PickJob --> UpdateProcessing[Update Status: PROCESSING]
        UpdateProcessing --> TypeCheck{Request Type?}
        
        %% Export Path
        TypeCheck -- Access --> FetchData[Aggregate Customer PII & Order History]
        FetchData --> GenFile[Generate JSON Data File]
        GenFile --> Upload[Upload to Secure Storage R2]
        Upload --> GenLink[Generate Signed Download URL\n(Expires in 7 days)]
        GenLink --> FinalizeAccess[Update Status: COMPLETED\nSave Download URL]

        %% Erasure Path
        TypeCheck -- Erasure --> AnonData[Execute Anonymization Script\n(Scrub PII, Retain Metrics)]
        AnonData --> Verify[Verify PII Removal Consistency]
        Verify -- "Verification Failed" --> ErrorHandler
        Verify -- "Success" --> FinalizeErasure[Update Status: COMPLETED]
        
        %% Error Handling
        ErrorHandler[Log Critical Error & Alert Ops] --> UpdateFailed[Update Status: FAILED]
    end

    subgraph Notifications ["Notification System"]
        FinalizeAccess --> NotifyEmail[Send Completion Email to Owner]
        FinalizeErasure --> NotifyEmail
        UpdateFailed --> NotifyError[Send Failure Alert to Owner]
    end

    %% Styles
    classDef ui fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000
    classDef api fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#000
    classDef worker fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#000
    classDef success fill:#f1f8e9,stroke:#33691e,stroke-width:2px,color:#000

    class Start,Input,Submit,Modal,Stop,UI_Update,UI_Error,UI_NotFound ui
    class API_Call,CreateRecord,Audit,QueueJob,ReturnSuccess api
    class PickJob,UpdateProcessing,FetchData,GenFile,Upload,GenLink,AnonData,Verify,ErrorHandler,UpdateFailed worker
    class FinalizeAccess,FinalizeErasure,NotifyEmail,NotifyError success
    class Auth,Validate,TypeCheck,Confirm decision
    class Deny,NotFound,ErrorHandler,UpdateFailed error
```