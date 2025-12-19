# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-017 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Invited user accepts a team invitation |
| As A User Story | As an invited team member, I want to accept an inv... |
| User Persona | Invited User (can be a new user to the platform or... |
| Business Value | Enables the core team collaboration functionality ... |
| Functional Area | User and Role Management |
| Story Theme | Team Collaboration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-017-01

### 3.1.2 Scenario

A new user with no existing account accepts a valid invitation

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a valid and unexpired invitation exists for an email address not registered in the system

### 3.1.5 When

the user clicks the unique invitation link from their email

### 3.1.6 Then

the system directs them to a streamlined registration page with the email field pre-populated and disabled, requiring only a password that meets complexity rules (BR-002)

### 3.1.7 And

the invitation token is immediately invalidated and cannot be used again

### 3.1.8 Validation Notes

Verify user record is created, team membership is correct in the database, and attempting to use the link again results in an 'invalid link' error.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-017-02

### 3.2.2 Scenario

An existing, logged-out user accepts an invitation to a new team

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a valid and unexpired invitation exists for a user who has an account but is not currently logged in

### 3.2.5 When

the user clicks the unique invitation link

### 3.2.6 Then

the system directs them to a login page with a message indicating they need to sign in to accept the invitation to '[Merchant Name]'s team'

### 3.2.7 And

the invitation token is invalidated

### 3.2.8 Validation Notes

Verify the user is not prompted to register. Check the database to confirm the user is now a member of two teams. The account switching UI (FR-204) should now be available to this user.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-017-03

### 3.3.2 Scenario

An existing, logged-in user accepts an invitation to a new team

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a valid and unexpired invitation exists for a user who is already logged into the application

### 3.3.5 When

the user clicks the unique invitation link

### 3.3.6 Then

the system presents an in-app confirmation prompt: 'Do you want to join [Merchant Name]'s team as a [Role]?'

### 3.3.7 And

the invitation token is invalidated

### 3.3.8 Validation Notes

Verify the session context switches correctly and the user can see the new team in their account switcher.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-017-04

### 3.4.2 Scenario

User attempts to use an expired invitation link

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

an invitation's time-to-live has passed

### 3.4.5 When

a user clicks the expired invitation link

### 3.4.6 Then

the system displays a user-friendly error page stating 'This invitation has expired'

### 3.4.7 And

the page provides guidance to contact the store owner to request a new invitation

### 3.4.8 Validation Notes

Manually set an invitation's expiry date in the database to a past timestamp and attempt to use the link.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-017-05

### 3.5.2 Scenario

User attempts to use an invalid or already-used invitation link

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

an invitation token has already been consumed or is malformed

### 3.5.5 When

a user clicks the link

### 3.5.6 Then

the system displays a generic error page stating 'This invitation link is invalid or has already been used'

### 3.5.7 Validation Notes

After a successful invitation acceptance, try to use the same link again. Also, test with a deliberately altered token in the URL.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-017-06

### 3.6.2 Scenario

An existing team member is re-invited to the same team

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

a user is already a member of a merchant's team

### 3.6.5 And

the new invitation token is invalidated

### 3.6.6 When

the user clicks the new invitation link

### 3.6.7 Then

the system recognizes they are already a member and displays a message: 'You are already a member of [Merchant Name]'s team'

### 3.6.8 Validation Notes

Verify no new membership record is created and the user's role is unchanged.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Streamlined registration form (for new users)
- Login form (for existing users)
- In-app confirmation modal (for logged-in users)
- Error page for expired links
- Error page for invalid links

## 4.2.0 User Interactions

- Clicking the email link opens a new browser tab to the appropriate page.
- Forms should provide real-time validation for password complexity.
- Error pages should be clear and provide actionable next steps where applicable.

## 4.3.0 Display Requirements

- The name of the inviting merchant's store must be clearly displayed on the registration, login, or confirmation pages.
- The role the user is being invited to should be displayed if possible.

## 4.4.0 Accessibility Needs

- All forms and buttons must be keyboard navigable and have appropriate ARIA labels.
- Error messages must be associated with their respective form fields for screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-INV-001

### 5.1.2 Rule Description

Invitation tokens must be unique, single-use, and time-limited.

### 5.1.3 Enforcement Point

Backend token validation service

### 5.1.4 Violation Handling

Request is rejected, and the user is shown an invalid/expired link error page.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-INV-002

### 5.2.2 Rule Description

A user's email address is the unique identifier for invitations. The system must check for an existing account based on the email in the invitation token.

### 5.2.3 Enforcement Point

Backend invitation processing logic

### 5.2.4 Violation Handling

N/A - This rule determines the workflow (registration vs. login).

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-016

#### 6.1.1.2 Dependency Reason

This story consumes the invitation link that US-016 generates and sends.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-001

#### 6.1.2.2 Dependency Reason

The streamlined registration flow for new invited users is a variant of the standard registration process.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-004

#### 6.1.3.2 Dependency Reason

The login flow for existing invited users reuses the standard authentication mechanism.

## 6.2.0.0 Technical Dependencies

- Authentication service for user creation and login.
- Database schema for storing invitation tokens with status and expiry.
- Email delivery service (Postmark) to send the initial invitation.
- RBAC module to handle the user-to-merchant-role association.

## 6.3.0.0 Data Dependencies

- Requires a valid invitation record in the database, containing the invitee's email, the inviting merchant's ID, the assigned role, and a unique token.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The page load time for the invitation link landing page (registration/login) should be under 2 seconds.
- The backend processing time from form submission to redirection should be under 500ms.

## 7.2.0.0 Security

- Invitation tokens must be generated using a cryptographically secure pseudo-random number generator (CSPRNG).
- Tokens must have a short, configurable expiry time (e.g., 72 hours).
- The token validation process must be protected against timing attacks.
- All communication must be over HTTPS.

## 7.3.0.0 Usability

- The process should be seamless, with minimal steps for the user.
- Messaging must be clear about which team the user is joining.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The flow must work correctly on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires conditional logic to handle three distinct user flows (new user, existing logged-out, existing logged-in).
- Secure token generation, storage, and validation logic is critical and non-trivial.
- Requires an atomic transaction to associate the user with the team and invalidate the token to prevent race conditions or inconsistent states.

## 8.3.0.0 Technical Risks

- Insecure token implementation could allow account takeover.
- Failure to properly invalidate tokens could allow for replay attacks.
- Incorrect handling of user states could lead to a poor user experience or broken registration/login flows.

## 8.4.0.0 Integration Points

- Authentication Service API (for registration/login)
- Database (for reading/writing invitation and user-team membership records)
- Frontend Router (to handle the token from the URL parameter)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Full E2E test for the new user invitation flow.
- Full E2E test for the existing user (logged out) invitation flow.
- Full E2E test for the existing user (logged in) invitation flow.
- Test case for clicking an expired link.
- Test case for clicking an invalid/used link.
- Test case for re-inviting an existing team member.

## 9.3.0.0 Test Data Needs

- Test accounts for store owners.
- A mechanism to generate invitation links on demand for testing.
- Test email addresses that are both new and existing in the system.
- Ability to manipulate the `expires_at` timestamp on invitation records for testing.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests are written for all new backend logic, achieving >80% coverage.
- E2E tests for all three happy paths and key error conditions are implemented and passing.
- The security of the token mechanism has been reviewed by a senior developer or security champion.
- The user interface has been reviewed for usability and accessibility compliance.
- All related technical documentation has been updated.
- The story has been deployed and verified in the staging environment by QA.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for team collaboration and must be completed before any other role-specific features can be fully utilized by invited users.
- Requires coordination between frontend (UI flows) and backend (token logic, DB changes).

## 11.4.0.0 Release Impact

Enables the 'Team Management' feature set for release. Without this, the invite feature (US-016) is incomplete.

