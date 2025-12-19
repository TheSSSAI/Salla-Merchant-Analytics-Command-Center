# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-055 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User acknowledges legal basis for marketing commun... |
| As A User Story | As a Store Owner or Marketer, I want to be present... |
| User Persona | Store Owner, Marketer (any user with permission to... |
| Business Value | Mitigates legal risk for the platform by ensuring ... |
| Functional Area | Cart Recovery |
| Story Theme | Compliance and Feature Gating |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

First-time activation of Cart Recovery feature with successful acknowledgment

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in 'Owner' or 'Marketer' and the Cart Recovery feature for my merchant account has never been enabled

### 3.1.5 When

I navigate to the Cart Recovery settings page and click the 'Enable Feature' toggle or button

### 3.1.6 Then

A modal dialog appears displaying the legal acknowledgment text, blocking interaction with the rest of the page. The modal contains a checkbox and a disabled 'Agree and Enable' button. When I check the box, the 'Agree and Enable' button becomes active. When I click the active button, the modal closes, the Cart Recovery feature is enabled, and its configuration settings become accessible. The system records my user ID and the current timestamp as having provided the acknowledgment for the merchant account.

### 3.1.7 Validation Notes

Verify in the database that a record of the acknowledgment (user_id, merchant_id, timestamp) is created. Verify the UI state changes to show the feature as enabled.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User declines to acknowledge the legal basis

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

The legal acknowledgment modal is displayed after I attempted to enable the Cart Recovery feature

### 3.2.5 When

I close the modal without agreeing (e.g., by clicking a 'Cancel' button, the 'X' icon, or pressing the ESC key)

### 3.2.6 Then

The modal closes, and the Cart Recovery feature remains disabled. The configuration settings for the feature remain inaccessible or hidden.

### 3.2.7 Validation Notes

Confirm that no acknowledgment record is created in the database. The feature's state in the UI should remain 'disabled'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Accessing the feature after acknowledgment has been provided

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

An authorized user from my merchant account has already acknowledged the legal basis and enabled the Cart Recovery feature

### 3.3.5 When

I, as any user with access to the feature (Owner, Marketer), navigate to the Cart Recovery page

### 3.3.6 Then

The feature's configuration settings are immediately visible and interactive, and the legal acknowledgment modal is not displayed.

### 3.3.7 Validation Notes

Test with different user roles (Owner, Marketer) on the same merchant account after one has given consent. The check should be at the merchant account level.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

System fails to save the acknowledgment due to a server error

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am in the legal acknowledgment modal and have checked the box to agree

### 3.4.5 When

I click the 'Agree and Enable' button, and the backend API call to save the acknowledgment fails

### 3.4.6 Then

The modal displays a user-friendly error message (e.g., 'Could not save your acknowledgment. Please try again.'). The modal remains open, and the Cart Recovery feature remains disabled.

### 3.4.7 Validation Notes

Use browser developer tools or a proxy to simulate a 500-level server error on the API endpoint and verify the UI response.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Verifying the content of the acknowledgment modal

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

The legal acknowledgment modal is displayed

### 3.5.5 When

I view the modal's content

### 3.5.6 Then

The modal must contain clear, legally-approved text stating the merchant's responsibility for having a legal basis for contact. The text must include clickable links to the platform's Terms of Service and Privacy Policy.

### 3.5.7 Validation Notes

Content must be reviewed and approved by the legal team. Links must open in a new browser tab.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A toggle switch or button to initiate the 'Enable Cart Recovery' action.
- A modal dialog for the acknowledgment.
- A checkbox within the modal for the user to indicate agreement.
- An 'Agree and Enable' button in the modal, which is disabled by default.
- A 'Cancel' button or 'X' icon to close the modal without agreeing.
- A designated area for the legal text.
- Hyperlinks within the text for 'Terms of Service' and 'Privacy Policy'.

## 4.2.0 User Interactions

- Clicking the 'Enable' toggle/button triggers the modal if acknowledgment has not been given.
- The 'Agree and Enable' button in the modal is enabled only when the checkbox is checked.
- Closing the modal via 'Cancel' or 'X' returns the UI to its previous state with the feature disabled.

## 4.3.0 Display Requirements

- The legal text must be clearly legible.
- The UI must provide immediate feedback that the feature is enabled after successful acknowledgment.

## 4.4.0 Accessibility Needs

- The modal must be keyboard-navigable (focusable elements, ESC to close).
- The checkbox and buttons must have clear labels for screen readers.
- The modal should trap focus while it is open.
- Adherence to WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-006', 'rule_description': 'The Cart Recovery feature shall only be enabled for merchants who acknowledge and agree within the UI that they have a sufficient legal basis (e.g., legitimate interest or explicit consent) for contacting their customers for this purpose, as outlined in the Terms of Service.', 'enforcement_point': "Backend API: All endpoints related to configuring or activating cart recovery campaigns must verify the merchant's acknowledgment status before processing the request.", 'violation_handling': "If an API call is made to configure cart recovery for a merchant who has not given acknowledgment, the API must return a '403 Forbidden' error with a clear error message."}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-040

#### 6.1.1.2 Dependency Reason

The Cart Recovery page/module where the 'Enable' button will exist must be created first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-020

#### 6.1.2.2 Dependency Reason

The Role-Based Access Control (RBAC) system must be in place to identify the user's role (Owner/Marketer) and authorize the action.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint to record the acknowledgment.
- A database schema (e.g., a field on the `merchants` table like `cart_recovery_consent_at`) to store the acknowledgment state.
- The authentication service to provide the current user's ID and role.

## 6.3.0.0 Data Dependencies

- The merchant account ID and user ID must be available from the user's session.

## 6.4.0.0 External Dependencies

- Final legal text for the acknowledgment modal must be provided and approved by the legal department.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to save the acknowledgment should respond in under 300ms (p95).

## 7.2.0.0 Security

- The acknowledgment status must be checked on the backend for every sensitive cart recovery action; it cannot be a frontend-only check.
- The system must create an immutable audit log of which user accepted the terms and when.

## 7.3.0.0 Usability

- The purpose of the acknowledgment must be clear and unambiguous to the user.

## 7.4.0.0 Accessibility

- The modal and its contents must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The modal and its interactions must function correctly on all supported browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires both frontend (modal UI) and backend (API endpoint, database change) work.
- State management on the frontend to reflect the feature's enabled/disabled status.
- Requires a database migration.

## 8.3.0.0 Technical Risks

- The legal text may change, requiring updates. The text should be managed in a way that is easy to update (e.g., from a configuration file or localization string).
- Failure to enforce this check on all relevant backend APIs could create a security/compliance loophole.

## 8.4.0.0 Integration Points

- Integrates with the user authentication system to get user/role info.
- Integrates with the primary database to store the acknowledgment state.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- A new user enables the feature for the first time.
- A user attempts to enable but cancels.
- A second user from the same merchant account accesses the feature after it has been enabled.
- API calls to configure cart recovery are rejected if acknowledgment has not been given.
- Simulate a network/server error during the acknowledgment submission.

## 9.3.0.0 Test Data Needs

- A test merchant account where the acknowledgment has NOT been given.
- A test merchant account where the acknowledgment HAS been given.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.
- A tool to mock API responses to test error conditions.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and integration tests implemented with sufficient coverage and passing
- E2E tests for the acknowledgment flow are created and passing
- Backend API endpoints are secured and enforce the acknowledgment check
- Final, legally-approved text is implemented in the UI
- User interface reviewed and approved for usability and accessibility
- An audit record of the acknowledgment is successfully created
- Documentation for the feature notes this prerequisite step
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a blocker for the development and testing of all other cart recovery configuration features (US-041, US-042, etc.). It should be prioritized to be completed in an early sprint of the Cart Recovery epic.
- Dependency on the legal team for final text needs to be managed to avoid blocking development.

## 11.4.0.0 Release Impact

- The entire Cart Recovery feature cannot be released without this compliance gate in place.

