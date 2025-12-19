# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Technology Stack

- TypeScript 5.4
- Node.js 20.x
- Serverless (AWS Lambda)
- PostgreSQL 16
- ClickHouse
- Redis 7.x
- React 18

## 1.3 Metrics Configuration

- Serverless APM & Distributed Tracing (e.g., AWS X-Ray)
- Centralized Log Aggregation (e.g., CloudWatch Logs)
- Frontend Real User Monitoring (RUM)
- Cloud Infrastructure Monitoring (e.g., CloudWatch Metrics)

## 1.4 Monitoring Needs

- API Performance SLO Adherence (p95 < 200ms)
- Frontend Responsiveness (LCP < 2.5s)
- Data Pipeline Health and Latency (< 5 min)
- Third-Party API Integration Stability (OpenAI)
- Overall System Availability and Error Rates

## 1.5 Environment

production

# 2.0 Alert Condition And Threshold Design

## 2.1 Critical Metrics Alerts

### 2.1.1 Metric

#### 2.1.1.1 Metric

APIGateway.5xxError.Rate

#### 2.1.1.2 Condition

Average > 2% over 5 minutes

#### 2.1.1.3 Threshold Type

static

#### 2.1.1.4 Value

2

#### 2.1.1.5 Justification

Indicates a significant backend failure impacting a wide range of users. A sustained rate above a low threshold suggests systemic issues rather than transient faults.

#### 2.1.1.6 Business Impact

High - Prevents users from accessing core functionality, directly impacting usability and trust.

### 2.1.2.0 Metric

#### 2.1.2.1 Metric

APIGateway.Latency.p95

#### 2.1.2.2 Condition

p95 > 200ms for 5 minutes

#### 2.1.2.3 Threshold Type

static

#### 2.1.2.4 Value

200

#### 2.1.2.5 Justification

Directly measures the violation of the critical performance requirement REQ-PERF-001, indicating a poor user experience for a significant number of users.

#### 2.1.2.6 Business Impact

High - Degraded user experience, potential for user frustration and abandonment.

### 2.1.3.0 Metric

#### 2.1.3.1 Metric

DataPipeline_DLQ.ApproximateNumberOfMessagesVisible

#### 2.1.3.2 Condition

> 0 for 5 minutes

#### 2.1.3.3 Threshold Type

static

#### 2.1.3.4 Value

0

#### 2.1.3.5 Justification

Each message in the Dead Letter Queue represents a failed data synchronization event. This directly impacts data integrity in the OLAP system and the validity of all analytics, violating REQ-DATA-002.

#### 2.1.3.6 Business Impact

Critical - Leads to incorrect or stale analytics, business reports, and AI insights, potentially causing poor business decisions.

### 2.1.4.0 Metric

#### 2.1.4.1 Metric

DataPipeline.EndToEnd.Latency

#### 2.1.4.2 Condition

Average > 5 minutes over a 15-minute period

#### 2.1.4.3 Threshold Type

static

#### 2.1.4.4 Value

300000

#### 2.1.4.5 Justification

Violation of the data freshness requirement (REQ-DATA-002). Sustained high latency indicates a bottleneck or failure in the CDC process.

#### 2.1.4.6 Business Impact

Medium - Business insights are delayed, reducing the value of real-time analytics.

### 2.1.5.0 Metric

#### 2.1.5.1 Metric

RUM.LCP.p75

#### 2.1.5.2 Condition

p75 > 2.5s for 10 minutes

#### 2.1.5.3 Threshold Type

static

#### 2.1.5.4 Value

2.5

#### 2.1.5.5 Justification

Measures the violation of the frontend performance requirement REQ-PERF-003. A poor LCP leads to a perception of a slow and unresponsive application.

#### 2.1.5.6 Business Impact

Medium - Poor first impression for users, increased bounce rate, negative impact on user satisfaction.

### 2.1.6.0 Metric

#### 2.1.6.1 Metric

ExternalAPI.OpenAI.CircuitBreaker.State

#### 2.1.6.2 Condition

State changes to 'Open'

#### 2.1.6.3 Threshold Type

static

#### 2.1.6.4 Value

1

#### 2.1.6.5 Justification

The circuit breaker opening indicates a complete and sustained failure of the OpenAI integration (REQ-INTG-004), rendering the AI Assistant feature non-functional.

#### 2.1.6.6 Business Impact

High - A key differentiating feature (AI Assistant) is unavailable to all users.

### 2.1.7.0 Metric

#### 2.1.7.1 Metric

RDS_PostgreSQL.CPUUtilization.Average

#### 2.1.7.2 Condition

> 85% for 15 minutes

#### 2.1.7.3 Threshold Type

static

#### 2.1.7.4 Value

85

#### 2.1.7.5 Justification

Proactive alert indicating sustained, high load on the primary OLTP database, which is a precursor to performance degradation, timeouts, and potential outages across the entire application.

#### 2.1.7.6 Business Impact

High - Imminent risk of widespread application slowdowns or outage.

## 2.2.0.0 Threshold Strategies

*No items available*

## 2.3.0.0 Baseline Deviation Alerts

*No items available*

## 2.4.0.0 Predictive Alerts

*No items available*

## 2.5.0.0 Compound Conditions

- {'name': 'Database Outage Impact', 'conditions': ['RDS_PostgreSQL.CPUUtilization.Average > 95%', 'APIGateway.5xxError.Rate > 5%'], 'logic': 'AND', 'timeWindow': '5 minutes', 'justification': 'Correlates a high API error rate directly with a critical database health issue, allowing for faster root cause identification and suppression of dependent alerts.'}

# 3.0.0.0 Severity Level Classification

## 3.1.0.0 Severity Definitions

### 3.1.1.0 Level

#### 3.1.1.1 Level

🚨 Critical

#### 3.1.1.2 Criteria

System-wide outage, critical feature failure for all users, data loss/corruption, or security breach.

#### 3.1.1.3 Business Impact

Immediate and severe revenue, reputation, or operational impact. All hands on deck.

#### 3.1.1.4 Customer Impact

Service is unavailable or unusable for most/all customers.

#### 3.1.1.5 Response Time

< 5 minutes acknowledgment

#### 3.1.1.6 Escalation Required

✅ Yes

### 3.1.2.0 Level

#### 3.1.2.1 Level

🔴 High

#### 3.1.2.2 Criteria

Critical SLO/SLA breach, major feature failure, or imminent risk of system-wide outage.

#### 3.1.2.3 Business Impact

Significant impact on business operations or customer experience.

#### 3.1.2.4 Customer Impact

Core functionality is non-functional or severely degraded for a large subset of users.

#### 3.1.2.5 Response Time

< 15 minutes acknowledgment

#### 3.1.2.6 Escalation Required

✅ Yes

### 3.1.3.0 Level

#### 3.1.3.1 Level

🟡 Medium

#### 3.1.3.2 Criteria

Non-critical feature failure, performance degradation not violating a critical SLO, or high rate of non-critical errors.

#### 3.1.3.3 Business Impact

Moderate impact, can be addressed during business hours.

#### 3.1.3.4 Customer Impact

Minor functionality is impaired or the service is slow for some users.

#### 3.1.3.5 Response Time

< 1 hour acknowledgment

#### 3.1.3.6 Escalation Required

❌ No

### 3.1.4.0 Level

#### 3.1.4.1 Level

🟢 Low

#### 3.1.4.2 Criteria

Informational alerts, warnings of potential future issues, or low-impact errors.

#### 3.1.4.3 Business Impact

Minimal impact, should be logged and reviewed.

#### 3.1.4.4 Customer Impact

Negligible to no direct customer impact.

#### 3.1.4.5 Response Time

Best Effort

#### 3.1.4.6 Escalation Required

❌ No

## 3.2.0.0 Business Impact Matrix

*No items available*

## 3.3.0.0 Customer Impact Criteria

*No items available*

## 3.4.0.0 Sla Violation Severity

*No items available*

## 3.5.0.0 System Health Severity

*No items available*

# 4.0.0.0 Notification Channel Strategy

## 4.1.0.0 Channel Configuration

### 4.1.1.0 Channel

#### 4.1.1.1 Channel

pagerduty

#### 4.1.1.2 Purpose

Primary on-call alerting for actionable, urgent incidents.

#### 4.1.1.3 Applicable Severities

- Critical
- High

#### 4.1.1.4 Time Constraints

24/7

#### 4.1.1.5 Configuration

*No data available*

### 4.1.2.0 Channel

#### 4.1.2.1 Channel

slack

#### 4.1.2.2 Purpose

Real-time awareness and collaboration for all alert severities.

#### 4.1.2.3 Applicable Severities

- Critical
- High
- Medium
- Low

#### 4.1.2.4 Time Constraints

24/7

#### 4.1.2.5 Configuration

*No data available*

### 4.1.3.0 Channel

#### 4.1.3.1 Channel

email

#### 4.1.3.2 Purpose

Non-urgent notifications and daily/weekly summary reports.

#### 4.1.3.3 Applicable Severities

- Low

#### 4.1.3.4 Time Constraints

Business Hours

#### 4.1.3.5 Configuration

*No data available*

### 4.1.4.0 Channel

#### 4.1.4.1 Channel

webhook

#### 4.1.4.2 Purpose

Automated ticketing and integration with issue tracking systems.

#### 4.1.4.3 Applicable Severities

- Medium
- Low

#### 4.1.4.4 Time Constraints

24/7

#### 4.1.4.5 Configuration

##### 4.1.4.5.1 Target System

Jira

## 4.2.0.0.0 Routing Rules

### 4.2.1.0.0 Condition

#### 4.2.1.1.0 Condition

Any

#### 4.2.1.2.0 Severity

Critical

#### 4.2.1.3.0 Alert Type

*

#### 4.2.1.4.0 Channels

- pagerduty
- slack

#### 4.2.1.5.0 Priority

🔹 1

### 4.2.2.0.0 Condition

#### 4.2.2.1.0 Condition

Any

#### 4.2.2.2.0 Severity

High

#### 4.2.2.3.0 Alert Type

*

#### 4.2.2.4.0 Channels

- pagerduty
- slack

#### 4.2.2.5.0 Priority

🔹 2

### 4.2.3.0.0 Condition

#### 4.2.3.1.0 Condition

Any

#### 4.2.3.2.0 Severity

Medium

#### 4.2.3.3.0 Alert Type

*

#### 4.2.3.4.0 Channels

- slack
- webhook

#### 4.2.3.5.0 Priority

🔹 3

## 4.3.0.0.0 Time Based Routing

*No items available*

## 4.4.0.0.0 Ticketing Integration

*No items available*

## 4.5.0.0.0 Emergency Notifications

*No items available*

## 4.6.0.0.0 Chat Platform Integration

*No items available*

# 5.0.0.0.0 Alert Correlation Implementation

## 5.1.0.0.0 Grouping Requirements

- {'groupingCriteria': 'traceId', 'timeWindow': '60 seconds', 'maxGroupSize': 100, 'suppressionStrategy': 'Group multiple alerts originating from the same user request or transaction to reduce notification noise.'}

## 5.2.0.0.0 Parent Child Relationships

- {'parentCondition': 'Database_High_CPU fires as Critical', 'childConditions': ['API_High_5xx_Error_Rate', 'API_P95_Latency_Breach'], 'suppressionDuration': '30 minutes', 'propagationRules': 'If a parent alert is active, suppress notifications for child alerts to focus response on the root cause.'}

## 5.3.0.0.0 Topology Based Correlation

*No items available*

## 5.4.0.0.0 Time Window Correlation

*No items available*

## 5.5.0.0.0 Causal Relationship Detection

*No items available*

## 5.6.0.0.0 Maintenance Window Suppression

- {'maintenanceType': 'Scheduled Deployments, Database Migrations', 'suppressionScope': ['All'], 'automaticDetection': False, 'manualOverride': True}

# 6.0.0.0.0 False Positive Mitigation

## 6.1.0.0.0 Noise Reduction Strategies

- {'strategy': 'Time-based Thresholding', 'implementation': "All alert conditions include a 'for X minutes' clause to ensure the condition is sustained before firing, filtering out transient spikes.", 'applicableAlerts': ['All'], 'effectiveness': 'High'}

## 6.2.0.0.0 Confirmation Counts

*No items available*

## 6.3.0.0.0 Dampening And Flapping

- {'metric': 'ExternalAPI.OpenAI.CircuitBreaker.State', 'dampeningPeriod': '5 minutes', 'flappingThreshold': 3, 'suppressionDuration': '15 minutes'}

## 6.4.0.0.0 Alert Validation

*No items available*

## 6.5.0.0.0 Smart Filtering

*No items available*

## 6.6.0.0.0 Quorum Based Alerting

*No items available*

# 7.0.0.0.0 On Call Management Integration

## 7.1.0.0.0 Escalation Paths

- {'severity': 'Critical', 'escalationLevels': [{'level': 1, 'recipients': ['Primary On-Call Engineer'], 'escalationTime': '10 minutes', 'requiresAcknowledgment': True}, {'level': 2, 'recipients': ['Secondary On-Call Engineer', 'Engineering Lead'], 'escalationTime': '10 minutes', 'requiresAcknowledgment': True}], 'ultimateEscalation': 'Head of Engineering'}

## 7.2.0.0.0 Escalation Timeframes

*No items available*

## 7.3.0.0.0 On Call Rotation

*No items available*

## 7.4.0.0.0 Acknowledgment Requirements

### 7.4.1.0.0 Severity

#### 7.4.1.1.0 Severity

Critical

#### 7.4.1.2.0 Acknowledgment Timeout

10 minutes

#### 7.4.1.3.0 Auto Escalation

✅ Yes

#### 7.4.1.4.0 Requires Comment

❌ No

### 7.4.2.0.0 Severity

#### 7.4.2.1.0 Severity

High

#### 7.4.2.2.0 Acknowledgment Timeout

15 minutes

#### 7.4.2.3.0 Auto Escalation

✅ Yes

#### 7.4.2.4.0 Requires Comment

❌ No

## 7.5.0.0.0 Incident Ownership

*No items available*

## 7.6.0.0.0 Follow The Sun Support

*No items available*

# 8.0.0.0.0 Project Specific Alerts Config

## 8.1.0.0.0 Alerts

### 8.1.1.0.0 API High 5xx Error Rate

#### 8.1.1.1.0 Name

API High 5xx Error Rate

#### 8.1.1.2.0 Description

Triggers when the percentage of server-side errors (5xx) from the API Gateway exceeds 2% over a 5-minute period.

#### 8.1.1.3.0 Condition

Average(APIGateway.5xxError.Rate) > 2% for 5m

#### 8.1.1.4.0 Threshold

2%

#### 8.1.1.5.0 Severity

Critical

#### 8.1.1.6.0 Channels

- pagerduty
- slack

#### 8.1.1.7.0 Correlation

##### 8.1.1.7.1 Group Id

api-health

##### 8.1.1.7.2 Suppression Rules

- Suppress if Database_High_CPU is active

#### 8.1.1.8.0 Escalation

##### 8.1.1.8.1 Enabled

✅ Yes

##### 8.1.1.8.2 Escalation Time

10 minutes

##### 8.1.1.8.3 Escalation Path

- Primary On-Call
- Secondary On-Call

#### 8.1.1.9.0 Suppression

| Property | Value |
|----------|-------|
| Maintenance Window | ✅ |
| Dependency Failure | ✅ |
| Manual Override | ✅ |

#### 8.1.1.10.0 Validation

##### 8.1.1.10.1 Confirmation Count

0

##### 8.1.1.10.2 Confirmation Window

0

#### 8.1.1.11.0 Remediation

##### 8.1.1.11.1 Automated Actions

*No items available*

##### 8.1.1.11.2 Runbook Url

🔗 [https://runbooks.example.com/api/high-5xx-errors](https://runbooks.example.com/api/high-5xx-errors)

##### 8.1.1.11.3 Troubleshooting Steps

- Check APM traces for correlated errors in backend Lambda functions.
- Inspect centralized logs for uncaught exceptions.
- Verify health of downstream dependencies (Database, Cache).

### 8.1.2.0.0 CDC Pipeline DLQ Not Empty

#### 8.1.2.1.0 Name

CDC Pipeline DLQ Not Empty

#### 8.1.2.2.0 Description

Triggers when any message lands in the data ingestion pipeline's Dead Letter Queue, indicating a failed data sync event.

#### 8.1.2.3.0 Condition

Max(DataPipeline_DLQ.ApproximateNumberOfMessagesVisible) > 0 for 5m

#### 8.1.2.4.0 Threshold

> 0

#### 8.1.2.5.0 Severity

Critical

#### 8.1.2.6.0 Channels

- pagerduty
- slack

#### 8.1.2.7.0 Correlation

##### 8.1.2.7.1 Group Id

data-pipeline-health

##### 8.1.2.7.2 Suppression Rules

*No items available*

#### 8.1.2.8.0 Escalation

##### 8.1.2.8.1 Enabled

✅ Yes

##### 8.1.2.8.2 Escalation Time

10 minutes

##### 8.1.2.8.3 Escalation Path

- Primary On-Call
- Data Engineering Lead

#### 8.1.2.9.0 Suppression

| Property | Value |
|----------|-------|
| Maintenance Window | ✅ |
| Dependency Failure | ❌ |
| Manual Override | ✅ |

#### 8.1.2.10.0 Validation

##### 8.1.2.10.1 Confirmation Count

0

##### 8.1.2.10.2 Confirmation Window

0

#### 8.1.2.11.0 Remediation

##### 8.1.2.11.1 Automated Actions

*No items available*

##### 8.1.2.11.2 Runbook Url

🔗 [https://runbooks.example.com/data/dlq-investigation](https://runbooks.example.com/data/dlq-investigation)

##### 8.1.2.11.3 Troubleshooting Steps

- Inspect message(s) in the DLQ to identify the malformed data or processing error.
- Analyze consumer function logs for the root cause.
- Deploy fix and redrive messages from DLQ to main queue.

### 8.1.3.0.0 API P95 Latency SLO Breach

#### 8.1.3.1.0 Name

API P95 Latency SLO Breach

#### 8.1.3.2.0 Description

Triggers when the 95th percentile latency for the API Gateway exceeds the 200ms SLO defined in REQ-PERF-001.

#### 8.1.3.3.0 Condition

p95(APIGateway.Latency) > 200ms for 5m

#### 8.1.3.4.0 Threshold

200ms

#### 8.1.3.5.0 Severity

High

#### 8.1.3.6.0 Channels

- pagerduty
- slack

#### 8.1.3.7.0 Correlation

##### 8.1.3.7.1 Group Id

api-health

##### 8.1.3.7.2 Suppression Rules

- Suppress if Database_High_CPU is active

#### 8.1.3.8.0 Escalation

##### 8.1.3.8.1 Enabled

✅ Yes

##### 8.1.3.8.2 Escalation Time

15 minutes

##### 8.1.3.8.3 Escalation Path

- Primary On-Call

#### 8.1.3.9.0 Suppression

| Property | Value |
|----------|-------|
| Maintenance Window | ✅ |
| Dependency Failure | ✅ |
| Manual Override | ✅ |

#### 8.1.3.10.0 Validation

##### 8.1.3.10.1 Confirmation Count

0

##### 8.1.3.10.2 Confirmation Window

0

#### 8.1.3.11.0 Remediation

##### 8.1.3.11.1 Automated Actions

*No items available*

##### 8.1.3.11.2 Runbook Url

🔗 [https://runbooks.example.com/api/high-latency](https://runbooks.example.com/api/high-latency)

##### 8.1.3.11.3 Troubleshooting Steps

- Use APM/Tracing tool to identify the slowest API endpoints and transactions.
- Analyze traces to pinpoint bottlenecks in specific Lambda functions or downstream calls (DB, Cache).
- Check for Lambda cold starts or high resource utilization.

## 8.2.0.0.0 Alert Groups

*No items available*

## 8.3.0.0.0 Notification Templates

*No items available*

# 9.0.0.0.0 Implementation Priority

## 9.1.0.0.0 Component

### 9.1.1.0.0 Component

Core Availability Alerts (5xx, Latency)

### 9.1.2.0.0 Priority

🔴 high

### 9.1.3.0.0 Dependencies

- APM Tooling
- CloudWatch Metrics

### 9.1.4.0.0 Estimated Effort

Medium

### 9.1.5.0.0 Risk Level

low

## 9.2.0.0.0 Component

### 9.2.1.0.0 Component

Data Pipeline Integrity Alerts (DLQ, Latency)

### 9.2.2.0.0 Priority

🔴 high

### 9.2.3.0.0 Dependencies

- CloudWatch Metrics

### 9.2.4.0.0 Estimated Effort

Medium

### 9.2.5.0.0 Risk Level

medium

## 9.3.0.0.0 Component

### 9.3.1.0.0 Component

Frontend Performance Alerts (LCP)

### 9.3.2.0.0 Priority

🟡 medium

### 9.3.3.0.0 Dependencies

- RUM Tooling

### 9.3.4.0.0 Estimated Effort

Medium

### 9.3.5.0.0 Risk Level

low

## 9.4.0.0.0 Component

### 9.4.1.0.0 Component

Dependency & Infrastructure Alerts (DB CPU, Circuit Breaker)

### 9.4.2.0.0 Priority

🟡 medium

### 9.4.3.0.0 Dependencies

- APM Tooling
- CloudWatch Metrics

### 9.4.4.0.0 Estimated Effort

High

### 9.4.5.0.0 Risk Level

medium

# 10.0.0.0.0 Risk Assessment

## 10.1.0.0.0 Risk

### 10.1.1.0.0 Risk

Alert Fatigue

### 10.1.2.0.0 Impact

high

### 10.1.3.0.0 Probability

high

### 10.1.4.0.0 Mitigation

Strictly limit alerts to those that are actionable and indicate clear user impact. Use 'for X minutes' conditions, alert correlation, and dependency-aware suppression. Every alert must have a runbook.

### 10.1.5.0.0 Contingency Plan

Conduct regular (quarterly) alert reviews to tune thresholds and remove noisy or non-actionable alerts. Monitor alert acknowledgment rates and MTTR as KPIs for alert effectiveness.

## 10.2.0.0.0 Risk

### 10.2.1.0.0 Risk

Monitoring Gaps

### 10.2.2.0.0 Impact

high

### 10.2.3.0.0 Probability

medium

### 10.2.4.0.0 Mitigation

Ensure monitoring covers all critical user journeys and system components identified in the architecture. Implement synthetic monitoring for proactive health checks.

### 10.2.5.0.0 Contingency Plan

Conduct post-incident reviews for any incident not caught by an alert to identify and close monitoring gaps.

# 11.0.0.0.0 Recommendations

## 11.1.0.0.0 Category

### 11.1.1.0.0 Category

🔹 Process

### 11.1.2.0.0 Recommendation

Mandate the creation of a runbook for every new alert.

### 11.1.3.0.0 Justification

An alert without a clear, documented first response is just noise. Runbooks ensure that on-call engineers can act quickly and consistently, reducing Mean Time To Resolution (MTTR).

### 11.1.4.0.0 Priority

🔴 high

### 11.1.5.0.0 Implementation Notes

Store runbooks in a centralized, version-controlled location (e.g., a Git repo, Confluence) and link directly from the alert notification.

## 11.2.0.0.0 Category

### 11.2.1.0.0 Category

🔹 Tooling

### 11.2.2.0.0 Recommendation

Implement end-to-end distributed tracing from day one.

### 11.2.3.0.0 Justification

In a serverless, distributed architecture, tracing is not a 'nice-to-have'; it is essential for debugging performance issues (REQ-PERF-001) and errors across multiple functions and services.

### 11.2.4.0.0 Priority

🔴 high

### 11.2.5.0.0 Implementation Notes

Ensure the trace context (traceId) is propagated from the API Gateway through all Lambda functions and included in all structured logs.

## 11.3.0.0.0 Category

### 11.3.1.0.0 Category

🔹 Strategy

### 11.3.2.0.0 Recommendation

Start with a small set of high-signal, SLO-based alerts and expand cautiously.

### 11.3.3.0.0 Justification

It is better to have three essential alerts that are always acted upon than thirty alerts that are often ignored. Focusing on user-impact and SLO violations ensures the team's attention is directed to what matters most.

### 11.3.4.0.0 Priority

🔴 high

### 11.3.5.0.0 Implementation Notes

Prioritize implementing the 'Critical' and 'High' severity alerts defined in this document first. Gather data on system performance before adding more sensitive or proactive alerts.

