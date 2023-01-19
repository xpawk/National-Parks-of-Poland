import home from "./subPages/home.js";
import park from "./subPages/park.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const router = async () => {
  try {
    const routes = [
      { path: "/", view: home },
      { path: "/park/:id", view: park },
    ];
    const potentialMatches = routes.map((route) => {
      return {
        route: route,
        result: location.pathname.match(pathToRegex(route.path)),
      };
    });
    let match = potentialMatches.find(
      (potentialMatch) => potentialMatch.result !== null
    );
    if (!match) {
      match = {
        route: routes[0],
        result: [location.pathname],
      };
    }
    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
  } catch (error) {
    console.log(error);
  }
};
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
