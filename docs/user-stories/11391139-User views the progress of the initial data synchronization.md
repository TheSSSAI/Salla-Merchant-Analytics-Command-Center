# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-012 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User views the progress of the initial data synchr... |
| As A User Story | As a new merchant who has just connected my Salla ... |
| User Persona | New Merchant (typically Store Owner / Admin) |
| Business Value | Improves the user onboarding experience by providi... |
| Functional Area | User Onboarding and Data Synchronization |
| Story Theme | Initial Store Setup and Onboarding |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Display of progress indicator when sync is active

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a new merchant has successfully connected their Salla store and the initial data sync job has started

### 3.1.5 When

the merchant logs in or navigates to any page within the application

### 3.1.6 Then

a persistent progress indicator is displayed, for example in the main header or as a banner.

### 3.1.7 Validation Notes

Verify the indicator appears immediately after the sync job is triggered and is visible across all application pages.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Progress indicator shows correct and updating information

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the data sync progress indicator is visible

### 3.2.5 When

the background sync job makes progress

### 3.2.6 Then

the indicator displays a message like 'Syncing historical data...'

### 3.2.7 And

it displays an estimated time remaining (ETR) which updates periodically.

### 3.2.8 Validation Notes

The frontend should poll a status endpoint at a regular interval (e.g., every 30 seconds) to get updated progress. ETR calculation should be handled gracefully, perhaps showing 'Calculating...' for the first few percent.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Progress indicator persists across sessions

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

the initial data sync is in progress at 50%

### 3.3.5 When

the user logs out and logs back in

### 3.3.6 Then

the progress indicator is still visible and displays the current, updated progress (e.g., '52%').

### 3.3.7 Validation Notes

The sync status is tied to the merchant account, not the user session. The UI should fetch the current status upon application load if a sync is active for that merchant.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Progress indicator reflects a failed sync job

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

the initial data sync is in progress

### 3.4.5 When

the background sync job fails after all retries are exhausted

### 3.4.6 Then

the progress indicator changes to a failure state

### 3.4.7 And

it provides a user action, such as a 'Retry' button (as per US-014).

### 3.4.8 Validation Notes

The status endpoint must return a 'FAILED' state which the UI correctly interprets and renders.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Progress indicator is removed upon successful completion

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the initial data sync is nearly complete

### 3.5.5 When

the background sync job finishes successfully

### 3.5.6 Then

the progress indicator is removed from the UI

### 3.5.7 And

a success notification is displayed to the user (as per US-013).

### 3.5.8 Validation Notes

Once the status endpoint returns 'COMPLETED', the UI should cease polling and remove the progress component.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A persistent banner, header section, or toast notification area for the indicator.
- A visual progress bar element.
- Text labels for status message (e.g., 'Syncing...'), percentage, and ETR.
- An info icon with a tooltip explaining which data is being synced and that some reports may be incomplete until the process finishes.
- A 'Retry' button for the failure state.

## 4.2.0 User Interactions

- The progress indicator should be non-blocking, allowing the user to navigate and interact with other parts of the application.
- Hovering over the info icon should display the tooltip.

## 4.3.0 Display Requirements

- The progress percentage must be an integer from 0 to 100.
- The ETR should be displayed in a human-readable format (e.g., 'About 2 hours remaining', 'Less than a minute remaining').

## 4.4.0 Accessibility Needs

- The progress bar element must use appropriate ARIA roles and attributes (`role='progressbar'`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`).
- All text must meet WCAG 2.1 AA contrast ratio standards.
- The indicator's state changes (e.g., to 'Failed') should be announced to screen readers using ARIA live regions.

# 5.0.0 Business Rules

- {'rule_id': 'BR-SYNC-001', 'rule_description': "The progress indicator must only be shown for the merchant account for which a sync job is currently in a 'RUNNING' state.", 'enforcement_point': 'Application frontend, on initial load and during navigation.', 'violation_handling': 'The indicator is not rendered if no sync is active.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-009

#### 6.1.1.2 Dependency Reason

The sync process is initiated only after a Salla store is successfully connected.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-011

#### 6.1.2.2 Dependency Reason

The scope and initiation of the sync job are determined by the user's choice of data import depth.

## 6.2.0.0 Technical Dependencies

- A background job processing system (e.g., Upstash QStash) capable of running the long-running data import.
- A mechanism for the background job to report its progress (e.g., updating a status record in PostgreSQL or a key in Redis).
- A backend API endpoint (e.g., `/api/v1/sync/status`) for the frontend to poll for progress updates.

## 6.3.0.0 Data Dependencies

- The sync job's current status (e.g., PENDING, RUNNING, COMPLETED, FAILED), percentage complete, and metadata for ETR calculation must be available via the status endpoint.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The frontend polling for status updates must not degrade the UI's responsiveness. Polling interval should be reasonable (e.g., 30-60 seconds).
- The backend status endpoint must have a p99 response time of <100ms as it will be polled frequently.

## 7.2.0.0 Security

- The API endpoint providing the sync status must be authenticated and authorized, ensuring a user can only view the status for their own merchant account.

## 7.3.0.0 Usability

- The progress indicator must be clear, unambiguous, and provide confidence to the user that the system is working.
- The ETR should be presented as an estimate (e.g., 'About 2 hours...') to manage expectations accurately.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards as specified in the UI requirements.

## 7.5.0.0 Compatibility

- The progress indicator must render and function correctly on all supported modern evergreen browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires coordinated work between frontend and backend.
- Backend needs a robust mechanism for the async job to report progress reliably.
- Frontend needs to handle polling, state management across pages, and gracefully render different states (running, failed, calculating ETR).

## 8.3.0.0 Technical Risks

- The ETR calculation could be inaccurate or highly volatile, leading to a poor user experience. The logic needs to be smoothed or presented carefully.
- If the background job fails to update its status, the progress bar could appear stalled to the user. A timeout or heartbeat mechanism should be considered.

## 8.4.0.0 Integration Points

- Frontend UI <-> Backend Sync Status API
- Backend Sync Status API <-> Progress Data Store (Redis/PostgreSQL)
- Progress Data Store <-> Background Sync Worker

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify the indicator displays correctly when a sync starts.
- Verify the percentage and ETR update over time by mocking API responses.
- Verify the indicator is removed on successful completion.
- Verify the failure state is shown correctly when the API returns a 'FAILED' status.
- Verify the indicator's visibility persists across page navigation and browser refresh/re-login.
- Verify accessibility attributes are present and correct.

## 9.3.0.0 Test Data Needs

- Mock API responses for various sync states: RUNNING (at 10%, 50%, 99%), COMPLETED, FAILED, and PENDING.
- A test user account that can be put into an 'initial sync' state in the staging environment.

## 9.4.0.0 Testing Tools

- Jest/Vitest for frontend component unit tests.
- Playwright for E2E tests simulating the user journey.
- Postman/Insomnia for testing the backend status endpoint directly.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code for both frontend component and backend endpoint has been peer-reviewed and merged.
- Unit tests for the UI component and backend logic achieve required code coverage.
- E2E tests covering the happy path, failure, and re-login scenarios are implemented and passing.
- User interface has been reviewed by a UX designer and meets accessibility standards.
- The backend endpoint performance meets the specified NFRs under simulated load.
- The feature is deployed and verified in the staging environment using a test merchant account.
- Any necessary technical documentation for the status API has been created.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a critical part of the onboarding user experience and should be prioritized early.
- Requires both frontend and backend development capacity. The tasks should be broken down and can be worked on in parallel once the API contract for the status endpoint is defined.

## 11.4.0.0 Release Impact

Essential for the initial public release to ensure a smooth and professional onboarding flow for new users.

