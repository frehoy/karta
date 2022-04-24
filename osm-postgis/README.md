# ARM postgis docker image with osm2pgsql

Unfortunately [postgis does not provide ARM images on docker hub yet](https://github.com/postgis/docker-postgis/issues/216) so we need to build our own. 

This directory is copied from the [postgis 14-3.2](https://github.com/postgis/docker-postgis/tree/master/14-3.2) and the Dockerfile has been extended to include `osm2pgsql` as well. A `docker build` pointing at a remote repo would have been nicer but apparently buildkit is the thing nowadays and I couldn't get it to work. A `FROM postgis` and adding osm2pgsql would have been neater but here we are. 

