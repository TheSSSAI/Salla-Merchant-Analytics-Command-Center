#!/bin/bash
set -e

echo "Checking Terraform formatting..."

if terraform fmt -recursive -check infrastructure/; then
    echo "Terraform formatting is correct."
    exit 0
else
    echo "Terraform formatting issues found. Please run 'terraform fmt -recursive infrastructure/'."
    exit 1
fi