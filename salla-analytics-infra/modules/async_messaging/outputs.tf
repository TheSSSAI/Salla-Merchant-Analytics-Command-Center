# ---------------------------------------------------------------------------------------------------------------------
# MODULE OUTPUTS: ASYNC MESSAGING
# ---------------------------------------------------------------------------------------------------------------------

output "topics" {
  description = "Map of created topics, keyed by name, containing full resource objects."
  value       = upstash_qstash_topic.this
}

output "topic_ids" {
  description = "Map of Topic Name to Topic ID, used for referencing in application configuration."
  value       = { for k, v in upstash_qstash_topic.this : k => v.id }
}

output "topic_endpoints" {
  description = "Map of Topic Name to Topic Endpoint URLs (if applicable/available via provider attributes)."
  # Note: QStash usually uses a single endpoint + topic name, but we output ids for clarity.
  value       = { for k, v in upstash_qstash_topic.this : k => v.id }
}

output "qstash_token" {
  description = "The QStash authentication token required for publishing messages to these topics."
  value       = data.upstash_qstash_credentials.this.token
  sensitive   = true
}

output "qstash_signing_keys" {
  description = "Signing keys used to verify the authenticity of messages received by consumers."
  value = {
    current = data.upstash_qstash_credentials.this.current_signing_key
    next    = data.upstash_qstash_credentials.this.next_signing_key
  }
  sensitive = true
}