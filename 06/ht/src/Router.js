const showAuthorContent = require("./AuthorInfo.js");
const showAboutContent = require("./AboutInfo.js");
const googleMap = require("./GoogleAPI.js");
const showMapData = require("./MainMapData.js");
const { itemsHistory, drawHistiryHTML } = require("./ItemsHistory.js");

const dataLocation = JSON.parse(localStorage.getItem("location")) || {};
dataLocation.lastMap = dataLocation.lastMap || [27.5667, 53.9];

const routes = [
  {
    match: /coord=(.+)/,
    onResultDrawHTML: async (coord) => {
      const [city, pos] = await resultURL(coord);
      await showMapData(document.querySelector(".main"), city);
      await googleMap(pos);
      await drawHistiryHTML(document.querySelector(".history-items"));
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

  {
    match: "main",
    onResultDrawHTML: async () => {
      location.assign(
        `${location.origin + location.pathname}#coord=${dataLocation.lastMap[0]},${dataLocation.lastMap[1]}`
      );
    },
  },

  {
    match: "",
    onResultDrawHTML: async () => {
      location.assign(
        `${location.origin + location.pathname}#coord=${dataLocation.lastMap[0]},${dataLocation.lastMap[1]}`
      );
    },
  },
];

class Router {
  constructor(routes) {
    this.routes = routes;

    window.addEventListener("hashchange", () => {
      this.handleRouteChange(location.hash.substring(1));
    });
    this.handleRouteChange(location.hash.substring(1));
  }

  async handleRouteChange(hash) {
    let currentRoute;

    try {
      currentRoute = await this.selectCurrentRoute(hash);
    } catch (error) {
      console.log("Ошибка получения роутера " + error);
    }

    await (currentRoute && currentRoute.onResultDrawHTML && currentRoute.onResultDrawHTML(this.currentParam));
  }

  selectCurrentRoute(hash) {
    const route =
      this.routes.find((el) => {
        const matcher = el.match;

        if (typeof matcher === "string" && matcher === hash) {
          return el;
        }

        if (matcher instanceof RegExp && matcher.test(hash)) {
          this.currentParam = hash.match(matcher)[1] || "";
          return el;
        }
      }) || this.routes.find((route) => route.isDefault);

    return route;
  }
}

document.querySelector(".content_search").addEventListener("change", function (e) {
  creatUrl(document.querySelector("#search").value);
});

async function creatUrl(city) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const data = await (await fetch(URL)).json();
  location.assign(`${location.origin + location.pathname}#coord=${data.coord.lon},${data.coord.lat}`);
  await itemsHistory(city);
  document.querySelector("#search").value = "";
}

async function resultURL(coord) {
  const pos = coord.split(",") || [0, 0];
  dataLocation.lastMap = pos;
  localStorage.setItem("location", JSON.stringify(dataLocation));
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pos[0]},${pos[1]}.json?access_token=pk.eyJ1IjoiZGltYTUwODMiLCJhIjoiY2w4YzhlYmQzMHgzYjQwcGJjdTd2eGJuayJ9.msmLRpckL1zuR5vmK3M_eA`;
  const data = await (await fetch(URL)).json();
  const city = data.features[1].place_name.split(", ")[1];
  location.assign(`${location.origin + location.pathname}#coord=${pos[0]},${pos[1]}`);
  return [city, pos];
}

const router = new Router(routes);
