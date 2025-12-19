# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-058 |
| Elaboration Date | 2025-01-26 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | New user takes an in-app guided tour for core feat... |
| As A User Story | As a new merchant who has just completed the initi... |
| User Persona | New User (any role, primarily Store Owner on first... |
| Business Value | Improves the user onboarding experience, increases... |
| Functional Area | User Onboarding & Experience |
| Story Theme | First-Time User Experience (FTUE) |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: New user completes the entire guided tour

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a new user who has logged in for the first time and the initial data synchronization has just completed

### 3.1.5 When

I am viewing the main dashboard

### 3.1.6 Then

A modal appears offering a guided tour with 'Start Tour' and 'Skip' options. I click 'Start Tour'. The tour begins, highlighting the first key element. I click 'Next' through all steps, covering the main KPIs, date filters, AI Assistant, and Cart Recovery navigation. After the final step, I click 'Finish'. The tour UI disappears, and the tour is not automatically offered on subsequent logins.

### 3.1.7 Validation Notes

Verify via E2E test. Check the user's profile in the database to confirm a flag like `has_completed_tour` is set to true.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Alternative Flow: New user skips the tour initially

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

I am a new user who is presented with the offer to start a guided tour

### 3.2.5 When

I click the 'Skip' or 'No, thanks' button

### 3.2.6 Then

The tour modal closes, and I can interact with the application normally. The tour is not automatically offered on subsequent logins.

### 3.2.7 Validation Notes

Verify via E2E test. The user's tour completion/skipped flag should be set in the database to prevent future automatic prompts.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Alternative Flow: User exits the tour mid-way

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I am a user who has started the guided tour and is on a step before the end

### 3.3.5 When

I click the 'End Tour' or 'X' close button

### 3.3.6 Then

The tour UI disappears immediately, and I can interact with the application normally. The tour is not automatically offered on subsequent logins.

### 3.3.7 Validation Notes

Verify via E2E test. The user's tour completion/skipped flag should be set in the database.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Alternative Flow: Any user manually restarts the tour

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I am any logged-in user who has previously completed or skipped the tour

### 3.4.5 When

I navigate to the Help/Profile menu and click the 'Restart Guided Tour' option

### 3.4.6 Then

The guided tour begins from the first step.

### 3.4.7 Validation Notes

Verify manually or via E2E test that the tour can be initiated on demand from a persistent UI element.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Edge Case: Tour is not offered until initial data sync is complete

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am a new user who has just connected my store and the initial data sync is in progress

### 3.5.5 When

I navigate around the application, including the main dashboard

### 3.5.6 Then

The guided tour is not offered. Only after the sync completion notification appears is the tour offer triggered.

### 3.5.7 Validation Notes

Requires an E2E test that can mock the data sync status, confirming the tour trigger is correctly tied to the sync completion event.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

UI: Tour is responsive and accessible

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

I am a user taking the guided tour

### 3.6.5 When

I view the tour on various screen sizes, from mobile to desktop

### 3.6.6 Then

The highlighted elements, tooltips, and navigation buttons are correctly positioned, legible, and fully functional. The tour can be navigated using keyboard controls (Tab, Enter, Esc).

### 3.6.7 Validation Notes

Manual testing across different breakpoints and using keyboard navigation and screen reader tools.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Initial tour offer modal with 'Start' and 'Skip' buttons.
- Tour tooltips with content, 'Next', 'Previous', and 'End Tour' buttons.
- A background overlay to highlight the focused element.
- A persistent menu item (e.g., in Help or Profile dropdown) to 'Restart Guided Tour'.

## 4.2.0 User Interactions

- User can start, skip, advance, go back, and end the tour.
- The tour should guide the user through a predefined sequence of UI elements.
- The application behind the tour overlay should be non-interactive until the tour is ended.

## 4.3.0 Display Requirements

- The tour must highlight key features: Main Dashboard KPIs (FR-301), Date Range Filter (FR-302.1), AI Assistant Query Bar (FR-401), Cart Recovery Module Navigation Link (FR-501), and the User/Account Settings Menu.

## 4.4.0 Accessibility Needs

- Tour navigation must be keyboard-accessible (Tab to cycle through buttons, Enter to activate, Esc to close).
- Tooltip text must have sufficient color contrast.
- ARIA attributes should be used to indicate the tour's status to screen readers.

# 5.0.0 Business Rules

- {'rule_id': 'BR-TOUR-001', 'rule_description': 'The guided tour shall only be offered automatically once to a user upon their first session after the initial data synchronization is complete.', 'enforcement_point': 'Client-side logic on dashboard load.', 'violation_handling': 'If the rule fails and the tour is shown again, the user can simply skip it. The system state should prevent repeated offerings.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-013

#### 6.1.1.2 Dependency Reason

The tour's trigger is the completion of the initial data sync, which populates the dashboard.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-022

#### 6.1.2.2 Dependency Reason

The tour needs the main dashboard and its KPI elements to exist in order to highlight them.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-035

#### 6.1.3.2 Dependency Reason

The tour needs the AI Assistant UI element to exist to highlight it.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-040

#### 6.1.4.2 Dependency Reason

The tour needs the navigation element for the Cart Recovery module to exist to highlight it.

## 6.2.0.0 Technical Dependencies

- A chosen third-party library for guided tours (e.g., react-joyride, shepherd.js).
- Backend API endpoint and database schema modification to store the user's tour completion status (e.g., a boolean field on the `users` or `user_profiles` table).

## 6.3.0.0 Data Dependencies

- Requires a user record in the database to persist the tour completion state.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Loading the tour library should not significantly impact the initial page load time.
- Tour animations should be smooth (60fps) and not cause UI jank.

## 7.2.0.0 Security

- The user's tour completion status update must be sent over an authenticated API endpoint.

## 7.3.0.0 Usability

- Tour content must be concise, clear, and easy to understand.
- It must be trivial for a user to exit the tour at any point.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards, particularly for keyboard navigation and color contrast.

## 7.5.0.0 Compatibility

- The tour must function correctly on the latest versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integrating and configuring a third-party tour library.
- Managing the application state to trigger the tour at the correct moment (post-sync).
- Ensuring the CSS selectors for tour steps are robust and won't break with minor UI changes (use of `data-testid` attributes is recommended).
- Implementing the backend persistence of the user's tour status.
- Ensuring the tour's UI/UX is polished and responsive.

## 8.3.0.0 Technical Risks

- The chosen tour library may have bugs or limitations that complicate implementation.
- UI refactoring could break the tour's element selectors, requiring maintenance.

## 8.4.0.0 Integration Points

- Frontend state management to track sync status and tour visibility.
- Backend user profile service to read/write the tour completion flag.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- A new user successfully completes the tour.
- A new user skips the tour.
- A user exits the tour part-way through.
- A returning user manually restarts the tour.
- The tour does not appear on subsequent logins after being completed or skipped.
- The tour does not appear while data sync is in progress.
- The tour functions correctly on mobile, tablet, and desktop viewports.

## 9.3.0.0 Test Data Needs

- A test user account flagged as 'new' or with the tour status unset.
- A test user account with the tour status set to 'completed'.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.
- Axe-core for automated accessibility checks.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented and passing with >80% coverage for new logic
- E2E tests for all major flows (complete, skip, restart) are implemented and passing
- User interface reviewed and approved by Product Owner and UX Designer
- Tour content (text) has been approved
- Accessibility requirements validated (keyboard nav, screen reader)
- Documentation updated for the new feature and its configuration
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a key part of the onboarding epic and should be prioritized once its dependencies are met.
- Allocate time for selecting and evaluating a suitable third-party tour library if one is not already in use.

## 11.4.0.0 Release Impact

- Significantly improves the first-time user experience for the initial public release.

