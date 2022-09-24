async function googleMap(pos) {
  mapboxgl.accessToken = "pk.eyJ1IjoiZGltYTUwODMiLCJhIjoiY2w4YzhlYmQzMHgzYjQwcGJjdTd2eGJuayJ9.msmLRpckL1zuR5vmK3M_eA";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: pos,
    zoom: 9,
  });

  const marker2 = new mapboxgl.Marker({ color: "red", rotation: 0 }).setLngLat(pos).addTo(map);
}

module.exports = googleMap;
