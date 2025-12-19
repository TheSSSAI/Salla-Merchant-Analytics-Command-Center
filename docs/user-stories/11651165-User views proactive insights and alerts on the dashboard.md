# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-038 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User views proactive insights and alerts on the da... |
| As A User Story | As a Store Owner, I want to see a dedicated sectio... |
| User Persona | Store Owner / Admin, Data Analyst, Marketer |
| Business Value | Reduces time-to-insight by automatically highlight... |
| Functional Area | AI Assistant |
| Story Theme | Dashboard Intelligence and Automation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display of a significant positive trend alert

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a merchant has historical sales data establishing a weekly average, and the system's analysis job is running

### 3.1.5 When

the merchant's sales in the current week exceed the historical weekly average by a predefined threshold (e.g., 30%)

### 3.1.6 Then

an insight card is generated and displayed in the 'AI Insights' section on the dashboard with a message like 'Sales are up 30% this week compared to your monthly average.'

### 3.1.7 Validation Notes

Seed the database with historical data. Trigger the analysis job. Verify the correct insight card appears on the dashboard for the specific merchant.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Display of a significant negative trend alert (anomaly)

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a merchant has a stable historical abandoned cart rate, and the system's analysis job is running

### 3.2.5 When

a sudden spike in abandoned carts is detected that deviates from the norm by more than 3 standard deviations

### 3.2.6 Then

an insight card is generated and displayed with a message like 'Anomaly Detected: A sudden spike in abandoned carts has been detected in the last 4 hours.'

### 3.2.7 Validation Notes

Manipulate test data to create a spike in abandoned carts. Run the analysis job. Verify the anomaly alert card is displayed.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

UI state for insufficient data

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

a new merchant has just connected their store and the initial data sync has provided less than 7 days of historical data

### 3.3.5 When

the merchant loads the main dashboard

### 3.3.6 Then

the 'AI Insights' section displays a message indicating more data is required, such as 'We're still gathering enough data to generate insights. Check back soon.'

### 3.3.7 Validation Notes

Test with a new merchant account with minimal data. Verify the correct placeholder message is shown instead of an error or empty state.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

UI state when no new insights are available

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a merchant's store data is trending within normal, expected parameters and no new insights have been generated in the last 24 hours

### 3.4.5 When

the merchant loads the main dashboard

### 3.4.6 Then

the 'AI Insights' section displays a message like 'No new insights right now. We're keeping an eye on your data.'

### 3.4.7 Validation Notes

Ensure the analysis job runs against a 'stable' dataset and generates no new insights. Verify the UI shows the correct 'all clear' message.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

UI loading and error states

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

the merchant is on the main dashboard

### 3.5.5 When

the API call to fetch insights is in progress, OR the API call fails

### 3.5.6 Then

the 'AI Insights' section must first show a loading skeleton/spinner, and if the call fails, it must display a user-friendly error message like 'Could not load insights at this time.'

### 3.5.7 Validation Notes

Use browser dev tools to simulate a slow network response to check the loading state and to mock a 500 error response to check the error state.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Data scoping for insights

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

there are two separate merchants, Merchant A and Merchant B, in the system

### 3.6.5 When

a significant sales trend occurs only for Merchant A

### 3.6.6 Then

the corresponding insight card must appear only on Merchant A's dashboard and must not be visible on Merchant B's dashboard.

### 3.6.7 Validation Notes

Requires integration testing with at least two distinct merchant accounts to confirm strict data isolation.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated 'AI Insights' section/widget on the main dashboard.
- Individual 'Insight Cards' to display each alert.
- Loading skeletons for the insight section.
- Error message display area within the widget.
- Placeholder text for 'insufficient data' and 'no new insights' states.

## 4.2.0 User Interactions

- The section should load automatically with the dashboard.
- There is no direct user interaction required to generate insights; they are displayed passively.

## 4.3.0 Display Requirements

- Each insight card must contain a clear, concise title and a descriptive message.
- Cards should be visually distinct based on type (e.g., color-coding or icons for positive, negative, neutral).
- A timestamp indicating when the insight was generated should be visible on each card.

## 4.4.0 Accessibility Needs

- Color-coding must be supplemented with icons or text to be accessible to color-blind users (WCAG 2.1).
- The section must be navigable via keyboard.
- Loading and error states must be announced by screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-AI-001

### 5.1.2 Rule Description

An insight is considered 'significant' if a key metric deviates from its 30-day rolling average by more than a configurable number of standard deviations (default: 2.5).

### 5.1.3 Enforcement Point

Backend asynchronous analysis service.

### 5.1.4 Violation Handling

N/A - This is a generation rule, not a validation rule.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-AI-002

### 5.2.2 Rule Description

A minimum of 7 days of historical data is required before the system will attempt to generate the first trend-based insights for a new merchant.

### 5.2.3 Enforcement Point

Backend asynchronous analysis service.

### 5.2.4 Violation Handling

The service skips insight generation for the merchant and logs the reason.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-013

#### 6.1.1.2 Dependency Reason

Requires the initial data synchronization to be complete to provide a baseline dataset for analysis.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-022

#### 6.1.2.2 Dependency Reason

Requires the main dashboard to be implemented as a container for displaying the insights.

## 6.2.0.0 Technical Dependencies

- The data pipeline (REQ-TEC-003) must be operational to feed near real-time data to the OLAP database.
- A scheduled job runner (e.g., Vercel Cron Jobs) must be configured to trigger the analysis process.
- A backend API endpoint to serve the generated insights to the frontend.

## 6.3.0.0 Data Dependencies

- Access to historical and recent data for orders, customers, and carts in the OLAP (ClickHouse) database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The insight generation process must run asynchronously and not impact user-facing API performance.
- The API endpoint for fetching pre-generated insights must respond in under 200ms (p95) as per NFR-101.
- The presence of the AI Insights widget must not increase the dashboard's Largest Contentful Paint (LCP) beyond the 2.5s target (NFR-103).

## 7.2.0.0 Security

- All database queries for insight generation and retrieval must be strictly scoped by `merchant_id` to ensure tenant data isolation (REQ-NFR-003).
- The content of insights must not expose any Personally Identifiable Information (PII).

## 7.3.0.0 Usability

- Insights must be written in clear, simple language that is easily understandable by a non-technical merchant.
- The feature should require zero configuration from the user to start working.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards (REQ-INT-005).

## 7.5.0.0 Compatibility

- The feature must render correctly on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

High

## 8.2.0.0 Complexity Factors

- Designing and implementing a robust and configurable rule engine for identifying 'significant' events.
- Setting up and managing the asynchronous background job for analysis.
- Requires careful data modeling for storing and managing the lifecycle of generated insights.
- Balancing insight sensitivity to be useful without being overly 'noisy' for the user.

## 8.3.0.0 Technical Risks

- The analysis job could be computationally expensive and may require optimization to control costs and execution time as data volume grows.
- Poorly tuned rules could lead to a high volume of low-value insights, diminishing the feature's usefulness.

## 8.4.0.0 Integration Points

- Backend: Vercel Cron Jobs for scheduling.
- Backend: OLAP database (ClickHouse) for data analysis.
- Backend: OLTP database (PostgreSQL) for storing generated insights.
- Frontend: Main Dashboard component for display.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify correct insight generation for a dataset with a clear positive trend.
- Verify correct anomaly detection for a dataset with a sudden spike.
- Verify the 'insufficient data' state for a new user.
- Verify the 'no new insights' state for a stable dataset.
- Verify multi-tenant data isolation between two different merchant accounts.

## 9.3.0.0 Test Data Needs

- Curated, time-series datasets representing various business scenarios (stable, growth, decline, sudden spike).
- A test account with less than 7 days of data.
- At least two separate test merchant accounts to validate data scoping.

## 9.4.0.0 Testing Tools

- Jest for unit tests of the analysis logic.
- Playwright for E2E testing of the dashboard UI.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests for the analysis rule engine implemented and passing with >80% coverage
- Integration testing of the end-to-end insight generation and display flow completed successfully
- E2E tests verifying the UI states (loading, error, data, no data) are passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirements for the dashboard load and API response time are verified
- Security requirements for data isolation are validated through testing
- Documentation for the insight generation rules and process is created
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

13

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a large story that could be broken down into backend (analysis job, API) and frontend (UI component) stories if needed.
- Requires significant effort in creating realistic test data to ensure the quality of the insights.

## 11.4.0.0 Release Impact

- This is a key feature for the AI Assistant module and a major value proposition for the product. It should be highlighted in release notes and marketing materials.

