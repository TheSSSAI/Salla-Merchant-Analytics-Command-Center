# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-054 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Owner submits and tracks a Data Subject Access Req... |
| As A User Story | As a Store Owner, I want to submit and track Data ... |
| User Persona | Store Owner / Admin |
| Business Value | Enables merchants to comply with critical data pri... |
| Functional Area | Compliance & Settings |
| Story Theme | Data Privacy Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Owner successfully submits a new 'Access' request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am logged in as a Store Owner and am on the DSAR management page

### 3.1.5 When

I select the 'Access' request type, enter a valid customer email address that exists in my store's data, and submit the form

### 3.1.6 Then

The system creates a new DSAR record with a 'Pending' status and a unique Request ID

### 3.1.7 Validation Notes

Verify a new record appears in the 'dsar_requests' table with the correct merchant_id, customer_identifier, type='ACCESS', and status='PENDING'. Verify a job is queued in Upstash QStash.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Owner successfully submits a new 'Erasure' request

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am logged in as a Store Owner and am on the DSAR management page

### 3.2.5 When

I select the 'Erasure' request type, enter a valid customer email, confirm the irreversible action in a modal, and submit the form

### 3.2.6 Then

The system creates a new DSAR record with a 'Pending' status

### 3.2.7 Validation Notes

Verify a new record appears in the 'dsar_requests' table with type='ERASURE' and status='PENDING'. Verify a job is queued.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Owner views the history of submitted DSARs

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am a Store Owner and have previously submitted one or more DSARs

### 3.3.5 When

I navigate to the DSAR management page

### 3.3.6 Then

I see a table listing all submitted requests for my store, including Request ID, Customer Email, Request Type, Submission Date, and Status

### 3.3.7 Validation Notes

The UI should fetch and display all DSARs associated with the current merchant's ID. The API endpoint must be scoped by merchant_id.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Submission fails for a non-existent customer

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am logged in as a Store Owner on the DSAR page

### 3.4.5 When

I enter an email address that does not correspond to any customer in my store's data and submit the form

### 3.4.6 Then

The UI displays a clear, non-technical error message, such as 'Customer with this email not found.'

### 3.4.7 Validation Notes

Verify the backend checks for the customer's existence before creating the DSAR record and returns a 404 or 422 status code. No record should be created in the database.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Submission fails due to missing information

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am logged in as a Store Owner on the DSAR page

### 3.5.5 When

I attempt to submit the form without entering an email or selecting a request type

### 3.5.6 Then

The UI displays inline validation errors on the required fields and the form is not submitted

### 3.5.7 Validation Notes

Verify frontend validation prevents form submission. Verify backend API also validates the payload and returns a 400 Bad Request error.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

An 'Access' request is completed successfully

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

An 'Access' DSAR has a 'Pending' status and a background job is processing it

### 3.6.5 When

The job successfully gathers all the customer's PII and generates a data file

### 3.6.6 Then

The DSAR's status in the history list updates to 'Completed'

### 3.6.7 Validation Notes

Verify the background worker updates the database record status. A secure, time-limited download link should be generated and stored, and made available in the UI.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

An 'Erasure' request is completed successfully

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

An 'Erasure' DSAR has a 'Pending' status and a background job is processing it

### 3.7.5 When

The job successfully anonymizes all of the customer's PII across all relevant tables

### 3.7.6 Then

The DSAR's status in the history list updates to 'Completed'

### 3.7.7 Validation Notes

QA must manually inspect the database to confirm that all PII fields (e.g., name, email, phone, address) for the customer have been replaced with anonymized values (e.g., '[REDACTED]') while preserving non-PII data for analytics.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated page under 'Settings' titled 'Data Privacy Requests'
- A form with an input for 'Customer Email' and a radio button group for 'Request Type' ('Access', 'Erasure')
- A primary 'Submit Request' button
- A confirmation modal dialog for 'Erasure' requests, warning of the irreversible nature of the action
- A data table to display DSAR history with columns: Request ID, Customer Email, Request Type, Submitted Date, Status, and Actions (e.g., Download)
- Status badges (e.g., 'Pending', 'In Progress', 'Completed', 'Failed') with distinct colors

## 4.2.0 User Interactions

- Submitting the form triggers the creation of a new request.
- Clicking 'Submit' for an Erasure request opens a confirmation modal with 'Confirm Erasure' and 'Cancel' buttons.
- The history table should be sortable by date.
- A 'Download' button/link appears next to completed 'Access' requests.

## 4.3.0 Display Requirements

- The page must clearly state its purpose: to fulfill legal data privacy obligations.
- Error messages must be user-friendly and displayed close to the point of error.

## 4.4.0 Accessibility Needs

- All form elements must have associated labels.
- The confirmation modal must trap focus.
- All interactive elements must be keyboard-navigable and have clear focus states, adhering to WCAG 2.1 AA.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-DSAR-001

### 5.1.2 Rule Description

A DSAR can only be submitted for a customer who exists within the merchant's data.

### 5.1.3 Enforcement Point

Backend API, before creating the DSAR record.

### 5.1.4 Violation Handling

The API returns an error (e.g., 404 Not Found), and the UI displays a user-friendly message.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-DSAR-002

### 5.2.2 Rule Description

The data export file from an 'Access' request must be available for download for a limited time (e.g., 7 days).

### 5.2.3 Enforcement Point

Secure URL generation service.

### 5.2.4 Violation Handling

An expired link should lead to a page indicating the link is no longer valid.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-DSAR-003

### 5.3.2 Rule Description

Data erasure must be an anonymization process, not a hard delete, to preserve the integrity of historical analytics.

### 5.3.3 Enforcement Point

The 'Erasure' background job.

### 5.3.4 Violation Handling

The job should fail and the DSAR status set to 'Failed' if anonymization cannot be completed safely. An alert should be sent to the operations team.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-004

#### 6.1.1.2 Dependency Reason

Requires an authenticated user session to identify the Store Owner.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-009

#### 6.1.2.2 Dependency Reason

Requires customer data to be synced from Salla before any DSAR can be processed.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-019

#### 6.1.3.2 Dependency Reason

Requires the RBAC system to be in place to restrict this feature to the 'Owner' role.

## 6.2.0.0 Technical Dependencies

- Backend API endpoints for creating and listing DSARs.
- A background job processing system (Upstash QStash).
- Secure object storage for data exports (Cloudflare R2).
- A defined data anonymization strategy and script.
- Audit logging mechanism to record all DSAR actions.

## 6.3.0.0 Data Dependencies

- Access to the synchronized customer and order data in the OLTP (PostgreSQL) database.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Submitting a DSAR form should have a p95 response time of < 500ms.
- The background jobs for access/erasure are long-running and should not impact system performance. They must be processed asynchronously.

## 7.2.0.0 Security

- All actions must be authorized and restricted to the 'Owner' role.
- The data export file must contain only the PII of the specified data subject.
- The download link for data exports must be a secure, time-limited, single-use pre-signed URL.
- All DSAR-related activities (submission, completion, download) must be logged in an immutable audit trail.

## 7.3.0.0 Usability

- The process should be straightforward and require minimal technical knowledge from the Store Owner.

## 7.4.0.0 Accessibility

- The feature must comply with WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported modern web browsers.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

High

## 8.2.0.0 Complexity Factors

- The data erasure logic is the most complex part. It requires a carefully designed anonymization script that updates multiple tables without corrupting analytical data or breaking foreign key constraints.
- The data access job requires querying across multiple tables to aggregate all PII for a single customer.
- Implementing secure, expiring download links requires integration with the object storage provider's API (Cloudflare R2).
- Requires robust error handling and retry logic for the background jobs.

## 8.3.0.0 Technical Risks

- Risk of incomplete data anonymization during erasure, leaving some PII behind.
- Risk of data corruption if the anonymization script is flawed.
- Risk of exposing data if the download link mechanism is not secure.

## 8.4.0.0 Integration Points

- PostgreSQL (OLTP): Reading customer data and updating DSAR status.
- Upstash QStash: Queuing background jobs for processing.
- Cloudflare R2: Storing the exported data file and generating pre-signed URLs.
- Axiom (Logging): Sending detailed audit logs for all DSAR activities.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify an Owner can submit both 'Access' and 'Erasure' requests.
- Verify a non-Owner role cannot access the DSAR page.
- Verify the contents of the downloaded 'Access' data file are correct and complete.
- Manually verify via database inspection that all PII has been anonymized after a successful 'Erasure' request.
- Test the security of the download link, including expiration and single-use constraints.
- Test error handling for jobs that fail mid-process.

## 9.3.0.0 Test Data Needs

- A test merchant account with the 'Owner' role.
- A set of test customers with associated orders and PII.
- A test customer email that does not exist in the system to test error handling.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Playwright for E2E tests.
- Database client for manual data verification.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least two peers
- Unit and integration tests implemented with >80% coverage for new code
- E2E tests for the submission and history view are passing
- The data anonymization script has been peer-reviewed and tested against a staging database
- Security review of the download link generation and access control has been completed
- UI/UX has been reviewed and approved by the Product Owner
- All actions are logged to the audit trail
- Documentation for the feature is created in the user knowledge base
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

13

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is large and may be a candidate for splitting into: 1) UI and submission logic, 2) 'Access' job, 3) 'Erasure' job.
- The 'Erasure' logic requires significant backend and data engineering effort. Allocate sufficient time for design, implementation, and rigorous testing to prevent data corruption.

## 11.4.0.0 Release Impact

- This is a critical feature for any merchant operating in regions with strong data privacy laws. It is a key component for a public launch.

