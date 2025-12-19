# 1 Title

SaaS Platform OLTP & Vector Database

# 2 Name

saas_platform_oltp_db

# 3 Db Type

- relational
- vector

# 4 Db Technology

PostgreSQL

# 5 Entities

## 5.1 User

### 5.1.1 Name

User

### 5.1.2 Description

Represents system users with authentication and profile information. A user can belong to multiple merchant accounts.

### 5.1.3 Attributes

#### 5.1.3.1 UUID

##### 5.1.3.1.1 Name

userId

##### 5.1.3.1.2 Type

🔹 UUID

##### 5.1.3.1.3 Is Required

✅ Yes

##### 5.1.3.1.4 Is Primary Key

✅ Yes

##### 5.1.3.1.5 Size

0

##### 5.1.3.1.6 Is Unique

✅ Yes

##### 5.1.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.1.3.1.8 Precision

0

##### 5.1.3.1.9 Scale

0

##### 5.1.3.1.10 Is Foreign Key

❌ No

#### 5.1.3.2.0 VARCHAR

##### 5.1.3.2.1 Name

email

##### 5.1.3.2.2 Type

🔹 VARCHAR

##### 5.1.3.2.3 Is Required

✅ Yes

##### 5.1.3.2.4 Is Primary Key

❌ No

##### 5.1.3.2.5 Size

255

##### 5.1.3.2.6 Is Unique

✅ Yes

##### 5.1.3.2.7 Constraints

*No items available*

##### 5.1.3.2.8 Precision

0

##### 5.1.3.2.9 Scale

0

##### 5.1.3.2.10 Is Foreign Key

❌ No

#### 5.1.3.3.0 VARCHAR

##### 5.1.3.3.1 Name

firstName

##### 5.1.3.3.2 Type

🔹 VARCHAR

##### 5.1.3.3.3 Is Required

❌ No

##### 5.1.3.3.4 Is Primary Key

❌ No

##### 5.1.3.3.5 Size

100

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

#### 5.1.3.4.0 VARCHAR

##### 5.1.3.4.1 Name

lastName

##### 5.1.3.4.2 Type

🔹 VARCHAR

##### 5.1.3.4.3 Is Required

❌ No

##### 5.1.3.4.4 Is Primary Key

❌ No

##### 5.1.3.4.5 Size

100

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

#### 5.1.3.5.0 VARCHAR

##### 5.1.3.5.1 Name

passwordHash

##### 5.1.3.5.2 Type

🔹 VARCHAR

##### 5.1.3.5.3 Is Required

✅ Yes

##### 5.1.3.5.4 Is Primary Key

❌ No

##### 5.1.3.5.5 Size

255

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

#### 5.1.3.6.0 BOOLEAN

##### 5.1.3.6.1 Name

isActive

##### 5.1.3.6.2 Type

🔹 BOOLEAN

##### 5.1.3.6.3 Is Required

✅ Yes

##### 5.1.3.6.4 Is Primary Key

❌ No

##### 5.1.3.6.5 Size

0

##### 5.1.3.6.6 Is Unique

❌ No

##### 5.1.3.6.7 Constraints

- DEFAULT true

##### 5.1.3.6.8 Precision

0

##### 5.1.3.6.9 Scale

0

##### 5.1.3.6.10 Is Foreign Key

❌ No

#### 5.1.3.7.0 TIMESTAMP WITH TIME ZONE

##### 5.1.3.7.1 Name

createdAt

##### 5.1.3.7.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.1.3.7.3 Is Required

✅ Yes

##### 5.1.3.7.4 Is Primary Key

❌ No

##### 5.1.3.7.5 Size

0

##### 5.1.3.7.6 Is Unique

❌ No

##### 5.1.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.1.3.7.8 Precision

0

##### 5.1.3.7.9 Scale

0

##### 5.1.3.7.10 Is Foreign Key

❌ No

#### 5.1.3.8.0 TIMESTAMP WITH TIME ZONE

##### 5.1.3.8.1 Name

updatedAt

##### 5.1.3.8.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.1.3.8.3 Is Required

✅ Yes

##### 5.1.3.8.4 Is Primary Key

❌ No

##### 5.1.3.8.5 Size

0

##### 5.1.3.8.6 Is Unique

❌ No

##### 5.1.3.8.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.1.3.8.8 Precision

0

##### 5.1.3.8.9 Scale

0

##### 5.1.3.8.10 Is Foreign Key

❌ No

### 5.1.4.0.0 Primary Keys

- userId

### 5.1.5.0.0 Unique Constraints

- {'name': 'uq_user_email', 'columns': ['email']}

### 5.1.6.0.0 Indexes

- {'name': 'idx_user_fullname', 'columns': ['firstName', 'lastName'], 'type': 'BTree'}

## 5.2.0.0.0 PasswordResetToken

### 5.2.1.0.0 Name

PasswordResetToken

### 5.2.2.0.0 Description

Stores temporary, secure tokens for the password reset workflow (REQ-FUNC-003).

### 5.2.3.0.0 Attributes

#### 5.2.3.1.0 UUID

##### 5.2.3.1.1 Name

passwordResetTokenId

##### 5.2.3.1.2 Type

🔹 UUID

##### 5.2.3.1.3 Is Required

✅ Yes

##### 5.2.3.1.4 Is Primary Key

✅ Yes

##### 5.2.3.1.5 Size

0

##### 5.2.3.1.6 Is Unique

✅ Yes

##### 5.2.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.2.3.1.8 Precision

0

##### 5.2.3.1.9 Scale

0

##### 5.2.3.1.10 Is Foreign Key

❌ No

#### 5.2.3.2.0 UUID

##### 5.2.3.2.1 Name

userId

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

✅ Yes

#### 5.2.3.3.0 VARCHAR

##### 5.2.3.3.1 Name

tokenHash

##### 5.2.3.3.2 Type

🔹 VARCHAR

##### 5.2.3.3.3 Is Required

✅ Yes

##### 5.2.3.3.4 Is Primary Key

❌ No

##### 5.2.3.3.5 Size

255

##### 5.2.3.3.6 Is Unique

✅ Yes

##### 5.2.3.3.7 Constraints

*No items available*

##### 5.2.3.3.8 Precision

0

##### 5.2.3.3.9 Scale

0

##### 5.2.3.3.10 Is Foreign Key

❌ No

#### 5.2.3.4.0 TIMESTAMP WITH TIME ZONE

##### 5.2.3.4.1 Name

expiresAt

##### 5.2.3.4.2 Type

🔹 TIMESTAMP WITH TIME ZONE

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

#### 5.2.3.5.0 TIMESTAMP WITH TIME ZONE

##### 5.2.3.5.1 Name

createdAt

##### 5.2.3.5.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.2.3.5.3 Is Required

✅ Yes

##### 5.2.3.5.4 Is Primary Key

❌ No

##### 5.2.3.5.5 Size

0

##### 5.2.3.5.6 Is Unique

❌ No

##### 5.2.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.2.3.5.8 Precision

0

##### 5.2.3.5.9 Scale

0

##### 5.2.3.5.10 Is Foreign Key

❌ No

### 5.2.4.0.0 Primary Keys

- passwordResetTokenId

### 5.2.5.0.0 Unique Constraints

- {'name': 'uq_passwordresettoken_tokenhash', 'columns': ['tokenHash']}

### 5.2.6.0.0 Indexes

- {'name': 'idx_passwordresettoken_expiresat', 'columns': ['expiresAt'], 'type': 'BTree'}

## 5.3.0.0.0 MerchantAccount

### 5.3.1.0.0 Name

MerchantAccount

### 5.3.2.0.0 Description

Represents a tenant's account or workspace, which contains all of their associated data like products, sales, and users.

### 5.3.3.0.0 Attributes

#### 5.3.3.1.0 UUID

##### 5.3.3.1.1 Name

merchantAccountId

##### 5.3.3.1.2 Type

🔹 UUID

##### 5.3.3.1.3 Is Required

✅ Yes

##### 5.3.3.1.4 Is Primary Key

✅ Yes

##### 5.3.3.1.5 Size

0

##### 5.3.3.1.6 Is Unique

✅ Yes

##### 5.3.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.3.3.1.8 Precision

0

##### 5.3.3.1.9 Scale

0

##### 5.3.3.1.10 Is Foreign Key

❌ No

#### 5.3.3.2.0 VARCHAR

##### 5.3.3.2.1 Name

accountName

##### 5.3.3.2.2 Type

🔹 VARCHAR

##### 5.3.3.2.3 Is Required

✅ Yes

##### 5.3.3.2.4 Is Primary Key

❌ No

##### 5.3.3.2.5 Size

255

##### 5.3.3.2.6 Is Unique

❌ No

##### 5.3.3.2.7 Constraints

*No items available*

##### 5.3.3.2.8 Precision

0

##### 5.3.3.2.9 Scale

0

##### 5.3.3.2.10 Is Foreign Key

❌ No

#### 5.3.3.3.0 BOOLEAN

##### 5.3.3.3.1 Name

isActive

##### 5.3.3.3.2 Type

🔹 BOOLEAN

##### 5.3.3.3.3 Is Required

✅ Yes

##### 5.3.3.3.4 Is Primary Key

❌ No

##### 5.3.3.3.5 Size

0

##### 5.3.3.3.6 Is Unique

❌ No

##### 5.3.3.3.7 Constraints

- DEFAULT true

##### 5.3.3.3.8 Precision

0

##### 5.3.3.3.9 Scale

0

##### 5.3.3.3.10 Is Foreign Key

❌ No

#### 5.3.3.4.0 TIMESTAMP WITH TIME ZONE

##### 5.3.3.4.1 Name

createdAt

##### 5.3.3.4.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.3.3.4.3 Is Required

✅ Yes

##### 5.3.3.4.4 Is Primary Key

❌ No

##### 5.3.3.4.5 Size

0

##### 5.3.3.4.6 Is Unique

❌ No

##### 5.3.3.4.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.3.3.4.8 Precision

0

##### 5.3.3.4.9 Scale

0

##### 5.3.3.4.10 Is Foreign Key

❌ No

#### 5.3.3.5.0 TIMESTAMP WITH TIME ZONE

##### 5.3.3.5.1 Name

updatedAt

##### 5.3.3.5.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.3.3.5.3 Is Required

✅ Yes

##### 5.3.3.5.4 Is Primary Key

❌ No

##### 5.3.3.5.5 Size

0

##### 5.3.3.5.6 Is Unique

❌ No

##### 5.3.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.3.3.5.8 Precision

0

##### 5.3.3.5.9 Scale

0

##### 5.3.3.5.10 Is Foreign Key

❌ No

### 5.3.4.0.0 Primary Keys

- merchantAccountId

### 5.3.5.0.0 Unique Constraints

*No items available*

### 5.3.6.0.0 Indexes

- {'name': 'idx_merchantaccount_accountname', 'columns': ['accountName'], 'type': 'BTree'}

## 5.4.0.0.0 Role

### 5.4.1.0.0 Name

Role

### 5.4.2.0.0 Description

Defines a set of permissions for users within a merchant account (e.g., Owner, Admin, Analyst).

### 5.4.3.0.0 Attributes

#### 5.4.3.1.0 UUID

##### 5.4.3.1.1 Name

roleId

##### 5.4.3.1.2 Type

🔹 UUID

##### 5.4.3.1.3 Is Required

✅ Yes

##### 5.4.3.1.4 Is Primary Key

✅ Yes

##### 5.4.3.1.5 Size

0

##### 5.4.3.1.6 Is Unique

✅ Yes

##### 5.4.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.4.3.1.8 Precision

0

##### 5.4.3.1.9 Scale

0

##### 5.4.3.1.10 Is Foreign Key

❌ No

#### 5.4.3.2.0 VARCHAR

##### 5.4.3.2.1 Name

roleName

##### 5.4.3.2.2 Type

🔹 VARCHAR

##### 5.4.3.2.3 Is Required

✅ Yes

##### 5.4.3.2.4 Is Primary Key

❌ No

##### 5.4.3.2.5 Size

50

##### 5.4.3.2.6 Is Unique

✅ Yes

##### 5.4.3.2.7 Constraints

- CHECK (roleName IN ('Owner', 'Admin', 'Analyst', 'Marketer'))

##### 5.4.3.2.8 Precision

0

##### 5.4.3.2.9 Scale

0

##### 5.4.3.2.10 Is Foreign Key

❌ No

### 5.4.4.0.0 Primary Keys

- roleId

### 5.4.5.0.0 Unique Constraints

- {'name': 'uq_role_rolename', 'columns': ['roleName']}

### 5.4.6.0.0 Indexes

*No items available*

## 5.5.0.0.0 UserMerchantAccount

### 5.5.1.0.0 Name

UserMerchantAccount

### 5.5.2.0.0 Description

A join table linking Users to MerchantAccounts, assigning them a specific Role. This enables multi-tenancy, team management (REQ-FUNC-007), and account switching (FR-204).

### 5.5.3.0.0 Attributes

#### 5.5.3.1.0 UUID

##### 5.5.3.1.1 Name

userMerchantAccountId

##### 5.5.3.1.2 Type

🔹 UUID

##### 5.5.3.1.3 Is Required

✅ Yes

##### 5.5.3.1.4 Is Primary Key

✅ Yes

##### 5.5.3.1.5 Size

0

##### 5.5.3.1.6 Is Unique

✅ Yes

##### 5.5.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.5.3.1.8 Precision

0

##### 5.5.3.1.9 Scale

0

##### 5.5.3.1.10 Is Foreign Key

❌ No

#### 5.5.3.2.0 UUID

##### 5.5.3.2.1 Name

userId

##### 5.5.3.2.2 Type

🔹 UUID

##### 5.5.3.2.3 Is Required

✅ Yes

##### 5.5.3.2.4 Is Primary Key

❌ No

##### 5.5.3.2.5 Size

0

##### 5.5.3.2.6 Is Unique

❌ No

##### 5.5.3.2.7 Constraints

*No items available*

##### 5.5.3.2.8 Precision

0

##### 5.5.3.2.9 Scale

0

##### 5.5.3.2.10 Is Foreign Key

✅ Yes

#### 5.5.3.3.0 UUID

##### 5.5.3.3.1 Name

merchantAccountId

##### 5.5.3.3.2 Type

🔹 UUID

##### 5.5.3.3.3 Is Required

✅ Yes

##### 5.5.3.3.4 Is Primary Key

❌ No

##### 5.5.3.3.5 Size

0

##### 5.5.3.3.6 Is Unique

❌ No

##### 5.5.3.3.7 Constraints

*No items available*

##### 5.5.3.3.8 Precision

0

##### 5.5.3.3.9 Scale

0

##### 5.5.3.3.10 Is Foreign Key

✅ Yes

#### 5.5.3.4.0 UUID

##### 5.5.3.4.1 Name

roleId

##### 5.5.3.4.2 Type

🔹 UUID

##### 5.5.3.4.3 Is Required

✅ Yes

##### 5.5.3.4.4 Is Primary Key

❌ No

##### 5.5.3.4.5 Size

0

##### 5.5.3.4.6 Is Unique

❌ No

##### 5.5.3.4.7 Constraints

*No items available*

##### 5.5.3.4.8 Precision

0

##### 5.5.3.4.9 Scale

0

##### 5.5.3.4.10 Is Foreign Key

✅ Yes

#### 5.5.3.5.0 TIMESTAMP WITH TIME ZONE

##### 5.5.3.5.1 Name

createdAt

##### 5.5.3.5.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.5.3.5.3 Is Required

✅ Yes

##### 5.5.3.5.4 Is Primary Key

❌ No

##### 5.5.3.5.5 Size

0

##### 5.5.3.5.6 Is Unique

❌ No

##### 5.5.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.5.3.5.8 Precision

0

##### 5.5.3.5.9 Scale

0

##### 5.5.3.5.10 Is Foreign Key

❌ No

### 5.5.4.0.0 Primary Keys

- userMerchantAccountId

### 5.5.5.0.0 Unique Constraints

- {'name': 'uq_usermerchantaccount_user_merchant', 'columns': ['userId', 'merchantAccountId']}

### 5.5.6.0.0 Indexes

- {'name': 'idx_usermerchantaccount_merchant_role', 'columns': ['merchantAccountId', 'roleId'], 'type': 'BTree'}

## 5.6.0.0.0 Invitation

### 5.6.1.0.0 Name

Invitation

### 5.6.2.0.0 Description

Tracks invitations sent to users to join a merchant account (REQ-FUNC-006).

### 5.6.3.0.0 Attributes

#### 5.6.3.1.0 UUID

##### 5.6.3.1.1 Name

invitationId

##### 5.6.3.1.2 Type

🔹 UUID

##### 5.6.3.1.3 Is Required

✅ Yes

##### 5.6.3.1.4 Is Primary Key

✅ Yes

##### 5.6.3.1.5 Size

0

##### 5.6.3.1.6 Is Unique

✅ Yes

##### 5.6.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.6.3.1.8 Precision

0

##### 5.6.3.1.9 Scale

0

##### 5.6.3.1.10 Is Foreign Key

❌ No

#### 5.6.3.2.0 UUID

##### 5.6.3.2.1 Name

merchantAccountId

##### 5.6.3.2.2 Type

🔹 UUID

##### 5.6.3.2.3 Is Required

✅ Yes

##### 5.6.3.2.4 Is Primary Key

❌ No

##### 5.6.3.2.5 Size

0

##### 5.6.3.2.6 Is Unique

❌ No

##### 5.6.3.2.7 Constraints

*No items available*

##### 5.6.3.2.8 Precision

0

##### 5.6.3.2.9 Scale

0

##### 5.6.3.2.10 Is Foreign Key

✅ Yes

#### 5.6.3.3.0 UUID

##### 5.6.3.3.1 Name

invitedByUserId

##### 5.6.3.3.2 Type

🔹 UUID

##### 5.6.3.3.3 Is Required

✅ Yes

##### 5.6.3.3.4 Is Primary Key

❌ No

##### 5.6.3.3.5 Size

0

##### 5.6.3.3.6 Is Unique

❌ No

##### 5.6.3.3.7 Constraints

*No items available*

##### 5.6.3.3.8 Precision

0

##### 5.6.3.3.9 Scale

0

##### 5.6.3.3.10 Is Foreign Key

✅ Yes

#### 5.6.3.4.0 UUID

##### 5.6.3.4.1 Name

roleId

##### 5.6.3.4.2 Type

🔹 UUID

##### 5.6.3.4.3 Is Required

✅ Yes

##### 5.6.3.4.4 Is Primary Key

❌ No

##### 5.6.3.4.5 Size

0

##### 5.6.3.4.6 Is Unique

❌ No

##### 5.6.3.4.7 Constraints

*No items available*

##### 5.6.3.4.8 Precision

0

##### 5.6.3.4.9 Scale

0

##### 5.6.3.4.10 Is Foreign Key

✅ Yes

#### 5.6.3.5.0 VARCHAR

##### 5.6.3.5.1 Name

inviteeEmail

##### 5.6.3.5.2 Type

🔹 VARCHAR

##### 5.6.3.5.3 Is Required

✅ Yes

##### 5.6.3.5.4 Is Primary Key

❌ No

##### 5.6.3.5.5 Size

255

##### 5.6.3.5.6 Is Unique

❌ No

##### 5.6.3.5.7 Constraints

*No items available*

##### 5.6.3.5.8 Precision

0

##### 5.6.3.5.9 Scale

0

##### 5.6.3.5.10 Is Foreign Key

❌ No

#### 5.6.3.6.0 VARCHAR

##### 5.6.3.6.1 Name

invitationTokenHash

##### 5.6.3.6.2 Type

🔹 VARCHAR

##### 5.6.3.6.3 Is Required

✅ Yes

##### 5.6.3.6.4 Is Primary Key

❌ No

##### 5.6.3.6.5 Size

255

##### 5.6.3.6.6 Is Unique

✅ Yes

##### 5.6.3.6.7 Constraints

*No items available*

##### 5.6.3.6.8 Precision

0

##### 5.6.3.6.9 Scale

0

##### 5.6.3.6.10 Is Foreign Key

❌ No

#### 5.6.3.7.0 VARCHAR

##### 5.6.3.7.1 Name

status

##### 5.6.3.7.2 Type

🔹 VARCHAR

##### 5.6.3.7.3 Is Required

✅ Yes

##### 5.6.3.7.4 Is Primary Key

❌ No

##### 5.6.3.7.5 Size

20

##### 5.6.3.7.6 Is Unique

❌ No

##### 5.6.3.7.7 Constraints

- CHECK (status IN ('pending', 'accepted', 'expired'))
- DEFAULT 'pending'

##### 5.6.3.7.8 Precision

0

##### 5.6.3.7.9 Scale

0

##### 5.6.3.7.10 Is Foreign Key

❌ No

#### 5.6.3.8.0 TIMESTAMP WITH TIME ZONE

##### 5.6.3.8.1 Name

expiresAt

##### 5.6.3.8.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.6.3.8.3 Is Required

✅ Yes

##### 5.6.3.8.4 Is Primary Key

❌ No

##### 5.6.3.8.5 Size

0

##### 5.6.3.8.6 Is Unique

❌ No

##### 5.6.3.8.7 Constraints

*No items available*

##### 5.6.3.8.8 Precision

0

##### 5.6.3.8.9 Scale

0

##### 5.6.3.8.10 Is Foreign Key

❌ No

#### 5.6.3.9.0 TIMESTAMP WITH TIME ZONE

##### 5.6.3.9.1 Name

createdAt

##### 5.6.3.9.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.6.3.9.3 Is Required

✅ Yes

##### 5.6.3.9.4 Is Primary Key

❌ No

##### 5.6.3.9.5 Size

0

##### 5.6.3.9.6 Is Unique

❌ No

##### 5.6.3.9.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.6.3.9.8 Precision

0

##### 5.6.3.9.9 Scale

0

##### 5.6.3.9.10 Is Foreign Key

❌ No

### 5.6.4.0.0 Primary Keys

- invitationId

### 5.6.5.0.0 Unique Constraints

- {'name': 'uq_invitation_tokenhash', 'columns': ['invitationTokenHash']}

### 5.6.6.0.0 Indexes

- {'name': 'idx_invitation_status_expiresat', 'columns': ['status', 'expiresAt'], 'type': 'BTree'}

## 5.7.0.0.0 Customer

### 5.7.1.0.0 Name

Customer

### 5.7.2.0.0 Description

Represents a merchant's end customer, used for sales tracking and segmentation reports (REQ-FUNC-010).

### 5.7.3.0.0 Attributes

#### 5.7.3.1.0 UUID

##### 5.7.3.1.1 Name

customerId

##### 5.7.3.1.2 Type

🔹 UUID

##### 5.7.3.1.3 Is Required

✅ Yes

##### 5.7.3.1.4 Is Primary Key

✅ Yes

##### 5.7.3.1.5 Size

0

##### 5.7.3.1.6 Is Unique

✅ Yes

##### 5.7.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.7.3.1.8 Precision

0

##### 5.7.3.1.9 Scale

0

##### 5.7.3.1.10 Is Foreign Key

❌ No

#### 5.7.3.2.0 UUID

##### 5.7.3.2.1 Name

merchantAccountId

##### 5.7.3.2.2 Type

🔹 UUID

##### 5.7.3.2.3 Is Required

✅ Yes

##### 5.7.3.2.4 Is Primary Key

❌ No

##### 5.7.3.2.5 Size

0

##### 5.7.3.2.6 Is Unique

❌ No

##### 5.7.3.2.7 Constraints

*No items available*

##### 5.7.3.2.8 Precision

0

##### 5.7.3.2.9 Scale

0

##### 5.7.3.2.10 Is Foreign Key

✅ Yes

#### 5.7.3.3.0 VARCHAR

##### 5.7.3.3.1 Name

email

##### 5.7.3.3.2 Type

🔹 VARCHAR

##### 5.7.3.3.3 Is Required

✅ Yes

##### 5.7.3.3.4 Is Primary Key

❌ No

##### 5.7.3.3.5 Size

255

##### 5.7.3.3.6 Is Unique

❌ No

##### 5.7.3.3.7 Constraints

*No items available*

##### 5.7.3.3.8 Precision

0

##### 5.7.3.3.9 Scale

0

##### 5.7.3.3.10 Is Foreign Key

❌ No

#### 5.7.3.4.0 VARCHAR

##### 5.7.3.4.1 Name

firstName

##### 5.7.3.4.2 Type

🔹 VARCHAR

##### 5.7.3.4.3 Is Required

❌ No

##### 5.7.3.4.4 Is Primary Key

❌ No

##### 5.7.3.4.5 Size

100

##### 5.7.3.4.6 Is Unique

❌ No

##### 5.7.3.4.7 Constraints

*No items available*

##### 5.7.3.4.8 Precision

0

##### 5.7.3.4.9 Scale

0

##### 5.7.3.4.10 Is Foreign Key

❌ No

#### 5.7.3.5.0 VARCHAR

##### 5.7.3.5.1 Name

lastName

##### 5.7.3.5.2 Type

🔹 VARCHAR

##### 5.7.3.5.3 Is Required

❌ No

##### 5.7.3.5.4 Is Primary Key

❌ No

##### 5.7.3.5.5 Size

100

##### 5.7.3.5.6 Is Unique

❌ No

##### 5.7.3.5.7 Constraints

*No items available*

##### 5.7.3.5.8 Precision

0

##### 5.7.3.5.9 Scale

0

##### 5.7.3.5.10 Is Foreign Key

❌ No

#### 5.7.3.6.0 VARCHAR

##### 5.7.3.6.1 Name

city

##### 5.7.3.6.2 Type

🔹 VARCHAR

##### 5.7.3.6.3 Is Required

❌ No

##### 5.7.3.6.4 Is Primary Key

❌ No

##### 5.7.3.6.5 Size

100

##### 5.7.3.6.6 Is Unique

❌ No

##### 5.7.3.6.7 Constraints

*No items available*

##### 5.7.3.6.8 Precision

0

##### 5.7.3.6.9 Scale

0

##### 5.7.3.6.10 Is Foreign Key

❌ No

#### 5.7.3.7.0 VARCHAR

##### 5.7.3.7.1 Name

country

##### 5.7.3.7.2 Type

🔹 VARCHAR

##### 5.7.3.7.3 Is Required

❌ No

##### 5.7.3.7.4 Is Primary Key

❌ No

##### 5.7.3.7.5 Size

100

##### 5.7.3.7.6 Is Unique

❌ No

##### 5.7.3.7.7 Constraints

*No items available*

##### 5.7.3.7.8 Precision

0

##### 5.7.3.7.9 Scale

0

##### 5.7.3.7.10 Is Foreign Key

❌ No

#### 5.7.3.8.0 TIMESTAMP WITH TIME ZONE

##### 5.7.3.8.1 Name

createdAt

##### 5.7.3.8.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.7.3.8.3 Is Required

✅ Yes

##### 5.7.3.8.4 Is Primary Key

❌ No

##### 5.7.3.8.5 Size

0

##### 5.7.3.8.6 Is Unique

❌ No

##### 5.7.3.8.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.7.3.8.8 Precision

0

##### 5.7.3.8.9 Scale

0

##### 5.7.3.8.10 Is Foreign Key

❌ No

#### 5.7.3.9.0 TIMESTAMP WITH TIME ZONE

##### 5.7.3.9.1 Name

updatedAt

##### 5.7.3.9.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.7.3.9.3 Is Required

✅ Yes

##### 5.7.3.9.4 Is Primary Key

❌ No

##### 5.7.3.9.5 Size

0

##### 5.7.3.9.6 Is Unique

❌ No

##### 5.7.3.9.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.7.3.9.8 Precision

0

##### 5.7.3.9.9 Scale

0

##### 5.7.3.9.10 Is Foreign Key

❌ No

### 5.7.4.0.0 Primary Keys

- customerId

### 5.7.5.0.0 Unique Constraints

- {'name': 'uq_customer_merchant_email', 'columns': ['merchantAccountId', 'email']}

### 5.7.6.0.0 Indexes

- {'name': 'idx_customer_merchant_location', 'columns': ['merchantAccountId', 'country', 'city'], 'type': 'BTree'}

## 5.8.0.0.0 Category

### 5.8.1.0.0 Name

Category

### 5.8.2.0.0 Description

Represents product categories for filtering and organization in reports (REQ-FUNC-011). Supports hierarchical structures.

### 5.8.3.0.0 Attributes

#### 5.8.3.1.0 UUID

##### 5.8.3.1.1 Name

categoryId

##### 5.8.3.1.2 Type

🔹 UUID

##### 5.8.3.1.3 Is Required

✅ Yes

##### 5.8.3.1.4 Is Primary Key

✅ Yes

##### 5.8.3.1.5 Size

0

##### 5.8.3.1.6 Is Unique

✅ Yes

##### 5.8.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.8.3.1.8 Precision

0

##### 5.8.3.1.9 Scale

0

##### 5.8.3.1.10 Is Foreign Key

❌ No

#### 5.8.3.2.0 UUID

##### 5.8.3.2.1 Name

merchantAccountId

##### 5.8.3.2.2 Type

🔹 UUID

##### 5.8.3.2.3 Is Required

✅ Yes

##### 5.8.3.2.4 Is Primary Key

❌ No

##### 5.8.3.2.5 Size

0

##### 5.8.3.2.6 Is Unique

❌ No

##### 5.8.3.2.7 Constraints

*No items available*

##### 5.8.3.2.8 Precision

0

##### 5.8.3.2.9 Scale

0

##### 5.8.3.2.10 Is Foreign Key

✅ Yes

#### 5.8.3.3.0 VARCHAR

##### 5.8.3.3.1 Name

name

##### 5.8.3.3.2 Type

🔹 VARCHAR

##### 5.8.3.3.3 Is Required

✅ Yes

##### 5.8.3.3.4 Is Primary Key

❌ No

##### 5.8.3.3.5 Size

100

##### 5.8.3.3.6 Is Unique

❌ No

##### 5.8.3.3.7 Constraints

*No items available*

##### 5.8.3.3.8 Precision

0

##### 5.8.3.3.9 Scale

0

##### 5.8.3.3.10 Is Foreign Key

❌ No

#### 5.8.3.4.0 UUID

##### 5.8.3.4.1 Name

parentCategoryId

##### 5.8.3.4.2 Type

🔹 UUID

##### 5.8.3.4.3 Is Required

❌ No

##### 5.8.3.4.4 Is Primary Key

❌ No

##### 5.8.3.4.5 Size

0

##### 5.8.3.4.6 Is Unique

❌ No

##### 5.8.3.4.7 Constraints

*No items available*

##### 5.8.3.4.8 Precision

0

##### 5.8.3.4.9 Scale

0

##### 5.8.3.4.10 Is Foreign Key

✅ Yes

#### 5.8.3.5.0 TIMESTAMP WITH TIME ZONE

##### 5.8.3.5.1 Name

createdAt

##### 5.8.3.5.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.8.3.5.3 Is Required

✅ Yes

##### 5.8.3.5.4 Is Primary Key

❌ No

##### 5.8.3.5.5 Size

0

##### 5.8.3.5.6 Is Unique

❌ No

##### 5.8.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.8.3.5.8 Precision

0

##### 5.8.3.5.9 Scale

0

##### 5.8.3.5.10 Is Foreign Key

❌ No

#### 5.8.3.6.0 TIMESTAMP WITH TIME ZONE

##### 5.8.3.6.1 Name

updatedAt

##### 5.8.3.6.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.8.3.6.3 Is Required

✅ Yes

##### 5.8.3.6.4 Is Primary Key

❌ No

##### 5.8.3.6.5 Size

0

##### 5.8.3.6.6 Is Unique

❌ No

##### 5.8.3.6.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.8.3.6.8 Precision

0

##### 5.8.3.6.9 Scale

0

##### 5.8.3.6.10 Is Foreign Key

❌ No

### 5.8.4.0.0 Primary Keys

- categoryId

### 5.8.5.0.0 Unique Constraints

- {'name': 'uq_category_merchant_name_parent', 'columns': ['merchantAccountId', 'name', 'parentCategoryId']}

### 5.8.6.0.0 Indexes

*No items available*

## 5.9.0.0.0 Product

### 5.9.1.0.0 Name

Product

### 5.9.2.0.0 Description

Represents an item for sale by a merchant. Forms the basis for product performance reports (REQ-FUNC-011).

### 5.9.3.0.0 Attributes

#### 5.9.3.1.0 UUID

##### 5.9.3.1.1 Name

productId

##### 5.9.3.1.2 Type

🔹 UUID

##### 5.9.3.1.3 Is Required

✅ Yes

##### 5.9.3.1.4 Is Primary Key

✅ Yes

##### 5.9.3.1.5 Size

0

##### 5.9.3.1.6 Is Unique

✅ Yes

##### 5.9.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.9.3.1.8 Precision

0

##### 5.9.3.1.9 Scale

0

##### 5.9.3.1.10 Is Foreign Key

❌ No

#### 5.9.3.2.0 UUID

##### 5.9.3.2.1 Name

merchantAccountId

##### 5.9.3.2.2 Type

🔹 UUID

##### 5.9.3.2.3 Is Required

✅ Yes

##### 5.9.3.2.4 Is Primary Key

❌ No

##### 5.9.3.2.5 Size

0

##### 5.9.3.2.6 Is Unique

❌ No

##### 5.9.3.2.7 Constraints

*No items available*

##### 5.9.3.2.8 Precision

0

##### 5.9.3.2.9 Scale

0

##### 5.9.3.2.10 Is Foreign Key

✅ Yes

#### 5.9.3.3.0 UUID

##### 5.9.3.3.1 Name

categoryId

##### 5.9.3.3.2 Type

🔹 UUID

##### 5.9.3.3.3 Is Required

✅ Yes

##### 5.9.3.3.4 Is Primary Key

❌ No

##### 5.9.3.3.5 Size

0

##### 5.9.3.3.6 Is Unique

❌ No

##### 5.9.3.3.7 Constraints

*No items available*

##### 5.9.3.3.8 Precision

0

##### 5.9.3.3.9 Scale

0

##### 5.9.3.3.10 Is Foreign Key

✅ Yes

#### 5.9.3.4.0 VARCHAR

##### 5.9.3.4.1 Name

name

##### 5.9.3.4.2 Type

🔹 VARCHAR

##### 5.9.3.4.3 Is Required

✅ Yes

##### 5.9.3.4.4 Is Primary Key

❌ No

##### 5.9.3.4.5 Size

255

##### 5.9.3.4.6 Is Unique

❌ No

##### 5.9.3.4.7 Constraints

*No items available*

##### 5.9.3.4.8 Precision

0

##### 5.9.3.4.9 Scale

0

##### 5.9.3.4.10 Is Foreign Key

❌ No

#### 5.9.3.5.0 TEXT

##### 5.9.3.5.1 Name

description

##### 5.9.3.5.2 Type

🔹 TEXT

##### 5.9.3.5.3 Is Required

❌ No

##### 5.9.3.5.4 Is Primary Key

❌ No

##### 5.9.3.5.5 Size

0

##### 5.9.3.5.6 Is Unique

❌ No

##### 5.9.3.5.7 Constraints

*No items available*

##### 5.9.3.5.8 Precision

0

##### 5.9.3.5.9 Scale

0

##### 5.9.3.5.10 Is Foreign Key

❌ No

#### 5.9.3.6.0 DECIMAL

##### 5.9.3.6.1 Name

price

##### 5.9.3.6.2 Type

🔹 DECIMAL

##### 5.9.3.6.3 Is Required

✅ Yes

##### 5.9.3.6.4 Is Primary Key

❌ No

##### 5.9.3.6.5 Size

0

##### 5.9.3.6.6 Is Unique

❌ No

##### 5.9.3.6.7 Constraints

- CHECK (price > 0)

##### 5.9.3.6.8 Precision

10

##### 5.9.3.6.9 Scale

2

##### 5.9.3.6.10 Is Foreign Key

❌ No

#### 5.9.3.7.0 VARCHAR

##### 5.9.3.7.1 Name

sku

##### 5.9.3.7.2 Type

🔹 VARCHAR

##### 5.9.3.7.3 Is Required

❌ No

##### 5.9.3.7.4 Is Primary Key

❌ No

##### 5.9.3.7.5 Size

100

##### 5.9.3.7.6 Is Unique

❌ No

##### 5.9.3.7.7 Constraints

*No items available*

##### 5.9.3.7.8 Precision

0

##### 5.9.3.7.9 Scale

0

##### 5.9.3.7.10 Is Foreign Key

❌ No

#### 5.9.3.8.0 TIMESTAMP WITH TIME ZONE

##### 5.9.3.8.1 Name

createdAt

##### 5.9.3.8.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.9.3.8.3 Is Required

✅ Yes

##### 5.9.3.8.4 Is Primary Key

❌ No

##### 5.9.3.8.5 Size

0

##### 5.9.3.8.6 Is Unique

❌ No

##### 5.9.3.8.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.9.3.8.8 Precision

0

##### 5.9.3.8.9 Scale

0

##### 5.9.3.8.10 Is Foreign Key

❌ No

#### 5.9.3.9.0 TIMESTAMP WITH TIME ZONE

##### 5.9.3.9.1 Name

updatedAt

##### 5.9.3.9.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.9.3.9.3 Is Required

✅ Yes

##### 5.9.3.9.4 Is Primary Key

❌ No

##### 5.9.3.9.5 Size

0

##### 5.9.3.9.6 Is Unique

❌ No

##### 5.9.3.9.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.9.3.9.8 Precision

0

##### 5.9.3.9.9 Scale

0

##### 5.9.3.9.10 Is Foreign Key

❌ No

### 5.9.4.0.0 Primary Keys

- productId

### 5.9.5.0.0 Unique Constraints

- {'name': 'uq_product_merchant_sku', 'columns': ['merchantAccountId', 'sku']}

### 5.9.6.0.0 Indexes

- {'name': 'idx_product_fts', 'columns': ['name', 'description'], 'type': 'GIN_FullText'}

## 5.10.0.0.0 SalesOrder

### 5.10.1.0.0 Name

SalesOrder

### 5.10.2.0.0 Description

Represents a completed transaction. This is the primary source of data for all sales analytics and reporting (REQ-FUNC-009). Table should be partitioned by range on orderDate.

### 5.10.3.0.0 Attributes

#### 5.10.3.1.0 UUID

##### 5.10.3.1.1 Name

salesOrderId

##### 5.10.3.1.2 Type

🔹 UUID

##### 5.10.3.1.3 Is Required

✅ Yes

##### 5.10.3.1.4 Is Primary Key

✅ Yes

##### 5.10.3.1.5 Size

0

##### 5.10.3.1.6 Is Unique

✅ Yes

##### 5.10.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.10.3.1.8 Precision

0

##### 5.10.3.1.9 Scale

0

##### 5.10.3.1.10 Is Foreign Key

❌ No

#### 5.10.3.2.0 UUID

##### 5.10.3.2.1 Name

merchantAccountId

##### 5.10.3.2.2 Type

🔹 UUID

##### 5.10.3.2.3 Is Required

✅ Yes

##### 5.10.3.2.4 Is Primary Key

❌ No

##### 5.10.3.2.5 Size

0

##### 5.10.3.2.6 Is Unique

❌ No

##### 5.10.3.2.7 Constraints

*No items available*

##### 5.10.3.2.8 Precision

0

##### 5.10.3.2.9 Scale

0

##### 5.10.3.2.10 Is Foreign Key

✅ Yes

#### 5.10.3.3.0 UUID

##### 5.10.3.3.1 Name

customerId

##### 5.10.3.3.2 Type

🔹 UUID

##### 5.10.3.3.3 Is Required

✅ Yes

##### 5.10.3.3.4 Is Primary Key

❌ No

##### 5.10.3.3.5 Size

0

##### 5.10.3.3.6 Is Unique

❌ No

##### 5.10.3.3.7 Constraints

*No items available*

##### 5.10.3.3.8 Precision

0

##### 5.10.3.3.9 Scale

0

##### 5.10.3.3.10 Is Foreign Key

✅ Yes

#### 5.10.3.4.0 TIMESTAMP WITH TIME ZONE

##### 5.10.3.4.1 Name

orderDate

##### 5.10.3.4.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.10.3.4.3 Is Required

✅ Yes

##### 5.10.3.4.4 Is Primary Key

❌ No

##### 5.10.3.4.5 Size

0

##### 5.10.3.4.6 Is Unique

❌ No

##### 5.10.3.4.7 Constraints

*No items available*

##### 5.10.3.4.8 Precision

0

##### 5.10.3.4.9 Scale

0

##### 5.10.3.4.10 Is Foreign Key

❌ No

#### 5.10.3.5.0 DECIMAL

##### 5.10.3.5.1 Name

totalAmount

##### 5.10.3.5.2 Type

🔹 DECIMAL

##### 5.10.3.5.3 Is Required

✅ Yes

##### 5.10.3.5.4 Is Primary Key

❌ No

##### 5.10.3.5.5 Size

0

##### 5.10.3.5.6 Is Unique

❌ No

##### 5.10.3.5.7 Constraints

- CHECK (totalAmount > 0)

##### 5.10.3.5.8 Precision

10

##### 5.10.3.5.9 Scale

2

##### 5.10.3.5.10 Is Foreign Key

❌ No

#### 5.10.3.6.0 VARCHAR

##### 5.10.3.6.1 Name

status

##### 5.10.3.6.2 Type

🔹 VARCHAR

##### 5.10.3.6.3 Is Required

✅ Yes

##### 5.10.3.6.4 Is Primary Key

❌ No

##### 5.10.3.6.5 Size

50

##### 5.10.3.6.6 Is Unique

❌ No

##### 5.10.3.6.7 Constraints

- CHECK (status IN ('pending', 'completed', 'shipped', 'cancelled', 'refunded'))
- DEFAULT 'completed'

##### 5.10.3.6.8 Precision

0

##### 5.10.3.6.9 Scale

0

##### 5.10.3.6.10 Is Foreign Key

❌ No

#### 5.10.3.7.0 TIMESTAMP WITH TIME ZONE

##### 5.10.3.7.1 Name

createdAt

##### 5.10.3.7.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.10.3.7.3 Is Required

✅ Yes

##### 5.10.3.7.4 Is Primary Key

❌ No

##### 5.10.3.7.5 Size

0

##### 5.10.3.7.6 Is Unique

❌ No

##### 5.10.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.10.3.7.8 Precision

0

##### 5.10.3.7.9 Scale

0

##### 5.10.3.7.10 Is Foreign Key

❌ No

### 5.10.4.0.0 Primary Keys

- salesOrderId

### 5.10.5.0.0 Unique Constraints

*No items available*

### 5.10.6.0.0 Indexes

#### 5.10.6.1.0 BTree

##### 5.10.6.1.1 Name

idx_salesorder_merchant_orderdate

##### 5.10.6.1.2 Columns

- merchantAccountId
- orderDate

##### 5.10.6.1.3 Type

🔹 BTree

#### 5.10.6.2.0 BTree

##### 5.10.6.2.1 Name

idx_salesorder_merchant_customer_orderdate

##### 5.10.6.2.2 Columns

- merchantAccountId
- customerId
- orderDate

##### 5.10.6.2.3 Type

🔹 BTree

## 5.11.0.0.0 OrderItem

### 5.11.1.0.0 Name

OrderItem

### 5.11.2.0.0 Description

Represents a single line item within a SalesOrder, linking a product to an order with quantity and price at the time of purchase.

### 5.11.3.0.0 Attributes

#### 5.11.3.1.0 UUID

##### 5.11.3.1.1 Name

orderItemId

##### 5.11.3.1.2 Type

🔹 UUID

##### 5.11.3.1.3 Is Required

✅ Yes

##### 5.11.3.1.4 Is Primary Key

✅ Yes

##### 5.11.3.1.5 Size

0

##### 5.11.3.1.6 Is Unique

✅ Yes

##### 5.11.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.11.3.1.8 Precision

0

##### 5.11.3.1.9 Scale

0

##### 5.11.3.1.10 Is Foreign Key

❌ No

#### 5.11.3.2.0 UUID

##### 5.11.3.2.1 Name

salesOrderId

##### 5.11.3.2.2 Type

🔹 UUID

##### 5.11.3.2.3 Is Required

✅ Yes

##### 5.11.3.2.4 Is Primary Key

❌ No

##### 5.11.3.2.5 Size

0

##### 5.11.3.2.6 Is Unique

❌ No

##### 5.11.3.2.7 Constraints

*No items available*

##### 5.11.3.2.8 Precision

0

##### 5.11.3.2.9 Scale

0

##### 5.11.3.2.10 Is Foreign Key

✅ Yes

#### 5.11.3.3.0 UUID

##### 5.11.3.3.1 Name

productId

##### 5.11.3.3.2 Type

🔹 UUID

##### 5.11.3.3.3 Is Required

✅ Yes

##### 5.11.3.3.4 Is Primary Key

❌ No

##### 5.11.3.3.5 Size

0

##### 5.11.3.3.6 Is Unique

❌ No

##### 5.11.3.3.7 Constraints

*No items available*

##### 5.11.3.3.8 Precision

0

##### 5.11.3.3.9 Scale

0

##### 5.11.3.3.10 Is Foreign Key

✅ Yes

#### 5.11.3.4.0 INT

##### 5.11.3.4.1 Name

quantity

##### 5.11.3.4.2 Type

🔹 INT

##### 5.11.3.4.3 Is Required

✅ Yes

##### 5.11.3.4.4 Is Primary Key

❌ No

##### 5.11.3.4.5 Size

0

##### 5.11.3.4.6 Is Unique

❌ No

##### 5.11.3.4.7 Constraints

- CHECK (quantity > 0)

##### 5.11.3.4.8 Precision

0

##### 5.11.3.4.9 Scale

0

##### 5.11.3.4.10 Is Foreign Key

❌ No

#### 5.11.3.5.0 DECIMAL

##### 5.11.3.5.1 Name

priceAtPurchase

##### 5.11.3.5.2 Type

🔹 DECIMAL

##### 5.11.3.5.3 Is Required

✅ Yes

##### 5.11.3.5.4 Is Primary Key

❌ No

##### 5.11.3.5.5 Size

0

##### 5.11.3.5.6 Is Unique

❌ No

##### 5.11.3.5.7 Constraints

- CHECK (priceAtPurchase > 0)

##### 5.11.3.5.8 Precision

10

##### 5.11.3.5.9 Scale

2

##### 5.11.3.5.10 Is Foreign Key

❌ No

#### 5.11.3.6.0 UUID

##### 5.11.3.6.1 Name

merchantAccountId

##### 5.11.3.6.2 Type

🔹 UUID

##### 5.11.3.6.3 Is Required

✅ Yes

##### 5.11.3.6.4 Is Primary Key

❌ No

##### 5.11.3.6.5 Size

0

##### 5.11.3.6.6 Is Unique

❌ No

##### 5.11.3.6.7 Constraints

*No items available*

##### 5.11.3.6.8 Precision

0

##### 5.11.3.6.9 Scale

0

##### 5.11.3.6.10 Is Foreign Key

❌ No

#### 5.11.3.7.0 TIMESTAMP WITH TIME ZONE

##### 5.11.3.7.1 Name

orderDate

##### 5.11.3.7.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.11.3.7.3 Is Required

✅ Yes

##### 5.11.3.7.4 Is Primary Key

❌ No

##### 5.11.3.7.5 Size

0

##### 5.11.3.7.6 Is Unique

❌ No

##### 5.11.3.7.7 Constraints

*No items available*

##### 5.11.3.7.8 Precision

0

##### 5.11.3.7.9 Scale

0

##### 5.11.3.7.10 Is Foreign Key

❌ No

### 5.11.4.0.0 Primary Keys

- orderItemId

### 5.11.5.0.0 Unique Constraints

*No items available*

### 5.11.6.0.0 Indexes

- {'name': 'idx_orderitem_productid', 'columns': ['productId'], 'type': 'BTree'}

## 5.12.0.0.0 AbandonedCart

### 5.12.1.0.0 Name

AbandonedCart

### 5.12.2.0.0 Description

Stores information about shopping carts that were not converted into orders, for use in recovery campaigns (REQ-FUNC-019, REQ-DATA-001).

### 5.12.3.0.0 Attributes

#### 5.12.3.1.0 UUID

##### 5.12.3.1.1 Name

abandonedCartId

##### 5.12.3.1.2 Type

🔹 UUID

##### 5.12.3.1.3 Is Required

✅ Yes

##### 5.12.3.1.4 Is Primary Key

✅ Yes

##### 5.12.3.1.5 Size

0

##### 5.12.3.1.6 Is Unique

✅ Yes

##### 5.12.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.12.3.1.8 Precision

0

##### 5.12.3.1.9 Scale

0

##### 5.12.3.1.10 Is Foreign Key

❌ No

#### 5.12.3.2.0 UUID

##### 5.12.3.2.1 Name

merchantAccountId

##### 5.12.3.2.2 Type

🔹 UUID

##### 5.12.3.2.3 Is Required

✅ Yes

##### 5.12.3.2.4 Is Primary Key

❌ No

##### 5.12.3.2.5 Size

0

##### 5.12.3.2.6 Is Unique

❌ No

##### 5.12.3.2.7 Constraints

*No items available*

##### 5.12.3.2.8 Precision

0

##### 5.12.3.2.9 Scale

0

##### 5.12.3.2.10 Is Foreign Key

✅ Yes

#### 5.12.3.3.0 UUID

##### 5.12.3.3.1 Name

customerId

##### 5.12.3.3.2 Type

🔹 UUID

##### 5.12.3.3.3 Is Required

✅ Yes

##### 5.12.3.3.4 Is Primary Key

❌ No

##### 5.12.3.3.5 Size

0

##### 5.12.3.3.6 Is Unique

❌ No

##### 5.12.3.3.7 Constraints

*No items available*

##### 5.12.3.3.8 Precision

0

##### 5.12.3.3.9 Scale

0

##### 5.12.3.3.10 Is Foreign Key

✅ Yes

#### 5.12.3.4.0 UUID

##### 5.12.3.4.1 Name

campaignId

##### 5.12.3.4.2 Type

🔹 UUID

##### 5.12.3.4.3 Is Required

❌ No

##### 5.12.3.4.4 Is Primary Key

❌ No

##### 5.12.3.4.5 Size

0

##### 5.12.3.4.6 Is Unique

❌ No

##### 5.12.3.4.7 Constraints

*No items available*

##### 5.12.3.4.8 Precision

0

##### 5.12.3.4.9 Scale

0

##### 5.12.3.4.10 Is Foreign Key

✅ Yes

#### 5.12.3.5.0 VARCHAR

##### 5.12.3.5.1 Name

status

##### 5.12.3.5.2 Type

🔹 VARCHAR

##### 5.12.3.5.3 Is Required

✅ Yes

##### 5.12.3.5.4 Is Primary Key

❌ No

##### 5.12.3.5.5 Size

20

##### 5.12.3.5.6 Is Unique

❌ No

##### 5.12.3.5.7 Constraints

- CHECK (status IN ('active', 'recovered', 'purged'))
- DEFAULT 'active'

##### 5.12.3.5.8 Precision

0

##### 5.12.3.5.9 Scale

0

##### 5.12.3.5.10 Is Foreign Key

❌ No

#### 5.12.3.6.0 VARCHAR

##### 5.12.3.6.1 Name

recoveryToken

##### 5.12.3.6.2 Type

🔹 VARCHAR

##### 5.12.3.6.3 Is Required

❌ No

##### 5.12.3.6.4 Is Primary Key

❌ No

##### 5.12.3.6.5 Size

255

##### 5.12.3.6.6 Is Unique

✅ Yes

##### 5.12.3.6.7 Constraints

*No items available*

##### 5.12.3.6.8 Precision

0

##### 5.12.3.6.9 Scale

0

##### 5.12.3.6.10 Is Foreign Key

❌ No

#### 5.12.3.7.0 TIMESTAMP WITH TIME ZONE

##### 5.12.3.7.1 Name

createdAt

##### 5.12.3.7.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.12.3.7.3 Is Required

✅ Yes

##### 5.12.3.7.4 Is Primary Key

❌ No

##### 5.12.3.7.5 Size

0

##### 5.12.3.7.6 Is Unique

❌ No

##### 5.12.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.12.3.7.8 Precision

0

##### 5.12.3.7.9 Scale

0

##### 5.12.3.7.10 Is Foreign Key

❌ No

#### 5.12.3.8.0 TIMESTAMP WITH TIME ZONE

##### 5.12.3.8.1 Name

updatedAt

##### 5.12.3.8.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.12.3.8.3 Is Required

✅ Yes

##### 5.12.3.8.4 Is Primary Key

❌ No

##### 5.12.3.8.5 Size

0

##### 5.12.3.8.6 Is Unique

❌ No

##### 5.12.3.8.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.12.3.8.8 Precision

0

##### 5.12.3.8.9 Scale

0

##### 5.12.3.8.10 Is Foreign Key

❌ No

### 5.12.4.0.0 Primary Keys

- abandonedCartId

### 5.12.5.0.0 Unique Constraints

- {'name': 'uq_abandonedcart_recoverytoken', 'columns': ['recoveryToken']}

### 5.12.6.0.0 Indexes

#### 5.12.6.1.0 BTree

##### 5.12.6.1.1 Name

idx_abandonedcart_status_createdat

##### 5.12.6.1.2 Columns

- status
- createdAt

##### 5.12.6.1.3 Type

🔹 BTree

#### 5.12.6.2.0 BTree

##### 5.12.6.2.1 Name

idx_abandonedcart_merchant_customer_status

##### 5.12.6.2.2 Columns

- merchantAccountId
- customerId
- status

##### 5.12.6.2.3 Type

🔹 BTree

## 5.13.0.0.0 AbandonedCartItem

### 5.13.1.0.0 Name

AbandonedCartItem

### 5.13.2.0.0 Description

Represents a single product line item within an AbandonedCart.

### 5.13.3.0.0 Attributes

#### 5.13.3.1.0 UUID

##### 5.13.3.1.1 Name

abandonedCartItemId

##### 5.13.3.1.2 Type

🔹 UUID

##### 5.13.3.1.3 Is Required

✅ Yes

##### 5.13.3.1.4 Is Primary Key

✅ Yes

##### 5.13.3.1.5 Size

0

##### 5.13.3.1.6 Is Unique

✅ Yes

##### 5.13.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.13.3.1.8 Precision

0

##### 5.13.3.1.9 Scale

0

##### 5.13.3.1.10 Is Foreign Key

❌ No

#### 5.13.3.2.0 UUID

##### 5.13.3.2.1 Name

abandonedCartId

##### 5.13.3.2.2 Type

🔹 UUID

##### 5.13.3.2.3 Is Required

✅ Yes

##### 5.13.3.2.4 Is Primary Key

❌ No

##### 5.13.3.2.5 Size

0

##### 5.13.3.2.6 Is Unique

❌ No

##### 5.13.3.2.7 Constraints

*No items available*

##### 5.13.3.2.8 Precision

0

##### 5.13.3.2.9 Scale

0

##### 5.13.3.2.10 Is Foreign Key

✅ Yes

#### 5.13.3.3.0 UUID

##### 5.13.3.3.1 Name

productId

##### 5.13.3.3.2 Type

🔹 UUID

##### 5.13.3.3.3 Is Required

✅ Yes

##### 5.13.3.3.4 Is Primary Key

❌ No

##### 5.13.3.3.5 Size

0

##### 5.13.3.3.6 Is Unique

❌ No

##### 5.13.3.3.7 Constraints

*No items available*

##### 5.13.3.3.8 Precision

0

##### 5.13.3.3.9 Scale

0

##### 5.13.3.3.10 Is Foreign Key

✅ Yes

#### 5.13.3.4.0 INT

##### 5.13.3.4.1 Name

quantity

##### 5.13.3.4.2 Type

🔹 INT

##### 5.13.3.4.3 Is Required

✅ Yes

##### 5.13.3.4.4 Is Primary Key

❌ No

##### 5.13.3.4.5 Size

0

##### 5.13.3.4.6 Is Unique

❌ No

##### 5.13.3.4.7 Constraints

- CHECK (quantity > 0)

##### 5.13.3.4.8 Precision

0

##### 5.13.3.4.9 Scale

0

##### 5.13.3.4.10 Is Foreign Key

❌ No

#### 5.13.3.5.0 DECIMAL

##### 5.13.3.5.1 Name

price

##### 5.13.3.5.2 Type

🔹 DECIMAL

##### 5.13.3.5.3 Is Required

✅ Yes

##### 5.13.3.5.4 Is Primary Key

❌ No

##### 5.13.3.5.5 Size

0

##### 5.13.3.5.6 Is Unique

❌ No

##### 5.13.3.5.7 Constraints

- CHECK (price > 0)

##### 5.13.3.5.8 Precision

10

##### 5.13.3.5.9 Scale

2

##### 5.13.3.5.10 Is Foreign Key

❌ No

### 5.13.4.0.0 Primary Keys

- abandonedCartItemId

### 5.13.5.0.0 Unique Constraints

*No items available*

### 5.13.6.0.0 Indexes

*No items available*

## 5.14.0.0.0 EmailTemplate

### 5.14.1.0.0 Name

EmailTemplate

### 5.14.2.0.0 Description

Stores reusable, rich-text email templates for cart recovery campaigns (REQ-FUNC-019).

### 5.14.3.0.0 Attributes

#### 5.14.3.1.0 UUID

##### 5.14.3.1.1 Name

emailTemplateId

##### 5.14.3.1.2 Type

🔹 UUID

##### 5.14.3.1.3 Is Required

✅ Yes

##### 5.14.3.1.4 Is Primary Key

✅ Yes

##### 5.14.3.1.5 Size

0

##### 5.14.3.1.6 Is Unique

✅ Yes

##### 5.14.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.14.3.1.8 Precision

0

##### 5.14.3.1.9 Scale

0

##### 5.14.3.1.10 Is Foreign Key

❌ No

#### 5.14.3.2.0 UUID

##### 5.14.3.2.1 Name

merchantAccountId

##### 5.14.3.2.2 Type

🔹 UUID

##### 5.14.3.2.3 Is Required

✅ Yes

##### 5.14.3.2.4 Is Primary Key

❌ No

##### 5.14.3.2.5 Size

0

##### 5.14.3.2.6 Is Unique

❌ No

##### 5.14.3.2.7 Constraints

*No items available*

##### 5.14.3.2.8 Precision

0

##### 5.14.3.2.9 Scale

0

##### 5.14.3.2.10 Is Foreign Key

✅ Yes

#### 5.14.3.3.0 VARCHAR

##### 5.14.3.3.1 Name

name

##### 5.14.3.3.2 Type

🔹 VARCHAR

##### 5.14.3.3.3 Is Required

✅ Yes

##### 5.14.3.3.4 Is Primary Key

❌ No

##### 5.14.3.3.5 Size

255

##### 5.14.3.3.6 Is Unique

❌ No

##### 5.14.3.3.7 Constraints

*No items available*

##### 5.14.3.3.8 Precision

0

##### 5.14.3.3.9 Scale

0

##### 5.14.3.3.10 Is Foreign Key

❌ No

#### 5.14.3.4.0 VARCHAR

##### 5.14.3.4.1 Name

subject

##### 5.14.3.4.2 Type

🔹 VARCHAR

##### 5.14.3.4.3 Is Required

✅ Yes

##### 5.14.3.4.4 Is Primary Key

❌ No

##### 5.14.3.4.5 Size

255

##### 5.14.3.4.6 Is Unique

❌ No

##### 5.14.3.4.7 Constraints

*No items available*

##### 5.14.3.4.8 Precision

0

##### 5.14.3.4.9 Scale

0

##### 5.14.3.4.10 Is Foreign Key

❌ No

#### 5.14.3.5.0 TEXT

##### 5.14.3.5.1 Name

body

##### 5.14.3.5.2 Type

🔹 TEXT

##### 5.14.3.5.3 Is Required

✅ Yes

##### 5.14.3.5.4 Is Primary Key

❌ No

##### 5.14.3.5.5 Size

0

##### 5.14.3.5.6 Is Unique

❌ No

##### 5.14.3.5.7 Constraints

*No items available*

##### 5.14.3.5.8 Precision

0

##### 5.14.3.5.9 Scale

0

##### 5.14.3.5.10 Is Foreign Key

❌ No

#### 5.14.3.6.0 TIMESTAMP WITH TIME ZONE

##### 5.14.3.6.1 Name

createdAt

##### 5.14.3.6.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.14.3.6.3 Is Required

✅ Yes

##### 5.14.3.6.4 Is Primary Key

❌ No

##### 5.14.3.6.5 Size

0

##### 5.14.3.6.6 Is Unique

❌ No

##### 5.14.3.6.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.14.3.6.8 Precision

0

##### 5.14.3.6.9 Scale

0

##### 5.14.3.6.10 Is Foreign Key

❌ No

#### 5.14.3.7.0 TIMESTAMP WITH TIME ZONE

##### 5.14.3.7.1 Name

updatedAt

##### 5.14.3.7.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.14.3.7.3 Is Required

✅ Yes

##### 5.14.3.7.4 Is Primary Key

❌ No

##### 5.14.3.7.5 Size

0

##### 5.14.3.7.6 Is Unique

❌ No

##### 5.14.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.14.3.7.8 Precision

0

##### 5.14.3.7.9 Scale

0

##### 5.14.3.7.10 Is Foreign Key

❌ No

### 5.14.4.0.0 Primary Keys

- emailTemplateId

### 5.14.5.0.0 Unique Constraints

- {'name': 'uq_emailtemplate_merchant_name', 'columns': ['merchantAccountId', 'name']}

### 5.14.6.0.0 Indexes

*No items available*

## 5.15.0.0.0 Campaign

### 5.15.1.0.0 Name

Campaign

### 5.15.2.0.0 Description

Defines a multi-step cart recovery campaign, orchestrating email templates and delays (REQ-FUN-502).

### 5.15.3.0.0 Attributes

#### 5.15.3.1.0 UUID

##### 5.15.3.1.1 Name

campaignId

##### 5.15.3.1.2 Type

🔹 UUID

##### 5.15.3.1.3 Is Required

✅ Yes

##### 5.15.3.1.4 Is Primary Key

✅ Yes

##### 5.15.3.1.5 Size

0

##### 5.15.3.1.6 Is Unique

✅ Yes

##### 5.15.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.15.3.1.8 Precision

0

##### 5.15.3.1.9 Scale

0

##### 5.15.3.1.10 Is Foreign Key

❌ No

#### 5.15.3.2.0 UUID

##### 5.15.3.2.1 Name

merchantAccountId

##### 5.15.3.2.2 Type

🔹 UUID

##### 5.15.3.2.3 Is Required

✅ Yes

##### 5.15.3.2.4 Is Primary Key

❌ No

##### 5.15.3.2.5 Size

0

##### 5.15.3.2.6 Is Unique

❌ No

##### 5.15.3.2.7 Constraints

*No items available*

##### 5.15.3.2.8 Precision

0

##### 5.15.3.2.9 Scale

0

##### 5.15.3.2.10 Is Foreign Key

✅ Yes

#### 5.15.3.3.0 VARCHAR

##### 5.15.3.3.1 Name

name

##### 5.15.3.3.2 Type

🔹 VARCHAR

##### 5.15.3.3.3 Is Required

✅ Yes

##### 5.15.3.3.4 Is Primary Key

❌ No

##### 5.15.3.3.5 Size

255

##### 5.15.3.3.6 Is Unique

❌ No

##### 5.15.3.3.7 Constraints

*No items available*

##### 5.15.3.3.8 Precision

0

##### 5.15.3.3.9 Scale

0

##### 5.15.3.3.10 Is Foreign Key

❌ No

#### 5.15.3.4.0 BOOLEAN

##### 5.15.3.4.1 Name

isActive

##### 5.15.3.4.2 Type

🔹 BOOLEAN

##### 5.15.3.4.3 Is Required

✅ Yes

##### 5.15.3.4.4 Is Primary Key

❌ No

##### 5.15.3.4.5 Size

0

##### 5.15.3.4.6 Is Unique

❌ No

##### 5.15.3.4.7 Constraints

- DEFAULT false

##### 5.15.3.4.8 Precision

0

##### 5.15.3.4.9 Scale

0

##### 5.15.3.4.10 Is Foreign Key

❌ No

#### 5.15.3.5.0 TIMESTAMP WITH TIME ZONE

##### 5.15.3.5.1 Name

createdAt

##### 5.15.3.5.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.15.3.5.3 Is Required

✅ Yes

##### 5.15.3.5.4 Is Primary Key

❌ No

##### 5.15.3.5.5 Size

0

##### 5.15.3.5.6 Is Unique

❌ No

##### 5.15.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.15.3.5.8 Precision

0

##### 5.15.3.5.9 Scale

0

##### 5.15.3.5.10 Is Foreign Key

❌ No

#### 5.15.3.6.0 TIMESTAMP WITH TIME ZONE

##### 5.15.3.6.1 Name

updatedAt

##### 5.15.3.6.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.15.3.6.3 Is Required

✅ Yes

##### 5.15.3.6.4 Is Primary Key

❌ No

##### 5.15.3.6.5 Size

0

##### 5.15.3.6.6 Is Unique

❌ No

##### 5.15.3.6.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.15.3.6.8 Precision

0

##### 5.15.3.6.9 Scale

0

##### 5.15.3.6.10 Is Foreign Key

❌ No

### 5.15.4.0.0 Primary Keys

- campaignId

### 5.15.5.0.0 Unique Constraints

- {'name': 'uq_campaign_merchant_name', 'columns': ['merchantAccountId', 'name']}

### 5.15.6.0.0 Indexes

*No items available*

## 5.16.0.0.0 CampaignStep

### 5.16.1.0.0 Name

CampaignStep

### 5.16.2.0.0 Description

Defines a single step in a cart recovery campaign, linking a template with a delay.

### 5.16.3.0.0 Attributes

#### 5.16.3.1.0 UUID

##### 5.16.3.1.1 Name

campaignStepId

##### 5.16.3.1.2 Type

🔹 UUID

##### 5.16.3.1.3 Is Required

✅ Yes

##### 5.16.3.1.4 Is Primary Key

✅ Yes

##### 5.16.3.1.5 Size

0

##### 5.16.3.1.6 Is Unique

✅ Yes

##### 5.16.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.16.3.1.8 Precision

0

##### 5.16.3.1.9 Scale

0

##### 5.16.3.1.10 Is Foreign Key

❌ No

#### 5.16.3.2.0 UUID

##### 5.16.3.2.1 Name

campaignId

##### 5.16.3.2.2 Type

🔹 UUID

##### 5.16.3.2.3 Is Required

✅ Yes

##### 5.16.3.2.4 Is Primary Key

❌ No

##### 5.16.3.2.5 Size

0

##### 5.16.3.2.6 Is Unique

❌ No

##### 5.16.3.2.7 Constraints

*No items available*

##### 5.16.3.2.8 Precision

0

##### 5.16.3.2.9 Scale

0

##### 5.16.3.2.10 Is Foreign Key

✅ Yes

#### 5.16.3.3.0 UUID

##### 5.16.3.3.1 Name

emailTemplateId

##### 5.16.3.3.2 Type

🔹 UUID

##### 5.16.3.3.3 Is Required

✅ Yes

##### 5.16.3.3.4 Is Primary Key

❌ No

##### 5.16.3.3.5 Size

0

##### 5.16.3.3.6 Is Unique

❌ No

##### 5.16.3.3.7 Constraints

*No items available*

##### 5.16.3.3.8 Precision

0

##### 5.16.3.3.9 Scale

0

##### 5.16.3.3.10 Is Foreign Key

✅ Yes

#### 5.16.3.4.0 INT

##### 5.16.3.4.1 Name

delayHours

##### 5.16.3.4.2 Type

🔹 INT

##### 5.16.3.4.3 Is Required

✅ Yes

##### 5.16.3.4.4 Is Primary Key

❌ No

##### 5.16.3.4.5 Size

0

##### 5.16.3.4.6 Is Unique

❌ No

##### 5.16.3.4.7 Constraints

- CHECK (delayHours >= 0)

##### 5.16.3.4.8 Precision

0

##### 5.16.3.4.9 Scale

0

##### 5.16.3.4.10 Is Foreign Key

❌ No

#### 5.16.3.5.0 INT

##### 5.16.3.5.1 Name

stepOrder

##### 5.16.3.5.2 Type

🔹 INT

##### 5.16.3.5.3 Is Required

✅ Yes

##### 5.16.3.5.4 Is Primary Key

❌ No

##### 5.16.3.5.5 Size

0

##### 5.16.3.5.6 Is Unique

❌ No

##### 5.16.3.5.7 Constraints

- CHECK (stepOrder >= 1)

##### 5.16.3.5.8 Precision

0

##### 5.16.3.5.9 Scale

0

##### 5.16.3.5.10 Is Foreign Key

❌ No

### 5.16.4.0.0 Primary Keys

- campaignStepId

### 5.16.5.0.0 Unique Constraints

- {'name': 'uq_campaignstep_campaign_order', 'columns': ['campaignId', 'stepOrder']}

### 5.16.6.0.0 Indexes

*No items available*

## 5.17.0.0.0 Unsubscribe

### 5.17.1.0.0 Name

Unsubscribe

### 5.17.2.0.0 Description

Maintains a per-merchant suppression list to honor unsubscribe requests as per FR-503.

### 5.17.3.0.0 Attributes

#### 5.17.3.1.0 UUID

##### 5.17.3.1.1 Name

unsubscribeId

##### 5.17.3.1.2 Type

🔹 UUID

##### 5.17.3.1.3 Is Required

✅ Yes

##### 5.17.3.1.4 Is Primary Key

✅ Yes

##### 5.17.3.1.5 Size

0

##### 5.17.3.1.6 Is Unique

✅ Yes

##### 5.17.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.17.3.1.8 Precision

0

##### 5.17.3.1.9 Scale

0

##### 5.17.3.1.10 Is Foreign Key

❌ No

#### 5.17.3.2.0 UUID

##### 5.17.3.2.1 Name

merchantAccountId

##### 5.17.3.2.2 Type

🔹 UUID

##### 5.17.3.2.3 Is Required

✅ Yes

##### 5.17.3.2.4 Is Primary Key

❌ No

##### 5.17.3.2.5 Size

0

##### 5.17.3.2.6 Is Unique

❌ No

##### 5.17.3.2.7 Constraints

*No items available*

##### 5.17.3.2.8 Precision

0

##### 5.17.3.2.9 Scale

0

##### 5.17.3.2.10 Is Foreign Key

✅ Yes

#### 5.17.3.3.0 VARCHAR

##### 5.17.3.3.1 Name

customerEmail

##### 5.17.3.3.2 Type

🔹 VARCHAR

##### 5.17.3.3.3 Is Required

✅ Yes

##### 5.17.3.3.4 Is Primary Key

❌ No

##### 5.17.3.3.5 Size

255

##### 5.17.3.3.6 Is Unique

❌ No

##### 5.17.3.3.7 Constraints

*No items available*

##### 5.17.3.3.8 Precision

0

##### 5.17.3.3.9 Scale

0

##### 5.17.3.3.10 Is Foreign Key

❌ No

#### 5.17.3.4.0 TEXT

##### 5.17.3.4.1 Name

reason

##### 5.17.3.4.2 Type

🔹 TEXT

##### 5.17.3.4.3 Is Required

❌ No

##### 5.17.3.4.4 Is Primary Key

❌ No

##### 5.17.3.4.5 Size

0

##### 5.17.3.4.6 Is Unique

❌ No

##### 5.17.3.4.7 Constraints

*No items available*

##### 5.17.3.4.8 Precision

0

##### 5.17.3.4.9 Scale

0

##### 5.17.3.4.10 Is Foreign Key

❌ No

#### 5.17.3.5.0 TIMESTAMP WITH TIME ZONE

##### 5.17.3.5.1 Name

createdAt

##### 5.17.3.5.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.17.3.5.3 Is Required

✅ Yes

##### 5.17.3.5.4 Is Primary Key

❌ No

##### 5.17.3.5.5 Size

0

##### 5.17.3.5.6 Is Unique

❌ No

##### 5.17.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.17.3.5.8 Precision

0

##### 5.17.3.5.9 Scale

0

##### 5.17.3.5.10 Is Foreign Key

❌ No

### 5.17.4.0.0 Primary Keys

- unsubscribeId

### 5.17.5.0.0 Unique Constraints

- {'name': 'uq_unsubscribe_merchant_email', 'columns': ['merchantAccountId', 'customerEmail']}

### 5.17.6.0.0 Indexes

*No items available*

## 5.18.0.0.0 DomainAuthentication

### 5.18.1.0.0 Name

DomainAuthentication

### 5.18.2.0.0 Description

Stores SPF and DKIM records and their verification status for a merchant's sending domain (REQ-FUNC-021).

### 5.18.3.0.0 Attributes

#### 5.18.3.1.0 UUID

##### 5.18.3.1.1 Name

domainAuthenticationId

##### 5.18.3.1.2 Type

🔹 UUID

##### 5.18.3.1.3 Is Required

✅ Yes

##### 5.18.3.1.4 Is Primary Key

✅ Yes

##### 5.18.3.1.5 Size

0

##### 5.18.3.1.6 Is Unique

✅ Yes

##### 5.18.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.18.3.1.8 Precision

0

##### 5.18.3.1.9 Scale

0

##### 5.18.3.1.10 Is Foreign Key

❌ No

#### 5.18.3.2.0 UUID

##### 5.18.3.2.1 Name

merchantAccountId

##### 5.18.3.2.2 Type

🔹 UUID

##### 5.18.3.2.3 Is Required

✅ Yes

##### 5.18.3.2.4 Is Primary Key

❌ No

##### 5.18.3.2.5 Size

0

##### 5.18.3.2.6 Is Unique

✅ Yes

##### 5.18.3.2.7 Constraints

*No items available*

##### 5.18.3.2.8 Precision

0

##### 5.18.3.2.9 Scale

0

##### 5.18.3.2.10 Is Foreign Key

✅ Yes

#### 5.18.3.3.0 VARCHAR

##### 5.18.3.3.1 Name

domainName

##### 5.18.3.3.2 Type

🔹 VARCHAR

##### 5.18.3.3.3 Is Required

✅ Yes

##### 5.18.3.3.4 Is Primary Key

❌ No

##### 5.18.3.3.5 Size

255

##### 5.18.3.3.6 Is Unique

❌ No

##### 5.18.3.3.7 Constraints

*No items available*

##### 5.18.3.3.8 Precision

0

##### 5.18.3.3.9 Scale

0

##### 5.18.3.3.10 Is Foreign Key

❌ No

#### 5.18.3.4.0 TEXT

##### 5.18.3.4.1 Name

spfRecord

##### 5.18.3.4.2 Type

🔹 TEXT

##### 5.18.3.4.3 Is Required

✅ Yes

##### 5.18.3.4.4 Is Primary Key

❌ No

##### 5.18.3.4.5 Size

0

##### 5.18.3.4.6 Is Unique

❌ No

##### 5.18.3.4.7 Constraints

*No items available*

##### 5.18.3.4.8 Precision

0

##### 5.18.3.4.9 Scale

0

##### 5.18.3.4.10 Is Foreign Key

❌ No

#### 5.18.3.5.0 TEXT

##### 5.18.3.5.1 Name

dkimRecord

##### 5.18.3.5.2 Type

🔹 TEXT

##### 5.18.3.5.3 Is Required

✅ Yes

##### 5.18.3.5.4 Is Primary Key

❌ No

##### 5.18.3.5.5 Size

0

##### 5.18.3.5.6 Is Unique

❌ No

##### 5.18.3.5.7 Constraints

*No items available*

##### 5.18.3.5.8 Precision

0

##### 5.18.3.5.9 Scale

0

##### 5.18.3.5.10 Is Foreign Key

❌ No

#### 5.18.3.6.0 BOOLEAN

##### 5.18.3.6.1 Name

isSpfVerified

##### 5.18.3.6.2 Type

🔹 BOOLEAN

##### 5.18.3.6.3 Is Required

✅ Yes

##### 5.18.3.6.4 Is Primary Key

❌ No

##### 5.18.3.6.5 Size

0

##### 5.18.3.6.6 Is Unique

❌ No

##### 5.18.3.6.7 Constraints

- DEFAULT false

##### 5.18.3.6.8 Precision

0

##### 5.18.3.6.9 Scale

0

##### 5.18.3.6.10 Is Foreign Key

❌ No

#### 5.18.3.7.0 BOOLEAN

##### 5.18.3.7.1 Name

isDkimVerified

##### 5.18.3.7.2 Type

🔹 BOOLEAN

##### 5.18.3.7.3 Is Required

✅ Yes

##### 5.18.3.7.4 Is Primary Key

❌ No

##### 5.18.3.7.5 Size

0

##### 5.18.3.7.6 Is Unique

❌ No

##### 5.18.3.7.7 Constraints

- DEFAULT false

##### 5.18.3.7.8 Precision

0

##### 5.18.3.7.9 Scale

0

##### 5.18.3.7.10 Is Foreign Key

❌ No

#### 5.18.3.8.0 TIMESTAMP WITH TIME ZONE

##### 5.18.3.8.1 Name

updatedAt

##### 5.18.3.8.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.18.3.8.3 Is Required

✅ Yes

##### 5.18.3.8.4 Is Primary Key

❌ No

##### 5.18.3.8.5 Size

0

##### 5.18.3.8.6 Is Unique

❌ No

##### 5.18.3.8.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.18.3.8.8 Precision

0

##### 5.18.3.8.9 Scale

0

##### 5.18.3.8.10 Is Foreign Key

❌ No

### 5.18.4.0.0 Primary Keys

- domainAuthenticationId

### 5.18.5.0.0 Unique Constraints

- {'name': 'uq_domainauthentication_merchantaccountid', 'columns': ['merchantAccountId']}

### 5.18.6.0.0 Indexes

*No items available*

## 5.19.0.0.0 AuditLog

### 5.19.1.0.0 Name

AuditLog

### 5.19.2.0.0 Description

Maintains an immutable record of security-sensitive events for auditing and compliance (REQ-SEC-005). Table should be partitioned by range on eventTimestamp.

### 5.19.3.0.0 Attributes

#### 5.19.3.1.0 BIGSERIAL

##### 5.19.3.1.1 Name

auditLogId

##### 5.19.3.1.2 Type

🔹 BIGSERIAL

##### 5.19.3.1.3 Is Required

✅ Yes

##### 5.19.3.1.4 Is Primary Key

✅ Yes

##### 5.19.3.1.5 Size

0

##### 5.19.3.1.6 Is Unique

✅ Yes

##### 5.19.3.1.7 Constraints

*No items available*

##### 5.19.3.1.8 Precision

0

##### 5.19.3.1.9 Scale

0

##### 5.19.3.1.10 Is Foreign Key

❌ No

#### 5.19.3.2.0 UUID

##### 5.19.3.2.1 Name

merchantAccountId

##### 5.19.3.2.2 Type

🔹 UUID

##### 5.19.3.2.3 Is Required

❌ No

##### 5.19.3.2.4 Is Primary Key

❌ No

##### 5.19.3.2.5 Size

0

##### 5.19.3.2.6 Is Unique

❌ No

##### 5.19.3.2.7 Constraints

*No items available*

##### 5.19.3.2.8 Precision

0

##### 5.19.3.2.9 Scale

0

##### 5.19.3.2.10 Is Foreign Key

✅ Yes

#### 5.19.3.3.0 UUID

##### 5.19.3.3.1 Name

userId

##### 5.19.3.3.2 Type

🔹 UUID

##### 5.19.3.3.3 Is Required

❌ No

##### 5.19.3.3.4 Is Primary Key

❌ No

##### 5.19.3.3.5 Size

0

##### 5.19.3.3.6 Is Unique

❌ No

##### 5.19.3.3.7 Constraints

*No items available*

##### 5.19.3.3.8 Precision

0

##### 5.19.3.3.9 Scale

0

##### 5.19.3.3.10 Is Foreign Key

✅ Yes

#### 5.19.3.4.0 TIMESTAMP WITH TIME ZONE

##### 5.19.3.4.1 Name

eventTimestamp

##### 5.19.3.4.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.19.3.4.3 Is Required

✅ Yes

##### 5.19.3.4.4 Is Primary Key

❌ No

##### 5.19.3.4.5 Size

0

##### 5.19.3.4.6 Is Unique

❌ No

##### 5.19.3.4.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.19.3.4.8 Precision

0

##### 5.19.3.4.9 Scale

0

##### 5.19.3.4.10 Is Foreign Key

❌ No

#### 5.19.3.5.0 VARCHAR

##### 5.19.3.5.1 Name

eventType

##### 5.19.3.5.2 Type

🔹 VARCHAR

##### 5.19.3.5.3 Is Required

✅ Yes

##### 5.19.3.5.4 Is Primary Key

❌ No

##### 5.19.3.5.5 Size

100

##### 5.19.3.5.6 Is Unique

❌ No

##### 5.19.3.5.7 Constraints

*No items available*

##### 5.19.3.5.8 Precision

0

##### 5.19.3.5.9 Scale

0

##### 5.19.3.5.10 Is Foreign Key

❌ No

#### 5.19.3.6.0 VARCHAR

##### 5.19.3.6.1 Name

targetResource

##### 5.19.3.6.2 Type

🔹 VARCHAR

##### 5.19.3.6.3 Is Required

❌ No

##### 5.19.3.6.4 Is Primary Key

❌ No

##### 5.19.3.6.5 Size

255

##### 5.19.3.6.6 Is Unique

❌ No

##### 5.19.3.6.7 Constraints

*No items available*

##### 5.19.3.6.8 Precision

0

##### 5.19.3.6.9 Scale

0

##### 5.19.3.6.10 Is Foreign Key

❌ No

#### 5.19.3.7.0 VARCHAR

##### 5.19.3.7.1 Name

outcome

##### 5.19.3.7.2 Type

🔹 VARCHAR

##### 5.19.3.7.3 Is Required

✅ Yes

##### 5.19.3.7.4 Is Primary Key

❌ No

##### 5.19.3.7.5 Size

20

##### 5.19.3.7.6 Is Unique

❌ No

##### 5.19.3.7.7 Constraints

- CHECK (outcome IN ('success', 'failure'))

##### 5.19.3.7.8 Precision

0

##### 5.19.3.7.9 Scale

0

##### 5.19.3.7.10 Is Foreign Key

❌ No

#### 5.19.3.8.0 JSONB

##### 5.19.3.8.1 Name

details

##### 5.19.3.8.2 Type

🔹 JSONB

##### 5.19.3.8.3 Is Required

❌ No

##### 5.19.3.8.4 Is Primary Key

❌ No

##### 5.19.3.8.5 Size

0

##### 5.19.3.8.6 Is Unique

❌ No

##### 5.19.3.8.7 Constraints

*No items available*

##### 5.19.3.8.8 Precision

0

##### 5.19.3.8.9 Scale

0

##### 5.19.3.8.10 Is Foreign Key

❌ No

### 5.19.4.0.0 Primary Keys

- auditLogId

### 5.19.5.0.0 Unique Constraints

*No items available*

### 5.19.6.0.0 Indexes

#### 5.19.6.1.0 BTree

##### 5.19.6.1.1 Name

idx_auditlog_merchant_timestamp

##### 5.19.6.1.2 Columns

- merchantAccountId
- eventTimestamp

##### 5.19.6.1.3 Type

🔹 BTree

#### 5.19.6.2.0 GIN

##### 5.19.6.2.1 Name

idx_auditlog_details_gin

##### 5.19.6.2.2 Columns

- details

##### 5.19.6.2.3 Type

🔹 GIN

## 5.20.0.0.0 AIInsightCard

### 5.20.1.0.0 Name

AIInsightCard

### 5.20.2.0.0 Description

Stores proactive insights, trends, and anomalies generated by the AI Assistant for display on the dashboard (REQ-FUNC-015).

### 5.20.3.0.0 Attributes

#### 5.20.3.1.0 UUID

##### 5.20.3.1.1 Name

aiInsightCardId

##### 5.20.3.1.2 Type

🔹 UUID

##### 5.20.3.1.3 Is Required

✅ Yes

##### 5.20.3.1.4 Is Primary Key

✅ Yes

##### 5.20.3.1.5 Size

0

##### 5.20.3.1.6 Is Unique

✅ Yes

##### 5.20.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.20.3.1.8 Precision

0

##### 5.20.3.1.9 Scale

0

##### 5.20.3.1.10 Is Foreign Key

❌ No

#### 5.20.3.2.0 UUID

##### 5.20.3.2.1 Name

merchantAccountId

##### 5.20.3.2.2 Type

🔹 UUID

##### 5.20.3.2.3 Is Required

✅ Yes

##### 5.20.3.2.4 Is Primary Key

❌ No

##### 5.20.3.2.5 Size

0

##### 5.20.3.2.6 Is Unique

❌ No

##### 5.20.3.2.7 Constraints

*No items available*

##### 5.20.3.2.8 Precision

0

##### 5.20.3.2.9 Scale

0

##### 5.20.3.2.10 Is Foreign Key

✅ Yes

#### 5.20.3.3.0 VARCHAR

##### 5.20.3.3.1 Name

title

##### 5.20.3.3.2 Type

🔹 VARCHAR

##### 5.20.3.3.3 Is Required

✅ Yes

##### 5.20.3.3.4 Is Primary Key

❌ No

##### 5.20.3.3.5 Size

255

##### 5.20.3.3.6 Is Unique

❌ No

##### 5.20.3.3.7 Constraints

*No items available*

##### 5.20.3.3.8 Precision

0

##### 5.20.3.3.9 Scale

0

##### 5.20.3.3.10 Is Foreign Key

❌ No

#### 5.20.3.4.0 TEXT

##### 5.20.3.4.1 Name

content

##### 5.20.3.4.2 Type

🔹 TEXT

##### 5.20.3.4.3 Is Required

✅ Yes

##### 5.20.3.4.4 Is Primary Key

❌ No

##### 5.20.3.4.5 Size

0

##### 5.20.3.4.6 Is Unique

❌ No

##### 5.20.3.4.7 Constraints

*No items available*

##### 5.20.3.4.8 Precision

0

##### 5.20.3.4.9 Scale

0

##### 5.20.3.4.10 Is Foreign Key

❌ No

#### 5.20.3.5.0 VARCHAR

##### 5.20.3.5.1 Name

insightType

##### 5.20.3.5.2 Type

🔹 VARCHAR

##### 5.20.3.5.3 Is Required

✅ Yes

##### 5.20.3.5.4 Is Primary Key

❌ No

##### 5.20.3.5.5 Size

50

##### 5.20.3.5.6 Is Unique

❌ No

##### 5.20.3.5.7 Constraints

- CHECK (insightType IN ('trend', 'anomaly', 'suggestion'))

##### 5.20.3.5.8 Precision

0

##### 5.20.3.5.9 Scale

0

##### 5.20.3.5.10 Is Foreign Key

❌ No

#### 5.20.3.6.0 BOOLEAN

##### 5.20.3.6.1 Name

isDismissed

##### 5.20.3.6.2 Type

🔹 BOOLEAN

##### 5.20.3.6.3 Is Required

✅ Yes

##### 5.20.3.6.4 Is Primary Key

❌ No

##### 5.20.3.6.5 Size

0

##### 5.20.3.6.6 Is Unique

❌ No

##### 5.20.3.6.7 Constraints

- DEFAULT false

##### 5.20.3.6.8 Precision

0

##### 5.20.3.6.9 Scale

0

##### 5.20.3.6.10 Is Foreign Key

❌ No

#### 5.20.3.7.0 TIMESTAMP WITH TIME ZONE

##### 5.20.3.7.1 Name

generatedAt

##### 5.20.3.7.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.20.3.7.3 Is Required

✅ Yes

##### 5.20.3.7.4 Is Primary Key

❌ No

##### 5.20.3.7.5 Size

0

##### 5.20.3.7.6 Is Unique

❌ No

##### 5.20.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.20.3.7.8 Precision

0

##### 5.20.3.7.9 Scale

0

##### 5.20.3.7.10 Is Foreign Key

❌ No

### 5.20.4.0.0 Primary Keys

- aiInsightCardId

### 5.20.5.0.0 Unique Constraints

*No items available*

### 5.20.6.0.0 Indexes

- {'name': 'idx_aiinsightcard_merchant_dismissed_generated', 'columns': ['merchantAccountId', 'isDismissed', 'generatedAt'], 'type': 'BTree'}

## 5.21.0.0.0 KnowledgeBaseChunk

### 5.21.1.0.0 Name

KnowledgeBaseChunk

### 5.21.2.0.0 Description

Stores chunks of text and their vector embeddings for the RAG AI Assistant (REQ-INTG-004), using pgvector.

### 5.21.3.0.0 Attributes

#### 5.21.3.1.0 UUID

##### 5.21.3.1.1 Name

chunkId

##### 5.21.3.1.2 Type

🔹 UUID

##### 5.21.3.1.3 Is Required

✅ Yes

##### 5.21.3.1.4 Is Primary Key

✅ Yes

##### 5.21.3.1.5 Size

0

##### 5.21.3.1.6 Is Unique

✅ Yes

##### 5.21.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.21.3.1.8 Precision

0

##### 5.21.3.1.9 Scale

0

##### 5.21.3.1.10 Is Foreign Key

❌ No

#### 5.21.3.2.0 UUID

##### 5.21.3.2.1 Name

merchantAccountId

##### 5.21.3.2.2 Type

🔹 UUID

##### 5.21.3.2.3 Is Required

✅ Yes

##### 5.21.3.2.4 Is Primary Key

❌ No

##### 5.21.3.2.5 Size

0

##### 5.21.3.2.6 Is Unique

❌ No

##### 5.21.3.2.7 Constraints

*No items available*

##### 5.21.3.2.8 Precision

0

##### 5.21.3.2.9 Scale

0

##### 5.21.3.2.10 Is Foreign Key

✅ Yes

#### 5.21.3.3.0 VARCHAR

##### 5.21.3.3.1 Name

sourceType

##### 5.21.3.3.2 Type

🔹 VARCHAR

##### 5.21.3.3.3 Is Required

✅ Yes

##### 5.21.3.3.4 Is Primary Key

❌ No

##### 5.21.3.3.5 Size

50

##### 5.21.3.3.6 Is Unique

❌ No

##### 5.21.3.3.7 Constraints

*No items available*

##### 5.21.3.3.8 Precision

0

##### 5.21.3.3.9 Scale

0

##### 5.21.3.3.10 Is Foreign Key

❌ No

#### 5.21.3.4.0 VARCHAR

##### 5.21.3.4.1 Name

sourceId

##### 5.21.3.4.2 Type

🔹 VARCHAR

##### 5.21.3.4.3 Is Required

✅ Yes

##### 5.21.3.4.4 Is Primary Key

❌ No

##### 5.21.3.4.5 Size

255

##### 5.21.3.4.6 Is Unique

❌ No

##### 5.21.3.4.7 Constraints

*No items available*

##### 5.21.3.4.8 Precision

0

##### 5.21.3.4.9 Scale

0

##### 5.21.3.4.10 Is Foreign Key

❌ No

#### 5.21.3.5.0 TEXT

##### 5.21.3.5.1 Name

chunkText

##### 5.21.3.5.2 Type

🔹 TEXT

##### 5.21.3.5.3 Is Required

✅ Yes

##### 5.21.3.5.4 Is Primary Key

❌ No

##### 5.21.3.5.5 Size

0

##### 5.21.3.5.6 Is Unique

❌ No

##### 5.21.3.5.7 Constraints

*No items available*

##### 5.21.3.5.8 Precision

0

##### 5.21.3.5.9 Scale

0

##### 5.21.3.5.10 Is Foreign Key

❌ No

#### 5.21.3.6.0 vector(1536)

##### 5.21.3.6.1 Name

embedding

##### 5.21.3.6.2 Type

🔹 vector(1536)

##### 5.21.3.6.3 Is Required

✅ Yes

##### 5.21.3.6.4 Is Primary Key

❌ No

##### 5.21.3.6.5 Size

0

##### 5.21.3.6.6 Is Unique

❌ No

##### 5.21.3.6.7 Constraints

*No items available*

##### 5.21.3.6.8 Precision

0

##### 5.21.3.6.9 Scale

0

##### 5.21.3.6.10 Is Foreign Key

❌ No

#### 5.21.3.7.0 TIMESTAMP WITH TIME ZONE

##### 5.21.3.7.1 Name

createdAt

##### 5.21.3.7.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.21.3.7.3 Is Required

✅ Yes

##### 5.21.3.7.4 Is Primary Key

❌ No

##### 5.21.3.7.5 Size

0

##### 5.21.3.7.6 Is Unique

❌ No

##### 5.21.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.21.3.7.8 Precision

0

##### 5.21.3.7.9 Scale

0

##### 5.21.3.7.10 Is Foreign Key

❌ No

### 5.21.4.0.0 Primary Keys

- chunkId

### 5.21.5.0.0 Unique Constraints

*No items available*

### 5.21.6.0.0 Indexes

- {'name': 'idx_knowledgebasechunk_embedding_hnsw', 'columns': ['embedding'], 'type': 'HNSW'}

## 5.22.0.0.0 UserPreference

### 5.22.1.0.0 Name

UserPreference

### 5.22.2.0.0 Description

Stores individual user preferences, such as UI theme choice (REQ-UI-005).

### 5.22.3.0.0 Attributes

#### 5.22.3.1.0 UUID

##### 5.22.3.1.1 Name

userPreferenceId

##### 5.22.3.1.2 Type

🔹 UUID

##### 5.22.3.1.3 Is Required

✅ Yes

##### 5.22.3.1.4 Is Primary Key

✅ Yes

##### 5.22.3.1.5 Size

0

##### 5.22.3.1.6 Is Unique

✅ Yes

##### 5.22.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.22.3.1.8 Precision

0

##### 5.22.3.1.9 Scale

0

##### 5.22.3.1.10 Is Foreign Key

❌ No

#### 5.22.3.2.0 UUID

##### 5.22.3.2.1 Name

userId

##### 5.22.3.2.2 Type

🔹 UUID

##### 5.22.3.2.3 Is Required

✅ Yes

##### 5.22.3.2.4 Is Primary Key

❌ No

##### 5.22.3.2.5 Size

0

##### 5.22.3.2.6 Is Unique

✅ Yes

##### 5.22.3.2.7 Constraints

*No items available*

##### 5.22.3.2.8 Precision

0

##### 5.22.3.2.9 Scale

0

##### 5.22.3.2.10 Is Foreign Key

✅ Yes

#### 5.22.3.3.0 VARCHAR

##### 5.22.3.3.1 Name

theme

##### 5.22.3.3.2 Type

🔹 VARCHAR

##### 5.22.3.3.3 Is Required

✅ Yes

##### 5.22.3.3.4 Is Primary Key

❌ No

##### 5.22.3.3.5 Size

20

##### 5.22.3.3.6 Is Unique

❌ No

##### 5.22.3.3.7 Constraints

- CHECK (theme IN ('light', 'dark', 'system'))
- DEFAULT 'system'

##### 5.22.3.3.8 Precision

0

##### 5.22.3.3.9 Scale

0

##### 5.22.3.3.10 Is Foreign Key

❌ No

#### 5.22.3.4.0 TIMESTAMP WITH TIME ZONE

##### 5.22.3.4.1 Name

updatedAt

##### 5.22.3.4.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.22.3.4.3 Is Required

✅ Yes

##### 5.22.3.4.4 Is Primary Key

❌ No

##### 5.22.3.4.5 Size

0

##### 5.22.3.4.6 Is Unique

❌ No

##### 5.22.3.4.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.22.3.4.8 Precision

0

##### 5.22.3.4.9 Scale

0

##### 5.22.3.4.10 Is Foreign Key

❌ No

### 5.22.4.0.0 Primary Keys

- userPreferenceId

### 5.22.5.0.0 Unique Constraints

- {'name': 'uq_userpreference_userid', 'columns': ['userId']}

### 5.22.6.0.0 Indexes

*No items available*

## 5.23.0.0.0 DataSubjectRequest

### 5.23.1.0.0 Name

DataSubjectRequest

### 5.23.2.0.0 Description

Tracks Data Subject Access Requests (DSARs) for data export and deletion to comply with regulations like GDPR (REQ-CMPL-001).

### 5.23.3.0.0 Attributes

#### 5.23.3.1.0 UUID

##### 5.23.3.1.1 Name

dataSubjectRequestId

##### 5.23.3.1.2 Type

🔹 UUID

##### 5.23.3.1.3 Is Required

✅ Yes

##### 5.23.3.1.4 Is Primary Key

✅ Yes

##### 5.23.3.1.5 Size

0

##### 5.23.3.1.6 Is Unique

✅ Yes

##### 5.23.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.23.3.1.8 Precision

0

##### 5.23.3.1.9 Scale

0

##### 5.23.3.1.10 Is Foreign Key

❌ No

#### 5.23.3.2.0 UUID

##### 5.23.3.2.1 Name

merchantAccountId

##### 5.23.3.2.2 Type

🔹 UUID

##### 5.23.3.2.3 Is Required

✅ Yes

##### 5.23.3.2.4 Is Primary Key

❌ No

##### 5.23.3.2.5 Size

0

##### 5.23.3.2.6 Is Unique

❌ No

##### 5.23.3.2.7 Constraints

*No items available*

##### 5.23.3.2.8 Precision

0

##### 5.23.3.2.9 Scale

0

##### 5.23.3.2.10 Is Foreign Key

✅ Yes

#### 5.23.3.3.0 VARCHAR

##### 5.23.3.3.1 Name

customerIdentifier

##### 5.23.3.3.2 Type

🔹 VARCHAR

##### 5.23.3.3.3 Is Required

✅ Yes

##### 5.23.3.3.4 Is Primary Key

❌ No

##### 5.23.3.3.5 Size

255

##### 5.23.3.3.6 Is Unique

❌ No

##### 5.23.3.3.7 Constraints

*No items available*

##### 5.23.3.3.8 Precision

0

##### 5.23.3.3.9 Scale

0

##### 5.23.3.3.10 Is Foreign Key

❌ No

#### 5.23.3.4.0 VARCHAR

##### 5.23.3.4.1 Name

requestType

##### 5.23.3.4.2 Type

🔹 VARCHAR

##### 5.23.3.4.3 Is Required

✅ Yes

##### 5.23.3.4.4 Is Primary Key

❌ No

##### 5.23.3.4.5 Size

20

##### 5.23.3.4.6 Is Unique

❌ No

##### 5.23.3.4.7 Constraints

- CHECK (requestType IN ('export', 'delete'))

##### 5.23.3.4.8 Precision

0

##### 5.23.3.4.9 Scale

0

##### 5.23.3.4.10 Is Foreign Key

❌ No

#### 5.23.3.5.0 VARCHAR

##### 5.23.3.5.1 Name

status

##### 5.23.3.5.2 Type

🔹 VARCHAR

##### 5.23.3.5.3 Is Required

✅ Yes

##### 5.23.3.5.4 Is Primary Key

❌ No

##### 5.23.3.5.5 Size

20

##### 5.23.3.5.6 Is Unique

❌ No

##### 5.23.3.5.7 Constraints

- CHECK (status IN ('pending', 'completed', 'failed'))
- DEFAULT 'pending'

##### 5.23.3.5.8 Precision

0

##### 5.23.3.5.9 Scale

0

##### 5.23.3.5.10 Is Foreign Key

❌ No

#### 5.23.3.6.0 UUID

##### 5.23.3.6.1 Name

requestedByUserId

##### 5.23.3.6.2 Type

🔹 UUID

##### 5.23.3.6.3 Is Required

✅ Yes

##### 5.23.3.6.4 Is Primary Key

❌ No

##### 5.23.3.6.5 Size

0

##### 5.23.3.6.6 Is Unique

❌ No

##### 5.23.3.6.7 Constraints

*No items available*

##### 5.23.3.6.8 Precision

0

##### 5.23.3.6.9 Scale

0

##### 5.23.3.6.10 Is Foreign Key

✅ Yes

#### 5.23.3.7.0 TIMESTAMP WITH TIME ZONE

##### 5.23.3.7.1 Name

createdAt

##### 5.23.3.7.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.23.3.7.3 Is Required

✅ Yes

##### 5.23.3.7.4 Is Primary Key

❌ No

##### 5.23.3.7.5 Size

0

##### 5.23.3.7.6 Is Unique

❌ No

##### 5.23.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.23.3.7.8 Precision

0

##### 5.23.3.7.9 Scale

0

##### 5.23.3.7.10 Is Foreign Key

❌ No

#### 5.23.3.8.0 TIMESTAMP WITH TIME ZONE

##### 5.23.3.8.1 Name

completedAt

##### 5.23.3.8.2 Type

🔹 TIMESTAMP WITH TIME ZONE

##### 5.23.3.8.3 Is Required

❌ No

##### 5.23.3.8.4 Is Primary Key

❌ No

##### 5.23.3.8.5 Size

0

##### 5.23.3.8.6 Is Unique

❌ No

##### 5.23.3.8.7 Constraints

*No items available*

##### 5.23.3.8.8 Precision

0

##### 5.23.3.8.9 Scale

0

##### 5.23.3.8.10 Is Foreign Key

❌ No

### 5.23.4.0.0 Primary Keys

- dataSubjectRequestId

### 5.23.5.0.0 Unique Constraints

*No items available*

### 5.23.6.0.0 Indexes

- {'name': 'idx_datasubjectrequest_merchant_status', 'columns': ['merchantAccountId', 'status'], 'type': 'BTree'}

