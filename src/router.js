import createHistory from "history/createBrowserHistory";
import Logger from "js-logger";

import MePage from "./pages/MePage";
import {
  absolutePath,
  capitalize,
  ensureLeadingHash,
  fromQuery,
  nthIndexOf,
  toQuery,
} from "./utils";

const logger = Logger.get("bananas");

export default class Router {
  constructor(options = {}) {
    let basename = options.prefix || "";
    if (basename.endsWith("/")) {
      basename = basename.substring(0, basename.length - 1);
    }
    this.history = options.history
      ? typeof options.history === "function"
        ? options.history({ basename })
        : options.history
      : createHistory({
          basename,
        });

    // Disable muting of route notification events
    this.isMuted = false;

    // Listen on leaving admin or full page reload event
    window.addEventListener("beforeunload", this.routeWillUpdate.bind(this));
  }

  initialize(swagger) {
    this.swagger = swagger;

    // Add API prospect routes
    this.routes = Object.entries(swagger.spec.paths)
      .reduce(
        (specs, [endpoint, methods]) => [
          ...specs,
          ...Object.entries(methods).map(([method, spec]) => [
            endpoint,
            method,
            spec,
          ]),
        ],
        []
      )
      .filter(
        ([_, method, spec]) =>
          spec.operationId && ["get", "post"].includes(method)
      )
      .map(([endpoint, method, spec]) => {
        const {
          __originalOperationId,
          operationId,
          parameters,
          summary,
          tags,
        } = spec;
        const id = __originalOperationId;
        const action = this.getAction(id);
        const path = this.getPath(endpoint, method, action);
        const template = this.getTemplate(id, path, action);
        const app = this.getAppLabel(tags);
        const title = this.getTitle(summary, id);
        const params = parameters.filter(
          param => param.required && param.in === "path"
        );
        return {
          id,
          operationId,
          path,
          action,
          template,
          app,
          title,
          navigation: tags.includes("navigation"),
          parameters: {
            names: params.map(param => param.name) || null,
            types: params.reduce(
              (types, p) => ({ ...types, [p.name]: p.type }),
              {}
            ),
          },
          pattern: new RegExp(
            params.reduce(
              (pattern, param) =>
                pattern.replace(
                  `{${param.name}}`,
                  param.type === "integer"
                    ? `(\\d+)` // Named: `(?<${param.name}>\\d+)`
                    : `([\\w\\d_-]+)` // Named: `(?<${param.name}>[\\w\\d_-]+)`
                ),
              `^${path}$`
            )
          ),
        };
      });

    // Add non-api routes
    if (swagger.isAuthenticated) {
      this.add({
        id: "home",
        app: "",
        path: "/",
        title: "Dashboard",
        template: "index.js",
        navigation: true,
      });
    }

    // Build reverse routes
    this.reverseRoutes = this.routes.reduce((operations, route) => {
      operations[route.id] = route;
      operations[route.operationId] = route;
      return operations;
    }, {});

    // Build navigation routes
    this.navigationRoutes = this.routes
      .filter(route => route.navigation)
      .sort((route1, route2) => {
        if (route1.app < route2.app) {
          return -1;
        } else if (route1.app > route2.app) {
          return 1;
        } else if (route1.title < route2.title) {
          return -1;
        } else if (route1.title > route2.title) {
          return 1;
        }
        return 0;
      })
      .map(route => ({
        id: route.id,
        path: route.path,
        app: route.app || "",
        title: route.title,
      }));

    logger.debug("Initialized Router:", this.routes);
  }

  add({ id, operationId, path, title, template, pattern, app, navigation }) {
    const action = this.getAction(operationId);
    this.routes.push({
      id,
      operationId: operationId || id,
      parameters: {
        // TODO: Parse from path, i.e. /foo/bar/{id}/ -> ["id"]
        names: null,
        types: null,
      },
      path,
      action,
      template: template || this.getTemplate(path, action),
      app: app !== undefined ? app : id.split(":")[0].split(".")[0],
      title: this.getTitle(title, id),
      navigation,
      pattern: new RegExp(pattern || `^${path}$`),
    });
    this.sort();
  }

  sort() {
    this.routes = this.routes.sort((route1, route2) =>
      route1.path < route2.path ? 1 : -1
    );
  }

  on(eventName, handler) {
    if (typeof handler !== "function") {
      logger.error("Invalid handler when subcribing on event:", handler);
      return null;
    }

    if (eventName === "routeWillUpdate") {
      this.onRouteWillUpdate = handler;
      return () => {
        // Unlisten
        this.onRouteWillUpdate = undefined;
      };
    } else if (eventName === "routeDidUpdate") {
      return this.history.listen((...args) => {
        if (!this.isMuted) {
          handler(...args);
        }
      });
    }

    logger.error("Unknown router event name:", eventName);
    return null;
  }

  routeWillUpdate(...args) {
    /*
     * Notify listeners of routeWillUpdate event
     */
    if (this.onRouteWillUpdate && !this.isMuted) {
      this.onRouteWillUpdate(...args);
    }
  }

  updateState(state) {
    /*
     * Updates current history location's state without notifiying listeners
     */
    logger.debug("Router.updateState()", state);
    this.isMuted = true;
    const { location } = this.history;
    this.history.replace({
      ...location,
      state: { ...location.state, ...state },
    });
    this.isMuted = false;
  }

  getBasePath(path) {
    // Extract base path: /foo/bar/baz/ -> /foo/bar/
    return path.substring(0, nthIndexOf(path, "/", 2, 1) + 1 || undefined);
  }

  getPath(endpoint, method, action) {
    return method === "get" ? endpoint : `${endpoint}${action}/`;
  }

  getAction(originalOperationId) {
    // Extract action part: bananas.change_password:create -> create
    return originalOperationId ? originalOperationId.split(":")[1] : null;
  }

  getTemplate(id, path, action) {
    const internalPages = {
      "bananas.me:list": MePage,
    };

    let template = internalPages[id];

    // Build route template relative url path
    if (!template) {
      const basePath = this.getBasePath(path, true);
      const relativeBasePath = basePath.substring(1);
      template = `${relativeBasePath}${action}.js`;
    }

    return template;
  }

  getAppLabel(tags) {
    const app = tags.filter(tag => tag.startsWith("app:"))[0];
    return app.split(":")[1];
  }

  getTitle(summary, id) {
    return (
      summary ||
      (id &&
        capitalize(
          id.substring(id.indexOf(".") + 1, id.indexOf(":")).replace("_", " ")
        )) ||
      null
    );
  }

  getRoute(id) {
    return this.reverseRoutes[id];
  }

  getOperationTemplate(id) {
    const route = this.getRoute(id);
    return route ? route.template : undefined;
  }

  ResolvedRoute(route, overrides) {
    // Resolved route structure
    return {
      id: route.id,
      operationId: route.operationId,
      path: route.path,
      app: route.app,
      action: route.action,
      title: route.title,
      template:
        typeof route.template === "string" ? route.template : "Component",
      ...overrides,
    };
  }

  resolve(path) {
    // Resolve path to matching route
    const { location } = this.history;
    const pathname = absolutePath(path, location.pathname);

    for (const route of this.routes) {
      const match = route.pattern.exec(pathname);
      if (!match) {
        continue;
      }

      /*
      // Future RegExp groups
      const params =
        route.parameters.names && route.parameters.names.length
          ? route.pattern.exec(pathname).groups
          : null;
      */

      // Extract URL params
      const params =
        route.parameters.names && route.parameters.names.length
          ? match
              .slice(1)
              .map((value, index) => [route.parameters.names[index], value])
              .reduce(
                (groups, [name, value]) => ({
                  ...groups,
                  [name]:
                    route.parameters.types[name] === "integer"
                      ? parseInt(value, 10)
                      : value,
                }),
                {}
              )
          : null;

      const resolved = this.ResolvedRoute(route, { path: pathname, params });

      logger.debug(`Router.resolve():`, resolved);
      return resolved;
    }

    return null;
  }

  reverse(id, params) {
    // Reverse resolve route by operationId
    const route = this.getRoute(id);

    if (route) {
      // Render parameterized path
      const path = params
        ? Object.entries(params).reduce(
            (_path, [param, value]) => _path.replace(`{${param}}`, value),
            route.path
          )
        : route.path;

      return this.ResolvedRoute(route, { path, params: params || null });
    }

    return null;
  }

  reroute(to) {
    // Rewrite route to current window location
    logger.debug("Router.reroute()");
    const { location } = this.history;
    const { pathname, search, hash } = location;
    return this.route(
      to || {
        path: pathname,
        query: search,
        hash,
      },
      {
        rewrite: true,
      }
    );
  }

  route(to, { rewrite = false, patch = false } = {}) {
    /*
     * `to` can either be string...
     *
     *    "/foo/bar/"
     *
     *  ...or object...
     *
     *    {
     *      id: "foo_bar_read",
     *      params: {id: 1},
     *      path: /foo/bar/1/
     *      query: "?x=y" | {x: "y"}
     *      hash: "tab1"
     *    }
     *
     *  Note: `id` + optional `params` OR `path`
     */
    let current = this.history.location;

    const next =
      typeof to === "string"
        ? { pathname: to, search: "", hash: "" }
        : {
            pathname: to.path || current.pathname,
            search:
              typeof to.query === "object" ? toQuery(to.query) : to.query || "",
            hash: ensureLeadingHash(to.hash) || "",
          };

    // Resolve
    let route = undefined;
    if (to.id) {
      route = this.reverse(to.id, to.params);
    } else {
      route = this.resolve(next.pathname);
    }
    if (route) {
      next.pathname = route.path;
    }

    const referer =
      (this.history.location.state
        ? this.history.location.state.referer
        : null) || {};
    const pageChange = next.pathname !== current.pathname;
    const rewind = pageChange && next.pathname === referer.pathname;

    // Patch next location and keep parts from current or referer location
    if (patch && (!pageChange || rewind)) {
      const origin = next.pathname === referer.pathname ? referer : current;
      next.search = next.search ? next.search : origin.search;
      next.hash = next.hash ? next.hash : origin.hash;
    }

    // Extend resolved route with query/hash
    if (route) {
      route.query = next.search ? fromQuery(next.search) : null;
      route.hash = next.hash ? next.hash.substring(1) : null; // Strip leading #
    }

    const locationChange =
      pageChange ||
      next.search !== current.search ||
      next.hash !== current.hash;

    const replace = rewrite || !locationChange;
    const action = replace ? "REPLACE" : "PUSH";
    const navigate = replace ? this.history.replace : this.history.push;

    // Notify that route about to update
    this.routeWillUpdate(next, action);

    // Refresh current, event listeners may have modified state
    current = this.history.location;

    // Set next location's state
    next.state = {
      scroll: rewind ? referer.state.scroll : 0,
      ...(replace ? current.state : undefined),
      route,
      referer:
        pageChange && !rewrite
          ? {
              ...current,
              state: {
                ...current.state,
                referer: undefined, // Drop referer's referer to not endless nest
              },
            }
          : referer,
    };

    // Change history
    logger.debug("Router.route():", next);
    navigate(next);

    return { location: next, action };
  }
}
