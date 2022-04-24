data: data/sweden-latest.osm.pbf data/sweden.poly

data/sweden-latest.osm.pbf:
	curl --output data/sweden-latest.osm.pbf https://download.geofabrik.de/europe/sweden-latest.osm.pbf

data/sweden.poly:
	curl --output data/sweden.poly https://download.geofabrik.de/europe/sweden.poly


build: data
	docker compose run tiles import

server:
	docker compose up

db:
	docker compose exec --user postgres db osm2pgsql --slim --drop --number-processes 4 /data/sweden-latest.osm.pbf