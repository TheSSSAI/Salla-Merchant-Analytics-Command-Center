# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-041 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User creates an automated multi-step cart recovery... |
| As A User Story | As a Marketer or Store Owner, I want to create and... |
| User Persona | Marketer, Store Owner, Admin |
| Business Value | Increases revenue by automating the recovery of ab... |
| Functional Area | Cart Recovery |
| Story Theme | Automated Marketing Campaigns |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully create and activate a new multi-step sequence

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user with 'Marketer' or 'Owner' permissions, and I am on the 'Cart Recovery' page, and at least two email templates exist

### 3.1.5 When

I click the 'Create New Sequence' button, enter a name for the sequence, add a first step with a 1-hour delay and select an email template, add a second step with a 24-hour delay and select another template, and then click 'Save and Activate'

### 3.1.6 Then

The system saves the new sequence, displays it in the list of sequences with an 'Active' status, and a success notification is shown.

### 3.1.7 Validation Notes

Verify the sequence and its steps are correctly stored in the database. The sequence should be marked as active.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

System prevents saving a sequence with no steps

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am on the 'Create New Sequence' page

### 3.2.5 When

I enter a name for the sequence but do not add any steps, and I click 'Save'

### 3.2.6 Then

The system prevents saving and displays a clear validation error message, such as 'A sequence must have at least one step.'

### 3.2.7 Validation Notes

Check that no new sequence record is created in the database.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

System prevents saving a step with missing information

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am creating a sequence and have added one step

### 3.3.5 When

I set a delay for the step but do not select an email template, and I click 'Save'

### 3.3.6 Then

The system prevents saving, highlights the missing template selection field, and displays an inline error message like 'Please select an email template for this step.'

### 3.3.7 Validation Notes

The form submission should fail client-side and/or server-side validation.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User deactivates an active sequence

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

There is an active cart recovery sequence

### 3.4.5 When

I find the sequence in the list and click the 'Deactivate' toggle or button

### 3.4.6 Then

The system updates the sequence's status to 'Inactive' in the UI and backend.

### 3.4.7 Validation Notes

Verify that this sequence will no longer be triggered for newly abandoned carts. Also, confirm that any in-progress executions of this sequence for existing abandoned carts are immediately cancelled.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Sequence correctly stops for a customer who completes their purchase

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A customer has an abandoned cart and an active recovery sequence has been triggered for them, with one or more emails still scheduled to be sent

### 3.5.5 When

The customer completes their purchase using the link in a recovery email or by navigating to the store directly

### 3.5.6 Then

The system identifies the purchase completion and cancels all subsequent scheduled emails for that specific recovery sequence.

### 3.5.7 Validation Notes

This requires integration with the order creation webhook/API. Verify in the scheduling system (e.g., QStash) or application database that the scheduled jobs for this user's abandoned cart are removed or marked as cancelled.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Create New Sequence' button.
- A form to name the sequence.
- A dynamic section for 'Steps' within the form.
- An 'Add Step' button.
- For each step: input fields for delay (number) and a dropdown for time unit (Minutes, Hours, Days), a dropdown to select an existing email template, and a 'Remove Step' button.
- A master 'Save' or 'Save and Activate' button for the sequence.
- A toggle or button to activate/deactivate the sequence.

## 4.2.0 User Interactions

- User can dynamically add and remove steps from the sequence editor.
- The list of email templates in the dropdown should be searchable if it becomes long.
- Saving the form provides clear feedback (success message or validation errors).

## 4.3.0 Display Requirements

- The sequence editor must clearly display the order of steps.
- Each step must show its configured delay and the name of the selected email template.

## 4.4.0 Accessibility Needs

- All form fields must have associated labels.
- All interactive elements (buttons, inputs) must be keyboard accessible and have clear focus states, adhering to WCAG 2.1 AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-502.1

### 5.1.2 Rule Description

A sequence must contain at least one step to be saved.

### 5.1.3 Enforcement Point

Client-side and server-side validation upon attempting to save a sequence.

### 5.1.4 Violation Handling

Display a user-friendly error message and prevent the save operation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-502.2

### 5.2.2 Rule Description

Each step in a sequence must have a defined delay (greater than zero) and an associated email template.

### 5.2.3 Enforcement Point

Client-side and server-side validation upon saving.

### 5.2.4 Violation Handling

Display an inline error message next to the incomplete step and prevent saving.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-502.3

### 5.3.2 Rule Description

Once a customer completes their purchase, any active recovery sequence for that specific cart must be immediately terminated.

### 5.3.3 Enforcement Point

Backend logic triggered by a 'purchase completed' event (e.g., Salla webhook for order creation).

### 5.3.4 Violation Handling

The system must find and cancel any scheduled jobs associated with that cart's recovery.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-040

#### 6.1.1.2 Dependency Reason

The system must first be able to identify and track abandoned carts before a recovery sequence can be triggered.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-043

#### 6.1.2.2 Dependency Reason

Users must be able to create email templates to select them for use in a sequence step.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-045

#### 6.1.3.2 Dependency Reason

The system needs a way to store and manage multiple templates so they can be listed and selected in the sequence editor.

## 6.2.0.0 Technical Dependencies

- A robust background job scheduling system (e.g., Upstash QStash) is required to handle the timed delays for sending emails.
- Integration with the email sending service (e.g., Postmark) to dispatch the emails.
- Database schema to store sequence definitions, steps, and the execution state for each abandoned cart.

## 6.3.0.0 Data Dependencies

- Access to the list of abandoned carts and associated customer data.
- Access to the repository of saved email templates.

## 6.4.0.0 External Dependencies

- Salla Webhook for 'order.created' or a similar event to trigger the cancellation of an in-progress sequence.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The UI for creating/editing a sequence must load and respond to interactions within 200ms.
- The backend process for triggering and scheduling emails must not introduce significant latency to the event processing pipeline (e.g., webhook ingestion).

## 7.2.0.0 Security

- Only users with authorized roles (Owner, Admin, Marketer) can access the functionality to create, edit, or delete sequences.
- All data related to sequences must be scoped by `merchant_id` to ensure tenant isolation.

## 7.3.0.0 Usability

- The process of building a sequence should be intuitive, requiring minimal instruction for a non-technical user.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The sequence editor UI must be fully functional on all supported modern web browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- The backend logic for managing the state of each customer's journey through a sequence can be complex (state machine).
- Reliable integration with a background job scheduler is critical and requires careful handling of job creation, execution, and cancellation.
- The database schema must be designed to efficiently query for active sequences and their current states.
- The frontend requires managing a dynamic form state for adding/removing steps.

## 8.3.0.0 Technical Risks

- Failure to correctly cancel scheduled jobs when a customer purchases could lead to sending irrelevant emails, harming customer experience.
- If the job scheduler experiences downtime, email sending could be delayed or missed. A robust retry and monitoring mechanism is needed.

## 8.4.0.0 Integration Points

- Database (PostgreSQL) for storing sequence definitions.
- Job Scheduler (Upstash QStash) for queuing delayed email tasks.
- Email Service (Postmark) for sending the emails.
- Salla Webhook ingestion service for purchase completion events.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Create, update, and delete a sequence.
- Verify an abandoned cart event correctly triggers the first step of an active sequence after the specified delay.
- Verify a purchase event correctly cancels all subsequent scheduled steps for that cart.
- Test validation rules for incomplete or invalid sequence configurations.

## 9.3.0.0 Test Data Needs

- Mock user accounts with appropriate roles (Marketer, Owner).
- At least 3 pre-defined email templates.
- Simulated abandoned cart events.
- Simulated order creation events.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented for the new logic, achieving at least 80% code coverage
- E2E tests covering the creation and triggering of a sequence are passing
- User interface has been reviewed and approved by the design/UX team
- Backend scheduling and cancellation logic is verified through integration tests
- Security requirements (role-based access) are validated
- Feature documentation is added to the user-facing knowledge base
- Story deployed and verified in the staging environment by the QA team

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story has hard dependencies on US-043 and US-045, which must be completed first.
- Requires a clear implementation plan for the background job scheduling and state management before development begins.

## 11.4.0.0 Release Impact

- This is a cornerstone feature for the Cart Recovery module. Its completion is critical for the module's MVP launch.

