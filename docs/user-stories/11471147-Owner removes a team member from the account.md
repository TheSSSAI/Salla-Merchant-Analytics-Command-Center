# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-020 |
| Elaboration Date | 2025-01-20 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Owner removes a team member from the account |
| As A User Story | As a Store Owner, I want to remove a team member f... |
| User Persona | Store Owner / Admin |
| Business Value | Enables strict access control and enhances account... |
| Functional Area | User and Role Management |
| Story Theme | Team Collaboration and Access Control |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Owner successfully removes a team member

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a 'Store Owner' logged into the system and I am on the 'Team Management' page

### 3.1.5 When

I click the 'Remove' action for a team member and confirm the removal in the confirmation dialog

### 3.1.6 Then

The system must remove the association between the user and my merchant account in the database, the user must be removed from the team list in the UI, and a success notification ('Team member removed successfully.') must be displayed.

### 3.1.7 Validation Notes

Verify the UI list updates. Check the database to confirm the user-merchant link is deleted. The action must be logged in the audit trail.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Security: Removed user's session is immediately invalidated

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A team member is logged in and actively using the application for my merchant account

### 3.2.5 When

I, as the 'Store Owner', remove that team member from the account

### 3.2.6 Then

The removed team member's next API request for that merchant account must fail with an authorization error (e.g., 403 Forbidden), and they should be redirected to an access denied page or the account switcher.

### 3.2.7 Validation Notes

Requires an E2E test with two concurrent user sessions. The session invalidation must be effective immediately, without waiting for token expiration.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Edge Case: Owner cannot remove themselves

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

I am a 'Store Owner' logged into the system and I am on the 'Team Management' page

### 3.3.5 When

I view my own user entry in the team list

### 3.3.6 Then

The 'Remove' action must be disabled or not visible for my own account.

### 3.3.7 Validation Notes

Check the UI to ensure the control is absent or disabled. The corresponding API endpoint should also reject any self-removal attempt.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User interaction: Confirmation dialog prevents accidental removal

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am a 'Store Owner' on the 'Team Management' page

### 3.4.5 When

I click the 'Remove' action for a team member

### 3.4.6 Then

A confirmation modal must appear with a clear warning, such as 'Are you sure you want to remove [User's Email]? This will immediately revoke their access and cannot be undone.'

### 3.4.7 Validation Notes

Verify the modal appears and that clicking 'Cancel' dismisses it without removing the user.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Condition: API call fails during removal

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a 'Store Owner' attempting to remove a team member

### 3.5.5 When

The backend API call fails for any reason (e.g., network error, server error)

### 3.5.6 Then

An error notification (e.g., 'Failed to remove team member. Please try again.') must be displayed, and the team member must remain in the team list.

### 3.5.7 Validation Notes

Use browser developer tools or a mock server to simulate an API failure and verify the UI handles it gracefully.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Multi-tenancy: Removing a user from one team does not affect their access to other teams

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

A user is a member of Merchant A's team and Merchant B's team

### 3.6.5 When

The 'Store Owner' of Merchant A removes the user from their team

### 3.6.6 Then

The user's access to Merchant A's account is revoked, but they can still log in and access Merchant B's account.

### 3.6.7 Validation Notes

Requires test setup with a user belonging to at least two different merchant accounts.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A list of team members displaying at least their email and role.
- A 'Remove' button or icon associated with each team member (except the current user if they are the Owner).
- A confirmation modal with 'Confirm' and 'Cancel' actions.
- Success and error toast notifications.

## 4.2.0 User Interactions

- Clicking 'Remove' triggers the confirmation modal.
- Clicking 'Confirm' in the modal initiates the removal process.
- Clicking 'Cancel' closes the modal with no side effects.

## 4.3.0 Display Requirements

- The team list must update in real-time upon successful removal without requiring a page refresh.

## 4.4.0 Accessibility Needs

- The 'Remove' button and all modal elements must be keyboard accessible and have appropriate ARIA labels (e.g., `aria-label="Remove [User's Email] from team"`).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-203.1

### 5.1.2 Rule Description

Only a user with the 'Owner' role can remove other team members.

### 5.1.3 Enforcement Point

API Middleware and UI rendering logic.

### 5.1.4 Violation Handling

API returns 403 Forbidden. UI hides or disables the remove functionality for non-Owners.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-203.2

### 5.2.2 Rule Description

An 'Owner' cannot remove themselves from the account.

### 5.2.3 Enforcement Point

API endpoint logic and UI rendering logic.

### 5.2.4 Violation Handling

API returns 400 Bad Request. UI hides or disables the remove functionality for the Owner's own entry.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-018

#### 6.1.1.2 Dependency Reason

This story requires the UI to view a list of team members, which is implemented in US-018.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-016

#### 6.1.2.2 Dependency Reason

The ability to invite/add a team member is required to test the removal functionality.

## 6.2.0.0 Technical Dependencies

- A functioning Role-Based Access Control (RBAC) system to verify the requester's 'Owner' role.
- A session management mechanism that supports immediate invalidation of a user's access to a specific tenant (e.g., Redis blacklist, database version check).
- The audit logging service for recording security-sensitive events (as per REQ-NFR-003).

## 6.3.0.0 Data Dependencies

- Requires a populated `users` table and a join table linking users to merchant accounts with specific roles.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API response time for the removal action should be under 500ms (p95).

## 7.2.0.0 Security

- The API endpoint must be protected and verify the requesting user has the 'Owner' role for the target merchant account.
- The removal action must be logged in an immutable audit trail, including the timestamp, the actor (Owner), and the target user.
- Session invalidation for the removed user must be immediate and not rely on token expiration.

## 7.3.0.0 Usability

- The consequence of the removal action must be clearly communicated to the user via a confirmation dialog.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- The primary complexity is implementing a robust and immediate session invalidation mechanism for stateless JWTs. This may require a token blacklist (e.g., in Redis) or a per-user/per-tenant access version that is checked on every request.
- Ensuring the database transaction is atomic and that the audit log entry is created successfully.

## 8.3.0.0 Technical Risks

- A poorly implemented session invalidation could create a security hole where a removed user retains access until their token expires.

## 8.4.0.0 Integration Points

- Authentication middleware (for role and session validation).
- Database (for deleting the user-merchant association).
- Audit Log service.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify an Owner can remove a Marketer.
- Verify an Owner cannot remove themselves.
- Verify a non-Owner (e.g., Admin) cannot see or use the remove functionality.
- Verify that after removal, the user's active session for that merchant is immediately invalidated (requires E2E test with two browser contexts).
- Verify removing a user from one merchant account does not affect their access to another.

## 9.3.0.0 Test Data Needs

- A test account with an 'Owner' role.
- At least two other test users with different roles (e.g., 'Admin', 'Marketer') assigned to the Owner's account.
- A test user who is a member of two different merchant accounts.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% code coverage for the new logic
- E2E tests for the happy path and session invalidation are implemented and passing
- User interface reviewed and approved by the design/product team
- Security requirements (role check, audit log, session invalidation) are validated
- No new accessibility issues are introduced
- Technical documentation for the session invalidation mechanism is updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core security and user management feature. Its complexity is dependent on the existing session management architecture. If a session invalidation mechanism does not exist, it must be built as part of this story or a preceding technical story, which would increase the estimate.
- Should be developed as part of the user management feature set, likely in the same sprint as inviting and editing users.

## 11.4.0.0 Release Impact

- Essential for the initial release of multi-user functionality.

