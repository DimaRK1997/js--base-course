import { setSearchCoords, getCityData, getMarkerAndMoveLocation } from "./geolocationService";
import { displayLastCities, displayLastFavorites } from "./pagesInfo";
import { saveLocalStorage } from "./storageData";

const history = saveLocalStorage("history");
let favoritesUser = saveLocalStorage("FavoritesUser");

export function displayGoogleMap(coords) {
  const historyElement = document.querySelector(".history-items");
  const favoritesElement = document.querySelector(".favorites-items");

  mapboxgl.accessToken = "pk.eyJ1IjoiZGltYTUwODMiLCJhIjoiY2w4YzhlYmQzMHgzYjQwcGJjdTd2eGJuayJ9.msmLRpckL1zuR5vmK3M_eA";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: coords,
    zoom: 10,
  });

  new mapboxgl.Marker({ color: "black", rotation: 0 }).setLngLat(coords).addTo(map);

  map.on("moveend", async function (e) {
    const center = map.getCenter();
    setSearchCoords(center.lng, center.lat);
  });

  favoritesUser.map((el) => {
    const marker = new mapboxgl.Marker({ color: "red", rotation: 0 }).setLngLat(el.coords).addTo(map);
    marker.user = el;
  });

  map.on("click", function (e) {
    const name = prompt("Name favorites:");
    if (name) {
      const marker = new mapboxgl.Marker({ color: "red", rotation: 0 }).setLngLat(e.lngLat).addTo(map);
      marker.user = {
        id: Date.now(),
        name: name,
        coords: e.lngLat,
      };
      displayLastFavorites(favoritesElement, map._markers);
      favoritesUser = saveLocalStorage("FavoritesUser", marker.user);
    }
  });

  document.querySelector(".content_search").addEventListener("change", async (e) => {
    const city = document.querySelector("#search");
    const data = await getCityData(city.value);
    if (data.cod === 200) {
      const getCities = saveLocalStorage("history", city.value);
      setSearchCoords(data.coord.lon, data.coord.lat);
      displayLastCities(historyElement, getCities);
      getMarkerAndMoveLocation(data, map);
    }
    city.value = "";
  });

  document.querySelector(".content__info").addEventListener("click", async (e) => {
    const elToCoords = e.target.parentNode.parentNode.getAttribute("data-coords");
    const clickOnFavorite = e.target.matches(".name");
    const clickOnCity = e.target.matches(".name");

    map._markers.map((el, i) => {
      if (el.user) {
        if (el.user.id == elToCoords && e.target.tagName === "BUTTON") {
          el.remove();
          favoritesUser.map((el, i) => {
            if (el.id == elToCoords) {
              favoritesUser.splice(i, 1);
            }
          });
        }
        if (el.user.id == elToCoords && clickOnFavorite) {
          setSearchCoords(el.user.coords.lng, el.user.coords.lat);
          map.flyTo({
            center: [el.user.coords.lng, el.user.coords.lat],
          });
        }
      }
    });
    if (clickOnCity && e.target.parentNode.hasAttribute("data-city")) {
      const city = e.target.parentNode.getAttribute("data-city");
      const data = await getCityData(city);
      setSearchCoords(data.coord.lon, data.coord.lat);
      getMarkerAndMoveLocation(data, map);
    }
    displayLastFavorites(favoritesElement, map._markers);
    localStorage.setItem("FavoritesUser", JSON.stringify(favoritesUser));
  });

  displayLastCities(historyElement, history);
  displayLastFavorites(favoritesElement, map._markers);
}
