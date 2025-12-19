# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Architecture Type

Serverless

## 1.3 Technology Stack

- Node.js
- TypeScript
- PostgreSQL
- ClickHouse
- AWS Lambda

## 1.4 Bounded Contexts

- User Management
- Analytics & Reporting
- Cart Recovery
- AI Assistant

# 2.0 Project Specific Events

## 2.1 Event Id

### 2.1.1 Event Id

EVT-CDC-001

### 2.1.2 Event Name

DatabaseChangeCaptured

### 2.1.3 Event Type

integration

### 2.1.4 Category

🔹 Data Synchronization

### 2.1.5 Description

Represents a single data change (INSERT, UPDATE, DELETE) captured from the OLTP PostgreSQL database. Used to replicate data to the OLAP ClickHouse data warehouse as per REQ-DATA-002.

### 2.1.6 Trigger Condition

Any CUD operation on designated tables in the OLTP database.

### 2.1.7 Source Context

OLTP Database (PostgreSQL)

### 2.1.8 Target Contexts

- OLAP Data Warehouse (ClickHouse)

### 2.1.9 Payload

#### 2.1.9.1 Schema

| Property | Value |
|----------|-------|
| Table Name | string |
| Operation | string (insert\|update\|delete) |
| Before | object \| null |
| After | object \| null |

#### 2.1.9.2 Required Fields

- tableName
- operation
- after

#### 2.1.9.3 Optional Fields

- before

### 2.1.10.0 Frequency

high

### 2.1.11.0 Business Criticality

critical

### 2.1.12.0 Data Source

| Property | Value |
|----------|-------|
| Database | PostgreSQL |
| Table | SalesOrder, OrderItem, Customer, Product, etc. |
| Operation | create\|update\|delete |

### 2.1.13.0 Routing

| Property | Value |
|----------|-------|
| Routing Key | cdc.<tableName> |
| Exchange | data-sync-exchange |
| Queue | data-sync-queue |

### 2.1.14.0 Consumers

- {'service': 'Data Ingestion Pipeline', 'handler': 'ELT Lambda Function', 'processingType': 'async'}

### 2.1.15.0 Dependencies

- REQ-DATA-002

### 2.1.16.0 Error Handling

| Property | Value |
|----------|-------|
| Retry Strategy | 3 retries with exponential backoff |
| Dead Letter Queue | data-sync-dlq |
| Timeout Ms | 30000 |

## 2.2.0.0 Event Id

### 2.2.1.0 Event Id

EVT-CMD-001

### 2.2.2.0 Event Name

AsynchronousOperationRequested

### 2.2.3.0 Event Type

command

### 2.2.4.0 Category

🔹 Asynchronous Processing

### 2.2.5.0 Description

Initiates a long-running, data-intensive operation like generating a large analytical report, ensuring the UI remains unblocked as per REQ-PERF-002.

### 2.2.6.0 Trigger Condition

User action requesting a large report or data export.

### 2.2.7.0 Source Context

Application Services Layer

### 2.2.8.0 Target Contexts

- Scheduled Tasks Service / Background Worker

### 2.2.9.0 Payload

#### 2.2.9.1 Schema

| Property | Value |
|----------|-------|
| Operation Type | string (reportGeneration\|dataExport) |
| User Id | string |
| Merchant Account Id | string |
| Parameters | object |

#### 2.2.9.2 Required Fields

- operationType
- userId
- merchantAccountId
- parameters

#### 2.2.9.3 Optional Fields

*No items available*

### 2.2.10.0 Frequency

medium

### 2.2.11.0 Business Criticality

important

### 2.2.12.0 Data Source

| Property | Value |
|----------|-------|
| Database | Application |
| Table | N/A |
| Operation | create |

### 2.2.13.0 Routing

| Property | Value |
|----------|-------|
| Routing Key | async.operation |
| Exchange | background-tasks-exchange |
| Queue | async-operations-queue |

### 2.2.14.0 Consumers

- {'service': 'AnalyticsService', 'handler': 'Report Generation Worker', 'processingType': 'async'}

### 2.2.15.0 Dependencies

- REQ-PERF-002

### 2.2.16.0 Error Handling

| Property | Value |
|----------|-------|
| Retry Strategy | 2 retries with fixed delay |
| Dead Letter Queue | async-operations-dlq |
| Timeout Ms | 300000 |

## 2.3.0.0 Event Id

### 2.3.1.0 Event Id

EVT-DOM-001

### 2.3.2.0 Event Name

SecurityEventOccurred

### 2.3.3.0 Event Type

domain

### 2.3.4.0 Category

🔹 Auditing

### 2.3.5.0 Description

Fired when a security-sensitive event occurs, such as a login attempt or role change. This event triggers the creation of an audit log entry as per REQ-SEC-005.

### 2.3.6.0 Trigger Condition

User login, role change, data export, team member invitation/removal.

### 2.3.7.0 Source Context

Application Services Layer

### 2.3.8.0 Target Contexts

- Infrastructure Layer (AuditLogRepository)

### 2.3.9.0 Payload

#### 2.3.9.1 Schema

| Property | Value |
|----------|-------|
| Event Type | string |
| Acting User Id | string |
| Merchant Account Id | string \| null |
| Target Resource | string \| null |
| Outcome | string (success\|failure) |
| Details | object |

#### 2.3.9.2 Required Fields

- eventType
- actingUserId
- outcome

#### 2.3.9.3 Optional Fields

- merchantAccountId
- targetResource
- details

### 2.3.10.0 Frequency

high

### 2.3.11.0 Business Criticality

important

### 2.3.12.0 Data Source

| Property | Value |
|----------|-------|
| Database | Application |
| Table | N/A |
| Operation | create |

### 2.3.13.0 Routing

| Property | Value |
|----------|-------|
| Routing Key | audit.security |
| Exchange | system-events-exchange |
| Queue | audit-log-queue |

### 2.3.14.0 Consumers

- {'service': 'Infrastructure Layer', 'handler': 'Audit Log Writer Function', 'processingType': 'async'}

### 2.3.15.0 Dependencies

- REQ-SEC-005

### 2.3.16.0 Error Handling

| Property | Value |
|----------|-------|
| Retry Strategy | 3 retries with exponential backoff |
| Dead Letter Queue | audit-log-dlq |
| Timeout Ms | 5000 |

# 3.0.0.0 Event Types And Schema Design

## 3.1.0.0 Essential Event Types

### 3.1.1.0 Event Name

#### 3.1.1.1 Event Name

DatabaseChangeCaptured

#### 3.1.1.2 Category

🔹 integration

#### 3.1.1.3 Description

Core event for the CDC pipeline (REQ-DATA-002).

#### 3.1.1.4 Priority

🔴 high

### 3.1.2.0 Event Name

#### 3.1.2.1 Event Name

AsynchronousOperationRequested

#### 3.1.2.2 Category

🔹 domain

#### 3.1.2.3 Description

Event to trigger background jobs for performance (REQ-PERF-002).

#### 3.1.2.4 Priority

🟡 medium

### 3.1.3.0 Event Name

#### 3.1.3.1 Event Name

SecurityEventOccurred

#### 3.1.3.2 Category

🔹 domain

#### 3.1.3.3 Description

Event for creating decoupled audit trails (REQ-SEC-005).

#### 3.1.3.4 Priority

🔴 high

## 3.2.0.0 Schema Design

| Property | Value |
|----------|-------|
| Format | JSON |
| Reasoning | Native support in the specified serverless technol... |
| Consistency Approach | Use a common event envelope with 'metadata' and 'p... |

## 3.3.0.0 Schema Evolution

| Property | Value |
|----------|-------|
| Backward Compatibility | ✅ |
| Forward Compatibility | ❌ |
| Strategy | Additive changes only. New fields must be optional... |

## 3.4.0.0 Event Structure

### 3.4.1.0 Standard Fields

- eventId
- eventTimestamp
- eventType
- eventVersion
- correlationId
- sourceService

### 3.4.2.0 Metadata Requirements

- All events must include a correlationId for end-to-end tracing.

# 4.0.0.0 Event Routing And Processing

## 4.1.0.0 Routing Mechanisms

- {'type': 'Message Queue (AWS SQS or Upstash QStash)', 'description': 'A direct queue is used for decoupling producers and consumers for specific tasks like data sync and audit logging.', 'useCase': 'CDC Pipeline (REQ-DATA-002), Audit Logging (REQ-SEC-005).'}

## 4.2.0.0 Processing Patterns

- {'pattern': 'parallel', 'applicableScenarios': ['Processing CDC events for the data pipeline to maximize throughput.'], 'implementation': 'Multiple concurrent AWS Lambda invocations consuming from an SQS queue.'}

## 4.3.0.0 Filtering And Subscription

### 4.3.1.0 Filtering Mechanism

Consumer-side filtering

### 4.3.2.0 Subscription Model

Direct Queue Polling

### 4.3.3.0 Routing Keys

- N/A for direct queue model. A single queue per purpose is sufficient for the current scope.

## 4.4.0.0 Handler Isolation

| Property | Value |
|----------|-------|
| Required | ✅ |
| Approach | Serverless Functions (AWS Lambda) |
| Reasoning | Provides natural and strong isolation of compute, ... |

## 4.5.0.0 Delivery Guarantees

| Property | Value |
|----------|-------|
| Level | at-least-once |
| Justification | This is the default for managed queue services lik... |
| Implementation | Consumers must be designed to be idempotent to han... |

# 5.0.0.0 Event Storage And Replay

## 5.1.0.0 Persistence Requirements

| Property | Value |
|----------|-------|
| Required | ✅ |
| Duration | Short-term (Queue's message retention period, e.g.... |
| Reasoning | Persistence is only required to ensure reliable de... |

## 5.2.0.0 Event Sourcing

### 5.2.1.0 Necessary

❌ No

### 5.2.2.0 Justification

The system uses a state-oriented persistence model with a CDC pipeline. Event Sourcing would be an unnecessary architectural complexity and is not required to meet any of the stated requirements.

### 5.2.3.0 Scope

*No items available*

## 5.3.0.0 Technology Options

- {'technology': 'AWS SQS', 'suitability': 'high', 'reasoning': 'Fully managed, highly scalable, and integrates seamlessly with AWS Lambda, aligning perfectly with the serverless architecture.'}

## 5.4.0.0 Replay Capabilities

### 5.4.1.0 Required

✅ Yes

### 5.4.2.0 Scenarios

- Re-processing of failed messages after a bug fix or dependency resolution.

### 5.4.3.0 Implementation

Manual or semi-automated re-driving of messages from the configured Dead Letter Queue (DLQ).

## 5.5.0.0 Retention Policy

| Property | Value |
|----------|-------|
| Strategy | Time-based |
| Duration | Based on queue's message retention setting (e.g., ... |
| Archiving Approach | No archiving required. Events are transient and st... |

# 6.0.0.0 Dead Letter Queue And Error Handling

## 6.1.0.0 Dead Letter Strategy

| Property | Value |
|----------|-------|
| Approach | A dedicated Dead Letter Queue (DLQ) for each prima... |
| Queue Configuration | Standard SQS queue with a longer message retention... |
| Processing Logic | Messages in the DLQ are not processed automaticall... |

## 6.2.0.0 Retry Policies

- {'errorType': 'Transient Errors (e.g., network issues, downstream service throttling)', 'maxRetries': 3, 'backoffStrategy': 'exponential', 'delayConfiguration': "Handled by the SQS to Lambda integration's visibility timeout mechanism."}

## 6.3.0.0 Poison Message Handling

| Property | Value |
|----------|-------|
| Detection Mechanism | Exceeding the maximum retry count configured in th... |
| Handling Strategy | The message is automatically moved to the correspo... |
| Alerting Required | ✅ |

## 6.4.0.0 Error Notification

### 6.4.1.0 Channels

- Email
- Slack

### 6.4.2.0 Severity

critical

### 6.4.3.0 Recipients

- On-call Engineering Team

## 6.5.0.0 Recovery Procedures

- {'scenario': 'Messages in DLQ due to a bug in the consumer function.', 'procedure': '1. Pause consumption from the main queue. 2. Investigate DLQ messages to identify the bug. 3. Deploy a fix. 4. Use SQS Redrive to move messages from DLQ back to the main queue. 5. Resume consumption.', 'automationLevel': 'semi-automated'}

# 7.0.0.0 Event Versioning Strategy

## 7.1.0.0 Schema Evolution Approach

| Property | Value |
|----------|-------|
| Strategy | Strict Backward Compatibility |
| Versioning Scheme | Semantic versioning (e.g., '1.0', '1.1') included ... |
| Migration Strategy | No in-flight migration. Consumers are expected to ... |

## 7.2.0.0 Compatibility Requirements

| Property | Value |
|----------|-------|
| Backward Compatible | ✅ |
| Forward Compatible | ❌ |
| Reasoning | Consumers must be able to process older versions o... |

## 7.3.0.0 Version Identification

| Property | Value |
|----------|-------|
| Mechanism | Field in event metadata |
| Location | header |
| Format | string (e.g., 'eventVersion': '1.0') |

## 7.4.0.0 Consumer Upgrade Strategy

| Property | Value |
|----------|-------|
| Approach | Consumers must be updated and deployed before prod... |
| Rollout Strategy | Blue/Green or Canary deployments for consumer func... |
| Rollback Procedure | Roll back the consumer deployment to the previous ... |

## 7.5.0.0 Schema Registry

| Property | Value |
|----------|-------|
| Required | ❌ |
| Technology | N/A |
| Governance | Schema definitions will be managed as code within ... |

# 8.0.0.0 Event Monitoring And Observability

## 8.1.0.0 Monitoring Capabilities

### 8.1.1.0 Capability

#### 8.1.1.1 Capability

Queue Metrics Monitoring

#### 8.1.1.2 Justification

To observe the health of the event pipeline (e.g., message backlog, age of oldest message).

#### 8.1.1.3 Implementation

AWS CloudWatch Metrics for SQS.

### 8.1.2.0 Capability

#### 8.1.2.1 Capability

Consumer Function Monitoring

#### 8.1.2.2 Justification

To track processing rates, errors, and performance of the handler functions.

#### 8.1.2.3 Implementation

AWS CloudWatch Metrics for Lambda (Invocations, Errors, Duration).

## 8.2.0.0 Tracing And Correlation

| Property | Value |
|----------|-------|
| Tracing Required | ✅ |
| Correlation Strategy | Correlation ID |
| Trace Id Propagation | A unique 'correlationId' generated at the start of... |

## 8.3.0.0 Performance Metrics

### 8.3.1.0 Metric

#### 8.3.1.1 Metric

End-to-end Latency (CDC Pipeline)

#### 8.3.1.2 Threshold

< 5 minutes (as per REQ-DATA-002)

#### 8.3.1.3 Alerting

✅ Yes

### 8.3.2.0 Metric

#### 8.3.2.1 Metric

DLQ Message Count

#### 8.3.2.2 Threshold

> 0

#### 8.3.2.3 Alerting

✅ Yes

## 8.4.0.0 Event Flow Visualization

| Property | Value |
|----------|-------|
| Required | ❌ |
| Tooling | N/A |
| Scope | While useful, a dedicated visualization tool is no... |

## 8.5.0.0 Alerting Requirements

### 8.5.1.0 Condition

#### 8.5.1.1 Condition

Number of messages in any DLQ > 0 for 5 minutes.

#### 8.5.1.2 Severity

critical

#### 8.5.1.3 Response Time

Acknowledge within 15 minutes

#### 8.5.1.4 Escalation Path

- On-call Engineer
- Lead Engineer

### 8.5.2.0 Condition

#### 8.5.2.1 Condition

CDC pipeline latency > 5 minutes.

#### 8.5.2.2 Severity

warning

#### 8.5.2.3 Response Time

Investigate within 1 hour

#### 8.5.2.4 Escalation Path

- On-call Engineer

# 9.0.0.0 Implementation Priority

## 9.1.0.0 Component

### 9.1.1.0 Component

CDC Pipeline (Queue, Consumer, DLQ, Monitoring)

### 9.1.2.0 Priority

🔴 high

### 9.1.3.0 Dependencies

- REQ-DATA-002

### 9.1.4.0 Estimated Effort

High

## 9.2.0.0 Component

### 9.2.1.0 Component

Audit Log Event Handling

### 9.2.2.0 Priority

🟡 medium

### 9.2.3.0 Dependencies

- REQ-SEC-005

### 9.2.4.0 Estimated Effort

Medium

## 9.3.0.0 Component

### 9.3.1.0 Component

Asynchronous Operations Handling

### 9.3.2.0 Priority

🟡 medium

### 9.3.3.0 Dependencies

- REQ-PERF-002

### 9.3.4.0 Estimated Effort

Medium

# 10.0.0.0 Risk Assessment

## 10.1.0.0 Risk

### 10.1.1.0 Risk

Data loss or corruption in the CDC pipeline.

### 10.1.2.0 Impact

high

### 10.1.3.0 Probability

medium

### 10.1.4.0 Mitigation

Implement robust DLQ handling, idempotent consumers, and end-to-end monitoring with alerts.

## 10.2.0.0 Risk

### 10.2.1.0 Risk

Uncontrolled retry loops ('poison message') overwhelming a downstream system.

### 10.2.2.0 Impact

medium

### 10.2.3.0 Probability

low

### 10.2.4.0 Mitigation

Configure a limited number of retries before moving a message to the DLQ.

## 10.3.0.0 Risk

### 10.3.1.0 Risk

Increased operational complexity compared to a monolith.

### 10.3.2.0 Impact

medium

### 10.3.3.0 Probability

high

### 10.3.4.0 Mitigation

Invest in comprehensive observability (logging, tracing, metrics) from the start. Document recovery procedures clearly.

# 11.0.0.0 Recommendations

## 11.1.0.0 Category

### 11.1.1.0 Category

🔹 Implementation

### 11.1.2.0 Recommendation

Ensure all event consumers are strictly idempotent to safely handle the at-least-once message delivery guarantee.

### 11.1.3.0 Justification

Prevents data duplication or incorrect state changes resulting from message redelivery, which is a standard behavior of the chosen message queue technology.

### 11.1.4.0 Priority

🔴 high

## 11.2.0.0 Category

### 11.2.1.0 Category

🔹 Observability

### 11.2.2.0 Recommendation

Enforce propagation of a 'correlationId' in all event metadata and application logs.

### 11.2.3.0 Justification

This is critical for tracing a request's lifecycle across multiple serverless functions and services, dramatically reducing debugging time.

### 11.2.4.0 Priority

🔴 high

## 11.3.0.0 Category

### 11.3.1.0 Category

🔹 Simplicity

### 11.3.2.0 Recommendation

Avoid implementing a generic event bus like EventBridge until multiple, distinct consumer types need to subscribe to the same event. Start with direct SQS queue-to-Lambda mappings.

### 11.3.3.0 Justification

Aligns with the principle of starting simple. A direct queue is easier to configure and manage for a single consumer and avoids the premature optimization of building a complex routing system.

### 11.3.4.0 Priority

🔴 high

