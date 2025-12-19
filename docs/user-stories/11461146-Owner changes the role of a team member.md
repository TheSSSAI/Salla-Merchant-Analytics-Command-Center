# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-019 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Owner changes the role of a team member |
| As A User Story | As a Store Owner, I want to change the role of an ... |
| User Persona | Store Owner / Admin |
| Business Value | Enables flexible and secure team management by all... |
| Functional Area | User and Role Management |
| Story Theme | Team Collaboration and Access Control |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Owner successfully changes a team member's role

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am logged in as a 'Store Owner' and I am on the 'Team Management' page

### 3.1.5 When

I select a team member, change their role from 'Analyst' to 'Admin' via the UI, and confirm the change

### 3.1.6 Then

a success notification is displayed, the UI immediately updates to show the team member's new role as 'Admin', and their permissions are updated for their next session.

### 3.1.7 Validation Notes

Verify the role is updated in the database. The affected user's JWT on next login/refresh should contain the new role claim.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Owner is prevented from changing their own role

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

I am logged in as a 'Store Owner' and I am on the 'Team Management' page

### 3.2.5 When

I view my own user entry in the team list

### 3.2.6 Then

the UI control to change my role is disabled or not visible.

### 3.2.7 Validation Notes

Inspect the DOM to ensure the control is in a disabled state or absent for the current user's row.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Owner cannot assign the 'Owner' role to another user

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

I am logged in as a 'Store Owner' and I am on the 'Team Management' page

### 3.3.5 When

I click the role selection dropdown for any team member

### 3.3.6 Then

the 'Owner' role is not an available option in the list.

### 3.3.7 Validation Notes

Verify the role selection dropdown only contains 'Admin', 'Analyst', and 'Marketer' as defined in REQ-OVR-003.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

System handles API failure during role change

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am logged in as a 'Store Owner' and I am on the 'Team Management' page

### 3.4.5 When

I attempt to change a team member's role and the backend API call fails

### 3.4.6 Then

an error notification is displayed (e.g., 'Failed to update role. Please try again.'), and the team member's role in the UI remains unchanged.

### 3.4.7 Validation Notes

Use browser developer tools to mock a 500 server error for the API endpoint and verify the UI response.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Non-Owner user is blocked from changing roles

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am logged in as a user with the 'Admin' role

### 3.5.5 When

I navigate to the 'Team Management' page

### 3.5.6 Then

I cannot see any UI controls to change the roles of other team members.

### 3.5.7 Validation Notes

Also test the API endpoint directly using the 'Admin' user's token to ensure a 403 Forbidden response is returned.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A list of team members displaying name/email and current role.
- A dropdown menu or similar interactive control next to each team member (except the Owner) to change their role.
- A confirmation modal to prevent accidental role changes.
- Success and error toast notifications.

## 4.2.0 User Interactions

- Owner clicks on the role control for a specific user.
- Owner selects a new role from the list of available roles.
- Owner confirms the change in a modal dialog.
- The list updates automatically upon successful change.

## 4.3.0 Display Requirements

- The list of available roles must be dynamically populated based on system definitions (Admin, Analyst, Marketer).
- The current role of each user must be clearly displayed.

## 4.4.0 Accessibility Needs

- The role selection dropdown must be fully keyboard navigable.
- All interactive elements must have appropriate ARIA labels and roles (e.g., `aria-label="Change role for [user_name]"`).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-203.1

### 5.1.2 Rule Description

Only the 'Owner' role can modify the roles of other team members.

### 5.1.3 Enforcement Point

API Middleware and Frontend UI

### 5.1.4 Violation Handling

API returns 403 Forbidden. UI hides or disables the control.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-203.2

### 5.2.2 Rule Description

The 'Owner' cannot change their own role.

### 5.2.3 Enforcement Point

API Endpoint Logic and Frontend UI

### 5.2.4 Violation Handling

API returns 400 Bad Request. UI disables the control for the owner's own record.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-203.3

### 5.3.2 Rule Description

The 'Owner' role cannot be assigned to any other user.

### 5.3.3 Enforcement Point

API Endpoint Logic and Frontend UI

### 5.3.4 Violation Handling

API returns 400 Bad Request if 'Owner' is in the payload. UI does not list 'Owner' as an assignable role.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-016

#### 6.1.1.2 Dependency Reason

A team member must be invited and exist in the system before their role can be changed.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-018

#### 6.1.2.2 Dependency Reason

The UI for listing team members is required as the context for this story's functionality.

## 6.2.0.0 Technical Dependencies

- A functioning Role-Based Access Control (RBAC) system for API endpoint protection.
- A database schema that supports storing a user's role within a specific merchant's team.

## 6.3.0.0 Data Dependencies

- Requires existing team member records associated with the Owner's merchant account.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the role change request must be under 200ms (p95).
- The UI update after a successful change must feel instantaneous to the user (<500ms).

## 7.2.0.0 Security

- The API endpoint (`PATCH /api/v1/teams/{teamId}/members/{memberId}`) must be protected by RBAC middleware, ensuring only the 'Owner' can access it.
- The endpoint logic must validate that the `memberId` being modified belongs to the authenticated Owner's `teamId` to prevent cross-tenant access.

## 7.3.0.0 Usability

- The action should require explicit confirmation to prevent accidental changes.
- The system must provide immediate and clear visual feedback (success/error) upon completion of the action.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires both frontend and backend changes.
- Involves modification of an existing UI (team list).
- Security checks in the API middleware are critical.

## 8.3.0.0 Technical Risks

- Incorrect implementation of RBAC checks could lead to a privilege escalation vulnerability.

## 8.4.0.0 Integration Points

- Frontend Team Management Component
- Backend Authentication/Authorization Middleware
- Backend User Management Service/Controller
- PostgreSQL Database (OLTP)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify an Owner can change a user's role from A to B.
- Verify an Owner cannot change their own role.
- Verify an Admin user cannot see the role change controls.
- Verify an Admin user receives a 403 error when calling the API endpoint directly.
- Verify the role change persists after the affected user logs out and logs back in.

## 9.3.0.0 Test Data Needs

- A test account with the 'Owner' role.
- At least two other test accounts with 'Admin' and 'Analyst' roles within the same team.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new logic
- Integration testing completed successfully, verifying API security
- E2E tests for happy path and key error conditions are passing
- User interface reviewed and approved by UX/Product
- Security requirements validated via code review and testing
- API endpoint documentation is generated and up-to-date in the OpenAPI spec
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core feature for the User Management epic and should be prioritized after the ability to invite and view users is complete.

## 11.4.0.0 Release Impact

- Completes a critical part of the team management functionality required for multi-user accounts.

