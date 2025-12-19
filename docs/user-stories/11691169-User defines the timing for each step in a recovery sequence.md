# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-042 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User defines the timing for each step in a recover... |
| As A User Story | As a Marketer or Owner, I want to define a specifi... |
| User Persona | Marketer, Store Owner / Admin |
| Business Value | Enables users to control the timing of follow-up c... |
| Functional Area | Cart Recovery |
| Story Theme | Cart Recovery Campaign Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Configure timing for the first step in a new sequence

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am on the cart recovery sequence editor page and have added the first email step

### 3.1.5 When

I enter the number '1' into the delay input and select 'Hours' from the unit dropdown for that step

### 3.1.6 Then

The system accepts the input, and the UI clearly indicates that this email will be sent 1 hour after a cart is marked as abandoned.

### 3.1.7 Validation Notes

Verify that the state is updated correctly in the frontend and the values are ready to be sent to the backend upon saving.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Configure timing for subsequent steps in a sequence

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am editing a sequence with at least one existing step

### 3.2.5 When

I add a second email step, enter '2' into its delay input, and select 'Days' from its unit dropdown

### 3.2.6 Then

The system accepts the input, and the UI clearly indicates this email will be sent 2 days after the previous step's email was sent.

### 3.2.7 Validation Notes

Check that the UI label correctly states the delay is relative to the 'previous step'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Save a sequence with valid timing configurations

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I have configured a multi-step sequence with valid, positive integer delays for each step

### 3.3.5 When

I click the 'Save Sequence' button

### 3.3.6 Then

The system successfully saves the sequence, including the delay value and unit for each step, to the database.

### 3.3.7 Validation Notes

Inspect the network request to ensure the timing data is sent correctly. Verify the data persistence by reloading the editor page and confirming the values are displayed.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to save a sequence with invalid timing (zero or negative)

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am editing a cart recovery sequence

### 3.4.5 When

I enter '-5' or '0' into the delay input for any step

### 3.4.6 Then

An inline validation error message appears next to the input, stating 'Delay must be a positive number'.

### 3.4.7 And

The 'Save Sequence' button is disabled until the error is corrected.

### 3.4.8 Validation Notes

Test with negative numbers, zero, and non-integer values. The save action must be prevented.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to save a sequence with a missing timing value

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am editing a cart recovery sequence and have added a new step

### 3.5.5 When

I leave the delay input field blank for that step and attempt to save

### 3.5.6 Then

An inline validation error message appears, stating 'This field is required'.

### 3.5.7 And

The 'Save Sequence' button is disabled.

### 3.5.8 Validation Notes

Verify that each step's timing configuration is treated as a required field.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Editing the timing of a live, active campaign

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

A cart recovery sequence is active and a customer's cart has already entered the sequence (e.g., step 1 is scheduled)

### 3.6.5 When

I edit the sequence and change the delay for a future step (e.g., step 2) from '24 hours' to '48 hours' and save

### 3.6.6 Then

The system applies the new timing only to carts that are abandoned *after* the change is saved.

### 3.6.7 And

The customer already in the sequence continues on their original timing track (i.e., they will receive step 2 after 24 hours).

### 3.6.8 Validation Notes

This requires backend logic verification. The update operation should not modify existing scheduled jobs for carts already in-flight.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A number input field for the delay value (allowing only positive integers).
- A dropdown/select component with options 'Hours' and 'Days'.
- Inline text for validation error messages.
- Clear labeling for each timing input to indicate if the delay is relative to 'cart abandonment' (for step 1) or 'the previous step' (for subsequent steps).

## 4.2.0 User Interactions

- User can type a number into the delay input.
- User can select 'Hours' or 'Days' from the dropdown.
- The 'Save' button for the sequence becomes disabled if any timing input is invalid or empty.
- Validation errors appear immediately upon losing focus from an invalid field or on an attempt to save.

## 4.3.0 Display Requirements

- The configured delay and unit must be clearly displayed for each step in the sequence editor.
- A summary of the timing (e.g., '1 hour after abandonment', '24 hours after previous email') should be visible.

## 4.4.0 Accessibility Needs

- All input fields must have associated `<label>` elements for screen reader compatibility.
- Validation errors must be programmatically associated with their respective inputs using `aria-describedby`.
- All interactive elements must be keyboard-focusable and operable.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-CR-001

### 5.1.2 Rule Description

The delay value for a recovery step must be a positive integer greater than zero.

### 5.1.3 Enforcement Point

Client-side validation in the UI and server-side validation in the API endpoint.

### 5.1.4 Violation Handling

The UI displays an error message and prevents saving. The API returns a 400 Bad Request error with a descriptive message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-CR-002

### 5.2.2 Rule Description

The maximum allowed delay for any single step is 720 hours (30 days).

### 5.2.3 Enforcement Point

Client-side and server-side validation.

### 5.2.4 Violation Handling

The UI displays an error message (e.g., 'Delay cannot exceed 30 days') and prevents saving. The API returns a 400 Bad Request error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-041', 'dependency_reason': 'This story adds timing controls to the sequence editor UI, which is created in US-041. The functionality is entirely dependent on the existence of the multi-step sequence creation feature.'}

## 6.2.0 Technical Dependencies

- A backend job scheduling service (e.g., Upstash QStash) must be available to queue the emails with the specified delays.
- The database schema for cart recovery sequences must be able to store integer delay values and string/enum delay units for each step.

## 6.3.0 Data Dependencies

- Requires the concept of a 'sequence' and 'sequence steps' to exist in the data model.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- UI interactions for setting timing (typing, selecting) must have zero perceptible lag.
- Saving the sequence configuration via API call should have a p95 response time of less than 500ms.

## 7.2.0 Security

- The API endpoint for saving the sequence must be protected and verify that the authenticated user has the 'Owner' or 'Marketer' role for the associated merchant account.
- Input must be sanitized on the backend to prevent injection attacks.

## 7.3.0 Usability

- The interface for setting time should be intuitive, with clear language explaining the relative delays.
- Error feedback must be immediate, clear, and helpful.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards for all form elements and feedback mechanisms.

## 7.5.0 Compatibility

- Functionality must be consistent across all supported modern browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Frontend work is low complexity (adding form controls).
- Backend complexity is medium, primarily due to the logic required to interact with the job scheduler. The system must correctly calculate and chain scheduled jobs based on these relative delays.
- Requires database schema modification to add `delay_value` and `delay_unit` columns to the sequence steps table.

## 8.3.0 Technical Risks

- Potential for complexity in handling time zones correctly. All scheduling should be done in UTC to avoid ambiguity.
- The logic for updating live campaigns needs careful implementation to ensure carts already in a sequence are not affected, preventing unexpected behavior for customers.

## 8.4.0 Integration Points

- Backend API for saving/updating cart recovery sequences.
- Backend service that interfaces with the job scheduling system (Upstash QStash).
- PostgreSQL database to persist the sequence configuration.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0 Test Scenarios

- Create a new sequence with various hour/day delays and verify it saves correctly.
- Edit an existing sequence and verify changes are saved.
- Test all validation rules: negative numbers, zero, non-numbers, blank fields, and values exceeding the maximum limit.
- End-to-end test: A user configures and saves a sequence. A mocked webhook triggers an abandoned cart. Verify that a job is created in the scheduling queue with the correct execution time based on the first step's delay.

## 9.3.0 Test Data Needs

- User accounts with 'Owner' and 'Marketer' roles.
- An existing, empty cart recovery sequence to edit.

## 9.4.0 Testing Tools

- Jest for unit tests.
- Playwright for end-to-end tests.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for validation and scheduling logic, achieving >80% coverage for new code
- Integration testing completed successfully between the API and the database/scheduler
- E2E tests for happy path and key error conditions are passing
- User interface reviewed and approved for usability and accessibility
- Backend logic for handling live campaign edits is verified
- Documentation for the API endpoint is updated
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

3

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This story is a core requirement for the Cart Recovery feature MVP.
- Must be scheduled in a sprint immediately following the completion of US-041.

## 11.4.0 Release Impact

- Without this feature, the cart recovery module is not functional as users cannot control when emails are sent. It is essential for the initial release of the feature.

