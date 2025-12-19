# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-011 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User selects historical data import depth during o... |
| As A User Story | As a new merchant setting up my account, I want to... |
| User Persona | New Merchant / Store Owner |
| Business Value | Improves the onboarding experience by providing us... |
| Functional Area | User Onboarding and Data Synchronization |
| Story Theme | Initial Store Setup and Configuration |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User selects the 24-month 'Full Analysis' option

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a new merchant has successfully connected their Salla store for the first time and is on the import depth selection screen

### 3.1.5 When

the user selects the '24 months' option and clicks the 'Start Import' button

### 3.1.6 Then

a request is sent to the backend to initiate a sync for the last 24 months, the system queues the background job, and the user is redirected to the main dashboard which displays a 'Data synchronization in progress...' status.

### 3.1.7 Validation Notes

Verify that a background job is created in the queue (e.g., QStash) with the correct merchant_id and a start_date parameter corresponding to 24 months ago. Verify the user is redirected and sees the progress indicator.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: User selects the 12-month 'Quick Start' option

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a new merchant has successfully connected their Salla store for the first time and is on the import depth selection screen

### 3.2.5 When

the user selects the '12 months' option and clicks the 'Start Import' button

### 3.2.6 Then

a request is sent to the backend to initiate a sync for the last 12 months, the system queues the background job, and the user is redirected to the main dashboard which displays a 'Data synchronization in progress...' status.

### 3.2.7 Validation Notes

Verify that a background job is created in the queue with the correct merchant_id and a start_date parameter corresponding to 12 months ago.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

UI Display: The selection screen clearly presents the options and their trade-offs

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

a new merchant lands on the import depth selection screen

### 3.3.5 When

the user views the screen

### 3.3.6 Then

two distinct, selectable options for '12 months' and '24 months' are displayed, each option includes a brief explanation of its benefits (e.g., 'Quick Start' vs. 'Full Analysis'), and the '24 months' option is visually highlighted as 'Recommended'.

### 3.3.7 Validation Notes

Visual inspection of the UI to confirm all text and visual cues are present as specified.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: Backend fails to initiate the synchronization job

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

a new merchant has selected an import depth option and clicked 'Start Import'

### 3.4.5 When

the backend API returns an error and fails to queue the job

### 3.4.6 Then

the user remains on the selection screen, a non-blocking error message (e.g., toast notification) is displayed stating 'Failed to start import. Please try again.', and the 'Start Import' button is re-enabled.

### 3.4.7 Validation Notes

Use browser developer tools or a proxy to mock a 500 server error from the sync initiation endpoint and verify the UI's response.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Edge Case: User refreshes the page after making a selection

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

a new merchant has already selected an import depth and the sync job has been successfully initiated

### 3.5.5 When

the user refreshes the browser page or logs out and logs back in

### 3.5.6 Then

the system does not show the import depth selection screen again and instead directs the user to the main dashboard showing the 'Data synchronization in progress...' status.

### 3.5.7 Validation Notes

Check the merchant's state in the database after initiating the sync. Log in again as that user and verify they bypass the selection screen.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated full-page view for the selection.
- Two large, clickable card components for the '12 months' and '24 months' options.
- A 'Recommended' badge on the '24 months' option card.
- A primary action button labeled 'Start Import', which is disabled until an option is selected.

## 4.2.0 User Interactions

- Clicking on an option card selects it and deselects the other.
- The 'Start Import' button becomes active only after a selection is made.
- Clicking 'Start Import' shows a loading state on the button and triggers the API call.

## 4.3.0 Display Requirements

- Title text: 'Choose Your Historical Data'
- Option 1 Title: '12 Months'
- Option 1 Description: 'Quick Start: Get access to your dashboard faster with one year of data.'
- Option 2 Title: '24 Months'
- Option 2 Description: 'Full Analysis: Enables immediate year-over-year comparisons. This may take longer.'

## 4.4.0 Accessibility Needs

- Options must be selectable via keyboard (e.g., using Tab and Space/Enter).
- The selected state must be visually distinct and communicated to screen readers (e.g., using `aria-checked`).
- All text must meet WCAG 2.1 AA contrast ratio standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-ONBOARD-01', 'rule_description': 'A merchant must select an initial data import depth before the system can be used.', 'enforcement_point': 'During the onboarding flow, immediately after Salla store connection.', 'violation_handling': 'The user cannot proceed to the main application dashboard until a selection is made and the sync is initiated.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-009', 'dependency_reason': 'This selection screen is shown immediately after the user successfully connects their Salla store via OAuth.'}

## 6.2.0 Technical Dependencies

- A backend API endpoint to receive the user's selection and initiate the sync.
- A background job queuing system (e.g., Upstash QStash) to handle the long-running import task.
- A data persistence mechanism to store the merchant's onboarding state to prevent re-displaying this screen.

## 6.3.0 Data Dependencies

- Requires the merchant's securely stored Salla API credentials obtained from the OAuth flow in US-009.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The API call to initiate the sync job must be asynchronous and have a p99 response time of < 500ms.

## 7.2.0 Security

- The API endpoint for initiating the sync must be authenticated and verify that the user has permission to perform this action for the associated merchant account.
- The request must be protected against Cross-Site Request Forgery (CSRF).

## 7.3.0 Usability

- The purpose of the choice and the trade-offs must be immediately clear to a non-technical user.

## 7.4.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- The UI must be fully functional on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- Frontend UI is a simple stateful component.
- Backend logic involves a single API endpoint that validates input, updates a state flag in the DB, and enqueues a job.
- The primary effort is ensuring robust integration with the background job queue and proper state management for the onboarding flow.

## 8.3.0 Technical Risks

- Potential for race conditions if the user can click the 'Start Import' button multiple times quickly. The backend should be designed to be idempotent.
- Failure to correctly update the merchant's onboarding state could lead to users being stuck in a loop or seeing the screen again.

## 8.4.0 Integration Points

- Frontend -> Backend API (`/api/v1/onboarding/start-sync`)
- Backend API -> PostgreSQL Database (to update merchant onboarding status)
- Backend API -> Upstash QStash (to enqueue the data import job)

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0 Test Scenarios

- Verify selection of 12 months queues a job with the correct start date.
- Verify selection of 24 months queues a job with the correct start date.
- Verify UI error handling on API failure.
- Verify user is correctly redirected upon success.
- Verify a returning user whose sync is in progress bypasses this screen.

## 9.3.0 Test Data Needs

- A test user account in a 'newly connected store' state, before the initial sync has been configured.

## 9.4.0 Testing Tools

- Jest for unit tests.
- Playwright for end-to-end tests.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for frontend component and backend endpoint, achieving >80% coverage
- Integration testing completed to verify job queuing and DB state update
- E2E test scenario for the happy path is implemented and passing
- User interface reviewed and approved by UX/Product
- Performance requirements verified
- Security requirements validated
- Documentation for the onboarding flow is updated
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

3

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a blocking story for the entire data analytics functionality for new users.
- Must be completed as part of the core onboarding epic.

## 11.4.0 Release Impact

- Critical for the initial public release (v1.0). The application is not usable for a new merchant without this feature.

