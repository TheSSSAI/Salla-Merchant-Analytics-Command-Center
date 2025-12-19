# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-031 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User filters the product performance report by cat... |
| As A User Story | As a Data-focused Merchant (Owner, Admin, or Analy... |
| User Persona | Store Owner, Admin, Data Analyst |
| Business Value | Enables merchants to perform targeted analysis on ... |
| Functional Area | Deep Analytics |
| Story Theme | Product Performance Reporting |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Filter report by a single category

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am viewing the Product Performance Report which displays products from multiple categories

### 3.1.5 When

I select a single category, for example 'T-Shirts', from the category filter control

### 3.1.6 Then

The report's data table immediately updates to show only products belonging to the 'T-Shirts' category.

### 3.1.7 Validation Notes

Verify that the API call includes the selected category ID as a parameter and the returned product list is correctly filtered. All metrics on the report should reflect the filtered data set.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Filter report by multiple categories

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing the Product Performance Report

### 3.2.5 When

I select two or more categories, for example 'T-Shirts' and 'Hoodies', from the category filter control

### 3.2.6 Then

The report's data table updates to show all products that belong to either the 'T-Shirts' or 'Hoodies' categories.

### 3.2.7 Validation Notes

Verify the API call includes multiple category IDs. The UI should display all products from the selected categories combined.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Clear the category filter

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The Product Performance Report is currently filtered by one or more categories

### 3.3.5 When

I clear the category filter selection

### 3.3.6 Then

The category filter is removed, and the report reverts to displaying all products from all categories.

### 3.3.7 Validation Notes

Confirm that clicking a 'clear' button or deselecting all categories removes the filter parameter from the API call and the report shows the unfiltered, complete dataset.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Filter interacts correctly with other controls

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

The Product Performance Report is filtered by the 'T-Shirts' category

### 3.4.5 When

I change the date range filter or the sorting order of the report

### 3.4.6 Then

The 'T-Shirts' category filter remains active, and the report data updates to reflect both the category filter and the new date range/sort order.

### 3.4.7 Validation Notes

Test by applying a category filter, then a date filter, and verifying the API call contains parameters for both filters.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Filtering by a category with no products in the selected date range

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am viewing the Product Performance Report

### 3.5.5 When

I select a category that has no associated products within the currently selected time period

### 3.5.6 Then

The report table area displays a user-friendly message, such as 'No products found for the selected category and time period'.

### 3.5.7 Validation Notes

The system should not show an empty table or an error. It should provide clear feedback to the user.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Filtering for uncategorized products

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

My store contains products that have not been assigned to any category

### 3.6.5 When

I open the category filter control

### 3.6.6 Then

An option such as 'Uncategorized' is available in the filter list.

### 3.6.7 Validation Notes

Selecting the 'Uncategorized' option should filter the report to show only products where the category field is null or empty.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A multi-select dropdown component, clearly labeled 'Category', placed prominently near other report filters.
- A search input within the dropdown to quickly find categories.
- Visual indicators (e.g., tags) to show which categories are currently selected.
- A 'Clear' or 'X' icon to easily remove all selected category filters.
- A loading indicator (e.g., spinner) that displays while the report data is being fetched after a filter change.

## 4.2.0 User Interactions

- Clicking the dropdown reveals a list of all available product categories.
- Typing in the search box filters the list of categories.
- Selecting/deselecting a category checkbox immediately triggers a data refresh for the report.
- The state of the filter must be preserved during page reloads or when navigating away and back to the report.

## 4.3.0 Display Requirements

- The list of categories in the filter should be populated dynamically from the merchant's synced Salla store data.
- The report title or a subtitle should reflect the active filters (e.g., 'Product Performance for T-Shirts').

## 4.4.0 Accessibility Needs

- The filter component must be fully keyboard accessible (navigable with Tab, selectable with Space/Enter).
- All parts of the filter must have appropriate ARIA labels for screen reader compatibility, adhering to WCAG 2.1 Level AA standards (REQ-INT-005).

# 5.0.0 Business Rules

*No items available*

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-029

#### 6.1.1.2 Dependency Reason

The base Product Performance Report UI and data fetching mechanism must exist before a filter can be added to it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-012

#### 6.1.2.2 Dependency Reason

The initial data synchronization process must be complete to ensure product and category data is available in the system's database.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint for the product performance report must be enhanced to accept one or more category IDs as query parameters.
- The OLAP (ClickHouse) data model must support efficient filtering of products by category.

## 6.3.0.0 Data Dependencies

- Accurate and up-to-date product-to-category mapping data must be available from the Salla store synchronization.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Applying, changing, or clearing the category filter must result in the UI updating with new data in under 2 seconds for a store with up to 10,000 products.
- The API response time for the filtered query should adhere to the system-wide p95 target of <200ms (REQ-NFR-001).

## 7.2.0.0 Security

- All API requests for filtered data must be validated to ensure the user has permission to view data for the specified merchant account.
- Filter parameters should be sanitized on the backend to prevent injection attacks.

## 7.3.0.0 Usability

- The filter should be intuitive and require no user training.
- For stores with a large number of categories (>20), a search function within the filter is mandatory.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards as per REQ-INT-005.

## 7.5.0.0 Compatibility

- The filter component must function correctly on all supported modern, evergreen web browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires both frontend UI work and a backend API modification.
- The primary complexity lies in ensuring the backend query is performant, which should be straightforward with a properly indexed OLAP database.

## 8.3.0.0 Technical Risks

- Potential for slow query performance if the analytical database is not correctly indexed or modeled for category filtering. This risk is low if the data pipeline (REQ-TEC-003) is implemented correctly.

## 8.4.0.0 Integration Points

- Frontend state management (Zustand) to manage filter state.
- Backend API for fetching product performance data.
- OLAP database (ClickHouse) for executing the filtered query.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify filtering by one category.
- Verify filtering by multiple categories.
- Verify clearing the filter.
- Verify behavior with an empty result set.
- Verify filtering for 'Uncategorized' products.
- Verify interaction with date and sort filters.

## 9.3.0.0 Test Data Needs

- A test merchant account with at least 10 products distributed across at least 3 categories.
- At least one product that is not assigned to any category.
- At least one category that has no products.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new code
- Integration testing completed successfully
- E2E tests for key scenarios implemented and passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirements verified against a representative dataset
- Accessibility of the new filter component validated
- Documentation updated appropriately
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story should be planned in a sprint after its prerequisite (US-029) is completed.
- Requires coordination between a frontend and a backend developer.

## 11.4.0.0 Release Impact

- Enhances the usability and analytical power of a core reporting feature.

