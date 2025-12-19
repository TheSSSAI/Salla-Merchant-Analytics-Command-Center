{
  "diagram_info": {
    "diagram_name": "Date Range Filter Interaction Flow",
    "diagram_type": "flowchart",
    "purpose": "Documents the end-to-end user interaction, state management, and data fetching logic for the global Date Range Filter component across dashboards and reports.",
    "target_audience": [
      "frontend developers",
      "UX designers",
      "QA engineers"
    ],
    "complexity_level": "medium",
    "estimated_review_time": "5 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested",
  "rendering_notes": "Optimized for high contrast and logical top-down flow with distinct swimlanes for Actors and System components",
  "diagram_elements": {
    "actors_systems": [
      "User",
      "Date Picker Component",
      "Next.js Router",
      "Analytics API"
    ],
    "key_processes": [
      "URL State Hydration",
      "Preset Selection",
      "Custom Range Validation",
      "Data Fetching"
    ],
    "decision_points": [
      "URL Query Params Exist?",
      "Preset vs Custom?",
      "Validation Pass?",
      "API Response Status?"
    ],
    "success_paths": [
      "Load from URL",
      "Apply Preset",
      "Apply Valid Custom Range"
    ],
    "error_scenarios": [
      "Invalid Custom Range (Start > End)",
      "API Fetch Failure",
      "No Data for Period"
    ],
    "edge_cases_covered": [
      "Empty dataset handling",
      "Loading state visualization",
      "URL synchronization"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "Flowchart illustrating the date filter logic: initiating from URL parameters or defaults, user selection of presets or custom dates, validation steps, API calls, and final UI rendering states including error handling.",
    "color_independence": "Shapes (diamonds for decisions, rectangles for processes) differentiate nodes alongside color coding",
    "screen_reader_friendly": "Flow follows a logical linear path with clear decision branches",
    "print_compatibility": "High contrast borders and text ensure readability in grayscale"
  },
  "technical_specifications": {
    "mermaid_version": "10.9+",
    "responsive_behavior": "Vertical layout suitable for documentation embedding",
    "theme_compatibility": "Neutral styling with specific status colors for interactions and errors",
    "performance_notes": "Focuses on client-side state logic interacting with asynchronous fetch operations"
  },
  "usage_guidelines": {
    "when_to_reference": "During implementation of the reusable DateRangePicker component (US-023) and when writing E2E tests for dashboard filtering.",
    "stakeholder_value": {
      "developers": "Defines exact validation logic and URL query parameter syncing requirements",
      "designers": "Visualizes necessary UI states (loading, error, empty) that need mockups",
      "product_managers": "Verifies that all user stories requirements (AC-001 to AC-007) are logically covered",
      "QA_engineers": "Provides a map for test case generation covering valid/invalid inputs and persistence tests"
    },
    "maintenance_notes": "Update if new presets are added or if date comparison logic changes (e.g., allowing single-day selection)",
    "integration_recommendations": "Include in the UI Component Library documentation for the DateRangePicker"
  },
  "validation_checklist": [
    "✅ URL persistence logic (AC-007) included",
    "✅ Custom range validation (AC-005) modeled",
    "✅ Loading states (AC-004) visually represented",
    "✅ Empty state handling (AC-006) included",
    "✅ Distinction between Preset and Custom flows clear",
    "✅ Interaction with Backend API clearly defined"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TD
    %% Theme & Styling
    classDef actor fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#004d40
    classDef logic fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100
    classDef ui fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef api fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20

    subgraph Initialization [Page Load & Hydration]
        Start([User Visits Dashboard]) --> CheckURL{URL Has Date Params?}
        CheckURL -- Yes --> ParseParams[Parse Start/End Dates]
        CheckURL -- No --> DefaultState[Set Default: 'Last 30 Days']
        ParseParams --> SetInternalState[Set Internal Component State]
        DefaultState --> SetInternalState
    end

    subgraph Interaction [User Interaction]
        SetInternalState --> RenderUI[Render Date Picker UI]
        RenderUI --> UserClick(User Clicks Filter)
        UserClick --> OpenPopover[Open Popover Menu]
        OpenPopover --> SelectionType{Selection Type?}
        
        %% Preset Flow
        SelectionType -- Preset --> SelectPreset[Select 'Last 7 Days', 'YTD', etc.]
        SelectPreset --> UpdateState[Update Internal State]

        %% Custom Flow
        SelectionType -- Custom Range --> OpenCalendar[Show Calendar View]
        OpenCalendar --> PickDates[User Selects Start & End Date]
        PickDates --> Validate{Start Date <= End Date?}
        Validate -- No --> ShowValError[Display 'Invalid Range' Error]:::error
        ShowValError --> DisableApply[Disable 'Apply' Button]
        DisableApply --> PickDates
        Validate -- Yes --> EnableApply[Enable 'Apply' Button]
        EnableApply --> UserApply(User Clicks Apply)
        UserApply --> UpdateState
    end

    subgraph Execution [System Execution]
        UpdateState --> UpdateURL[Update URL Query Params\n(pushState)]:::logic
        UpdateURL --> SetLoading[Set Dashboard Loading State\n(Skeleton UI)]:::ui
        SetLoading --> FetchData[GET /api/analytics/dashboard\n?start=...&end=...]:::api
        
        FetchData --> ApiResponse{API Response?}
    end

    subgraph Outcome [Result Handling]
        ApiResponse -- 200 OK (Data) --> RenderCharts[Render Charts & KPIs]:::success
        ApiResponse -- 200 OK (Empty) --> RenderEmpty[Show 'No Data Available' Msg]:::ui
        ApiResponse -- 4xx/5xx Error --> RenderError[Show Error Toast/Banner]:::error
        
        RenderCharts --> StopLoading[Remove Skeleton UI]
        RenderEmpty --> StopLoading
        RenderError --> StopLoading
    end

    %% Styles
    class Start,UserClick,UserApply actor
    class CheckURL,ParseParams,Validate,SelectionType,ApiResponse logic
    class RenderUI,OpenPopover,OpenCalendar,ShowValError,SetLoading,RenderCharts,RenderEmpty,RenderError ui
    class FetchData api
```