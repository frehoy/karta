// initialize Leaflet
const map = L.map('map').setView({ lon: 16.0, lat: 62.0 }, 7);

const load_isochrone = async (lat_lon, hours) => {
  const seconds = 3600 * hours;
  const p = `${lat_lon.lat},${lat_lon.lng}`;

  const profile = "pt";

  const url = new URL("http://localhost:8989/isochrone");
  url.searchParams.set('point', p);
  url.searchParams.set('time_limit', seconds);

  // profile specific params
  if (profile === "pt") {
    url.searchParams.set('profile', 'pt');
    url.searchParams.set("pt.earliest_departure_time", "2023-10-23T12:00:00.000Z");
  } else {
    url.searchParams.set('profile', 'car');
  }

  const response = await fetch(url);
  const { polygons } = await response.json();
  return polygons;
};

const add_iso_to_map = async (lat_lon) => {
  const isochrones = [
    // green
    { time: 0.25, color: "#00ff00", opacity: 1.0 },
    //yellow
    { time: 0.5, color: "#FFFF00", opacity: 0.5 },
    // orange
    { time: 0.75, color: "#ff7800", opacity: 0.25 },
    // red
    { time: 1.0, color: "#ff0000", opacity: 0.1 },
  ];

  const promises = isochrones.map(async (isochrone) => {
    const json = await load_isochrone(lat_lon, isochrone.time);
    const style = {
      color: isochrone.color,
      weight: 0,
      opacity: isochrone.opacity,
    };
    L.geoJson(json, { style }).addTo(map);
  });

  await Promise.all(promises);
};

// add the OpenStreetMap tiles
L.tileLayer(
  'http://localhost:8080/tile/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }
).addTo(map);

// show the scale bar on the lower left corner
L.control.scale({ imperial: false, metric: true }).addTo(map);

// show a marker on the map
L.marker(
  { lon: 17.638936, lat: 59.858550 }
).bindPopup('The center of the world').addTo(map);

const popup = L.popup();

const onMapClick = (e) => {
  popup
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at ${e.latlng.toString()}`)
    .openOn(map);
  add_iso_to_map(e.latlng);
};

map.on('click', onMapClick);


let layer = protomapsL.leafletLayer({ url: 'http://localhost:8181/listings/{z}/{x}/{y}.mvt' })
layer.addTo(map)
