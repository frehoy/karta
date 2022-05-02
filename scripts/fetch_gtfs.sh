#!/usr/bin/env sh

# Check that KARTA_GTFS_KEY is set and use it to download a gtfs data
set -e

# Check the key is set
if [ -z "$KARTA_GTFS_KEY" ]; then
    cat <<EOF
    KARTA_GTFS_KEY is not set. 
    It is required to fetch GTFS data from resrobot.se
    Get a key from https://developer.trafiklab.se/api/gtfs-sverige-2 
    and populate KARTA_GTFS_KEY
EOF
fi

# Download the data
url="https://api.resrobot.se/gtfs/sweden.zip?key=${KARTA_GTFS_KEY}"
curl -o data/sweden.gtfs.zip "$url"

# Check we don't have an acces denied error in the response
if grep -q "access denied" sweden.gtfs.zip; then
    echo "Looks like downloading data/sweden.gtfs.zip failed. Check your API key."
    echo "You probably want to fix the key and run this again."
    exit 13
fi
