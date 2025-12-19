# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-007 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User resets password using an email link |
| As A User Story | As a registered user who has forgotten my password... |
| User Persona | Any registered user of the system (Owner, Admin, A... |
| Business Value | Enables user self-service for account recovery, wh... |
| Functional Area | User Authentication & Security |
| Story Theme | User Account Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful password reset with a valid link

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user has received a password reset email and clicks on the valid, unexpired, and unused link

### 3.1.5 When

the user lands on the 'Reset Password' page, enters a new password that meets complexity requirements into both the 'New Password' and 'Confirm Password' fields, and clicks 'Reset Password'

### 3.1.6 Then

the system validates that the passwords match and meet complexity rules, updates the user's password in the database, permanently invalidates the reset token, displays a success message like 'Your password has been successfully reset', and redirects the user to the login page.

### 3.1.7 Validation Notes

Verify by attempting to log in with the new password. Also, verify that attempting to use the same reset link again results in an error (see AC-002).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Attempt to use an invalid, expired, or already used link

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

a user attempts to access the password reset page using a link that is either malformed, has passed its expiration time, or has already been used

### 3.2.5 When

the user navigates to the link

### 3.2.6 Then

the system displays a dedicated error page with a message like 'This password reset link is invalid or has expired. Please request a new one.' and provides a link back to the 'Forgot Password' page.

### 3.2.7 Validation Notes

Test with a manually expired token from the database, a previously used token, and a token with a few characters changed.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Password fields do not match

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

a user is on the 'Reset Password' page with a valid link

### 3.3.5 When

the user enters different values in the 'New Password' and 'Confirm Password' fields and clicks 'Reset Password'

### 3.3.6 Then

the system prevents form submission, displays an inline validation error message such as 'Passwords do not match', and the user's password is not changed.

### 3.3.7 Validation Notes

The form should remain populated (except for the password fields) and the error message should be clearly visible next to the relevant fields.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

New password does not meet complexity requirements

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a user is on the 'Reset Password' page with a valid link

### 3.4.5 When

the user enters a new password that does not meet the system's complexity rules (as defined in BR-002) and clicks 'Reset Password'

### 3.4.6 Then

the system prevents form submission, displays an inline validation error message detailing the password requirements (e.g., 'Password must be at least 10 characters and include an uppercase, lowercase, number, and special character'), and the user's password is not changed.

### 3.4.7 Validation Notes

Test multiple failure cases: too short, no uppercase, no number, no special character.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Submitting the form with empty fields

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

a user is on the 'Reset Password' page with a valid link

### 3.5.5 When

the user attempts to submit the form with one or both password fields empty

### 3.5.6 Then

the system prevents form submission and displays an inline validation error message such as 'This field is required' for each empty field.

### 3.5.7 Validation Notes

Check that client-side validation prevents the API call and displays the error.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated page at a route like `/reset-password` that accepts a token parameter.
- Form with a 'New Password' input field (type='password').
- Form with a 'Confirm New Password' input field (type='password').
- A 'Set New Password' or 'Reset Password' submit button.
- Optional: A 'show/hide' icon/toggle for each password field to improve usability.
- Clear feedback areas for success (e.g., a toast notification or a message on the login page after redirect) and error messages (inline with form fields).

## 4.2.0 User Interactions

- Password fields must mask user input.
- The submit button should be disabled until both fields are populated to provide immediate feedback.
- Inline validation errors should appear as the user types (on blur) or upon submission attempt.

## 4.3.0 Display Requirements

- The page must clearly state its purpose, e.g., 'Set a new password for your account'.
- Password complexity requirements (BR-002) should be displayed as helper text below the 'New Password' field.

## 4.4.0 Accessibility Needs

- All form fields must have associated `<label>` tags.
- Error messages must be programmatically associated with their respective input fields using `aria-describedby`.
- The page must be fully navigable and operable using only a keyboard.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-002

### 5.1.2 Rule Description

Passwords must be a minimum of 10 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.

### 5.1.3 Enforcement Point

Client-side form validation and server-side API validation.

### 5.1.4 Violation Handling

Display a clear error message to the user detailing the requirements. Reject the password change request on the server.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-SEC-001

### 5.2.2 Rule Description

Password reset tokens must be single-use and expire after a configured duration (e.g., 60 minutes).

### 5.2.3 Enforcement Point

Server-side API endpoint that processes the password reset.

### 5.2.4 Violation Handling

Reject the request and direct the user to an error page indicating the link is invalid or expired.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-006', 'dependency_reason': 'This story consumes the time-sensitive link that is generated and sent to the user in US-006. The mechanism to create and email the reset token must exist first.'}

## 6.2.0 Technical Dependencies

- A backend API endpoint to validate the reset token and update the user's password.
- A database table/schema to store password reset tokens with user association and an expiration timestamp.
- Frontend routing mechanism to handle the `/reset-password` page and token parameter.

## 6.3.0 Data Dependencies

- Requires access to the user's record in the database to update the password hash.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The password reset page must achieve a Largest Contentful Paint (LCP) of less than 2.5 seconds (REQ-NFR-001).
- The API call to update the password must have a p95 response time below 200ms (REQ-NFR-001).

## 7.2.0 Security

- The entire password reset flow must be enforced over HTTPS (TLS 1.2+).
- Password reset tokens must be cryptographically secure random strings, not predictable sequences.
- The new password must be securely hashed (e.g., using Argon2 or bcrypt) before being stored in the database; plaintext passwords must never be stored.
- The reset token must be invalidated immediately after successful use to prevent replay attacks.
- The system should not confirm whether a user account exists on the 'Forgot Password' page (handled in US-006), but the token validation on this page implicitly confirms a valid request was made.

## 7.3.0 Usability

- Error messages must be clear, concise, and helpful.
- The process should be simple and require minimal steps for the user.

## 7.4.0 Accessibility

- The page must comply with WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- The page must function correctly on all supported modern, evergreen web browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Secure generation, storage, and validation of the reset token is critical and non-trivial.
- Requires careful state management on the frontend to handle form validation and API responses.
- Involves a critical security path that must be robust against common vulnerabilities (e.g., timing attacks, token leakage).

## 8.3.0 Technical Risks

- Insecure token implementation could lead to account takeover vulnerabilities.
- Poor error handling could leak information about the validity of tokens or user accounts.

## 8.4.0 Integration Points

- Frontend application's routing and state management.
- Backend authentication service/API.
- User database.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0 Test Scenarios

- End-to-end test of the full happy path: request reset, click link, set new password, log in with new password.
- Test submitting the form with an expired token.
- Test submitting the form with an already used token.
- Test submitting the form with mismatched passwords.
- Test submitting the form with a password that fails each complexity rule individually.
- Security penetration test focusing on token manipulation and replay attacks.

## 9.3.0 Test Data Needs

- A test user account.
- Ability to generate valid, expired, and used reset tokens for testing purposes.
- A list of weak passwords that violate the complexity rules.

## 9.4.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for end-to-end tests.
- A security scanning tool or manual penetration testing for security validation.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented for backend logic with >80% coverage
- E2E tests for all key scenarios (happy path, error conditions) are implemented and passing
- User interface reviewed for usability and adherence to design specifications
- Security requirements, especially token invalidation, have been manually verified and peer-reviewed
- Documentation for the new API endpoint is created/updated
- Story deployed and verified in the staging environment by QA

# 11.0.0 Planning Information

## 11.1.0 Story Points

5

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a critical path for user retention and must be prioritized early in the project.
- Requires both frontend and backend development effort, which should be coordinated.
- Allocate extra time for security review of the implementation.

## 11.4.0 Release Impact

- Completes the core account recovery feature set, which is essential for a public launch.

