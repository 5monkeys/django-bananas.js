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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = _jsLogger.default.get("bananas");

class Router {
  constructor() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _defineProperty(this, "multipleParamsRegexp", new RegExp(/\{[^}]+\}/g));

    _defineProperty(this, "getAdjustedPathLength", route => route.path.replace(this.multipleParamsRegexp, "").split("/"));

    var basename = options.prefix || "";

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
      var [endpoint, methods] = _ref;
      return [...specs, ...Object.entries(methods).map((_ref2) => {
        var [method, spec] = _ref2;
        return [endpoint, method, spec];
      })];
    }, []).filter((_ref3) => {
      var [_, method, spec] = _ref3;
      return spec.operationId && ["get", "post"].includes(method);
    }).map((_ref4) => {
      var [endpoint, method, spec] = _ref4;
      var {
        __originalOperationId,
        operationId,
        parameters,
        summary,
        tags
      } = spec;
      var id = __originalOperationId;
      var action = this.getAction(id);
      var path = this.getPath(endpoint, method, action);
      var template = this.getTemplate(id, path, action);
      var app = this.getAppLabel(tags);
      var apiView = this.getAPIView(id);
      var title = this.getTitle(summary, id);
      var params = parameters.filter(param => param.required && param.in === "path");
      return {
        id,
        operationId,
        path,
        action,
        template,
        app,
        apiView,
        title,
        navigation: tags.includes("navigation"),
        parameters: {
          names: params.map(param => param.name) || null,
          types: params.reduce((types, p) => _objectSpread({}, types, {
            [p.name]: p.type
          }), {})
        },
        pattern: new RegExp(params.reduce((pattern, param) => pattern.replace("{".concat(param.name, "}"), param.type === "integer" ? "(\\d+)" // Named: `(?<${param.name}>\\d+)`
        : "([\\w\\d_-]+)" // Named: `(?<${param.name}>[\\w\\d_-]+)`
        ), "^".concat(path, "$")))
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
      title: route.title,
      name: route.action === "list" ? route.apiView : route.action,
      parent: route.action === "list" ? null : route.apiView
    }));
    logger.debug("Initialized Router:", this.routes);
  }

  add(_ref5) {
    var {
      id,
      operationId,
      path,
      title,
      template,
      pattern,
      app,
      navigation
    } = _ref5;
    var action = this.getAction(operationId);
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
      pattern: new RegExp(pattern || "^".concat(path, "$"))
    });
    this.sort();
  }

  sort() {
    this.routes = this.routes.sort((route1, route2) => {
      var path1 = this.getAdjustedPathLength(route1);
      var path2 = this.getAdjustedPathLength(route2); // If both paths has the same segment length, grade based on ... :

      return path1.length === path2.length // ... alphabetical order
      ? path1 < path2 ? 1 : -1 : path1.length < path2.length // ... segment length
      ? 1 : -1;
    });
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
    var {
      location
    } = this.history;
    this.history.replace(_objectSpread({}, location, {
      state: _objectSpread({}, location.state, {}, state)
    }));
    this.isMuted = false;
  }

  getBasePath(path) {
    // Extract base path: /foo/bar/baz/ -> /foo/bar/
    return path.substring(0, (0, _utils.nthIndexOf)(path, "/", 2, 1) + 1 || undefined);
  }

  getPath(endpoint, method, action) {
    return method === "get" ? endpoint : "".concat(endpoint).concat(action, "/");
  }

  getAction(originalOperationId) {
    // Extract action part: bananas.change_password:create -> create
    return originalOperationId ? originalOperationId.split(":")[1] : null;
  }

  getTemplate(id, path, action) {
    var internalPages = {
      "bananas.me:list": _pages.MePage
    };
    var template = internalPages[id]; // Build route template relative url path

    if (!template) {
      var basePath = this.getBasePath(path, true);
      var relativeBasePath = basePath.substring(1);
      template = "".concat(relativeBasePath).concat(action, ".js");
    }

    return template;
  }

  getAppLabel(tags) {
    var app = tags.filter(tag => tag.startsWith("app:"))[0];
    return app.split(":")[1];
  }

  getAPIView(id) {
    return id.substring(id.indexOf(".") + 1, id.indexOf(":"));
  }

  getTitle(summary, apiView) {
    return summary || apiView && (0, _utils.capitalize)(apiView.replace("_", " ")) || null;
  }

  getRoute(id) {
    return this.reverseRoutes[id];
  }

  getOperationTemplate(id) {
    var route = this.getRoute(id);
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
    var _this2 = this;

    // Resolve path to matching route
    var {
      location
    } = this.history;
    var pathname = (0, _utils.absolutePath)(path, location.pathname);

    var _loop = function _loop(route) {
      var match = route.pattern.exec(pathname);

      if (!match) {
        return "continue";
      }
      /*
      // Future RegExp groups
      const params =
        route.parameters.names && route.parameters.names.length
          ? route.pattern.exec(pathname).groups
          : null;
      */
      // Extract URL params


      var params = route.parameters.names && route.parameters.names.length ? match.slice(1).map((value, index) => [route.parameters.names[index], value]).reduce((groups, _ref6) => {
        var [name, value] = _ref6;
        return _objectSpread({}, groups, {
          [name]: route.parameters.types[name] === "integer" ? parseInt(value, 10) : value
        });
      }, {}) : null;

      var resolved = _this2.ResolvedRoute(route, {
        path: pathname,
        params
      });

      logger.debug("Router.resolve():", resolved);
      return {
        v: resolved
      };
    };

    for (var route of this.routes) {
      var _ret = _loop(route);

      switch (_ret) {
        case "continue":
          continue;

        default:
          if (typeof _ret === "object") return _ret.v;
      }
    }

    return null;
  }

  reverse(id, params) {
    // Reverse resolve route by operationId
    var route = this.getRoute(id);

    if (route) {
      // Render parameterized path
      var path = params ? Object.entries(params).reduce((_path, _ref7) => {
        var [param, value] = _ref7;
        return _path.replace("{".concat(param, "}"), value);
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
    var {
      location
    } = this.history;
    var {
      pathname,
      search,
      hash
    } = location;
    return this.route(to || {
      path: pathname,
      query: search,
      hash
    }, {
      rewrite: true
    });
  }

  route(to) {
    var {
      rewrite = false,
      patch = false
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
    var current = this.history.location;
    var next = typeof to === "string" ? {
      pathname: to,
      search: "",
      hash: ""
    } : {
      pathname: to.path || current.pathname,
      search: typeof to.query === "object" ? (0, _utils.toQuery)(to.query) : to.query || "",
      hash: (0, _utils.ensureLeadingHash)(to.hash) || ""
    }; // Resolve

    var route = undefined;

    if (to.id) {
      route = this.reverse(to.id, to.params);
    } else {
      route = this.resolve(next.pathname);
    }

    if (route) {
      next.pathname = route.path;
    }

    var referer = (this.history.location.state ? this.history.location.state.referer : null) || {};
    var pageChange = next.pathname !== current.pathname;
    var rewind = pageChange && next.pathname === referer.pathname; // Patch next location and keep parts from current or referer location

    if (patch && (!pageChange || rewind)) {
      var origin = next.pathname === referer.pathname ? referer : current;
      next.search = next.search ? next.search : origin.search;
      next.hash = next.hash ? next.hash : origin.hash;
    } // Extend resolved route with query/hash


    if (route) {
      route.query = next.search ? (0, _utils.fromQuery)(next.search) : null;
      route.hash = next.hash ? next.hash.substring(1) : null; // Strip leading #
    }

    var locationChange = pageChange || next.search !== current.search || next.hash !== current.hash;
    var replace = rewrite || !locationChange;
    var action = replace ? "REPLACE" : "PUSH";
    var navigate = replace ? this.history.replace : this.history.push; // Notify that route about to update

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