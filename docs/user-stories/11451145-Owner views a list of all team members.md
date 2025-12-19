# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-018 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Owner views a list of all team members |
| As A User Story | As a Store Owner, I want to view a list of all tea... |
| User Persona | Store Owner / Admin |
| Business Value | Provides essential visibility into account access ... |
| Functional Area | User and Role Management |
| Story Theme | Team Collaboration and Access Control |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-018-001

### 3.1.2 Scenario

Owner successfully views the list of team members

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user with the 'Owner' role and my account has multiple active team members

### 3.1.5 When

I navigate to the 'Settings > Team Management' section of the application

### 3.1.6 Then

I see a list or table of all team members associated with my merchant account, including myself

### 3.1.7 And

each entry in the list clearly displays the team member's name (or email if name is not set), their email address, and their assigned role (e.g., 'Owner', 'Admin', 'Analyst')

### 3.1.8 Validation Notes

Verify the API returns a 200 OK with a list of users and the frontend renders them correctly in a table. The list must contain all expected users.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-018-002

### 3.2.2 Scenario

List displays users with pending invitations

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

I am a logged-in user with the 'Owner' role

### 3.2.5 And

their status is clearly indicated as 'Pending' or 'Invited'

### 3.2.6 When

I view the team management list

### 3.2.7 Then

the invited user's email address is displayed in the list

### 3.2.8 Validation Notes

Check the database for a user with a 'pending' status and verify the UI displays this status visually distinct from active users.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-018-003

### 3.3.2 Scenario

Non-Owner user attempts to access the team management page

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a logged-in user with a role other than 'Owner' (e.g., 'Admin', 'Analyst')

### 3.3.5 When

I attempt to access the team management page URL directly

### 3.3.6 Then

I am redirected to the dashboard or shown an 'Access Denied' page

### 3.3.7 And

the API endpoint for fetching team members returns a 403 Forbidden error

### 3.3.8 Validation Notes

Use browser developer tools to confirm the API response status code is 403. Manually test by logging in as an 'Admin' and trying to access the URL.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-018-004

### 3.4.2 Scenario

API fails to load the list of team members

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am a logged-in user with the 'Owner' role

### 3.4.5 When

I navigate to the team management page and the backend API call fails

### 3.4.6 Then

the UI displays a user-friendly error message like 'Could not load team members. Please try again.'

### 3.4.7 And

the page does not crash or show a blank screen

### 3.4.8 Validation Notes

Simulate an API failure (e.g., using browser dev tools to block the request) and verify the error state of the UI component.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-018-005

### 3.5.2 Scenario

Owner is the only user on the account

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am a logged-in user with the 'Owner' role and I have not invited any team members

### 3.5.5 When

I navigate to the team management page

### 3.5.6 Then

the list displays a single entry for myself with the role 'Owner'

### 3.5.7 Validation Notes

Test with a newly created merchant account that has only the initial Owner user.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A table or list view for team members.
- Columns for 'Name', 'Email', 'Role', and 'Status'.
- A user-friendly error message component for API failures.
- A clear navigation link to this page, likely under a 'Settings' or 'Account' menu.

## 4.2.0 User Interactions

- The user navigates to the page to view the list.
- The list should be read-only in the context of this story. Actions like 'Edit' or 'Remove' are out of scope.

## 4.3.0 Display Requirements

- Roles must be displayed using the exact names defined in the system: 'Owner', 'Admin', 'Analyst', 'Marketer'.
- The 'Pending' status for invited users must be visually distinct from active users.

## 4.4.0 Accessibility Needs

- The list must be implemented as a semantic HTML table (`<table>`, `<thead>`, `<th>`, etc.) for screen reader compatibility.
- All UI elements must meet WCAG 2.1 Level AA contrast and keyboard navigation standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-201', 'rule_description': "Only users with the 'Owner' role can view the complete list of team members.", 'enforcement_point': 'API Gateway / Backend Middleware', 'violation_handling': 'Return a 403 Forbidden HTTP status code.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-004

#### 6.1.1.2 Dependency Reason

Requires a logged-in user session to identify the user and their role.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-016

#### 6.1.2.2 Dependency Reason

Requires the ability to invite users to populate the list with members other than the owner.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (e.g., GET /api/v1/team/members) that returns a list of users for the authenticated merchant.
- A database schema supporting a many-to-many relationship between users and merchants, including a 'role' and 'status' field.

## 6.3.0.0 Data Dependencies

- Requires existing user and merchant account data in the database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for fetching the team list must be under 500ms for up to 100 team members.
- The page's Largest Contentful Paint (LCP) should be under 2.5 seconds.

## 7.2.0.0 Security

- The API endpoint must be protected by authentication and role-based access control (RBAC) middleware, strictly enforcing that only the 'Owner' can access it.
- The query to fetch users must be scoped by the authenticated user's `merchant_id` to prevent data leakage between tenants.

## 7.3.0.0 Usability

- The list should be clearly organized and easy to scan.
- Error messages must be clear and non-technical.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on the latest versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires a straightforward database query with a join.
- Frontend implementation involves fetching and rendering data in a table.
- The primary consideration is correctly implementing and testing the RBAC security check.

## 8.3.0.0 Technical Risks

- Incorrect implementation of RBAC could lead to a security vulnerability where non-owners can view the user list.

## 8.4.0.0 Integration Points

- Frontend client to Backend API.
- Backend API to PostgreSQL database.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify an Owner can see the full list of active and pending users.
- Verify an Admin user receives a 403 error when attempting to access the API endpoint.
- Verify the UI handles an API error gracefully.
- Verify the list displays correctly when only the Owner exists.

## 9.3.0.0 Test Data Needs

- A test account with an 'Owner' role.
- A test account with an 'Admin' role.
- A test merchant account with multiple users assigned different roles.
- A test merchant account with a user in a 'pending' invitation state.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% code coverage for the new logic
- E2E tests for happy path and access control scenarios are passing
- User interface is responsive and reviewed for accessibility compliance
- Security requirements (RBAC) validated via automated tests and manual verification
- No performance regressions introduced
- Feature is deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a blocker for subsequent user management stories like 'Edit Role' (US-019) and 'Remove Member' (US-020). It should be prioritized accordingly.

## 11.4.0.0 Release Impact

This is a core component of the User Management feature set.

