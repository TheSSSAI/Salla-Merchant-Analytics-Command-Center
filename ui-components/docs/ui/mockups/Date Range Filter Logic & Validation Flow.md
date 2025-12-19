{
  "diagram_info": {
    "diagram_name": "Date Range Filter Logic & Validation Flow",
    "diagram_type": "flowchart",
    "purpose": "To visualize the internal logic, user interactions, and validation states of the Date Range Picker component, specifically focusing on error handling for invalid ranges and future dates.",
    "target_audience": [
      "Frontend Developers",
      "QA Engineers",
      "UX Designers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "diagram_elements": {
    "actors_systems": [
      "User",
      "Date Picker Component",
      "Validation Logic",
      "Global State"
    ],
    "key_processes": [
      "Preset Selection",
      "Custom Date Selection",
      "Validation Checks",
      "Filter Application"
    ],
    "decision_points": [
      "Is Preset?",
      "Is Future Date Allowed?",
      "Is Start Date > End Date?",
      "Are both dates selected?"
    ],
    "success_paths": [
      "Select Preset -> Apply",
      "Select Valid Range -> Apply"
    ],
    "error_scenarios": [
      "Future date selection (when restricted)",
      "End date before Start date"
    ],
    "edge_cases_covered": [
      "Single date selection behavior",
      "Clearing filters"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart describing the Date Range Picker interaction, detailing the validation steps for future dates and invalid ranges.",
    "color_independence": "Nodes are differentiated by shape and border style, not just color.",
    "screen_reader_friendly": "Flow follows a logical top-down sequence.",
    "print_compatibility": "High contrast black and white compatible."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Neutral colors suitable for light and dark modes",
    "performance_notes": "Logic executes client-side for immediate feedback"
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of the reusable DateRangeFilter component (US-023) and when writing test cases for date validation.",
    "stakeholder_value": {
      "developers": "Exact validation logic to implement in the component state.",
      "designers": "Validation of error feedback mechanisms.",
      "qa_engineers": "Specific edge cases (future dates, inverted ranges) to target."
    },
    "maintenance_notes": "Update if date restrictions change (e.g., allowing future dates for forecasting features).",
    "integration_recommendations": "Include in the UI Component Library documentation."
  },
  "validation_checklist": [
    "✅ Future date restriction logic included",
    "✅ Start > End date validation included",
    "✅ Preset vs Custom flow differentiated",
    "✅ Mermaid syntax verified",
    "✅ JSON structure valid"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Nodes
    Start([User Clicks Date Filter])
    UI_Open[Date Picker UI Opens]
    
    subgraph Selection_Mode [Selection Mode]
        direction TB
        Dec_Type{Selection Type?}
        Action_Preset[User Clicks Preset\ne.g., Last 7 Days]
        Action_Custom[User Selects Custom Range]
    end

    subgraph Custom_Logic [Custom Range Validation Logic]
        direction TB
        Input_Date[User Clicks a Date]
        Dec_Future{Is Date in Future?}
        Context_Check{Is Future Data Allowed?\ne.g. Forecasts}
        Err_Future[Display Error:\n'Future dates not available']
        
        State_Update[Update Selection State]
        Dec_Range{Both Dates Selected?}
        Check_Valid{Is Start Date > End Date?}
        
        Err_Range[Display Error:\n'Start date must be before End date']
        State_Invalid[Disable 'Apply' Button\nHighlight Field Red]
        State_Valid[Enable 'Apply' Button\nClear Errors]
    end

    Result_Apply[Apply Filter]
    Update_Global[Update Global App State\nTrigger Data Fetch]
    End([Close Picker])

    %% Flow Connections
    Start --> UI_Open
    UI_Open --> Dec_Type
    
    Dec_Type -- Preset --> Action_Preset
    Action_Preset --> Result_Apply
    
    Dec_Type -- Custom --> Action_Custom
    Action_Custom --> Input_Date
    
    Input_Date --> Dec_Future
    Dec_Future -- Yes --> Context_Check
    Context_Check -- No --> Err_Future
    Err_Future --> Action_Custom
    
    Context_Check -- Yes --> State_Update
    Dec_Future -- No --> State_Update
    
    State_Update --> Dec_Range
    Dec_Range -- No --> State_Valid:::warning
    %% Partial selection is valid state but waiting for second input
    
    Dec_Range -- Yes --> Check_Valid
    Check_Valid -- Yes --> Err_Range
    Err_Range --> State_Invalid
    State_Invalid --> Action_Custom
    
    Check_Valid -- No --> State_Valid
    State_Valid --> Result_Apply
    
    Result_Apply --> Update_Global
    Update_Global --> End

    %% Styling
    classDef interaction fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef logic fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,stroke-dasharray: 5 5,color:#b71c1c
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef warning fill:#fffde7,stroke:#fbc02d,stroke-width:2px,color:#f57f17

    class Start,UI_Open,Action_Preset,Action_Custom,Input_Date,Result_Apply interaction
    class Dec_Type,Dec_Future,Context_Check,State_Update,Dec_Range,Check_Valid logic
    class Err_Future,Err_Range,State_Invalid error
    class Update_Global,End,State_Valid success
```