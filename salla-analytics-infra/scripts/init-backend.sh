#!/bin/bash
set -e

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
PROJECT_NAME="salla-analytics"
ENV=${1:-dev}

BUCKET_NAME="${PROJECT_NAME}-tf-state-${ENV}"
TABLE_NAME="${PROJECT_NAME}-tf-lock-${ENV}"

echo "Initializing Terraform backend for environment: $ENV"
echo "Region: $AWS_REGION"
echo "Bucket: $BUCKET_NAME"
echo "DynamoDB Table: $TABLE_NAME"

# Check if bucket exists
if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
    echo "Bucket $BUCKET_NAME already exists."
else
    echo "Creating bucket $BUCKET_NAME..."
    aws s3api create-bucket \
        --bucket "$BUCKET_NAME" \
        --region "$AWS_REGION"
        
    # Enable versioning
    aws s3api put-bucket-versioning \
        --bucket "$BUCKET_NAME" \
        --versioning-configuration Status=Enabled
        
    # Enable encryption
    aws s3api put-bucket-encryption \
        --bucket "$BUCKET_NAME" \
        --server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'
fi

# Check if DynamoDB table exists
if aws dynamodb describe-table --table-name "$TABLE_NAME" --region "$AWS_REGION" 2>/dev/null; then
    echo "DynamoDB table $TABLE_NAME already exists."
else
    echo "Creating DynamoDB table $TABLE_NAME..."
    aws dynamodb create-table \
        --table-name "$TABLE_NAME" \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
        --region "$AWS_REGION"
fi

echo "Backend initialization complete."