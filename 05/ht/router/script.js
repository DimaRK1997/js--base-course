const routes = [
  {
    name: "index",
    match: "",
    onBeforeEnter: () => getResultText("onBeforeEnter index"),
    onEnter: () => getResultText("onEnter index"),
    onLeave: () => getResultText("onLeave index"),
  },
  {
    name: "city",
    match: /city=(.+)/,
    onBeforeEnter: (city) => getResultText(`onBeforeEnter city: ${city}`),
    onEnter: (city) => getResultText(`onEnter city: ${city}`),
    onLeave: (city) => getResultText(`onLeave city: ${city}`),
  },
  {
    name: "about",
    match: (text) => text === "about",
    onBeforeEnter: () => getResultText(`onBeforeEnter about`),
    onEnter: () => getResultText(`onEnter about`),
    onLeave: () => getResultText(`onLeave about`),
  },
];

function getResultText(text) {
  document.querySelector(".content").innerHTML += text + "<br>";
}

class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.currentParam = "";
    window.addEventListener("hashchange", () => {
      this.handleRouteChange(location.hash.substring(1));
    });
    this.handleRouteChange(location.hash.substring(1));
  }

  handleRouteChange(hash) {
    const nextRoute = this.selectNextRoute(hash);
    if (nextRoute) {
      this.currentRoute?.onLeave?.(...this.currentParam);
      nextRoute?.onBeforeEnter?.(...this.currentParam);
      nextRoute?.onEnter?.(...this.currentParam);
      this.currentRoute = nextRoute;
    }
  }

  selectNextRoute(hash) {
    const route = this.routes.find((el) => {
      if (typeof el.match === "string" && el.match === hash) {
        return el;
      }
      if (el.match instanceof RegExp && hash.match(el.match)) {
        this.currentParam = hash.match(el.match).splice(1, 2) || "";
        return el;
      }
      if (typeof el.match === "function" && el.match(hash)) {
        return el;
      }
    });
    return route;
  }
}
const router = new Router(routes);
