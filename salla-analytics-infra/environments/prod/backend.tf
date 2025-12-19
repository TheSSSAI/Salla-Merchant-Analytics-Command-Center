terraform {
  backend "s3" {
    bucket         = "salla-analytics-tf-state-prod"
    key            = "env/prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "salla-analytics-tf-lock-prod"
  }
}