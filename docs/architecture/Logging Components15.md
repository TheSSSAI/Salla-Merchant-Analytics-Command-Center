# 1 System Overview

## 1.1 Analysis Date

2024-10-27

## 1.2 Technology Stack

- TypeScript 5.4
- Node.js 20.x
- React 18
- Serverless Framework
- AWS Lambda
- PostgreSQL 16
- ClickHouse
- Redis 7.x
- Pinecone
- OpenAI API

## 1.3 Monitoring Requirements

- REQ-PERF-001: p95 response time < 200ms
- REQ-PERF-002: Asynchronous processing for data-intensive operations
- REQ-DATA-002: CDC data pipeline with < 5 minute latency
- REQ-SEC-005: Detailed, immutable audit log with 12-month retention
- REQ-REL-002: RPO of 24h, RTO of 4h

## 1.4 System Architecture

Serverless

## 1.5 Environment

production

# 2.0 Log Level And Category Strategy

## 2.1 Default Log Level

INFO

## 2.2 Environment Specific Levels

### 2.2.1 Environment

#### 2.2.1.1 Environment

production

#### 2.2.1.2 Log Level

INFO

#### 2.2.1.3 Justification

Provides necessary operational visibility without the performance and cost overhead of more verbose levels.

### 2.2.2.0 Environment

#### 2.2.2.1 Environment

staging

#### 2.2.2.2 Log Level

DEBUG

#### 2.2.2.3 Justification

Allows for detailed tracing and debugging before production deployment.

### 2.2.3.0 Environment

#### 2.2.3.1 Environment

development

#### 2.2.3.2 Log Level

DEBUG

#### 2.2.3.3 Justification

Enables developers to trace code execution paths and inspect variable states during development.

## 2.3.0.0 Component Categories

### 2.3.1.0 Component

#### 2.3.1.1 Component

api-gateway-001

#### 2.3.1.2 Category

🔹 APIGateway.Access

#### 2.3.1.3 Log Level

INFO

#### 2.3.1.4 Verbose Logging

❌ No

#### 2.3.1.5 Justification

Logs all incoming requests, responses, and latency. Essential for monitoring traffic patterns and identifying broad error trends.

### 2.3.2.0 Component

#### 2.3.2.1 Component

auth-service-001

#### 2.3.2.2 Category

🔹 Application.AuthService

#### 2.3.2.3 Log Level

INFO

#### 2.3.2.4 Verbose Logging

❌ No

#### 2.3.2.5 Justification

Tracks authentication lifecycle events. Security-sensitive failures are logged as WARN or ERROR.

### 2.3.3.0 Component

#### 2.3.3.1 Component

analytics-service-001

#### 2.3.3.2 Category

🔹 Application.AnalyticsService

#### 2.3.3.3 Log Level

INFO

#### 2.3.3.4 Verbose Logging

❌ No

#### 2.3.3.5 Justification

Logs report generation requests and performance metrics. Long-running queries can log start/end events.

### 2.3.4.0 Component

#### 2.3.4.1 Component

ai-assistant-service-001

#### 2.3.4.2 Category

🔹 Application.AIAssistantService

#### 2.3.4.3 Log Level

INFO

#### 2.3.4.4 Verbose Logging

✅ Yes

#### 2.3.4.5 Justification

Verbose logging (at DEBUG level) is required to capture the retrieved context sent to the LLM for the RAG pattern (REQ-INTG-004), which is critical for debugging AI responses.

### 2.3.5.0 Component

#### 2.3.5.1 Component

data-pipeline-service-001

#### 2.3.5.2 Category

🔹 Application.DataPipelineService

#### 2.3.5.3 Log Level

INFO

#### 2.3.5.4 Verbose Logging

✅ Yes

#### 2.3.5.5 Justification

Logs the start, end, and throughput of CDC batches. Failed transformations must be logged at ERROR level with full context to support DLQ analysis, as per REQ-DATA-002.

### 2.3.6.0 Component

#### 2.3.6.1 Component

audit-log-service-001

#### 2.3.6.2 Category

🔹 Security.Audit

#### 2.3.6.3 Log Level

INFO

#### 2.3.6.4 Verbose Logging

❌ No

#### 2.3.6.5 Justification

A dedicated, immutable log stream for security-sensitive events as mandated by REQ-SEC-005. This stream must have a distinct retention policy.

## 2.4.0.0 Sampling Strategies

- {'component': 'api-gateway-001', 'samplingRate': '5%', 'condition': 'For full request/response body logging if needed for debugging', 'reason': 'Reduces log volume and cost. Standard access logs with metadata will be at 100%. Sampling only applies to potentially large payloads.'}

## 2.5.0.0 Logging Approach

### 2.5.1.0 Structured

✅ Yes

### 2.5.2.0 Format

JSON

### 2.5.3.0 Standard Fields

- timestamp
- logLevel
- message
- serviceName
- correlationId
- merchantAccountId
- userId

### 2.5.4.0 Custom Fields

- durationMs
- functionName
- exceptionType
- exceptionDetails

# 3.0.0.0 Log Aggregation Architecture

## 3.1.0.0 Collection Mechanism

### 3.1.1.0 Type

🔹 library

### 3.1.2.0 Technology

Winston 3.x

### 3.1.3.0 Configuration

#### 3.1.3.1 Formatters

json()

#### 3.1.3.2 Transports

Console

### 3.1.4.0 Justification

Serverless functions (AWS Lambda) log to stdout/stderr. A logging library standardizes the JSON format, which is then automatically collected by the cloud platform (e.g., AWS CloudWatch Logs).

## 3.2.0.0 Strategy

| Property | Value |
|----------|-------|
| Approach | centralized |
| Reasoning | Essential for a distributed, serverless architectu... |
| Local Retention | none |

## 3.3.0.0 Shipping Methods

- {'protocol': 'native cloud integration', 'destination': 'AWS CloudWatch Logs', 'reliability': 'at-least-once', 'compression': True}

## 3.4.0.0 Buffering And Batching

| Property | Value |
|----------|-------|
| Buffer Size | Platform-managed |
| Batch Size | 0 |
| Flush Interval | Platform-managed |
| Backpressure Handling | Handled by the cloud provider's ingestion service. |

## 3.5.0.0 Transformation And Enrichment

- {'transformation': 'Add Context', 'purpose': 'All log messages must be enriched with context (correlationId, merchantAccountId, userId) within the application before being written.', 'stage': 'collection'}

## 3.6.0.0 High Availability

| Property | Value |
|----------|-------|
| Required | ✅ |
| Redundancy | Region-level |
| Failover Strategy | Handled by the managed log aggregation service (e.... |

# 4.0.0.0 Retention Policy Design

## 4.1.0.0 Retention Periods

### 4.1.1.0 Log Type

#### 4.1.1.1 Log Type

Security.Audit

#### 4.1.1.2 Retention Period

12 months

#### 4.1.1.3 Justification

Directly mandated by requirement REQ-SEC-005.

#### 4.1.1.4 Compliance Requirement

Internal Security Policy

### 4.1.2.0 Log Type

#### 4.1.2.1 Log Type

Application Logs

#### 4.1.2.2 Retention Period

30 days

#### 4.1.2.3 Justification

Sufficient for operational debugging and troubleshooting while managing storage costs.

#### 4.1.2.4 Compliance Requirement

None

### 4.1.3.0 Log Type

#### 4.1.3.1 Log Type

API Gateway Access Logs

#### 4.1.3.2 Retention Period

90 days

#### 4.1.3.3 Justification

Provides a reasonable window for traffic analysis and short-term security reviews.

#### 4.1.3.4 Compliance Requirement

None

## 4.2.0.0 Compliance Requirements

- {'regulation': 'REQ-SEC-005', 'applicableLogTypes': ['Security.Audit'], 'minimumRetention': '12 months', 'specialHandling': 'Logs must be immutable and stored in a separate log group with restricted access.'}

## 4.3.0.0 Volume Impact Analysis

| Property | Value |
|----------|-------|
| Estimated Daily Volume | 10-50 GB/day |
| Storage Cost Projection | Tiering is required to manage costs for the 12-mon... |
| Compression Ratio | Approx. 10:1 |

## 4.4.0.0 Storage Tiering

### 4.4.1.0 Hot Storage

| Property | Value |
|----------|-------|
| Duration | 90 days |
| Accessibility | immediate |
| Cost | high |

### 4.4.2.0 Warm Storage

| Property | Value |
|----------|-------|
| Duration | N/A |
| Accessibility | N/A |
| Cost | N/A |

### 4.4.3.0 Cold Storage

| Property | Value |
|----------|-------|
| Duration | 91 days to 12 months |
| Accessibility | hours |
| Cost | low |

## 4.5.0.0 Compression Strategy

| Property | Value |
|----------|-------|
| Algorithm | Platform Default (e.g., GZIP) |
| Compression Level | Standard |
| Expected Ratio | 5:1 - 10:1 |

## 4.6.0.0 Anonymization Requirements

- {'dataType': 'PII', 'method': 'mask', 'timeline': 'pre-log', 'compliance': 'Best practice to avoid logging sensitive data like names, emails, addresses.'}

# 5.0.0.0 Search Capability Requirements

## 5.1.0.0 Essential Capabilities

### 5.1.1.0 Capability

#### 5.1.1.1 Capability

Search by correlationId

#### 5.1.1.2 Performance Requirement

< 5s

#### 5.1.1.3 Justification

The single most critical capability for debugging requests that span multiple serverless functions.

### 5.1.2.0 Capability

#### 5.1.2.1 Capability

Filter by merchantAccountId

#### 5.1.2.2 Performance Requirement

< 5s

#### 5.1.2.3 Justification

Essential for isolating issues to a specific tenant in the multi-tenant architecture.

### 5.1.3.0 Capability

#### 5.1.3.1 Capability

Full-text search on message field

#### 5.1.3.2 Performance Requirement

< 10s

#### 5.1.3.3 Justification

Required for general-purpose debugging and error investigation.

## 5.2.0.0 Performance Characteristics

| Property | Value |
|----------|-------|
| Search Latency | < 10s for typical queries |
| Concurrent Users | 10 |
| Query Complexity | simple |
| Indexing Strategy | Index standard fields by default. |

## 5.3.0.0 Indexed Fields

### 5.3.1.0 Field

#### 5.3.1.1 Field

correlationId

#### 5.3.1.2 Index Type

Keyword

#### 5.3.1.3 Search Pattern

Exact match

#### 5.3.1.4 Frequency

high

### 5.3.2.0 Field

#### 5.3.2.1 Field

merchantAccountId

#### 5.3.2.2 Index Type

Keyword

#### 5.3.2.3 Search Pattern

Exact match

#### 5.3.2.4 Frequency

high

### 5.3.3.0 Field

#### 5.3.3.1 Field

userId

#### 5.3.3.2 Index Type

Keyword

#### 5.3.3.3 Search Pattern

Exact match

#### 5.3.3.4 Frequency

medium

### 5.3.4.0 Field

#### 5.3.4.1 Field

timestamp

#### 5.3.4.2 Index Type

Date

#### 5.3.4.3 Search Pattern

Range queries

#### 5.3.4.4 Frequency

high

## 5.4.0.0 Full Text Search

### 5.4.1.0 Required

✅ Yes

### 5.4.2.0 Fields

- message
- exceptionDetails

### 5.4.3.0 Search Engine

AWS CloudWatch Logs Insights

### 5.4.4.0 Relevance Scoring

✅ Yes

## 5.5.0.0 Correlation And Tracing

### 5.5.1.0 Correlation Ids

- correlationId (or traceId)

### 5.5.2.0 Trace Id Propagation

Must be propagated via HTTP headers from API Gateway to all downstream Lambda functions.

### 5.5.3.0 Span Correlation

✅ Yes

### 5.5.4.0 Cross Service Tracing

✅ Yes

## 5.6.0.0 Dashboard Requirements

### 5.6.1.0 Dashboard

#### 5.6.1.1 Dashboard

Operational Health

#### 5.6.1.2 Purpose

At-a-glance view of system-wide error rates, p95 latency, and key service health.

#### 5.6.1.3 Refresh Interval

1m

#### 5.6.1.4 Audience

DevOps/SRE

### 5.6.2.0 Dashboard

#### 5.6.2.1 Dashboard

CDC Pipeline Status

#### 5.6.2.2 Purpose

Monitor latency, throughput, and error count (DLQ size) of the data pipeline, per REQ-DATA-002.

#### 5.6.2.3 Refresh Interval

1m

#### 5.6.2.4 Audience

Data Engineering

# 6.0.0.0 Storage Solution Selection

## 6.1.0.0 Selected Technology

### 6.1.1.0 Primary

AWS CloudWatch Logs

### 6.1.2.0 Reasoning

Natively integrated with the AWS Lambda-based serverless architecture, providing a scalable, fully managed, and cost-effective solution that meets all essential requirements without additional operational overhead.

### 6.1.3.0 Alternatives

- Datadog Logs
- ELK Stack (Elasticsearch, Logstash, Kibana)

## 6.2.0.0 Scalability Requirements

| Property | Value |
|----------|-------|
| Expected Growth Rate | 20% MoM |
| Peak Load Handling | The selected solution must scale automatically wit... |
| Horizontal Scaling | ✅ |

## 6.3.0.0 Cost Performance Analysis

- {'solution': 'AWS CloudWatch Logs', 'costPerGB': 'Usage-based (ingestion + storage)', 'queryPerformance': 'Good for typical operational queries.', 'operationalComplexity': 'low'}

## 6.4.0.0 Backup And Recovery

| Property | Value |
|----------|-------|
| Backup Frequency | Logs can be exported to S3 for long-term archival ... |
| Recovery Time Objective | N/A (Log data is for analysis, not service restora... |
| Recovery Point Objective | N/A |
| Testing Frequency | N/A |

## 6.5.0.0 Geo Distribution

### 6.5.1.0 Required

❌ No

### 6.5.2.0 Regions

*No items available*

### 6.5.3.0 Replication Strategy



## 6.6.0.0 Data Sovereignty

*No items available*

# 7.0.0.0 Access Control And Compliance

## 7.1.0.0 Access Control Requirements

### 7.1.1.0 Role

#### 7.1.1.1 Role

DevOps/SRE

#### 7.1.1.2 Permissions

- read
- write
- admin

#### 7.1.1.3 Log Types

- *

#### 7.1.1.4 Justification

Requires full access to manage and troubleshoot the logging infrastructure.

### 7.1.2.0 Role

#### 7.1.2.1 Role

Developer

#### 7.1.2.2 Permissions

- read

#### 7.1.2.3 Log Types

- Application Logs
- API Gateway Access Logs

#### 7.1.2.4 Justification

Requires read access to non-production logs for development and debugging.

### 7.1.3.0 Role

#### 7.1.3.1 Role

Security/Compliance

#### 7.1.3.2 Permissions

- read

#### 7.1.3.3 Log Types

- Security.Audit

#### 7.1.3.4 Justification

Requires read-only access to audit logs for compliance reviews, per REQ-SEC-005.

## 7.2.0.0 Sensitive Data Handling

- {'dataType': 'PII', 'handlingStrategy': 'mask', 'fields': ['user.firstName', 'user.lastName', 'user.email'], 'complianceRequirement': 'GDPR/CCPA best practices and REQ-INTG-004 constraint on sending PII to third parties.'}

## 7.3.0.0 Encryption Requirements

### 7.3.1.0 In Transit

| Property | Value |
|----------|-------|
| Required | ✅ |
| Protocol | TLS 1.2+ |
| Certificate Management | Platform-managed |

### 7.3.2.0 At Rest

| Property | Value |
|----------|-------|
| Required | ✅ |
| Algorithm | AES-256 |
| Key Management | AWS KMS (platform-managed) |

## 7.4.0.0 Audit Trail

| Property | Value |
|----------|-------|
| Log Access | ✅ |
| Retention Period | 1 year |
| Audit Log Location | AWS CloudTrail |
| Compliance Reporting | ✅ |

## 7.5.0.0 Regulatory Compliance

- {'regulation': 'GDPR', 'applicableComponents': ['*'], 'specificRequirements': ['Masking PII in logs.', 'Logging DSAR actions (REQ-CMPL-001) in the audit log.'], 'evidenceCollection': 'Audit logs and log access trails.'}

## 7.6.0.0 Data Protection Measures

- {'measure': 'Log PII Masking', 'implementation': 'A shared utility function used by the logging library to recursively scan and mask known PII fields before serialization.', 'monitoringRequired': True}

# 8.0.0.0 Project Specific Logging Config

## 8.1.0.0 Logging Config

### 8.1.1.0 Level

🔹 INFO

### 8.1.2.0 Retention

30 days (Application), 12 months (Audit)

### 8.1.3.0 Aggregation

Centralized (AWS CloudWatch)

### 8.1.4.0 Storage

AWS CloudWatch Logs

### 8.1.5.0 Configuration

*No data available*

## 8.2.0.0 Component Configurations

### 8.2.1.0 Component

#### 8.2.1.1 Component

data-pipeline-service-001

#### 8.2.1.2 Log Level

INFO

#### 8.2.1.3 Output Format

JSON

#### 8.2.1.4 Destinations

- AWS CloudWatch

#### 8.2.1.5 Sampling

##### 8.2.1.5.1 Enabled

❌ No

##### 8.2.1.5.2 Rate

1

#### 8.2.1.6.0 Custom Fields

- batchId
- recordsProcessed
- failedRecords

### 8.2.2.0.0 Component

#### 8.2.2.1.0 Component

ai-assistant-service-001

#### 8.2.2.2.0 Log Level

INFO

#### 8.2.2.3.0 Output Format

JSON

#### 8.2.2.4.0 Destinations

- AWS CloudWatch

#### 8.2.2.5.0 Sampling

##### 8.2.2.5.1 Enabled

❌ No

##### 8.2.2.5.2 Rate

1

#### 8.2.2.6.0 Custom Fields

- openAIRequestId
- retrievedContextLength

## 8.3.0.0.0 Metrics

### 8.3.1.0.0 Custom Metrics

*No data available*

## 8.4.0.0.0 Alert Rules

### 8.4.1.0.0 High 5xx Error Rate

#### 8.4.1.1.0 Name

High 5xx Error Rate

#### 8.4.1.2.0 Condition

API Gateway 5xx errors > 1% over 5 minutes

#### 8.4.1.3.0 Severity

High

#### 8.4.1.4.0 Actions

- {'type': 'SNS', 'target': 'on-call-alerts', 'configuration': {}}

#### 8.4.1.5.0 Suppression Rules

*No items available*

#### 8.4.1.6.0 Escalation Path

- On-call Engineer

### 8.4.2.0.0 CDC Pipeline DLQ Has Messages

#### 8.4.2.1.0 Name

CDC Pipeline DLQ Has Messages

#### 8.4.2.2.0 Condition

ApproximateNumberOfMessagesVisible in data-pipeline-dlq > 0 for 5 minutes

#### 8.4.2.3.0 Severity

Critical

#### 8.4.2.4.0 Actions

- {'type': 'SNS', 'target': 'on-call-critical-alerts', 'configuration': {}}

#### 8.4.2.5.0 Suppression Rules

*No items available*

#### 8.4.2.6.0 Escalation Path

- On-call Engineer
- Data Engineering Lead

### 8.4.3.0.0 Multiple Failed Logins for User

#### 8.4.3.1.0 Name

Multiple Failed Logins for User

#### 8.4.3.2.0 Condition

Log search for 'Authentication failed' for a single userId > 5 times in 1 minute

#### 8.4.3.3.0 Severity

Medium

#### 8.4.3.4.0 Actions

- {'type': 'SNS', 'target': 'security-alerts', 'configuration': {}}

#### 8.4.3.5.0 Suppression Rules

*No items available*

#### 8.4.3.6.0 Escalation Path

- Security Team

# 9.0.0.0.0 Implementation Priority

## 9.1.0.0.0 Component

### 9.1.1.0.0 Component

Core Logging Library (Structured JSON, Context Enrichment)

### 9.1.2.0.0 Priority

🔴 high

### 9.1.3.0.0 Dependencies

*No items available*

### 9.1.4.0.0 Estimated Effort

Medium

### 9.1.5.0.0 Risk Level

low

## 9.2.0.0.0 Component

### 9.2.1.0.0 Component

Audit Log Configuration (Separate Stream, 12-month Retention, IAM Policy)

### 9.2.2.0.0 Priority

🔴 high

### 9.2.3.0.0 Dependencies

- Core Logging Library

### 9.2.4.0.0 Estimated Effort

Medium

### 9.2.5.0.0 Risk Level

medium

## 9.3.0.0.0 Component

### 9.3.1.0.0 Component

CDC Pipeline Observability (DLQ, Latency Alarms)

### 9.3.2.0.0 Priority

🟡 medium

### 9.3.3.0.0 Dependencies

*No items available*

### 9.3.4.0.0 Estimated Effort

Medium

### 9.3.5.0.0 Risk Level

medium

# 10.0.0.0.0 Risk Assessment

## 10.1.0.0.0 Risk

### 10.1.1.0.0 Risk

Inconsistent or missing correlation IDs

### 10.1.2.0.0 Impact

high

### 10.1.3.0.0 Probability

medium

### 10.1.4.0.0 Mitigation

Implement middleware in the API Gateway to generate and inject the correlationId. Enforce its usage via linting rules and code reviews.

### 10.1.5.0.0 Contingency Plan

Fall back to searching by tenant ID and timestamp, which is significantly slower and less precise.

## 10.2.0.0.0 Risk

### 10.2.1.0.0 Risk

Excessive logging costs due to misconfigured log levels in production.

### 10.2.2.0.0 Impact

medium

### 10.2.3.0.0 Probability

high

### 10.2.4.0.0 Mitigation

Use environment variables to control log levels. Implement cost monitoring and alerts on the logging service.

### 10.2.5.0.0 Contingency Plan

Temporarily increase the log level to WARN or ERROR in production while the offending service is fixed.

# 11.0.0.0.0 Recommendations

## 11.1.0.0.0 Category

### 11.1.1.0.0 Category

🔹 Implementation

### 11.1.2.0.0 Recommendation

A shared logging library/utility must be created and used by all serverless functions to enforce structured logging and automatic enrichment with correlationId and merchantAccountId.

### 11.1.3.0.0 Justification

Ensures consistency and makes effective centralized logging possible. Without this, logs will be a mix of formats and lack critical context for debugging.

### 11.1.4.0.0 Priority

🔴 high

### 11.1.5.0.0 Implementation Notes

The utility should be instantiated once per Lambda invocation and be accessible via context.

## 11.2.0.0.0 Category

### 11.2.1.0.0 Category

🔹 Configuration

### 11.2.2.0.0 Recommendation

Create two distinct log groups in AWS CloudWatch: one for 'Security.Audit' logs with a 12-month retention and restricted access, and another for all other 'Application' logs with a 30-day retention.

### 11.2.3.0.0 Justification

This is the most direct way to meet the specific retention and access control requirements of REQ-SEC-005 while keeping costs for operational logs manageable.

### 11.2.4.0.0 Priority

🔴 high

### 11.2.5.0.0 Implementation Notes

Define these log groups and their IAM policies using Infrastructure as Code (e.g., Serverless Framework or AWS CDK).

## 11.3.0.0.0 Category

### 11.3.1.0.0 Category

🔹 Observability

### 11.3.2.0.0 Recommendation

Implement distributed tracing (e.g., via AWS X-Ray) alongside logging. The trace ID should be used as the log correlationId.

### 11.3.3.0.0 Justification

While structured logging is essential, distributed tracing provides a visual service map and performance breakdown that is invaluable for diagnosing latency issues in a complex serverless system, directly supporting REQ-PERF-001.

### 11.3.4.0.0 Priority

🟡 medium

### 11.3.5.0.0 Implementation Notes

Enable active tracing on the API Gateway and all Lambda functions.

