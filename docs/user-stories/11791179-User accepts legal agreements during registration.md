# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-052 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User accepts legal agreements during registration |
| As A User Story | As a new user signing up for the service, I want t... |
| User Persona | Prospective Merchant User (any individual creating... |
| Business Value | Ensures legal compliance (e.g., GDPR, CCPA), mitig... |
| Functional Area | User Onboarding |
| Story Theme | Compliance and User Trust |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User accepts terms and successfully registers

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A new user is on the registration page and has filled in all required fields (e.g., email, password)

### 3.1.5 When

The user checks the box to accept the Terms of Service and Privacy Policy, and then clicks the 'Create Account' button

### 3.1.6 Then

The system validates the acceptance, creates the user account, and redirects the user to the next step of the onboarding process (e.g., Salla Store Connection).

### 3.1.7 Validation Notes

Verify that the user record is created in the database and the user is successfully logged in and redirected.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: User attempts to register without accepting terms

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A new user is on the registration page and has filled in all required fields

### 3.2.5 When

The user does NOT check the box to accept the terms and clicks the 'Create Account' button

### 3.2.6 Then

The registration process is blocked, no user account is created, and a clear, user-friendly error message is displayed next to the checkbox (e.g., 'You must accept the Terms of Service and Privacy Policy to continue.').

### 3.2.7 Validation Notes

Automated E2E test should attempt to submit the form without checking the box and assert that the error message appears and the URL does not change.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User reviews the legal documents

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A new user is on the registration page

### 3.3.5 When

The user clicks on the 'Terms of Service' or 'Privacy Policy' link

### 3.3.6 Then

The corresponding document opens in a new browser tab or a modal overlay, ensuring the user does not lose their progress on the registration form.

### 3.3.7 Validation Notes

Manually click each link and verify it opens correctly without disrupting the form. E2E test can verify the link's `href` and `target='_blank'` attributes.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

System records user's acceptance for audit purposes

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A new user has successfully accepted the terms and completed registration

### 3.4.5 When

The user account is created

### 3.4.6 Then

The system creates an immutable audit record in the database that includes the user's ID, the type of document accepted (ToS/PP), the version of the document, and the precise timestamp of acceptance.

### 3.4.7 Validation Notes

After a test registration, query the database to confirm that a corresponding record exists in the `legal_acceptances` table with the correct information.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A single checkbox for acceptance.
- A label for the checkbox, e.g., 'I have read and agree to the Terms of Service and Privacy Policy.'
- Hyperlinks for 'Terms of Service' and 'Privacy Policy' within the label text.
- An inline error message container that is initially hidden.

## 4.2.0 User Interactions

- The 'Create Account' button should be disabled until all required fields, including the acceptance checkbox, are valid.
- Alternatively, clicking 'Create Account' without acceptance triggers the display of the inline error message.
- Clicking the legal document links opens them in a new tab.

## 4.3.0 Display Requirements

- The acceptance checkbox and text must be clearly visible and positioned near the primary call-to-action button on the registration form.

## 4.4.0 Accessibility Needs

- The checkbox must be associated with its label using a `for` attribute to be screen-reader friendly.
- The checkbox and links must be keyboard-navigable and have clear focus indicators.
- The error message must be programmatically associated with the checkbox using `aria-describedby` for screen readers.

# 5.0.0 Business Rules

- {'rule_id': 'BR-008', 'rule_description': "All users must agree to the system's Terms of Service and Privacy Policy upon registration.", 'enforcement_point': 'Backend API endpoint for user creation.', 'violation_handling': 'The API request for user creation will be rejected with a 400-level error code if the acceptance flag is not present or is false.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-001', 'dependency_reason': 'This story adds a mandatory component to the registration form and flow defined in US-001. The basic registration UI and backend endpoint must exist first.'}

## 6.2.0 Technical Dependencies

- A backend service/endpoint for creating new users.
- A frontend component for the user registration form.
- A database schema to store user data.
- A method for storing and serving static legal documents (e.g., from Cloudflare R2 or as static pages in the Next.js app).

## 6.3.0 Data Dependencies

- The final, legally approved text for the Terms of Service and Privacy Policy documents.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The interaction (checking the box, displaying an error) must be instantaneous (<100ms).

## 7.2.0 Security

- The acceptance event must be logged securely on the backend and cannot be spoofed by the client.
- The audit trail of acceptances must be immutable and protected from unauthorized modification.

## 7.3.0 Usability

- The requirement to accept the terms must be unambiguous.
- The error message for non-acceptance must be clear and helpful.

## 7.4.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- Functionality must be consistent across all supported modern browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- Requires minor frontend UI changes.
- Requires a simple validation check on the backend user creation endpoint.
- Requires a new database table and migration to log the acceptance, which must be part of the user creation transaction.

## 8.3.0 Technical Risks

- Risk of failing to log the acceptance if the database transaction is not handled correctly (e.g., user is created but acceptance is not logged). This must be an atomic operation.

## 8.4.0 Integration Points

- Frontend registration form.
- Backend user creation API endpoint.
- Database (PostgreSQL) for creating the user and the acceptance log.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Attempt to register without checking the box.
- Check the box and successfully register.
- Click the ToS and PP links to ensure they open correctly.
- Verify the acceptance record is created in the database after successful registration.
- Test keyboard navigation and screen reader announcements for the checkbox and error message.

## 9.3.0 Test Data Needs

- A new, unique email address for creating a test user account.

## 9.4.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% coverage for new logic
- E2E tests for success and failure scenarios are implemented and passing in the CI pipeline
- User interface reviewed for accessibility and approved
- Database migration for the audit log is created and tested
- Security requirement for an immutable audit log is met and verified
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

1

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a blocker for releasing the user registration feature to the public. It must be completed as part of the initial onboarding epic.

## 11.4.0 Release Impact

- Critical for initial launch. The application cannot go live without this functionality.

