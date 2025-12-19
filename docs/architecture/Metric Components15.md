# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- Serverless
- Node.js
- TypeScript
- React
- PostgreSQL
- ClickHouse
- AWS Lambda

## 1.3 Monitoring Components

- AWS CloudWatch
- AWS X-Ray
- Frontend RUM (e.g., CloudWatch RUM)

## 1.4 Requirements

- REQ-PERF-001
- REQ-PERF-003
- REQ-DATA-002
- REQ-SEC-005
- REQ-SCAL-001

## 1.5 Environment

production

# 2.0 Standard System Metrics Selection

## 2.1 Hardware Utilization Metrics

### 2.1.1 gauge

#### 2.1.1.1 Name

cloud.database.cpu.utilization

#### 2.1.1.2 Type

🔹 gauge

#### 2.1.1.3 Unit

percent

#### 2.1.1.4 Description

CPU utilization for managed database instances (PostgreSQL and ClickHouse).

#### 2.1.1.5 Collection

##### 2.1.1.5.1 Interval

60s

##### 2.1.1.5.2 Method

Cloud Provider API (e.g., AWS CloudWatch)

#### 2.1.1.6.0 Thresholds

##### 2.1.1.6.1 Warning

> 75%

##### 2.1.1.6.2 Critical

> 90%

#### 2.1.1.7.0 Justification

Ensures database performance is not bottlenecked by CPU, which directly impacts API response times.

### 2.1.2.0.0 gauge

#### 2.1.2.1.0 Name

lambda.function.memory.usage

#### 2.1.2.2.0 Type

🔹 gauge

#### 2.1.2.3.0 Unit

megabytes

#### 2.1.2.4.0 Description

Memory consumed by each serverless function invocation.

#### 2.1.2.5.0 Collection

##### 2.1.2.5.1 Interval

On execution

##### 2.1.2.5.2 Method

Cloud Provider Logs (e.g., AWS CloudWatch)

#### 2.1.2.6.0 Thresholds

##### 2.1.2.6.1 Warning

> 80% of allocated memory

##### 2.1.2.6.2 Critical

> 95% of allocated memory

#### 2.1.2.7.0 Justification

Monitors for potential out-of-memory errors and helps optimize cost by right-sizing function memory.

## 2.2.0.0.0 Runtime Metrics

### 2.2.1.0.0 histogram

#### 2.2.1.1.0 Name

nodejs.eventloop.lag

#### 2.2.1.2.0 Type

🔹 histogram

#### 2.2.1.3.0 Unit

milliseconds

#### 2.2.1.4.0 Description

Measures the latency of the Node.js event loop, indicating if it's blocked by long-running synchronous code.

#### 2.2.1.5.0 Technology

Node.js

#### 2.2.1.6.0 Collection

##### 2.2.1.6.1 Interval

10s

##### 2.2.1.6.2 Method

APM Agent

#### 2.2.1.7.0 Criticality

high

### 2.2.2.0.0 gauge

#### 2.2.2.1.0 Name

database.connections.active

#### 2.2.2.2.0 Type

🔹 gauge

#### 2.2.2.3.0 Unit

count

#### 2.2.2.4.0 Description

Number of active connections to the OLTP and OLAP databases.

#### 2.2.2.5.0 Technology

PostgreSQL, ClickHouse

#### 2.2.2.6.0 Collection

##### 2.2.2.6.1 Interval

60s

##### 2.2.2.6.2 Method

Cloud Provider API (e.g., AWS CloudWatch)

#### 2.2.2.7.0 Criticality

medium

## 2.3.0.0.0 Request Response Metrics

### 2.3.1.0.0 histogram

#### 2.3.1.1.0 Name

api.gateway.latency

#### 2.3.1.2.0 Type

🔹 histogram

#### 2.3.1.3.0 Unit

milliseconds

#### 2.3.1.4.0 Description

End-to-end latency for all requests hitting the API Gateway, from request to final response.

#### 2.3.1.5.0 Dimensions

- endpoint
- method
- httpStatus

#### 2.3.1.6.0 Percentiles

- p50
- p90
- p95
- p99

#### 2.3.1.7.0 Collection

##### 2.3.1.7.1 Interval

On request

##### 2.3.1.7.2 Method

Cloud Provider Logs (e.g., AWS CloudWatch)

### 2.3.2.0.0 counter

#### 2.3.2.1.0 Name

api.gateway.requests.count

#### 2.3.2.2.0 Type

🔹 counter

#### 2.3.2.3.0 Unit

count

#### 2.3.2.4.0 Description

Total number of requests to the API Gateway.

#### 2.3.2.5.0 Dimensions

- endpoint
- method
- httpStatus

#### 2.3.2.6.0 Percentiles

*No items available*

#### 2.3.2.7.0 Collection

##### 2.3.2.7.1 Interval

On request

##### 2.3.2.7.2 Method

Cloud Provider Logs (e.g., AWS CloudWatch)

## 2.4.0.0.0 Availability Metrics

- {'name': 'api.availability.rate', 'type': 'gauge', 'unit': 'percent', 'description': 'Percentage of successful (non-5xx) responses from the API Gateway.', 'calculation': '(1 - (5xx_count / total_requests)) * 100', 'slaTarget': '99.9%'}

## 2.5.0.0.0 Scalability Metrics

### 2.5.1.0.0 counter

#### 2.5.1.1.0 Name

lambda.function.throttles

#### 2.5.1.2.0 Type

🔹 counter

#### 2.5.1.3.0 Unit

count

#### 2.5.1.4.0 Description

Number of times a serverless function invocation was throttled due to concurrency limits.

#### 2.5.1.5.0 Capacity Threshold

Configured concurrency limit

#### 2.5.1.6.0 Auto Scaling Trigger

✅ Yes

### 2.5.2.0.0 gauge

#### 2.5.2.1.0 Name

lambda.function.concurrency.active

#### 2.5.2.2.0 Type

🔹 gauge

#### 2.5.2.3.0 Unit

count

#### 2.5.2.4.0 Description

Number of concurrent executions for all serverless functions.

#### 2.5.2.5.0 Capacity Threshold

Account-level concurrency limit

#### 2.5.2.6.0 Auto Scaling Trigger

✅ Yes

# 3.0.0.0.0 Application Specific Metrics Design

## 3.1.0.0.0 Transaction Metrics

### 3.1.1.0.0 counter

#### 3.1.1.1.0 Name

auth.login.rate

#### 3.1.1.2.0 Type

🔹 counter

#### 3.1.1.3.0 Unit

requests per second

#### 3.1.1.4.0 Description

Rate of user login attempts.

#### 3.1.1.5.0 Business Context

User Authentication (REQ-FUNC-003)

#### 3.1.1.6.0 Dimensions

- outcome(success|failure)

#### 3.1.1.7.0 Collection

##### 3.1.1.7.1 Interval

On event

##### 3.1.1.7.2 Method

Custom Metric

#### 3.1.1.8.0 Aggregation

##### 3.1.1.8.1 Functions

- sum
- rate

##### 3.1.1.8.2 Window

60s

### 3.1.2.0.0 counter

#### 3.1.2.1.0 Name

data_pipeline.events.processed

#### 3.1.2.2.0 Type

🔹 counter

#### 3.1.2.3.0 Unit

count

#### 3.1.2.4.0 Description

Number of CDC events successfully processed by the data pipeline.

#### 3.1.2.5.0 Business Context

Data Synchronization (REQ-DATA-002)

#### 3.1.2.6.0 Dimensions

- sourceTable

#### 3.1.2.7.0 Collection

##### 3.1.2.7.1 Interval

On event

##### 3.1.2.7.2 Method

Custom Metric

#### 3.1.2.8.0 Aggregation

##### 3.1.2.8.1 Functions

- sum

##### 3.1.2.8.2 Window

60s

## 3.2.0.0.0 Cache Performance Metrics

- {'name': 'cache.hit_ratio', 'type': 'gauge', 'unit': 'percent', 'description': 'The ratio of cache hits to total cache lookups for the Redis cache.', 'cacheType': 'Redis', 'hitRatioTarget': '> 90%'}

## 3.3.0.0.0 External Dependency Metrics

### 3.3.1.0.0 histogram

#### 3.3.1.1.0 Name

external.openai.api.latency

#### 3.3.1.2.0 Type

🔹 histogram

#### 3.3.1.3.0 Unit

milliseconds

#### 3.3.1.4.0 Description

Latency of API calls to the external OpenAI service for the AI Assistant.

#### 3.3.1.5.0 Dependency

OpenAI API

#### 3.3.1.6.0 Circuit Breaker Integration

✅ Yes

#### 3.3.1.7.0 Sla

##### 3.3.1.7.1 Response Time

< 2000ms

##### 3.3.1.7.2 Availability

99.5%

### 3.3.2.0.0 counter

#### 3.3.2.1.0 Name

external.email.send.rate

#### 3.3.2.2.0 Type

🔹 counter

#### 3.3.2.3.0 Unit

emails per second

#### 3.3.2.4.0 Description

Rate of emails sent via the external email gateway for cart recovery and invitations.

#### 3.3.2.5.0 Dependency

Email Service (e.g., AWS SES)

#### 3.3.2.6.0 Circuit Breaker Integration

❌ No

#### 3.3.2.7.0 Sla

##### 3.3.2.7.1 Response Time

< 1000ms

##### 3.3.2.7.2 Availability

99.9%

## 3.4.0.0.0 Error Metrics

- {'name': 'application.errors.total', 'type': 'counter', 'unit': 'count', 'description': 'Total count of unhandled exceptions and known errors within the application.', 'errorTypes': ['UnhandledException', 'ValidationError', 'DatabaseError'], 'dimensions': ['functionName', 'errorType', 'endpoint'], 'alertThreshold': '> 5 errors in 5 minutes'}

## 3.5.0.0.0 Throughput And Latency Metrics

### 3.5.1.0.0 histogram

#### 3.5.1.1.0 Name

lambda.function.duration

#### 3.5.1.2.0 Type

🔹 histogram

#### 3.5.1.3.0 Unit

milliseconds

#### 3.5.1.4.0 Description

Server-side execution time for each serverless function, critical for tracking against the p95 SLA.

#### 3.5.1.5.0 Percentiles

- p50
- p90
- p95
- p99

#### 3.5.1.6.0 Buckets

- 50
- 100
- 200
- 500
- 1000

#### 3.5.1.7.0 Sla Targets

##### 3.5.1.7.1 P95

< 200ms

##### 3.5.1.7.2 P99

< 500ms

### 3.5.2.0.0 histogram

#### 3.5.2.1.0 Name

frontend.performance.lcp

#### 3.5.2.2.0 Type

🔹 histogram

#### 3.5.2.3.0 Unit

seconds

#### 3.5.2.4.0 Description

Largest Contentful Paint measured from the end-user's browser, as per REQ-PERF-003.

#### 3.5.2.5.0 Percentiles

- p75
- p95

#### 3.5.2.6.0 Buckets

- 1.0
- 2.5
- 4.0

#### 3.5.2.7.0 Sla Targets

##### 3.5.2.7.1 P95

< 2.5s

##### 3.5.2.7.2 P99

N/A

# 4.0.0.0.0 Business Kpi Identification

## 4.1.0.0.0 Critical Business Metrics

### 4.1.1.0.0 gauge

#### 4.1.1.1.0 Name

sales.total_revenue

#### 4.1.1.2.0 Type

🔹 gauge

#### 4.1.1.3.0 Unit

currency

#### 4.1.1.4.0 Description

Total revenue generated from sales orders over a period. Directly supports Sales Trend Analysis (REQ-FUNC-009).

#### 4.1.1.5.0 Business Owner

Analytics Team

#### 4.1.1.6.0 Calculation

SUM(SalesOrder.totalAmount) where status = 'completed'

#### 4.1.1.7.0 Reporting Frequency

Near real-time (updated via CDC)

#### 4.1.1.8.0 Target

Growth > 10% MoM

### 4.1.2.0.0 gauge

#### 4.1.2.1.0 Name

cart.recovery.recovered_value

#### 4.1.2.2.0 Type

🔹 gauge

#### 4.1.2.3.0 Unit

currency

#### 4.1.2.4.0 Description

Total monetary value of sales recovered via the cart recovery feature. Directly measures the effectiveness of REQ-FUNC-020.

#### 4.1.2.5.0 Business Owner

Marketing Team

#### 4.1.2.6.0 Calculation

SUM(SalesOrder.totalAmount) where order originated from a recovery link

#### 4.1.2.7.0 Reporting Frequency

Daily

#### 4.1.2.8.0 Target

> 5% of total revenue

## 4.2.0.0.0 User Engagement Metrics

- {'name': 'users.active.daily', 'type': 'gauge', 'unit': 'count', 'description': 'Number of unique users who have logged in and performed an action within a 24-hour period.', 'segmentation': ['merchantId'], 'cohortAnalysis': False}

## 4.3.0.0.0 Conversion Metrics

- {'name': 'product.conversion.rate', 'type': 'gauge', 'unit': 'percent', 'description': 'The conversion rate for individual products, a key metric for REQ-FUNC-011.', 'funnelStage': 'Product View to Purchase', 'conversionTarget': '> 2%'}

## 4.4.0.0.0 Operational Efficiency Kpis

- {'name': 'data_pipeline.cdc.latency', 'type': 'gauge', 'unit': 'minutes', 'description': 'End-to-end latency from a transaction commit in OLTP to data being available in OLAP. Must be under 5 minutes per REQ-DATA-002.', 'calculation': 'NOW() - source_transaction_commit_timestamp', 'benchmarkTarget': '< 5 minutes'}

## 4.5.0.0.0 Revenue And Cost Metrics

*No items available*

## 4.6.0.0.0 Customer Satisfaction Indicators

*No items available*

# 5.0.0.0.0 Collection Interval Optimization

## 5.1.0.0.0 Sampling Frequencies

### 5.1.1.0.0 Metric Category

#### 5.1.1.1.0 Metric Category

API Performance

#### 5.1.1.2.0 Interval

On every request

#### 5.1.1.3.0 Justification

Required for accurate p95 latency calculation to meet REQ-PERF-001.

#### 5.1.1.4.0 Resource Impact

low

### 5.1.2.0.0 Metric Category

#### 5.1.2.1.0 Metric Category

Database System

#### 5.1.2.2.0 Interval

60s

#### 5.1.2.3.0 Justification

Provides sufficient visibility into database health without excessive monitoring load.

#### 5.1.2.4.0 Resource Impact

low

### 5.1.3.0.0 Metric Category

#### 5.1.3.1.0 Metric Category

Business KPIs

#### 5.1.3.2.0 Interval

300s

#### 5.1.3.3.0 Justification

Business trends do not require sub-minute resolution, allowing for efficient aggregation.

#### 5.1.3.4.0 Resource Impact

low

## 5.2.0.0.0 High Frequency Metrics

- {'name': 'api.gateway.latency', 'interval': 'On request', 'criticality': 'critical', 'costJustification': 'SLA-driven requirement.'}

## 5.3.0.0.0 Cardinality Considerations

- {'metricName': 'api.gateway.requests.count', 'estimatedCardinality': 'medium', 'dimensionStrategy': 'Use a limited, well-defined set of dimensions (endpoint, method). Avoid user IDs or other high-cardinality identifiers.', 'mitigationApproach': 'Aggregate on the agent/client side before sending to the metrics backend if cardinality becomes an issue.'}

## 5.4.0.0.0 Aggregation Periods

- {'metricType': 'Performance (Latency/Duration)', 'periods': ['1m', '5m', '1h', '1d'], 'retentionStrategy': 'Raw data for 7 days, 1m rollups for 30 days, 1h rollups for 1 year.'}

## 5.5.0.0.0 Collection Methods

- {'method': 'real-time', 'applicableMetrics': ['api.gateway.latency', 'lambda.function.duration', 'application.errors.total'], 'implementation': 'Direct emission from cloud provider (e.g., CloudWatch) or APM agent.', 'performance': 'Low overhead.'}

# 6.0.0.0.0 Aggregation Method Selection

## 6.1.0.0.0 Statistical Aggregations

- {'metricName': 'api.gateway.requests.count', 'aggregationFunctions': ['sum', 'rate'], 'windows': ['1m', '5m'], 'justification': 'Sum provides total volume, rate provides throughput.'}

## 6.2.0.0.0 Histogram Requirements

- {'metricName': 'api.gateway.latency', 'buckets': ['50', '100', '200', '500', '1000', '2000'], 'percentiles': ['p50', 'p90', 'p95', 'p99'], 'accuracy': 'High accuracy required around the 200ms mark to validate REQ-PERF-001.'}

## 6.3.0.0.0 Percentile Calculations

- {'metricName': 'lambda.function.duration', 'percentiles': ['p95', 'p99'], 'algorithm': 'hdr', 'accuracy': 'High'}

## 6.4.0.0.0 Metric Types

### 6.4.1.0.0 api.gateway.requests.count

#### 6.4.1.1.0 Name

api.gateway.requests.count

#### 6.4.1.2.0 Implementation

counter

#### 6.4.1.3.0 Reasoning

Represents a monotonically increasing value.

#### 6.4.1.4.0 Resets Handling

Handled by the monitoring system's rate() function.

### 6.4.2.0.0 lambda.function.concurrency.active

#### 6.4.2.1.0 Name

lambda.function.concurrency.active

#### 6.4.2.2.0 Implementation

gauge

#### 6.4.2.3.0 Reasoning

Represents a value that can go up or down.

#### 6.4.2.4.0 Resets Handling

N/A

## 6.5.0.0.0 Dimensional Aggregation

- {'metricName': 'application.errors.total', 'dimensions': ['functionName', 'errorType'], 'aggregationStrategy': 'Sum across all dimensions to get a total, or group by a specific dimension to isolate issues.', 'cardinalityImpact': 'Medium; controlled by the number of functions and defined error types.'}

## 6.6.0.0.0 Derived Metrics

- {'name': 'cache.hit_ratio', 'calculation': 'SUM(cache.hits.count) / (SUM(cache.hits.count) + SUM(cache.misses.count))', 'sourceMetrics': ['cache.hits.count', 'cache.misses.count'], 'updateFrequency': '60s'}

# 7.0.0.0.0 Storage Requirements Planning

## 7.1.0.0.0 Retention Periods

### 7.1.1.0.0 Metric Type

#### 7.1.1.1.0 Metric Type

High-Resolution Performance

#### 7.1.1.2.0 Retention Period

14 days

#### 7.1.1.3.0 Justification

For detailed incident investigation and short-term performance analysis.

#### 7.1.1.4.0 Compliance Requirement

None

### 7.1.2.0.0 Metric Type

#### 7.1.2.1.0 Metric Type

Aggregated Business KPIs

#### 7.1.2.2.0 Retention Period

13 months

#### 7.1.2.3.0 Justification

To support year-over-year trend analysis.

#### 7.1.2.4.0 Compliance Requirement

None

## 7.2.0.0.0 Data Resolution

### 7.2.1.0.0 Time Range

#### 7.2.1.1.0 Time Range

0-14 days

#### 7.2.1.2.0 Resolution

1 minute

#### 7.2.1.3.0 Query Performance

High

#### 7.2.1.4.0 Storage Optimization

Raw data

### 7.2.2.0.0 Time Range

#### 7.2.2.1.0 Time Range

14 days - 13 months

#### 7.2.2.2.0 Resolution

1 hour

#### 7.2.2.3.0 Query Performance

Medium

#### 7.2.2.4.0 Storage Optimization

Downsampled data

## 7.3.0.0.0 Downsampling Strategies

- {'sourceResolution': '1 minute', 'targetResolution': '1 hour', 'aggregationMethod': 'Average for gauges, Sum for counters, Merge for histograms.', 'triggerCondition': 'Automated job running daily.'}

## 7.4.0.0.0 Storage Performance

| Property | Value |
|----------|-------|
| Write Latency | < 2s |
| Query Latency | < 5s for dashboard queries |
| Throughput Requirements | 100,000 data points per minute |
| Scalability Needs | Must scale with application traffic. |

## 7.5.0.0.0 Query Optimization

- {'queryPattern': 'Time-series queries for dashboards', 'optimizationStrategy': 'Pre-aggregation and downsampling.', 'indexingRequirements': ['timestamp', 'metric_name', 'dimensions']}

## 7.6.0.0.0 Cost Optimization

- {'strategy': 'Tiered Retention', 'implementation': 'Automatically downsample and move older, less-critical data to cheaper storage tiers.', 'expectedSavings': '30-50% on storage costs', 'tradeoffs': 'Loss of granularity for historical data.'}

# 8.0.0.0.0 Project Specific Metrics Config

## 8.1.0.0.0 Standard Metrics

*No items available*

## 8.2.0.0.0 Custom Metrics

*No items available*

## 8.3.0.0.0 Dashboard Metrics

*No items available*

# 9.0.0.0.0 Implementation Priority

*No items available*

# 10.0.0.0.0 Risk Assessment

*No items available*

# 11.0.0.0.0 Recommendations

*No items available*

