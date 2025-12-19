# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- TypeScript 5.4
- Node.js 20.x
- PostgreSQL 16
- ClickHouse
- Redis 7.x
- Prisma 5.x
- AWS Lambda

## 1.3 Service Interfaces

- API Gateway (REST)
- AnalyticsService
- AIAssistantService
- Data Ingestion Pipeline Service

## 1.4 Data Models

- User
- SalesOrder
- OrderItem
- Product
- Customer
- ClickHouse Analytical Tables (Denormalized)

# 2.0 Data Mapping Strategy

## 2.1 Essential Mappings

### 2.1.1 Mapping Id

#### 2.1.1.1 Mapping Id

MAP-CDC-001

#### 2.1.1.2 Source

PostgreSQL OLTP Schema (e.g., SalesOrder, OrderItem)

#### 2.1.1.3 Target

ClickHouse OLAP Schema (e.g., sales_fact_table)

#### 2.1.1.4 Transformation

flattened

#### 2.1.1.5 Configuration

##### 2.1.1.5.1 Join Keys

- SalesOrderId

##### 2.1.1.5.2 Denormalized Fields

- productName
- categoryName
- customerCountry

#### 2.1.1.6.0 Mapping Technique

ELT (Extract-Load-Transform) via CDC pipeline

#### 2.1.1.7.0 Justification

Required by REQ-DATA-002 to populate the data warehouse for fast analytical queries.

#### 2.1.1.8.0 Complexity

complex

### 2.1.2.0.0 Mapping Id

#### 2.1.2.1.0 Mapping Id

MAP-API-001

#### 2.1.2.2.0 Source

API Request DTOs (e.g., CreateInvitationDTO)

#### 2.1.2.3.0 Target

Domain Models (e.g., Invitation entity)

#### 2.1.2.4.0 Transformation

direct

#### 2.1.2.5.0 Configuration

*No data available*

#### 2.1.2.6.0 Mapping Technique

Object-to-object mapping within Application Services

#### 2.1.2.7.0 Justification

Decouples the API layer from the domain layer, allowing them to evolve independently.

#### 2.1.2.8.0 Complexity

simple

### 2.1.3.0.0 Mapping Id

#### 2.1.3.1.0 Mapping Id

MAP-AI-001

#### 2.1.3.2.0 Source

ClickHouse Query Results

#### 2.1.3.3.0 Target

LLM Context String (for RAG pattern)

#### 2.1.3.4.0 Transformation

merging

#### 2.1.3.5.0 Configuration

##### 2.1.3.5.1 Format

Text or JSON summary of retrieved data

#### 2.1.3.6.0 Mapping Technique

Data-to-text serialization

#### 2.1.3.7.0 Justification

Required by REQ-INTG-004 to prepare contextual data for the OpenAI API.

#### 2.1.3.8.0 Complexity

medium

## 2.2.0.0.0 Object To Object Mappings

- {'sourceObject': 'API Request DTOs', 'targetObject': 'Domain Entities', 'fieldMappings': [{'sourceField': 'inviteeEmail', 'targetField': 'inviteeEmail', 'transformation': 'toLowerCase, trim', 'dataTypeConversion': 'None'}, {'sourceField': 'roleName', 'targetField': 'RoleId', 'transformation': 'Lookup RoleId from roleName', 'dataTypeConversion': 'String to GUID'}]}

## 2.3.0.0.0 Data Type Conversions

### 2.3.1.0.0 From

#### 2.3.1.1.0 From

PostgreSQL TIMESTAMP

#### 2.3.1.2.0 To

ClickHouse DateTime64

#### 2.3.1.3.0 Conversion Method

Direct mapping via CDC tool and ClickHouse client.

#### 2.3.1.4.0 Validation Required

✅ Yes

### 2.3.2.0.0 From

#### 2.3.2.1.0 From

PostgreSQL DECIMAL

#### 2.3.2.2.0 To

ClickHouse Decimal(10, 2)

#### 2.3.2.3.0 Conversion Method

Direct type mapping.

#### 2.3.2.4.0 Validation Required

✅ Yes

## 2.4.0.0.0 Bidirectional Mappings

*No items available*

# 3.0.0.0.0 Schema Validation Requirements

## 3.1.0.0.0 Field Level Validations

### 3.1.1.0.0 Field

#### 3.1.1.1.0 Field

Invitation.inviteeEmail

#### 3.1.1.2.0 Rules

- notNull
- isEmail

#### 3.1.1.3.0 Priority

🚨 critical

#### 3.1.1.4.0 Error Message

A valid email address is required for the invitation.

### 3.1.2.0.0 Field

#### 3.1.2.1.0 Field

ReportRequest.dateRange.start

#### 3.1.2.2.0 Rules

- isDate
- notInFuture

#### 3.1.2.3.0 Priority

🔴 high

#### 3.1.2.4.0 Error Message

A valid start date is required.

## 3.2.0.0.0 Cross Field Validations

- {'validationId': 'VAL-DATE-001', 'fields': ['ReportRequest.dateRange.start', 'ReportRequest.dateRange.end'], 'rule': 'end date must be after or equal to start date', 'condition': 'Both dates are present', 'errorHandling': 'Return 400 Bad Request with a descriptive error message.'}

## 3.3.0.0.0 Business Rule Validations

- {'ruleId': 'VAL-CDC-001', 'description': 'Ensure that captured CDC events for OrderItem contain a valid SalesOrderId before loading into ClickHouse.', 'fields': ['OrderItem.SalesOrderId'], 'logic': 'Check for non-null and valid format.', 'priority': 'critical'}

## 3.4.0.0.0 Conditional Validations

*No items available*

## 3.5.0.0.0 Validation Groups

- {'groupName': 'API Input Validation', 'validations': ['VAL-DATE-001'], 'executionOrder': 1, 'stopOnFirstFailure': True}

# 4.0.0.0.0 Transformation Pattern Evaluation

## 4.1.0.0.0 Selected Patterns

### 4.1.1.0.0 Pattern

#### 4.1.1.1.0 Pattern

pipeline

#### 4.1.1.2.0 Use Case

CDC from OLTP to OLAP

#### 4.1.1.3.0 Implementation

AWS Lambda function triggered by a message queue (e.g., SQS) consuming database change events.

#### 4.1.1.4.0 Justification

Directly supports the asynchronous, decoupled data synchronization required by REQ-DATA-002.

### 4.1.2.0.0 Pattern

#### 4.1.2.1.0 Pattern

adapter

#### 4.1.2.2.0 Use Case

Integrating with OpenAI API

#### 4.1.2.3.0 Implementation

An 'OpenAIGateway' class in the Infrastructure Layer that translates internal data structures into the format required by the OpenAI SDK.

#### 4.1.2.4.0 Justification

Decouples the application from the specific implementation details of the third-party OpenAI API as per REQ-INTG-004.

## 4.2.0.0.0 Pipeline Processing

### 4.2.1.0.0 Required

✅ Yes

### 4.2.2.0.0 Stages

#### 4.2.2.1.0 Stage

##### 4.2.2.1.1 Stage

Capture

##### 4.2.2.1.2 Transformation

CDC tool captures row-level changes from PostgreSQL WAL.

##### 4.2.2.1.3 Dependencies

*No items available*

#### 4.2.2.2.0 Stage

##### 4.2.2.2.1 Stage

Queue

##### 4.2.2.2.2 Transformation

Change events are published to a message queue.

##### 4.2.2.2.3 Dependencies

- Capture

#### 4.2.2.3.0 Stage

##### 4.2.2.3.1 Stage

Load & Transform

##### 4.2.2.3.2 Transformation

A consumer function reads batches of events, transforms them into the OLAP schema, and loads them into ClickHouse.

##### 4.2.2.3.3 Dependencies

- Queue

### 4.2.3.0.0 Parallelization

✅ Yes

## 4.3.0.0.0 Processing Mode

### 4.3.1.0.0 Real Time

#### 4.3.1.1.0 Required

❌ No

#### 4.3.1.2.0 Scenarios

*No items available*

#### 4.3.1.3.0 Latency Requirements



### 4.3.2.0.0 Batch

| Property | Value |
|----------|-------|
| Required | ✅ |
| Batch Size | 100 |
| Frequency | on-demand |

### 4.3.3.0.0 Streaming

| Property | Value |
|----------|-------|
| Required | ✅ |
| Streaming Framework | Message Queue based (e.g., Upstash QStash or SQS) |
| Windowing Strategy | Tumbling window based on batch size or time. |

## 4.4.0.0.0 Canonical Data Model

### 4.4.1.0.0 Applicable

❌ No

### 4.4.2.0.0 Scope

*No items available*

### 4.4.3.0.0 Benefits

*No items available*

# 5.0.0.0.0 Version Handling Strategy

## 5.1.0.0.0 Schema Evolution

### 5.1.1.0.0 Strategy

Strict Backward Compatibility

### 5.1.2.0.0 Versioning Scheme

Semantic Versioning (e.g., event.v1.json)

### 5.1.3.0.0 Compatibility

| Property | Value |
|----------|-------|
| Backward | ✅ |
| Forward | ❌ |
| Reasoning | Consumers must be able to process older event vers... |

## 5.2.0.0.0 Transformation Versioning

| Property | Value |
|----------|-------|
| Mechanism | Code Versioning (Git) |
| Version Identification | Deployment artifacts are tagged with Git commit ha... |
| Migration Strategy | Deploy new version of transformation logic alongsi... |

## 5.3.0.0.0 Data Model Changes

| Property | Value |
|----------|-------|
| Migration Path | Use a database migration tool like Prisma Migrate ... |
| Rollback Strategy | Execute 'down' migration scripts. For OLAP, restor... |
| Validation Strategy | Run integration tests against the migrated schema. |

## 5.4.0.0.0 Schema Registry

| Property | Value |
|----------|-------|
| Required | ❌ |
| Technology | N/A |
| Governance | Schemas are defined as TypeScript types in a share... |

# 6.0.0.0.0 Performance Optimization

## 6.1.0.0.0 Critical Requirements

### 6.1.1.0.0 Operation

#### 6.1.1.1.0 Operation

CDC Pipeline (Postgres commit to ClickHouse availability)

#### 6.1.1.2.0 Max Latency

5 minutes

#### 6.1.1.3.0 Throughput Target

1000 events/sec

#### 6.1.1.4.0 Justification

Required by REQ-DATA-002 to ensure analytics data is reasonably fresh.

### 6.1.2.0.0 Operation

#### 6.1.2.1.0 Operation

API DTO to Domain Model Transformation

#### 6.1.2.2.0 Max Latency

10ms

#### 6.1.2.3.0 Throughput Target

N/A

#### 6.1.2.4.0 Justification

Must be negligible to meet the overall p95 API response time of < 200ms (REQ-PERF-001).

## 6.2.0.0.0 Parallelization Opportunities

- {'transformation': 'CDC event processing', 'parallelizationStrategy': 'Increase concurrent Lambda invocations consuming from the SQS queue.', 'expectedGain': 'Linear increase in throughput up to the limit of the downstream database.'}

## 6.3.0.0.0 Caching Strategies

*No items available*

## 6.4.0.0.0 Memory Optimization

### 6.4.1.0.0 Techniques

- Process CDC events in streams/batches instead of loading all into memory.
- Select only required columns in database queries.

### 6.4.2.0.0 Thresholds

Monitor Lambda memory usage to stay below configured limits (e.g., 80% of allocated).

### 6.4.3.0.0 Monitoring Required

✅ Yes

## 6.5.0.0.0 Lazy Evaluation

### 6.5.1.0.0 Applicable

❌ No

### 6.5.2.0.0 Scenarios

*No items available*

### 6.5.3.0.0 Implementation



## 6.6.0.0.0 Bulk Processing

### 6.6.1.0.0 Required

✅ Yes

### 6.6.2.0.0 Batch Sizes

#### 6.6.2.1.0 Optimal

100

#### 6.6.2.2.0 Maximum

1,000

### 6.6.3.0.0 Parallelism

10

# 7.0.0.0.0 Error Handling And Recovery

## 7.1.0.0.0 Error Handling Strategies

- {'errorType': 'CDC Transformation Failure (e.g., data type mismatch)', 'strategy': 'Move poison message to a Dead Letter Queue (DLQ).', 'fallbackAction': 'Log the error with full context.', 'escalationPath': ['CloudWatch Alert', 'On-call Engineer']}

## 7.2.0.0.0 Logging Requirements

### 7.2.1.0.0 Log Level

info

### 7.2.2.0.0 Included Data

- correlationId
- sourceEventId
- errorMessage
- stackTrace (on error)

### 7.2.3.0.0 Retention Period

30 days

### 7.2.4.0.0 Alerting

✅ Yes

## 7.3.0.0.0 Partial Success Handling

### 7.3.1.0.0 Strategy

For batch CDC processing, commit successful transformations and move only the failed messages to the DLQ.

### 7.3.2.0.0 Reporting Mechanism

Log the count of successful vs. failed messages per batch.

### 7.3.3.0.0 Recovery Actions

- Manual redrive of DLQ messages after fixing the transformation logic.

## 7.4.0.0.0 Circuit Breaking

*No items available*

## 7.5.0.0.0 Retry Strategies

- {'operation': 'CDC Consumer processing a batch', 'maxRetries': 3, 'backoffStrategy': 'exponential', 'retryConditions': ['Transient network error', 'Downstream database connection failure']}

## 7.6.0.0.0 Error Notifications

- {'condition': 'Messages in CDC DLQ > 0', 'recipients': ['on-call-dev-team@example.com'], 'severity': 'critical', 'channel': 'Email'}

# 8.0.0.0.0 Project Specific Transformations

- {'transformationId': 'PST-CDC-001', 'name': 'OLTP to OLAP Data Synchronization', 'description': 'Transforms and loads data changes from the PostgreSQL OLTP database to the ClickHouse OLAP data warehouse using a Change Data Capture (CDC) pipeline. This involves flattening and denormalizing data for analytical performance, as per REQ-DATA-002.', 'source': {'service': 'PostgreSQL Database', 'model': 'SalesOrder, OrderItem, Product, Customer', 'fields': ['*']}, 'target': {'service': 'ClickHouse Database', 'model': 'sales_fact, customer_dim, product_dim', 'fields': ['order_id', 'order_date', 'product_id', 'product_name', 'category_name', 'customer_id', 'customer_country', 'quantity', 'revenue']}, 'transformation': {'type': 'flattened', 'logic': 'For each OrderItem change, join with SalesOrder, Product, and Customer data from the CDC payload or via lookup to create a single, wide fact record. Calculate revenue (quantity * priceAtPurchase).', 'configuration': {}}, 'frequency': 'real-time', 'criticality': 'critical', 'dependencies': ['REQ-DATA-002', 'Data Ingestion Pipeline Service'], 'validation': {'preTransformation': ['Ensure CDC message schema is valid.'], 'postTransformation': ['Verify that key metrics (e.g., total revenue) in OLAP match OLTP over a given period.']}, 'performance': {'expectedVolume': 'Up to 1M events/day', 'latencyRequirement': '< 5 minutes', 'optimizationStrategy': 'Batch processing of messages, parallel consumers, efficient ClickHouse writes.'}}

# 9.0.0.0.0 Implementation Priority

## 9.1.0.0.0 Component

### 9.1.1.0.0 Component

PST-CDC-001: OLTP to OLAP Data Synchronization

### 9.1.2.0.0 Priority

🔴 high

### 9.1.3.0.0 Dependencies

*No items available*

### 9.1.4.0.0 Estimated Effort

Large

### 9.1.5.0.0 Risk Level

high

## 9.2.0.0.0 Component

### 9.2.1.0.0 Component

API DTO Validation and Mapping

### 9.2.2.0.0 Priority

🔴 high

### 9.2.3.0.0 Dependencies

*No items available*

### 9.2.4.0.0 Estimated Effort

Medium

### 9.2.5.0.0 Risk Level

low

## 9.3.0.0.0 Component

### 9.3.1.0.0 Component

MAP-AI-001: RAG Context Preparation

### 9.3.2.0.0 Priority

🟡 medium

### 9.3.3.0.0 Dependencies

- PST-CDC-001

### 9.3.4.0.0 Estimated Effort

Medium

### 9.3.5.0.0 Risk Level

medium

# 10.0.0.0.0 Risk Assessment

## 10.1.0.0.0 Risk

### 10.1.1.0.0 Risk

CDC pipeline latency exceeds the 5-minute requirement, leading to stale analytics.

### 10.1.2.0.0 Impact

high

### 10.1.3.0.0 Probability

medium

### 10.1.4.0.0 Mitigation

Implement robust monitoring and alerting on pipeline latency. Use batching and parallel consumers to optimize throughput.

### 10.1.5.0.0 Contingency Plan

Provide a mechanism for manual, full data re-sync. Communicate data freshness status on the UI.

## 10.2.0.0.0 Risk

### 10.2.1.0.0 Risk

Data inconsistency between OLTP and OLAP due to transformation errors or missed CDC events.

### 10.2.2.0.0 Impact

high

### 10.2.3.0.0 Probability

medium

### 10.2.4.0.0 Mitigation

Implement idempotent consumers and a robust DLQ for error handling. Schedule periodic data reconciliation checks.

### 10.2.5.0.0 Contingency Plan

Trigger a targeted data re-sync for the inconsistent period or entities.

# 11.0.0.0.0 Recommendations

## 11.1.0.0.0 Category

### 11.1.1.0.0 Category

🔹 Implementation

### 11.1.2.0.0 Recommendation

Implement the CDC consumer function to be strictly idempotent.

### 11.1.3.0.0 Justification

The at-least-once delivery guarantee of SQS means messages can be delivered more than once. Idempotency is crucial to prevent data duplication in ClickHouse.

### 11.1.4.0.0 Priority

🔴 high

### 11.1.5.0.0 Implementation Notes

Use a unique key from the source event (e.g., primary key + timestamp) to check if a record has already been processed.

## 11.2.0.0.0 Category

### 11.2.1.0.0 Category

🔹 Testing

### 11.2.2.0.0 Recommendation

Develop an automated data reconciliation test suite.

### 11.2.3.0.0 Justification

To continuously verify data integrity between the OLTP and OLAP systems and catch transformation bugs early.

### 11.2.4.0.0 Priority

🔴 high

### 11.2.5.0.0 Implementation Notes

Create a scheduled job that compares aggregate metrics (e.g., daily total sales) between PostgreSQL and ClickHouse and alerts on discrepancies.

## 11.3.0.0.0 Category

### 11.3.1.0.0 Category

🔹 Performance

### 11.3.2.0.0 Recommendation

Utilize batch inserts when writing to ClickHouse from the CDC consumer.

### 11.3.3.0.0 Justification

ClickHouse is optimized for high-volume batch writes, not row-by-row inserts. Batching will significantly improve performance and reduce load.

### 11.3.4.0.0 Priority

🔴 high

### 11.3.5.0.0 Implementation Notes

Configure the Lambda consumer to process messages in batches (e.g., 100-1000 messages) and perform a single insert operation per batch.

