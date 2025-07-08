PROJECT_NAME=todo-app
COMPOSE_FILE=docker-compose.yml

up:
	docker compose -f $(COMPOSE_FILE) up --build

up-frontend:
	up frontend
	
up-backend:
	up backend

down:
	docker compose -f $(COMPOSE_FILE) down

build:
	docker compose -f $(COMPOSE_FILE) build

logs:
	docker compose -f $(COMPOSE_FILE) logs -f

clean:
	docker system prune -f

restart: down up

help:
	@echo ""
	@echo "Available commands:"
	@echo "  up              Build and start containers"
	@echo "  down            Stop and remove containers"
	@echo "  build           Build the services (with environment variables)"
	@echo "  logs            Show logs from the containers"
	@echo "  clean           Clean up unused Docker resources"
	@echo "  restart         Restart the containers"
	@echo "  backend-shell   Open a shell inside the backend container"
	@echo "  frontend-shell  Open a shell inside the frontend container"
	@echo ""


backend-shell:
	docker exec -it todo_api sh

frontend-shell:
	docker exec -it todo_frontend sh
	
.PHONY: up down build logs clean restart backend-shell frontend-shell help