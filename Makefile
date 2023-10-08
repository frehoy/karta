data: data/sweden-latest.osm.pbf data/sweden.poly data/sweden.gtfs.zip

data/sweden.gtfs.zip:
	scripts/fetch_gtfs.sh

data/sweden-latest.osm.pbf:
	curl --output data/sweden-latest.osm.pbf https://download.geofabrik.de/europe/sweden-latest.osm.pbf

data/sweden.poly:
	curl --output data/sweden.poly https://download.geofabrik.de/europe/sweden.poly


build: data
	docker compose run --rm tiles import

server:
	docker compose up -d
