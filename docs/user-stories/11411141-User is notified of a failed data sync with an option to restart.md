# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-014 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User is notified of a failed data sync with an opt... |
| As A User Story | As a new merchant whose initial data synchronizati... |
| User Persona | New Merchant (Store Owner / Admin) |
| Business Value | Improves the onboarding success rate and reduces e... |
| Functional Area | User Onboarding and Data Synchronization |
| Story Theme | Onboarding Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful notification and restart of a failed sync

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a new merchant has connected their Salla store and the initial data sync background job has terminally failed after all automatic retries

### 3.1.5 When

the merchant logs in and navigates to the main dashboard

### 3.1.6 Then

the system displays a persistent, prominent notification banner indicating that the data sync has failed

### 3.1.7 Validation Notes

Verify the 'sync_status' field for the merchant is 'FAILED' in the database. The UI banner should be clearly visible.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Restart button functionality

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the 'Data Sync Failed' notification banner is displayed with a 'Restart Sync' button

### 3.2.5 When

the merchant clicks the 'Restart Sync' button

### 3.2.6 Then

a new initial data synchronization job is queued for that merchant in the backend

### 3.2.7 And

the 'Restart Sync' button is disabled or removed to prevent multiple submissions

### 3.2.8 Validation Notes

Check the job queue (QStash) to confirm a new job was added. The UI state must update immediately to reflect the 'In Progress' status.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Email notification on sync failure

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the initial data sync job has terminally failed

### 3.3.5 When

the system marks the sync status as 'FAILED'

### 3.3.6 Then

an email is sent to the merchant's registered address notifying them of the failure and prompting them to log in to restart it

### 3.3.7 Validation Notes

Verify the email is sent via the email service provider (Postmark) and contains a clear subject, message, and a link to the application dashboard.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Unauthorized user access to restart function

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

the initial data sync has failed for a merchant account

### 3.4.5 And

a user with the 'Analyst' or 'Marketer' role is logged into that account

### 3.4.6 When

the user views the dashboard

### 3.4.7 Then

they do not see the 'Data Sync Failed' notification banner or any option to restart the sync

### 3.4.8 Validation Notes

Log in as each non-admin role and confirm the UI element is not present. Also, test the restart API endpoint directly with an unauthorized user token to ensure it returns a 403 Forbidden status.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Persistence of failure notification

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

the initial data sync has failed and the notification banner is visible

### 3.5.5 When

the user logs out and logs back in, or refreshes the page

### 3.5.6 Then

the 'Data Sync Failed' notification banner remains visible until a sync is successfully restarted

### 3.5.7 Validation Notes

Verify the failed state is persisted in the database and is fetched correctly on every page load of the dashboard.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Backend failure during restart attempt

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

the user is viewing the 'Data Sync Failed' banner

### 3.6.5 And

the main 'Data Sync Failed' banner remains unchanged

### 3.6.6 When

the user clicks the 'Restart Sync' button

### 3.6.7 Then

a temporary, user-friendly error message (e.g., a toast notification) is displayed, such as 'Could not restart the sync. Please try again.'

### 3.6.8 Validation Notes

Use a mock or fault injection to simulate the job queueing service being down and verify the UI response.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A persistent notification banner with an error state style (e.g., red or orange background).
- A primary call-to-action button within the banner labeled 'Restart Sync'.
- A temporary toast/ephemeral notification for API errors during the restart attempt.

## 4.2.0 User Interactions

- Clicking the 'Restart Sync' button triggers an API call and updates the UI to an 'In Progress' state.
- The 'Restart Sync' button should be disabled on click to prevent duplicate requests.

## 4.3.0 Display Requirements

- The banner must clearly state that the data sync has failed.
- The email notification must have a clear subject line (e.g., '[Action Required] Data Sync Failed') and a call-to-action.

## 4.4.0 Accessibility Needs

- The notification banner must have an appropriate ARIA role (e.g., `role="alert"`) to be announced by screen readers.
- All interactive elements (button) must be keyboard-focusable and have clear focus indicators.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-SYNC-01

### 5.1.2 Rule Description

A sync is considered terminally failed only after exhausting all automated retry attempts as defined in REQ-FUN-104.

### 5.1.3 Enforcement Point

Background Job Worker

### 5.1.4 Violation Handling

The job should not be marked as 'FAILED' for transient errors that are still within the retry policy.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-RBAC-01

### 5.2.2 Rule Description

Only users with 'Owner' or 'Admin' roles can initiate a data sync restart.

### 5.2.3 Enforcement Point

API Middleware and Frontend UI

### 5.2.4 Violation Handling

API requests from unauthorized roles must be rejected with a 403 Forbidden error. The UI element should not be rendered for these roles.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-012

#### 6.1.1.2 Dependency Reason

The initial data synchronization process, including its background job and UI progress indicator, must be implemented before its failure case can be handled.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-016

#### 6.1.2.2 Dependency Reason

The Role-Based Access Control (RBAC) system for defining user roles ('Owner', 'Admin', etc.) must be in place to correctly enforce permissions.

## 6.2.0.0 Technical Dependencies

- A background job processing system (e.g., Upstash QStash) capable of reporting terminal job failure.
- A transactional email service (e.g., Postmark) for sending failure notifications.
- A persistent data store (PostgreSQL) to store the merchant's sync status.

## 6.3.0.0 Data Dependencies

- The merchant's account must have a 'sync_status' field that can be updated to 'FAILED'.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to restart the sync must have a p95 response time of less than 500ms.

## 7.2.0.0 Security

- The API endpoint for restarting the sync must be protected against CSRF attacks.
- The endpoint must validate that the authenticated user belongs to the merchant account for which the sync is being restarted.

## 7.3.0.0 Usability

- The failure notification and restart process must be intuitive and require no special instructions.

## 7.4.0.0 Accessibility

- UI components must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported modern web browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Coordination between the background worker, the main application API, and the frontend.
- Implementing a robust state machine for the sync status (`pending`, `in_progress`, `completed`, `failed`).
- Ensuring the restart action is idempotent.
- Handling potential failures in the restart action itself.

## 8.3.0.0 Technical Risks

- The background worker might fail to update the status in the database upon a crash, leaving the sync in a perpetual 'in_progress' state. A timeout or heartbeat mechanism may be needed.
- The email notification service could be down, preventing the user from being notified out-of-app.

## 8.4.0.0 Integration Points

- Backend API (for status checks and restart trigger).
- Database (to read/write sync status).
- Background Job Queue (to re-queue the job).
- Email Service (to send notifications).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify the UI banner appears when sync status is 'FAILED'.
- Verify clicking 'Restart Sync' queues a job and updates the UI.
- Verify the email is correctly formatted and sent upon failure.
- Verify users with non-admin roles cannot see or trigger the restart.
- Verify the system's response when the restart API call fails.

## 9.3.0.0 Test Data Needs

- A test merchant account that can be programmatically set to a 'FAILED' sync status.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.
- A mock email service (e.g., MailHog) for testing email delivery in non-production environments.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented for all new logic, with >80% coverage
- E2E tests for the primary failure and restart flow are implemented and passing
- User interface is responsive and meets accessibility (WCAG 2.1 AA) standards
- API endpoint for restart is secured and documented
- Email notification template is created and tested
- Logging is added for sync failures and restart attempts
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a critical part of the onboarding flow and a high-priority bug fix/feature for user retention. It should be scheduled in the sprint immediately following the implementation of the initial data sync itself.

## 11.4.0.0 Release Impact

- Essential for a public launch to ensure a smooth onboarding experience and minimize early user churn and support tickets.

