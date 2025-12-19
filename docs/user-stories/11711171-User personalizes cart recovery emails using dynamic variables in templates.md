# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-044 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User personalizes cart recovery emails using dynam... |
| As A User Story | As a Marketer or Store Owner, I want to insert dyn... |
| User Persona | Marketer, Store Owner / Admin |
| Business Value | Increases the effectiveness of cart recovery campa... |
| Functional Area | Cart Recovery |
| Story Theme | Email Campaign Personalization |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Variable Insertion UI in Template Editor

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user with the 'Marketer' or 'Owner' role is editing an email template in the rich text editor

### 3.1.5 When

the user looks for a way to add dynamic variables

### 3.1.6 Then

the UI must present a clear, accessible list or menu of available variables (e.g., '{{customer_name}}', '{{cart_items}}', '{{checkout_link}}').

### 3.1.7 Validation Notes

Verify that a button, dropdown, or sidebar is present in the editor UI that lists all supported variables.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successful Replacement of Simple Variables

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

an email template contains the text 'Hi {{customer_name}}, here is a link to your cart: {{checkout_link}}'

### 3.2.5 When

the system generates an email for an abandoned cart associated with customer 'Jane Doe'

### 3.2.6 Then

the rendered email body must contain the text 'Hi Jane Doe, here is a link to your cart: [unique_checkout_url]' where '[unique_checkout_url]' is a valid, clickable URL.

### 3.2.7 Validation Notes

Trigger a test email and inspect the raw source and rendered content to confirm the variables were replaced correctly.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Successful Rendering of Complex 'cart_items' Variable

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

an email template contains the '{{cart_items}}' variable

### 3.3.5 And

an abandoned cart contains 'Product A' (1x, $10) and 'Product B' (2x, $25)

### 3.3.6 When

the system generates the email for this cart

### 3.3.7 Then

the '{{cart_items}}' variable must be replaced with a formatted HTML list or table displaying each product's name, quantity, and price.

### 3.3.8 Validation Notes

Trigger a test email for a multi-item cart and verify the output is a well-formatted, human-readable list of products.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Graceful Handling of Missing Customer Name (Guest User)

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

an email template contains the text 'Hi {{customer_name}},'

### 3.4.5 And

an abandoned cart is associated with an email address but no customer name is available

### 3.4.6 When

the system generates the email

### 3.4.7 Then

the rendered text must use a fallback, such as 'Hi there,' or 'Hi,', and must not display 'Hi null,' or 'Hi ,'.

### 3.4.8 Validation Notes

Test with an abandoned cart record that has a null value for the customer's first name.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Previewing Template with Sample Data

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

a user is editing an email template containing dynamic variables

### 3.5.5 When

the user clicks a 'Preview' button

### 3.5.6 Then

the system must display a modal or a separate view of the email with all variables populated with realistic sample data.

### 3.5.7 Validation Notes

Verify the preview functionality exists and correctly renders a sample email showing how all variables will appear.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User-typed non-existent variable is treated as plain text

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a user manually types '{{invalid_variable}}' into the email template

### 3.6.5 When

the system generates an email using this template

### 3.6.6 Then

the output email must contain the literal string '{{invalid_variable}}' and not throw an error or display an empty string.

### 3.6.7 Validation Notes

Create a template with a fake variable and confirm it is rendered as plain text in the final email.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A button or dropdown menu within the rich text editor toolbar labeled 'Insert Variable' or similar.
- A list of available, clickable variables.
- A 'Preview' button near the template editor.
- Visual distinction for variables within the editor (e.g., rendered as colored 'pills' or with a different background) to separate them from static text.

## 4.2.0 User Interactions

- User clicks the 'Insert Variable' menu to see available options.
- User clicks a variable from the list to insert it at the current cursor position in the editor.
- User clicks the 'Preview' button to see a rendered example of the email.

## 4.3.0 Display Requirements

- The list of variables must include a brief description of what data each variable represents (e.g., '{{customer_name}} - The customer's full name').

## 4.4.0 Accessibility Needs

- The variable insertion menu must be fully keyboard-navigable and compatible with screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-VAR-001

### 5.1.2 Rule Description

A predefined, fixed list of dynamic variables shall be supported. Users cannot create custom variables.

### 5.1.3 Enforcement Point

UI (only showing available variables) and Backend (only processing known variables).

### 5.1.4 Violation Handling

Any text matching the '{{...}}' format that is not a known variable will be treated as literal text.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-VAR-002

### 5.2.2 Rule Description

Fallback values must be used for optional data fields (like customer name) to ensure professional communication.

### 5.2.3 Enforcement Point

Backend email rendering service.

### 5.2.4 Violation Handling

N/A - System rule.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-043

#### 6.1.1.2 Dependency Reason

The rich text editor and template management system must exist before the functionality to add variables to it can be built.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-041

#### 6.1.2.2 Dependency Reason

The cart recovery sequence creation flow must be in place to provide a context for using the email templates.

## 6.2.0.0 Technical Dependencies

- A backend templating engine (e.g., Handlebars, Liquid.js) capable of variable substitution and basic logic for loops (for cart items) and conditionals (for fallbacks).
- Backend service to generate a unique, secure, and persistent checkout URL for each abandoned cart.

## 6.3.0.0 Data Dependencies

- Access to normalized abandoned cart data, including customer information (name, email) and a structured list of cart line items (product name, image, quantity, price).

## 6.4.0.0 External Dependencies

- The final rendered HTML must be compatible with the API of the email sending service (Postmark).

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The variable substitution process should add less than 50ms of latency to the email generation task.

## 7.2.0.0 Security

- The unique '{{checkout_link}}' must be generated with a secure, unguessable token to prevent unauthorized access to other users' carts.
- All PII (e.g., customer name) used in variable substitution must be handled securely in memory and not logged unnecessarily.

## 7.3.0.0 Usability

- The process of finding and inserting variables should be intuitive for non-technical users.

## 7.4.0.0 Accessibility

- UI components for variable insertion must adhere to WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The rendered HTML for the '{{cart_items}}' variable must be compatible with major email clients (Gmail, Outlook, Apple Mail).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Frontend: Integration with the chosen rich text editor library can be complex.
- Backend: The logic for rendering the '{{cart_items}}' variable requires looping and HTML formatting, which is more complex than simple string replacement.
- Backend: Ensuring robust and graceful fallbacks for all variables where data might be missing.

## 8.3.0.0 Technical Risks

- The chosen rich text editor may have limitations on custom UI integrations.
- Ensuring the generated HTML for emails renders consistently across all major email clients is a common challenge.

## 8.4.0.0 Integration Points

- Frontend: Rich Text Editor component.
- Backend: Database service to fetch cart/customer data.
- Backend: Email rendering/templating service.
- Backend: Email sending service (Postmark).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Create a template with all available variables and verify correct rendering.
- Test rendering for a guest user with no name.
- Test rendering for a cart with a single item.
- Test rendering for a cart with multiple items.
- Test the preview functionality with mock data.
- Verify that a user-defined string that looks like a variable (e.g., '{{my_text}}') is not replaced.

## 9.3.0.0 Test Data Needs

- Test accounts for logged-in users with full profile data.
- Abandoned cart records for guest users (email only).
- Abandoned cart records with varying numbers of items.

## 9.4.0.0 Testing Tools

- Jest for backend unit tests.
- Playwright for E2E tests of the template editor UI.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for the templating service, covering all variables and fallback logic, with >80% coverage
- Integration testing completed to ensure data is fetched and passed to the templating engine correctly
- E2E tests verify a user can add variables to a template and a resulting email is rendered correctly
- User interface for variable insertion reviewed and approved by UX/Product Owner
- Security review of the checkout link generation process completed
- User documentation in the knowledge base updated with a list of all available variables and how to use them
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a core part of the cart recovery feature's value proposition. It should be prioritized after the basic template editor is complete.
- Requires both frontend and backend development effort that can be parallelized.

## 11.4.0.0 Release Impact

- Enables a key marketing feature. The cart recovery module should not be released to users without this personalization capability.

