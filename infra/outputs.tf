output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.rg.name
}

output "app_service_plan_name" {
  description = "Name of the App Service Plan"
  value       = azurerm_service_plan.todo-asp.name
}

output "frontend_webapp_name" {
  description = "Name of the frontend web app"
  value       = azurerm_linux_web_app.frontend-web-app.name
}

output "backend_webapp_name" {
  description = "Name of the backend web app"
  value       = azurerm_linux_web_app.backend-web-app.name
}

output "frontend_webapp_url" {
  description = "URL of the frontend web app"
  value       = "https://${azurerm_linux_web_app.frontend-web-app.default_hostname}"
}

output "backend_webapp_url" {
  description = "URL of the backend web app"
  value       = "https://${azurerm_linux_web_app.backend-web-app.default_hostname}"
}

output "postgresql_server_fqdn" {
  description = "FQDN of the PostgreSQL server"
  value       = azurerm_postgresql_flexible_server.psql-server.fqdn
  sensitive   = true
}

output "postgresql_database_name" {
  description = "Name of the PostgreSQL database"
  value       = azurerm_postgresql_flexible_server_database.psql-db.name
}
