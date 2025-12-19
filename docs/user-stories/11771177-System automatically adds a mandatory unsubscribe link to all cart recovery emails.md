# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-050 |
| Elaboration Date | 2025-01-20 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System automatically adds a mandatory unsubscribe ... |
| As A User Story | As a Merchant (Store Owner / Marketer), I want the... |
| User Persona | Store Owner / Marketer |
| Business Value | Ensures legal compliance with regulations like GDP... |
| Functional Area | Cart Recovery |
| Story Theme | Compliance and Trust |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Unsubscribe link is automatically injected into outgoing emails

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a merchant has an active cart recovery campaign and has created an email template

### 3.1.5 When

the system sends a cart recovery email to a customer

### 3.1.6 Then

the email's footer must contain a clearly visible and functional unsubscribe link.

### 3.1.7 Validation Notes

Verify using an email testing service (e.g., Mailtrap) in a test environment. The received email's raw source should contain an '<a>' tag with a unique URL for unsubscribing.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Customer successfully unsubscribes using the one-click link

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a customer has received a cart recovery email and clicks the unsubscribe link

### 3.2.5 When

the unsubscribe page loads in their browser

### 3.2.6 Then

the page must display a clear confirmation message (e.g., 'You have been successfully unsubscribed').

### 3.2.7 And

the customer's email address must be immediately added to the specific merchant's suppression list in the database.

### 3.2.8 Validation Notes

Automated E2E test: click the link, assert the confirmation page content, and query the database to confirm the email address was added to the suppression table for the correct merchant_id.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

System prevents sending emails to an unsubscribed customer

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a customer's email address is on a merchant's suppression list

### 3.3.5 And

the system should log this event internally as a successful suppression.

### 3.3.6 When

the cart recovery email job attempts to send an email

### 3.3.7 Then

the system must check the suppression list, identify the customer, and prevent the email from being sent.

### 3.3.8 Validation Notes

Integration test: Add an email to the suppression list, trigger the email sending function for that user, and assert that the external email service API was not called. Check application logs for the suppression message.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Merchant is informed about the automatic link in the UI

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a merchant is using the cart recovery email template editor

### 3.4.5 When

they view the editor interface

### 3.4.6 Then

a non-editable message must be displayed (e.g., in the footer area) stating that an unsubscribe link will be automatically added to all emails.

### 3.4.7 Validation Notes

UI test: Navigate to the email template editor and verify the presence and content of the informational text.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Unsubscribe link is secure and specific

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

the system generates an unsubscribe link

### 3.5.5 When

the link is inspected

### 3.5.6 Then

it must contain a secure, unguessable, signed token that uniquely identifies both the recipient and the merchant.

### 3.5.7 And

attempting to use a tampered or invalid token on the unsubscribe endpoint must result in an error page and not perform any action.

### 3.5.8 Validation Notes

Unit test the token generation/validation logic. Integration test the unsubscribe endpoint with malformed, expired, or incorrectly signed tokens.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A non-editable text block in the email template editor UI.
- A simple, static HTML page for the unsubscribe confirmation.

## 4.2.0 User Interactions

- The merchant cannot interact with or remove the unsubscribe functionality.
- The end customer performs a single click on the link to unsubscribe.

## 4.3.0 Display Requirements

- Email editor must display: 'An unsubscribe link will be automatically added to the footer of all emails.'
- Unsubscribe page must display: 'You have been successfully unsubscribed from these communications.'

## 4.4.0 Accessibility Needs

- The unsubscribe link in the email must have clear, descriptive text.
- The unsubscribe confirmation page must be WCAG 2.1 AA compliant.

# 5.0.0 Business Rules

- {'rule_id': 'BR-006', 'rule_description': 'The unsubscribe link is a mandatory, non-removable component of all outgoing cart recovery emails.', 'enforcement_point': 'Server-side, during the email composition/sending process.', 'violation_handling': 'Not applicable, as the system enforces this rule programmatically. There is no path for violation.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

Establishes the core email sending sequence that this story modifies.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-043

#### 6.1.2.2 Dependency Reason

Creates the email template editor where the informational notice will be displayed.

## 6.2.0.0 Technical Dependencies

- A database table to store the per-merchant suppression list (e.g., `MerchantSuppressionList`).
- A public API endpoint to handle unsubscribe requests from clicked links.
- Integration with the email sending service (e.g., Postmark).

## 6.3.0.0 Data Dependencies

- Requires access to `merchant_id` and `customer_email` at the time of email generation to create the unique link.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The unsubscribe API endpoint must have a p99 response time of < 100ms.
- The pre-send check against the suppression list must add negligible latency (< 10ms) to the email sending process.

## 7.2.0.0 Security

- Unsubscribe links must use a cryptographically signed token (e.g., JWT) to prevent tampering and unauthorized unsubscribes.
- The public unsubscribe endpoint must be protected against enumeration or abuse.

## 7.3.0.0 Usability

- The unsubscribe process must be a 'one-click' action, requiring no further input from the user after clicking the link.

## 7.4.0.0 Accessibility

- The unsubscribe link must meet WCAG 2.1 AA contrast and focus requirements within the email.

## 7.5.0.0 Compatibility

- The unsubscribe link must function correctly in all modern web browsers supported by the application.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires secure token generation and validation logic.
- Involves creating a new public-facing, unauthenticated API endpoint.
- Requires modification of the critical email-sending path to include the suppression check.
- Database schema changes and need for efficient indexing on the suppression table.

## 8.3.0.0 Technical Risks

- A bug in the suppression check logic could lead to sending emails to unsubscribed users, causing legal and reputational damage.
- The unsubscribe token could be implemented insecurely, allowing for malicious actions.

## 8.4.0.0 Integration Points

- Database: A new `MerchantSuppressionList` table.
- Backend Email Service: Logic to inject the footer and check the suppression list.
- API Gateway: A new public route and controller for handling unsubscribe requests.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify link injection in a sent email.
- Test the full unsubscribe flow from email click to database update.
- Test the suppression logic to ensure emails are blocked.
- Test the unsubscribe endpoint with invalid, tampered, and expired tokens.
- Verify the informational text appears in the email template editor.

## 9.3.0.0 Test Data Needs

- Test merchant accounts.
- Test customer email addresses.
- A pre-populated suppression list in the test database to verify blocking logic.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.
- An email interception tool like Mailtrap for E2E email verification.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests for token logic and suppression service implemented with >80% coverage
- Integration testing for the unsubscribe endpoint and email sending flow completed successfully
- E2E test simulating the full unsubscribe and suppression cycle is passing in CI
- User interface changes (editor notice, confirmation page) reviewed and approved
- Security review of the token implementation and public endpoint completed
- Documentation for the unsubscribe mechanism and suppression list is created
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a blocking requirement for the release of the Cart Recovery feature.
- Requires both backend (API, DB, services) and minor frontend (UI notice) work.

## 11.4.0.0 Release Impact

The Cart Recovery feature (REQ-FUN-500) cannot be released to production without this story being completed and verified due to legal compliance risks.

