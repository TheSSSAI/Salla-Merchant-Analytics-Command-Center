variable "topic_names" {
  description = "List of QStash topic names to create (e.g., 'cdc-events', 'notifications')"
  type        = list(string)
  
  validation {
    condition     = length(var.topic_names) > 0
    error_message = "At least one topic name must be provided."
  }
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}