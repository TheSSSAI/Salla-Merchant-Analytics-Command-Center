# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-046 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User views performance analytics for cart recovery... |
| As A User Story | As a Marketer or Store Owner, I want to view a ded... |
| User Persona | Marketer, Store Owner / Admin |
| Business Value | Provides actionable insights to measure and improv... |
| Functional Area | Cart Recovery |
| Story Theme | Analytics and Reporting |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-046-001

### 3.1.2 Scenario

Dashboard displays key performance indicators

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user with the 'Marketer' or 'Owner' role has at least one active cart recovery campaign that has sent emails

### 3.1.5 When

the user navigates to the 'Cart Recovery' > 'Analytics' section

### 3.1.6 Then

the dashboard correctly displays the following aggregate KPIs for the default date range: 'Emails Sent', 'Open Rate', 'Click-Through Rate', 'Carts Recovered', and 'Total Value Recovered'.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-046-002

### 3.2.2 Scenario

Filtering analytics by date range

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the user is viewing the Cart Recovery analytics dashboard

### 3.2.5 When

the user selects a new date range (e.g., 'Last 7 Days' or a custom range)

### 3.2.6 Then

all KPIs and visualizations on the dashboard update to reflect data only from within the selected date range.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-046-003

### 3.3.2 Scenario

Filtering analytics by a specific campaign

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the user is viewing the Cart Recovery analytics dashboard and has multiple campaigns

### 3.3.5 When

the user selects a specific campaign from a filter dropdown

### 3.3.6 Then

all KPIs and visualizations on the dashboard update to show performance data for only the selected campaign.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-046-004

### 3.4.2 Scenario

Dashboard displays an empty state

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

a user has not yet run any cart recovery campaigns or there is no data for the selected filter criteria

### 3.4.5 When

the user navigates to the Cart Recovery analytics dashboard

### 3.4.6 Then

the dashboard displays a clear 'No data available' message instead of showing '0' for all metrics or displaying a broken UI.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-046-005

### 3.5.2 Scenario

Unauthorized user attempts to access the dashboard

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a user is logged in with a role that does not have permission to view cart recovery analytics (e.g., 'Analyst')

### 3.5.5 When

the user attempts to navigate directly to the Cart Recovery analytics URL

### 3.5.6 Then

the system prevents access and redirects them to their default dashboard with an appropriate 'Permission Denied' notification.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-046-006

### 3.6.2 Scenario

Metric definitions are available

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the user is viewing the Cart Recovery analytics dashboard

### 3.6.5 When

the user hovers over an info icon next to a KPI (e.g., 'Open Rate')

### 3.6.6 Then

a tooltip appears displaying a clear definition of the metric and how it is calculated, consistent with the system's data dictionary (FR-307).

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-046-007

### 3.7.2 Scenario

Data freshness meets requirements

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

a cart has just been recovered as a result of a recovery email

### 3.7.5 When

the user views the Cart Recovery analytics dashboard after 5 minutes

### 3.7.6 Then

the 'Carts Recovered' and 'Total Value Recovered' KPIs have been updated to include the new data, adhering to the <5 minute data freshness target (NFR-104).

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- KPI 'Stat Cards' for each primary metric
- Date range picker with presets and custom range selection
- Dropdown filter for selecting specific campaigns
- A line or bar chart visualizing 'Value Recovered' over the selected time period
- Info icons with tooltips for each KPI definition

## 4.2.0 User Interactions

- User can click to select date range presets or open a calendar for custom range.
- User can click a dropdown to see a list of their campaigns and select one or more to filter by.
- Dashboard updates dynamically without a full page reload when filters are applied.

## 4.3.0 Display Requirements

- All monetary values must be formatted with the merchant's currency symbol and appropriate decimal places.
- Percentages (Open Rate, CTR) must be displayed with a '%' symbol.
- The dashboard must be responsive and usable on desktop, tablet, and mobile screen sizes.

## 4.4.0 Accessibility Needs

- All interactive elements (filters, buttons) must be keyboard accessible.
- Charts and graphs must have accessible labels and be compatible with screen readers.
- Color contrast must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-004

### 5.1.2 Rule Description

Metrics must be calculated according to the standardized system formulas (e.g., Conversion Rate, AOV). Open Rate = (Unique Opens / Emails Delivered) * 100. Click-Through Rate = (Unique Clicks / Emails Delivered) * 100.

### 5.1.3 Enforcement Point

Backend analytics processing service (OLAP queries).

### 5.1.4 Violation Handling

N/A - Calculation logic is fixed.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

REQ-OVR-003

### 5.2.2 Rule Description

Access to the Cart Recovery module and its analytics is restricted to 'Owner', 'Admin', and 'Marketer' roles.

### 5.2.3 Enforcement Point

API Gateway/Middleware and Frontend Router.

### 5.2.4 Violation Handling

API requests return a 403 Forbidden error. Frontend redirects to a safe page with a permission error message.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

Campaigns must be creatable before their performance can be analyzed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-043

#### 6.1.2.2 Dependency Reason

Email templates are a core part of campaigns whose performance is being measured.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-051

#### 6.1.3.2 Dependency Reason

The system must be tracking email events (sent, delivered, opened, clicked) to calculate the required metrics.

## 6.2.0.0 Technical Dependencies

- Backend API endpoints to serve aggregated analytics data from the OLAP database.
- Operational data pipeline (REQ-TEC-003) to move and transform event data into the OLAP database (ClickHouse).
- Integration with the email provider's (Postmark) webhooks to receive open and click events.

## 6.3.0.0 Data Dependencies

- Availability of cart, order, and customer data from the initial Salla sync.
- Availability of email event data (sends, opens, clicks) ingested from the email service provider.

## 6.4.0.0 External Dependencies

- Postmark (or other email provider) must provide reliable webhooks for tracking email engagement.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API endpoints serving the dashboard data must have a p95 response time below 200ms (NFR-101).
- The dashboard UI should load and become interactive in under 3 seconds.

## 7.2.0.0 Security

- All API requests for analytics data must be authenticated and authorized, ensuring a user can only see data for their own merchant account.
- Role-Based Access Control must be strictly enforced at the API level.

## 7.3.0.0 Usability

- The dashboard should present data in a clear, easily digestible format.
- Filters should be intuitive and provide immediate feedback by updating the view.

## 7.4.0.0 Accessibility

- The dashboard must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The dashboard must render correctly on the latest versions of modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Designing efficient OLAP queries in ClickHouse to aggregate data from multiple sources (email events, orders, carts).
- Ensuring the data pipeline that feeds the OLAP database is reliable and meets the freshness requirement.
- Developing a responsive and interactive frontend dashboard with data visualizations.

## 8.3.0.0 Technical Risks

- Potential for slow query performance if the ClickHouse schema is not optimized.
- Latency in the data pipeline could cause dashboard data to be stale, failing the freshness requirement.
- Inaccurate data if events from the email provider's webhooks are missed or processed incorrectly.

## 8.4.0.0 Integration Points

- Backend API <-> ClickHouse OLAP Database
- Frontend Dashboard <-> Backend Analytics API
- Data Ingestion Service <-> Postmark Webhooks

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security

## 9.2.0.0 Test Scenarios

- Verify each KPI calculation is correct against a known dataset.
- Test all filter combinations (date, campaign, date + campaign) and verify data accuracy.
- Test the UI behavior with no data.
- Test access control by attempting to access the page with an unauthorized role.
- End-to-end test: trigger an abandoned cart, verify email is sent, click the link, complete the purchase, and then verify the dashboard metrics update correctly.

## 9.3.0.0 Test Data Needs

- A merchant account with multiple cart recovery campaigns.
- A history of abandoned carts, some recovered and some not.
- Simulated email event data (sent, opened, clicked) for multiple campaigns.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.
- A tool for API testing like Postman or automated integration tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and integration tests implemented with >80% coverage for new logic
- E2E tests for core user flows (viewing, filtering) are passing
- User interface reviewed and approved by UX/Product Owner
- Performance of API queries verified against NFRs
- Security requirements (RBAC) validated
- Documentation for the new API endpoints is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- Requires both backend (API, OLAP query) and frontend (UI dashboard) work, which can be partially parallelized.
- Dependent on the completion of foundational cart recovery and email event tracking stories.

## 11.4.0.0 Release Impact

- This is a key feature for the Cart Recovery module, providing the primary mechanism for users to measure value and ROI.

