export async function getCityAndPos(coords) {
  const pos = coords.split(",") || [0, 0];
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pos[0]},${pos[1]}.json?access_token=pk.eyJ1IjoiZGltYTUwODMiLCJhIjoiY2w4YzhlYmQzMHgzYjQwcGJjdTd2eGJuayJ9.msmLRpckL1zuR5vmK3M_eA`;
  const response = await fetch(URL);
  const data = await response.json();
  const city = data.features[1].place_name.split(", ")[1];
  return [city, pos];
}

export async function changeCoordsHash(lon, lat) {
  location.hash = `#coord=${lon},${lat}`;
}
