async function changeURL(lon, lat) {
  location.assign(`${location.origin + location.pathname}#coord=${lon},${lat}`);
}

async function resultURL(coords) {
  const pos = coords.split(",") || [0, 0];
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pos[0]},${pos[1]}.json?access_token=pk.eyJ1IjoiZGltYTUwODMiLCJhIjoiY2w4YzhlYmQzMHgzYjQwcGJjdTd2eGJuayJ9.msmLRpckL1zuR5vmK3M_eA`;
  const data = await (await fetch(URL)).json();
  const city = data.features[1].place_name.split(", ")[1];

  return [city, pos];
}

module.exports = { changeURL, resultURL };
