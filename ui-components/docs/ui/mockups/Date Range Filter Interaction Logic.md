{
  "diagram_info": {
    "diagram_name": "Date Range Filter Interaction Logic",
    "diagram_type": "flowchart",
    "purpose": "To visualize the user interaction flow, validation logic, and responsive behavior of the Date Range Filter component.",
    "target_audience": [
      "frontend developers",
      "ux designers",
      "qa engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with clear status coloring",
  "diagram_elements": {
    "actors_systems": [
      "User",
      "UI Component (DatePicker)",
      "Validation Service"
    ],
    "key_processes": [
      "Device type detection",
      "Preset selection",
      "Custom range selection",
      "Date validation"
    ],
    "decision_points": [
      "Mobile vs Desktop",
      "Preset vs Custom",
      "Validation Check (Start > End)"
    ],
    "success_paths": [
      "Quick preset selection",
      "Valid custom range application"
    ],
    "error_scenarios": [
      "Invalid date range selection (Start > End)"
    ],
    "edge_cases_covered": [
      "Mobile modal display",
      "Validation error reset loop"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart describing the Date Range Filter interaction, showing separate paths for mobile and desktop, and validation steps for custom date ranges.",
    "color_independence": "Shapes and text labels distinguish decision points from actions",
    "screen_reader_friendly": "Flow follows a logical linear progression",
    "print_compatibility": "High contrast black and white compatible"
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout suitable for documentation embedding",
    "theme_compatibility": "Uses class definitions for consistent styling",
    "performance_notes": "Standard flowchart rendering"
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of the Date Range Filter component (US-023) and QA testing of validation rules.",
    "stakeholder_value": {
      "developers": "Exact logic for validation and responsive switching",
      "designers": "Verification of interaction steps on different devices",
      "product_managers": "Confirmation of supported selection modes",
      "qa_engineers": "Test cases for invalid ranges and mobile viewports"
    },
    "maintenance_notes": "Update if new presets are added or validation rules change",
    "integration_recommendations": "Include in Storybook documentation for the DatePicker component"
  },
  "validation_checklist": [
    "✅ Mobile vs Desktop display logic included",
    "✅ Preset vs Custom selection flow mapped",
    "✅ Start Date > End Date validation error loop defined",
    "✅ Successful application state update shown",
    "✅ Mermaid syntax validated",
    "✅ Visual styling applied for clarity",
    "✅ Matches component requirements from US-023",
    "✅ Accessible structure"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Nodes
    Start([User Interaction]) --> Trigger[Click Date Filter Trigger]
    
    Trigger --> DeviceCheck{Screen Size?}
    
    %% Responsive Behavior
    DeviceCheck -- "Mobile (< 768px)" --> MobileView[Open Full Screen Modal]
    DeviceCheck -- "Desktop (>= 768px)" --> DesktopView[Open Popover / Dropdown]
    
    MobileView --> SelectionMode{Selection Mode}
    DesktopView --> SelectionMode
    
    %% Selection Paths
    SelectionMode -- "Select Preset" --> PresetPath
    SelectionMode -- "Custom Range" --> CustomPath
    
    %% Preset Logic
    subgraph Preset Logic
        PresetPath[User clicks Preset\ne.g., 'Last 7 Days']
        PresetPath --> AutoApply[Auto-Apply Filter]
        AutoApply --> CloseUI[Close Component]
    end
    
    %% Custom Logic
    subgraph Custom Logic
        CustomPath[Show Calendar Interface]
        CustomPath --> SelectStart[User Selects Start Date]
        SelectStart --> SelectEnd[User Selects End Date]
        
        SelectEnd --> Validation{Start > End?}
        
        Validation -- "Yes (Error)" --> ShowError[Display Error:\n'End date cannot be before start date']
        ShowError --> DisableApply[Disable 'Apply' Button]
        DisableApply --> ResetEnd[Clear End Date Selection]
        ResetEnd --> SelectEnd
        
        Validation -- "No (Valid)" --> ValidRange[Valid Range Set]
        ValidRange --> EnableApply[Enable 'Apply' Button]
        EnableApply --> UserApply[User Clicks 'Apply']
    end
    
    UserApply --> UpdateState
    CloseUI --> UpdateState
    
    %% Final Action
    UpdateState[Update App State\n& URL Query Params] --> FetchData([Trigger Data Refetch])

    %% Styling
    classDef trigger fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef decision fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#f57f17
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef ui fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c

    class Trigger,UserApply,PresetPath,SelectStart,SelectEnd trigger
    class DeviceCheck,SelectionMode,Validation decision
    class ShowError,DisableApply,ResetEnd error
    class AutoApply,ValidRange,EnableApply,UpdateState success
    class MobileView,DesktopView,CustomPath,CloseUI ui
```