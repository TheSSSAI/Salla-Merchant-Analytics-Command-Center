# ---------------------------------------------------------------------------------------------------------------------
# MODULE: ASYNC MESSAGING (UPSTASH QSTASH)
# ---------------------------------------------------------------------------------------------------------------------
# This module provisions the message queuing infrastructure required for the CDC pipeline.
# It creates topics that serve as the event bus for domain events (e.g., 'order.created').
# ---------------------------------------------------------------------------------------------------------------------

terraform {
  required_providers {
    upstash = {
      source  = "upstash/upstash"
      version = "~> 1.0"
    }
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# RESOURCES: QSTASH TOPICS
# ---------------------------------------------------------------------------------------------------------------------
# Creates a topic for each event type defined in the input variable `topic_names`.
# Using for_each allows adding/removing topics dynamically without affecting others.
# ---------------------------------------------------------------------------------------------------------------------
resource "upstash_qstash_topic" "this" {
  for_each = toset(var.topic_names)

  name = each.value
}

# ---------------------------------------------------------------------------------------------------------------------
# DATA: QSTASH CREDENTIALS
# ---------------------------------------------------------------------------------------------------------------------
# Retrieves the QStash credentials needed by the application to publish messages.
# These are managed at the account level in Upstash but needed as output for the app configuration.
# ---------------------------------------------------------------------------------------------------------------------
data "upstash_qstash_credentials" "this" {}