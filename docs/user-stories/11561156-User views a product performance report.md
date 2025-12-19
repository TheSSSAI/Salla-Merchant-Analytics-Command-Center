# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-029 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User views a product performance report |
| As A User Story | As a Merchant (Store Owner, Admin, or Analyst), I ... |
| User Persona | Store Owner / Admin, Data Analyst, Marketer |
| Business Value | Provides actionable insights into product performa... |
| Functional Area | Deep Analytics |
| Story Theme | Product Analytics |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-029-01

### 3.1.2 Scenario

Viewing the product performance report with default data

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user with permissions to view analytics and my store's data is synchronized

### 3.1.5 When

I navigate to the 'Analytics > Product Performance' section

### 3.1.6 Then

The system displays a report table with a list of products.

### 3.1.7 Validation Notes

Verify the report loads and shows product data. The default time period (e.g., last 30 days) should be applied.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-029-02

### 3.2.2 Scenario

Report displays correct data columns

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing the Product Performance report

### 3.2.5 When

The report table is displayed

### 3.2.6 Then

The table must include columns for 'Product Name', 'Units Sold', 'Revenue Generated', and 'Conversion Rate'.

### 3.2.7 Validation Notes

Check for the presence and correct labeling of all required columns as specified in REQ-FUN-304.1.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-029-03

### 3.3.2 Scenario

Data updates when the date range filter is changed

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am viewing the Product Performance report

### 3.3.5 When

I select a new date range using the date filter component

### 3.3.6 Then

The data in the product performance table updates to reflect metrics calculated only for the selected period.

### 3.3.7 Validation Notes

Test with presets like 'Last 7 days' and a custom date range. Verify the metrics change accordingly.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-029-04

### 3.4.2 Scenario

Sorting the report by a metric column

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am viewing the Product Performance report

### 3.4.5 When

I click on the header of a sortable column (e.g., 'Units Sold')

### 3.4.6 Then

The table rows are reordered based on that column's values in descending order.

### 3.4.7 Validation Notes

Verify that clicking the header again reverses the sort order to ascending. This must work for all metric columns as per REQ-FUN-304.2.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-029-05

### 3.5.2 Scenario

Report displays a loading state

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

I am viewing the Product Performance report

### 3.5.5 When

I change a filter that triggers a data refetch

### 3.5.6 Then

A visual loading indicator (e.g., a spinner or skeleton screen) is displayed until the new data is loaded.

### 3.5.7 Validation Notes

Ensure the UI remains responsive and provides feedback during data fetching.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-029-06

### 3.6.2 Scenario

Report handles a period with no sales data

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I have selected a date range in which no products were sold

### 3.6.5 When

I view the Product Performance report

### 3.6.6 Then

The system displays a user-friendly message like 'No product sales data available for the selected period' instead of an empty table.

### 3.6.7 Validation Notes

Verify the report doesn't show an error or a blank, confusing state.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-029-07

### 3.7.2 Scenario

Report includes products with zero sales

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

I am viewing the report for a period with sales

### 3.7.5 And

Some products had zero sales during this period

### 3.7.6 When

The report is displayed

### 3.7.7 Then

The products with no sales are included in the list with '0' for Units Sold and Revenue, and '0%' for Conversion Rate.

### 3.7.8 Validation Notes

This is crucial for identifying 'worst-selling' products. Ensure these products are not omitted from the report.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-029-08

### 3.8.2 Scenario

Report data is paginated

### 3.8.3 Scenario Type

Happy_Path

### 3.8.4 Given

My store has more products than the page limit (e.g., 50)

### 3.8.5 When

I view the Product Performance report

### 3.8.6 Then

The table displays the first page of results and provides pagination controls to navigate to subsequent pages.

### 3.8.7 Validation Notes

Test navigation between pages and ensure the total item count is displayed correctly.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Data table with sortable columns
- Date range filter component (reusable)
- Pagination controls
- Loading state indicator (e.g., skeleton loader)
- Empty state message component

## 4.2.0 User Interactions

- User can click column headers to sort data.
- User can select a date range to filter the report.
- User can navigate through pages of results.

## 4.3.0 Display Requirements

- Product Name: Text
- Units Sold: Integer
- Revenue Generated: Currency format (e.g., $1,234.56)
- Conversion Rate: Percentage format (e.g., 5.25%)
- The currently active sort column and direction must be visually indicated.

## 4.4.0 Accessibility Needs

- The data table must be keyboard navigable.
- Column headers must be properly associated with their data cells for screen readers.
- All interactive elements (filters, sort headers, pagination) must have clear focus states.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-004-P

### 5.1.2 Rule Description

Product Conversion Rate is calculated as: (Number of orders containing the product / Number of unique carts the product was added to) * 100%.

### 5.1.3 Enforcement Point

Backend data aggregation service (querying the OLAP database).

### 5.1.4 Violation Handling

If cart data is unavailable for a product, the conversion rate should be displayed as 'N/A'.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-004-R

### 5.2.2 Rule Description

Revenue Generated for a product is the sum of the line item totals for that product across all completed orders within the selected period, excluding taxes and shipping.

### 5.2.3 Enforcement Point

Backend data aggregation service.

### 5.2.4 Violation Handling

N/A - Standard aggregation.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-013

#### 6.1.1.2 Dependency Reason

Requires initial data synchronization to be complete to have data to report on.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-023

#### 6.1.2.2 Dependency Reason

This story relies on the generic date range filter component developed in US-023.

## 6.2.0.0 Technical Dependencies

- A functioning data pipeline from OLTP (PostgreSQL) to OLAP (ClickHouse) as per REQ-TEC-003.
- A backend API endpoint to query aggregated product performance data from ClickHouse.
- Frontend data table component from the shadcn/ui library.

## 6.3.0.0 Data Dependencies

- Synchronized and transformed data for Products, Orders, Order Items, and Carts must be available in the ClickHouse OLAP database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The p95 latency for the API call fetching report data should be under 1000ms.
- The report UI should render (LCP) in under 2.5 seconds as per REQ-NFR-001 (NFR-103).

## 7.2.0.0 Security

- The API endpoint must enforce RBAC, ensuring only users with appropriate roles (Owner, Admin, Analyst, Marketer) can access the data.
- All data queries must be strictly scoped by the merchant's tenant ID to prevent data leakage.

## 7.3.0.0 Usability

- The report must be easily discoverable within the application's navigation.
- Filters and sorting should provide immediate visual feedback to the user.

## 7.4.0.0 Accessibility

- The report must adhere to WCAG 2.1 Level AA standards as per REQ-INT-005.

## 7.5.0.0 Compatibility

- The report must render correctly on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- The primary complexity lies in constructing an efficient and accurate SQL query for the ClickHouse OLAP database.
- The query will involve joining multiple large tables and performing aggregations, which requires careful optimization.
- Defining and calculating a meaningful product-level conversion rate requires careful logic.

## 8.3.0.0 Technical Risks

- The OLAP query could be slow if not properly indexed or structured, impacting user experience.
- Inconsistencies in the source data from Salla could lead to inaccurate metric calculations.

## 8.4.0.0 Integration Points

- Backend API service for analytics.
- ClickHouse OLAP database.
- Frontend analytics dashboard module.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify metric calculations for a single product against a known dataset.
- Test filtering by date and sorting by each metric column.
- Test pagination logic with a large number of products.
- Test the empty state when no data is available.
- Verify role-based access control for the API endpoint.

## 9.3.0.0 Test Data Needs

- A test merchant account with a significant number of products (>100) and orders (>1000) across a multi-month period.
- Test data should include products with zero sales and products belonging to various categories.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and integration tests implemented with >80% coverage for the new logic
- E2E tests for the main user flow are passing
- User interface is responsive and reviewed for UX/UI consistency
- Performance of the API endpoint is benchmarked and meets requirements
- Security requirements (RBAC, tenant isolation) are validated
- The calculation logic for all metrics is documented in the technical docs
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational analytics feature. The backend API should be prioritized to allow the frontend to integrate.
- Requires collaboration between backend (for the OLAP query) and frontend (for the UI implementation).

## 11.4.0.0 Release Impact

- This story is a key deliverable for the Deep Analytics module and a major value proposition for users.

