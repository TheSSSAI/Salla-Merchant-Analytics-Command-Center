# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-051 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | System maintains a suppression list for unsubscrib... |
| As A User Story | As a Store Owner or Marketer, I want the system to... |
| User Persona | Store Owner, Marketer |
| Business Value | Ensures legal compliance with anti-spam laws (e.g.... |
| Functional Area | Cart Recovery |
| Story Theme | Compliance and User Trust |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Customer successfully unsubscribes via email link

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A customer has received a cart recovery email for Merchant A which contains a valid, unique unsubscribe link

### 3.1.5 When

The customer clicks the unsubscribe link

### 3.1.6 Then

The system immediately adds the customer's email address to Merchant A's suppression list in the database

### 3.1.7 And

An unsubscribe event is logged for Merchant A with the customer's email and a timestamp for auditing.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

System prevents sending emails to an unsubscribed customer

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A customer's email address is on Merchant A's suppression list

### 3.2.5 And

The system logs that the email was skipped due to suppression.

### 3.2.6 When

The system's email sending job attempts to send an email to that customer

### 3.2.7 Then

The system must check the suppression list before sending

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Suppression is merchant-specific (multi-tenant)

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

A customer's email is on Merchant A's suppression list

### 3.3.5 And

The same customer's email is NOT on Merchant B's suppression list

### 3.3.6 When

The system's email sending job attempts to send a cart recovery email from Merchant B to that customer

### 3.3.7 Then

The system checks Merchant B's suppression list, does not find the email, and successfully sends the email.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Customer clicks an invalid or expired unsubscribe link

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A customer has an unsubscribe link that is malformed, expired, or has an invalid token

### 3.4.5 When

The customer clicks the link

### 3.4.6 Then

The system displays a user-friendly error page explaining the link is invalid and provides a way to contact support

### 3.4.7 And

No email address is added to any suppression list.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Customer who is already unsubscribed clicks the link again

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

A customer's email is already on Merchant A's suppression list

### 3.5.5 When

The customer clicks a valid unsubscribe link from a previous email from Merchant A

### 3.5.6 Then

The system confirms the email is already on the list and takes no further action on the list

### 3.5.7 And

The customer is shown the standard 'You have been successfully unsubscribed.' confirmation page to provide a consistent experience.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A static HTML page for unsubscribe success confirmation
- A static HTML page for unsubscribe link error

## 4.2.0 User Interactions

- Customer clicks a link in an email and is taken to a web page in their browser.

## 4.3.0 Display Requirements

- Success page must clearly state that the unsubscribe action was successful.
- Error page must clearly state that the link was invalid and not to worry, they have not been subscribed to anything.

## 4.4.0 Accessibility Needs

- Confirmation and error pages must meet WCAG 2.1 Level AA standards, with clear, high-contrast text and proper semantic HTML.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-SUP-001

### 5.1.2 Rule Description

An unsubscribe action is permanent and cannot be reversed by the merchant through the UI.

### 5.1.3 Enforcement Point

System Logic

### 5.1.4 Violation Handling

N/A. The system will not provide a mechanism for merchants to re-subscribe users.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-SUP-002

### 5.2.2 Rule Description

The suppression is applied at the merchant level. A customer must unsubscribe from each merchant's communications individually.

### 5.2.3 Enforcement Point

Database Schema and API Logic

### 5.2.4 Violation Handling

N/A. All suppression list queries must be scoped by `merchant_id`.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-050

#### 6.1.1.2 Dependency Reason

This story implements the unsubscribe mechanism, which depends on the unsubscribe link being present in emails as defined in US-050.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

The email sending logic developed in US-041 must be modified to include the pre-send check against the suppression list.

## 6.2.0.0 Technical Dependencies

- A database table to store suppression list entries, scoped by merchant.
- A public API endpoint to handle incoming unsubscribe requests.
- Integration with the email sending service (e.g., Postmark) to generate the unsubscribe URL.

## 6.3.0.0 Data Dependencies

- The unsubscribe link must securely contain the necessary identifiers (e.g., merchant ID, customer email) to process the request.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API endpoint for processing an unsubscribe request must have a p99 response time of less than 500ms.
- The pre-send check against the suppression list must add negligible latency (<10ms) to the email sending process.

## 7.2.0.0 Security

- The unsubscribe link must contain a secure, unguessable, single-use token (e.g., a signed JWT) to prevent malicious unsubscribes.
- The token must be tied to a specific recipient and merchant and should have a limited expiration time (e.g., 30 days).
- The public-facing unsubscribe endpoint must be protected against abuse (e.g., rate limiting).

## 7.3.0.0 Usability

- The unsubscribe process must be a single-click action. The user should not be required to log in or fill out a form.

## 7.4.0.0 Accessibility

- Confirmation and error pages must be WCAG 2.1 AA compliant.

## 7.5.0.0 Compatibility

- The unsubscribe confirmation/error pages must render correctly on all modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires creating a secure public API endpoint.
- Involves secure token generation and validation logic.
- Modifies a critical path (email sending) which requires careful performance consideration.
- Requires a new database table and migration with proper indexing for performance.

## 8.3.0.0 Technical Risks

- A poorly performing database query for the suppression check could create a major bottleneck in the email sending pipeline.
- Security flaws in the token implementation could allow for denial-of-service attacks by unsubscribing other users.

## 8.4.0.0 Integration Points

- Database: A new `suppression_list` table.
- Backend API: A new public `GET /unsubscribe` endpoint.
- Email Sending Service: The core logic must be modified to query the suppression list before calling the ESP API.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify a user is added to the list after clicking a valid link.
- Verify an email is NOT sent to a user on the suppression list.
- Verify multi-tenancy: unsubscribing from Merchant A does not block emails from Merchant B.
- Verify that an invalid/expired token results in an error page.
- Verify security of the unsubscribe token against tampering.

## 9.3.0.0 Test Data Needs

- At least two distinct merchant accounts.
- At least one customer email address associated with both merchants.
- Generated cart recovery emails with valid unsubscribe links.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests (simulating the API call from the unsubscribe link).
- A security scanning tool to check the public endpoint.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and integration tests for token logic, API endpoint, and suppression check are implemented with >80% coverage and passing
- E2E test scenario for the unsubscribe flow is implemented and passing
- Security review of the token implementation and public endpoint is completed
- Unsubscribe confirmation and error pages are created and reviewed
- Database migration for the suppression list is created and tested
- Technical documentation for the unsubscribe flow is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a critical compliance feature and a blocker for launching the Cart Recovery module.
- Should be developed in tandem with or immediately after US-050 (adding the link to emails).

## 11.4.0.0 Release Impact

- Enables the Cart Recovery feature to be legally compliant and ready for release.

