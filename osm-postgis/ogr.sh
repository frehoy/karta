# -f format_name
# -lco NAME=VALUE
ogr2ogr \
	-f PostgreSQL \
	-lco GEOMETRY_NAME=way \
	-lco SPATIAL_INDEX=FALSE \
	-lco EXTRACT_SCHEMA_FROM_LAYER_NAME=YES \
	-nln public.simplified_water_polygons \
	/data/tmp/simplified-water-polygons-split-3857/simplified_water_polygons.shp

ogr2ogr -f "PostgreSQL" PG:"dbname='postgres'" -overwrite -lco EXTRACT_SCHEMA_FROM_LAYER_NAME=YES /data/tmp/simplified-water-polygons-split-3857/simplified_water_polygons.shp -nln public.simplified_water_polygons