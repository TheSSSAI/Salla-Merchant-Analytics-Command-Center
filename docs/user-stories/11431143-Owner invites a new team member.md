# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-016 |
| Elaboration Date | 2024-10-27 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Owner invites a new team member |
| As A User Story | As a Store Owner, I want to invite team members by... |
| User Persona | Store Owner / Admin (specifically 'Owner' role for... |
| Business Value | Enables team collaboration, secure delegation of r... |
| Functional Area | User and Role Management |
| Story Theme | Team Collaboration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-016-01

### 3.1.2 Scenario

Owner successfully invites a new user to the team

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am logged in as a 'Store Owner' and I am on the 'Team Management' page

### 3.1.5 When

I enter a valid email address for a user not yet in the system, select the 'Analyst' role, and click 'Send Invitation'

### 3.1.6 Then

The system sends an invitation email to the specified address, a success notification is displayed, and the invited user appears in the team list with the status 'Pending'.

### 3.1.7 Validation Notes

Verify a new record is created in the 'invitations' table with a unique, unexpired token. Verify the email is sent via the email service provider's logs. Verify the UI updates to show the pending user.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-016-02

### 3.2.2 Scenario

Owner successfully invites an existing system user (from another team) to their team

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am logged in as a 'Store Owner' and I am on the 'Team Management' page

### 3.2.5 When

I enter a valid email address of a user who already has an account in the system (but is not on my team), select the 'Marketer' role, and click 'Send Invitation'

### 3.2.6 Then

The system sends an invitation email, a success notification is displayed, and the user is listed in my team with a 'Pending' status.

### 3.2.7 Validation Notes

The process should be identical to inviting a brand new user. The system should not error. The existing user will accept the invitation to gain access to the new merchant account.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-016-03

### 3.3.2 Scenario

Owner attempts to invite a user with an invalid email format

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am logged in as a 'Store Owner' on the 'Team Management' page

### 3.3.5 When

I enter an improperly formatted email address (e.g., 'jane.doe@domain') and click 'Send Invitation'

### 3.3.6 Then

The system displays an inline validation error message, such as 'Please enter a valid email address', and no invitation is sent.

### 3.3.7 Validation Notes

Verify the API returns a 400 Bad Request error. The 'Send Invitation' button may be disabled until the format is valid.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-016-04

### 3.4.2 Scenario

Owner attempts to invite a user who is already on the team

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am logged in as a 'Store Owner' and user 'current.member@example.com' is already an active member of my team

### 3.4.5 When

I enter 'current.member@example.com' in the invitation form and click 'Send Invitation'

### 3.4.6 Then

The system displays an error message, such as 'This user is already a member of your team', and no invitation is sent.

### 3.4.7 Validation Notes

Verify the API returns a 409 Conflict error. The check should be case-insensitive.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-016-05

### 3.5.2 Scenario

Role selection for invitations is restricted

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am logged in as a 'Store Owner' on the 'Team Management' page

### 3.5.5 When

I click on the role selection dropdown in the invitation form

### 3.5.6 Then

The list of available roles must include 'Admin', 'Analyst', and 'Marketer', but must NOT include 'Owner'.

### 3.5.7 Validation Notes

The 'Owner' role can only be assigned upon initial store connection and cannot be transferred or assigned via invitation.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-016-06

### 3.6.2 Scenario

A non-Owner user attempts to access the invitation feature

### 3.6.3 Scenario Type

Security

### 3.6.4 Given

I am logged in as a user with the 'Admin' role

### 3.6.5 When

I attempt to access the team invitation UI or call the invitation API endpoint directly

### 3.6.6 Then

The UI for inviting users is not visible, and any direct API call results in a '403 Forbidden' error response.

### 3.6.7 Validation Notes

Test both UI visibility and direct API access with an 'Admin' user's token.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Team Management' or 'Users' section in the application settings.
- An 'Invite Team Member' button.
- A modal or form with an email input field, a role selection dropdown, and a 'Send Invitation' button.
- A list of current and pending team members displaying their email, assigned role, and status ('Active' or 'Pending').
- Toast notifications for success and error messages.

## 4.2.0 User Interactions

- Owner clicks 'Invite Team Member' to open the invitation form.
- Owner types an email and selects a role from the dropdown.
- The 'Send Invitation' button is disabled if the email field is empty or invalid.
- Upon successful submission, the form closes and a success notification appears.

## 4.3.0 Display Requirements

- The role dropdown must be populated with assignable roles from the system.
- The team member list must update in real-time (or after a page refresh) to show the new pending invitation.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels.
- The invitation modal must be keyboard-navigable and properly manage focus.
- Error and success messages must be announced by screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-INV-001

### 5.1.2 Rule Description

Only the 'Owner' role can invite new team members.

### 5.1.3 Enforcement Point

API middleware and UI rendering logic.

### 5.1.4 Violation Handling

API returns 403 Forbidden. UI components are not rendered for non-Owner roles.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-INV-002

### 5.2.2 Rule Description

Invitation links must be unique and time-limited (e.g., expire in 72 hours).

### 5.2.3 Enforcement Point

Backend logic during invitation acceptance.

### 5.2.4 Violation Handling

If a user tries to use an expired or invalid link, they are shown a message and prompted to request a new invitation from the store owner.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-INV-003

### 5.3.2 Rule Description

The 'Owner' role cannot be assigned via invitation.

### 5.3.3 Enforcement Point

Backend API validation and UI dropdown population.

### 5.3.4 Violation Handling

API returns 400 Bad Request if 'Owner' role is submitted. UI does not present the option.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Core user registration and user model must exist.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-004

#### 6.1.2.2 Dependency Reason

Authentication system must be in place to identify the 'Owner' role.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

REQ-FUN-201

#### 6.1.3.2 Dependency Reason

The Role-Based Access Control (RBAC) model with defined roles ('Owner', 'Admin', 'Analyst', 'Marketer') must be implemented.

## 6.2.0.0 Technical Dependencies

- A configured email service provider (e.g., Postmark) for sending transactional emails.
- Database schema supporting users, merchants, roles, and invitations.
- A secure method for generating unique, random tokens.

## 6.3.0.0 Data Dependencies

- Requires the `merchant_id` of the currently authenticated 'Owner' to associate the invitation correctly.

## 6.4.0.0 External Dependencies

- The external email service provider's API must be available and responsive.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to send an invitation should respond in under 500ms (p95).
- The action should not block the UI; it should be an asynchronous request.

## 7.2.0.0 Security

- Invitation tokens must be cryptographically secure and stored hashed in the database.
- The API endpoint must be protected by authentication and authorization middleware, strictly enforcing the 'Owner' role requirement.
- Email content should not expose sensitive information beyond the inviter's store name.

## 7.3.0.0 Usability

- The invitation process should be intuitive, requiring minimal steps.
- Error messages must be clear and actionable for the user.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported modern web browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration with a third-party email service.
- Secure token generation, storage, and validation logic.
- Database schema design for invitations and multi-tenant user-role mapping.
- Handling logic for inviting users who are new vs. already exist in the system.

## 8.3.0.0 Technical Risks

- Email deliverability issues (invitations going to spam). Requires proper SPF/DKIM setup (covered in US-048).
- Race conditions if an owner tries to invite the same person twice in quick succession.

## 8.4.0.0 Integration Points

- Backend API: `POST /api/v1/teams/invitations`
- Database: `users`, `merchants`, `user_merchant_roles`, `invitations` tables.
- External: Postmark API for sending emails.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify an Owner can invite a new user with each available role.
- Verify an Owner cannot invite a user with an invalid email.
- Verify an Owner cannot invite an existing team member.
- Verify an Admin user cannot see the invite UI or call the invite API.
- Verify the content of the sent email, including the invitation link.
- Verify the invitation record is correctly created in the database with a pending status.

## 9.3.0.0 Test Data Needs

- Test accounts with 'Owner' and 'Admin' roles.
- A set of email addresses: one brand new, one for an existing system user, one already on the team.
- Mocked responses from the email service provider for success and failure cases.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.
- A local email catching tool like MailHog for development/testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit and integration tests are written and achieve >80% code coverage for the new logic.
- E2E tests covering the happy path and key error conditions are passing.
- API endpoint is secured and tested for unauthorized access.
- UI is responsive and meets accessibility standards.
- Any new technical documentation (e.g., API spec) has been updated.
- The feature has been successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for the 'Team Collaboration' epic and is a prerequisite for US-017 (Accept Invitation).
- Requires configuration of email service credentials in environment variables for dev, staging, and prod.

## 11.4.0.0 Release Impact

Enables a key value proposition of the product (team collaboration). Essential for merchants with teams.

