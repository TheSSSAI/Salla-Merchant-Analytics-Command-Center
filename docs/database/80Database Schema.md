# 1 Title

SaaS Platform OLAP Data Warehouse

# 2 Name

saas_platform_olap_db

# 3 Db Type

- columnar
- timeseries

# 4 Db Technology

ClickHouse

# 5 Entities

## 5.1 SalesFact

### 5.1.1 Name

SalesFact

### 5.1.2 Description

A denormalized, wide table optimized for fast analytical queries on sales data. Powered by a MergeTree engine, it combines data from SalesOrder, OrderItem, Product, Category, and Customer. This table directly supports all reporting in REQ-FUN-300.

### 5.1.3 Attributes

#### 5.1.3.1 DateTime64

##### 5.1.3.1.1 Name

eventDateTime

##### 5.1.3.1.2 Type

🔹 DateTime64

##### 5.1.3.1.3 Is Required

✅ Yes

##### 5.1.3.1.4 Is Primary Key

❌ No

##### 5.1.3.1.5 Size

0

##### 5.1.3.1.6 Is Unique

❌ No

##### 5.1.3.1.7 Constraints

*No items available*

##### 5.1.3.1.8 Precision

3

##### 5.1.3.1.9 Scale

0

##### 5.1.3.1.10 Is Foreign Key

❌ No

#### 5.1.3.2.0 UUID

##### 5.1.3.2.1 Name

merchantId

##### 5.1.3.2.2 Type

🔹 UUID

##### 5.1.3.2.3 Is Required

✅ Yes

##### 5.1.3.2.4 Is Primary Key

❌ No

##### 5.1.3.2.5 Size

0

##### 5.1.3.2.6 Is Unique

❌ No

##### 5.1.3.2.7 Constraints

*No items available*

##### 5.1.3.2.8 Precision

0

##### 5.1.3.2.9 Scale

0

##### 5.1.3.2.10 Is Foreign Key

❌ No

#### 5.1.3.3.0 UUID

##### 5.1.3.3.1 Name

orderId

##### 5.1.3.3.2 Type

🔹 UUID

##### 5.1.3.3.3 Is Required

✅ Yes

##### 5.1.3.3.4 Is Primary Key

❌ No

##### 5.1.3.3.5 Size

0

##### 5.1.3.3.6 Is Unique

❌ No

##### 5.1.3.3.7 Constraints

*No items available*

##### 5.1.3.3.8 Precision

0

##### 5.1.3.3.9 Scale

0

##### 5.1.3.3.10 Is Foreign Key

❌ No

#### 5.1.3.4.0 UUID

##### 5.1.3.4.1 Name

customerId

##### 5.1.3.4.2 Type

🔹 UUID

##### 5.1.3.4.3 Is Required

✅ Yes

##### 5.1.3.4.4 Is Primary Key

❌ No

##### 5.1.3.4.5 Size

0

##### 5.1.3.4.6 Is Unique

❌ No

##### 5.1.3.4.7 Constraints

*No items available*

##### 5.1.3.4.8 Precision

0

##### 5.1.3.4.9 Scale

0

##### 5.1.3.4.10 Is Foreign Key

❌ No

#### 5.1.3.5.0 UUID

##### 5.1.3.5.1 Name

productId

##### 5.1.3.5.2 Type

🔹 UUID

##### 5.1.3.5.3 Is Required

✅ Yes

##### 5.1.3.5.4 Is Primary Key

❌ No

##### 5.1.3.5.5 Size

0

##### 5.1.3.5.6 Is Unique

❌ No

##### 5.1.3.5.7 Constraints

*No items available*

##### 5.1.3.5.8 Precision

0

##### 5.1.3.5.9 Scale

0

##### 5.1.3.5.10 Is Foreign Key

❌ No

#### 5.1.3.6.0 UUID

##### 5.1.3.6.1 Name

categoryId

##### 5.1.3.6.2 Type

🔹 UUID

##### 5.1.3.6.3 Is Required

✅ Yes

##### 5.1.3.6.4 Is Primary Key

❌ No

##### 5.1.3.6.5 Size

0

##### 5.1.3.6.6 Is Unique

❌ No

##### 5.1.3.6.7 Constraints

*No items available*

##### 5.1.3.6.8 Precision

0

##### 5.1.3.6.9 Scale

0

##### 5.1.3.6.10 Is Foreign Key

❌ No

#### 5.1.3.7.0 String

##### 5.1.3.7.1 Name

customerCountry

##### 5.1.3.7.2 Type

🔹 String

##### 5.1.3.7.3 Is Required

❌ No

##### 5.1.3.7.4 Is Primary Key

❌ No

##### 5.1.3.7.5 Size

0

##### 5.1.3.7.6 Is Unique

❌ No

##### 5.1.3.7.7 Constraints

*No items available*

##### 5.1.3.7.8 Precision

0

##### 5.1.3.7.9 Scale

0

##### 5.1.3.7.10 Is Foreign Key

❌ No

#### 5.1.3.8.0 String

##### 5.1.3.8.1 Name

customerCity

##### 5.1.3.8.2 Type

🔹 String

##### 5.1.3.8.3 Is Required

❌ No

##### 5.1.3.8.4 Is Primary Key

❌ No

##### 5.1.3.8.5 Size

0

##### 5.1.3.8.6 Is Unique

❌ No

##### 5.1.3.8.7 Constraints

*No items available*

##### 5.1.3.8.8 Precision

0

##### 5.1.3.8.9 Scale

0

##### 5.1.3.8.10 Is Foreign Key

❌ No

#### 5.1.3.9.0 UInt32

##### 5.1.3.9.1 Name

quantity

##### 5.1.3.9.2 Type

🔹 UInt32

##### 5.1.3.9.3 Is Required

✅ Yes

##### 5.1.3.9.4 Is Primary Key

❌ No

##### 5.1.3.9.5 Size

0

##### 5.1.3.9.6 Is Unique

❌ No

##### 5.1.3.9.7 Constraints

*No items available*

##### 5.1.3.9.8 Precision

0

##### 5.1.3.9.9 Scale

0

##### 5.1.3.9.10 Is Foreign Key

❌ No

#### 5.1.3.10.0 Decimal(10, 2)

##### 5.1.3.10.1 Name

revenue

##### 5.1.3.10.2 Type

🔹 Decimal(10, 2)

##### 5.1.3.10.3 Is Required

✅ Yes

##### 5.1.3.10.4 Is Primary Key

❌ No

##### 5.1.3.10.5 Size

0

##### 5.1.3.10.6 Is Unique

❌ No

##### 5.1.3.10.7 Constraints

*No items available*

##### 5.1.3.10.8 Precision

10

##### 5.1.3.10.9 Scale

2

##### 5.1.3.10.10 Is Foreign Key

❌ No

#### 5.1.3.11.0 LowCardinality(String)

##### 5.1.3.11.1 Name

orderStatus

##### 5.1.3.11.2 Type

🔹 LowCardinality(String)

##### 5.1.3.11.3 Is Required

✅ Yes

##### 5.1.3.11.4 Is Primary Key

❌ No

##### 5.1.3.11.5 Size

0

##### 5.1.3.11.6 Is Unique

❌ No

##### 5.1.3.11.7 Constraints

*No items available*

##### 5.1.3.11.8 Precision

0

##### 5.1.3.11.9 Scale

0

##### 5.1.3.11.10 Is Foreign Key

❌ No

### 5.1.4.0.0 Primary Keys

*No items available*

### 5.1.5.0.0 Unique Constraints

*No items available*

### 5.1.6.0.0 Indexes

- {'name': 'sorting_key', 'columns': ['merchantId', 'eventDateTime', 'productId', 'customerId'], 'type': 'MergeTree'}

## 5.2.0.0.0 AbandonedCartFact

### 5.2.1.0.0 Name

AbandonedCartFact

### 5.2.2.0.0 Description

A denormalized table for analyzing abandoned cart events and the effectiveness of recovery campaigns (REQ-FUN-504). Powered by a MergeTree engine.

### 5.2.3.0.0 Attributes

#### 5.2.3.1.0 DateTime64

##### 5.2.3.1.1 Name

eventDateTime

##### 5.2.3.1.2 Type

🔹 DateTime64

##### 5.2.3.1.3 Is Required

✅ Yes

##### 5.2.3.1.4 Is Primary Key

❌ No

##### 5.2.3.1.5 Size

0

##### 5.2.3.1.6 Is Unique

❌ No

##### 5.2.3.1.7 Constraints

*No items available*

##### 5.2.3.1.8 Precision

3

##### 5.2.3.1.9 Scale

0

##### 5.2.3.1.10 Is Foreign Key

❌ No

#### 5.2.3.2.0 UUID

##### 5.2.3.2.1 Name

merchantId

##### 5.2.3.2.2 Type

🔹 UUID

##### 5.2.3.2.3 Is Required

✅ Yes

##### 5.2.3.2.4 Is Primary Key

❌ No

##### 5.2.3.2.5 Size

0

##### 5.2.3.2.6 Is Unique

❌ No

##### 5.2.3.2.7 Constraints

*No items available*

##### 5.2.3.2.8 Precision

0

##### 5.2.3.2.9 Scale

0

##### 5.2.3.2.10 Is Foreign Key

❌ No

#### 5.2.3.3.0 UUID

##### 5.2.3.3.1 Name

abandonedCartId

##### 5.2.3.3.2 Type

🔹 UUID

##### 5.2.3.3.3 Is Required

✅ Yes

##### 5.2.3.3.4 Is Primary Key

❌ No

##### 5.2.3.3.5 Size

0

##### 5.2.3.3.6 Is Unique

❌ No

##### 5.2.3.3.7 Constraints

*No items available*

##### 5.2.3.3.8 Precision

0

##### 5.2.3.3.9 Scale

0

##### 5.2.3.3.10 Is Foreign Key

❌ No

#### 5.2.3.4.0 UUID

##### 5.2.3.4.1 Name

customerId

##### 5.2.3.4.2 Type

🔹 UUID

##### 5.2.3.4.3 Is Required

✅ Yes

##### 5.2.3.4.4 Is Primary Key

❌ No

##### 5.2.3.4.5 Size

0

##### 5.2.3.4.6 Is Unique

❌ No

##### 5.2.3.4.7 Constraints

*No items available*

##### 5.2.3.4.8 Precision

0

##### 5.2.3.4.9 Scale

0

##### 5.2.3.4.10 Is Foreign Key

❌ No

#### 5.2.3.5.0 Decimal(10, 2)

##### 5.2.3.5.1 Name

totalValue

##### 5.2.3.5.2 Type

🔹 Decimal(10, 2)

##### 5.2.3.5.3 Is Required

✅ Yes

##### 5.2.3.5.4 Is Primary Key

❌ No

##### 5.2.3.5.5 Size

0

##### 5.2.3.5.6 Is Unique

❌ No

##### 5.2.3.5.7 Constraints

*No items available*

##### 5.2.3.5.8 Precision

10

##### 5.2.3.5.9 Scale

2

##### 5.2.3.5.10 Is Foreign Key

❌ No

#### 5.2.3.6.0 LowCardinality(String)

##### 5.2.3.6.1 Name

status

##### 5.2.3.6.2 Type

🔹 LowCardinality(String)

##### 5.2.3.6.3 Is Required

✅ Yes

##### 5.2.3.6.4 Is Primary Key

❌ No

##### 5.2.3.6.5 Size

0

##### 5.2.3.6.6 Is Unique

❌ No

##### 5.2.3.6.7 Constraints

*No items available*

##### 5.2.3.6.8 Precision

0

##### 5.2.3.6.9 Scale

0

##### 5.2.3.6.10 Is Foreign Key

❌ No

#### 5.2.3.7.0 Nullable(UUID)

##### 5.2.3.7.1 Name

recoveryCampaignId

##### 5.2.3.7.2 Type

🔹 Nullable(UUID)

##### 5.2.3.7.3 Is Required

❌ No

##### 5.2.3.7.4 Is Primary Key

❌ No

##### 5.2.3.7.5 Size

0

##### 5.2.3.7.6 Is Unique

❌ No

##### 5.2.3.7.7 Constraints

*No items available*

##### 5.2.3.7.8 Precision

0

##### 5.2.3.7.9 Scale

0

##### 5.2.3.7.10 Is Foreign Key

❌ No

### 5.2.4.0.0 Primary Keys

*No items available*

### 5.2.5.0.0 Unique Constraints

*No items available*

### 5.2.6.0.0 Indexes

- {'name': 'sorting_key', 'columns': ['merchantId', 'eventDateTime', 'status'], 'type': 'MergeTree'}

