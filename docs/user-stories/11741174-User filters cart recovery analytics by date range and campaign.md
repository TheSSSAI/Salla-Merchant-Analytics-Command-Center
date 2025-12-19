# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-047 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User filters cart recovery analytics by date range... |
| As A User Story | As a Marketer or Store Owner, I want to filter my ... |
| User Persona | Marketer, Store Owner / Admin |
| Business Value | Enables detailed performance analysis of cart reco... |
| Functional Area | Cart Recovery |
| Story Theme | Analytics and Reporting |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Filter by a preset date range

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am viewing the Cart Recovery analytics dashboard which has data spanning the last 60 days

### 3.1.5 When

I select the 'Last 30 Days' preset from the date range filter

### 3.1.6 Then

all displayed metrics (emails sent, open rate, recovered sales, etc.) are recalculated and updated to reflect data only from the past 30 days.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Filter by a custom date range

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing the Cart Recovery analytics dashboard

### 3.2.5 When

I use the date picker to select a custom date range from 15 days ago to 5 days ago

### 3.2.6 Then

all displayed metrics are recalculated and updated to reflect data only from that specific 10-day period.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Filter by a specific campaign

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am viewing the Cart Recovery analytics dashboard and there are multiple active campaigns

### 3.3.5 When

I select a single campaign named 'Q1 Promo Campaign' from the campaign filter dropdown

### 3.3.6 Then

all displayed metrics are recalculated and updated to reflect data only for the 'Q1 Promo Campaign'.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Filter by both date range and campaign

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am viewing the Cart Recovery analytics dashboard

### 3.4.5 When

I select the 'Last 7 Days' date range and the 'Q1 Promo Campaign'

### 3.4.6 Then

all displayed metrics are recalculated and updated to reflect data for the 'Q1 Promo Campaign' that occurred within the last 7 days.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Clear all filters

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I have applied a date range filter and a campaign filter on the Cart Recovery analytics dashboard

### 3.5.5 When

I click the 'Clear Filters' button

### 3.5.6 Then

both the date range and campaign filters are reset to their default state, and the dashboard metrics are updated to show the default view (e.g., all campaigns, default date range).

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Filter combination yields no data

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am viewing the Cart Recovery analytics dashboard

### 3.6.5 When

I apply a filter combination (e.g., a date range) for which no cart recovery activity occurred

### 3.6.6 Then

the dashboard charts and KPI displays are replaced with a clear, user-friendly message stating 'No data available for this selection'.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

URL reflects filter state

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

I am viewing the Cart Recovery analytics dashboard

### 3.7.5 When

I apply a date range filter and a campaign filter

### 3.7.6 Then

the browser's URL is updated with query parameters that represent the selected filters (e.g., `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&campaign_id=123`).

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A date range picker component with presets (e.g., 'Last 7 Days', 'Last 30 Days') and a custom range selector.
- A multi-select dropdown or similar component to select one or more campaigns.
- A 'Clear Filters' or 'Reset' button.
- Loading indicators (e.g., spinners) on the dashboard widgets while data is being fetched after applying a filter.

## 4.2.0 User Interactions

- Selecting a filter option should automatically trigger a data refresh for the dashboard.
- The state of the filters should persist for the duration of the user's session.
- The date picker must prevent the user from selecting an end date that is earlier than the start date.

## 4.3.0 Display Requirements

- The currently applied filters must be clearly visible to the user.
- If a filter combination results in no data, a message must be displayed instead of empty or broken charts.

## 4.4.0 Accessibility Needs

- All filter controls must be fully keyboard accessible (navigable via Tab, selectable via Enter/Space).
- All controls must have appropriate ARIA labels for screen reader compatibility, adhering to WCAG 2.1 Level AA.

# 5.0.0 Business Rules

- {'rule_id': 'BR-009', 'rule_description': "Analytics for deleted or archived campaigns should remain available for historical reporting. The campaign filter should list these campaigns, possibly with an '(Archived)' suffix, if they have data within the selected date range.", 'enforcement_point': 'Backend API query for populating the campaign filter list and for fetching analytics data.', 'violation_handling': 'N/A - this is a design rule.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

The system must support the creation of campaigns before analytics can be filtered by them.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-046

#### 6.1.2.2 Dependency Reason

The base Cart Recovery analytics dashboard with its core metrics must exist before filtering functionality can be added to it.

## 6.2.0.0 Technical Dependencies

- Availability of the OLAP (ClickHouse) database with the necessary indexed columns (timestamp, merchant_id, campaign_id).
- A frontend component library (shadcn/ui) that provides accessible date picker and dropdown components.

## 6.3.0.0 Data Dependencies

- The data pipeline must be populating the OLAP database with event data that includes a `campaign_id` for every relevant action (email sent, opened, clicked, cart recovered).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The dashboard analytics must refresh within 3 seconds after a filter is applied, for a merchant with up to 1 million cart recovery events.

## 7.2.0.0 Security

- All API requests for filtered analytics data must be authenticated and authorized.
- The backend query must be strictly scoped by the authenticated user's `merchant_id` to prevent data leakage between tenants.

## 7.3.0.0 Usability

- The filtering controls should be intuitive and placed in a conventional location (e.g., top of the dashboard).
- The system should provide immediate feedback (e.g., loading state) after a filter is changed.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported modern, evergreen web browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordinated work between frontend (UI components, state management) and backend (API endpoint, optimized database query).
- The performance of the OLAP database query is critical and may require optimization (e.g., materialized views, proper indexing) to meet the NFR.
- Ensuring the data model in the OLAP database supports efficient filtering by campaign and date.

## 8.3.0.0 Technical Risks

- Poorly optimized database queries could lead to slow dashboard load times, failing the performance NFR.
- Inconsistent data in the `campaign_id` field could lead to inaccurate reporting.

## 8.4.0.0 Integration Points

- Frontend client to the backend analytics API.
- Backend analytics API to the OLAP (ClickHouse) database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify each filter (date, campaign) works independently.
- Verify filters work in combination.
- Verify the 'clear filters' functionality.
- Verify the 'no data available' state.
- Verify URL parameter updates and page load from a parameterized URL.
- Test with a large dataset to validate performance NFR.

## 9.3.0.0 Test Data Needs

- A test merchant account with multiple cart recovery campaigns.
- A significant volume of historical cart recovery event data spanning several months.
- Data that includes archived/deleted campaigns.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and integration tests implemented with >80% coverage for new code
- E2E tests for key user flows are passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirement of <3s data refresh is verified
- Security requirements (tenant data isolation) validated via code review and testing
- Accessibility audit passed for new components
- Documentation for the new API endpoint is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-041 and US-046 and cannot be started until they are complete.
- Requires both frontend and backend developer capacity.

## 11.4.0.0 Release Impact

This is a key feature for the Cart Recovery module, significantly enhancing its analytical capabilities.

