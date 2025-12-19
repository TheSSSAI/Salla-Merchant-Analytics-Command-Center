# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-037 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | AI Assistant provides helpful feedback for unanswe... |
| As A User Story | As a merchant using the AI Assistant, I want to re... |
| User Persona | Any merchant role with access to analytics (Owner,... |
| Business Value | Improves user experience and adoption of the AI fe... |
| Functional Area | AI Assistant |
| Story Theme | AI-Powered Analytics and Insights |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User submits a nonsensical or unintelligible query

### 3.1.3 Scenario Type

Error_Condition

### 3.1.4 Given

The merchant is interacting with the AI Assistant interface

### 3.1.5 When

The merchant submits a query that is syntactically nonsensical (e.g., 'asdfghjkl')

### 3.1.6 Then

The system displays a pre-defined, user-friendly message in the response area.

### 3.1.7 Validation Notes

Verify that the response is not a technical error and that it appears within the chat UI. The message content should match the approved copy.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User submits a query that is out of the system's scope

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

The merchant is interacting with the AI Assistant interface

### 3.2.5 When

The merchant submits a query that is semantically valid but unrelated to their Salla store data (e.g., 'What is the capital of Australia?')

### 3.2.6 Then

The system displays a message stating it cannot answer questions outside the scope of the store's data.

### 3.2.7 Validation Notes

The RAG system should fail to find relevant context, triggering this response. The message should clarify the AI's purpose is to analyze store data.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Helpful message includes guidance and examples

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The system has determined a user's query cannot be answered

### 3.3.5 When

The helpful message is displayed

### 3.3.6 Then

The message explicitly states the query could not be understood or answered.

### 3.3.7 And

The message includes at least two examples of well-formed, valid queries (e.g., 'What were my total sales last week?', 'Show me my top 5 selling products').

### 3.3.8 Validation Notes

Check the content of the message to ensure it contains both an acknowledgement of the issue and actionable examples.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Example queries in the helpful message are interactive

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

The helpful message with example queries is displayed

### 3.4.5 When

The merchant clicks on one of the example queries

### 3.4.6 Then

The system populates the input field with the clicked query text and executes it automatically.

### 3.4.7 Validation Notes

E2E test: Click an example query and verify that a valid response for that query is returned, replacing the helpful message.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User submits an empty query

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

The merchant is interacting with the AI Assistant and the input field is empty

### 3.5.5 When

The merchant presses the 'Enter' key or clicks the submit button

### 3.5.6 Then

The system does not submit a query and does not display the 'cannot understand' message.

### 3.5.7 And

The UI provides subtle feedback that input is required (e.g., a disabled button or a brief shake animation).

### 3.5.8 Validation Notes

Verify that no network request is made and the UI remains in the same state, apart from the input validation feedback.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Failed query is logged for analysis

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

The merchant has submitted a query that the system cannot understand

### 3.6.5 When

The system prepares the helpful message response

### 3.6.6 Then

The original user query and the system's 'cannot understand' response type are logged for auditing and model improvement purposes, as per FR-401.

### 3.6.7 Validation Notes

Check the logging system (Axiom) to confirm that the failed query event is captured with appropriate metadata (merchant_id, timestamp, query text).

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Response bubble/card for the helpful message
- Clickable buttons or links for example queries

## 4.2.0 User Interactions

- User types a query and submits.
- System displays the helpful message in the chat history.
- User can click an example query to auto-run it.

## 4.3.0 Display Requirements

- The helpful message must be clearly distinguishable from a successful data response (e.g., using a different icon or style).
- The message text must be user-friendly and non-technical.

## 4.4.0 Accessibility Needs

- The message must be readable by screen readers (WCAG 2.1 AA).
- Clickable example queries must be implemented as accessible buttons or links with clear labels.

# 5.0.0 Business Rules

- {'rule_id': 'BR-AI-001', 'rule_description': 'The system must provide a helpful response for any user query that cannot be confidently translated into a valid data query or answered from the available context.', 'enforcement_point': 'Backend AI query processing service, after the LLM response is received or context retrieval fails.', 'violation_handling': 'If this rule fails, a generic technical error message would be shown, which is the behavior this story aims to prevent.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-035', 'dependency_reason': 'The basic AI query interface and backend processing logic must exist before its failure modes can be handled.'}

## 6.2.0 Technical Dependencies

- AI Assistant frontend component (chat interface)
- Backend API endpoint for Natural Language Queries (NLQ)
- Integration with the LLM provider (OpenAI API)
- Logging service (Axiom) for capturing failed queries

## 6.3.0 Data Dependencies

- None. This story handles the absence of a data-driven answer.

## 6.4.0 External Dependencies

- The system must be able to interpret the response from the OpenAI API to determine if it was unable to answer the query.

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The response time for displaying the helpful message should be under 500ms, as it does not require complex data processing.

## 7.2.0 Security

- User queries, even failed ones, must be logged securely and handled according to data privacy policies (FR-401).

## 7.3.0 Usability

- The message must be constructive and guide the user, not blame them. The inclusion of clickable examples is key to high usability.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- Functionality must be consistent across all supported modern browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Developing a robust mechanism to detect an 'unanswerable' query. This may involve analyzing the LLM's output for specific refusal phrases or using the RAG pattern's failure to retrieve context as a trigger.
- Managing the content of the helpful messages and examples, which should be easily configurable and localizable rather than hardcoded.
- Implementing the interactive 'click-to-run' example queries on the frontend.

## 8.3.0 Technical Risks

- The external LLM's refusal patterns may change, requiring updates to the detection logic.
- Difficulty in distinguishing between a truly unanswerable query and a poorly phrased but potentially answerable one, which could lead to showing the helpful message too often.

## 8.4.0 Integration Points

- The NLQ API endpoint must be modified to return a specific response type for this scenario.
- The frontend chat component must be updated to render this new response type.
- The logging service must be called when this scenario is triggered.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Submit a list of unintelligible queries and verify the correct response.
- Submit a list of out-of-scope queries and verify the correct response.
- Submit an empty query.
- Click each of the example queries and verify they execute correctly.
- Verify failed queries appear in the logs.

## 9.3.0 Test Data Needs

- A curated list of test queries, including nonsensical, out-of-scope, and ambiguous examples.

## 9.4.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >80% coverage for the new logic
- E2E tests for all scenarios are passing in the CI/CD pipeline
- User interface and message copy reviewed and approved by Product Owner/UX Designer
- Performance requirement (response < 500ms) is verified
- Accessibility requirements (WCAG 2.1 AA) are validated
- Logging of failed queries is confirmed in the staging environment
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

3

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This story should be prioritized immediately after the initial AI query functionality (US-035) is completed.
- The team needs a clear strategy for detecting unanswerable queries before implementation begins.

## 11.4.0 Release Impact

- This is a critical user experience feature for the AI Assistant. The assistant should not be released to users without this graceful error handling.

