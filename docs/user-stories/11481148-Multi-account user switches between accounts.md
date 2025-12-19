# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-021 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Multi-account user switches between accounts |
| As A User Story | As a consultant managing multiple stores, I want a... |
| User Persona | A user (e.g., consultant, agency staff, multi-stor... |
| Business Value | Improves user experience and efficiency for power ... |
| Functional Area | User and Role Management |
| Story Theme | Multi-Tenancy User Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Account switcher is visible for multi-account users

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is logged in

### 3.1.5 When

the user is a member of more than one merchant team

### 3.1.6 Then

a UI element for switching accounts is visible in a persistent location (e.g., user profile menu).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Account switcher is hidden for single-account users

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

a user is logged in

### 3.2.5 When

the user is a member of only one merchant team

### 3.2.6 Then

the UI element for switching accounts is not visible.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User successfully switches between accounts

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a user is logged in and is viewing data for 'Merchant A'

### 3.3.5 When

the user opens the account switcher and selects 'Merchant B'

### 3.3.6 Then

the application's data context refreshes to show data for 'Merchant B', and the switcher UI now indicates 'Merchant B' is active.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

API requests are correctly scoped after switching accounts

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a user has successfully switched their active account to 'Merchant B'

### 3.4.5 When

the user navigates to any dashboard or report

### 3.4.6 Then

all subsequent API calls for data are made with the correct identifier for 'Merchant B' and are authorized by the backend for that merchant.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Session persists the last selected account

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a user has selected 'Merchant B' as their active account

### 3.5.5 When

the user logs out and logs back in at a later time

### 3.5.6 Then

the application loads with 'Merchant B' as the default active account.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User is removed from an active team

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a user is logged in with 'Merchant B' as their active account

### 3.6.5 And

an Owner of 'Merchant B' removes the user from their team

### 3.6.6 When

the user performs an action or refreshes the page

### 3.6.7 Then

the system automatically switches their context to another available merchant account and displays a notification informing them of the change.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dropdown menu or similar UI control, located within the main navigation or user profile area.
- A list item for each merchant account the user can access, displaying the merchant's name.
- A visual indicator (e.g., checkmark) for the currently active account within the list.
- A loading indicator (e.g., spinner) to provide feedback to the user while the new account context is loading.

## 4.2.0 User Interactions

- User clicks on the account switcher to open the list of accounts.
- User clicks on a different account in the list to initiate the switch.
- The list should be scrollable if the number of accounts exceeds a certain threshold (e.g., 5).

## 4.3.0 Display Requirements

- The switcher must always display the name of the currently active merchant account.
- Upon a failed context switch, a user-friendly error message must be displayed.

## 4.4.0 Accessibility Needs

- The account switcher must be fully keyboard accessible (navigable with Tab and arrow keys, selectable with Enter/Space).
- The component must use appropriate ARIA roles and attributes (e.g., `aria-haspopup`, `aria-expanded`).

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': "A user's session must be tied to a single active merchant account at any given time.", 'enforcement_point': 'Backend API middleware on every authenticated request.', 'violation_handling': 'The API request is rejected with a 403 Forbidden status code.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-004

#### 6.1.1.2 Dependency Reason

Requires user authentication to be in place.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-017

#### 6.1.2.2 Dependency Reason

Requires the ability for a user to be associated with a merchant account.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

REQ-FUN-202

#### 6.1.3.2 Dependency Reason

The underlying data model must support a many-to-many relationship between users and merchants.

## 6.2.0.0 Technical Dependencies

- A global state management solution (e.g., Zustand) on the frontend.
- Backend session management capable of storing and updating the active merchant context.
- API authorization middleware that enforces the active merchant context for all data requests.

## 6.3.0.0 Data Dependencies

- An API endpoint to fetch the list of merchant accounts associated with the logged-in user.
- An API endpoint to set the active merchant account for the user's session.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The list of available merchants must load in under 500ms.
- After selecting a new merchant, the main dashboard must fully render with the new data in under 3 seconds.

## 7.2.0.0 Security

- The backend must re-validate the user's permission for the selected merchant before switching the session context.
- All subsequent API requests must be strictly validated on the backend to ensure the user has permission for the active merchant ID in their session, preventing horizontal privilege escalation.

## 7.3.0.0 Usability

- The process of switching accounts should be intuitive and require no more than two clicks.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires changes to global state management on the frontend.
- Requires modifications to the core session management and authorization logic on the backend.
- All data-fetching logic across the application must be refactored to be dependent on the active merchant context.

## 8.3.0.0 Technical Risks

- Risk of data leakage between tenants if backend authorization is not implemented correctly.
- Potential for degraded performance if data re-fetching on context switch is not optimized.

## 8.4.0.0 Integration Points

- Frontend global state store.
- Backend authentication and session management service.
- Backend API gateway/middleware for authorization.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- A user with multiple accounts can see the switcher and successfully switch context.
- A user with a single account cannot see the switcher.
- After switching, data on multiple pages (Dashboard, Reports) correctly reflects the new account.
- Session persistence after logout/login.
- Attempting to access data from a non-active account via a manipulated API call is blocked.

## 9.3.0.0 Test Data Needs

- A test user account that is a member of at least three different merchant teams.
- A test user account that is a member of only one merchant team.
- Distinct data sets for each test merchant to visually confirm the context switch.

## 9.4.0.0 Testing Tools

- Jest
- Playwright

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new logic
- Integration testing between frontend and backend for context switching is completed successfully
- E2E tests for multi-account and single-account scenarios are passing
- User interface reviewed and approved by UX/Product
- Performance requirements for context switching are verified
- Security penetration test scenario for horizontal privilege escalation is performed and passes
- Documentation for the session management changes is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for supporting agency and multi-store owner personas.
- Requires coordinated effort between frontend and backend developers.

## 11.4.0.0 Release Impact

- Enables the platform to be marketed to a new user segment (agencies/consultants).

