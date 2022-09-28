import "./assets/css/owfont-regular.css";
import "./assets/css/style.css";

import { Router } from "./router";
import { displayGoogleMap } from "./googleAPI";
import { showAboutContent, displayDataWeather, displayLastCities, showAuthorContent } from "./pagesInfo";
import { saveLocalStorage } from "./storageData";
import { getCityAndPos, changeCoordsHash } from "./coordsAction";

const dataUser = JSON.parse(localStorage.getItem("DataUser")) || {};
dataUser.lastMap = dataUser.lastMap || [27.5667, 53.9];

const routes = [
  {
    match: "weather-forecast",
    onResultDrawHTML: async () => {
      await changeCoordsHash(dataUser.lastMap[0], dataUser.lastMap[1]);
    },
  },

  {
    match: /coord=(.+)/,
    onResultDrawHTML: async (coords) => {
      const [city, pos] = await getCityAndPos(coords);
      dataUser.lastMap = pos;
      const data = await saveLocalStorage("lastMap", pos);
      await displayDataWeather(document.querySelector(".main"), city);
      await displayGoogleMap(pos);
      await displayLastCities(document.querySelector(".history-items"), data);
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
  try {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const response = await fetch(URL);
    const data = await response.json();
    if (data.cod === 200) await saveLocalStorage("city", city);
    await changeCoordsHash(data.coord.lon, data.coord.lat);
  } catch (err) {
    alert("Ошибка запроса города");
  }
}

const router = new Router(routes);
