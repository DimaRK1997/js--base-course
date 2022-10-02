import "./assets/css/owfont-regular.css";
import "./assets/css/style.css";

import { Router } from "./router";
import { displayGoogleMap } from "./mapService";
import {
  showAboutContent,
  displayDataWeather,
  displayLastCities,
  displayLastFavorites,
  showAuthorContent,
} from "./pagesInfo";
import { saveLocalStorage } from "./storageData";
import { getCityOnCoords, setSearchCoords, getSearchCoords, getCityData } from "./geolocationService";

const dataUser = JSON.parse(localStorage.getItem("DataUser")) || { city: [] };
const favoritesUser = JSON.parse(localStorage.getItem("FavoritesUser")) || [];
const routes = [
  {
    match: "weather-forecast",
    onResultDrawHTML: async () => {
      if (!location.search) {
        const defaultCoords = [27.5667, 53.9];
        setSearchCoords(defaultCoords[0], defaultCoords[1]);
      }
      const coords = getSearchCoords();
      const city = await getCityOnCoords(coords);
      const data = await getCityData(city);
      displayDataWeather(document.querySelector(".main"), data);
      displayGoogleMap(coords);
      displayLastCities(document.querySelector(".history-items"), dataUser);
      displayLastFavorites(document.querySelector(".favorites-items"), favoritesUser);
    },
  },

  {
    match: "about",
    onResultDrawHTML: async () => showAboutContent(document.querySelector(".main")),
  },

  {
    match: "author",
    onResultDrawHTML: async () => showAuthorContent(document.querySelector(".main")),
  },
];

document.querySelector(".content_search").addEventListener("change", function (e) {
  searchCity(document.querySelector("#search").value);
  document.querySelector("#search").value = "";
});

async function searchCity(city) {
  const data = await getCityData(city);
  if (data.cod === 200) saveLocalStorage("city", city);
  setSearchCoords(data.coord.lon, data.coord.lat);
}

const router = new Router(routes);
