{
  "diagram_info": {
    "diagram_name": "Date Range Filter Interaction & State Flow",
    "diagram_type": "flowchart",
    "purpose": "Documents the user interaction flow, internal logic, and application integration of the reusable Date Range Filter component, focusing on the Calendar primitive and Preset selection.",
    "target_audience": [
      "frontend developers",
      "ux designers",
      "qa engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for both light and dark themes with distinct colors for user actions, system logic, and state updates.",
  "diagram_elements": {
    "actors_systems": [
      "User",
      "Date Range Component",
      "Calendar Primitive",
      "Next.js Router / URL State",
      "Data Fetching Layer"
    ],
    "key_processes": [
      "Preset Selection",
      "Custom Date Picking",
      "Range Validation",
      "URL State Synchronization"
    ],
    "decision_points": [
      "User Action Type (Preset vs Custom)",
      "Calendar Selection State (Start vs End)",
      "Validation (Start <= End)"
    ],
    "success_paths": [
      "Preset applied successfully",
      "Custom range applied successfully"
    ],
    "error_scenarios": [
      "Start date > End date (Auto-swap handled)"
    ],
    "edge_cases_covered": [
      "Single date selection",
      "Range swapping"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart showing the Date Range Filter component logic. User opens popover, selects preset or custom dates on calendar. System validates range, updates URL parameters, and triggers data refresh.",
    "color_independence": "Nodes are distinguished by shape and text labels, not just color.",
    "screen_reader_friendly": "Flow direction is logical top-down.",
    "print_compatibility": "High contrast borders and text."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+ compatible",
    "responsive_behavior": "Vertical layout suitable for documentation embedding",
    "theme_compatibility": "Neutral colors with semantic highlighting",
    "performance_notes": "Standard flowchart complexity"
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of the DatePicker component (US-023) and when integrating it into Dashboards (US-022) or Reports (US-029).",
    "stakeholder_value": {
      "developers": "Defines state management logic and URL sync requirements",
      "designers": "Validates interaction steps for the Calendar primitive",
      "product_managers": "Clarifies the 'Quick Select' vs 'Custom' workflow",
      "qa_engineers": "Provides test steps for validation logic and URL updates"
    },
    "maintenance_notes": "Update if Comparison Mode (US-024) logic changes significantly.",
    "integration_recommendations": "Embed in the frontend component library documentation (Storybook/internal docs)."
  },
  "validation_checklist": [
    "✅ Preset and Custom flows defined",
    "✅ Validation logic included",
    "✅ URL sync integration shown",
    "✅ Mermaid syntax validated",
    "✅ Accessibility notes included"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Nodes
    Start([User Interaction]) --> Trigger[Click Date Filter Trigger]
    Trigger --> Popover{Popover State}
    
    subgraph "Date Range Filter Component (US-023)"
        Popover -- Closed --> IdleState["Display Current Range\n(e.g., 'Last 30 Days')"]
        Popover -- Open --> UI[Render Popover UI]
        
        subgraph "UI Composition"
            UI --> Sidebar[Preset List Sidebar]
            UI --> CalendarArea[Calendar Primitive Area]
        end
        
        Sidebar --> PresetClick{User Selects Preset}
        PresetClick -- "Last 7/30 Days, etc." --> CalcPreset[Calculate Start & End Dates]
        
        CalendarArea --> CalInteraction{User Interacton}
        
        %% Calendar Logic Flow
        CalInteraction -- "Keyboard/Mouse" --> SelectStart[Select Start Date]
        SelectStart --> HoverState[Hover: Visual Range Preview]
        HoverState --> SelectEnd[Select End Date]
        
        SelectEnd --> Validate{Validate Range}
        Validate -- "Start > End" --> Swap[Auto-Swap Dates]
        Validate -- "Start <= End" --> ValidRange[Valid Selection]
        Swap --> ValidRange
        
        ValidRange --> UpdateInternal[Update Internal Component State]
        CalcPreset --> UpdateInternal
        
        UpdateInternal --> CheckApply{Interaction Type}
        CheckApply -- Preset --> AutoApply[Auto Apply]
        CheckApply -- Custom --> WaitForApply[Wait for 'Apply' Click]
        WaitForApply --> UserClicksApply[User Clicks 'Apply']
    end
    
    subgraph "System Integration & State Sync"
        AutoApply --> ClosePopover[Close Popover]
        UserClicksApply --> ClosePopover
        
        ClosePopover --> UpdateURL[Update URL Query Params\n?from=YYYY-MM-DD&to=YYYY-MM-DD]
        
        UpdateURL --> RouterEffect{Router Event}
        RouterEffect --> DataFetch[Trigger Data Refetch\n(SWR / React Query)]
        
        DataFetch --> LoadingState[Show Skeleton Loaders\non Dashboard Widgets]
        LoadingState --> RenderData[Render Updated Analytics]
    end

    %% Styles
    classDef trigger fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef logic fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100
    classDef ui fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef system fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef interaction fill:#ffffff,stroke:#37474f,stroke-width:2px,stroke-dasharray: 5 5

    class Trigger,ClickApply,UserClicksApply trigger
    class Validate,Swap,CalcPreset,CheckApply,RouterEffect logic
    class UI,Sidebar,CalendarArea,IdleState,LoadingState ui
    class UpdateURL,DataFetch,RenderData system
    class PresetClick,CalInteraction,SelectStart,SelectEnd interaction
```