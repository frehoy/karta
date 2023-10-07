// initialize Leaflet
var map = L.map('map').setView({lon: 12.0, lat: 55.0}, 2);

async function load_isochrone(lat_lon) {
  let hours = 1;
  let time = 3600*hours;
  p = `${lat_lon.lat},${lat_lon.lng}`
  console.log(p);
  let url = new URL("http://localhost:8989/isochrone");
  //url.searchParams.set('point', '59.34749407695611,18.08845175590946');
  url.searchParams.set('point', p);
  url.searchParams.set('profile', 'pt');
  url.searchParams.set('time_limit', time);
  url.searchParams.set("pt.earliest_departure_time", "2022-05-06T12:00:00.000Z");
  const response = await fetch(url)
  const response_json = await response.json();
  const polygons = response_json.polygons;
  console.log(polygons);
  return polygons;
}

async function add_iso_to_map(lat_lon) {
  const json = await load_isochrone(lat_lon);
  L.geoJson(json).addTo(map);
}


// add the OpenStreetMap tiles
L.tileLayer(
  'http://127.0.0.1:8080/tile/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }
).addTo(map);

// show the scale bar on the lower left corner
L.control.scale({imperial: false, metric: true}).addTo(map);

// show a marker on the map
L.marker(
  {lon: 17.638936, lat: 59.858550}
).bindPopup('The center of the world').addTo(map);

//add_iso_to_map();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    add_iso_to_map(e.latlng)
}

map.on('click', onMapClick);