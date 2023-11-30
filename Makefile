it:
	docker compose run --rm front npm i && make up
up:
	docker compose up -d
down:
	docker compose down
ps:
	docker compose ps
rs:
	docker compose restart
logs:
	docker compose logs
recreate:
	make down && make up