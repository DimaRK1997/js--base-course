export async function getCityOnCoords(coords) {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=pk.eyJ1IjoiZGltYTUwODMiLCJhIjoiY2w4YzhlYmQzMHgzYjQwcGJjdTd2eGJuayJ9.msmLRpckL1zuR5vmK3M_eA`;
  const response = await fetch(URL);
  const data = await response.json();
  const city = data.features[1].place_name.split(", ")[1];
  return city;
}

export async function getCityData(city) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export function setSearchCoords(lon, lat) {
  const url = new URL(window.location);
  url.searchParams.set("lon", lon);
  url.searchParams.set("lat", lat);
  history.pushState({}, "", url);
}

export function getSearchCoords() {
  const paramsString = location.search.substring(1);
  const searchParams = new URLSearchParams(paramsString);
  const coords = [searchParams.get("lon"), searchParams.get("lat")];
  return coords;
}

export function getMarkerAndMoveLocation(data, map) {
  map.flyTo({
    center: [data.coord.lon, data.coord.lat],
  });
  map._markers.map((el) => {
    if (el._color === "black") {
      el.remove();
    }
  });
  new mapboxgl.Marker({ color: "black", rotation: 0 }).setLngLat([data.coord.lon, data.coord.lat]).addTo(map);
}
