const _wr = function (type) {
  var orig = history[type];
  return function () {
    var rv = orig.apply(this, arguments);
    var e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _wr("pushState");

export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener("hashchange", () => {
      this.handleRouteChange(location.hash.substring(1));
    });
    this.handleRouteChange(location.hash.substring(1));

    window.addEventListener("pushState", () => {
      this.handleRouteChange(location.search);
    });
    this.handleRouteChange(location.search);
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
