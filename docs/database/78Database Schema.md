# 1 Entities

## 1.1 User

### 1.1.1 Name

User

### 1.1.2 Description

Represents system users with authentication and profile information. A user can belong to multiple merchant accounts.

### 1.1.3 Attributes

#### 1.1.3.1 Guid

##### 1.1.3.1.1 Name

userId

##### 1.1.3.1.2 Type

🔹 Guid

##### 1.1.3.1.3 Is Required

✅ Yes

##### 1.1.3.1.4 Is Primary Key

✅ Yes

##### 1.1.3.1.5 Is Unique

✅ Yes

##### 1.1.3.1.6 Index Type

UniqueIndex

##### 1.1.3.1.7 Size

0

##### 1.1.3.1.8 Constraints

*No items available*

##### 1.1.3.1.9 Default Value



##### 1.1.3.1.10 Is Foreign Key

❌ No

##### 1.1.3.1.11 Precision

0

##### 1.1.3.1.12 Scale

0

#### 1.1.3.2.0 VARCHAR

##### 1.1.3.2.1 Name

email

##### 1.1.3.2.2 Type

🔹 VARCHAR

##### 1.1.3.2.3 Is Required

✅ Yes

##### 1.1.3.2.4 Is Primary Key

❌ No

##### 1.1.3.2.5 Is Unique

✅ Yes

##### 1.1.3.2.6 Index Type

UniqueIndex

##### 1.1.3.2.7 Size

255

##### 1.1.3.2.8 Constraints

- EMAIL_FORMAT

##### 1.1.3.2.9 Default Value



##### 1.1.3.2.10 Is Foreign Key

❌ No

##### 1.1.3.2.11 Precision

0

##### 1.1.3.2.12 Scale

0

#### 1.1.3.3.0 VARCHAR

##### 1.1.3.3.1 Name

firstName

##### 1.1.3.3.2 Type

🔹 VARCHAR

##### 1.1.3.3.3 Is Required

❌ No

##### 1.1.3.3.4 Is Primary Key

❌ No

##### 1.1.3.3.5 Is Unique

❌ No

##### 1.1.3.3.6 Index Type

Index

##### 1.1.3.3.7 Size

100

##### 1.1.3.3.8 Constraints

*No items available*

##### 1.1.3.3.9 Default Value



##### 1.1.3.3.10 Is Foreign Key

❌ No

##### 1.1.3.3.11 Precision

0

##### 1.1.3.3.12 Scale

0

#### 1.1.3.4.0 VARCHAR

##### 1.1.3.4.1 Name

lastName

##### 1.1.3.4.2 Type

🔹 VARCHAR

##### 1.1.3.4.3 Is Required

❌ No

##### 1.1.3.4.4 Is Primary Key

❌ No

##### 1.1.3.4.5 Is Unique

❌ No

##### 1.1.3.4.6 Index Type

Index

##### 1.1.3.4.7 Size

100

##### 1.1.3.4.8 Constraints

*No items available*

##### 1.1.3.4.9 Default Value



##### 1.1.3.4.10 Is Foreign Key

❌ No

##### 1.1.3.4.11 Precision

0

##### 1.1.3.4.12 Scale

0

#### 1.1.3.5.0 VARCHAR

##### 1.1.3.5.1 Name

passwordHash

##### 1.1.3.5.2 Type

🔹 VARCHAR

##### 1.1.3.5.3 Is Required

✅ Yes

##### 1.1.3.5.4 Is Primary Key

❌ No

##### 1.1.3.5.5 Is Unique

❌ No

##### 1.1.3.5.6 Index Type

None

##### 1.1.3.5.7 Size

255

##### 1.1.3.5.8 Constraints

*No items available*

##### 1.1.3.5.9 Default Value



##### 1.1.3.5.10 Is Foreign Key

❌ No

##### 1.1.3.5.11 Precision

0

##### 1.1.3.5.12 Scale

0

#### 1.1.3.6.0 BOOLEAN

##### 1.1.3.6.1 Name

isActive

##### 1.1.3.6.2 Type

🔹 BOOLEAN

##### 1.1.3.6.3 Is Required

✅ Yes

##### 1.1.3.6.4 Is Primary Key

❌ No

##### 1.1.3.6.5 Is Unique

❌ No

##### 1.1.3.6.6 Index Type

Index

##### 1.1.3.6.7 Size

0

##### 1.1.3.6.8 Constraints

*No items available*

##### 1.1.3.6.9 Default Value

true

##### 1.1.3.6.10 Is Foreign Key

❌ No

##### 1.1.3.6.11 Precision

0

##### 1.1.3.6.12 Scale

0

#### 1.1.3.7.0 DateTime

##### 1.1.3.7.1 Name

createdAt

##### 1.1.3.7.2 Type

🔹 DateTime

##### 1.1.3.7.3 Is Required

✅ Yes

##### 1.1.3.7.4 Is Primary Key

❌ No

##### 1.1.3.7.5 Is Unique

❌ No

##### 1.1.3.7.6 Index Type

Index

##### 1.1.3.7.7 Size

0

##### 1.1.3.7.8 Constraints

*No items available*

##### 1.1.3.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.1.3.7.10 Is Foreign Key

❌ No

##### 1.1.3.7.11 Precision

0

##### 1.1.3.7.12 Scale

0

#### 1.1.3.8.0 DateTime

##### 1.1.3.8.1 Name

updatedAt

##### 1.1.3.8.2 Type

🔹 DateTime

##### 1.1.3.8.3 Is Required

✅ Yes

##### 1.1.3.8.4 Is Primary Key

❌ No

##### 1.1.3.8.5 Is Unique

❌ No

##### 1.1.3.8.6 Index Type

None

##### 1.1.3.8.7 Size

0

##### 1.1.3.8.8 Constraints

*No items available*

##### 1.1.3.8.9 Default Value

CURRENT_TIMESTAMP

##### 1.1.3.8.10 Is Foreign Key

❌ No

##### 1.1.3.8.11 Precision

0

##### 1.1.3.8.12 Scale

0

### 1.1.4.0.0 Primary Keys

- userId

### 1.1.5.0.0 Unique Constraints

- {'name': 'UC_User_Email', 'columns': ['email']}

### 1.1.6.0.0 Indexes

- {'name': 'IX_User_FullName', 'columns': ['firstName', 'lastName'], 'type': 'BTree'}

## 1.2.0.0.0 PasswordResetToken

### 1.2.1.0.0 Name

PasswordResetToken

### 1.2.2.0.0 Description

Stores temporary, secure tokens for the password reset workflow (REQ-FUNC-003).

### 1.2.3.0.0 Attributes

#### 1.2.3.1.0 Guid

##### 1.2.3.1.1 Name

passwordResetTokenId

##### 1.2.3.1.2 Type

🔹 Guid

##### 1.2.3.1.3 Is Required

✅ Yes

##### 1.2.3.1.4 Is Primary Key

✅ Yes

##### 1.2.3.1.5 Is Unique

✅ Yes

##### 1.2.3.1.6 Index Type

UniqueIndex

##### 1.2.3.1.7 Size

0

##### 1.2.3.1.8 Constraints

*No items available*

##### 1.2.3.1.9 Default Value



##### 1.2.3.1.10 Is Foreign Key

❌ No

##### 1.2.3.1.11 Precision

0

##### 1.2.3.1.12 Scale

0

#### 1.2.3.2.0 Guid

##### 1.2.3.2.1 Name

UserId

##### 1.2.3.2.2 Type

🔹 Guid

##### 1.2.3.2.3 Is Required

✅ Yes

##### 1.2.3.2.4 Is Primary Key

❌ No

##### 1.2.3.2.5 Is Unique

❌ No

##### 1.2.3.2.6 Index Type

Index

##### 1.2.3.2.7 Size

0

##### 1.2.3.2.8 Constraints

*No items available*

##### 1.2.3.2.9 Default Value



##### 1.2.3.2.10 Is Foreign Key

✅ Yes

##### 1.2.3.2.11 Precision

0

##### 1.2.3.2.12 Scale

0

#### 1.2.3.3.0 VARCHAR

##### 1.2.3.3.1 Name

tokenHash

##### 1.2.3.3.2 Type

🔹 VARCHAR

##### 1.2.3.3.3 Is Required

✅ Yes

##### 1.2.3.3.4 Is Primary Key

❌ No

##### 1.2.3.3.5 Is Unique

✅ Yes

##### 1.2.3.3.6 Index Type

UniqueIndex

##### 1.2.3.3.7 Size

255

##### 1.2.3.3.8 Constraints

*No items available*

##### 1.2.3.3.9 Default Value



##### 1.2.3.3.10 Is Foreign Key

❌ No

##### 1.2.3.3.11 Precision

0

##### 1.2.3.3.12 Scale

0

#### 1.2.3.4.0 DateTime

##### 1.2.3.4.1 Name

expiresAt

##### 1.2.3.4.2 Type

🔹 DateTime

##### 1.2.3.4.3 Is Required

✅ Yes

##### 1.2.3.4.4 Is Primary Key

❌ No

##### 1.2.3.4.5 Is Unique

❌ No

##### 1.2.3.4.6 Index Type

Index

##### 1.2.3.4.7 Size

0

##### 1.2.3.4.8 Constraints

*No items available*

##### 1.2.3.4.9 Default Value



##### 1.2.3.4.10 Is Foreign Key

❌ No

##### 1.2.3.4.11 Precision

0

##### 1.2.3.4.12 Scale

0

#### 1.2.3.5.0 DateTime

##### 1.2.3.5.1 Name

createdAt

##### 1.2.3.5.2 Type

🔹 DateTime

##### 1.2.3.5.3 Is Required

✅ Yes

##### 1.2.3.5.4 Is Primary Key

❌ No

##### 1.2.3.5.5 Is Unique

❌ No

##### 1.2.3.5.6 Index Type

None

##### 1.2.3.5.7 Size

0

##### 1.2.3.5.8 Constraints

*No items available*

##### 1.2.3.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.2.3.5.10 Is Foreign Key

❌ No

##### 1.2.3.5.11 Precision

0

##### 1.2.3.5.12 Scale

0

### 1.2.4.0.0 Primary Keys

- passwordResetTokenId

### 1.2.5.0.0 Unique Constraints

- {'name': 'UC_PasswordResetToken_TokenHash', 'columns': ['tokenHash']}

### 1.2.6.0.0 Indexes

*No items available*

## 1.3.0.0.0 MerchantAccount

### 1.3.1.0.0 Name

MerchantAccount

### 1.3.2.0.0 Description

Represents a tenant's account or workspace, which contains all of their associated data like products, sales, and users.

### 1.3.3.0.0 Attributes

#### 1.3.3.1.0 Guid

##### 1.3.3.1.1 Name

merchantAccountId

##### 1.3.3.1.2 Type

🔹 Guid

##### 1.3.3.1.3 Is Required

✅ Yes

##### 1.3.3.1.4 Is Primary Key

✅ Yes

##### 1.3.3.1.5 Is Unique

✅ Yes

##### 1.3.3.1.6 Index Type

UniqueIndex

##### 1.3.3.1.7 Size

0

##### 1.3.3.1.8 Constraints

*No items available*

##### 1.3.3.1.9 Default Value



##### 1.3.3.1.10 Is Foreign Key

❌ No

##### 1.3.3.1.11 Precision

0

##### 1.3.3.1.12 Scale

0

#### 1.3.3.2.0 VARCHAR

##### 1.3.3.2.1 Name

accountName

##### 1.3.3.2.2 Type

🔹 VARCHAR

##### 1.3.3.2.3 Is Required

✅ Yes

##### 1.3.3.2.4 Is Primary Key

❌ No

##### 1.3.3.2.5 Is Unique

❌ No

##### 1.3.3.2.6 Index Type

Index

##### 1.3.3.2.7 Size

255

##### 1.3.3.2.8 Constraints

*No items available*

##### 1.3.3.2.9 Default Value



##### 1.3.3.2.10 Is Foreign Key

❌ No

##### 1.3.3.2.11 Precision

0

##### 1.3.3.2.12 Scale

0

#### 1.3.3.3.0 BOOLEAN

##### 1.3.3.3.1 Name

isActive

##### 1.3.3.3.2 Type

🔹 BOOLEAN

##### 1.3.3.3.3 Is Required

✅ Yes

##### 1.3.3.3.4 Is Primary Key

❌ No

##### 1.3.3.3.5 Is Unique

❌ No

##### 1.3.3.3.6 Index Type

Index

##### 1.3.3.3.7 Size

0

##### 1.3.3.3.8 Constraints

*No items available*

##### 1.3.3.3.9 Default Value

true

##### 1.3.3.3.10 Is Foreign Key

❌ No

##### 1.3.3.3.11 Precision

0

##### 1.3.3.3.12 Scale

0

#### 1.3.3.4.0 DateTime

##### 1.3.3.4.1 Name

createdAt

##### 1.3.3.4.2 Type

🔹 DateTime

##### 1.3.3.4.3 Is Required

✅ Yes

##### 1.3.3.4.4 Is Primary Key

❌ No

##### 1.3.3.4.5 Is Unique

❌ No

##### 1.3.3.4.6 Index Type

Index

##### 1.3.3.4.7 Size

0

##### 1.3.3.4.8 Constraints

*No items available*

##### 1.3.3.4.9 Default Value

CURRENT_TIMESTAMP

##### 1.3.3.4.10 Is Foreign Key

❌ No

##### 1.3.3.4.11 Precision

0

##### 1.3.3.4.12 Scale

0

#### 1.3.3.5.0 DateTime

##### 1.3.3.5.1 Name

updatedAt

##### 1.3.3.5.2 Type

🔹 DateTime

##### 1.3.3.5.3 Is Required

✅ Yes

##### 1.3.3.5.4 Is Primary Key

❌ No

##### 1.3.3.5.5 Is Unique

❌ No

##### 1.3.3.5.6 Index Type

None

##### 1.3.3.5.7 Size

0

##### 1.3.3.5.8 Constraints

*No items available*

##### 1.3.3.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.3.3.5.10 Is Foreign Key

❌ No

##### 1.3.3.5.11 Precision

0

##### 1.3.3.5.12 Scale

0

### 1.3.4.0.0 Primary Keys

- merchantAccountId

### 1.3.5.0.0 Unique Constraints

*No items available*

### 1.3.6.0.0 Indexes

*No items available*

## 1.4.0.0.0 Role

### 1.4.1.0.0 Name

Role

### 1.4.2.0.0 Description

Defines a set of permissions for users within a merchant account (e.g., Owner, Admin, Analyst).

### 1.4.3.0.0 Attributes

#### 1.4.3.1.0 Guid

##### 1.4.3.1.1 Name

roleId

##### 1.4.3.1.2 Type

🔹 Guid

##### 1.4.3.1.3 Is Required

✅ Yes

##### 1.4.3.1.4 Is Primary Key

✅ Yes

##### 1.4.3.1.5 Is Unique

✅ Yes

##### 1.4.3.1.6 Index Type

UniqueIndex

##### 1.4.3.1.7 Size

0

##### 1.4.3.1.8 Constraints

*No items available*

##### 1.4.3.1.9 Default Value



##### 1.4.3.1.10 Is Foreign Key

❌ No

##### 1.4.3.1.11 Precision

0

##### 1.4.3.1.12 Scale

0

#### 1.4.3.2.0 VARCHAR

##### 1.4.3.2.1 Name

roleName

##### 1.4.3.2.2 Type

🔹 VARCHAR

##### 1.4.3.2.3 Is Required

✅ Yes

##### 1.4.3.2.4 Is Primary Key

❌ No

##### 1.4.3.2.5 Is Unique

✅ Yes

##### 1.4.3.2.6 Index Type

UniqueIndex

##### 1.4.3.2.7 Size

50

##### 1.4.3.2.8 Constraints

- ENUM('Owner', 'Admin', 'Analyst', 'Marketer')

##### 1.4.3.2.9 Default Value



##### 1.4.3.2.10 Is Foreign Key

❌ No

##### 1.4.3.2.11 Precision

0

##### 1.4.3.2.12 Scale

0

### 1.4.4.0.0 Primary Keys

- roleId

### 1.4.5.0.0 Unique Constraints

- {'name': 'UC_Role_RoleName', 'columns': ['roleName']}

### 1.4.6.0.0 Indexes

*No items available*

## 1.5.0.0.0 UserMerchantAccount

### 1.5.1.0.0 Name

UserMerchantAccount

### 1.5.2.0.0 Description

A join table linking Users to MerchantAccounts, assigning them a specific Role. This enables multi-tenancy and team management (REQ-FUNC-007, REQ-UI-001).

### 1.5.3.0.0 Attributes

#### 1.5.3.1.0 Guid

##### 1.5.3.1.1 Name

userMerchantAccountId

##### 1.5.3.1.2 Type

🔹 Guid

##### 1.5.3.1.3 Is Required

✅ Yes

##### 1.5.3.1.4 Is Primary Key

✅ Yes

##### 1.5.3.1.5 Is Unique

✅ Yes

##### 1.5.3.1.6 Index Type

UniqueIndex

##### 1.5.3.1.7 Size

0

##### 1.5.3.1.8 Constraints

*No items available*

##### 1.5.3.1.9 Default Value



##### 1.5.3.1.10 Is Foreign Key

❌ No

##### 1.5.3.1.11 Precision

0

##### 1.5.3.1.12 Scale

0

#### 1.5.3.2.0 Guid

##### 1.5.3.2.1 Name

UserId

##### 1.5.3.2.2 Type

🔹 Guid

##### 1.5.3.2.3 Is Required

✅ Yes

##### 1.5.3.2.4 Is Primary Key

❌ No

##### 1.5.3.2.5 Is Unique

❌ No

##### 1.5.3.2.6 Index Type

Index

##### 1.5.3.2.7 Size

0

##### 1.5.3.2.8 Constraints

*No items available*

##### 1.5.3.2.9 Default Value



##### 1.5.3.2.10 Is Foreign Key

✅ Yes

##### 1.5.3.2.11 Precision

0

##### 1.5.3.2.12 Scale

0

#### 1.5.3.3.0 Guid

##### 1.5.3.3.1 Name

MerchantAccountId

##### 1.5.3.3.2 Type

🔹 Guid

##### 1.5.3.3.3 Is Required

✅ Yes

##### 1.5.3.3.4 Is Primary Key

❌ No

##### 1.5.3.3.5 Is Unique

❌ No

##### 1.5.3.3.6 Index Type

Index

##### 1.5.3.3.7 Size

0

##### 1.5.3.3.8 Constraints

*No items available*

##### 1.5.3.3.9 Default Value



##### 1.5.3.3.10 Is Foreign Key

✅ Yes

##### 1.5.3.3.11 Precision

0

##### 1.5.3.3.12 Scale

0

#### 1.5.3.4.0 Guid

##### 1.5.3.4.1 Name

RoleId

##### 1.5.3.4.2 Type

🔹 Guid

##### 1.5.3.4.3 Is Required

✅ Yes

##### 1.5.3.4.4 Is Primary Key

❌ No

##### 1.5.3.4.5 Is Unique

❌ No

##### 1.5.3.4.6 Index Type

Index

##### 1.5.3.4.7 Size

0

##### 1.5.3.4.8 Constraints

*No items available*

##### 1.5.3.4.9 Default Value



##### 1.5.3.4.10 Is Foreign Key

✅ Yes

##### 1.5.3.4.11 Precision

0

##### 1.5.3.4.12 Scale

0

#### 1.5.3.5.0 DateTime

##### 1.5.3.5.1 Name

createdAt

##### 1.5.3.5.2 Type

🔹 DateTime

##### 1.5.3.5.3 Is Required

✅ Yes

##### 1.5.3.5.4 Is Primary Key

❌ No

##### 1.5.3.5.5 Is Unique

❌ No

##### 1.5.3.5.6 Index Type

None

##### 1.5.3.5.7 Size

0

##### 1.5.3.5.8 Constraints

*No items available*

##### 1.5.3.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.5.3.5.10 Is Foreign Key

❌ No

##### 1.5.3.5.11 Precision

0

##### 1.5.3.5.12 Scale

0

### 1.5.4.0.0 Primary Keys

- userMerchantAccountId

### 1.5.5.0.0 Unique Constraints

- {'name': 'UC_UserMerchantAccount_User_Merchant', 'columns': ['UserId', 'MerchantAccountId']}

### 1.5.6.0.0 Indexes

- {'name': 'IX_UserMerchantAccount_Merchant_Role', 'columns': ['MerchantAccountId', 'RoleId'], 'type': 'BTree'}

## 1.6.0.0.0 Invitation

### 1.6.1.0.0 Name

Invitation

### 1.6.2.0.0 Description

Tracks invitations sent to users to join a merchant account (REQ-FUNC-006).

### 1.6.3.0.0 Attributes

#### 1.6.3.1.0 Guid

##### 1.6.3.1.1 Name

invitationId

##### 1.6.3.1.2 Type

🔹 Guid

##### 1.6.3.1.3 Is Required

✅ Yes

##### 1.6.3.1.4 Is Primary Key

✅ Yes

##### 1.6.3.1.5 Is Unique

✅ Yes

##### 1.6.3.1.6 Index Type

UniqueIndex

##### 1.6.3.1.7 Size

0

##### 1.6.3.1.8 Constraints

*No items available*

##### 1.6.3.1.9 Default Value



##### 1.6.3.1.10 Is Foreign Key

❌ No

##### 1.6.3.1.11 Precision

0

##### 1.6.3.1.12 Scale

0

#### 1.6.3.2.0 Guid

##### 1.6.3.2.1 Name

MerchantAccountId

##### 1.6.3.2.2 Type

🔹 Guid

##### 1.6.3.2.3 Is Required

✅ Yes

##### 1.6.3.2.4 Is Primary Key

❌ No

##### 1.6.3.2.5 Is Unique

❌ No

##### 1.6.3.2.6 Index Type

Index

##### 1.6.3.2.7 Size

0

##### 1.6.3.2.8 Constraints

*No items available*

##### 1.6.3.2.9 Default Value



##### 1.6.3.2.10 Is Foreign Key

✅ Yes

##### 1.6.3.2.11 Precision

0

##### 1.6.3.2.12 Scale

0

#### 1.6.3.3.0 Guid

##### 1.6.3.3.1 Name

InvitedByUserId

##### 1.6.3.3.2 Type

🔹 Guid

##### 1.6.3.3.3 Is Required

✅ Yes

##### 1.6.3.3.4 Is Primary Key

❌ No

##### 1.6.3.3.5 Is Unique

❌ No

##### 1.6.3.3.6 Index Type

Index

##### 1.6.3.3.7 Size

0

##### 1.6.3.3.8 Constraints

*No items available*

##### 1.6.3.3.9 Default Value



##### 1.6.3.3.10 Is Foreign Key

✅ Yes

##### 1.6.3.3.11 Precision

0

##### 1.6.3.3.12 Scale

0

#### 1.6.3.4.0 Guid

##### 1.6.3.4.1 Name

RoleId

##### 1.6.3.4.2 Type

🔹 Guid

##### 1.6.3.4.3 Is Required

✅ Yes

##### 1.6.3.4.4 Is Primary Key

❌ No

##### 1.6.3.4.5 Is Unique

❌ No

##### 1.6.3.4.6 Index Type

Index

##### 1.6.3.4.7 Size

0

##### 1.6.3.4.8 Constraints

*No items available*

##### 1.6.3.4.9 Default Value



##### 1.6.3.4.10 Is Foreign Key

✅ Yes

##### 1.6.3.4.11 Precision

0

##### 1.6.3.4.12 Scale

0

#### 1.6.3.5.0 VARCHAR

##### 1.6.3.5.1 Name

inviteeEmail

##### 1.6.3.5.2 Type

🔹 VARCHAR

##### 1.6.3.5.3 Is Required

✅ Yes

##### 1.6.3.5.4 Is Primary Key

❌ No

##### 1.6.3.5.5 Is Unique

❌ No

##### 1.6.3.5.6 Index Type

Index

##### 1.6.3.5.7 Size

255

##### 1.6.3.5.8 Constraints

- EMAIL_FORMAT

##### 1.6.3.5.9 Default Value



##### 1.6.3.5.10 Is Foreign Key

❌ No

##### 1.6.3.5.11 Precision

0

##### 1.6.3.5.12 Scale

0

#### 1.6.3.6.0 VARCHAR

##### 1.6.3.6.1 Name

invitationTokenHash

##### 1.6.3.6.2 Type

🔹 VARCHAR

##### 1.6.3.6.3 Is Required

✅ Yes

##### 1.6.3.6.4 Is Primary Key

❌ No

##### 1.6.3.6.5 Is Unique

✅ Yes

##### 1.6.3.6.6 Index Type

UniqueIndex

##### 1.6.3.6.7 Size

255

##### 1.6.3.6.8 Constraints

*No items available*

##### 1.6.3.6.9 Default Value



##### 1.6.3.6.10 Is Foreign Key

❌ No

##### 1.6.3.6.11 Precision

0

##### 1.6.3.6.12 Scale

0

#### 1.6.3.7.0 VARCHAR

##### 1.6.3.7.1 Name

status

##### 1.6.3.7.2 Type

🔹 VARCHAR

##### 1.6.3.7.3 Is Required

✅ Yes

##### 1.6.3.7.4 Is Primary Key

❌ No

##### 1.6.3.7.5 Is Unique

❌ No

##### 1.6.3.7.6 Index Type

Index

##### 1.6.3.7.7 Size

20

##### 1.6.3.7.8 Constraints

- ENUM('pending', 'accepted', 'expired')

##### 1.6.3.7.9 Default Value

pending

##### 1.6.3.7.10 Is Foreign Key

❌ No

##### 1.6.3.7.11 Precision

0

##### 1.6.3.7.12 Scale

0

#### 1.6.3.8.0 DateTime

##### 1.6.3.8.1 Name

expiresAt

##### 1.6.3.8.2 Type

🔹 DateTime

##### 1.6.3.8.3 Is Required

✅ Yes

##### 1.6.3.8.4 Is Primary Key

❌ No

##### 1.6.3.8.5 Is Unique

❌ No

##### 1.6.3.8.6 Index Type

Index

##### 1.6.3.8.7 Size

0

##### 1.6.3.8.8 Constraints

*No items available*

##### 1.6.3.8.9 Default Value



##### 1.6.3.8.10 Is Foreign Key

❌ No

##### 1.6.3.8.11 Precision

0

##### 1.6.3.8.12 Scale

0

#### 1.6.3.9.0 DateTime

##### 1.6.3.9.1 Name

createdAt

##### 1.6.3.9.2 Type

🔹 DateTime

##### 1.6.3.9.3 Is Required

✅ Yes

##### 1.6.3.9.4 Is Primary Key

❌ No

##### 1.6.3.9.5 Is Unique

❌ No

##### 1.6.3.9.6 Index Type

None

##### 1.6.3.9.7 Size

0

##### 1.6.3.9.8 Constraints

*No items available*

##### 1.6.3.9.9 Default Value

CURRENT_TIMESTAMP

##### 1.6.3.9.10 Is Foreign Key

❌ No

##### 1.6.3.9.11 Precision

0

##### 1.6.3.9.12 Scale

0

### 1.6.4.0.0 Primary Keys

- invitationId

### 1.6.5.0.0 Unique Constraints

- {'name': 'UC_Invitation_TokenHash', 'columns': ['invitationTokenHash']}

### 1.6.6.0.0 Indexes

- {'name': 'IX_Invitation_Status_ExpiresAt', 'columns': ['status', 'expiresAt'], 'type': 'BTree'}

## 1.7.0.0.0 Customer

### 1.7.1.0.0 Name

Customer

### 1.7.2.0.0 Description

Represents a merchant's end customer, used for sales tracking and segmentation reports (REQ-FUNC-010).

### 1.7.3.0.0 Attributes

#### 1.7.3.1.0 Guid

##### 1.7.3.1.1 Name

customerId

##### 1.7.3.1.2 Type

🔹 Guid

##### 1.7.3.1.3 Is Required

✅ Yes

##### 1.7.3.1.4 Is Primary Key

✅ Yes

##### 1.7.3.1.5 Is Unique

✅ Yes

##### 1.7.3.1.6 Index Type

UniqueIndex

##### 1.7.3.1.7 Size

0

##### 1.7.3.1.8 Constraints

*No items available*

##### 1.7.3.1.9 Default Value



##### 1.7.3.1.10 Is Foreign Key

❌ No

##### 1.7.3.1.11 Precision

0

##### 1.7.3.1.12 Scale

0

#### 1.7.3.2.0 Guid

##### 1.7.3.2.1 Name

MerchantAccountId

##### 1.7.3.2.2 Type

🔹 Guid

##### 1.7.3.2.3 Is Required

✅ Yes

##### 1.7.3.2.4 Is Primary Key

❌ No

##### 1.7.3.2.5 Is Unique

❌ No

##### 1.7.3.2.6 Index Type

Index

##### 1.7.3.2.7 Size

0

##### 1.7.3.2.8 Constraints

*No items available*

##### 1.7.3.2.9 Default Value



##### 1.7.3.2.10 Is Foreign Key

✅ Yes

##### 1.7.3.2.11 Precision

0

##### 1.7.3.2.12 Scale

0

#### 1.7.3.3.0 VARCHAR

##### 1.7.3.3.1 Name

email

##### 1.7.3.3.2 Type

🔹 VARCHAR

##### 1.7.3.3.3 Is Required

✅ Yes

##### 1.7.3.3.4 Is Primary Key

❌ No

##### 1.7.3.3.5 Is Unique

❌ No

##### 1.7.3.3.6 Index Type

Index

##### 1.7.3.3.7 Size

255

##### 1.7.3.3.8 Constraints

- EMAIL_FORMAT

##### 1.7.3.3.9 Default Value



##### 1.7.3.3.10 Is Foreign Key

❌ No

##### 1.7.3.3.11 Precision

0

##### 1.7.3.3.12 Scale

0

#### 1.7.3.4.0 VARCHAR

##### 1.7.3.4.1 Name

firstName

##### 1.7.3.4.2 Type

🔹 VARCHAR

##### 1.7.3.4.3 Is Required

❌ No

##### 1.7.3.4.4 Is Primary Key

❌ No

##### 1.7.3.4.5 Is Unique

❌ No

##### 1.7.3.4.6 Index Type

Index

##### 1.7.3.4.7 Size

100

##### 1.7.3.4.8 Constraints

*No items available*

##### 1.7.3.4.9 Default Value



##### 1.7.3.4.10 Is Foreign Key

❌ No

##### 1.7.3.4.11 Precision

0

##### 1.7.3.4.12 Scale

0

#### 1.7.3.5.0 VARCHAR

##### 1.7.3.5.1 Name

lastName

##### 1.7.3.5.2 Type

🔹 VARCHAR

##### 1.7.3.5.3 Is Required

❌ No

##### 1.7.3.5.4 Is Primary Key

❌ No

##### 1.7.3.5.5 Is Unique

❌ No

##### 1.7.3.5.6 Index Type

Index

##### 1.7.3.5.7 Size

100

##### 1.7.3.5.8 Constraints

*No items available*

##### 1.7.3.5.9 Default Value



##### 1.7.3.5.10 Is Foreign Key

❌ No

##### 1.7.3.5.11 Precision

0

##### 1.7.3.5.12 Scale

0

#### 1.7.3.6.0 VARCHAR

##### 1.7.3.6.1 Name

city

##### 1.7.3.6.2 Type

🔹 VARCHAR

##### 1.7.3.6.3 Is Required

❌ No

##### 1.7.3.6.4 Is Primary Key

❌ No

##### 1.7.3.6.5 Is Unique

❌ No

##### 1.7.3.6.6 Index Type

Index

##### 1.7.3.6.7 Size

100

##### 1.7.3.6.8 Constraints

*No items available*

##### 1.7.3.6.9 Default Value



##### 1.7.3.6.10 Is Foreign Key

❌ No

##### 1.7.3.6.11 Precision

0

##### 1.7.3.6.12 Scale

0

#### 1.7.3.7.0 VARCHAR

##### 1.7.3.7.1 Name

country

##### 1.7.3.7.2 Type

🔹 VARCHAR

##### 1.7.3.7.3 Is Required

❌ No

##### 1.7.3.7.4 Is Primary Key

❌ No

##### 1.7.3.7.5 Is Unique

❌ No

##### 1.7.3.7.6 Index Type

Index

##### 1.7.3.7.7 Size

100

##### 1.7.3.7.8 Constraints

*No items available*

##### 1.7.3.7.9 Default Value



##### 1.7.3.7.10 Is Foreign Key

❌ No

##### 1.7.3.7.11 Precision

0

##### 1.7.3.7.12 Scale

0

#### 1.7.3.8.0 DateTime

##### 1.7.3.8.1 Name

createdAt

##### 1.7.3.8.2 Type

🔹 DateTime

##### 1.7.3.8.3 Is Required

✅ Yes

##### 1.7.3.8.4 Is Primary Key

❌ No

##### 1.7.3.8.5 Is Unique

❌ No

##### 1.7.3.8.6 Index Type

Index

##### 1.7.3.8.7 Size

0

##### 1.7.3.8.8 Constraints

*No items available*

##### 1.7.3.8.9 Default Value

CURRENT_TIMESTAMP

##### 1.7.3.8.10 Is Foreign Key

❌ No

##### 1.7.3.8.11 Precision

0

##### 1.7.3.8.12 Scale

0

#### 1.7.3.9.0 DateTime

##### 1.7.3.9.1 Name

updatedAt

##### 1.7.3.9.2 Type

🔹 DateTime

##### 1.7.3.9.3 Is Required

✅ Yes

##### 1.7.3.9.4 Is Primary Key

❌ No

##### 1.7.3.9.5 Is Unique

❌ No

##### 1.7.3.9.6 Index Type

None

##### 1.7.3.9.7 Size

0

##### 1.7.3.9.8 Constraints

*No items available*

##### 1.7.3.9.9 Default Value

CURRENT_TIMESTAMP

##### 1.7.3.9.10 Is Foreign Key

❌ No

##### 1.7.3.9.11 Precision

0

##### 1.7.3.9.12 Scale

0

### 1.7.4.0.0 Primary Keys

- customerId

### 1.7.5.0.0 Unique Constraints

- {'name': 'UC_Customer_Merchant_Email', 'columns': ['MerchantAccountId', 'email']}

### 1.7.6.0.0 Indexes

- {'name': 'IX_Customer_Merchant_Location', 'columns': ['MerchantAccountId', 'country', 'city'], 'type': 'BTree'}

## 1.8.0.0.0 Category

### 1.8.1.0.0 Name

Category

### 1.8.2.0.0 Description

Represents product categories for filtering and organization in reports (REQ-FUNC-011). Supports hierarchical structures.

### 1.8.3.0.0 Attributes

#### 1.8.3.1.0 Guid

##### 1.8.3.1.1 Name

categoryId

##### 1.8.3.1.2 Type

🔹 Guid

##### 1.8.3.1.3 Is Required

✅ Yes

##### 1.8.3.1.4 Is Primary Key

✅ Yes

##### 1.8.3.1.5 Is Unique

✅ Yes

##### 1.8.3.1.6 Index Type

UniqueIndex

##### 1.8.3.1.7 Size

0

##### 1.8.3.1.8 Constraints

*No items available*

##### 1.8.3.1.9 Default Value



##### 1.8.3.1.10 Is Foreign Key

❌ No

##### 1.8.3.1.11 Precision

0

##### 1.8.3.1.12 Scale

0

#### 1.8.3.2.0 Guid

##### 1.8.3.2.1 Name

MerchantAccountId

##### 1.8.3.2.2 Type

🔹 Guid

##### 1.8.3.2.3 Is Required

✅ Yes

##### 1.8.3.2.4 Is Primary Key

❌ No

##### 1.8.3.2.5 Is Unique

❌ No

##### 1.8.3.2.6 Index Type

Index

##### 1.8.3.2.7 Size

0

##### 1.8.3.2.8 Constraints

*No items available*

##### 1.8.3.2.9 Default Value



##### 1.8.3.2.10 Is Foreign Key

✅ Yes

##### 1.8.3.2.11 Precision

0

##### 1.8.3.2.12 Scale

0

#### 1.8.3.3.0 VARCHAR

##### 1.8.3.3.1 Name

name

##### 1.8.3.3.2 Type

🔹 VARCHAR

##### 1.8.3.3.3 Is Required

✅ Yes

##### 1.8.3.3.4 Is Primary Key

❌ No

##### 1.8.3.3.5 Is Unique

❌ No

##### 1.8.3.3.6 Index Type

Index

##### 1.8.3.3.7 Size

100

##### 1.8.3.3.8 Constraints

*No items available*

##### 1.8.3.3.9 Default Value



##### 1.8.3.3.10 Is Foreign Key

❌ No

##### 1.8.3.3.11 Precision

0

##### 1.8.3.3.12 Scale

0

#### 1.8.3.4.0 Guid

##### 1.8.3.4.1 Name

ParentCategoryId

##### 1.8.3.4.2 Type

🔹 Guid

##### 1.8.3.4.3 Is Required

❌ No

##### 1.8.3.4.4 Is Primary Key

❌ No

##### 1.8.3.4.5 Is Unique

❌ No

##### 1.8.3.4.6 Index Type

Index

##### 1.8.3.4.7 Size

0

##### 1.8.3.4.8 Constraints

*No items available*

##### 1.8.3.4.9 Default Value



##### 1.8.3.4.10 Is Foreign Key

✅ Yes

##### 1.8.3.4.11 Precision

0

##### 1.8.3.4.12 Scale

0

#### 1.8.3.5.0 DateTime

##### 1.8.3.5.1 Name

createdAt

##### 1.8.3.5.2 Type

🔹 DateTime

##### 1.8.3.5.3 Is Required

✅ Yes

##### 1.8.3.5.4 Is Primary Key

❌ No

##### 1.8.3.5.5 Is Unique

❌ No

##### 1.8.3.5.6 Index Type

None

##### 1.8.3.5.7 Size

0

##### 1.8.3.5.8 Constraints

*No items available*

##### 1.8.3.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.8.3.5.10 Is Foreign Key

❌ No

##### 1.8.3.5.11 Precision

0

##### 1.8.3.5.12 Scale

0

#### 1.8.3.6.0 DateTime

##### 1.8.3.6.1 Name

updatedAt

##### 1.8.3.6.2 Type

🔹 DateTime

##### 1.8.3.6.3 Is Required

✅ Yes

##### 1.8.3.6.4 Is Primary Key

❌ No

##### 1.8.3.6.5 Is Unique

❌ No

##### 1.8.3.6.6 Index Type

None

##### 1.8.3.6.7 Size

0

##### 1.8.3.6.8 Constraints

*No items available*

##### 1.8.3.6.9 Default Value

CURRENT_TIMESTAMP

##### 1.8.3.6.10 Is Foreign Key

❌ No

##### 1.8.3.6.11 Precision

0

##### 1.8.3.6.12 Scale

0

### 1.8.4.0.0 Primary Keys

- categoryId

### 1.8.5.0.0 Unique Constraints

- {'name': 'UC_Category_Merchant_Name', 'columns': ['MerchantAccountId', 'name']}

### 1.8.6.0.0 Indexes

*No items available*

### 1.8.7.0.0 Caching

#### 1.8.7.1.0 Strategy

Application-Memory

#### 1.8.7.2.0 Invalidation

Event-Driven

## 1.9.0.0.0 Product

### 1.9.1.0.0 Name

Product

### 1.9.2.0.0 Description

Represents an item for sale by a merchant. Forms the basis for product performance reports (REQ-FUNC-011).

### 1.9.3.0.0 Attributes

#### 1.9.3.1.0 Guid

##### 1.9.3.1.1 Name

productId

##### 1.9.3.1.2 Type

🔹 Guid

##### 1.9.3.1.3 Is Required

✅ Yes

##### 1.9.3.1.4 Is Primary Key

✅ Yes

##### 1.9.3.1.5 Is Unique

✅ Yes

##### 1.9.3.1.6 Index Type

UniqueIndex

##### 1.9.3.1.7 Size

0

##### 1.9.3.1.8 Constraints

*No items available*

##### 1.9.3.1.9 Default Value



##### 1.9.3.1.10 Is Foreign Key

❌ No

##### 1.9.3.1.11 Precision

0

##### 1.9.3.1.12 Scale

0

#### 1.9.3.2.0 Guid

##### 1.9.3.2.1 Name

MerchantAccountId

##### 1.9.3.2.2 Type

🔹 Guid

##### 1.9.3.2.3 Is Required

✅ Yes

##### 1.9.3.2.4 Is Primary Key

❌ No

##### 1.9.3.2.5 Is Unique

❌ No

##### 1.9.3.2.6 Index Type

Index

##### 1.9.3.2.7 Size

0

##### 1.9.3.2.8 Constraints

*No items available*

##### 1.9.3.2.9 Default Value



##### 1.9.3.2.10 Is Foreign Key

✅ Yes

##### 1.9.3.2.11 Precision

0

##### 1.9.3.2.12 Scale

0

#### 1.9.3.3.0 Guid

##### 1.9.3.3.1 Name

CategoryId

##### 1.9.3.3.2 Type

🔹 Guid

##### 1.9.3.3.3 Is Required

✅ Yes

##### 1.9.3.3.4 Is Primary Key

❌ No

##### 1.9.3.3.5 Is Unique

❌ No

##### 1.9.3.3.6 Index Type

Index

##### 1.9.3.3.7 Size

0

##### 1.9.3.3.8 Constraints

*No items available*

##### 1.9.3.3.9 Default Value



##### 1.9.3.3.10 Is Foreign Key

✅ Yes

##### 1.9.3.3.11 Precision

0

##### 1.9.3.3.12 Scale

0

#### 1.9.3.4.0 VARCHAR

##### 1.9.3.4.1 Name

name

##### 1.9.3.4.2 Type

🔹 VARCHAR

##### 1.9.3.4.3 Is Required

✅ Yes

##### 1.9.3.4.4 Is Primary Key

❌ No

##### 1.9.3.4.5 Is Unique

❌ No

##### 1.9.3.4.6 Index Type

Index

##### 1.9.3.4.7 Size

255

##### 1.9.3.4.8 Constraints

*No items available*

##### 1.9.3.4.9 Default Value



##### 1.9.3.4.10 Is Foreign Key

❌ No

##### 1.9.3.4.11 Precision

0

##### 1.9.3.4.12 Scale

0

#### 1.9.3.5.0 TEXT

##### 1.9.3.5.1 Name

description

##### 1.9.3.5.2 Type

🔹 TEXT

##### 1.9.3.5.3 Is Required

❌ No

##### 1.9.3.5.4 Is Primary Key

❌ No

##### 1.9.3.5.5 Is Unique

❌ No

##### 1.9.3.5.6 Index Type

None

##### 1.9.3.5.7 Size

0

##### 1.9.3.5.8 Constraints

*No items available*

##### 1.9.3.5.9 Default Value



##### 1.9.3.5.10 Is Foreign Key

❌ No

##### 1.9.3.5.11 Precision

0

##### 1.9.3.5.12 Scale

0

#### 1.9.3.6.0 DECIMAL

##### 1.9.3.6.1 Name

price

##### 1.9.3.6.2 Type

🔹 DECIMAL

##### 1.9.3.6.3 Is Required

✅ Yes

##### 1.9.3.6.4 Is Primary Key

❌ No

##### 1.9.3.6.5 Is Unique

❌ No

##### 1.9.3.6.6 Index Type

Index

##### 1.9.3.6.7 Size

0

##### 1.9.3.6.8 Constraints

- POSITIVE_VALUE

##### 1.9.3.6.9 Default Value



##### 1.9.3.6.10 Is Foreign Key

❌ No

##### 1.9.3.6.11 Precision

10

##### 1.9.3.6.12 Scale

2

#### 1.9.3.7.0 VARCHAR

##### 1.9.3.7.1 Name

sku

##### 1.9.3.7.2 Type

🔹 VARCHAR

##### 1.9.3.7.3 Is Required

❌ No

##### 1.9.3.7.4 Is Primary Key

❌ No

##### 1.9.3.7.5 Is Unique

❌ No

##### 1.9.3.7.6 Index Type

Index

##### 1.9.3.7.7 Size

100

##### 1.9.3.7.8 Constraints

*No items available*

##### 1.9.3.7.9 Default Value



##### 1.9.3.7.10 Is Foreign Key

❌ No

##### 1.9.3.7.11 Precision

0

##### 1.9.3.7.12 Scale

0

#### 1.9.3.8.0 DateTime

##### 1.9.3.8.1 Name

createdAt

##### 1.9.3.8.2 Type

🔹 DateTime

##### 1.9.3.8.3 Is Required

✅ Yes

##### 1.9.3.8.4 Is Primary Key

❌ No

##### 1.9.3.8.5 Is Unique

❌ No

##### 1.9.3.8.6 Index Type

Index

##### 1.9.3.8.7 Size

0

##### 1.9.3.8.8 Constraints

*No items available*

##### 1.9.3.8.9 Default Value

CURRENT_TIMESTAMP

##### 1.9.3.8.10 Is Foreign Key

❌ No

##### 1.9.3.8.11 Precision

0

##### 1.9.3.8.12 Scale

0

#### 1.9.3.9.0 DateTime

##### 1.9.3.9.1 Name

updatedAt

##### 1.9.3.9.2 Type

🔹 DateTime

##### 1.9.3.9.3 Is Required

✅ Yes

##### 1.9.3.9.4 Is Primary Key

❌ No

##### 1.9.3.9.5 Is Unique

❌ No

##### 1.9.3.9.6 Index Type

None

##### 1.9.3.9.7 Size

0

##### 1.9.3.9.8 Constraints

*No items available*

##### 1.9.3.9.9 Default Value

CURRENT_TIMESTAMP

##### 1.9.3.9.10 Is Foreign Key

❌ No

##### 1.9.3.9.11 Precision

0

##### 1.9.3.9.12 Scale

0

### 1.9.4.0.0 Primary Keys

- productId

### 1.9.5.0.0 Unique Constraints

- {'name': 'UC_Product_Merchant_Sku', 'columns': ['MerchantAccountId', 'sku']}

### 1.9.6.0.0 Indexes

- {'name': 'IX_Product_fts', 'columns': ['name', 'description'], 'type': 'GIN_FullText'}

### 1.9.7.0.0 Caching

| Property | Value |
|----------|-------|
| Strategy | Cache-Aside |
| Provider | Redis |
| Invalidation | Event-Driven |

## 1.10.0.0.0 SalesOrder

### 1.10.1.0.0 Name

SalesOrder

### 1.10.2.0.0 Description

Represents a completed transaction. This is the primary source of data for all sales analytics and reporting (REQ-FUNC-009).

### 1.10.3.0.0 Attributes

#### 1.10.3.1.0 Guid

##### 1.10.3.1.1 Name

salesOrderId

##### 1.10.3.1.2 Type

🔹 Guid

##### 1.10.3.1.3 Is Required

✅ Yes

##### 1.10.3.1.4 Is Primary Key

✅ Yes

##### 1.10.3.1.5 Is Unique

✅ Yes

##### 1.10.3.1.6 Index Type

UniqueIndex

##### 1.10.3.1.7 Size

0

##### 1.10.3.1.8 Constraints

*No items available*

##### 1.10.3.1.9 Default Value



##### 1.10.3.1.10 Is Foreign Key

❌ No

##### 1.10.3.1.11 Precision

0

##### 1.10.3.1.12 Scale

0

#### 1.10.3.2.0 Guid

##### 1.10.3.2.1 Name

MerchantAccountId

##### 1.10.3.2.2 Type

🔹 Guid

##### 1.10.3.2.3 Is Required

✅ Yes

##### 1.10.3.2.4 Is Primary Key

❌ No

##### 1.10.3.2.5 Is Unique

❌ No

##### 1.10.3.2.6 Index Type

Index

##### 1.10.3.2.7 Size

0

##### 1.10.3.2.8 Constraints

*No items available*

##### 1.10.3.2.9 Default Value



##### 1.10.3.2.10 Is Foreign Key

✅ Yes

##### 1.10.3.2.11 Precision

0

##### 1.10.3.2.12 Scale

0

#### 1.10.3.3.0 Guid

##### 1.10.3.3.1 Name

CustomerId

##### 1.10.3.3.2 Type

🔹 Guid

##### 1.10.3.3.3 Is Required

✅ Yes

##### 1.10.3.3.4 Is Primary Key

❌ No

##### 1.10.3.3.5 Is Unique

❌ No

##### 1.10.3.3.6 Index Type

Index

##### 1.10.3.3.7 Size

0

##### 1.10.3.3.8 Constraints

*No items available*

##### 1.10.3.3.9 Default Value



##### 1.10.3.3.10 Is Foreign Key

✅ Yes

##### 1.10.3.3.11 Precision

0

##### 1.10.3.3.12 Scale

0

#### 1.10.3.4.0 DateTime

##### 1.10.3.4.1 Name

orderDate

##### 1.10.3.4.2 Type

🔹 DateTime

##### 1.10.3.4.3 Is Required

✅ Yes

##### 1.10.3.4.4 Is Primary Key

❌ No

##### 1.10.3.4.5 Is Unique

❌ No

##### 1.10.3.4.6 Index Type

Index

##### 1.10.3.4.7 Size

0

##### 1.10.3.4.8 Constraints

*No items available*

##### 1.10.3.4.9 Default Value



##### 1.10.3.4.10 Is Foreign Key

❌ No

##### 1.10.3.4.11 Precision

0

##### 1.10.3.4.12 Scale

0

#### 1.10.3.5.0 DECIMAL

##### 1.10.3.5.1 Name

totalAmount

##### 1.10.3.5.2 Type

🔹 DECIMAL

##### 1.10.3.5.3 Is Required

✅ Yes

##### 1.10.3.5.4 Is Primary Key

❌ No

##### 1.10.3.5.5 Is Unique

❌ No

##### 1.10.3.5.6 Index Type

Index

##### 1.10.3.5.7 Size

0

##### 1.10.3.5.8 Constraints

- POSITIVE_VALUE

##### 1.10.3.5.9 Default Value



##### 1.10.3.5.10 Is Foreign Key

❌ No

##### 1.10.3.5.11 Precision

10

##### 1.10.3.5.12 Scale

2

#### 1.10.3.6.0 VARCHAR

##### 1.10.3.6.1 Name

status

##### 1.10.3.6.2 Type

🔹 VARCHAR

##### 1.10.3.6.3 Is Required

✅ Yes

##### 1.10.3.6.4 Is Primary Key

❌ No

##### 1.10.3.6.5 Is Unique

❌ No

##### 1.10.3.6.6 Index Type

Index

##### 1.10.3.6.7 Size

50

##### 1.10.3.6.8 Constraints

- ENUM('pending', 'completed', 'shipped', 'cancelled', 'refunded')

##### 1.10.3.6.9 Default Value

completed

##### 1.10.3.6.10 Is Foreign Key

❌ No

##### 1.10.3.6.11 Precision

0

##### 1.10.3.6.12 Scale

0

#### 1.10.3.7.0 DateTime

##### 1.10.3.7.1 Name

createdAt

##### 1.10.3.7.2 Type

🔹 DateTime

##### 1.10.3.7.3 Is Required

✅ Yes

##### 1.10.3.7.4 Is Primary Key

❌ No

##### 1.10.3.7.5 Is Unique

❌ No

##### 1.10.3.7.6 Index Type

None

##### 1.10.3.7.7 Size

0

##### 1.10.3.7.8 Constraints

*No items available*

##### 1.10.3.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.10.3.7.10 Is Foreign Key

❌ No

##### 1.10.3.7.11 Precision

0

##### 1.10.3.7.12 Scale

0

### 1.10.4.0.0 Primary Keys

- salesOrderId

### 1.10.5.0.0 Unique Constraints

*No items available*

### 1.10.6.0.0 Indexes

#### 1.10.6.1.0 BTree

##### 1.10.6.1.1 Name

IX_SalesOrder_Merchant_OrderDate

##### 1.10.6.1.2 Columns

- MerchantAccountId
- orderDate

##### 1.10.6.1.3 Type

🔹 BTree

#### 1.10.6.2.0 BTree

##### 1.10.6.2.1 Name

IX_SalesOrder_Merchant_Customer_OrderDate

##### 1.10.6.2.2 Columns

- MerchantAccountId
- CustomerId
- orderDate DESC

##### 1.10.6.2.3 Type

🔹 BTree

### 1.10.7.0.0 Partitioning

| Property | Value |
|----------|-------|
| Strategy | Range |
| Column | orderDate |
| Interval | Monthly |

## 1.11.0.0.0 OrderItem

### 1.11.1.0.0 Name

OrderItem

### 1.11.2.0.0 Description

Represents a single line item within a SalesOrder, linking a product to an order with quantity and price at the time of purchase.

### 1.11.3.0.0 Attributes

#### 1.11.3.1.0 Guid

##### 1.11.3.1.1 Name

orderItemId

##### 1.11.3.1.2 Type

🔹 Guid

##### 1.11.3.1.3 Is Required

✅ Yes

##### 1.11.3.1.4 Is Primary Key

✅ Yes

##### 1.11.3.1.5 Is Unique

✅ Yes

##### 1.11.3.1.6 Index Type

UniqueIndex

##### 1.11.3.1.7 Size

0

##### 1.11.3.1.8 Constraints

*No items available*

##### 1.11.3.1.9 Default Value



##### 1.11.3.1.10 Is Foreign Key

❌ No

##### 1.11.3.1.11 Precision

0

##### 1.11.3.1.12 Scale

0

#### 1.11.3.2.0 Guid

##### 1.11.3.2.1 Name

SalesOrderId

##### 1.11.3.2.2 Type

🔹 Guid

##### 1.11.3.2.3 Is Required

✅ Yes

##### 1.11.3.2.4 Is Primary Key

❌ No

##### 1.11.3.2.5 Is Unique

❌ No

##### 1.11.3.2.6 Index Type

Index

##### 1.11.3.2.7 Size

0

##### 1.11.3.2.8 Constraints

*No items available*

##### 1.11.3.2.9 Default Value



##### 1.11.3.2.10 Is Foreign Key

✅ Yes

##### 1.11.3.2.11 Precision

0

##### 1.11.3.2.12 Scale

0

#### 1.11.3.3.0 Guid

##### 1.11.3.3.1 Name

ProductId

##### 1.11.3.3.2 Type

🔹 Guid

##### 1.11.3.3.3 Is Required

✅ Yes

##### 1.11.3.3.4 Is Primary Key

❌ No

##### 1.11.3.3.5 Is Unique

❌ No

##### 1.11.3.3.6 Index Type

Index

##### 1.11.3.3.7 Size

0

##### 1.11.3.3.8 Constraints

*No items available*

##### 1.11.3.3.9 Default Value



##### 1.11.3.3.10 Is Foreign Key

✅ Yes

##### 1.11.3.3.11 Precision

0

##### 1.11.3.3.12 Scale

0

#### 1.11.3.4.0 INT

##### 1.11.3.4.1 Name

quantity

##### 1.11.3.4.2 Type

🔹 INT

##### 1.11.3.4.3 Is Required

✅ Yes

##### 1.11.3.4.4 Is Primary Key

❌ No

##### 1.11.3.4.5 Is Unique

❌ No

##### 1.11.3.4.6 Index Type

None

##### 1.11.3.4.7 Size

0

##### 1.11.3.4.8 Constraints

- POSITIVE_VALUE

##### 1.11.3.4.9 Default Value



##### 1.11.3.4.10 Is Foreign Key

❌ No

##### 1.11.3.4.11 Precision

0

##### 1.11.3.4.12 Scale

0

#### 1.11.3.5.0 DECIMAL

##### 1.11.3.5.1 Name

priceAtPurchase

##### 1.11.3.5.2 Type

🔹 DECIMAL

##### 1.11.3.5.3 Is Required

✅ Yes

##### 1.11.3.5.4 Is Primary Key

❌ No

##### 1.11.3.5.5 Is Unique

❌ No

##### 1.11.3.5.6 Index Type

None

##### 1.11.3.5.7 Size

0

##### 1.11.3.5.8 Constraints

- POSITIVE_VALUE

##### 1.11.3.5.9 Default Value



##### 1.11.3.5.10 Is Foreign Key

❌ No

##### 1.11.3.5.11 Precision

10

##### 1.11.3.5.12 Scale

2

#### 1.11.3.6.0 Guid

##### 1.11.3.6.1 Name

MerchantAccountId

##### 1.11.3.6.2 Type

🔹 Guid

##### 1.11.3.6.3 Is Required

✅ Yes

##### 1.11.3.6.4 Is Primary Key

❌ No

##### 1.11.3.6.5 Is Unique

❌ No

##### 1.11.3.6.6 Index Type

Index

##### 1.11.3.6.7 Size

0

##### 1.11.3.6.8 Constraints

*No items available*

##### 1.11.3.6.9 Default Value



##### 1.11.3.6.10 Is Foreign Key

✅ Yes

##### 1.11.3.6.11 Precision

0

##### 1.11.3.6.12 Scale

0

##### 1.11.3.6.13 Description

Denormalized from SalesOrder to improve analytical query performance.

#### 1.11.3.7.0 DateTime

##### 1.11.3.7.1 Name

orderDate

##### 1.11.3.7.2 Type

🔹 DateTime

##### 1.11.3.7.3 Is Required

✅ Yes

##### 1.11.3.7.4 Is Primary Key

❌ No

##### 1.11.3.7.5 Is Unique

❌ No

##### 1.11.3.7.6 Index Type

Index

##### 1.11.3.7.7 Size

0

##### 1.11.3.7.8 Constraints

*No items available*

##### 1.11.3.7.9 Default Value



##### 1.11.3.7.10 Is Foreign Key

❌ No

##### 1.11.3.7.11 Precision

0

##### 1.11.3.7.12 Scale

0

##### 1.11.3.7.13 Description

Denormalized from SalesOrder to improve analytical query performance.

### 1.11.4.0.0 Primary Keys

- orderItemId

### 1.11.5.0.0 Unique Constraints

*No items available*

### 1.11.6.0.0 Indexes

*No items available*

## 1.12.0.0.0 AbandonedCart

### 1.12.1.0.0 Name

AbandonedCart

### 1.12.2.0.0 Description

Stores information about shopping carts that were not converted into orders, for use in recovery campaigns (REQ-FUNC-019, REQ-DATA-001).

### 1.12.3.0.0 Attributes

#### 1.12.3.1.0 Guid

##### 1.12.3.1.1 Name

abandonedCartId

##### 1.12.3.1.2 Type

🔹 Guid

##### 1.12.3.1.3 Is Required

✅ Yes

##### 1.12.3.1.4 Is Primary Key

✅ Yes

##### 1.12.3.1.5 Is Unique

✅ Yes

##### 1.12.3.1.6 Index Type

UniqueIndex

##### 1.12.3.1.7 Size

0

##### 1.12.3.1.8 Constraints

*No items available*

##### 1.12.3.1.9 Default Value



##### 1.12.3.1.10 Is Foreign Key

❌ No

##### 1.12.3.1.11 Precision

0

##### 1.12.3.1.12 Scale

0

#### 1.12.3.2.0 Guid

##### 1.12.3.2.1 Name

MerchantAccountId

##### 1.12.3.2.2 Type

🔹 Guid

##### 1.12.3.2.3 Is Required

✅ Yes

##### 1.12.3.2.4 Is Primary Key

❌ No

##### 1.12.3.2.5 Is Unique

❌ No

##### 1.12.3.2.6 Index Type

Index

##### 1.12.3.2.7 Size

0

##### 1.12.3.2.8 Constraints

*No items available*

##### 1.12.3.2.9 Default Value



##### 1.12.3.2.10 Is Foreign Key

✅ Yes

##### 1.12.3.2.11 Precision

0

##### 1.12.3.2.12 Scale

0

#### 1.12.3.3.0 Guid

##### 1.12.3.3.1 Name

CustomerId

##### 1.12.3.3.2 Type

🔹 Guid

##### 1.12.3.3.3 Is Required

✅ Yes

##### 1.12.3.3.4 Is Primary Key

❌ No

##### 1.12.3.3.5 Is Unique

❌ No

##### 1.12.3.3.6 Index Type

Index

##### 1.12.3.3.7 Size

0

##### 1.12.3.3.8 Constraints

*No items available*

##### 1.12.3.3.9 Default Value



##### 1.12.3.3.10 Is Foreign Key

✅ Yes

##### 1.12.3.3.11 Precision

0

##### 1.12.3.3.12 Scale

0

#### 1.12.3.4.0 VARCHAR

##### 1.12.3.4.1 Name

status

##### 1.12.3.4.2 Type

🔹 VARCHAR

##### 1.12.3.4.3 Is Required

✅ Yes

##### 1.12.3.4.4 Is Primary Key

❌ No

##### 1.12.3.4.5 Is Unique

❌ No

##### 1.12.3.4.6 Index Type

Index

##### 1.12.3.4.7 Size

20

##### 1.12.3.4.8 Constraints

- ENUM('active', 'recovered', 'purged')

##### 1.12.3.4.9 Default Value

active

##### 1.12.3.4.10 Is Foreign Key

❌ No

##### 1.12.3.4.11 Precision

0

##### 1.12.3.4.12 Scale

0

#### 1.12.3.5.0 VARCHAR

##### 1.12.3.5.1 Name

recoveryToken

##### 1.12.3.5.2 Type

🔹 VARCHAR

##### 1.12.3.5.3 Is Required

❌ No

##### 1.12.3.5.4 Is Primary Key

❌ No

##### 1.12.3.5.5 Is Unique

✅ Yes

##### 1.12.3.5.6 Index Type

UniqueIndex

##### 1.12.3.5.7 Size

255

##### 1.12.3.5.8 Constraints

*No items available*

##### 1.12.3.5.9 Default Value



##### 1.12.3.5.10 Is Foreign Key

❌ No

##### 1.12.3.5.11 Precision

0

##### 1.12.3.5.12 Scale

0

#### 1.12.3.6.0 DateTime

##### 1.12.3.6.1 Name

createdAt

##### 1.12.3.6.2 Type

🔹 DateTime

##### 1.12.3.6.3 Is Required

✅ Yes

##### 1.12.3.6.4 Is Primary Key

❌ No

##### 1.12.3.6.5 Is Unique

❌ No

##### 1.12.3.6.6 Index Type

Index

##### 1.12.3.6.7 Size

0

##### 1.12.3.6.8 Constraints

*No items available*

##### 1.12.3.6.9 Default Value

CURRENT_TIMESTAMP

##### 1.12.3.6.10 Is Foreign Key

❌ No

##### 1.12.3.6.11 Precision

0

##### 1.12.3.6.12 Scale

0

#### 1.12.3.7.0 DateTime

##### 1.12.3.7.1 Name

updatedAt

##### 1.12.3.7.2 Type

🔹 DateTime

##### 1.12.3.7.3 Is Required

✅ Yes

##### 1.12.3.7.4 Is Primary Key

❌ No

##### 1.12.3.7.5 Is Unique

❌ No

##### 1.12.3.7.6 Index Type

None

##### 1.12.3.7.7 Size

0

##### 1.12.3.7.8 Constraints

*No items available*

##### 1.12.3.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.12.3.7.10 Is Foreign Key

❌ No

##### 1.12.3.7.11 Precision

0

##### 1.12.3.7.12 Scale

0

### 1.12.4.0.0 Primary Keys

- abandonedCartId

### 1.12.5.0.0 Unique Constraints

- {'name': 'UC_AbandonedCart_RecoveryToken', 'columns': ['recoveryToken']}

### 1.12.6.0.0 Indexes

#### 1.12.6.1.0 BTree

##### 1.12.6.1.1 Name

IX_AbandonedCart_Status_CreatedAt

##### 1.12.6.1.2 Columns

- status
- createdAt

##### 1.12.6.1.3 Type

🔹 BTree

#### 1.12.6.2.0 BTree

##### 1.12.6.2.1 Name

IX_AbandonedCart_Merchant_Customer_Status

##### 1.12.6.2.2 Columns

- MerchantAccountId
- CustomerId
- status

##### 1.12.6.2.3 Type

🔹 BTree

### 1.12.7.0.0 Partitioning

| Property | Value |
|----------|-------|
| Strategy | Range |
| Column | createdAt |
| Interval | Monthly |
| Condition | For high-traffic merchants |

## 1.13.0.0.0 AbandonedCartItem

### 1.13.1.0.0 Name

AbandonedCartItem

### 1.13.2.0.0 Description

Represents a single product line item within an AbandonedCart.

### 1.13.3.0.0 Attributes

#### 1.13.3.1.0 Guid

##### 1.13.3.1.1 Name

abandonedCartItemId

##### 1.13.3.1.2 Type

🔹 Guid

##### 1.13.3.1.3 Is Required

✅ Yes

##### 1.13.3.1.4 Is Primary Key

✅ Yes

##### 1.13.3.1.5 Is Unique

✅ Yes

##### 1.13.3.1.6 Index Type

UniqueIndex

##### 1.13.3.1.7 Size

0

##### 1.13.3.1.8 Constraints

*No items available*

##### 1.13.3.1.9 Default Value



##### 1.13.3.1.10 Is Foreign Key

❌ No

##### 1.13.3.1.11 Precision

0

##### 1.13.3.1.12 Scale

0

#### 1.13.3.2.0 Guid

##### 1.13.3.2.1 Name

AbandonedCartId

##### 1.13.3.2.2 Type

🔹 Guid

##### 1.13.3.2.3 Is Required

✅ Yes

##### 1.13.3.2.4 Is Primary Key

❌ No

##### 1.13.3.2.5 Is Unique

❌ No

##### 1.13.3.2.6 Index Type

Index

##### 1.13.3.2.7 Size

0

##### 1.13.3.2.8 Constraints

*No items available*

##### 1.13.3.2.9 Default Value



##### 1.13.3.2.10 Is Foreign Key

✅ Yes

##### 1.13.3.2.11 Precision

0

##### 1.13.3.2.12 Scale

0

#### 1.13.3.3.0 Guid

##### 1.13.3.3.1 Name

ProductId

##### 1.13.3.3.2 Type

🔹 Guid

##### 1.13.3.3.3 Is Required

✅ Yes

##### 1.13.3.3.4 Is Primary Key

❌ No

##### 1.13.3.3.5 Is Unique

❌ No

##### 1.13.3.3.6 Index Type

Index

##### 1.13.3.3.7 Size

0

##### 1.13.3.3.8 Constraints

*No items available*

##### 1.13.3.3.9 Default Value



##### 1.13.3.3.10 Is Foreign Key

✅ Yes

##### 1.13.3.3.11 Precision

0

##### 1.13.3.3.12 Scale

0

#### 1.13.3.4.0 INT

##### 1.13.3.4.1 Name

quantity

##### 1.13.3.4.2 Type

🔹 INT

##### 1.13.3.4.3 Is Required

✅ Yes

##### 1.13.3.4.4 Is Primary Key

❌ No

##### 1.13.3.4.5 Is Unique

❌ No

##### 1.13.3.4.6 Index Type

None

##### 1.13.3.4.7 Size

0

##### 1.13.3.4.8 Constraints

- POSITIVE_VALUE

##### 1.13.3.4.9 Default Value



##### 1.13.3.4.10 Is Foreign Key

❌ No

##### 1.13.3.4.11 Precision

0

##### 1.13.3.4.12 Scale

0

#### 1.13.3.5.0 DECIMAL

##### 1.13.3.5.1 Name

price

##### 1.13.3.5.2 Type

🔹 DECIMAL

##### 1.13.3.5.3 Is Required

✅ Yes

##### 1.13.3.5.4 Is Primary Key

❌ No

##### 1.13.3.5.5 Is Unique

❌ No

##### 1.13.3.5.6 Index Type

None

##### 1.13.3.5.7 Size

0

##### 1.13.3.5.8 Constraints

- POSITIVE_VALUE

##### 1.13.3.5.9 Default Value



##### 1.13.3.5.10 Is Foreign Key

❌ No

##### 1.13.3.5.11 Precision

10

##### 1.13.3.5.12 Scale

2

### 1.13.4.0.0 Primary Keys

- abandonedCartItemId

### 1.13.5.0.0 Unique Constraints

*No items available*

### 1.13.6.0.0 Indexes

*No items available*

## 1.14.0.0.0 EmailTemplate

### 1.14.1.0.0 Name

EmailTemplate

### 1.14.2.0.0 Description

Stores reusable, rich-text email templates for cart recovery campaigns (REQ-FUNC-019).

### 1.14.3.0.0 Attributes

#### 1.14.3.1.0 Guid

##### 1.14.3.1.1 Name

emailTemplateId

##### 1.14.3.1.2 Type

🔹 Guid

##### 1.14.3.1.3 Is Required

✅ Yes

##### 1.14.3.1.4 Is Primary Key

✅ Yes

##### 1.14.3.1.5 Is Unique

✅ Yes

##### 1.14.3.1.6 Index Type

UniqueIndex

##### 1.14.3.1.7 Size

0

##### 1.14.3.1.8 Constraints

*No items available*

##### 1.14.3.1.9 Default Value



##### 1.14.3.1.10 Is Foreign Key

❌ No

##### 1.14.3.1.11 Precision

0

##### 1.14.3.1.12 Scale

0

#### 1.14.3.2.0 Guid

##### 1.14.3.2.1 Name

MerchantAccountId

##### 1.14.3.2.2 Type

🔹 Guid

##### 1.14.3.2.3 Is Required

✅ Yes

##### 1.14.3.2.4 Is Primary Key

❌ No

##### 1.14.3.2.5 Is Unique

❌ No

##### 1.14.3.2.6 Index Type

Index

##### 1.14.3.2.7 Size

0

##### 1.14.3.2.8 Constraints

*No items available*

##### 1.14.3.2.9 Default Value



##### 1.14.3.2.10 Is Foreign Key

✅ Yes

##### 1.14.3.2.11 Precision

0

##### 1.14.3.2.12 Scale

0

#### 1.14.3.3.0 VARCHAR

##### 1.14.3.3.1 Name

name

##### 1.14.3.3.2 Type

🔹 VARCHAR

##### 1.14.3.3.3 Is Required

✅ Yes

##### 1.14.3.3.4 Is Primary Key

❌ No

##### 1.14.3.3.5 Is Unique

❌ No

##### 1.14.3.3.6 Index Type

Index

##### 1.14.3.3.7 Size

255

##### 1.14.3.3.8 Constraints

*No items available*

##### 1.14.3.3.9 Default Value



##### 1.14.3.3.10 Is Foreign Key

❌ No

##### 1.14.3.3.11 Precision

0

##### 1.14.3.3.12 Scale

0

#### 1.14.3.4.0 VARCHAR

##### 1.14.3.4.1 Name

subject

##### 1.14.3.4.2 Type

🔹 VARCHAR

##### 1.14.3.4.3 Is Required

✅ Yes

##### 1.14.3.4.4 Is Primary Key

❌ No

##### 1.14.3.4.5 Is Unique

❌ No

##### 1.14.3.4.6 Index Type

None

##### 1.14.3.4.7 Size

255

##### 1.14.3.4.8 Constraints

*No items available*

##### 1.14.3.4.9 Default Value



##### 1.14.3.4.10 Is Foreign Key

❌ No

##### 1.14.3.4.11 Precision

0

##### 1.14.3.4.12 Scale

0

#### 1.14.3.5.0 TEXT

##### 1.14.3.5.1 Name

body

##### 1.14.3.5.2 Type

🔹 TEXT

##### 1.14.3.5.3 Is Required

✅ Yes

##### 1.14.3.5.4 Is Primary Key

❌ No

##### 1.14.3.5.5 Is Unique

❌ No

##### 1.14.3.5.6 Index Type

None

##### 1.14.3.5.7 Size

0

##### 1.14.3.5.8 Constraints

*No items available*

##### 1.14.3.5.9 Default Value



##### 1.14.3.5.10 Is Foreign Key

❌ No

##### 1.14.3.5.11 Precision

0

##### 1.14.3.5.12 Scale

0

#### 1.14.3.6.0 DateTime

##### 1.14.3.6.1 Name

createdAt

##### 1.14.3.6.2 Type

🔹 DateTime

##### 1.14.3.6.3 Is Required

✅ Yes

##### 1.14.3.6.4 Is Primary Key

❌ No

##### 1.14.3.6.5 Is Unique

❌ No

##### 1.14.3.6.6 Index Type

None

##### 1.14.3.6.7 Size

0

##### 1.14.3.6.8 Constraints

*No items available*

##### 1.14.3.6.9 Default Value

CURRENT_TIMESTAMP

##### 1.14.3.6.10 Is Foreign Key

❌ No

##### 1.14.3.6.11 Precision

0

##### 1.14.3.6.12 Scale

0

#### 1.14.3.7.0 DateTime

##### 1.14.3.7.1 Name

updatedAt

##### 1.14.3.7.2 Type

🔹 DateTime

##### 1.14.3.7.3 Is Required

✅ Yes

##### 1.14.3.7.4 Is Primary Key

❌ No

##### 1.14.3.7.5 Is Unique

❌ No

##### 1.14.3.7.6 Index Type

None

##### 1.14.3.7.7 Size

0

##### 1.14.3.7.8 Constraints

*No items available*

##### 1.14.3.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.14.3.7.10 Is Foreign Key

❌ No

##### 1.14.3.7.11 Precision

0

##### 1.14.3.7.12 Scale

0

### 1.14.4.0.0 Primary Keys

- emailTemplateId

### 1.14.5.0.0 Unique Constraints

- {'name': 'UC_EmailTemplate_Merchant_Name', 'columns': ['MerchantAccountId', 'name']}

### 1.14.6.0.0 Indexes

*No items available*

## 1.15.0.0.0 DomainAuthentication

### 1.15.1.0.0 Name

DomainAuthentication

### 1.15.2.0.0 Description

Stores SPF and DKIM records and their verification status for a merchant's sending domain (REQ-FUNC-021).

### 1.15.3.0.0 Attributes

#### 1.15.3.1.0 Guid

##### 1.15.3.1.1 Name

domainAuthenticationId

##### 1.15.3.1.2 Type

🔹 Guid

##### 1.15.3.1.3 Is Required

✅ Yes

##### 1.15.3.1.4 Is Primary Key

✅ Yes

##### 1.15.3.1.5 Is Unique

✅ Yes

##### 1.15.3.1.6 Index Type

UniqueIndex

##### 1.15.3.1.7 Size

0

##### 1.15.3.1.8 Constraints

*No items available*

##### 1.15.3.1.9 Default Value



##### 1.15.3.1.10 Is Foreign Key

❌ No

##### 1.15.3.1.11 Precision

0

##### 1.15.3.1.12 Scale

0

#### 1.15.3.2.0 Guid

##### 1.15.3.2.1 Name

MerchantAccountId

##### 1.15.3.2.2 Type

🔹 Guid

##### 1.15.3.2.3 Is Required

✅ Yes

##### 1.15.3.2.4 Is Primary Key

❌ No

##### 1.15.3.2.5 Is Unique

✅ Yes

##### 1.15.3.2.6 Index Type

UniqueIndex

##### 1.15.3.2.7 Size

0

##### 1.15.3.2.8 Constraints

*No items available*

##### 1.15.3.2.9 Default Value



##### 1.15.3.2.10 Is Foreign Key

✅ Yes

##### 1.15.3.2.11 Precision

0

##### 1.15.3.2.12 Scale

0

#### 1.15.3.3.0 VARCHAR

##### 1.15.3.3.1 Name

domainName

##### 1.15.3.3.2 Type

🔹 VARCHAR

##### 1.15.3.3.3 Is Required

✅ Yes

##### 1.15.3.3.4 Is Primary Key

❌ No

##### 1.15.3.3.5 Is Unique

❌ No

##### 1.15.3.3.6 Index Type

Index

##### 1.15.3.3.7 Size

255

##### 1.15.3.3.8 Constraints

*No items available*

##### 1.15.3.3.9 Default Value



##### 1.15.3.3.10 Is Foreign Key

❌ No

##### 1.15.3.3.11 Precision

0

##### 1.15.3.3.12 Scale

0

#### 1.15.3.4.0 TEXT

##### 1.15.3.4.1 Name

spfRecord

##### 1.15.3.4.2 Type

🔹 TEXT

##### 1.15.3.4.3 Is Required

✅ Yes

##### 1.15.3.4.4 Is Primary Key

❌ No

##### 1.15.3.4.5 Is Unique

❌ No

##### 1.15.3.4.6 Index Type

None

##### 1.15.3.4.7 Size

0

##### 1.15.3.4.8 Constraints

*No items available*

##### 1.15.3.4.9 Default Value



##### 1.15.3.4.10 Is Foreign Key

❌ No

##### 1.15.3.4.11 Precision

0

##### 1.15.3.4.12 Scale

0

#### 1.15.3.5.0 TEXT

##### 1.15.3.5.1 Name

dkimRecord

##### 1.15.3.5.2 Type

🔹 TEXT

##### 1.15.3.5.3 Is Required

✅ Yes

##### 1.15.3.5.4 Is Primary Key

❌ No

##### 1.15.3.5.5 Is Unique

❌ No

##### 1.15.3.5.6 Index Type

None

##### 1.15.3.5.7 Size

0

##### 1.15.3.5.8 Constraints

*No items available*

##### 1.15.3.5.9 Default Value



##### 1.15.3.5.10 Is Foreign Key

❌ No

##### 1.15.3.5.11 Precision

0

##### 1.15.3.5.12 Scale

0

#### 1.15.3.6.0 BOOLEAN

##### 1.15.3.6.1 Name

isSpfVerified

##### 1.15.3.6.2 Type

🔹 BOOLEAN

##### 1.15.3.6.3 Is Required

✅ Yes

##### 1.15.3.6.4 Is Primary Key

❌ No

##### 1.15.3.6.5 Is Unique

❌ No

##### 1.15.3.6.6 Index Type

Index

##### 1.15.3.6.7 Size

0

##### 1.15.3.6.8 Constraints

*No items available*

##### 1.15.3.6.9 Default Value

false

##### 1.15.3.6.10 Is Foreign Key

❌ No

##### 1.15.3.6.11 Precision

0

##### 1.15.3.6.12 Scale

0

#### 1.15.3.7.0 BOOLEAN

##### 1.15.3.7.1 Name

isDkimVerified

##### 1.15.3.7.2 Type

🔹 BOOLEAN

##### 1.15.3.7.3 Is Required

✅ Yes

##### 1.15.3.7.4 Is Primary Key

❌ No

##### 1.15.3.7.5 Is Unique

❌ No

##### 1.15.3.7.6 Index Type

Index

##### 1.15.3.7.7 Size

0

##### 1.15.3.7.8 Constraints

*No items available*

##### 1.15.3.7.9 Default Value

false

##### 1.15.3.7.10 Is Foreign Key

❌ No

##### 1.15.3.7.11 Precision

0

##### 1.15.3.7.12 Scale

0

#### 1.15.3.8.0 DateTime

##### 1.15.3.8.1 Name

updatedAt

##### 1.15.3.8.2 Type

🔹 DateTime

##### 1.15.3.8.3 Is Required

✅ Yes

##### 1.15.3.8.4 Is Primary Key

❌ No

##### 1.15.3.8.5 Is Unique

❌ No

##### 1.15.3.8.6 Index Type

None

##### 1.15.3.8.7 Size

0

##### 1.15.3.8.8 Constraints

*No items available*

##### 1.15.3.8.9 Default Value

CURRENT_TIMESTAMP

##### 1.15.3.8.10 Is Foreign Key

❌ No

##### 1.15.3.8.11 Precision

0

##### 1.15.3.8.12 Scale

0

### 1.15.4.0.0 Primary Keys

- domainAuthenticationId

### 1.15.5.0.0 Unique Constraints

- {'name': 'UC_DomainAuthentication_MerchantAccountId', 'columns': ['MerchantAccountId']}

### 1.15.6.0.0 Indexes

*No items available*

## 1.16.0.0.0 AuditLog

### 1.16.1.0.0 Name

AuditLog

### 1.16.2.0.0 Description

Maintains an immutable record of security-sensitive events for auditing and compliance (REQ-SEC-005).

### 1.16.3.0.0 Attributes

#### 1.16.3.1.0 BIGINT

##### 1.16.3.1.1 Name

auditLogId

##### 1.16.3.1.2 Type

🔹 BIGINT

##### 1.16.3.1.3 Is Required

✅ Yes

##### 1.16.3.1.4 Is Primary Key

✅ Yes

##### 1.16.3.1.5 Is Unique

✅ Yes

##### 1.16.3.1.6 Index Type

UniqueIndex

##### 1.16.3.1.7 Size

0

##### 1.16.3.1.8 Constraints

*No items available*

##### 1.16.3.1.9 Default Value



##### 1.16.3.1.10 Is Foreign Key

❌ No

##### 1.16.3.1.11 Precision

0

##### 1.16.3.1.12 Scale

0

#### 1.16.3.2.0 Guid

##### 1.16.3.2.1 Name

MerchantAccountId

##### 1.16.3.2.2 Type

🔹 Guid

##### 1.16.3.2.3 Is Required

❌ No

##### 1.16.3.2.4 Is Primary Key

❌ No

##### 1.16.3.2.5 Is Unique

❌ No

##### 1.16.3.2.6 Index Type

Index

##### 1.16.3.2.7 Size

0

##### 1.16.3.2.8 Constraints

*No items available*

##### 1.16.3.2.9 Default Value



##### 1.16.3.2.10 Is Foreign Key

✅ Yes

##### 1.16.3.2.11 Precision

0

##### 1.16.3.2.12 Scale

0

#### 1.16.3.3.0 Guid

##### 1.16.3.3.1 Name

UserId

##### 1.16.3.3.2 Type

🔹 Guid

##### 1.16.3.3.3 Is Required

❌ No

##### 1.16.3.3.4 Is Primary Key

❌ No

##### 1.16.3.3.5 Is Unique

❌ No

##### 1.16.3.3.6 Index Type

Index

##### 1.16.3.3.7 Size

0

##### 1.16.3.3.8 Constraints

*No items available*

##### 1.16.3.3.9 Default Value



##### 1.16.3.3.10 Is Foreign Key

✅ Yes

##### 1.16.3.3.11 Precision

0

##### 1.16.3.3.12 Scale

0

#### 1.16.3.4.0 DateTime

##### 1.16.3.4.1 Name

eventTimestamp

##### 1.16.3.4.2 Type

🔹 DateTime

##### 1.16.3.4.3 Is Required

✅ Yes

##### 1.16.3.4.4 Is Primary Key

❌ No

##### 1.16.3.4.5 Is Unique

❌ No

##### 1.16.3.4.6 Index Type

Index

##### 1.16.3.4.7 Size

0

##### 1.16.3.4.8 Constraints

*No items available*

##### 1.16.3.4.9 Default Value

CURRENT_TIMESTAMP

##### 1.16.3.4.10 Is Foreign Key

❌ No

##### 1.16.3.4.11 Precision

0

##### 1.16.3.4.12 Scale

0

#### 1.16.3.5.0 VARCHAR

##### 1.16.3.5.1 Name

eventType

##### 1.16.3.5.2 Type

🔹 VARCHAR

##### 1.16.3.5.3 Is Required

✅ Yes

##### 1.16.3.5.4 Is Primary Key

❌ No

##### 1.16.3.5.5 Is Unique

❌ No

##### 1.16.3.5.6 Index Type

Index

##### 1.16.3.5.7 Size

100

##### 1.16.3.5.8 Constraints

*No items available*

##### 1.16.3.5.9 Default Value



##### 1.16.3.5.10 Is Foreign Key

❌ No

##### 1.16.3.5.11 Precision

0

##### 1.16.3.5.12 Scale

0

#### 1.16.3.6.0 VARCHAR

##### 1.16.3.6.1 Name

targetResource

##### 1.16.3.6.2 Type

🔹 VARCHAR

##### 1.16.3.6.3 Is Required

❌ No

##### 1.16.3.6.4 Is Primary Key

❌ No

##### 1.16.3.6.5 Is Unique

❌ No

##### 1.16.3.6.6 Index Type

Index

##### 1.16.3.6.7 Size

255

##### 1.16.3.6.8 Constraints

*No items available*

##### 1.16.3.6.9 Default Value



##### 1.16.3.6.10 Is Foreign Key

❌ No

##### 1.16.3.6.11 Precision

0

##### 1.16.3.6.12 Scale

0

#### 1.16.3.7.0 VARCHAR

##### 1.16.3.7.1 Name

outcome

##### 1.16.3.7.2 Type

🔹 VARCHAR

##### 1.16.3.7.3 Is Required

✅ Yes

##### 1.16.3.7.4 Is Primary Key

❌ No

##### 1.16.3.7.5 Is Unique

❌ No

##### 1.16.3.7.6 Index Type

Index

##### 1.16.3.7.7 Size

20

##### 1.16.3.7.8 Constraints

- ENUM('success', 'failure')

##### 1.16.3.7.9 Default Value



##### 1.16.3.7.10 Is Foreign Key

❌ No

##### 1.16.3.7.11 Precision

0

##### 1.16.3.7.12 Scale

0

#### 1.16.3.8.0 JSONB

##### 1.16.3.8.1 Name

details

##### 1.16.3.8.2 Type

🔹 JSONB

##### 1.16.3.8.3 Is Required

❌ No

##### 1.16.3.8.4 Is Primary Key

❌ No

##### 1.16.3.8.5 Is Unique

❌ No

##### 1.16.3.8.6 Index Type

None

##### 1.16.3.8.7 Size

0

##### 1.16.3.8.8 Constraints

*No items available*

##### 1.16.3.8.9 Default Value



##### 1.16.3.8.10 Is Foreign Key

❌ No

##### 1.16.3.8.11 Precision

0

##### 1.16.3.8.12 Scale

0

### 1.16.4.0.0 Primary Keys

- auditLogId

### 1.16.5.0.0 Unique Constraints

*No items available*

### 1.16.6.0.0 Indexes

#### 1.16.6.1.0 BTree

##### 1.16.6.1.1 Name

IX_AuditLog_Merchant_Timestamp

##### 1.16.6.1.2 Columns

- MerchantAccountId
- eventTimestamp

##### 1.16.6.1.3 Type

🔹 BTree

#### 1.16.6.2.0 GIN

##### 1.16.6.2.1 Name

IX_AuditLog_details_GIN

##### 1.16.6.2.2 Columns

- details

##### 1.16.6.2.3 Type

🔹 GIN

### 1.16.7.0.0 Partitioning

| Property | Value |
|----------|-------|
| Strategy | Range |
| Column | eventTimestamp |
| Interval | Monthly |

## 1.17.0.0.0 AIInsightCard

### 1.17.1.0.0 Name

AIInsightCard

### 1.17.2.0.0 Description

Stores proactive insights, trends, and anomalies generated by the AI Assistant for display on the dashboard (REQ-FUNC-015).

### 1.17.3.0.0 Attributes

#### 1.17.3.1.0 Guid

##### 1.17.3.1.1 Name

aiInsightCardId

##### 1.17.3.1.2 Type

🔹 Guid

##### 1.17.3.1.3 Is Required

✅ Yes

##### 1.17.3.1.4 Is Primary Key

✅ Yes

##### 1.17.3.1.5 Is Unique

✅ Yes

##### 1.17.3.1.6 Index Type

UniqueIndex

##### 1.17.3.1.7 Size

0

##### 1.17.3.1.8 Constraints

*No items available*

##### 1.17.3.1.9 Default Value



##### 1.17.3.1.10 Is Foreign Key

❌ No

##### 1.17.3.1.11 Precision

0

##### 1.17.3.1.12 Scale

0

#### 1.17.3.2.0 Guid

##### 1.17.3.2.1 Name

MerchantAccountId

##### 1.17.3.2.2 Type

🔹 Guid

##### 1.17.3.2.3 Is Required

✅ Yes

##### 1.17.3.2.4 Is Primary Key

❌ No

##### 1.17.3.2.5 Is Unique

❌ No

##### 1.17.3.2.6 Index Type

Index

##### 1.17.3.2.7 Size

0

##### 1.17.3.2.8 Constraints

*No items available*

##### 1.17.3.2.9 Default Value



##### 1.17.3.2.10 Is Foreign Key

✅ Yes

##### 1.17.3.2.11 Precision

0

##### 1.17.3.2.12 Scale

0

#### 1.17.3.3.0 VARCHAR

##### 1.17.3.3.1 Name

title

##### 1.17.3.3.2 Type

🔹 VARCHAR

##### 1.17.3.3.3 Is Required

✅ Yes

##### 1.17.3.3.4 Is Primary Key

❌ No

##### 1.17.3.3.5 Is Unique

❌ No

##### 1.17.3.3.6 Index Type

None

##### 1.17.3.3.7 Size

255

##### 1.17.3.3.8 Constraints

*No items available*

##### 1.17.3.3.9 Default Value



##### 1.17.3.3.10 Is Foreign Key

❌ No

##### 1.17.3.3.11 Precision

0

##### 1.17.3.3.12 Scale

0

#### 1.17.3.4.0 TEXT

##### 1.17.3.4.1 Name

content

##### 1.17.3.4.2 Type

🔹 TEXT

##### 1.17.3.4.3 Is Required

✅ Yes

##### 1.17.3.4.4 Is Primary Key

❌ No

##### 1.17.3.4.5 Is Unique

❌ No

##### 1.17.3.4.6 Index Type

None

##### 1.17.3.4.7 Size

0

##### 1.17.3.4.8 Constraints

*No items available*

##### 1.17.3.4.9 Default Value



##### 1.17.3.4.10 Is Foreign Key

❌ No

##### 1.17.3.4.11 Precision

0

##### 1.17.3.4.12 Scale

0

#### 1.17.3.5.0 VARCHAR

##### 1.17.3.5.1 Name

insightType

##### 1.17.3.5.2 Type

🔹 VARCHAR

##### 1.17.3.5.3 Is Required

✅ Yes

##### 1.17.3.5.4 Is Primary Key

❌ No

##### 1.17.3.5.5 Is Unique

❌ No

##### 1.17.3.5.6 Index Type

Index

##### 1.17.3.5.7 Size

50

##### 1.17.3.5.8 Constraints

- ENUM('trend', 'anomaly', 'suggestion')

##### 1.17.3.5.9 Default Value



##### 1.17.3.5.10 Is Foreign Key

❌ No

##### 1.17.3.5.11 Precision

0

##### 1.17.3.5.12 Scale

0

#### 1.17.3.6.0 BOOLEAN

##### 1.17.3.6.1 Name

isDismissed

##### 1.17.3.6.2 Type

🔹 BOOLEAN

##### 1.17.3.6.3 Is Required

✅ Yes

##### 1.17.3.6.4 Is Primary Key

❌ No

##### 1.17.3.6.5 Is Unique

❌ No

##### 1.17.3.6.6 Index Type

Index

##### 1.17.3.6.7 Size

0

##### 1.17.3.6.8 Constraints

*No items available*

##### 1.17.3.6.9 Default Value

false

##### 1.17.3.6.10 Is Foreign Key

❌ No

##### 1.17.3.6.11 Precision

0

##### 1.17.3.6.12 Scale

0

#### 1.17.3.7.0 DateTime

##### 1.17.3.7.1 Name

generatedAt

##### 1.17.3.7.2 Type

🔹 DateTime

##### 1.17.3.7.3 Is Required

✅ Yes

##### 1.17.3.7.4 Is Primary Key

❌ No

##### 1.17.3.7.5 Is Unique

❌ No

##### 1.17.3.7.6 Index Type

Index

##### 1.17.3.7.7 Size

0

##### 1.17.3.7.8 Constraints

*No items available*

##### 1.17.3.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.17.3.7.10 Is Foreign Key

❌ No

##### 1.17.3.7.11 Precision

0

##### 1.17.3.7.12 Scale

0

### 1.17.4.0.0 Primary Keys

- aiInsightCardId

### 1.17.5.0.0 Unique Constraints

*No items available*

### 1.17.6.0.0 Indexes

- {'name': 'IX_AIInsightCard_Merchant_Dismissed_Generated', 'columns': ['MerchantAccountId', 'isDismissed', 'generatedAt'], 'type': 'BTree'}

## 1.18.0.0.0 UserPreference

### 1.18.1.0.0 Name

UserPreference

### 1.18.2.0.0 Description

Stores individual user preferences, such as UI theme choice (REQ-UI-005).

### 1.18.3.0.0 Attributes

#### 1.18.3.1.0 Guid

##### 1.18.3.1.1 Name

userPreferenceId

##### 1.18.3.1.2 Type

🔹 Guid

##### 1.18.3.1.3 Is Required

✅ Yes

##### 1.18.3.1.4 Is Primary Key

✅ Yes

##### 1.18.3.1.5 Is Unique

✅ Yes

##### 1.18.3.1.6 Index Type

UniqueIndex

##### 1.18.3.1.7 Size

0

##### 1.18.3.1.8 Constraints

*No items available*

##### 1.18.3.1.9 Default Value



##### 1.18.3.1.10 Is Foreign Key

❌ No

##### 1.18.3.1.11 Precision

0

##### 1.18.3.1.12 Scale

0

#### 1.18.3.2.0 Guid

##### 1.18.3.2.1 Name

UserId

##### 1.18.3.2.2 Type

🔹 Guid

##### 1.18.3.2.3 Is Required

✅ Yes

##### 1.18.3.2.4 Is Primary Key

❌ No

##### 1.18.3.2.5 Is Unique

✅ Yes

##### 1.18.3.2.6 Index Type

UniqueIndex

##### 1.18.3.2.7 Size

0

##### 1.18.3.2.8 Constraints

*No items available*

##### 1.18.3.2.9 Default Value



##### 1.18.3.2.10 Is Foreign Key

✅ Yes

##### 1.18.3.2.11 Precision

0

##### 1.18.3.2.12 Scale

0

#### 1.18.3.3.0 VARCHAR

##### 1.18.3.3.1 Name

theme

##### 1.18.3.3.2 Type

🔹 VARCHAR

##### 1.18.3.3.3 Is Required

✅ Yes

##### 1.18.3.3.4 Is Primary Key

❌ No

##### 1.18.3.3.5 Is Unique

❌ No

##### 1.18.3.3.6 Index Type

None

##### 1.18.3.3.7 Size

20

##### 1.18.3.3.8 Constraints

- ENUM('light', 'dark', 'system')

##### 1.18.3.3.9 Default Value

system

##### 1.18.3.3.10 Is Foreign Key

❌ No

##### 1.18.3.3.11 Precision

0

##### 1.18.3.3.12 Scale

0

#### 1.18.3.4.0 DateTime

##### 1.18.3.4.1 Name

updatedAt

##### 1.18.3.4.2 Type

🔹 DateTime

##### 1.18.3.4.3 Is Required

✅ Yes

##### 1.18.3.4.4 Is Primary Key

❌ No

##### 1.18.3.4.5 Is Unique

❌ No

##### 1.18.3.4.6 Index Type

None

##### 1.18.3.4.7 Size

0

##### 1.18.3.4.8 Constraints

*No items available*

##### 1.18.3.4.9 Default Value

CURRENT_TIMESTAMP

##### 1.18.3.4.10 Is Foreign Key

❌ No

##### 1.18.3.4.11 Precision

0

##### 1.18.3.4.12 Scale

0

### 1.18.4.0.0 Primary Keys

- userPreferenceId

### 1.18.5.0.0 Unique Constraints

- {'name': 'UC_UserPreference_UserId', 'columns': ['UserId']}

### 1.18.6.0.0 Indexes

*No items available*

## 1.19.0.0.0 DataSubjectRequest

### 1.19.1.0.0 Name

DataSubjectRequest

### 1.19.2.0.0 Description

Tracks Data Subject Access Requests (DSARs) for data export and deletion to comply with regulations like GDPR (REQ-CMPL-001).

### 1.19.3.0.0 Attributes

#### 1.19.3.1.0 Guid

##### 1.19.3.1.1 Name

dataSubjectRequestId

##### 1.19.3.1.2 Type

🔹 Guid

##### 1.19.3.1.3 Is Required

✅ Yes

##### 1.19.3.1.4 Is Primary Key

✅ Yes

##### 1.19.3.1.5 Is Unique

✅ Yes

##### 1.19.3.1.6 Index Type

UniqueIndex

##### 1.19.3.1.7 Size

0

##### 1.19.3.1.8 Constraints

*No items available*

##### 1.19.3.1.9 Default Value



##### 1.19.3.1.10 Is Foreign Key

❌ No

##### 1.19.3.1.11 Precision

0

##### 1.19.3.1.12 Scale

0

#### 1.19.3.2.0 Guid

##### 1.19.3.2.1 Name

MerchantAccountId

##### 1.19.3.2.2 Type

🔹 Guid

##### 1.19.3.2.3 Is Required

✅ Yes

##### 1.19.3.2.4 Is Primary Key

❌ No

##### 1.19.3.2.5 Is Unique

❌ No

##### 1.19.3.2.6 Index Type

Index

##### 1.19.3.2.7 Size

0

##### 1.19.3.2.8 Constraints

*No items available*

##### 1.19.3.2.9 Default Value



##### 1.19.3.2.10 Is Foreign Key

✅ Yes

##### 1.19.3.2.11 Precision

0

##### 1.19.3.2.12 Scale

0

#### 1.19.3.3.0 VARCHAR

##### 1.19.3.3.1 Name

customerIdentifier

##### 1.19.3.3.2 Type

🔹 VARCHAR

##### 1.19.3.3.3 Is Required

✅ Yes

##### 1.19.3.3.4 Is Primary Key

❌ No

##### 1.19.3.3.5 Is Unique

❌ No

##### 1.19.3.3.6 Index Type

Index

##### 1.19.3.3.7 Size

255

##### 1.19.3.3.8 Constraints

*No items available*

##### 1.19.3.3.9 Default Value



##### 1.19.3.3.10 Is Foreign Key

❌ No

##### 1.19.3.3.11 Precision

0

##### 1.19.3.3.12 Scale

0

#### 1.19.3.4.0 VARCHAR

##### 1.19.3.4.1 Name

requestType

##### 1.19.3.4.2 Type

🔹 VARCHAR

##### 1.19.3.4.3 Is Required

✅ Yes

##### 1.19.3.4.4 Is Primary Key

❌ No

##### 1.19.3.4.5 Is Unique

❌ No

##### 1.19.3.4.6 Index Type

Index

##### 1.19.3.4.7 Size

20

##### 1.19.3.4.8 Constraints

- ENUM('export', 'delete')

##### 1.19.3.4.9 Default Value



##### 1.19.3.4.10 Is Foreign Key

❌ No

##### 1.19.3.4.11 Precision

0

##### 1.19.3.4.12 Scale

0

#### 1.19.3.5.0 VARCHAR

##### 1.19.3.5.1 Name

status

##### 1.19.3.5.2 Type

🔹 VARCHAR

##### 1.19.3.5.3 Is Required

✅ Yes

##### 1.19.3.5.4 Is Primary Key

❌ No

##### 1.19.3.5.5 Is Unique

❌ No

##### 1.19.3.5.6 Index Type

Index

##### 1.19.3.5.7 Size

20

##### 1.19.3.5.8 Constraints

- ENUM('pending', 'completed', 'failed')

##### 1.19.3.5.9 Default Value

pending

##### 1.19.3.5.10 Is Foreign Key

❌ No

##### 1.19.3.5.11 Precision

0

##### 1.19.3.5.12 Scale

0

#### 1.19.3.6.0 Guid

##### 1.19.3.6.1 Name

RequestedByUserId

##### 1.19.3.6.2 Type

🔹 Guid

##### 1.19.3.6.3 Is Required

✅ Yes

##### 1.19.3.6.4 Is Primary Key

❌ No

##### 1.19.3.6.5 Is Unique

❌ No

##### 1.19.3.6.6 Index Type

Index

##### 1.19.3.6.7 Size

0

##### 1.19.3.6.8 Constraints

*No items available*

##### 1.19.3.6.9 Default Value



##### 1.19.3.6.10 Is Foreign Key

✅ Yes

##### 1.19.3.6.11 Precision

0

##### 1.19.3.6.12 Scale

0

#### 1.19.3.7.0 DateTime

##### 1.19.3.7.1 Name

createdAt

##### 1.19.3.7.2 Type

🔹 DateTime

##### 1.19.3.7.3 Is Required

✅ Yes

##### 1.19.3.7.4 Is Primary Key

❌ No

##### 1.19.3.7.5 Is Unique

❌ No

##### 1.19.3.7.6 Index Type

Index

##### 1.19.3.7.7 Size

0

##### 1.19.3.7.8 Constraints

*No items available*

##### 1.19.3.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.19.3.7.10 Is Foreign Key

❌ No

##### 1.19.3.7.11 Precision

0

##### 1.19.3.7.12 Scale

0

#### 1.19.3.8.0 DateTime

##### 1.19.3.8.1 Name

completedAt

##### 1.19.3.8.2 Type

🔹 DateTime

##### 1.19.3.8.3 Is Required

❌ No

##### 1.19.3.8.4 Is Primary Key

❌ No

##### 1.19.3.8.5 Is Unique

❌ No

##### 1.19.3.8.6 Index Type

None

##### 1.19.3.8.7 Size

0

##### 1.19.3.8.8 Constraints

*No items available*

##### 1.19.3.8.9 Default Value



##### 1.19.3.8.10 Is Foreign Key

❌ No

##### 1.19.3.8.11 Precision

0

##### 1.19.3.8.12 Scale

0

### 1.19.4.0.0 Primary Keys

- dataSubjectRequestId

### 1.19.5.0.0 Unique Constraints

*No items available*

### 1.19.6.0.0 Indexes

- {'name': 'IX_DataSubjectRequest_Merchant_Status', 'columns': ['MerchantAccountId', 'status'], 'type': 'BTree'}

# 2.0.0.0.0 Relations

## 2.1.0.0.0 REL_USER_PASSWORDRESETTOKEN_001

### 2.1.1.0.0 Name

UserPasswordResetTokens

### 2.1.2.0.0 Id

REL_USER_PASSWORDRESETTOKEN_001

### 2.1.3.0.0 Source Entity

User

### 2.1.4.0.0 Target Entity

PasswordResetToken

### 2.1.5.0.0 Type

🔹 OneToMany

### 2.1.6.0.0 Source Multiplicity

1

### 2.1.7.0.0 Target Multiplicity

0..*

### 2.1.8.0.0 Cascade Delete

❌ No

### 2.1.9.0.0 Is Identifying

❌ No

### 2.1.10.0.0 On Delete

Cascade

### 2.1.11.0.0 On Update

Cascade

## 2.2.0.0.0 REL_USER_USERMERCHANTACCOUNT_001

### 2.2.1.0.0 Name

UserMemberships

### 2.2.2.0.0 Id

REL_USER_USERMERCHANTACCOUNT_001

### 2.2.3.0.0 Source Entity

User

### 2.2.4.0.0 Target Entity

UserMerchantAccount

### 2.2.5.0.0 Type

🔹 OneToMany

### 2.2.6.0.0 Source Multiplicity

1

### 2.2.7.0.0 Target Multiplicity

0..*

### 2.2.8.0.0 Cascade Delete

❌ No

### 2.2.9.0.0 Is Identifying

❌ No

### 2.2.10.0.0 On Delete

Cascade

### 2.2.11.0.0 On Update

Cascade

## 2.3.0.0.0 REL_MERCHANTACCOUNT_USERMERCHANTACCOUNT_001

### 2.3.1.0.0 Name

MerchantAccountMemberships

### 2.3.2.0.0 Id

REL_MERCHANTACCOUNT_USERMERCHANTACCOUNT_001

### 2.3.3.0.0 Source Entity

MerchantAccount

### 2.3.4.0.0 Target Entity

UserMerchantAccount

### 2.3.5.0.0 Type

🔹 OneToMany

### 2.3.6.0.0 Source Multiplicity

1

### 2.3.7.0.0 Target Multiplicity

1..*

### 2.3.8.0.0 Cascade Delete

❌ No

### 2.3.9.0.0 Is Identifying

❌ No

### 2.3.10.0.0 On Delete

Cascade

### 2.3.11.0.0 On Update

Cascade

## 2.4.0.0.0 REL_ROLE_USERMERCHANTACCOUNT_001

### 2.4.1.0.0 Name

RoleAssignments

### 2.4.2.0.0 Id

REL_ROLE_USERMERCHANTACCOUNT_001

### 2.4.3.0.0 Source Entity

Role

### 2.4.4.0.0 Target Entity

UserMerchantAccount

### 2.4.5.0.0 Type

🔹 OneToMany

### 2.4.6.0.0 Source Multiplicity

1

### 2.4.7.0.0 Target Multiplicity

0..*

### 2.4.8.0.0 Cascade Delete

❌ No

### 2.4.9.0.0 Is Identifying

❌ No

### 2.4.10.0.0 On Delete

Restrict

### 2.4.11.0.0 On Update

Cascade

## 2.5.0.0.0 REL_USER_INVITATION_001

### 2.5.1.0.0 Name

UserSentInvitations

### 2.5.2.0.0 Id

REL_USER_INVITATION_001

### 2.5.3.0.0 Source Entity

User

### 2.5.4.0.0 Target Entity

Invitation

### 2.5.5.0.0 Type

🔹 OneToMany

### 2.5.6.0.0 Source Multiplicity

1

### 2.5.7.0.0 Target Multiplicity

0..*

### 2.5.8.0.0 Cascade Delete

❌ No

### 2.5.9.0.0 Is Identifying

❌ No

### 2.5.10.0.0 On Delete

SetNull

### 2.5.11.0.0 On Update

Cascade

## 2.6.0.0.0 REL_MERCHANTACCOUNT_INVITATION_001

### 2.6.1.0.0 Name

MerchantAccountInvitations

### 2.6.2.0.0 Id

REL_MERCHANTACCOUNT_INVITATION_001

### 2.6.3.0.0 Source Entity

MerchantAccount

### 2.6.4.0.0 Target Entity

Invitation

### 2.6.5.0.0 Type

🔹 OneToMany

### 2.6.6.0.0 Source Multiplicity

1

### 2.6.7.0.0 Target Multiplicity

0..*

### 2.6.8.0.0 Cascade Delete

❌ No

### 2.6.9.0.0 Is Identifying

❌ No

### 2.6.10.0.0 On Delete

Cascade

### 2.6.11.0.0 On Update

Cascade

## 2.7.0.0.0 REL_ROLE_INVITATION_001

### 2.7.1.0.0 Name

InvitationRole

### 2.7.2.0.0 Id

REL_ROLE_INVITATION_001

### 2.7.3.0.0 Source Entity

Role

### 2.7.4.0.0 Target Entity

Invitation

### 2.7.5.0.0 Type

🔹 OneToMany

### 2.7.6.0.0 Source Multiplicity

1

### 2.7.7.0.0 Target Multiplicity

0..*

### 2.7.8.0.0 Cascade Delete

❌ No

### 2.7.9.0.0 Is Identifying

❌ No

### 2.7.10.0.0 On Delete

Restrict

### 2.7.11.0.0 On Update

Cascade

## 2.8.0.0.0 REL_MERCHANTACCOUNT_CUSTOMER_001

### 2.8.1.0.0 Name

MerchantAccountCustomers

### 2.8.2.0.0 Id

REL_MERCHANTACCOUNT_CUSTOMER_001

### 2.8.3.0.0 Source Entity

MerchantAccount

### 2.8.4.0.0 Target Entity

Customer

### 2.8.5.0.0 Type

🔹 OneToMany

### 2.8.6.0.0 Source Multiplicity

1

### 2.8.7.0.0 Target Multiplicity

0..*

### 2.8.8.0.0 Cascade Delete

✅ Yes

### 2.8.9.0.0 Is Identifying

❌ No

### 2.8.10.0.0 On Delete

Cascade

### 2.8.11.0.0 On Update

Cascade

## 2.9.0.0.0 REL_MERCHANTACCOUNT_CATEGORY_001

### 2.9.1.0.0 Name

MerchantAccountCategories

### 2.9.2.0.0 Id

REL_MERCHANTACCOUNT_CATEGORY_001

### 2.9.3.0.0 Source Entity

MerchantAccount

### 2.9.4.0.0 Target Entity

Category

### 2.9.5.0.0 Type

🔹 OneToMany

### 2.9.6.0.0 Source Multiplicity

1

### 2.9.7.0.0 Target Multiplicity

0..*

### 2.9.8.0.0 Cascade Delete

✅ Yes

### 2.9.9.0.0 Is Identifying

❌ No

### 2.9.10.0.0 On Delete

Cascade

### 2.9.11.0.0 On Update

Cascade

## 2.10.0.0.0 REL_CATEGORY_CATEGORY_001

### 2.10.1.0.0 Name

CategoryHierarchy

### 2.10.2.0.0 Id

REL_CATEGORY_CATEGORY_001

### 2.10.3.0.0 Source Entity

Category

### 2.10.4.0.0 Target Entity

Category

### 2.10.5.0.0 Type

🔹 OneToMany

### 2.10.6.0.0 Source Multiplicity

0..1

### 2.10.7.0.0 Target Multiplicity

0..*

### 2.10.8.0.0 Cascade Delete

❌ No

### 2.10.9.0.0 Is Identifying

❌ No

### 2.10.10.0.0 On Delete

SetNull

### 2.10.11.0.0 On Update

Cascade

## 2.11.0.0.0 REL_MERCHANTACCOUNT_PRODUCT_001

### 2.11.1.0.0 Name

MerchantAccountProducts

### 2.11.2.0.0 Id

REL_MERCHANTACCOUNT_PRODUCT_001

### 2.11.3.0.0 Source Entity

MerchantAccount

### 2.11.4.0.0 Target Entity

Product

### 2.11.5.0.0 Type

🔹 OneToMany

### 2.11.6.0.0 Source Multiplicity

1

### 2.11.7.0.0 Target Multiplicity

0..*

### 2.11.8.0.0 Cascade Delete

✅ Yes

### 2.11.9.0.0 Is Identifying

❌ No

### 2.11.10.0.0 On Delete

Cascade

### 2.11.11.0.0 On Update

Cascade

## 2.12.0.0.0 REL_CATEGORY_PRODUCT_001

### 2.12.1.0.0 Name

CategoryProducts

### 2.12.2.0.0 Id

REL_CATEGORY_PRODUCT_001

### 2.12.3.0.0 Source Entity

Category

### 2.12.4.0.0 Target Entity

Product

### 2.12.5.0.0 Type

🔹 OneToMany

### 2.12.6.0.0 Source Multiplicity

1

### 2.12.7.0.0 Target Multiplicity

0..*

### 2.12.8.0.0 Cascade Delete

❌ No

### 2.12.9.0.0 Is Identifying

❌ No

### 2.12.10.0.0 On Delete

Restrict

### 2.12.11.0.0 On Update

Cascade

## 2.13.0.0.0 REL_MERCHANTACCOUNT_SALESORDER_001

### 2.13.1.0.0 Name

MerchantAccountSalesOrders

### 2.13.2.0.0 Id

REL_MERCHANTACCOUNT_SALESORDER_001

### 2.13.3.0.0 Source Entity

MerchantAccount

### 2.13.4.0.0 Target Entity

SalesOrder

### 2.13.5.0.0 Type

🔹 OneToMany

### 2.13.6.0.0 Source Multiplicity

1

### 2.13.7.0.0 Target Multiplicity

0..*

### 2.13.8.0.0 Cascade Delete

✅ Yes

### 2.13.9.0.0 Is Identifying

❌ No

### 2.13.10.0.0 On Delete

Cascade

### 2.13.11.0.0 On Update

Cascade

## 2.14.0.0.0 REL_CUSTOMER_SALESORDER_001

### 2.14.1.0.0 Name

CustomerSalesOrders

### 2.14.2.0.0 Id

REL_CUSTOMER_SALESORDER_001

### 2.14.3.0.0 Source Entity

Customer

### 2.14.4.0.0 Target Entity

SalesOrder

### 2.14.5.0.0 Type

🔹 OneToMany

### 2.14.6.0.0 Source Multiplicity

1

### 2.14.7.0.0 Target Multiplicity

0..*

### 2.14.8.0.0 Cascade Delete

❌ No

### 2.14.9.0.0 Is Identifying

❌ No

### 2.14.10.0.0 On Delete

Restrict

### 2.14.11.0.0 On Update

Cascade

## 2.15.0.0.0 REL_SALESORDER_ORDERITEM_001

### 2.15.1.0.0 Name

SalesOrderItems

### 2.15.2.0.0 Id

REL_SALESORDER_ORDERITEM_001

### 2.15.3.0.0 Source Entity

SalesOrder

### 2.15.4.0.0 Target Entity

OrderItem

### 2.15.5.0.0 Type

🔹 Composition

### 2.15.6.0.0 Source Multiplicity

1

### 2.15.7.0.0 Target Multiplicity

1..*

### 2.15.8.0.0 Cascade Delete

✅ Yes

### 2.15.9.0.0 Is Identifying

✅ Yes

### 2.15.10.0.0 On Delete

Cascade

### 2.15.11.0.0 On Update

Cascade

## 2.16.0.0.0 REL_PRODUCT_ORDERITEM_001

### 2.16.1.0.0 Name

ProductOrderItems

### 2.16.2.0.0 Id

REL_PRODUCT_ORDERITEM_001

### 2.16.3.0.0 Source Entity

Product

### 2.16.4.0.0 Target Entity

OrderItem

### 2.16.5.0.0 Type

🔹 OneToMany

### 2.16.6.0.0 Source Multiplicity

1

### 2.16.7.0.0 Target Multiplicity

0..*

### 2.16.8.0.0 Cascade Delete

❌ No

### 2.16.9.0.0 Is Identifying

❌ No

### 2.16.10.0.0 On Delete

Restrict

### 2.16.11.0.0 On Update

Cascade

## 2.17.0.0.0 REL_MERCHANTACCOUNT_ABANDONEDCART_001

### 2.17.1.0.0 Name

MerchantAccountAbandonedCarts

### 2.17.2.0.0 Id

REL_MERCHANTACCOUNT_ABANDONEDCART_001

### 2.17.3.0.0 Source Entity

MerchantAccount

### 2.17.4.0.0 Target Entity

AbandonedCart

### 2.17.5.0.0 Type

🔹 OneToMany

### 2.17.6.0.0 Source Multiplicity

1

### 2.17.7.0.0 Target Multiplicity

0..*

### 2.17.8.0.0 Cascade Delete

✅ Yes

### 2.17.9.0.0 Is Identifying

❌ No

### 2.17.10.0.0 On Delete

Cascade

### 2.17.11.0.0 On Update

Cascade

## 2.18.0.0.0 REL_CUSTOMER_ABANDONEDCART_001

### 2.18.1.0.0 Name

CustomerAbandonedCarts

### 2.18.2.0.0 Id

REL_CUSTOMER_ABANDONEDCART_001

### 2.18.3.0.0 Source Entity

Customer

### 2.18.4.0.0 Target Entity

AbandonedCart

### 2.18.5.0.0 Type

🔹 OneToMany

### 2.18.6.0.0 Source Multiplicity

1

### 2.18.7.0.0 Target Multiplicity

0..*

### 2.18.8.0.0 Cascade Delete

❌ No

### 2.18.9.0.0 Is Identifying

❌ No

### 2.18.10.0.0 On Delete

Cascade

### 2.18.11.0.0 On Update

Cascade

## 2.19.0.0.0 REL_ABANDONEDCART_ABANDONEDCARTITEM_001

### 2.19.1.0.0 Name

AbandonedCartItems

### 2.19.2.0.0 Id

REL_ABANDONEDCART_ABANDONEDCARTITEM_001

### 2.19.3.0.0 Source Entity

AbandonedCart

### 2.19.4.0.0 Target Entity

AbandonedCartItem

### 2.19.5.0.0 Type

🔹 Composition

### 2.19.6.0.0 Source Multiplicity

1

### 2.19.7.0.0 Target Multiplicity

1..*

### 2.19.8.0.0 Cascade Delete

✅ Yes

### 2.19.9.0.0 Is Identifying

✅ Yes

### 2.19.10.0.0 On Delete

Cascade

### 2.19.11.0.0 On Update

Cascade

## 2.20.0.0.0 REL_PRODUCT_ABANDONEDCARTITEM_001

### 2.20.1.0.0 Name

ProductAbandonedCartItems

### 2.20.2.0.0 Id

REL_PRODUCT_ABANDONEDCARTITEM_001

### 2.20.3.0.0 Source Entity

Product

### 2.20.4.0.0 Target Entity

AbandonedCartItem

### 2.20.5.0.0 Type

🔹 OneToMany

### 2.20.6.0.0 Source Multiplicity

1

### 2.20.7.0.0 Target Multiplicity

0..*

### 2.20.8.0.0 Cascade Delete

❌ No

### 2.20.9.0.0 Is Identifying

❌ No

### 2.20.10.0.0 On Delete

Cascade

### 2.20.11.0.0 On Update

Cascade

## 2.21.0.0.0 REL_MERCHANTACCOUNT_EMAILTEMPLATE_001

### 2.21.1.0.0 Name

MerchantAccountEmailTemplates

### 2.21.2.0.0 Id

REL_MERCHANTACCOUNT_EMAILTEMPLATE_001

### 2.21.3.0.0 Source Entity

MerchantAccount

### 2.21.4.0.0 Target Entity

EmailTemplate

### 2.21.5.0.0 Type

🔹 OneToMany

### 2.21.6.0.0 Source Multiplicity

1

### 2.21.7.0.0 Target Multiplicity

0..*

### 2.21.8.0.0 Cascade Delete

✅ Yes

### 2.21.9.0.0 Is Identifying

❌ No

### 2.21.10.0.0 On Delete

Cascade

### 2.21.11.0.0 On Update

Cascade

## 2.22.0.0.0 REL_MERCHANTACCOUNT_DOMAINAUTHENTICATION_001

### 2.22.1.0.0 Name

MerchantAccountDomainAuthentication

### 2.22.2.0.0 Id

REL_MERCHANTACCOUNT_DOMAINAUTHENTICATION_001

### 2.22.3.0.0 Source Entity

MerchantAccount

### 2.22.4.0.0 Target Entity

DomainAuthentication

### 2.22.5.0.0 Type

🔹 OneToOne

### 2.22.6.0.0 Source Multiplicity

1

### 2.22.7.0.0 Target Multiplicity

0..1

### 2.22.8.0.0 Cascade Delete

✅ Yes

### 2.22.9.0.0 Is Identifying

❌ No

### 2.22.10.0.0 On Delete

Cascade

### 2.22.11.0.0 On Update

Cascade

## 2.23.0.0.0 REL_MERCHANTACCOUNT_AUDITLOG_001

### 2.23.1.0.0 Name

MerchantAccountAuditLogs

### 2.23.2.0.0 Id

REL_MERCHANTACCOUNT_AUDITLOG_001

### 2.23.3.0.0 Source Entity

MerchantAccount

### 2.23.4.0.0 Target Entity

AuditLog

### 2.23.5.0.0 Type

🔹 OneToMany

### 2.23.6.0.0 Source Multiplicity

0..1

### 2.23.7.0.0 Target Multiplicity

0..*

### 2.23.8.0.0 Cascade Delete

❌ No

### 2.23.9.0.0 Is Identifying

❌ No

### 2.23.10.0.0 On Delete

Cascade

### 2.23.11.0.0 On Update

Cascade

## 2.24.0.0.0 REL_USER_AUDITLOG_001

### 2.24.1.0.0 Name

UserAuditLogs

### 2.24.2.0.0 Id

REL_USER_AUDITLOG_001

### 2.24.3.0.0 Source Entity

User

### 2.24.4.0.0 Target Entity

AuditLog

### 2.24.5.0.0 Type

🔹 OneToMany

### 2.24.6.0.0 Source Multiplicity

0..1

### 2.24.7.0.0 Target Multiplicity

0..*

### 2.24.8.0.0 Cascade Delete

❌ No

### 2.24.9.0.0 Is Identifying

❌ No

### 2.24.10.0.0 On Delete

SetNull

### 2.24.11.0.0 On Update

Cascade

## 2.25.0.0.0 REL_MERCHANTACCOUNT_AIINSIGHTCARD_001

### 2.25.1.0.0 Name

MerchantAccountAIInsightCards

### 2.25.2.0.0 Id

REL_MERCHANTACCOUNT_AIINSIGHTCARD_001

### 2.25.3.0.0 Source Entity

MerchantAccount

### 2.25.4.0.0 Target Entity

AIInsightCard

### 2.25.5.0.0 Type

🔹 OneToMany

### 2.25.6.0.0 Source Multiplicity

1

### 2.25.7.0.0 Target Multiplicity

0..*

### 2.25.8.0.0 Cascade Delete

✅ Yes

### 2.25.9.0.0 Is Identifying

❌ No

### 2.25.10.0.0 On Delete

Cascade

### 2.25.11.0.0 On Update

Cascade

## 2.26.0.0.0 REL_USER_USERPREFERENCE_001

### 2.26.1.0.0 Name

UserUserPreference

### 2.26.2.0.0 Id

REL_USER_USERPREFERENCE_001

### 2.26.3.0.0 Source Entity

User

### 2.26.4.0.0 Target Entity

UserPreference

### 2.26.5.0.0 Type

🔹 OneToOne

### 2.26.6.0.0 Source Multiplicity

1

### 2.26.7.0.0 Target Multiplicity

0..1

### 2.26.8.0.0 Cascade Delete

✅ Yes

### 2.26.9.0.0 Is Identifying

❌ No

### 2.26.10.0.0 On Delete

Cascade

### 2.26.11.0.0 On Update

Cascade

## 2.27.0.0.0 REL_MERCHANTACCOUNT_DATASUBJECTREQUEST_001

### 2.27.1.0.0 Name

MerchantAccountDataSubjectRequests

### 2.27.2.0.0 Id

REL_MERCHANTACCOUNT_DATASUBJECTREQUEST_001

### 2.27.3.0.0 Source Entity

MerchantAccount

### 2.27.4.0.0 Target Entity

DataSubjectRequest

### 2.27.5.0.0 Type

🔹 OneToMany

### 2.27.6.0.0 Source Multiplicity

1

### 2.27.7.0.0 Target Multiplicity

0..*

### 2.27.8.0.0 Cascade Delete

✅ Yes

### 2.27.9.0.0 Is Identifying

❌ No

### 2.27.10.0.0 On Delete

Cascade

### 2.27.11.0.0 On Update

Cascade

## 2.28.0.0.0 REL_USER_DATASUBJECTREQUEST_001

### 2.28.1.0.0 Name

UserDataSubjectRequests

### 2.28.2.0.0 Id

REL_USER_DATASUBJECTREQUEST_001

### 2.28.3.0.0 Source Entity

User

### 2.28.4.0.0 Target Entity

DataSubjectRequest

### 2.28.5.0.0 Type

🔹 OneToMany

### 2.28.6.0.0 Source Multiplicity

1

### 2.28.7.0.0 Target Multiplicity

0..*

### 2.28.8.0.0 Cascade Delete

❌ No

### 2.28.9.0.0 Is Identifying

❌ No

### 2.28.10.0.0 On Delete

SetNull

### 2.28.11.0.0 On Update

Cascade

