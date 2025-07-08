resource "azurerm_resource_group" "rg" {
  name     = "todo-rg"
  location = var.location
}

# resource "azurerm_virtual_network" "default" {
#   name                = "todo-vnet"
#   location            = azurerm_resource_group.rg.location
#   resource_group_name = azurerm_resource_group.rg.name
#   address_space       = ["10.0.0.0/16"]
# }

# resource "azurerm_network_security_group" "default" {
#   name                = "todo-nsg"
#   location            = azurerm_resource_group.rg.location
#   resource_group_name = azurerm_resource_group.rg.name

#   security_rule {
#     name                       = "test123"
#     priority                   = 100
#     direction                  = "Inbound"
#     access                     = "Allow"
#     protocol                   = "Tcp"
#     source_port_range          = "*"
#     destination_port_range     = "*"
#     source_address_prefix      = "*"
#     destination_address_prefix = "*"
#   }
# }

# resource "azurerm_subnet" "default" {
#   name                 = "todo-subnet"
#   virtual_network_name = azurerm_virtual_network.default.name
#   resource_group_name  = azurerm_resource_group.rg.name
#   address_prefixes     = ["10.0.2.0/24"]
#   service_endpoints    = ["Microsoft.Storage"]

#   delegation {
#     name = "fs"

#     service_delegation {
#       name = "Microsoft.DBforPostgreSQL/flexibleServers"

#       actions = [
#         "Microsoft.Network/virtualNetworks/subnets/join/action",
#       ]
#     }
#   }
# }

# resource "azurerm_subnet_network_security_group_association" "default" {
#   subnet_id                 = azurerm_subnet.default.id
#   network_security_group_id = azurerm_network_security_group.default.id
# }

# resource "azurerm_private_dns_zone" "default" {
#   name                = "todo-pdz.postgres.database.azure.com"
#   resource_group_name = azurerm_resource_group.rg.name

#   depends_on = [azurerm_subnet_network_security_group_association.default]
# }

# resource "azurerm_private_dns_zone_virtual_network_link" "default" {
#   name                  = "todo-pdzvnetlink.com"
#   private_dns_zone_name = azurerm_private_dns_zone.default.name
#   virtual_network_id    = azurerm_virtual_network.default.id
#   resource_group_name   = azurerm_resource_group.rg.name
# }

resource "azurerm_service_plan" "todo-asp" {
  name                = "todo-asp"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku

  depends_on = [azurerm_resource_group.rg]
}

resource "azurerm_linux_web_app" "frontend-web-app" {
  name                = "todo-frontend-webapp"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.todo-asp.id

  site_config {
    application_stack {
      node_version = "20-lts"
    }
  }
}

resource "azurerm_linux_web_app" "backend-web-app" {
  name                = "todo-backend-webapp"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.todo-asp.id

  app_settings = {
    DATABASE_URL      = "postgresql://${azurerm_postgresql_flexible_server.psql-server.administrator_login}:${azurerm_postgresql_flexible_server.psql-server.administrator_password}@${azurerm_postgresql_flexible_server.psql-server.fqdn}:5432/${azurerm_postgresql_flexible_server_database.psql-db.name}?sslmode=require"
    NODE_ENV          = "production"
    PORT              = "3000" # Default port for NestJS
    POSTGRES_PASSWORD = azurerm_postgresql_flexible_server.psql-server.administrator_password
    POSTGRES_USER     = azurerm_postgresql_flexible_server.psql-server.administrator_login
    POSTGRES_DB       = azurerm_postgresql_flexible_server_database.psql-db.name
    POSTGRES_PORT     = "5432"
    POSTGRES_HOST     = azurerm_postgresql_flexible_server.psql-server.fqdn
  }

  connection_string {
    name = "DefaultConnection"
    value = "postgresql://${azurerm_postgresql_flexible_server.psql-server.administrator_login}:${azurerm_postgresql_flexible_server.psql-server.administrator_password}@${azurerm_postgresql_flexible_server.psql-server.fqdn}:5432/${azurerm_postgresql_flexible_server_database.psql-db.name}?sslmode=require"
    type = "PostgreSQL"
  }

  depends_on = [azurerm_postgresql_flexible_server.psql-server]

  site_config {
    cors {
      allowed_origins = ["*"]
    }

    application_stack {
      node_version = "20-lts"
    }
  }

  # identity {
  #   type = "UserAssigned"
  #   identity_ids = [
  #     azurerm_user_assigned_identity.psql-user-assigned-identity.id
  #   ]
  # }
}

# resource "azurerm_user_assigned_identity" "psql-user-assigned-identity" {
#   name                = "psql-identity"
#   location            = azurerm_resource_group.rg.location
#   resource_group_name = azurerm_resource_group.rg.name

#   depends_on = [azurerm_resource_group.rg]
# }

resource "azurerm_postgresql_flexible_server" "psql-server" {
  name                   = "todo-psql-server"
  resource_group_name    = azurerm_resource_group.rg.name
  location               = azurerm_resource_group.rg.location
  version                = "16"
  administrator_login    = var.administrator_login
  administrator_password = var.administrator_password
  sku_name               = "B_Standard_B1ms"
  # sku_name               = "B1ms"
  storage_tier = "P4"
  storage_mb   = "32768"
  zone         = "1"
  # delegated_subnet_id    = azurerm_subnet.default.id
  # private_dns_zone_id    = azurerm_private_dns_zone.default.id

  authentication {
    active_directory_auth_enabled = false
  }

  # depends_on = [azurerm_private_dns_zone_virtual_network_link.default]
}

resource "azurerm_postgresql_flexible_server_database" "psql-db" {
  name      = "todo-psql-db"
  server_id = azurerm_postgresql_flexible_server.psql-server.id
  collation = "en_US.utf8"
  charset   = "UTF8"

  # prevent the possibility of accidental data loss
  lifecycle {
    prevent_destroy = false
  }
}
