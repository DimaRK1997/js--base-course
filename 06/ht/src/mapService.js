import { setSearchCoords } from "./geolocationService";

const favoritesUser = JSON.parse(localStorage.getItem("FavoritesUser")) || [];

export function displayGoogleMap(coords) {
  mapboxgl.accessToken = "pk.eyJ1IjoiZGltYTUwODMiLCJhIjoiY2w4YzhlYmQzMHgzYjQwcGJjdTd2eGJuayJ9.msmLRpckL1zuR5vmK3M_eA";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: coords,
    zoom: 9,
  });
  new mapboxgl.Marker({ color: "red", rotation: 0 }).setLngLat(coords).addTo(map);

  favoritesUser.map((el) => {
    new mapboxgl.Marker({ color: "black", rotation: 0 }).setLngLat(el.coords).addTo(map);
  });

  map.on("dblclick", function (e) {
    const favorites = {
      data: Math.random(),
      name: null,
      coords: {},
    };
    favorites.name = prompt("Name favorites:");
    if (favorites.name) {
      favorites.coords = e.lngLat;
      favoritesUser.unshift(favorites);
      localStorage.setItem("FavoritesUser", JSON.stringify(favoritesUser));
      setSearchCoords(e.lngLat.lng, e.lngLat.lat);
    }
  });
}
