const routes = [
  {
    name: "index",
    match: "",
    onBeforeEnter: async () => getResultText("onBeforeEnter index"),
    onEnter: async () => getResultText("onEnter index"),
    onLeave: async () => getResultText("onLeave index"),
    isDefault: true,
  },
  {
    name: "city",
    match: /city=(.+)/,
    onBeforeEnter: async (city) => getResultText(`onBeforeEnter city: ${city}`),
    onEnter: async (city) => getResultText(`onEnter city: ${city}`),
    onLeave: async (city) => getResultText(`onLeave city: ${city}`),
  },
  {
    name: "about",
    match: (text) => text === "about",
    onBeforeEnter: async () => getResultText(`onBeforeEnter about`),
    onEnter: async () => getResultText(`onEnter about`),
    onLeave: async () => getResultText(`onLeave about`),
  },
];

function getResultText(text) {
  return (document.querySelector(".content").innerHTML += text + "<br>");
}

class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener("hashchange", () => {
      this.handleRouteChange(location.hash.substring(1));
    });
    this.handleRouteChange(location.hash.substring(1));
  }

  handleRouteChange = async (hash) => {
    let currentRoute;
    try {
      currentRoute = await this.selectCurrentRoute(hash);
    } catch (error) {
      console.log("Ошибка получения роутера " + error);
    }
    await (this.lastRoute && this.lastRoute.onLeave && this.lastRoute.onLeave(this.lastParam));
    this.lastRoute = currentRoute;
    this.lastParam = this.currentParam;
    await currentRoute.onBeforeEnter(this.currentParam);
    await currentRoute.onEnter(this.currentParam);
  };

  selectCurrentRoute = async (hash) => {
    const route =
      this.routes.find((el) => {
        const matcher = el.match;
        if (typeof matcher === "string" && matcher === hash) {
          return el;
        }
        if (matcher instanceof RegExp && hash.match(matcher)) {
          this.currentParam = hash.match(matcher)[1] || "";
          return el;
        }
        if (typeof matcher === "function" && el.match(hash)) {
          return el;
        }
      }) || this.routes.find((route) => (route.isDefault ? route : ""));

    return route;
  };
}
const router = new Router(routes);
