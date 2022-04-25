.PHONY: tmp

data: data/sweden-latest.osm.pbf data/sweden.poly data/simplified-water-polygons-split-3857.zip data/water-polygons-split-3857.zip data/antarctica-icesheet-polygons-3857.zip data/antarctica-icesheet-outlines-3857.zip data/ne_110m_admin_0_boundary_lines_land.zip

data/sweden-latest.osm.pbf:
	curl --output data/sweden-latest.osm.pbf https://download.geofabrik.de/europe/sweden-latest.osm.pbf
data/sweden.poly:
	curl --output data/sweden.poly https://download.geofabrik.de/europe/sweden.poly

# datasets from openstreetmap-carto get-external-data.py
data/simplified-water-polygons-split-3857.zip:
	curl --output data/simplified-water-polygons-split-3857.zip https://osmdata.openstreetmap.de/download/simplified-water-polygons-split-3857.zip
data/water-polygons-split-3857.zip:
	curl --output data/water-polygons-split-3857.zip https://osmdata.openstreetmap.de/download/water-polygons-split-3857.zip
data/antarctica-icesheet-polygons-3857.zip:
	curl --output data/antarctica-icesheet-polygons-3857.zip https://osmdata.openstreetmap.de/download/antarctica-icesheet-polygons-3857.zip
data/antarctica-icesheet-outlines-3857.zip:
	curl --output data/antarctica-icesheet-outlines-3857.zip https://osmdata.openstreetmap.de/download/antarctica-icesheet-outlines-3857.zip
data/ne_110m_admin_0_boundary_lines_land.zip:
	curl --output data/ne_110m_admin_0_boundary_lines_land.zip https://naturalearth.s3.amazonaws.com/110m_cultural/ne_110m_admin_0_boundary_lines_land.zip

tmp:
	rm -rf ./tmp/
	unzip data/antarctica-icesheet-outlines-3857.zip -d tmp/
	unzip data/antarctica-icesheet-polygons-3857.zip -d tmp/
	mkdir tmp/ne_110m_admin_0_boundary_lines_land
	unzip data/ne_110m_admin_0_boundary_lines_land.zip -d tmp/ne_110m_admin_0_boundary_lines_land
	unzip data/simplified-water-polygons-split-3857.zip -d tmp/
	unzip data/water-polygons-split-3857.zip -d tmp/

build: data
	docker compose run tiles import

server:
	docker compose up -d

re:
	docker compose down -v && docker compose build && docker compose up -d

sh:
	docker compose build tiles && docker compose run --rm tiles /bin/bash

db:
	docker compose exec --user postgres db osm2pgsql --slim --drop --number-processes 4 /data/sweden-latest.osm.pbf
	docker compose exec --user postgres db psql --file=/var/lib/postgresql/carto-indexes.sql
