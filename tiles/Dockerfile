FROM ubuntu:22.04

RUN apt update && \
	apt install \
	--yes \
	--no-install-recommends \
	apache2 \
	libapache2-mod-tile \
	mapnik-utils \
	python3-mapnik \
	renderd

CMD ["apachectl", "-D", "FOREGROUND"]