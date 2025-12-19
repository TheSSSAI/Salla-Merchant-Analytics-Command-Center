# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-060 |
| Elaboration Date | 2025-01-26 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | User accesses contextual help for UI elements |
| As A User Story | As a merchant or team member, I want to click on a... |
| User Persona | Any authenticated user of the system (Owner, Admin... |
| Business Value | Improves user onboarding and feature adoption by p... |
| Functional Area | User Experience & Support |
| Story Theme | User Assistance and Onboarding |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Help icon displays contextual information on click

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing a page with a contextual help icon, such as the main dashboard next to the 'Average Order Value (AOV)' KPI

### 3.1.5 When

I click the help icon

### 3.1.6 Then

A popover appears adjacent to the icon, displaying a title and a concise explanation of the AOV metric, including its calculation formula as defined in the Data Dictionary (REQ-FUN-307).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Help popover provides a link to more detailed documentation

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

A contextual help popover is open

### 3.2.5 When

I click the 'Learn More' link within the popover

### 3.2.6 Then

A new browser tab opens, navigating to the relevant page in the online knowledge base (as per US-059).

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User can easily dismiss the help popover

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A contextual help popover is open

### 3.3.5 When

I click anywhere on the page outside the popover OR I press the 'Escape' key

### 3.3.6 Then

The popover closes and is no longer visible.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Only one help popover is visible at a time

### 3.4.3 Scenario Type

Edge_Case

### 3.4.4 Given

A contextual help popover is already open for one element

### 3.4.5 When

I click the help icon for a different element on the same page

### 3.4.6 Then

The first popover immediately closes and the new popover opens.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Popover positioning avoids viewport clipping

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am viewing a help icon located near the edge of the browser viewport

### 3.5.5 When

I click the help icon

### 3.5.6 Then

The popover's position is automatically adjusted to ensure it is fully visible and not cut off by the edge of the screen.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Help icon is not rendered if its content is unavailable

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

The content for a specific help icon is not defined in the content management system

### 3.6.5 When

The UI component that would normally contain that help icon is rendered

### 3.6.6 Then

The help icon is not displayed, preventing a user from clicking it and seeing an empty popover.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Contextual help is accessible via keyboard and screen readers

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

I am navigating the application using only a keyboard

### 3.7.5 When

I tab to a help icon and press 'Enter' or 'Space'

### 3.7.6 Then

The popover opens, and a screen reader announces its content.

### 3.7.7 Validation Notes

Verify the icon has a descriptive aria-label (e.g., 'Help for Average Order Value') and the popover content is accessible to screen readers upon opening.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A standardized help icon (e.g., question mark in a circle).
- A popover component from the shadcn/ui library to display help content.
- A 'Learn More' link within the popover.

## 4.2.0 User Interactions

- Clicking the icon opens the popover.
- Clicking outside the popover or pressing 'Escape' closes it.
- The icon must have a clear hover state to indicate interactivity.

## 4.3.0 Display Requirements

- Popover content must include a title and descriptive text.
- The popover's visual style must be consistent with the application's light and dark modes (US-057).

## 4.4.0 Accessibility Needs

- Must adhere to WCAG 2.1 Level AA standards (REQ-INT-005).
- Help icons must be focusable via keyboard.
- Icons must have appropriate `aria-label` attributes for screen readers.
- Popover content must be announced by screen readers when it appears.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'Help content for metrics must be consistent with the official Data Dictionary (REQ-FUN-307).', 'enforcement_point': 'Content management for help text.', 'violation_handling': 'Content reviews should be part of the process for adding or updating help text to ensure consistency.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-059

#### 6.1.1.2 Dependency Reason

The 'Learn More' link functionality depends on the existence of the online knowledge base and its URL structure.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-057

#### 6.1.2.2 Dependency Reason

The popover component must support and adapt to the user's selected light or dark mode theme.

## 6.2.0.0 Technical Dependencies

- Requires the `shadcn/ui` component library, specifically a Popover or Tooltip component.
- Requires a mechanism to manage and serve the help content (e.g., a centralized JSON file or a simple API endpoint).

## 6.3.0.0 Data Dependencies

- The content for the help text itself, which must be created and aligned with the Data Dictionary (REQ-FUN-307).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The popover must appear in under 100ms after the user clicks the icon.
- The presence of help icons should not noticeably increase the page's Largest Contentful Paint (LCP) time.

## 7.2.0.0 Security

- All help content must be sourced from a trusted, internal system to prevent injection attacks. No user-generated content should be displayed in these popovers.

## 7.3.0.0 Usability

- The help icon should be visually distinct but not distracting.
- The amount of text in the popover should be concise to avoid overwhelming the user.

## 7.4.0.0 Accessibility

- Must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported modern browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Creating a reusable React component for the help icon and popover is straightforward.
- A simple content management strategy (e.g., a version-controlled JSON file) is needed to avoid hardcoding text throughout the application.
- Ensuring robust positioning logic to handle all screen sizes and element locations requires careful implementation.

## 8.3.0.0 Technical Risks

- Poorly implemented positioning logic could lead to UI bugs where popovers are clipped or misplaced.
- Failing to implement a content management system early will create significant technical debt.

## 8.4.0.0 Integration Points

- This component will be integrated into various other components across the application, such as dashboards, reports, and settings pages.
- Integrates with the Knowledge Base (US-059) via hyperlinks.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- E2E
- Accessibility
- Visual Regression

## 9.2.0.0 Test Scenarios

- Verify that clicking a help icon on the main dashboard displays the correct AOV information.
- Verify that the 'Learn More' link opens the correct knowledge base article in a new tab.
- Test popover dismissal via mouse click and 'Escape' key.
- Test popover positioning when the icon is placed in all four corners of the viewport.
- Verify with a screen reader that the icon's purpose and the popover's content are announced correctly.

## 9.3.0.0 Test Data Needs

- A defined set of help content (ID, title, description, link) for at least three different UI elements to be used for initial implementation and testing.

## 9.4.0.0 Testing Tools

- Jest/RTL for unit tests.
- Playwright for E2E tests.
- A screen reader (NVDA, VoiceOver) for manual accessibility testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests for the help component implemented with >80% coverage
- E2E tests for core interactions are passing
- User interface reviewed and approved for both light and dark modes
- Accessibility requirements validated via automated and manual testing
- A scalable method for managing help content is implemented
- Documentation for using the new help component is added to the internal developer docs
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- The 'Learn More' link functionality can be implemented with a placeholder if US-059 is not complete, but the story cannot be fully 'Done' until the links are functional.
- The initial implementation should target 3-5 high-value locations for contextual help (e.g., main dashboard KPIs) to deliver value quickly.

## 11.4.0.0 Release Impact

Enhances overall application usability and is a key part of the user support strategy. Should be included in an early release to improve the new user experience.

