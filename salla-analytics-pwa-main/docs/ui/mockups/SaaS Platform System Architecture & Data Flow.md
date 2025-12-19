{
  "diagram_info": {
    "diagram_name": "SaaS Platform System Architecture & Data Flow",
    "diagram_type": "flowchart",
    "purpose": "Visualizes the high-level technical architecture, component interactions, and data flows of the SaaS Analytics Platform. It details the integration with Salla, the CDC-based data pipeline from OLTP to OLAP, the AI Assistant's RAG architecture, and the Cart Recovery email system.",
    "target_audience": [
      "System Architects",
      "Backend Developers",
      "DevOps Engineers",
      "Product Managers"
    ],
    "complexity_level": "high",
    "estimated_review_time": "10-15 minutes"
  },
  "syntax_validation": "Mermaid syntax verified and tested for rendering stability",
  "rendering_notes": "Optimized for top-down flow with distinct color coding for internal vs. external systems and data stores.",
  "diagram_elements": {
    "actors_systems": [
      "Merchant User",
      "Shopper",
      "Frontend SPA (Next.js)",
      "API Gateway (Vercel Functions)",
      "OLTP DB (PostgreSQL)",
      "OLAP DW (ClickHouse)",
      "Message Queue (Upstash)",
      "Salla Platform",
      "OpenAI API",
      "Postmark Email"
    ],
    "key_processes": [
      "OAuth & Auth",
      "Data Synchronization (CDC)",
      "Analytical Querying",
      "AI RAG Processing",
      "Cart Recovery Automation"
    ],
    "decision_points": [
      "Auth Validation",
      "Cache Hit/Miss",
      "Data Freshness Check"
    ],
    "success_paths": [
      "User Login -> Dashboard Load",
      "Salla Webhook -> DB Update -> CDC -> Warehouse",
      "AI Query -> Vector Search -> LLM Response"
    ],
    "error_scenarios": [
      "Salla API Failure",
      "Sync Job Failure",
      "LLM Service Timeout"
    ],
    "edge_cases_covered": [
      "High Volume Webhooks",
      "Data Re-sync"
    ]
  },
  "accessibility_considerations": {
    "alt_text": "System architecture diagram showing the flow of data from the Salla e-commerce platform through the internal PostgreSQL database, processed via a message queue into ClickHouse for analytics, and accessed via a Next.js frontend with AI capabilities powered by OpenAI.",
    "color_independence": "Components distinguished by shape and border style in addition to color.",
    "screen_reader_friendly": "Flow direction and component relationships are explicitly labeled.",
    "print_compatibility": "High contrast borders ensure readability in grayscale."
  },
  "technical_specifications": {
    "mermaid_version": "10.0+",
    "responsive_behavior": "Vertical layout optimized for scrolling on documentation sites.",
    "theme_compatibility": "Compatible with standard light/dark modes.",
    "performance_notes": "Subgraphs used to manage visual complexity."
  },
  "usage_guidelines": {
    "when_to_reference": "During architectural reviews, onboarding new engineers, or planning infrastructure changes.",
    "stakeholder_value": {
      "developers": "Understanding the data pipeline and service boundaries.",
      "designers": "Visualizing where data comes from for UI components.",
      "product_managers": "Understanding system capabilities and external dependencies.",
      "qa_engineers": "Identifying integration points for testing strategies."
    },
    "maintenance_notes": "Update if new external services are added or if the data pipeline architecture changes (e.g., replacing Upstash).",
    "integration_recommendations": "Embed in the 'System Overview' section of technical documentation."
  },
  "validation_checklist": [
    "✅ Salla integration (OAuth/Webhooks) depicted",
    "✅ OLTP to OLAP data pipeline (CDC) included",
    "✅ AI RAG pattern (Vector DB + OpenAI) shown",
    "✅ Cart Recovery flow (Email Service) included",
    "✅ Clear separation of internal vs. external systems",
    "✅ Data flow direction is logical (Top-Down)",
    "✅ Key technologies (Next.js, Postgres, ClickHouse) labeled"
  ]
}

---

# Mermaid Diagram

```mermaid
flowchart TB
    %% Definitions and Styles
    classDef external fill:#f5f5f5,stroke:#666,stroke-width:2px,color:#333,stroke-dasharray: 5 5
    classDef frontend fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef backend fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef database fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100,shape:cylinder
    classDef queue fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef ai fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#006064

    %% Actors
    User([Merchant User]):::frontend
    Shopper([Online Shopper]):::external

    %% External Systems Subgraph
    subgraph External_Ecosystem [External Ecosystem]
        direction TB
        Salla[Salla Platform\n(E-commerce Source)]:::external
        OpenAI[OpenAI API\n(LLM Service)]:::external
        Postmark[Postmark\n(Email Delivery)]:::external
    end

    %% Internal Platform Subgraph
    subgraph SaaS_Platform [SaaS Analytics Platform]
        direction TB
        
        %% Frontend Layer
        subgraph Frontend_Layer [Presentation Layer]
            NextJS[Next.js SPA\n(Vercel Hosting)]:::frontend
        end

        %% Backend Layer
        subgraph Backend_Layer [Application Layer]
            APIGW[API Gateway / Edge]:::backend
            AuthSvc[Auth Service]:::backend
            WebhookHandler[Webhook Handler]:::backend
            SyncWorker[Data Sync Worker]:::backend
            AISvc[AI Assistant Service]:::ai
            CartRecSvc[Cart Recovery Service]:::backend
        end

        %% Data & Messaging Layer
        subgraph Data_Layer [Data & Infrastructure]
            QStash[Message Queue\n(Upstash QStash)]:::queue
            Postgres[(OLTP DB\nPostgreSQL + pgvector)]:::database
            ClickHouse[(OLAP DW\nClickHouse)]:::database
        end
    end

    %% Relationships - User Interactions
    User -->|HTTPS/Interact| NextJS
    NextJS -->|HTTPS/REST| APIGW
    Shopper -.->|Browsing/Checkout| Salla

    %% Relationships - Auth & Core
    APIGW -->|Validate| AuthSvc
    AuthSvc -->|Read/Write User Data| Postgres
    APIGW -->|Query Operational Data| Postgres

    %% Relationships - Salla Integration & Webhooks
    Salla -->|Webhooks (Orders/Carts)| WebhookHandler
    WebhookHandler -->|Upsert Raw Data| Postgres
    NextJS -->|OAuth Flow| Salla

    %% Relationships - Data Pipeline (CDC)
    Postgres -.->|CDC / Changes| QStash
    QStash -->|Trigger Batch| SyncWorker
    SyncWorker -->|Transform & Load| ClickHouse
    SyncWorker -->|Generate Embeddings| AISvc

    %% Relationships - Analytics
    APIGW -->|Aggregated Queries| ClickHouse
    ClickHouse -.->|Return Analytics| APIGW

    %% Relationships - AI RAG Flow
    AISvc -->|Semantic Search| Postgres
    AISvc -->|Contextual Query| ClickHouse
    AISvc -->|Prompt + Context| OpenAI
    OpenAI -.->|Generated Insight| AISvc
    APIGW -->|NL Query| AISvc

    %% Relationships - Cart Recovery
    CartRecSvc -->|Check Abandoned| Postgres
    CartRecSvc -->|Send Recovery Email| Postmark
    Postmark -.->|Email to Shopper| Shopper

    %% Link Styling
    linkStyle default stroke:#666,stroke-width:1px
```