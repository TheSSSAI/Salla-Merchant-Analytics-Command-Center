# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-040 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User views a list of abandoned carts |
| As A User Story | As a Marketer or Store Owner, I want to view a fil... |
| User Persona | Marketer, Store Owner / Admin |
| Business Value | Provides the foundational data view for the entire... |
| Functional Area | Cart Recovery |
| Story Theme | Cart Recovery and Automation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Displaying the list of abandoned carts

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am logged in as a 'Marketer' or 'Owner' and there are carts that meet the abandoned criteria

### 3.1.5 When

I navigate to the 'Cart Recovery' section of the application

### 3.1.6 Then

I see a list of abandoned carts, sorted by the most recent abandonment time in descending order by default.

### 3.1.7 Validation Notes

Verify the API call is made and the list is populated. Check the default sort order.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Verifying the content of each cart entry for a known customer

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The abandoned carts list is displayed and contains an entry for a logged-in customer

### 3.2.5 When

I view a single entry in the list

### 3.2.6 Then

The entry must display the customer's name, email, the date and time of abandonment, the total monetary value of the cart, and a summary of the items in the cart.

### 3.2.7 Validation Notes

Check that all specified data fields are present and correctly formatted. The time should be displayed in the user's local timezone.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Verifying the content of each cart entry for an anonymous customer

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The abandoned carts list is displayed and contains an entry for a guest user

### 3.3.5 When

I view a single entry in the list

### 3.3.6 Then

The customer information section should display 'Anonymous' or a similar indicator, while still showing the abandonment time, cart value, and items.

### 3.3.7 Validation Notes

Verify that no PII is displayed for anonymous users.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Filtering the list by a date range

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am viewing the abandoned carts list

### 3.4.5 When

I select a date range using the date filter control

### 3.4.6 Then

The list updates to show only the carts that were abandoned within the selected time period.

### 3.4.7 Validation Notes

Test with preset ranges (e.g., 'Last 7 days') and a custom date range.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Viewing an empty state for the abandoned carts list

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am logged in as a 'Marketer' or 'Owner' and there are no abandoned carts for the selected time period

### 3.5.5 When

I navigate to the 'Cart Recovery' section

### 3.5.6 Then

I see a clear message indicating that no abandoned carts were found, instead of an empty table.

### 3.5.7 Validation Notes

Verify the empty state component is displayed and provides a user-friendly message.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Unauthorized access attempt by an Analyst

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am logged in as a user with the 'Analyst' role

### 3.6.5 When

I attempt to navigate to the 'Cart Recovery' section via a direct URL

### 3.6.6 Then

I am redirected to my default dashboard and shown an 'Access Denied' notification.

### 3.6.7 Validation Notes

The navigation link for 'Cart Recovery' should also not be visible in the UI for the 'Analyst' role.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

List pagination for large datasets

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

There are more abandoned carts than the per-page limit (e.g., >25)

### 3.7.5 When

I view the abandoned carts list

### 3.7.6 Then

I see pagination controls that allow me to navigate to the next page, previous page, and specific pages of results.

### 3.7.7 Validation Notes

Verify that clicking 'Next' loads the subsequent set of records and updates the page information.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A data table or list view to display cart records.
- Date range picker for filtering.
- Pagination component.
- Empty state message component.
- Loading indicator while data is being fetched.

## 4.2.0 User Interactions

- User can select a date range to filter the list.
- User can click pagination controls to navigate through the list.
- Hovering over a cart item summary could show a tooltip with more details.
- The list should be sortable by columns like 'Abandonment Date' and 'Cart Value'.

## 4.3.0 Display Requirements

- Customer Name/Email (or 'Anonymous')
- Abandonment Date & Time
- Cart Total Value (formatted as currency)
- Cart Items Summary (e.g., '3 items')

## 4.4.0 Accessibility Needs

- The data table must be navigable via keyboard.
- All interactive elements (filters, pagination) must have clear focus states.
- Table headers must be properly associated with their columns for screen readers (using `<th>` with `scope='col'`).
- Adherence to WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-003', 'rule_description': 'A cart is considered abandoned if it has not been updated or converted to an order within a system-configurable time period (default: 60 minutes).', 'enforcement_point': 'Backend data processing job and API query.', 'violation_handling': 'Carts that do not meet this criterion will not be included in the API response for the abandoned carts list.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-009

#### 6.1.1.2 Dependency Reason

Salla store must be connected to receive cart data.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-012

#### 6.1.2.2 Dependency Reason

Data synchronization process must be functional to ingest cart creation and update events from Salla webhooks.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-018

#### 6.1.3.2 Dependency Reason

Role-based access control (RBAC) must be implemented to differentiate between 'Owner'/'Marketer' and other roles.

## 6.2.0.0 Technical Dependencies

- A background processing service (e.g., a cron job or scheduled serverless function) to periodically check for and flag carts that have crossed the abandonment threshold.
- A backend API endpoint (`GET /api/v1/carts/abandoned`) that supports filtering, sorting, and pagination.
- Database schema capable of storing cart state, timestamps, and customer associations.

## 6.3.0.0 Data Dependencies

- Access to cart, customer, and product data synchronized from the Salla store.

## 6.4.0.0 External Dependencies

- Salla Webhooks for `cart.updated` and `order.created` must be configured and reliably received to maintain near real-time cart status.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for fetching the first page of abandoned carts must be under 500ms (p95).
- The UI should render the list within 1 second of receiving the API response.

## 7.2.0.0 Security

- The API endpoint must be protected and accessible only to authenticated users with the 'Owner', 'Admin', or 'Marketer' roles.
- All data queries must be strictly scoped to the `merchant_id` of the logged-in user to ensure tenant data isolation.

## 7.3.0.0 Usability

- The list should be easy to scan and understand.
- Filtering should feel instantaneous to the user.

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must be fully functional on the latest versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- The logic for the background job that marks carts as abandoned needs to be robust and efficient to handle high volumes of carts without causing database load issues.
- The database query to retrieve the list may require joining multiple tables (carts, cart_items, products, customers), which needs to be optimized for performance.
- Ensuring the real-time status of carts (e.g., a cart is converted to an order and should be immediately removed from the abandoned list) requires solid event handling from webhooks.

## 8.3.0.0 Technical Risks

- Missed Salla webhooks could lead to data inconsistency (e.g., a converted cart still showing as abandoned). A reconciliation job (REQ-INT-006) is needed to mitigate this.
- The background job for marking carts abandoned could become a performance bottleneck if not designed to scale.

## 8.4.0.0 Integration Points

- Salla Webhook ingestion service.
- PostgreSQL OLTP database.
- Backend API for the frontend to consume.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify list displays correctly for a Marketer.
- Verify access is denied for an Analyst.
- Verify date filtering works with various ranges.
- Verify pagination works forwards and backwards.
- Verify the empty state appears when no data is available.
- Verify a cart that becomes older than the threshold appears in the list after the job runs.
- Verify a cart that is converted to an order is removed from the list.

## 9.3.0.0 Test Data Needs

- A set of carts with different last_updated timestamps (e.g., 30 mins ago, 90 mins ago, 3 days ago).
- Carts associated with registered users.
- Carts from anonymous/guest users.
- Carts that have been converted into orders.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% code coverage for new logic
- E2E tests for key user flows are passing
- User interface reviewed and approved by the design/product team
- Performance requirements (API response time) are verified under simulated load
- Security requirements (RBAC, data scoping) are validated via tests and manual review
- Relevant technical documentation for the API endpoint and background job is created
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a foundational blocker for the rest of the Cart Recovery feature set (US-041, US-042, etc.).
- Requires both backend (API, background job) and frontend work, which can be parallelized after the API contract is defined.

## 11.4.0.0 Release Impact

This is a core component of the Cart Recovery module. The module cannot be released without this functionality.

