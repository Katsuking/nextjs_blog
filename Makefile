COMPOSE:=docker-compose.yml

.PHONY: dev
dev: ${COMPOSE} down
	docker compose up -d
	docker ps

.PHONY: shell
shell: ${COMPOSE}
	docker compose exec mongo bash

.PHONY: up
up: ${COMPOSE} down
	docker compose up -d
	docker ps

.PHONY: down
down: ${COMPOSE}
	docker compose down >/dev/null 2>&1


