FROM postgres:14-bullseye

LABEL maintainer="PostGIS Project - https://postgis.net"

ENV POSTGIS_MAJOR 3
ENV POSTGIS_VERSION 3.2.1+dfsg-1.pgdg110+1

RUN apt-get update \
     && apt-cache showpkg postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR \
     && apt-get install -y --no-install-recommends \
     postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR=$POSTGIS_VERSION \
     postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts \
     osm2pgsql \
     && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./initdb-postgis.sh /docker-entrypoint-initdb.d/10_postgis.sh
COPY ./update-postgis.sh /usr/local/bin
# Add carto indexes so we can use them later in make-db
COPY ./carto-indexes.sql /var/lib/postgresql
