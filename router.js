"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _history = require("history");

var _jsLogger = _interopRequireDefault(require("js-logger"));

var _pages = require("./pages");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const logger = _jsLogger.default.get("bananas");

class Router {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let basename = options.prefix || "";

    if (basename.endsWith("/")) {
      basename = basename.substring(0, basename.length - 1);
    }

    this.history = options.history ? typeof options.history === "function" ? options.history({
      basename
    }) : options.history : (0, _history.createBrowserHistory)({
      basename
    }); // Disable muting of route notification events

    this.isMuted = false; // Listen on leaving admin or full page reload event

    window.addEventListener("beforeunload", this.routeWillUpdate.bind(this));
  }

  initialize(swagger) {
    this.swagger = swagger; // Add API prospect routes

    this.routes = Object.entries(swagger.spec.paths).reduce((specs, _ref) => {
      let _ref2 = _slicedToArray(_ref, 2),
          endpoint = _ref2[0],
          methods = _ref2[1];

      return [...specs, ...Object.entries(methods).map((_ref3) => {
        let _ref4 = _slicedToArray(_ref3, 2),
            method = _ref4[0],
            spec = _ref4[1];

        return [endpoint, method, spec];
      })];
    }, []).filter((_ref5) => {
      let _ref6 = _slicedToArray(_ref5, 3),
          _ = _ref6[0],
          method = _ref6[1],
          spec = _ref6[2];

      return spec.operationId && ["get", "post"].includes(method);
    }).map((_ref7) => {
      let _ref8 = _slicedToArray(_ref7, 3),
          endpoint = _ref8[0],
          method = _ref8[1],
          spec = _ref8[2];

      const __originalOperationId = spec.__originalOperationId,
            operationId = spec.operationId,
            parameters = spec.parameters,
            summary = spec.summary,
            tags = spec.tags;
      const id = __originalOperationId;
      const action = this.getAction(id);
      const path = this.getPath(endpoint, method, action);
      const template = this.getTemplate(id, path, action);
      const app = this.getAppLabel(tags);
      const title = this.getTitle(summary, id);
      const params = parameters.filter(param => param.required && param.in === "path");
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
          types: params.reduce((types, p) => _objectSpread({}, types, {
            [p.name]: p.type
          }), {})
        },
        pattern: new RegExp(params.reduce((pattern, param) => pattern.replace(`{${param.name}}`, param.type === "integer" ? `(\\d+)` // Named: `(?<${param.name}>\\d+)`
        : `([\\w\\d_-]+)` // Named: `(?<${param.name}>[\\w\\d_-]+)`
        ), `^${path}$`))
      };
    }); // Add non-api routes

    if (swagger.isAuthenticated) {
      this.add({
        id: "home",
        app: "",
        path: "/",
        title: "Dashboard",
        template: "index.js",
        navigation: true
      });
    } // Build reverse routes


    this.reverseRoutes = this.routes.reduce((operations, route) => {
      operations[route.id] = route;
      operations[route.operationId] = route;
      return operations;
    }, {}); // Build navigation routes

    this.navigationRoutes = this.routes.filter(route => route.navigation).sort((route1, route2) => {
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
    }).map(route => ({
      id: route.id,
      path: route.path,
      app: route.app || "",
      title: route.title
    }));
    logger.debug("Initialized Router:", this.routes);
  }

  add(_ref9) {
    let id = _ref9.id,
        operationId = _ref9.operationId,
        path = _ref9.path,
        title = _ref9.title,
        template = _ref9.template,
        pattern = _ref9.pattern,
        app = _ref9.app,
        navigation = _ref9.navigation;
    const action = this.getAction(operationId);
    this.routes.push({
      id,
      operationId: operationId || id,
      parameters: {
        // TODO: Parse from path, i.e. /foo/bar/{id}/ -> ["id"]
        names: null,
        types: null
      },
      path,
      action,
      template: template || this.getTemplate(path, action),
      app: app !== undefined ? app : id.split(":")[0].split(".")[0],
      title: this.getTitle(title, id),
      navigation,
      pattern: new RegExp(pattern || `^${path}$`)
    });
    this.sort();
  }

  sort() {
    this.routes = this.routes.sort((route1, route2) => route1.path < route2.path ? 1 : -1);
  }

  on(eventName, handler) {
    var _this = this;

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
      return this.history.listen(function () {
        if (!_this.isMuted) {
          handler(...arguments);
        }
      });
    }

    logger.error("Unknown router event name:", eventName);
    return null;
  }

  routeWillUpdate() {
    /*
     * Notify listeners of routeWillUpdate event
     */
    if (this.onRouteWillUpdate && !this.isMuted) {
      this.onRouteWillUpdate(...arguments);
    }
  }

  updateState(state) {
    /*
     * Updates current history location's state without notifiying listeners
     */
    logger.debug("Router.updateState()", state);
    this.isMuted = true;
    const location = this.history.location;
    this.history.replace(_objectSpread({}, location, {
      state: _objectSpread({}, location.state, state)
    }));
    this.isMuted = false;
  }

  getBasePath(path) {
    // Extract base path: /foo/bar/baz/ -> /foo/bar/
    return path.substring(0, (0, _utils.nthIndexOf)(path, "/", 2, 1) + 1 || undefined);
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
      "bananas.me:list": _pages.MePage
    };
    let template = internalPages[id]; // Build route template relative url path

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
    return summary || id && (0, _utils.capitalize)(id.substring(id.indexOf(".") + 1, id.indexOf(":")).replace("_", " ")) || null;
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
    return _objectSpread({
      id: route.id,
      operationId: route.operationId,
      path: route.path,
      app: route.app,
      action: route.action,
      title: route.title,
      template: typeof route.template === "string" ? route.template : "Component"
    }, overrides);
  }

  resolve(path) {
    // Resolve path to matching route
    const location = this.history.location;
    const pathname = (0, _utils.absolutePath)(path, location.pathname);

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


      const params = route.parameters.names && route.parameters.names.length ? match.slice(1).map((value, index) => [route.parameters.names[index], value]).reduce((groups, _ref10) => {
        let _ref11 = _slicedToArray(_ref10, 2),
            name = _ref11[0],
            value = _ref11[1];

        return _objectSpread({}, groups, {
          [name]: route.parameters.types[name] === "integer" ? parseInt(value, 10) : value
        });
      }, {}) : null;
      const resolved = this.ResolvedRoute(route, {
        path: pathname,
        params
      });
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
      const path = params ? Object.entries(params).reduce((_path, _ref12) => {
        let _ref13 = _slicedToArray(_ref12, 2),
            param = _ref13[0],
            value = _ref13[1];

        return _path.replace(`{${param}}`, value);
      }, route.path) : route.path;
      return this.ResolvedRoute(route, {
        path,
        params: params || null
      });
    }

    return null;
  }

  reroute(to) {
    // Rewrite route to current window location
    logger.debug("Router.reroute()");
    const location = this.history.location;
    const pathname = location.pathname,
          search = location.search,
          hash = location.hash;
    return this.route(to || {
      path: pathname,
      query: search,
      hash
    }, {
      rewrite: true
    });
  }

  route(to) {
    let _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref14$rewrite = _ref14.rewrite,
        rewrite = _ref14$rewrite === void 0 ? false : _ref14$rewrite,
        _ref14$patch = _ref14.patch,
        patch = _ref14$patch === void 0 ? false : _ref14$patch;

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
    const next = typeof to === "string" ? {
      pathname: to,
      search: "",
      hash: ""
    } : {
      pathname: to.path || current.pathname,
      search: typeof to.query === "object" ? (0, _utils.toQuery)(to.query) : to.query || "",
      hash: (0, _utils.ensureLeadingHash)(to.hash) || ""
    }; // Resolve

    let route = undefined;

    if (to.id) {
      route = this.reverse(to.id, to.params);
    } else {
      route = this.resolve(next.pathname);
    }

    if (route) {
      next.pathname = route.path;
    }

    const referer = (this.history.location.state ? this.history.location.state.referer : null) || {};
    const pageChange = next.pathname !== current.pathname;
    const rewind = pageChange && next.pathname === referer.pathname; // Patch next location and keep parts from current or referer location

    if (patch && (!pageChange || rewind)) {
      const origin = next.pathname === referer.pathname ? referer : current;
      next.search = next.search ? next.search : origin.search;
      next.hash = next.hash ? next.hash : origin.hash;
    } // Extend resolved route with query/hash


    if (route) {
      route.query = next.search ? (0, _utils.fromQuery)(next.search) : null;
      route.hash = next.hash ? next.hash.substring(1) : null; // Strip leading #
    }

    const locationChange = pageChange || next.search !== current.search || next.hash !== current.hash;
    const replace = rewrite || !locationChange;
    const action = replace ? "REPLACE" : "PUSH";
    const navigate = replace ? this.history.replace : this.history.push; // Notify that route about to update

    this.routeWillUpdate(next, action); // Refresh current, event listeners may have modified state

    current = this.history.location; // Set next location's state

    next.state = _objectSpread({
      scroll: rewind ? referer.state.scroll : 0
    }, replace ? current.state : undefined, {
      route,
      referer: pageChange && !rewrite ? _objectSpread({}, current, {
        state: _objectSpread({}, current.state, {
          referer: undefined // Drop referer's referer to not endless nest

        })
      }) : referer
    }); // Change history

    logger.debug("Router.route():", next);
    navigate(next);
    return {
      location: next,
      action
    };
  }

}

exports.default = Router;