COMPOSE:=docker-compose.yaml

.PHONY: dev
dev: ${COMPOSE} down
	docker compose up -d
	docker ps

.PHONY: shell
shell: ${COMPOSE}
	docker compose exec db bash

.PHONY: up
up: ${COMPOSE} down
	docker compose up -d
	docker ps

.PHONY: down
down: ${COMPOSE}
	docker compose down >/dev/null 2>&1
	docker ps

.PHONY: build
build: ${COMPOSE} down
	docker compose up --build -d
	docker ps

