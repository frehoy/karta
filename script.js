// initialize Leaflet
var map = L.map('map').setView({ lon: 16.0, lat: 62.0 }, 7);

async function load_isochrone(lat_lon, hours) {
  let seconds = 3600 * hours;
  p = `${lat_lon.lat},${lat_lon.lng}`

  let profile = "car"

  let url = new URL("http://localhost:8989/isochrone");
  url.searchParams.set('point', p);
  url.searchParams.set('time_limit', seconds);


  // profile specific params
  if (profile == "pt") {
    url.searchParams.set('profile', 'pt');
    url.searchParams.set("pt.earliest_departure_time", "2023-10-23T12:00:00.000Z");
  } else {
    url.searchParams.set('profile', 'car');
  }
  const response = await fetch(url)
  const response_json = await response.json();
  const polygons = response_json.polygons;
  return polygons;
}

async function add_iso_to_map(lat_lon) {
  isochrones = [
    // green
    { time: 0.25, color: "#00ff00", opacity: 1.0 },
    //yellow
    { time: 0.5, color: "#FFFF00", opacity: 0.5 },
    // orange
    { time: 0.75, color: "#ff7800", opacity: 0.25 },
    // red
    { time: 1.0, color: "#ff0000", opacity: 0.1 },
  ]
  for (i in isochrones) {
    isochrone = isochrones[i]
    console.log(isochrone)
    const json = await load_isochrone(lat_lon, isochrone.time);
    let style = {
      "color": isochrone.color,
      "weight": 0,
      "opacity": 0.1
    }
    L.geoJson(json, { style: style }).addTo(map);
  }
}


// add the OpenStreetMap tiles
L.tileLayer(
  'http://localhost:8080/tile/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }
).addTo(map);

// show the scale bar on the lower left corner
L.control.scale({ imperial: false, metric: true }).addTo(map);

// show a marker on the map
L.marker(
  { lon: 17.638936, lat: 59.858550 }
).bindPopup('The center of the world').addTo(map);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
  add_iso_to_map(e.latlng)
}

map.on('click', onMapClick);