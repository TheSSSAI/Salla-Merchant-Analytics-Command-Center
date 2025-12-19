# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-026 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User views a report segmenting customers as 'New' ... |
| As A User Story | As a Merchant (Owner, Admin, Analyst, or Marketer)... |
| User Persona | Store Owner / Admin, Data Analyst, Marketer |
| Business Value | Provides critical insights into the health of the ... |
| Functional Area | Deep Analytics |
| Story Theme | Customer Analytics |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Viewing the report with default date range

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user with permission to view analytics

### 3.1.5 When

I navigate to the Customer Analytics section

### 3.1.6 Then

I see a 'New vs. Returning Customers' report displaying segmented data for the default time period (e.g., last 30 days).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Correct data segmentation and metrics

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the 'New vs. Returning Customers' report is displayed

### 3.2.5 When

I view the data table in the report

### 3.2.6 Then

the table must contain rows for 'New Customers', 'Returning Customers', and 'Total', and columns for 'Number of Customers', 'Total Sales', 'Number of Orders', and 'Average Order Value (AOV)' for each segment.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Report visualization

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the 'New vs. Returning Customers' report is displayed

### 3.3.5 When

I view the report

### 3.3.6 Then

a visualization (e.g., a pie chart or stacked bar chart) is present, showing the percentage split of customers or sales between the 'New' and 'Returning' segments.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Filtering report by a custom date range

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am viewing the 'New vs. Returning Customers' report

### 3.4.5 When

I select a new date range using the global date filter

### 3.4.6 Then

all metrics and visualizations in the report update to reflect the data for the newly selected period.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Comparing data against a previous period

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am viewing the 'New vs. Returning Customers' report

### 3.5.5 When

I select a comparison period using the date filter

### 3.5.6 Then

the data table updates to show the percentage change for each metric compared to the previous period.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Exporting report data

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

I am viewing the 'New vs. Returning Customers' report with a specific date range selected

### 3.6.5 When

I click the 'Export to CSV' button

### 3.6.6 Then

a CSV file is downloaded containing the segmented data currently displayed in the table.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Report behavior with no data

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

I am viewing the 'New vs. Returning Customers' report

### 3.7.5 When

I select a date range in which there were no orders

### 3.7.6 Then

the report area displays a user-friendly message like 'No data available for this period' instead of empty charts or tables.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Report behavior with only new customers

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

I am viewing the 'New vs. Returning Customers' report

### 3.8.5 When

I select a date range where all orders were from first-time customers

### 3.8.6 Then

the 'Returning Customers' segment shows zero for all metrics, and the visualization accurately reflects a 100% 'New Customer' composition.

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

Report performance

### 3.9.3 Scenario Type

Happy_Path

### 3.9.4 Given

I am a user on a store with up to 50,000 orders

### 3.9.5 When

I load the report for a 90-day period

### 3.9.6 Then

the report and its data must load in under 3 seconds.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Data table with columns for Segment, Customers, Sales, Orders, AOV.
- Chart component (Pie or Bar) for visualization.
- Tooltip or info icon next to the report title.
- Integration with the global date range filter component.

## 4.2.0 User Interactions

- User can select a date range, and the report updates automatically.
- User can hover over chart segments to see specific values/percentages.
- User can click an info icon to see definitions for 'New' and 'Returning' customers.

## 4.3.0 Display Requirements

- Monetary values (Sales, AOV) must be formatted according to the merchant's currency.
- Comparison data should show percentage change with indicators for positive (green) or negative (red) change.

## 4.4.0 Accessibility Needs

- Chart elements must be keyboard navigable and have appropriate ARIA labels.
- Data table must use proper `<table>`, `<th>`, and `<td>` tags for screen reader compatibility.
- Color choices for charts must have sufficient contrast (WCAG 2.1 AA).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-CUST-001

### 5.1.2 Rule Description

A 'New Customer' is defined as a customer whose first-ever completed order falls within the selected date range.

### 5.1.3 Enforcement Point

Backend data query (OLAP)

### 5.1.4 Violation Handling

N/A - This is a definitional rule for data aggregation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-CUST-002

### 5.2.2 Rule Description

A 'Returning Customer' is defined as a customer who places an order within the selected date range but whose first-ever completed order occurred before the start of the selected date range.

### 5.2.3 Enforcement Point

Backend data query (OLAP)

### 5.2.4 Violation Handling

N/A - This is a definitional rule for data aggregation.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-012

#### 6.1.1.2 Dependency Reason

Requires initial data synchronization to be complete to have historical data for analysis.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-023

#### 6.1.2.2 Dependency Reason

Requires the global date filter component to be available for filtering the report.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-024

#### 6.1.3.2 Dependency Reason

Requires the period comparison feature of the date filter to be implemented.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-033

#### 6.1.4.2 Dependency Reason

Requires the generic 'Export to CSV' functionality to be implemented.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-034

#### 6.1.5.2 Dependency Reason

Requires the Data Dictionary feature to provide in-app definitions for metrics.

## 6.2.0.0 Technical Dependencies

- The OLAP data warehouse (ClickHouse) must be provisioned and accessible.
- The data pipeline (REQ-TEC-003) for syncing data from OLTP to OLAP must be operational.

## 6.3.0.0 Data Dependencies

- Requires access to historical `orders` and `customers` data in the OLAP database.
- A reliable method to determine a customer's first-ever order date must be established in the data model.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- API response time for the report data must be < 2 seconds for a 90-day range on a standard-sized store.
- Frontend rendering of the report must complete within 1 second after data is received.

## 7.2.0.0 Security

- The API endpoint must enforce RBAC, ensuring only users with appropriate roles (Owner, Admin, Analyst, Marketer) can access the data.
- All data queries must be strictly scoped by the `merchant_id` of the authenticated user to prevent data leakage between tenants.

## 7.3.0.0 Usability

- The report must be easily discoverable within the application's navigation.
- Visualizations should be clear and easy to interpret at a glance.

## 7.4.0.0 Accessibility

- The report must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The report must render correctly on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- The primary complexity lies in designing and optimizing the OLAP query in ClickHouse to efficiently calculate first order dates and segment customers across large datasets.
- Potential need for data pre-aggregation or materialized views in ClickHouse to ensure query performance.
- Handling the period-over-period comparison logic in a single, efficient query.

## 8.3.0.0 Technical Risks

- Poor query performance on stores with millions of orders could lead to slow load times or timeouts. This must be mitigated with proper data modeling and indexing/partitioning in ClickHouse.
- Inaccurate metric calculations if the definitions of 'new' vs. 'returning' are not implemented precisely.

## 8.4.0.0 Integration Points

- Backend API for fetching report data from ClickHouse.
- Frontend UI components for tables and charts (shadcn/ui).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance

## 9.2.0.0 Test Scenarios

- Verify metric accuracy against a manually calculated dataset.
- Test with a date range that crosses a year boundary.
- Test with a store that has only one order.
- Test date filter presets (e.g., 'Last 7 Days', 'This Month') and custom ranges.
- Verify the downloaded CSV file content and format.

## 9.3.0.0 Test Data Needs

- A synthetic dataset with a known mix of new and returning customers across multiple months.
- A dataset representing a brand new store with only first-time orders.
- A dataset for a large store to facilitate performance testing.

## 9.4.0.0 Testing Tools

- Jest for backend unit tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for the new logic
- Integration testing between frontend and backend completed successfully
- E2E tests for user flows (filtering, exporting) are passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirements verified against a large dataset
- Security requirements (RBAC, tenant isolation) validated
- Documentation for the new API endpoint is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- The API contract between frontend and backend should be defined early in the sprint.
- Requires a developer with strong SQL/OLAP query skills for the backend implementation.
- Availability of realistic test data in the staging environment is crucial for validation.

## 11.4.0.0 Release Impact

- This is a key feature for the Deep Analytics module and a major value proposition for merchants.

