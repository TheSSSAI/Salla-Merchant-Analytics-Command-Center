# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-045 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User creates, saves, and manages multiple email te... |
| As A User Story | As a Marketer or Store Owner, I want to create, sa... |
| User Persona | Marketer, Store Owner / Admin |
| Business Value | Improves operational efficiency by eliminating rep... |
| Functional Area | Cart Recovery |
| Story Theme | Campaign Configuration and Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-045-01

### 3.1.2 Scenario

View the list of existing email templates

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in 'Marketer' or 'Owner' and have previously saved at least one email template

### 3.1.5 When

I navigate to the 'Email Templates' section within the 'Cart Recovery' module

### 3.1.6 Then

I should see a list of all my saved templates, with each entry displaying the template name and providing options to 'Edit' and 'Delete'.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-045-02

### 3.2.2 Scenario

Successfully create and save a new email template

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the 'Email Templates' management page

### 3.2.5 When

I click 'Create New Template', provide a unique name, a subject line, content for the body, and click 'Save'

### 3.2.6 Then

The system saves the template, displays a success notification, and the new template appears in the list.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-045-03

### 3.3.2 Scenario

Successfully edit an existing email template

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am viewing the list of email templates

### 3.3.5 When

I click 'Edit' on a template, modify its name, subject, or body content, and click 'Save'

### 3.3.6 Then

The system updates the template, displays a success notification, and the changes are reflected in the template list.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-045-04

### 3.4.2 Scenario

Successfully delete an email template

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I am viewing the list of email templates and the template is not in use by any active campaign

### 3.4.5 When

I click 'Delete' on a template and confirm the action in a confirmation modal

### 3.4.6 Then

The system permanently removes the template, displays a success notification, and the template is removed from the list.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-045-05

### 3.5.2 Scenario

Attempt to save a template with a duplicate name

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am creating or editing an email template

### 3.5.5 When

I enter a name that already exists for another template within my merchant account and click 'Save'

### 3.5.6 Then

The system must prevent the save and display an inline validation error stating that the template name must be unique.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-045-06

### 3.6.2 Scenario

Attempt to save a template with missing required fields

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am creating or editing an email template

### 3.6.5 When

I try to save the template without providing a name or a subject line

### 3.6.6 Then

The system must prevent the save and display inline validation errors next to the empty required fields.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-045-07

### 3.7.2 Scenario

Attempt to delete a template that is currently in use

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

An email template is assigned to one or more steps in an active cart recovery sequence

### 3.7.5 When

I click 'Delete' for that template and confirm the action

### 3.7.6 Then

The system must prevent the deletion and display a clear error message explaining that the template cannot be deleted because it is in use.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A list/table to display saved templates
- A 'Create New Template' button
- 'Edit' and 'Delete' buttons/icons for each template in the list
- A form for creating/editing a template, including fields for 'Template Name' and 'Email Subject'
- A rich text editor component for the email body (as per FR-503)
- A confirmation modal for the delete action
- Success/error notification toasts/snackbars

## 4.2.0 User Interactions

- Clicking 'Create' opens the template editor form.
- Clicking 'Edit' opens the editor form pre-populated with the selected template's data.
- Clicking 'Delete' opens a confirmation modal before proceeding.
- Saving a template provides immediate visual feedback (e.g., a toast notification).

## 4.3.0 Display Requirements

- The template list must clearly display the user-defined name of each template.
- Validation errors must be displayed inline, next to the relevant form fields.

## 4.4.0 Accessibility Needs

- All buttons and interactive elements must have clear labels and be keyboard-navigable.
- Modals must trap focus.
- Form fields must have associated labels for screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-TMP-001

### 5.1.2 Rule Description

Template names must be unique per merchant account.

### 5.1.3 Enforcement Point

Backend API upon create/update request.

### 5.1.4 Violation Handling

API returns a 409 Conflict error with a descriptive message; frontend displays this to the user.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-TMP-002

### 5.2.2 Rule Description

A template cannot be deleted if it is currently associated with an active cart recovery sequence.

### 5.2.3 Enforcement Point

Backend API upon delete request.

### 5.2.4 Violation Handling

API returns a 400 Bad Request error with a descriptive message; frontend displays this to the user.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-043

#### 6.1.1.2 Dependency Reason

This story depends on the rich text editor component and dynamic variable functionality defined in US-043.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

While not a strict prerequisite for implementation, the full value is realized when these templates can be selected and used in the cart recovery sequences built in US-041.

## 6.2.0.0 Technical Dependencies

- Backend API endpoints for CRUD operations on email templates.
- Database schema for storing `email_templates` scoped by `merchant_id`.
- Authentication and RBAC middleware to restrict access to 'Marketer' and 'Owner' roles.

## 6.3.0.0 Data Dependencies

- Requires access to the `cart_recovery_sequences` data to check for usage before allowing deletion.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Loading the list of templates should take less than 500ms for up to 100 templates.
- Save/update operations should have a p95 response time below 200ms.

## 7.2.0.0 Security

- All API endpoints for template management must be protected and enforce RBAC.
- All database queries must be strictly scoped by the authenticated user's `merchant_id` to prevent data leakage between tenants.
- Content saved in the rich text editor should be sanitized on the backend to prevent XSS attacks.

## 7.3.0.0 Usability

- The process of creating, finding, and editing a template should be intuitive.
- Error messages must be clear and actionable.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported modern browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration of the rich text editor component.
- Backend logic to check for template usage in active campaigns before allowing deletion.
- Implementing robust, tenant-aware validation for unique template names.

## 8.3.0.0 Technical Risks

- The rich text editor could introduce content sanitization complexities.
- Potential for race conditions if a user tries to delete a template while another user is assigning it to a campaign (though unlikely, should be considered).

## 8.4.0.0 Integration Points

- Frontend state management to handle the list of templates and the state of the create/edit form.
- Backend API endpoints: POST /templates, GET /templates, PUT /templates/{id}, DELETE /templates/{id}.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Full CRUD lifecycle of a template.
- Attempt to save a template with a name that already exists.
- Attempt to delete a template that is currently assigned to a recovery sequence.
- Verify that a user from Merchant A cannot see or manage templates from Merchant B.

## 9.3.0.0 Test Data Needs

- A test user with the 'Marketer' role.
- A test user with the 'Owner' role.
- Pre-existing templates in the database for the test merchant.
- An active cart recovery sequence that uses at least one of the pre-existing templates.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and integration tests implemented with >80% code coverage for new logic
- E2E tests for the primary happy path and key error conditions are implemented and passing
- User interface reviewed and approved by UX/Product Owner
- Backend API endpoints are documented in the OpenAPI specification
- Security requirements (sanitization, authorization) validated
- Documentation for the feature is created in the user knowledge base
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a foundational component for the Cart Recovery module. It should be prioritized early in the development of the feature.
- Requires both frontend and backend development effort.

## 11.4.0.0 Release Impact

- Enables a key configuration aspect of the Cart Recovery feature. The feature cannot be considered complete without this functionality.

