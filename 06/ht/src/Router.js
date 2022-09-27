export class Router {
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
