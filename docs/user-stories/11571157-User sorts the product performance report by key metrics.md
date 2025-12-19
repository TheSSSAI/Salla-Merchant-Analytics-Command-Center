# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-030 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User sorts the product performance report by key m... |
| As A User Story | As a merchant (Owner, Admin, or Analyst), I want t... |
| User Persona | Owner, Admin, Analyst |
| Business Value | Enables merchants to perform interactive data anal... |
| Functional Area | Deep Analytics |
| Story Theme | Product Performance Reporting |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Sort by a metric in descending order

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am viewing the Product Performance report which contains multiple products with varying metrics

### 3.1.5 When

I click on a sortable column header (e.g., 'Revenue Generated') for the first time

### 3.1.6 Then

The report data is reordered to show products with the highest value for that metric at the top

### 3.1.7 And

A visual indicator (e.g., a downward-pointing arrow) appears next to the column header to signify descending order.

### 3.1.8 Validation Notes

Verify the API is called with correct sort parameters (e.g., `sortBy=revenue&order=desc`) and the UI table re-renders in the correct order.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Toggle sort order to ascending

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The Product Performance report is currently sorted by a metric in descending order

### 3.2.5 When

I click on the same column header again

### 3.2.6 Then

The report data is reordered to show products with the lowest value for that metric at the top

### 3.2.7 And

The visual indicator next to the column header changes to signify ascending order (e.g., an upward-pointing arrow).

### 3.2.8 Validation Notes

Verify the API is called with ascending order parameter (e.g., `order=asc`) and the UI updates accordingly.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Change the sort column

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The Product Performance report is sorted by one metric (e.g., 'Revenue Generated')

### 3.3.5 When

I click on a different sortable column header (e.g., 'Units Sold')

### 3.3.6 Then

The report data is reordered based on the new metric in descending order by default

### 3.3.7 And

The sort indicator moves from the old column header to the new one.

### 3.3.8 Validation Notes

Verify the new sort state is correctly reflected in both the API call and the UI.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Sorting works with active filters

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I have filtered the Product Performance report by a specific category (as per US-031)

### 3.4.5 When

I click on a sortable column header

### 3.4.6 Then

The report sorts only the data that matches the active filter criteria

### 3.4.7 And

The filter remains active and is not reset by the sort action.

### 3.4.8 Validation Notes

Test by applying a date range and/or category filter, then sorting. The API call should include both filter and sort parameters.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Sorting with pagination

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

The Product Performance report has enough data to be paginated

### 3.5.5 When

I apply a sort on any column

### 3.5.6 Then

The sorting is applied to the entire dataset, not just the currently visible page

### 3.5.7 And

I am returned to the first page of the newly sorted results.

### 3.5.8 Validation Notes

Using test data, verify that an item from page 3 moves to page 1 after sorting.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Sorting a report with no data

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am viewing the Product Performance report and have applied filters that result in no data being displayed

### 3.6.5 When

I click on a sortable column header

### 3.6.6 Then

The 'no data available' message remains visible

### 3.6.7 And

No API call is made and no error occurs.

### 3.6.8 Validation Notes

Verify the UI state does not change and no network requests are triggered on click.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Clickable table headers for sortable columns: 'Units Sold', 'Revenue Generated', 'Conversion Rate'.
- Iconography (e.g., up/down arrows) next to the active sort column header to indicate sort direction.
- Loading indicator (e.g., spinner) to be displayed if sorting takes more than 300ms.

## 4.2.0 User Interactions

- On hover, sortable column headers should have a visual cue (e.g., background color change, underline) and the cursor should change to a pointer.
- Clicking a header triggers the sort.
- The sort controls must be keyboard accessible, allowing focus and activation via Enter/Spacebar.

## 4.3.0 Display Requirements

- The table must re-render to reflect the new sort order immediately after the data is fetched.
- The sort state (column and direction) must be visually persistent until another sort action is taken.

## 4.4.0 Accessibility Needs

- Sortable column headers (`<button>` or `<a>` inside `<th>`) must be focusable.
- The `aria-sort` attribute must be applied to the active column header, with its value set to 'ascending' or 'descending'.

# 5.0.0 Business Rules

*No items available*

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-029

#### 6.1.1.2 Dependency Reason

The product performance report must exist before sorting functionality can be added to it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-023

#### 6.1.2.2 Dependency Reason

Sorting must function correctly with the date range filter.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-031

#### 6.1.3.2 Dependency Reason

Sorting must function correctly with the product category filter.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint for the product performance report must be capable of accepting sort parameters (`sortBy`, `order`).
- Frontend data table component must support sortable headers and dynamic data re-rendering.

## 6.3.0.0 Data Dependencies

- The OLAP data warehouse (ClickHouse) must contain the necessary product performance metrics to sort by.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response for a sort request should be under 200ms (p95) as per REQ-NFR-001 (NFR-101).
- The UI should update within 100ms after receiving the API response.

## 7.2.0.0 Security

- The API endpoint must enforce tenant isolation, ensuring a user can only sort data for their own merchant account.
- All sort parameters from the client must be sanitized on the backend to prevent injection attacks.

## 7.3.0.0 Usability

- The sorting interaction should be intuitive and follow standard web conventions for data tables.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards, particularly for keyboard navigation and screen reader support as outlined in UI requirements.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported modern browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires coordinated changes in both frontend and backend.
- Backend query to the OLAP database must be dynamically constructed to include the `ORDER BY` clause.
- Frontend state needs to manage the current sort key and direction.

## 8.3.0.0 Technical Risks

- Performance risk if the OLAP database is not properly indexed for the columns being sorted, especially with large datasets.

## 8.4.0.0 Integration Points

- Frontend client to Backend API.
- Backend API to ClickHouse OLAP database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify sorting for each sortable column in both ascending and descending order.
- Verify sorting works correctly when combined with date range filters.
- Verify sorting works correctly when combined with category filters.
- Verify sorting behavior on a paginated report.
- Verify keyboard-only interaction for sorting.
- Verify screen reader announcements for sort state changes.

## 9.3.0.0 Test Data Needs

- A dataset with at least 50 products with varied metrics to test pagination and sorting logic effectively.
- Products with null or zero values for sortable metrics to test edge case handling.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% coverage for new logic
- E2E tests for primary scenarios are implemented and passing
- User interface reviewed and approved by a UX designer or Product Owner
- Performance of the sort API call is verified against NFRs
- Accessibility requirements (keyboard nav, ARIA attributes) are implemented and verified
- No new security vulnerabilities introduced, as confirmed by static analysis tools
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be prioritized after its prerequisite (US-029) is complete.
- Can be developed in parallel with other report interaction stories like filtering (US-031) if API contracts are agreed upon early.

## 11.4.0.0 Release Impact

Enhances the usability of a core analytics feature, significantly improving the user's ability to derive insights from their data.

