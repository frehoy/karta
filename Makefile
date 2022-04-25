data: data/sweden-latest.osm.pbf data/sweden.poly

data/sweden-latest.osm.pbf:
	curl --output data/sweden-latest.osm.pbf https://download.geofabrik.de/europe/sweden-latest.osm.pbf

data/sweden.poly:
	curl --output data/sweden.poly https://download.geofabrik.de/europe/sweden.poly


build: data
	docker compose run tiles import

server:
	docker compose up

re:
	docker compose down -v && docker compose build && docker compose up -d

sh:
	docker compose build tiles && docker compose run --rm tiles /bin/bash

db:
	docker compose exec --user postgres db osm2pgsql --slim --drop --number-processes 4 /data/sweden-latest.osm.pbf
	docker compose exec --user postgres db psql --file=/var/lib/postgresql/carto-indexes.sql
