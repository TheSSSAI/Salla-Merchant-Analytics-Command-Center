terraform {
  backend "s3" {
    bucket         = "salla-analytics-tf-state-dev"
    key            = "env/dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "salla-analytics-tf-lock-dev"
  }
}