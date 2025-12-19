# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-048 |
| Elaboration Date | 2025-01-26 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User configures a custom sending domain for improv... |
| As A User Story | As a Store Owner, I want to configure and verify m... |
| User Persona | Store Owner / Admin |
| Business Value | Increases the success rate of the Cart Recovery fe... |
| Functional Area | Settings & Configuration |
| Story Theme | Cart Recovery Enhancement |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Generating DNS records for a new custom domain

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The Store Owner is on the 'Sending Domain' configuration page within the application settings

### 3.1.5 When

The user enters a valid subdomain (e.g., 'mail.mystore.com') and clicks the 'Generate Records' button

### 3.1.6 Then

The system displays the necessary DNS records (e.g., CNAME for SPF/Return-Path, TXT for DKIM) required by the email provider.

### 3.1.7 And

The domain is saved to the merchant's account with a status of 'Pending Verification'.

### 3.1.8 Validation Notes

Verify that the backend service correctly calls the Postmark API to create a domain and retrieves the correct DNS settings. The frontend must render these settings accurately.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successfully verifying a correctly configured domain

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A custom domain has been added and has a 'Pending Verification' status

### 3.2.5 And

A success notification is displayed to the user.

### 3.2.6 When

The user clicks the 'Verify Domain' button

### 3.2.7 Then

The system initiates a verification check via the email provider's API.

### 3.2.8 Validation Notes

This requires manual testing with a real domain. The tester must add the records, wait for propagation, and then trigger the verification. The database record for the domain should reflect the 'Verified' status.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempting to generate records with an invalid domain format

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

The Store Owner is on the 'Sending Domain' configuration page

### 3.3.5 When

The user enters an invalid domain format (e.g., 'mystore', 'http://mystore.com', 'mystore.com/path') and clicks 'Generate Records'

### 3.3.6 Then

The system displays an inline validation error message, such as 'Please enter a valid domain or subdomain.'

### 3.3.7 And

No API call is made to the email provider, and no records are generated or saved.

### 3.3.8 Validation Notes

Test with various invalid inputs to ensure frontend validation is robust.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Failing to verify a domain due to incorrect or unpropagated DNS records

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A custom domain has a 'Pending Verification' status

### 3.4.5 And

A user-friendly error message is displayed, indicating that verification failed and suggesting they check their DNS settings and wait for propagation.

### 3.4.6 When

The user clicks the 'Verify Domain' button

### 3.4.7 Then

The system initiates a verification check.

### 3.4.8 Validation Notes

Manual testing is required. Test by providing incorrect DNS values or by triggering verification immediately after adding records before they could have propagated.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

UI provides clear instructions and tools for DNS configuration

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

The system has generated DNS records for a custom domain

### 3.5.5 When

The user views the records

### 3.5.6 Then

Each record's 'Value' field has a one-click 'Copy to Clipboard' button.

### 3.5.7 And

The page includes a brief explanation of what the records are for and a link to a more detailed knowledge base article.

### 3.5.8 Validation Notes

UI/UX review to confirm the instructions are clear for a non-technical audience. Verify copy-to-clipboard functionality works across supported browsers.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Input field for domain name with validation
- Button to 'Generate Records'
- A display area/table for DNS records (Type, Hostname, Value)
- A 'Copy to Clipboard' icon/button for each record value
- A 'Verify Domain' button for pending domains
- A status indicator/badge for each domain (e.g., 'Pending', 'Verified', 'Failed')
- A 'Delete' or 'Remove' button for configured domains with a confirmation modal

## 4.2.0 User Interactions

- User enters a domain and clicks a button to generate settings.
- User clicks a button to copy a record's value.
- User clicks a button to trigger a verification check.
- User receives immediate visual feedback on the status of their domain.

## 4.3.0 Display Requirements

- The page must clearly state which domain is currently active for sending emails.
- Error messages must be specific and helpful, guiding the user on how to resolve the issue.

## 4.4.0 Accessibility Needs

- All form fields and buttons must have proper labels for screen readers.
- Status indicators must be accessible, using more than just color to convey meaning (e.g., text labels).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-505-1

### 5.1.2 Rule Description

A merchant can only have one active custom sending domain at a time.

### 5.1.3 Enforcement Point

Backend logic when adding or verifying a new domain.

### 5.1.4 Violation Handling

If a user tries to add a second domain, the UI should prompt them to replace the existing one. If a new domain is verified, it becomes the active one, and any previous one is deactivated.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-505-2

### 5.2.2 Rule Description

If a custom sending domain is removed or fails verification, the system must revert to using the platform's default sending domain for that merchant's emails.

### 5.2.3 Enforcement Point

Backend email sending service.

### 5.2.4 Violation Handling

The system logs an event that the sending domain has been changed back to default. This ensures email functionality is not interrupted.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-041', 'dependency_reason': 'The primary purpose of a custom sending domain is for the cart recovery email sequences defined in US-041. This story provides the core feature that benefits from improved deliverability.'}

## 6.2.0 Technical Dependencies

- A secure integration with the Postmark API (or chosen email service provider) is required for domain management.
- Database schema must be extended to store merchant-specific domain configurations and verification status, scoped by `merchant_id`.

## 6.3.0 Data Dependencies

- Requires merchant account context to associate the domain correctly.

## 6.4.0 External Dependencies

- Functionality is critically dependent on the availability and correctness of the Postmark API for creating and verifying domains.
- Success is dependent on the user's ability to correctly configure records with their third-party DNS provider.

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The API call to trigger domain verification should respond to the client in under 500ms. The actual verification is asynchronous and may take longer.

## 7.2.0 Security

- API keys for the email service provider must be stored securely as environment variables and never exposed on the client-side.
- All API endpoints for managing domains must be protected and ensure the user has the 'Owner' or 'Admin' role.

## 7.3.0 Usability

- The UI and instructional text must be exceptionally clear, as DNS configuration can be a complex topic for many merchants.

## 7.4.0 Accessibility

- The feature must adhere to WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- The feature must function correctly on all supported modern web browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Requires integration with a third-party API (Postmark), including robust error handling.
- The asynchronous nature of DNS propagation and verification adds complexity to providing user feedback.
- The UI must simplify a technical process for a potentially non-technical audience.

## 8.3.0 Technical Risks

- The external email provider's API could change, requiring maintenance.
- Difficulty in providing precise error feedback, as DNS verification failures can be opaque (e.g., is it wrong, or just not propagated yet?).

## 8.4.0 Integration Points

- Backend -> Postmark API (for domain creation, record retrieval, and verification).
- Backend -> PostgreSQL DB (to store domain state).
- Frontend -> Backend API (to manage the domain configuration).

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Manual

## 9.2.0 Test Scenarios

- Full happy path: Add domain, copy records, add to a real DNS provider, wait, and verify successfully.
- Failure path: Attempt to verify with incorrect or missing DNS records.
- UI validation: Test invalid domain formats in the input field.
- API security: Attempt to access domain management endpoints as a user with an incorrect role (e.g., 'Analyst').

## 9.3.0 Test Data Needs

- A real, controllable domain name is required for manual end-to-end testing in the staging environment.

## 9.4.0 Testing Tools

- Jest for unit tests (with API mocking).
- Playwright for E2E tests of the UI flow (mocking the verification result).
- A DNS provider like Cloudflare or GoDaddy for manual testing.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and integration tests implemented with >80% coverage and passing
- User interface reviewed for clarity and usability by a UX designer
- The full flow has been manually tested and verified in the staging environment using a real domain
- Security requirements validated, including role-based access control
- A knowledge base article explaining the feature and DNS configuration process is drafted
- Story deployed and verified in staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

8

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- Requires access to staging environment credentials for the Postmark API.
- Manual testing for this story will be more time-consuming than for typical UI stories due to DNS propagation delays. This should be factored into the sprint plan.

## 11.4.0 Release Impact

- This is a key feature for merchants serious about email marketing and will significantly improve the value proposition of the Cart Recovery module.

