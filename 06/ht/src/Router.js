const showAuthorContent = require("./AuthorInfo.js");
const showAboutContent = require("./AboutInfo.js");
const resultGoogleMap = require("./GoogleAPI.js");
const { drawDataCity, drawHistiryHTML } = require("./MainMapData.js");
const saveLocalStorage = require("./StorageData.js");
const { changeURL, resultURL } = require("./ChandeURL.js");

const dataUser = JSON.parse(localStorage.getItem("DataUser")) || {};
dataUser.lastMap = dataUser.lastMap || [27.5667, 53.9];

const routes = [
  {
    match: /coord=(.+)/,
    onResultDrawHTML: async (coords) => {
      const [city, pos] = await resultURL(coords);
      dataUser.lastMap = pos;
      const data = await saveLocalStorage("lastMap", pos);
      await drawDataCity(document.querySelector(".main"), city);
      await resultGoogleMap(pos);
      await drawHistiryHTML(document.querySelector(".history-items"), data);
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
      await changeURL(dataUser.lastMap[0], dataUser.lastMap[1]);
    },
  },

  {
    match: "",
    onResultDrawHTML: async () => {
      await changeURL(dataUser.lastMap[0], dataUser.lastMap[1]);
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
  searchCity(document.querySelector("#search").value);
  document.querySelector("#search").value = "";
});

async function searchCity(city) {
  try {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const data = await (await fetch(URL)).json();
    await changeURL(data.coord.lon, data.coord.lat);
  } catch (err) {
    alert("Ошибка запроса города");
  }
}

// function locationUser() {
//   navigator.geolocation.getCurrentPosition(coordUser);
// }
// locationUser();

// function coordUser(pos) {
//   dataUser.lastMap = [pos.coords.longitude, pos.coords.latitude];
// }

//
// Как сделать чтобы при первом отрытии сайта,
// у пользователя заросило местоположение,
// если разрешил то нариовать там где он находиться, если не разрешил,
// то тогда любую точку?

// я сделал чтобы у меня был запрос, но у меня не ждет пока пользователь,
// разрешит или запретит, у меня сразу рисует ту любую точку.
const router = new Router(routes);
