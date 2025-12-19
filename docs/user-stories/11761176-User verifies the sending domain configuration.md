# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-049 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User verifies the sending domain configuration |
| As A User Story | As a Store Owner or Admin, I want to trigger a ver... |
| User Persona | Store Owner / Admin |
| Business Value | Increases the effectiveness of the Cart Recovery f... |
| Functional Area | Cart Recovery Settings |
| Story Theme | Email Deliverability Configuration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful verification of all DNS records

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a merchant has correctly added all required DNS records (e.g., SPF, DKIM) to their domain's registrar

### 3.1.5 When

the merchant navigates to the 'Sending Domain' settings page and clicks the 'Verify Configuration' button

### 3.1.6 Then

the UI displays a 'Verifying...' status, the system performs a check, and the domain status updates to 'Verified' within 15 seconds.

### 3.1.7 Validation Notes

Verify that the domain's status is persisted as 'Verified' in the database and is displayed correctly on subsequent page loads.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Verification fails due to incorrect or missing DNS records

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

a merchant has incorrectly configured or missed one of the required DNS records

### 3.2.5 When

the merchant clicks the 'Verify Configuration' button

### 3.2.6 Then

the UI displays a 'Verifying...' status, and then updates to a 'Failed' status.

### 3.2.7 Validation Notes

The UI must clearly indicate which specific record(s) failed verification and display a helpful, actionable error message.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Verification fails due to DNS propagation delay

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

a merchant has just added the correct DNS records, but they have not yet fully propagated

### 3.3.5 When

the merchant clicks the 'Verify Configuration' button

### 3.3.6 Then

the system shows a 'Failed' status and the error message explicitly mentions that DNS changes can take up to 24 hours to propagate and advises the user to try again later.

### 3.3.7 Validation Notes

Test this by attempting to verify a domain immediately after setting the records.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User interface feedback during verification process

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the merchant is on the 'Sending Domain' settings page

### 3.4.5 When

the merchant clicks the 'Verify Configuration' button

### 3.4.6 Then

the button becomes disabled and a visual indicator (e.g., a spinner) is displayed until the verification process completes.

### 3.4.7 Validation Notes

Ensure the button is re-enabled after the check completes, regardless of the outcome (success or failure).

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Verification of a partially correct configuration

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a merchant has correctly configured the SPF record but incorrectly configured the DKIM record

### 3.5.5 When

the merchant clicks the 'Verify Configuration' button

### 3.5.6 Then

the system should display individual statuses for each record, showing 'Verified' for SPF and 'Failed' for DKIM.

### 3.5.7 Validation Notes

The overall domain status should be considered 'Failed' or 'Incomplete' until all records are verified.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Verification service is temporarily unavailable

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

the backend service cannot communicate with the external email provider's API for verification

### 3.6.5 When

the merchant clicks the 'Verify Configuration' button

### 3.6.6 Then

the system displays a user-friendly error message like 'Verification service is temporarily unavailable. Please try again in a few minutes.'

### 3.6.7 Validation Notes

This can be tested by mocking a 5xx error response from the external API.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Verify Configuration' button, clearly visible on the sending domain settings page.
- Status indicators (e.g., badges) for each required DNS record (SPF, DKIM) and for the overall domain.
- A loading indicator (e.g., spinner) to show when verification is in progress.
- An area to display clear, actionable error or success messages.

## 4.2.0 User Interactions

- Clicking the 'Verify Configuration' button triggers the check and disables the button.
- The button is re-enabled once the check is complete.
- Hovering over a failed status indicator may show a tooltip with more details.

## 4.3.0 Display Requirements

- The page must always show the last known status of the domain (e.g., Pending, Verified, Failed).
- Status indicators should use color and text for clarity (e.g., Green for 'Verified', Red for 'Failed', Grey for 'Pending').

## 4.4.0 Accessibility Needs

- All interactive elements (buttons) must be keyboard accessible and have clear focus states.
- Status changes should be announced to screen readers using ARIA live regions.
- Color-based status indicators must be supplemented with text or icons to meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-VER-001', 'rule_description': "A domain is only considered fully 'Verified' when all required DNS records (e.g., SPF, DKIM) are successfully validated.", 'enforcement_point': 'Backend verification service.', 'violation_handling': "The domain status is set to 'Failed' or 'Incomplete' and the UI reflects which records have not passed verification."}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-048', 'dependency_reason': 'This story verifies the DNS records that are provided to the user in US-048. The system must generate and store the expected record values before it can verify them.'}

## 6.2.0 Technical Dependencies

- Backend API endpoint to trigger the verification process.
- Integration with the third-party email service's API (e.g., Postmark) to perform the actual DNS check.

## 6.3.0 Data Dependencies

- Requires access to the merchant's configured sending domain and the expected DNS record values stored in the OLTP database (PostgreSQL).

## 6.4.0 External Dependencies

- Availability and performance of the third-party email service's verification API.

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The verification API call should be asynchronous to avoid blocking the UI.
- The p99 latency for the verification check to complete (from user click to UI update) should be under 15 seconds.

## 7.2.0 Security

- The verification API endpoint must be authenticated and authorized, ensuring a user can only verify domains associated with their merchant account.
- The endpoint should be rate-limited to prevent abuse.

## 7.3.0 Usability

- Error messages must be clear, non-technical, and provide actionable advice to the user.
- The verification process should be intuitive and require only a single click to initiate.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- Functionality must be consistent across all supported modern browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Requires integration with a third-party API.
- Involves an asynchronous process with multiple states to manage on the frontend.
- Handling various failure modes (incorrect records, propagation delay, API errors) adds complexity.

## 8.3.0 Technical Risks

- The external email service API may have undocumented behaviors or strict rate limits.
- DNS propagation can be unpredictable, leading to potential user confusion if not handled with clear messaging.

## 8.4.0 Integration Points

- Frontend UI (React/Next.js) -> Backend API (Vercel Function) -> Third-party Email Service API (e.g., Postmark) -> OLTP Database (PostgreSQL for status updates).

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Verify a domain with all correct DNS records.
- Attempt to verify with one or more incorrect/missing records.
- Test the UI's loading and disabled states during the check.
- Verify that error messages are displayed correctly for different failure types.
- Manually test the flow in a staging environment using a real domain to confirm end-to-end functionality.

## 9.3.0 Test Data Needs

- A test merchant account.
- A dedicated test domain where DNS records can be modified for testing purposes.
- Mocked API responses from the external email service for various scenarios (success, failure, timeout).

## 9.4.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.
- Axe for accessibility testing.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >= 80% code coverage and all passing
- E2E test scenario successfully executed in the staging environment
- User interface is responsive and reviewed for UX/UI consistency
- Performance requirements for the API endpoint are met
- Security requirements (authentication, rate limiting) are implemented and validated
- API documentation (OpenAPI) is updated for the new endpoint
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

5

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This story is blocked by US-048 and cannot be started until it is complete.
- Requires access to credentials for the third-party email service API in development and staging environments.

## 11.4.0 Release Impact

This is a critical step for the Cart Recovery feature. The feature cannot be considered fully functional without it.

