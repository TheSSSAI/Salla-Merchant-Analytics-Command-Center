# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-022 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User views the main dashboard with key performance... |
| As A User Story | As a merchant user, I want to view a central dashb... |
| User Persona | Store Owner, Admin, Analyst, Marketer |
| Business Value | Provides immediate, at-a-glance insight into busin... |
| Functional Area | Deep Analytics |
| Story Theme | Dashboard & Reporting |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Default dashboard view after login

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in merchant user and my initial data synchronization is complete

### 3.1.5 When

I navigate to the main dashboard page

### 3.1.6 Then

I see five distinct KPI cards: 'Total Sales', 'Number of Orders', 'Average Order Value (AOV)', 'Conversion Rate', and 'Abandoned Cart Rate'.

### 3.1.7 Validation Notes

Verify that all five KPI cards are rendered and the date filter is visible and set to the default value (e.g., 'Last 30 Days').

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Changing the time period filter

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing the main dashboard

### 3.2.5 When

I select a new time period from the date range filter (e.g., 'Last 7 Days')

### 3.2.6 Then

all five KPI cards update to display the calculated values for the newly selected time period.

### 3.2.7 Validation Notes

Test with each preset date range and a custom date range. A loading indicator (e.g., skeleton screen) should be visible during the data fetch.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Dashboard view for a store with no data in the selected period

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

I am a logged-in merchant user viewing the dashboard

### 3.3.5 When

I select a time period for which there is no sales or cart activity

### 3.3.6 Then

the KPI cards for 'Total Sales', 'Number of Orders', and 'AOV' display '0' or a formatted currency equivalent (e.g., '$0.00').

### 3.3.7 Validation Notes

Verify that rate-based KPIs ('Conversion Rate', 'Abandoned Cart Rate') display '0%' or 'N/A' and that no application errors are thrown.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Dashboard view during initial data synchronization

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am a new merchant user and the initial historical data sync is in progress

### 3.4.5 When

I navigate to the main dashboard

### 3.4.6 Then

I see a prominent message indicating that data is still syncing and metrics may be incomplete.

### 3.4.7 Validation Notes

The application must remain stable and not crash. The message should be clear and non-blocking, as per FR-104.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Backend API fails to load dashboard data

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a logged-in merchant user

### 3.5.5 When

I navigate to the dashboard and the backend API call to fetch KPI data fails

### 3.5.6 Then

the dashboard area displays a user-friendly error message (e.g., 'Could not load dashboard data. Please try again.').

### 3.5.7 Validation Notes

The page should not be blank or show a technical error code. The rest of the application navigation should remain functional.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Verification of KPI calculation logic

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the system has a known set of order and cart data for a specific time period

### 3.6.5 When

I view the dashboard for that time period

### 3.6.6 Then

the displayed values for each KPI must match the values calculated using the formulas defined in business rule BR-004.

### 3.6.7 Validation Notes

This requires a test environment with a controlled dataset. QA will verify dashboard values against pre-calculated expected values.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A container for the dashboard.
- Five individual 'KPI cards', one for each metric.
- A date range selector component with presets ('Today', 'Last 7 Days', 'Last 30 Days') and a custom range picker.
- Loading indicators (e.g., skeleton loaders) for the KPI cards.
- An error message display area.

## 4.2.0 User Interactions

- The dashboard is the default view after a successful login.
- Clicking the date range selector opens a dropdown or calendar view.
- Selecting a new date range triggers a data refresh for all KPI cards.

## 4.3.0 Display Requirements

- Each KPI card must clearly display the metric's name and its calculated value.
- Monetary values must be formatted according to a standard currency format.
- Percentage values must be displayed with a '%' symbol.
- The currently selected date range must be clearly visible.

## 4.4.0 Accessibility Needs

- All interactive elements (date picker) must be keyboard navigable.
- KPI cards must use appropriate heading tags for structure.
- KPI values and labels must have sufficient color contrast to meet WCAG 2.1 AA standards (REQ-INT-005).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-004

### 5.1.2 Rule Description

All KPIs must be calculated using the standardized formulas defined in the SRS.

### 5.1.3 Enforcement Point

Backend API service responsible for dashboard data aggregation.

### 5.1.4 Violation Handling

A calculation error should be logged, and the API should return a server error to prevent displaying incorrect data.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

REQ-FUN-301

### 5.2.2 Rule Description

Dashboard KPIs must be updated based on the analytical data pipeline, with a target freshness of under 5 minutes.

### 5.2.3 Enforcement Point

Data Pipeline (REQ-TEC-003) and OLAP query layer.

### 5.2.4 Violation Handling

Monitoring alerts should be triggered if data freshness exceeds the defined threshold.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-004

#### 6.1.1.2 Dependency Reason

User must be able to log in to access the dashboard.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-009

#### 6.1.2.2 Dependency Reason

A Salla store must be connected to have data to display.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-012

#### 6.1.3.2 Dependency Reason

The dashboard UI needs to be aware of the initial data sync status to display appropriate messages.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint to serve the aggregated KPI data.
- The OLAP data warehouse (ClickHouse) must be provisioned and accessible.
- The data pipeline (CDC from PostgreSQL to ClickHouse) must be operational to ensure data freshness.

## 6.3.0.0 Data Dependencies

- Requires access to processed and aggregated data from Orders and Carts tables in the OLAP database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The backend API endpoint for the dashboard must have a p95 response time below 200ms (NFR-101).
- The dashboard page must achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds (NFR-103).

## 7.2.0.0 Security

- All API requests for dashboard data must be authenticated and authorized.
- The data returned must be strictly scoped to the requesting merchant's tenant ID to ensure data isolation (REQ-OVR-005).

## 7.3.0.0 Usability

- The dashboard must provide a clear and immediate understanding of business performance.
- The date range filter must be intuitive and easy to operate.

## 7.4.0.0 Accessibility

- The dashboard must comply with WCAG 2.1 Level AA standards (REQ-INT-005).

## 7.5.0.0 Compatibility

- The dashboard must render correctly on modern, evergreen web browsers (Chrome, Firefox, Safari, Edge) on desktop, tablet, and mobile devices (REQ-OVR-001, REQ-INT-005).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires an optimized OLAP query to aggregate data from large tables efficiently.
- Frontend state management to handle loading, data, error, and date range states.
- Coordination with the data pipeline team to ensure data availability and freshness in ClickHouse.

## 8.3.0.0 Technical Risks

- The OLAP query may be slow if not properly indexed or structured, failing to meet the performance requirement.
- Data discrepancies between the OLTP source and OLAP replica could lead to inaccurate KPIs if the pipeline has issues.

## 8.4.0.0 Integration Points

- Frontend client to Backend API.
- Backend API to ClickHouse OLAP database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify KPI calculations against a known dataset.
- Test dashboard behavior with an empty dataset.
- Test UI responsiveness across different screen sizes.
- Test the API endpoint under load to validate performance.
- Test access control to ensure one merchant cannot see another's data.

## 9.3.0.0 Test Data Needs

- A seeded test database with a predictable dataset to validate KPI calculations.
- An empty database to test the 'no data' scenario.
- A large dataset to conduct performance testing.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.
- Lighthouse/PageSpeed Insights for frontend performance.
- A load testing tool (e.g., k6) for the backend API.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests are written and achieve >= 80% code coverage for new logic.
- E2E tests for the main dashboard flow are passing.
- Performance requirements (API p95 < 200ms, LCP < 2.5s) have been verified.
- Security checks, including tenant data isolation, have been validated.
- The dashboard is fully responsive and meets WCAG 2.1 AA accessibility standards.
- Any necessary technical documentation for the API endpoint has been created or updated.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for the analytics module and a high-priority item for users.
- Dependent on the data pipeline being functional; should be scheduled after the pipeline's core implementation is complete.

## 11.4.0.0 Release Impact

- This story is critical for the Minimum Viable Product (MVP) release.

