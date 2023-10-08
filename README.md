# Karta

A website with a map and travel routing for Sweden.
The tiles are hosted from a locally running tile server using [Overv/openstreetmap-tile-server](https://github.com/Overv/openstreetmap-tile-server).

The routing is setup using [Graphhopper](https://github.com/graphhopper/graphhopper), [OSM](https://www.openstreetmap.org/). 
Public transit routes are based on [GTFS Sweden 3 data from trafiklab.se](https://www.trafiklab.se/api/trafiklab-apis/gtfs-sweden/).

## Setup

Get an api key for [GTFS Sweden 3](https://www.trafiklab.se/api/trafiklab-apis/gtfs-sweden/) to fetch the GTFS data and populate an environment variable `KARTA_GTFS_KEY` with it. Then you can

```sh
make build
make server
```

to start the tile server and the routing server.
Then open `index.html` with a browser and click to get a 1 hour public transit isochrone.
Graphhopper has a routing UI at [http://localhost:8989/maps/](http://localhost:8989/maps/)
Self hosted tiles, and routing! Amazing.

Building requires quite a lot of RAM. 15GB seems to be the minimum to run so give that to Docker. 

## Getting isochrones

For a 3600 second (1 hour) isochrone

```sh
curl "http://localhost:8989/isochrone?point=59.200069,17.83309&profile=pt&time_limit=3600&pt.earliest_departure_time=2022-04-06T07:07:00.000Z" | jq '.polygons[0]' > iso.geojson
```

