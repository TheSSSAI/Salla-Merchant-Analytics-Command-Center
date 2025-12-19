# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-024 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User compares performance metrics between two time... |
| As A User Story | As a data-driven merchant, I want to select a seco... |
| User Persona | Store Owner / Admin, Data Analyst, Marketer |
| Business Value | Provides critical context to data, enabling mercha... |
| Functional Area | Deep Analytics |
| Story Theme | Reporting Enhancements |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Enable comparison mode and select a comparison period

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am viewing an analytics report (e.g., Sales Trends) with a primary date range selected (e.g., 'Last 30 Days').

### 3.1.5 When

I click the 'Compare' control and select a second date range (e.g., 'Previous 30 Days').

### 3.1.6 Then

The report view updates to include data from the comparison period, and a loading indicator is shown during the data fetch.

### 3.1.7 Validation Notes

Verify that the UI control for enabling comparison is present and that selecting a second date range triggers a data fetch and UI update.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

KPI cards display comparative data

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I have enabled comparison mode on a report with KPI cards (e.g., Total Sales, AOV).

### 3.2.5 When

The report data has loaded for both the primary and comparison periods.

### 3.2.6 Then

Each KPI card must display the metric value for the primary period.

### 3.2.7 And

A tooltip on the percentage change should reveal the absolute metric value from the comparison period.

### 3.2.8 Validation Notes

Check multiple KPIs. Verify the percentage change calculation is correct: `((current - previous) / |previous|) * 100`. Verify color and icon indicators.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Charts display comparative data series

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I have enabled comparison mode on a report with a time-series chart (e.g., Sales over time).

### 3.3.5 When

The report data has loaded for both periods.

### 3.3.6 Then

The chart must render two distinct data series (e.g., two lines of different colors).

### 3.3.7 And

A clear legend must be visible, labeling each series with its corresponding time period (e.g., 'Jan 1 - Jan 31' and 'Dec 1 - Dec 31').

### 3.3.8 Validation Notes

Verify that both data series are plotted correctly on the chart and that the legend is accurate.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Disable comparison mode

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am viewing a report with comparison mode enabled.

### 3.4.5 When

I disable the comparison feature.

### 3.4.6 Then

The report should revert to showing data for only the primary date range.

### 3.4.7 And

All comparison indicators (percentage changes, second chart series) must be removed from the UI.

### 3.4.8 Validation Notes

Ensure the UI state correctly reverts to the single-period view without requiring a page reload.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Comparison period has no data

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am viewing a report for a primary period that has data (e.g., 10 orders).

### 3.5.5 When

I select a comparison period that has no data (e.g., 0 orders).

### 3.5.6 Then

The KPI percentage change should correctly indicate a 100% decrease if the primary value is non-zero.

### 3.5.7 And

The chart should render the comparison data series as a flat line at zero.

### 3.5.8 Validation Notes

Test the `(current - 0) / 0` scenario. The system should handle this gracefully, likely showing 'N/A' or a 100% decrease, not an error.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Primary period has no data, comparison period has data

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am viewing a report for a primary period that has no data (e.g., 0 orders).

### 3.6.5 When

I select a comparison period that has data (e.g., 10 orders).

### 3.6.6 Then

The KPI percentage change should correctly indicate a 100% increase (or be displayed as 'New').

### 3.6.7 Validation Notes

Test the `(0 - previous) / |previous|` scenario. The system should show a 100% increase.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Comparison settings persist when navigating between reports

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

I have enabled comparison mode on the 'Sales Trend' report.

### 3.7.5 When

I navigate to the 'Product Performance' report.

### 3.7.6 Then

The 'Product Performance' report should also load in comparison mode with the same primary and comparison date ranges selected.

### 3.7.7 Validation Notes

Verify that the date range and comparison state are part of the application's global or shared state, not local to a single report component.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Compare' button/link/toggle adjacent to the primary date range picker.
- A second date range picker that appears when comparison mode is active.
- Color-coded and icon-based (e.g., ▲/▼) indicators for percentage change on KPI cards.
- Tooltips on KPI cards to show comparison period's absolute value.
- A clear legend on all charts to differentiate between the primary and comparison data series.

## 4.2.0 User Interactions

- User clicks to enable/disable comparison mode.
- User selects start and end dates from the comparison date picker.
- User hovers over KPI percentage change to see a tooltip with more detail.

## 4.3.0 Display Requirements

- Reports must clearly display data for both selected time periods simultaneously.
- Percentage change calculations must be clearly visible and easy to understand.
- The selected comparison period must be clearly stated in the UI.

## 4.4.0 Accessibility Needs

- Color indicators for positive/negative change must be accompanied by non-color-based indicators (icons, screen-reader text) to meet WCAG 2.1 AA.
- All interactive elements (buttons, date pickers) must be keyboard accessible and have proper focus states.

# 5.0.0 Business Rules

- {'rule_id': 'BR-004', 'rule_description': "Percentage change calculation must handle zero values in the denominator. If the previous period's value is 0 and the current is > 0, it is considered a 100% increase. If both are 0, it is a 0% change.", 'enforcement_point': 'Backend API during data aggregation.', 'violation_handling': 'The system should not produce an error (e.g., division by zero). It should return a valid, understandable result.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-023

#### 6.1.1.2 Dependency Reason

This story extends the functionality of the primary date filter. The primary date filter must exist before a comparison can be added.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-022

#### 6.1.2.2 Dependency Reason

The underlying data models, API endpoints, and UI components for displaying KPIs must be in place to be extended with comparison data.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-029

#### 6.1.3.2 Dependency Reason

The reports themselves (Sales, Customer, Product) must exist before this cross-cutting comparison feature can be applied to them.

## 6.2.0.0 Technical Dependencies

- Backend API capable of querying and returning aggregated data for two distinct time periods in a single request.
- OLAP database (ClickHouse) with optimized queries for dual-period analysis.
- Frontend charting library that supports rendering and labeling multiple data series.

## 6.3.0.0 Data Dependencies

- Sufficient historical data must be present in the OLAP data warehouse to make comparisons meaningful.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for a report with comparison enabled should not exceed the standard response time by more than 50%. Target p95 response time for the data fetch should be under 2 seconds.

## 7.2.0.0 Security

- All data queries must remain strictly scoped to the authenticated merchant's `merchant_id`.

## 7.3.0.0 Usability

- The process of enabling comparison and selecting a second period should be intuitive and require minimal clicks.
- The presentation of comparative data must be clear and unambiguous to avoid misinterpretation.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards, particularly regarding color contrast and non-text content.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported modern browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Backend query optimization is required to fetch two datasets from ClickHouse without significant performance penalty.
- Frontend state management needs to handle two date ranges, a comparison toggle state, and two sets of data for each report.
- Applying the comparison logic consistently across multiple different reports (Sales, Customer, Product) which may have different data structures.

## 8.3.0.0 Technical Risks

- Poorly optimized OLAP queries could lead to slow report loading times, degrading user experience.
- Inconsistent UI/UX for comparison across different reports could confuse users.

## 8.4.0.0 Integration Points

- Frontend report components.
- Backend analytics API service.
- OLAP (ClickHouse) database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Enable comparison, verify KPI and chart updates.
- Disable comparison, verify UI reverts.
- Test with overlapping date ranges.
- Test with a comparison period that has zero data.
- Test with a primary period that has zero data.
- Verify keyboard navigation for all new UI controls.
- Verify screen reader output for comparative KPIs.

## 9.3.0.0 Test Data Needs

- A dataset with known values for at least two distinct time periods to validate calculations.
- A dataset that includes a period with zero activity.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing.
- Code reviewed and approved by team.
- Unit and integration tests implemented with sufficient coverage (>80%).
- E2E tests covering the main user flows are passing.
- User interface reviewed for consistency and usability.
- Performance testing confirms API response times are within the defined NFR.
- Accessibility audit passed for new UI components.
- Functionality is verified on all target reports (Sales, Customer, Product).
- Story deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a cross-cutting feature. The team may choose to implement the core logic and apply it to one report first (as a 5-point story), then create smaller stories to apply the pattern to other reports.
- Requires both frontend and backend development effort, which should be coordinated.

## 11.4.0.0 Release Impact

This is a significant enhancement to the analytics module and should be highlighted in release notes and user communications.

