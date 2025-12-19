### **1. Introduction**

#### **1.1 Purpose (REQ-INT-001)**
*   This Software Requirement Specification (SRS) document shall serve as the single source of truth for all stakeholders.
*   The development team shall use this document to implement the system.
*   The QA team shall use this document to create test plans and test cases.
*   Project managers shall use this document to manage the project scope.
*   The document shall define the functional, non-functional, and technical requirements of the system.

#### **1.2 Project Scope (REQ-INT-002)**
*   **IN-SCOPE:**
    *   The system shall be a web-based Progressive Web App (PWA).
    *   The system shall provide analytics and business management tools for Salla e-commerce merchants.
    *   The system shall provide secure user onboarding and integration with the Salla platform via OAuth 2.0.
    *   The system shall include a deep analytics module with dashboards for sales, products, and customers.
    *   The system shall include an AI-powered assistant for natural language queries and proactive insights.
    *   The system shall include an automated cart recovery module with customizable email sequences.
    *   The system shall provide Role-Based Access Control (RBAC) for merchant teams.
    *   The system shall perform data synchronization via Salla APIs and Webhooks.
*   **OUT-OF-SCOPE:**
    *   The system shall not provide direct management of Salla store inventory, products, or orders.
    *   The system shall not process payments or handle any payment gateway integrations.
    *   The system shall not include native mobile applications for iOS or Android.
    *   The system shall not support e-commerce platforms other than Salla.
    *   The system shall not include customer-facing features.

#### **1.3 Definitions, Acronyms, and Abbreviations (REQ-INT-003)**
*   **AOV**: Average Order Value.
*   **API**: Application Programming Interface.
*   **CDC**: Change Data Capture.
*   **CQRS**: Command Query Responsibility Segregation.
*   **DPA**: Data Processing Addendum.
*   **DSAR**: Data Subject Access Request.
*   **ETL/ELT**: Extract, Transform, Load / Extract, Load, Transform.
*   **ETS**: Exponential Smoothing (a time-series forecasting method).
*   **JWT**: JSON Web Token.
*   **KPI**: Key Performance Indicator.
*   **LCP**: Largest Contentful Paint.
*   **LLM**: Large Language Model.
*   **NLQ**: Natural Language Query.
*   **OAuth 2.0**: An open standard for access delegation.
*   **OLAP**: Online Analytical Processing.
*   **OLTP**: Online Transactional Processing.
*   **PCI DSS**: Payment Card Industry Data Security Standard.
*   **PII**: Personally Identifiable Information.
*   **PWA**: Progressive Web App.
*   **RAG**: Retrieval-Augmented Generation.
*   **RBAC**: Role-Based Access Control.
*   **RPO**: Recovery Point Objective.
*   **RTO**: Recovery Time Objective.
*   **SLA**: Service Level Agreement.
*   **SRS**: Software Requirement Specification.
*   **UI/UX**: User Interface / User Experience.
*   **Webhook**: An automated message sent from an app when something happens.

#### **1.4 References (REQ-INT-004)**
*   The project shall adhere to and reference the following documents:
    *   Original User Requirements Document
    *   Gaps and Contradiction Analysis Report
    *   Technical Architecture & Solution Design Document
    *   Salla API Documentation

### **2. Overall Description**

#### **2.1 Overview & Scope (REQ-OVR-001)**
*   The system shall be a standalone, cloud-hosted SaaS platform deployed on Vercel.
*   The system shall integrate with the Salla e-commerce ecosystem.
*   The system shall function as a supplementary data analysis and business intelligence tool.
*   The system shall pull data from a merchant's Salla store via official APIs and Webhooks.
*   The system shall not modify the Salla store's core data.
*   The system shall provide a sophisticated layer of analytics and automation on top of Salla data.
*   The backend infrastructure shall run on Vercel, utilizing PostgreSQL, Redis, and Prisma.
*   The project shall maintain three separate environments: Development, Staging, and Production.
*   The system shall not have specific end-user hardware requirements beyond a modern web browser.
*   The client-side application shall require a modern, evergreen web browser (e.g., Chrome, Firefox, Safari, Edge).

#### **2.2 Product Features (REQ-OVR-002)**
*   The system shall provide seamless user registration and secure connection to a Salla store.
*   The system shall provide multi-user access with predefined roles for team collaboration.
*   The system shall provide a comprehensive suite of dashboards and reports for sales, customer, and product analysis.
*   The system shall provide an intelligent assistant for natural language data queries, proactive alerts, and optimization suggestions.
*   The system shall provide an automated system to track and recover abandoned shopping carts via email campaigns.

#### **2.3 User Classes and Permissions (REQ-OVR-003)**
*   The system shall support the 'Store Owner / Admin' user persona.
*   The system shall support the 'Data Analyst' user persona.
*   The system shall support the 'Marketer' user persona.
*   The 'Owner' role shall have full access to all features, billing, and user management.
*   The 'Admin' role shall have full access to all features except billing and user management.
*   The 'Analyst' role shall have view-only access to all analytics dashboards and reports.
*   The 'Analyst' role shall not have access to Cart Recovery or AI suggestion configurations.
*   The 'Marketer' role shall have access to the Cart Recovery module and related analytics.
*   The 'Marketer' role shall have view-only access to other dashboards.

#### **2.4 Design and Implementation Constraints (REQ-OVR-005)**
*   The frontend UI shall be built using the shadcn/ui component library.
*   The frontend shall be built using React and Tailwind CSS.
*   The system shall integrate exclusively with the Salla e-commerce platform using its official APIs and Webhooks.
*   The application shall be developed as a Progressive Web App (PWA).
*   The system shall be designed as a multi-tenant application.
*   The system shall enforce strict data isolation between merchants.
*   The system shall use a database-level multi-tenancy model where every merchant-specific record is scoped by a `merchant_id`.

#### **2.5 Assumptions and Dependencies (REQ-OVR-006)**
*   The system shall be designed with the assumption that users will accept longer processing times for complex, non-real-time analytical reports.
*   The system's functionality shall be critically dependent on the availability, performance, and versioning of the Salla Platform's APIs and Webhooks.
*   The system shall depend on a third-party service for email delivery.
*   The system shall depend on a third-party service for Natural Language Processing.

### **3. Functional Requirements**

#### **3.1 User Onboarding and Store Integration (REQ-FUN-100)**

*   **FR-101: User Registration**
    *   The system shall allow merchants to register for an account using an email and password.
    *   The system shall create a new user account given a valid, unique email and a strong password.
    *   The system shall display an error message if a user provides an email that already exists.
    *   The system shall display an error message detailing password complexity requirements if a user provides a password that does not meet them.
    *   The system shall enforce that email addresses are in a valid format (see BR-001).
    *   The system shall enforce that passwords meet minimum complexity requirements (see BR-002).
*   **FR-102: User Authentication**
    *   The system shall allow registered merchants to log in and out of the system securely.
    *   The system shall provide a 'Forgot Password' workflow.
    *   The system shall successfully log in a registered user and redirect them to their dashboard given correct credentials.
    *   The system shall display an error message given incorrect credentials.
    *   The system shall send an email with a time-sensitive reset link to a user's registered email address upon a password reset request.
    *   A logged-in user shall have an option to log out, which invalidates their session.
*   **FR-103: Salla Store Connection**
    *   The system shall guide a merchant through an OAuth 2.0 flow to securely connect their Salla store upon first login.
    *   The system shall present a 'Connect Salla Store' prompt to a new user upon login.
    *   The system shall redirect the user to the Salla authentication page when the user initiates the connection.
    *   The system shall establish the connection and redirect the user back to the platform after successful authorization on Salla.
    *   The system shall redirect the user back with an appropriate error message if authorization fails or is denied.
*   **FR-104: Initial Data Synchronization**
    *   The system shall initiate a bulk import of historical data from the Salla store after successful store connection.
    *   The initial data import shall include core entities such as Orders, Customers, Products, and Carts.
    *   During onboarding, the system shall prompt the user to select the desired depth for the initial data import, offering options for 12 months (for a quick start) or 24 months (for full historical analysis).
    *   The system shall clearly communicate that selecting the 24-month option is required to enable features like year-over-year comparisons immediately.
    *   The user interface shall show the progress of this initial sync, including percentage complete and estimated time remaining.
    *   A background job shall be triggered to import historical data upon successful Salla store connection and selection of import depth.
    *   The UI shall display a clear message indicating that the initial data sync is in progress.
    *   The user shall be able to navigate parts of the application that do not depend on historical data while the sync is running.
    *   The system shall notify the user upon completion of the sync via an in-app notification and optionally via email.
    *   In case of a recoverable API error during the sync, the system shall automatically retry with an exponential backoff strategy. If the sync fails completely, the user shall be notified with guidance on how to restart it.
    *   The system shall validate incoming data during synchronization. Records that fail validation shall be logged and skipped to prevent sync failure, with alerts sent to an operational dashboard.
    *   All dashboards shall be fully populated upon completion of the sync.

#### **3.2 User and Role Management (REQ-FUN-200)**

*   **FR-201: Role Definitions**
    *   The system shall support at least four distinct user roles: Owner, Admin, Analyst, and Marketer.
    *   The user who initially connects the store shall be automatically assigned the 'Owner' role.
    *   Permissions for each role shall be strictly enforced across the entire application at both the UI and API levels.
*   **FR-202: Team Member Invitation**
    *   The 'Owner' role shall be able to invite team members via email to access the command center.
    *   A user with the 'Owner' role shall be able to access a user management interface.
    *   The Owner shall be able to enter an email address and select a role to send an invitation.
    *   The invited user shall receive an email with a unique, time-limited link to accept the invitation.
    *   The system shall support a many-to-many relationship between users and merchant accounts, allowing a single user account to be a member of multiple teams.
    *   If an invitation is sent to an email address already registered in the system, the existing user will be added to the new merchant's team upon accepting the invitation.
    *   If an invitation is sent to a new email address, the user will be guided through a streamlined registration process before being added to the team.
*   **FR-203: Role Assignment**
    *   The 'Owner' role shall be able to assign and change the roles of their team members.
    *   The Owner shall be able to see a list of all team members and their current roles in the user management interface.
    *   The Owner shall be able to modify the role of any team member except their own.
    *   The Owner shall be able to remove a team member from the account, which immediately revokes their access.
*   **FR-204: Account Switching**
    *   The system shall provide a clear UI mechanism (e.g., a dropdown in the user profile menu) for users who belong to multiple merchant teams to switch between their accessible accounts.

#### **3.3 Deep Analytics (REQ-FUN-300)**

*   **FR-301: Central Dashboard**
    *   The system shall provide a main overview dashboard displaying key performance indicators (KPIs).
    *   The dashboard shall display the following KPIs for a selected time period: Total Sales, Number of Orders, Average Order Value (AOV), Conversion Rate, and Abandoned Cart Rate.
    *   The user shall be able to select the time period for the dashboard (e.g., today, last 7 days, last 30 days, custom range).
    *   The KPIs displayed on this dashboard shall be updated based on the analytical data pipeline, with a target freshness of under 5 minutes.
*   **FR-302: Sales Trend Analysis**
    *   The system shall provide detailed reports allowing merchants to analyze sales trends over time.
    *   The user shall be able to filter all sales reports by a date range, including presets and a custom range (FR-302.1).
    *   The user shall be able to select a second time period to compare performance against the primary period (FR-302.2).
    *   The user shall be able to group the sales data visualization by hour, day, week, or month (FR-302.3).
*   **FR-303: Customer Segmentation**
    *   The system shall provide reports that segment customers based on behavior.
    *   The system shall provide reports segmenting customers as 'New' vs. 'Returning' (FR-303.1).
    *   The system shall allow segmentation of customers by total spending or AOV to identify high-value customers (FR-303.2).
    *   The system shall provide reports segmenting customers by city and country (FR-303.3).
*   **FR-304: Product Performance Reporting**
    *   The system shall provide reports to identify best and worst-selling products.
    *   Product reports shall include metrics for Units Sold, Revenue Generated, and Conversion Rate per product (FR-304.1).
    *   The user shall be able to sort the product list by any key metric (FR-304.2).
    *   The user shall be able to filter the list by product category (FR-304.3).
*   **FR-305: Sales Forecasting**
    *   The system shall provide a module that provides sales forecasts for the upcoming month based on historical data using an Exponential Smoothing (ETS) algorithm.
    *   The system shall display a projected sales figure and a trend line for the next 30 days.
    *   The forecast shall be clearly labeled as an estimate based on historical performance and shall display a 95% confidence interval.
*   **FR-306: Data Export**
    *   All reports and dashboard views shall have an option to be exported in CSV format.
    *   Every report and dashboard shall contain an 'Export to CSV' button.
    *   Clicking the export button shall download a CSV file containing the data currently displayed in the view, respecting any applied filters.
*   **FR-307: Data Dictionary**
    *   The system shall provide an accessible data dictionary within the application that clearly defines each metric and KPI, including its calculation formula and data source.

#### **3.4 AI Assistant (REQ-FUN-400)**

*   **FR-401: Natural Language Queries (NLQ)**
    *   Merchants shall be able to ask natural language questions about their business data.
    *   The UI shall provide an input field for users to type questions.
    *   The system shall correctly parse questions related to the metrics defined in the Deep Analytics section (e.g., \"What were my total sales last week?\", \"Show me my top 5 selling products in May\").
    *   The system shall return a clear, concise answer to the user's query, which may be text, a number, or a data visualization (e.g., a chart).
    *   The system's query processing and response generation shall be strictly scoped to the data of the merchant account making the request.
    *   The system shall respond with a helpful message if a query cannot be understood or is out of scope.
    *   The system shall log all user queries and system responses for auditing and continuous improvement of the AI model.
*   **FR-402: Proactive Insights & Alerts**
    *   The AI assistant shall proactively generate and display insight cards on the dashboard.
    *   The dashboard shall display a dedicated section for AI-generated insights.
    *   The system shall generate alerts for significant positive or negative deviations from historical norms (e.g., \"Sales are up 30% this week compared to the monthly average\").
    *   The system shall generate alerts for anomalies (e.g., \"A sudden spike in abandoned carts has been detected\").
*   **FR-403: Optimization Suggestions**
    *   The assistant shall provide suggestions based on predefined rules and patterns.
    *   The system shall analyze patterns in the data to provide actionable suggestions.
    *   Suggestions shall be based on predefined rules (e.g., if a product has a high 'add to cart' rate but a low purchase rate, suggest reviewing price/shipping).
    *   Suggestions shall be displayed clearly in the UI, separate from alerts.

#### **3.5 Cart Recovery (REQ-FUN-500)**

*   **FR-501: Abandoned Cart Tracking**
    *   The system shall identify and list all abandoned carts based on a configurable definition (see BR-003).
    *   The list shall include customer contact information (if available) and the items in the cart.
    *   A dedicated section in the UI shall list all abandoned carts within a selectable time frame.
    *   Each entry shall show the customer's name and email (if known), the time of abandonment, the total value of the cart, and the items in the cart.
*   **FR-502: Automated Follow-up Sequences**
    *   Merchants shall be able to create multi-step recovery campaigns.
    *   The user shall be able to create a sequence of follow-ups and define the delay for each step in hours or days (FR-502.1).
    *   The system shall send follow-ups via email (FR-502.2).
    *   The system shall automatically stop a sequence for a customer if they complete their purchase.
*   **FR-503: Email Template Management**
    *   Merchants shall be able to create, edit, and manage multiple email templates for their recovery campaigns.
    *   The UI shall provide a rich text editor for creating and editing email templates.
    *   Templates shall support dynamic variables (e.g., `{{customer_name}}`, `{{cart_items}}`, `{{checkout_link}}`).
    *   Users shall be able to save, name, and delete multiple templates.
    *   The system shall automatically append a unique, one-click unsubscribe link to the footer of every cart recovery email.
    *   The system shall maintain a per-merchant suppression list to ensure that users who unsubscribe are not contacted again. The unsubscribe action must be processed immediately.
*   **FR-504: Performance Analytics**
    *   The module shall provide analytics on the effectiveness of the recovery campaigns.
    *   The Cart Recovery dashboard shall display metrics including the number of emails sent, open rate, click-through rate, number of carts recovered, and total value of recovered sales.
    *   The data shall be filterable by date range and by specific campaign.
*   **FR-505: Sending Domain Authentication**
    *   The system shall provide a settings area where merchants can configure their sending domain to improve email deliverability.
    *   This area shall provide merchants with the necessary DNS records (e.g., CNAME, TXT) to set up SPF and DKIM for their domain.
    *   The UI shall provide a mechanism to verify that the DNS records have been correctly configured.

#### **3.6 Business Rules**
*   **BR-001: Email Format Validation**
    *   The system shall validate email addresses against a standard regular expression (RFC 5322 compliant) to ensure proper formatting.
*   **BR-002: Password Complexity**
    *   Passwords must be a minimum of 10 characters.
    *   Passwords must contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., !@#$%^&*).
*   **BR-003: Abandoned Cart Definition**
    *   A cart shall be considered abandoned if it has not been updated or converted to an order within a system-configurable time period (default: 60 minutes).
*   **BR-004: Metric Calculation Logic**
    *   All KPIs and metrics shall be calculated using the following standardized formulas:
        *   **Average Order Value (AOV)** = Total Revenue / Number of Orders.
        *   **Conversion Rate** = (Total number of completed orders / Total number of created carts) * 100%.
        *   **Abandoned Cart Rate** = (Number of Abandoned Carts / Total Number of Created Carts) * 100%.

#### **3.7 Compliance and Legal Constraints**
*   **BR-005: Data Privacy and GDPR/CCPA Compliance**
    *   A Data Processing Addendum (DPA) shall be available for review and acceptance by merchants during onboarding.
    *   The system shall provide a mechanism for 'Owners' to submit and track Data Subject Access Requests (DSAR) on behalf of their customers, as detailed in REQ-NFR-006.
    *   All PII data for all merchants shall be stored and processed within the EU (Frankfurt) region. This shall be declared in the Privacy Policy.
*   **BR-006: Consent Management for Marketing Communication**
    *   The Cart Recovery feature shall only be enabled for merchants who acknowledge and agree within the UI that they have a sufficient legal basis (e.g., legitimate interest or explicit consent) for contacting their customers for this purpose, as outlined in the Terms of Service.
    *   The unsubscribe link (FR-503) is a mandatory, non-removable component of all outgoing emails.
*   **BR-007: PCI DSS Compliance**
    *   The system shall not ingest, process, or store any payment card information (Primary Account Number, CVV, etc.). The system's integration with Salla shall be designed to explicitly exclude this data.
*   **BR-008: Legal Agreements**
    *   All users must agree to the system's Terms of Service and Privacy Policy upon registration. These documents shall be accessible from within the application at all times.

### **4. Interface Requirements**

#### **4.1 User Interfaces (REQ-INT-005)**
*   The user interface shall be constructed using the shadcn/ui component library.
*   The application shall be fully responsive and provide a seamless experience on desktop, tablet, and mobile devices.
*   The UI shall adhere to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
*   The application shall be primarily controlled via mouse/trackpad clicks and keyboard input on desktop.
*   The application shall be primarily controlled via touch gestures (tap, swipe) on mobile devices.
*   All interactive elements shall have clear focus, hover, and active states for keyboard and mouse navigation.
*   The application shall feature a clean, data-focused design with a light and dark mode option, with the user's preference persisted.
*   The application shall use a consistent navigation structure, such as a persistent sidebar, for easy access to all major features.

#### **4.2 Software Interfaces (REQ-INT-006)**
*   The system shall use Salla's REST APIs for the initial bulk data import and for periodic data reconciliation.
*   The system shall consume Salla Webhooks for real-time updates on key events (e.g., order created, cart updated).
*   The system shall validate the cryptographic signature of all incoming Salla Webhooks to ensure their authenticity and integrity before processing.
*   The system shall implement a nightly reconciliation job that queries the Salla API for key resources (e.g., orders, customers) created or updated in the last 24 hours to ensure data consistency and correct for any missed webhooks.
*   An anti-corruption layer shall be implemented to translate Salla data models into the system's internal domain models, isolating the core application from external API changes.
*   The system shall integrate with Postmark to send transactional and cart recovery emails.
*   The AI Assistant shall integrate with the OpenAI API using a Retrieval-Augmented Generation (RAG) pattern to parse natural language queries and generate responses based on the merchant's data.
*   The system's own backend APIs shall be versioned (e.g., `/api/v1/...`) to ensure backward compatibility for clients.

#### **4.3 Communication Interfaces (REQ-INT-007)**
*   All communication between the client and the backend servers shall occur over HTTPS using TLS 1.2 or higher.
*   All communication between backend services and external APIs shall occur over HTTPS using TLS 1.2 or higher.
*   Data exchanged between the client and the backend API shall be in JSON format.
*   Data exported from reports shall be in CSV format.
*   Client-server communication shall be secured using JWT Bearer token authentication.

### **5. Non-Functional Requirements**

#### **5.1 Performance Requirements (REQ-NFR-001)**
*   Standard user interface interactions and transactional API calls shall have a p95 response time below 200ms under normal operating conditions (NFR-101).
*   Complex, data-intensive operations, such as generating large analytical reports, shall be processed asynchronously to avoid blocking the UI (NFR-102).
*   The user shall be notified when an asynchronous operation is initiated and again when the report is ready for viewing or download (NFR-102).
*   The application's key pages shall achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds (NFR-103).
*   Real-time updates from Salla Webhooks for event-based data (e.g., new entries in an order list) shall be reflected in the UI within 30 seconds of the event occurring in the Salla store. Aggregate dashboard KPIs will update based on the analytical data freshness target (under 5 minutes) (NFR-104).
*   The system shall be designed to handle a load of at least 100 concurrent API requests per second per merchant tenant without significant performance degradation (NFR-105).
*   The initial 12-month data synchronization for a store with up to 50,000 orders shall complete within 4 hours (NFR-106).

#### **5.2 Reliability and Disaster Recovery (REQ-NFR-002)**
*   The primary OLTP database (PostgreSQL) shall be configured with automated daily snapshots and point-in-time recovery capabilities provided by the managed database service.
*   The OLAP database (ClickHouse) shall have a scheduled backup process to a cloud object store (e.g., Cloudflare R2).
*   A disaster recovery plan shall be in place to restore service from backups with a Recovery Point Objective (RPO) of 24 hours and a Recovery Time Objective (RTO) of 4 hours.
*   The disaster recovery plan shall be tested at least annually to validate the RPO and RTO targets.
*   The system shall be designed for high availability by leveraging Vercel's global edge network for compute and multi-region capabilities of its managed data stores.
*   The system shall use message queues (e.g., Upstash QStash) for inter-service communication to ensure durability and prevent data loss in case of a temporary service failure.

#### **5.3 Security (REQ-NFR-003)**
*   User authentication shall be handled via JWTs using the RS256 signing algorithm.
*   The system shall issue short-lived access tokens (15 minutes) and long-lived refresh tokens (30 days).
*   Refresh tokens shall be stored securely in an `HttpOnly`, `Secure`, and `SameSite=Strict` cookie.
*   A robust Role-Based Access Control (RBAC) model shall be implemented.
*   API endpoints shall be protected by middleware that validates the user's role and permissions for every request.
*   All data shall be encrypted in transit using HTTPS/TLS 1.2+.
*   All data shall be encrypted at rest in all data stores, using the managed service's native encryption capabilities.
*   All sensitive credentials, including database passwords and API keys, shall be stored securely using Vercel Environment Variables.
*   All database queries at the application layer shall be strictly scoped by `merchant_id` to ensure tenant data isolation.
*   The application shall implement standard security headers (e.g., Content Security Policy, HSTS, X-Frame-Options) to mitigate common web vulnerabilities.
*   The system shall maintain a detailed, immutable audit log of all security-sensitive events, including user logins (successful and failed), role changes, data exports, and team member invitations/removals. Logs shall be retained for at least 12 months.
*   The system shall undergo regular automated dependency scanning and third-party penetration testing at least annually.

#### **5.4 Availability, Scalability, and Maintainability (REQ-NFR-004)**
*   **Availability:**
    *   The system shall maintain an uptime of 99.9%, excluding planned maintenance.
    *   Planned maintenance windows shall be scheduled during off-peak hours.
    *   Planned maintenance shall be communicated to users at least 48 hours in advance.
*   **Scalability:**
    *   All backend serverless functions shall be stateless and designed to scale automatically.
    *   The execution of serverless functions shall be automatically scaled by the Vercel platform based on incoming traffic.
    *   The system shall be designed to support thousands of concurrent users per merchant.
    *   The architecture shall accommodate significant data growth without performance degradation.
*   **Maintainability:**
    *   The system shall be built using a serverless architecture to promote maintainability.
    *   A minimum of 80% unit test code coverage shall be required for all backend services.
    *   Code shall adhere to defined linting and style standards enforced in the CI/CD pipeline.
    *   Infrastructure for external managed services (e.g., databases) shall be defined and managed using Terraform.
    *   Technical documentation, including architecture diagrams and API specifications, shall be maintained and kept current with the codebase.

#### **5.5 Data Retention (REQ-NFR-005)**
*   Analytical data shall be retained for 24 months on a rolling basis.
*   Abandoned cart records shall be purged after 90 days if not converted.
*   Upon account termination by a merchant, all associated data will be permanently deleted after a 90-day grace period, during which the data can be restored upon request.

#### **5.6 Compliance (REQ-NFR-006)**
*   The system shall be designed to be compliant with major data privacy regulations, including GDPR and CCPA.
*   All data stored within the system shall be classified (e.g., Public, Internal, Confidential, PII). Access controls and encryption standards shall be applied based on this classification.
*   The system shall provide features to support Data Subject Access Requests (DSAR), including data export and deletion, manageable by the 'Owner' role.
*   The system shall ensure a legal basis for all data processing activities, particularly for cart recovery emails, by providing clear consent mechanisms where required (see BR-006).
*   Clear privacy notices and terms of service shall be provided to users during registration and be accessible within the application.

### **6. Technical Requirements**

#### **6.1 Architecture (REQ-TEC-001)**
*   The system shall be built on a serverless-first architecture leveraging Vercel Functions.
*   The system shall employ a Command Query Responsibility Segregation (CQRS) pattern, with commands and queries handled by distinct serverless functions.
*   The system shall use a managed PostgreSQL service as the OLTP database for transactions.
*   The system shall use a managed ClickHouse service as the OLAP data warehouse for analytics.

#### **6.2 Technology Stack (REQ-TEC-002)**
*   **Frontend Framework**: React v18+ with Next.js v14+.
*   **Frontend State Management**: Zustand.
*   **Frontend UI Components**: shadcn/ui.
*   **Frontend Styling**: Tailwind CSS.
*   **Frontend Build & Hosting**: Vercel.
*   **Backend Language & Framework**: TypeScript with Fastify.
*   **Backend ORM**: Prisma.
*   **Backend API Design**: RESTful with an OpenAPI (Swagger) specification, automatically generated using `fastify-swagger`.
*   **Backend Authentication**: JWT (JSON Web Tokens) using RS256.
*   **Primary Database (OLTP)**: Vercel Postgres v15+ with the `pgvector` extension enabled.
*   **Analytical Database (OLAP)**: ClickHouse Cloud.
*   **Caching & Queuing**: Upstash for Redis and QStash.
*   **File Storage**: Cloudflare R2.
*   **Cloud Provider**: Vercel for compute, supplemented by managed data services.
*   **Container Orchestration**: Not Applicable (superseded by serverless architecture).
*   **Serverless Computing**: Vercel Functions.
*   **CI/CD Pipeline**: GitHub Actions.
*   **Infrastructure as Code**: Terraform for non-Vercel resources.
*   **Database Migrations**: Prisma Migrate.
*   **Testing Frameworks**: Jest for unit and integration testing; Playwright for end-to-end testing.
*   **Security & Code Quality**: Dependabot for dependency scanning; SonarQube for static code analysis (SAST) integrated into the CI/CD pipeline.
*   **AI/ML Integration**: OpenAI API integrated via a RAG pattern using `pgvector` for context retrieval.

#### **6.3 Data Pipeline (REQ-TEC-003)**
*   The system shall implement a data pipeline to synchronize data from the OLTP (PostgreSQL) to the OLAP (ClickHouse) database.
*   This pipeline shall use a Change Data Capture (CDC) mechanism to stream changes into Upstash QStash.
*   An ELT process shall consume messages from the queue to load and transform data into ClickHouse.
*   The data pipeline shall have robust monitoring to track data flow, latency, and error rates. A dead-letter queue (DLQ) mechanism shall be implemented to capture and handle messages that fail processing, allowing for manual inspection and reprocessing.
*   The target data freshness for analytical queries shall be under 5 minutes from the time of the original transaction.

### **7. Reporting & Monitoring (REQ-REP-001)**
*   Vercel's integrated observability tools shall be used for monitoring performance and application metrics.
*   A centralized logging solution shall be implemented by integrating Vercel with Axiom.
*   All serverless functions shall output structured logs (JSON format) to stdout/stderr for collection.
*   OpenTelemetry shall be integrated into all services to enable distributed tracing of requests across functions and external services.
*   The integrated Vercel dashboard and Axiom shall be the primary tools for creating monitoring dashboards and defining alert rules.
*   Critical alerts (e.g., >1% error rate, significant latency increase, data pipeline failure) shall be sent to PagerDuty.
*   Dashboards shall be created to monitor System Health (function invocations, duration, errors).
*   Dashboards shall be created to monitor API Performance (latency, error rates, request volume).
*   Dashboards shall be created to monitor Business Metrics (new sign-ups, active merchants, data ingestion volume).
*   Dashboards shall be created to monitor Data Pipeline Health (queue depth, processing latency, failure rates).
*   Dashboards shall be created to monitor Data Quality Metrics (e.g., record validation failures, reconciliation discrepancies).

### **8. Other Requirements**

#### **8.1 Risk Analysis Mitigations (REQ-OTH-001)**
*   **RISK-001 Mitigation (Salla API Rate Limiting):**
    *   The Data Ingestion service shall implement a rate limiter that respects Salla's API limits.
    *   The system shall use an exponential backoff strategy for retries on rate-limited requests.
    *   The system shall prioritize real-time webhooks over historical polling to minimize API calls.
*   **RISK-002 Mitigation (Data Warehouse Cost Overruns):**
    *   The system shall implement strict data retention policies.
    *   The data warehouse shall use partitioning and clustering keys effectively to optimize query performance and cost.
    *   The system shall be designed to start with a smaller instance size and scale up as needed based on monitoring of resource utilization.
*   **RISK-003 Mitigation (Salla API Schema Changes):**
    *   The anti-corruption layer shall include schema validation for incoming API and webhook data. In case of an unexpected breaking change from the Salla API, the system shall log the error, alert the operations team, and queue the malformed data for later processing, preventing system-wide failure.

#### **8.2 Documentation Requirements (REQ-OTH-002)**
*   **User Documentation:** The system shall be supported by comprehensive online user documentation, including feature guides, tutorials, and FAQs.
*   **Technical Documentation:** The development team shall maintain up-to-date technical documentation, including architecture diagrams, data models, API specifications, and key design decisions.
*   **Operations Documentation:** The operations team shall maintain runbooks for common operational tasks, including deployment, monitoring, incident response, and disaster recovery procedures.

#### **8.3 Testability Requirements (REQ-OTH-003)**
*   **Test Environments:** The Staging environment shall be a high-fidelity replica of the Production environment in terms of architecture, configuration, and third-party service integrations.
*   **Test Data Management:** A suite of anonymized or synthetic test data shall be available in non-production environments to facilitate comprehensive testing of all features without exposing real PII.
*   **Localization/Internationalization:** The application shall be built with internationalization (i18n) support in mind, using libraries to manage strings and layouts, even if the initial release is single-language. This ensures future localization efforts are simplified. The initial release shall support Arabic and English.

### **9. Transition Requirements**

#### **9.1 Implementation and Deployment Strategy (REQ-TRN-001)**
*   **Platform Deployment:** The system shall be deployed using a Continuous Deployment model where changes are automatically deployed to production after passing all automated tests in the CI/CD pipeline.
*   **Merchant Onboarding:** Merchant onboarding shall be a phased, self-service process. Each merchant's "go-live" shall be a "Big Bang" event, occurring immediately upon successful connection of their Salla store.

#### **9.2 Data Migration (REQ-TRN-002)**
*   **Process:** The initial data migration shall follow the process defined in FR-104.
*   **Extraction:** Data shall be extracted from the merchant's store via the Salla REST API.
*   **Transformation:** An anti-corruption layer shall transform Salla data models into the system's internal domain models during ingestion.
*   **Loading:** Data shall be loaded into the OLTP database (PostgreSQL) and subsequently pipelined to the OLAP data warehouse (ClickHouse) via the CDC process defined in REQ-TEC-003.
*   **Validation:** Post-migration, automated validation jobs shall run to compare key metrics (e.g., total order count, total sales value for the last 30 days) between the Salla API and the system's database to ensure data integrity. Discrepancies shall be logged and trigger an alert.

#### **9.3 Training and Support (REQ-TRN-003)**
*   **In-App Guidance:** The system shall provide in-app guided tours and tutorials for first-time users to explain core features like the dashboard, cart recovery setup, and AI assistant.
*   **Knowledge Base:** The system shall provide a comprehensive and searchable online knowledge base as specified in REQ-OTH-002.
*   **Contextual Help:** The UI shall include context-sensitive help icons or links that direct users to the relevant section of the knowledge base.

#### **9.4 Cutover Plan (for New Merchants) (REQ-TRN-004)**
*   **Go/No-Go Criteria:** A merchant's account shall be considered "live" only after the following criteria are met:
    *   Successful completion of the Salla OAuth 2.0 flow.
    *   Successful validation and secure storage of API access/refresh tokens.
    *   The initial historical data synchronization job has been successfully queued.
*   **Fallback Plan:**
    *   If the OAuth connection fails, the user shall be returned to the connection screen with a specific, user-friendly error message.
    *   If the initial data sync fails to start or fails completely after retries, the user shall be notified via the UI and email, and provided with a one-click option to restart the process. The operations team shall be alerted to investigate persistent failures.

#### **9.5 User Adoption and Decommissioning of Alternative Tools (REQ-TRN-005)**
*   **Value Proposition:** The system shall provide clear onboarding materials that highlight the benefits over manual data analysis (e.g., spreadsheets) or other tools.
*   **Data Portability:** The system shall provide full data export capabilities as defined in FR-306 to ensure merchants can transition away from the system without data lock-in.