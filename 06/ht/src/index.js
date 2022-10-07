import "./assets/css/owfont-regular.css";
import "./assets/css/style.css";

import { Router } from "./router";
import { displayGoogleMap } from "./mapService";
import { showAboutContent, displayDataWeather, displayMainContent, showAuthorContent } from "./pagesInfo";
import { getCityOnCoords, setSearchCoords, getSearchCoords, getCityData } from "./geolocationService";

const mainElement = document.querySelector(".main");

const routes = [
  {
    match: "weather-forecast",
    onEnter: async () => {
      if (!location.search) {
        const defaultCoords = [27.5667, 53.9];
        setSearchCoords(defaultCoords[0], defaultCoords[1]);
      }
      const coords = getSearchCoords();
      const city = await getCityOnCoords(coords);
      const data = await getCityData(city);
      displayMainContent(mainElement);
      displayGoogleMap(coords);
      displayDataWeather(document.querySelector(".info_weather"), data);
    },
  },

  {
    match: /lon=(.+)/,
    onEnter: async (coords) => {
      coords = coords.split("&lat=");
      coords = [+coords[0], +coords[1]];
      const city = await getCityOnCoords(coords);
      const data = await getCityData(city);
      displayDataWeather(document.querySelector(".info_weather"), data);
    },
  },

  {
    match: "about",
    onEnter: async () => showAboutContent(mainElement),
  },

  {
    match: "author",
    onEnter: async () => showAuthorContent(mainElement),
  },
];

const router = new Router(routes);
