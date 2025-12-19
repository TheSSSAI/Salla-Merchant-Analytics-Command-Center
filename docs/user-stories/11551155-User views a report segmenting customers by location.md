# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-028 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User views a report segmenting customers by locati... |
| As A User Story | As a Merchant, I want to view a report that segmen... |
| User Persona | Store Owner / Admin, Data Analyst, Marketer |
| Business Value | Enables data-driven decisions for targeted marketi... |
| Functional Area | Deep Analytics |
| Story Theme | Customer Segmentation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-028-001

### 3.1.2 Scenario

Viewing the report with default country-level data

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user with the 'Analyst' role or higher and my store's data has been synchronized

### 3.1.5 When

I navigate to the 'Customer Analytics' section and select the 'Location Report'

### 3.1.6 Then

The system displays a report titled 'Customer Location Report' for the default date range (last 30 days), showing a world map and a data table aggregated by country.

### 3.1.7 Validation Notes

Verify the page loads, the title is correct, and both a map and a table are visible.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-028-002

### 3.2.2 Scenario

Verifying data in the country-level table

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The Location Report is open in the default country view

### 3.2.5 When

I view the data table

### 3.2.6 Then

The table lists all countries with customer data and includes columns for 'Country', 'Number of Customers', 'Total Sales', and 'AOV', and the data is sortable by any column.

### 3.2.7 Validation Notes

Check against the database that the aggregated numbers for a sample country are correct for the selected period.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-028-003

### 3.3.2 Scenario

Interacting with the country-level map

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The Location Report is open in the default country view

### 3.3.5 When

I hover my mouse over a country on the map that has sales data

### 3.3.6 Then

A tooltip appears displaying the country's name, number of customers, and total sales.

### 3.3.7 Validation Notes

Verify the map is color-coded based on total sales and the tooltip interaction works as expected.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-028-004

### 3.4.2 Scenario

Drilling down to the city-level view

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

The Location Report is open in the country view

### 3.4.5 When

I click on a specific country in either the table or on the map

### 3.4.6 Then

The view updates to show data for that country, the map zooms in, and the table now lists cities within that country with their respective 'Number of Customers', 'Total Sales', and 'AOV'.

### 3.4.7 Validation Notes

Verify that clicking a country filters the data correctly and a breadcrumb or back button appears to return to the world view.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-028-005

### 3.5.2 Scenario

Applying a date range filter

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

The Location Report is open

### 3.5.5 When

I select a new date range using the date filter component

### 3.5.6 Then

Both the map and the table data immediately update to reflect the customer and sales data for the newly selected period.

### 3.5.7 Validation Notes

Test with a preset (e.g., 'Last 7 days') and a custom date range. Verify the data changes and matches backend calculations.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-028-006

### 3.6.2 Scenario

Viewing the report with no data for the selected period

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

The Location Report is open

### 3.6.5 When

I select a date range where no orders were placed

### 3.6.6 Then

The map and table areas are replaced with a clear message stating 'No data available for the selected period'.

### 3.6.7 Validation Notes

Ensure no errors are thrown and a user-friendly message is displayed instead of empty charts or tables.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-028-007

### 3.7.2 Scenario

Handling customer records with missing location data

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

Some customer records in the database have no country or city information

### 3.7.5 When

I view the Location Report

### 3.7.6 Then

The table includes a row labeled 'Unknown' that aggregates data for these records, and these records are excluded from the map visualization.

### 3.7.7 Validation Notes

Requires test data with null/empty location fields. Verify the aggregation under 'Unknown' is correct.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-028-008

### 3.8.2 Scenario

Viewing the report during data load

### 3.8.3 Scenario Type

Alternative_Flow

### 3.8.4 Given

I have navigated to the Location Report

### 3.8.5 When

The system is fetching the data from the backend

### 3.8.6 Then

A loading indicator (e.g., skeleton screen) is displayed in place of the map and table until the data is ready.

### 3.8.7 Validation Notes

Simulate network latency to verify the loading state is visible and is replaced by the report once data arrives.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Interactive choropleth map (world and country views)
- Sortable and paginated data table
- Date range filter component (consistent with REQ-FUN-302.1)
- Tooltip for map interactions
- Breadcrumb or 'Back' button for navigating from city to country view
- Loading state indicator (e.g., skeleton UI)
- Empty state message component

## 4.2.0 User Interactions

- Hovering over map regions displays a tooltip.
- Clicking a map region or table row drills down into a more detailed view (country to city).
- Clicking table headers sorts the data.
- Changing the date filter updates the entire report view.

## 4.3.0 Display Requirements

- The report must clearly display which location level (Country or City) and date range are currently active.
- Metrics (Customers, Sales, AOV) must be clearly labeled and formatted (e.g., currency symbols, number formatting).

## 4.4.0 Accessibility Needs

- The report must adhere to WCAG 2.1 Level AA standards.
- Map colors must have sufficient contrast.
- Table data must be accessible to screen readers with proper headers.
- All interactive elements (filters, sorting, map regions) must be keyboard navigable.

# 5.0.0 Business Rules

- {'rule_id': 'BR-004', 'rule_description': 'Metrics must be calculated using the standardized formulas defined in the SRS (e.g., AOV = Total Revenue / Number of Orders).', 'enforcement_point': 'Backend API service during data aggregation from the OLAP database.', 'violation_handling': 'N/A - Calculation logic must be implemented correctly. Monitored via automated testing.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-012

#### 6.1.1.2 Dependency Reason

Requires the initial data synchronization to be complete to have customer and order data available for analysis.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-023

#### 6.1.2.2 Dependency Reason

Relies on the reusable date range filter component developed for all dashboards and reports.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint to serve aggregated location data from the OLAP (ClickHouse) database.
- Frontend mapping library (e.g., react-simple-maps, Leaflet) for data visualization.
- Populated OLAP data warehouse with customer address information.

## 6.3.0.0 Data Dependencies

- Availability and accuracy of customer shipping/billing address data (city, country) from the Salla API.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The report page, including map and table, must load in under 3 seconds for a merchant with 1 year of data.
- UI updates after filtering or sorting must complete in under 1 second.

## 7.2.0.0 Security

- All data requests must be authenticated and authorized based on the user's role and tenancy (`merchant_id`).
- The API endpoint must only return data for the merchant associated with the authenticated user.

## 7.3.0.0 Usability

- The interaction between the map and the table should be intuitive, with clear visual cues for drill-down actions.
- Navigation between country and city views must be simple and obvious.

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The report must render correctly on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration of a third-party interactive mapping library and synchronizing its state with other UI components.
- Designing efficient OLAP queries in ClickHouse to aggregate large volumes of sales and customer data by location.
- Handling potential data quality issues, such as inconsistent or missing city/country names from the source data.

## 8.3.0.0 Technical Risks

- The chosen mapping library may have performance limitations with large datasets.
- Poor quality of location data from Salla could reduce the report's accuracy and utility.

## 8.4.0.0 Integration Points

- Frontend client to Backend API for fetching report data.
- Backend API to ClickHouse OLAP database for running aggregation queries.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify report accuracy for a known dataset.
- Test drill-down from country to city and back.
- Test all date filter presets and a custom range.
- Test sorting on all table columns.
- Test the 'no data' and 'missing location' edge cases.
- Verify performance with a large dataset (e.g., 100,000+ orders).

## 9.3.0.0 Test Data Needs

- A dataset with customers and orders from multiple countries and cities.
- Records with null or empty city/country fields.
- A date range with no sales activity.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and integration tests implemented with >80% coverage for new logic
- E2E tests for the main user flow are passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirements (load time, interaction speed) verified
- Accessibility audit passed (automated and manual checks)
- Documentation for the new API endpoint is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- The choice of a mapping library should be finalized before implementation begins.
- The API contract between frontend and backend should be defined early to allow for parallel development.

## 11.4.0.0 Release Impact

- This feature significantly enhances the customer analytics capabilities of the platform.

