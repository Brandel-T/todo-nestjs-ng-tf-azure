variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
  sensitive   = true
}

variable "administrator_login" {
  description = "PostgreSQL administrator login name"
  type        = string
  sensitive   = true
}

variable "administrator_password" {
  description = "PostgreSQL administrator password"
  type        = string
  sensitive   = true
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "North Europe"
}

variable "app_service_sku" {
  description = "SKU for the App Service Plan"
  type        = string
  default     = "B1"
  validation {
    condition     = contains(["F1", "D1", "B1", "B2", "B3", "S1", "S2", "S3", "P1", "P2", "P3"], var.app_service_sku)
    error_message = "The app_service_sku must be a valid Azure App Service Plan SKU."
  }
}
