# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-043 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User creates and edits email templates using a ric... |
| As A User Story | As a Marketer, Owner, or Admin, I want to create a... |
| User Persona | Marketer, Store Owner, Admin |
| Business Value | Empowers users to create customized, on-brand, and... |
| Functional Area | Cart Recovery |
| Story Theme | Campaign Customization |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-43-01

### 3.1.2 Scenario

Accessing the new template editor

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am an authenticated user with 'Marketer', 'Owner', or 'Admin' permissions on the template management page

### 3.1.5 When

I click the 'Create New Template' button

### 3.1.6 Then

I am navigated to a dedicated view for creating a new email template.

### 3.1.7 And

A 'Save Template' button is visible and enabled.

### 3.1.8 Validation Notes

Verify the navigation and the presence of all required UI elements in the editor view.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-43-02

### 3.2.2 Scenario

Successfully creating and saving a new template

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the new template editor view

### 3.2.5 When

I enter a unique 'Template Name', an 'Email Subject', add content to the email body, and click 'Save Template'

### 3.2.6 Then

The system saves the new template associated with my merchant account.

### 3.2.7 And

A success notification (e.g., 'Template created successfully') is displayed.

### 3.2.8 Validation Notes

Check the database to confirm the template was saved with the correct content and merchant_id. Verify the redirect and success message.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-43-03

### 3.3.2 Scenario

Editing an existing template

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am on the template management list view and at least one template exists

### 3.3.5 When

I click the 'Edit' action for a specific template

### 3.3.6 Then

I am navigated to the template editor view.

### 3.3.7 And

The 'Template Name', 'Email Subject', and email body fields are pre-populated with the data from the selected template.

### 3.3.8 Validation Notes

Verify that the correct data for the chosen template is loaded into the editor fields.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-43-04

### 3.4.2 Scenario

Saving changes to an existing template

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I have opened an existing template in the editor view

### 3.4.5 When

I modify the content in the subject or body and click 'Save Template'

### 3.4.6 Then

The system updates the existing template record in the database.

### 3.4.7 And

A success notification (e.g., 'Template updated successfully') is displayed.

### 3.4.8 Validation Notes

Check the database to confirm the record was updated. Verify the redirect and success message.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-43-05

### 3.5.2 Scenario

Attempting to save a template with a missing name

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am on the template editor view

### 3.5.5 When

I clear the 'Template Name' field and click 'Save Template'

### 3.5.6 Then

The template is not saved.

### 3.5.7 And

A validation error message is displayed next to the 'Template Name' field, stating 'Template name is required'.

### 3.5.8 Validation Notes

Verify that the API call to save is not made and the UI displays the specified error message.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-43-06

### 3.6.2 Scenario

Attempting to save a new template with a duplicate name

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A template named 'Reminder Email 1' already exists for my merchant account

### 3.6.5 When

I am creating a new template and I enter 'Reminder Email 1' as the 'Template Name' and click 'Save Template'

### 3.6.6 Then

The template is not saved.

### 3.6.7 And

A validation error message is displayed, stating 'A template with this name already exists. Please choose a unique name.'

### 3.6.8 Validation Notes

Verify the backend rejects the request with a proper error code/message and the frontend displays it to the user.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-43-07

### 3.7.2 Scenario

Canceling the creation or editing of a template

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

I am on the template editor view and have made unsaved changes

### 3.7.5 When

I click the 'Cancel' button

### 3.7.6 Then

A confirmation modal appears with the message 'You have unsaved changes. Are you sure you want to discard them?'.

### 3.7.7 And

If I confirm, I am redirected to the template management list view and no changes are saved.

### 3.7.8 Validation Notes

Verify the confirmation modal appears and that confirming the action discards changes and navigates away.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Input field for 'Template Name'
- Input field for 'Email Subject'
- Rich Text Editor component (e.g., TipTap, Quill.js)
- Editor toolbar with buttons for: Bold, Italic, Underline, Unordered List, Ordered List, Hyperlink
- 'Save Template' button
- 'Cancel' button

## 4.2.0 User Interactions

- User can type and format text within the rich text editor.
- The 'Save Template' button should enter a disabled/loading state upon click to prevent multiple submissions.
- Validation errors should appear inline, next to the relevant fields.

## 4.3.0 Display Requirements

- The editor must render a live preview of the formatted text.
- The editor must clearly show which formatting options are currently active at the cursor's position.

## 4.4.0 Accessibility Needs

- All input fields must have associated labels.
- All toolbar buttons in the rich text editor must have accessible names (e.g., via `aria-label`).
- The editor must be fully navigable and operable using a keyboard.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-CR-TPL-01

### 5.1.2 Rule Description

Template names must be unique per merchant account.

### 5.1.3 Enforcement Point

Backend API upon create/update request.

### 5.1.4 Violation Handling

API returns a 409 Conflict error; frontend displays a user-friendly message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-CR-TPL-02

### 5.2.2 Rule Description

Template Name and Email Subject fields are mandatory.

### 5.2.3 Enforcement Point

Both frontend (for immediate feedback) and backend (for data integrity).

### 5.2.4 Violation Handling

API returns a 400 Bad Request error; frontend displays inline validation messages.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-SEC-01

### 5.3.2 Rule Description

All user-generated HTML content from the rich text editor must be sanitized to prevent XSS attacks.

### 5.3.3 Enforcement Point

Backend API before saving content to the database.

### 5.3.4 Violation Handling

Malicious tags and attributes are stripped from the HTML content before storage.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

This story provides the core feature (cart recovery sequences) that requires email templates to function.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-045

#### 6.1.2.2 Dependency Reason

This story defines the management interface (list view) from which users will initiate the 'create' and 'edit' actions for templates. They are tightly coupled and should be developed together.

## 6.2.0.0 Technical Dependencies

- A chosen third-party rich text editor library (e.g., TipTap, Quill.js).
- Backend API endpoints for CRUD operations on email templates.
- Database table schema for `email_templates`.
- Authentication and Authorization middleware to enforce role-based access.

## 6.3.0.0 Data Dependencies

- Requires `merchant_id` from the user's session to scope all database operations.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The template editor page, including the rich text editor component, must load in under 2 seconds.
- The save operation (API response time) must be under 500ms (p95).

## 7.2.0.0 Security

- All content submitted via the rich text editor must be sanitized on the backend to prevent stored XSS vulnerabilities.
- API endpoints for template management must be protected and only accessible to users with 'Owner', 'Admin', or 'Marketer' roles.

## 7.3.0.0 Usability

- The editor should provide an intuitive, WYSIWYG experience similar to standard word processors.
- Clear feedback (e.g., loading indicators, success/error notifications) must be provided for all state-changing actions.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The rich text editor must function correctly on the latest versions of Chrome, Firefox, Safari, and Edge.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Selection, integration, and potential customization of a third-party rich text editor library.
- Implementing robust, server-side HTML sanitization to prevent security vulnerabilities.
- Ensuring a seamless and accessible user experience for the editor itself.

## 8.3.0.0 Technical Risks

- The chosen editor library may have bugs, accessibility issues, or a steep learning curve.
- Improperly configured sanitization could either break legitimate content or allow security holes.

## 8.4.0.0 Integration Points

- Integrates with the template management list view (US-045).
- The editor must be designed to accommodate the insertion of dynamic variables from US-044.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Full CRUD lifecycle of a template: create, view in list, edit, save, delete (from US-045).
- Test all validation rules: required fields, unique name.
- Test role-based access: ensure an 'Analyst' cannot access the editor.
- Security testing: attempt to inject `<script>` tags and other malicious HTML into the editor and verify it is sanitized upon saving and rendering.
- Keyboard navigation and screen reader testing for the editor and its controls.

## 9.3.0.0 Test Data Needs

- User accounts with 'Owner', 'Marketer', and 'Analyst' roles.
- A merchant account with at least one pre-existing template to test edit and unique name validation.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Playwright for E2E tests.
- Axe for automated accessibility checks.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% code coverage for new logic
- E2E tests for the create and edit happy paths are implemented and passing
- Security review of the HTML sanitization logic is completed and signed off
- User interface reviewed and approved by a UX designer
- Accessibility audit (automated and manual) passed
- Documentation for the new API endpoints is created/updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is tightly coupled with US-045 (Template Management) and should be planned for the same sprint.
- The choice of a rich text editor library should be made during sprint planning or in a preceding spike to de-risk the implementation.

## 11.4.0.0 Release Impact

This is a core component of the Cart Recovery feature. The feature cannot be released without it.

