{
  "diagram_info": {
    "diagram_name": "Date Range Filter Component State Logic",
    "diagram_type": "flowchart",
    "purpose": "Documents the complex client-side state management for the Date Range Filter component, focusing on validation logic between preset selection and custom range constraints as defined in US-023.",
    "target_audience": [
      "frontend developers",
      "QA engineers",
      "UX designers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with clear distinction between user actions and system logic",
  "diagram_elements": {
    "actors_systems": [
      "User",
      "DateRangeComponent",
      "GlobalStore",
      "URLRouter"
    ],
    "key_processes": [
      "Preset Selection",
      "Custom Date Selection",
      "Validation Logic",
      "State Propagation"
    ],
    "decision_points": [
      "Preset vs Custom",
      "Date Validity Check (Start <= End)"
    ],
    "success_paths": [
      "Preset applied successfully",
      "Custom range validated and applied"
    ],
    "error_scenarios": [
      "End date selected before start date"
    ],
    "edge_cases_covered": [
      "Resetting invalid selection",
      "UI feedback on validation failure"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart describing the internal logic of the Date Range picker, showing paths for selecting presets versus custom dates and the validation step ensuring end dates occur after start dates.",
    "color_independence": "Logic flows are distinguished by shape (rhombus for decisions, rectangles for processes) not just color.",
    "screen_reader_friendly": "Nodes have descriptive labels indicating action and result.",
    "print_compatibility": "High contrast borders ensure readability in grayscale."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout optimized for scrolling",
    "theme_compatibility": "Neutral styling with semantic highlighting",
    "performance_notes": "Represents purely client-side logic before API actuation"
  },
  "usage_guidelines": {
    "when_to_reference": "During frontend implementation of the DatePicker component and when writing unit tests for date validation logic.",
    "stakeholder_value": {
      "developers": "Exact logic for handleDateSelect and state updates.",
      "designers": "Validation of error states and interaction steps.",
      "product_managers": "Confirmation of business rules (BR-DATE-001) enforcement.",
      "QA_engineers": "Roadmap for testing custom range edge cases."
    },
    "maintenance_notes": "Update if new presets are added or validation rules change (e.g., max range limits).",
    "integration_recommendations": "Link to US-023 and the Shadcn/UI component documentation."
  },
  "validation_checklist": [
    "✅ Preset selection flow documented",
    "✅ Custom range validation logic (Start <= End) included",
    "✅ Error feedback loop for invalid dates present",
    "✅ State propagation to URL and Data Fetch trigger included",
    "✅ User interaction vs System processing clearly distinguished",
    "✅ Mermaid syntax valid",
    "✅ Matches requirements of US-023 and AC-005"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Entry Point
    UserInteraction((User Clicks\nFilter Trigger)) --> InitState

    subgraph Component_Logic [Date Range Component State]
        InitState[Initialize Local State\nDefault: Current Global Selection]
        InitState --> RenderPopover{Render Popover}
        
        %% Paths
        RenderPopover -->|Tab: Presets| ViewPresets[Display Presets List\nToday, Last 7, Last 30, etc.]
        RenderPopover -->|Tab: Custom| ViewCalendar[Display Calendar UI\nStart & End Inputs]

        %% Path A: Preset Selection
        ViewPresets --> SelectPreset(User Clicks Preset)
        SelectPreset --> CalcPreset[Calculate Start & End Dates\nbased on current time]
        CalcPreset --> UpdateLabel[Update Button Label]
        UpdateLabel --> ApplyLogic

        %% Path B: Custom Selection
        ViewCalendar --> InputStart(User Selects Start Date)
        InputStart --> SetStart[Set tempStartDate]
        SetStart --> CheckEndExists{Is tempEndDate\nSet?}
        
        CheckEndExists -- No --> WaitEnd[Wait for End Selection]
        CheckEndExists -- Yes --> ValidateRange
        
        WaitEnd --> InputEnd(User Selects End Date)
        InputEnd --> SetEnd[Set tempEndDate]
        SetEnd --> ValidateRange{Validation Check\nBR-DATE-001}
        
        %% Validation Logic
        ValidateRange -- "Start > End (Invalid)" --> InvalidState[Set Error State]
        InvalidState --> ShowError[Display Inline Error:\n'End date cannot be before start']
        ShowError --> DisableApply[Disable 'Apply' Button]
        DisableApply --> InputEnd
        
        ValidateRange -- "Start <= End (Valid)" --> ValidState[Clear Error State]
        ValidState --> EnableApply[Enable 'Apply' Button]
        
        %% Apply Action
        EnableApply --> ClickApply(User Clicks 'Apply')
        ClickApply --> ApplyLogic
    end

    subgraph Global_Effect [Application State & Side Effects]
        ApplyLogic[[Commit State Change]]
        ApplyLogic --> UpdateURL[Update URL Query Params\n?from=YYYY-MM-DD&to=...]
        UpdateURL --> TriggerFetch[Trigger Data Refetch\nShow Loading Skeletons]
        TriggerFetch --> ClosePopover((Close Popover))
    end

    %% Styling
    classDef interaction fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef logic fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef system fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100

    class UserInteraction,SelectPreset,InputStart,InputEnd,ClickApply interaction
    class InitState,CalcPreset,SetStart,SetEnd,CheckEndExists,ValidateRange logic
    class InvalidState,ShowError,DisableApply error
    class ValidState,EnableApply success
    class UpdateURL,TriggerFetch,ClosePopover,UpdateLabel,ApplyLogic,ViewPresets,ViewCalendar system
```