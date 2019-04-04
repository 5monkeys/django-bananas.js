"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createBrowserHistory = _interopRequireDefault(require("history/createBrowserHistory"));

var _jsLogger = _interopRequireDefault(require("js-logger"));

var _pages = require("./pages");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var logger = _jsLogger.default.get("bananas");

var Router =
/*#__PURE__*/
function () {
  function Router() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Router);

    var basename = options.prefix || "";

    if (basename.endsWith("/")) {
      basename = basename.substring(0, basename.length - 1);
    }

    this.history = options.history ? typeof options.history === "function" ? options.history({
      basename: basename
    }) : options.history : (0, _createBrowserHistory.default)({
      basename: basename
    }); // Disable muting of route notification events

    this.isMuted = false; // Listen on leaving admin or full page reload event

    window.addEventListener("beforeunload", this.routeWillUpdate.bind(this));
  }

  _createClass(Router, [{
    key: "initialize",
    value: function initialize(swagger) {
      var _this = this;

      this.swagger = swagger; // Add API prospect routes

      this.routes = Object.entries(swagger.spec.paths).reduce(function (specs, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            endpoint = _ref2[0],
            methods = _ref2[1];

        return [].concat(_toConsumableArray(specs), _toConsumableArray(Object.entries(methods).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              method = _ref4[0],
              spec = _ref4[1];

          return [endpoint, method, spec];
        })));
      }, []).filter(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 3),
            _ = _ref6[0],
            method = _ref6[1],
            spec = _ref6[2];

        return spec.operationId && ["get", "post"].includes(method);
      }).map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 3),
            endpoint = _ref8[0],
            method = _ref8[1],
            spec = _ref8[2];

        var __originalOperationId = spec.__originalOperationId,
            operationId = spec.operationId,
            parameters = spec.parameters,
            summary = spec.summary,
            tags = spec.tags;
        var id = __originalOperationId;

        var action = _this.getAction(id);

        var path = _this.getPath(endpoint, method, action);

        var template = _this.getTemplate(id, path, action);

        var app = _this.getAppLabel(tags);

        var title = _this.getTitle(summary, id);

        var params = parameters.filter(function (param) {
          return param.required && param.in === "path";
        });
        return {
          id: id,
          operationId: operationId,
          path: path,
          action: action,
          template: template,
          app: app,
          title: title,
          navigation: tags.includes("navigation"),
          parameters: {
            names: params.map(function (param) {
              return param.name;
            }) || null,
            types: params.reduce(function (types, p) {
              return _objectSpread({}, types, _defineProperty({}, p.name, p.type));
            }, {})
          },
          pattern: new RegExp(params.reduce(function (pattern, param) {
            return pattern.replace("{".concat(param.name, "}"), param.type === "integer" ? "(\\d+)" // Named: `(?<${param.name}>\\d+)`
            : "([\\w\\d_-]+)" // Named: `(?<${param.name}>[\\w\\d_-]+)`
            );
          }, "^".concat(path, "$")))
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


      this.reverseRoutes = this.routes.reduce(function (operations, route) {
        operations[route.id] = route;
        operations[route.operationId] = route;
        return operations;
      }, {}); // Build navigation routes

      this.navigationRoutes = this.routes.filter(function (route) {
        return route.navigation;
      }).sort(function (route1, route2) {
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
      }).map(function (route) {
        return {
          id: route.id,
          path: route.path,
          app: route.app || "",
          title: route.title
        };
      });
      logger.debug("Initialized Router:", this.routes);
    }
  }, {
    key: "add",
    value: function add(_ref9) {
      var id = _ref9.id,
          operationId = _ref9.operationId,
          path = _ref9.path,
          title = _ref9.title,
          template = _ref9.template,
          pattern = _ref9.pattern,
          app = _ref9.app,
          navigation = _ref9.navigation;
      var action = this.getAction(operationId);
      this.routes.push({
        id: id,
        operationId: operationId || id,
        parameters: {
          // TODO: Parse from path, i.e. /foo/bar/{id}/ -> ["id"]
          names: null,
          types: null
        },
        path: path,
        action: action,
        template: template || this.getTemplate(path, action),
        app: app !== undefined ? app : id.split(":")[0].split(".")[0],
        title: this.getTitle(title, id),
        navigation: navigation,
        pattern: new RegExp(pattern || "^".concat(path, "$"))
      });
      this.sort();
    }
  }, {
    key: "sort",
    value: function sort() {
      this.routes = this.routes.sort(function (route1, route2) {
        return route1.path < route2.path ? 1 : -1;
      });
    }
  }, {
    key: "on",
    value: function on(eventName, handler) {
      var _this2 = this;

      if (typeof handler !== "function") {
        logger.error("Invalid handler when subcribing on event:", handler);
        return null;
      }

      if (eventName === "routeWillUpdate") {
        this.onRouteWillUpdate = handler;
        return function () {
          // Unlisten
          _this2.onRouteWillUpdate = undefined;
        };
      } else if (eventName === "routeDidUpdate") {
        return this.history.listen(function () {
          if (!_this2.isMuted) {
            handler.apply(void 0, arguments);
          }
        });
      }

      logger.error("Unknown router event name:", eventName);
      return null;
    }
  }, {
    key: "routeWillUpdate",
    value: function routeWillUpdate() {
      /*
       * Notify listeners of routeWillUpdate event
       */
      if (this.onRouteWillUpdate && !this.isMuted) {
        this.onRouteWillUpdate.apply(this, arguments);
      }
    }
  }, {
    key: "updateState",
    value: function updateState(state) {
      /*
       * Updates current history location's state without notifiying listeners
       */
      logger.debug("Router.updateState()", state);
      this.isMuted = true;
      var location = this.history.location;
      this.history.replace(_objectSpread({}, location, {
        state: _objectSpread({}, location.state, state)
      }));
      this.isMuted = false;
    }
  }, {
    key: "getBasePath",
    value: function getBasePath(path) {
      // Extract base path: /foo/bar/baz/ -> /foo/bar/
      return path.substring(0, (0, _utils.nthIndexOf)(path, "/", 2, 1) + 1 || undefined);
    }
  }, {
    key: "getPath",
    value: function getPath(endpoint, method, action) {
      return method === "get" ? endpoint : "".concat(endpoint).concat(action, "/");
    }
  }, {
    key: "getAction",
    value: function getAction(originalOperationId) {
      // Extract action part: bananas.change_password:create -> create
      return originalOperationId ? originalOperationId.split(":")[1] : null;
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(id, path, action) {
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
  }, {
    key: "getAppLabel",
    value: function getAppLabel(tags) {
      var app = tags.filter(function (tag) {
        return tag.startsWith("app:");
      })[0];
      return app.split(":")[1];
    }
  }, {
    key: "getTitle",
    value: function getTitle(summary, id) {
      return summary || id && (0, _utils.capitalize)(id.substring(id.indexOf(".") + 1, id.indexOf(":")).replace("_", " ")) || null;
    }
  }, {
    key: "getRoute",
    value: function getRoute(id) {
      return this.reverseRoutes[id];
    }
  }, {
    key: "getOperationTemplate",
    value: function getOperationTemplate(id) {
      var route = this.getRoute(id);
      return route ? route.template : undefined;
    }
  }, {
    key: "ResolvedRoute",
    value: function ResolvedRoute(route, overrides) {
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
  }, {
    key: "resolve",
    value: function resolve(path) {
      var _this3 = this;

      // Resolve path to matching route
      var location = this.history.location;
      var pathname = (0, _utils.absolutePath)(path, location.pathname);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var route = _step.value;
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


          var params = route.parameters.names && route.parameters.names.length ? match.slice(1).map(function (value, index) {
            return [route.parameters.names[index], value];
          }).reduce(function (groups, _ref10) {
            var _ref11 = _slicedToArray(_ref10, 2),
                name = _ref11[0],
                value = _ref11[1];

            return _objectSpread({}, groups, _defineProperty({}, name, route.parameters.types[name] === "integer" ? parseInt(value, 10) : value));
          }, {}) : null;

          var resolved = _this3.ResolvedRoute(route, {
            path: pathname,
            params: params
          });

          logger.debug("Router.resolve():", resolved);
          return {
            v: resolved
          };
        };

        for (var _iterator = this.routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          switch (_ret) {
            case "continue":
              continue;

            default:
              if (_typeof(_ret) === "object") return _ret.v;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: "reverse",
    value: function reverse(id, params) {
      // Reverse resolve route by operationId
      var route = this.getRoute(id);

      if (route) {
        // Render parameterized path
        var path = params ? Object.entries(params).reduce(function (_path, _ref12) {
          var _ref13 = _slicedToArray(_ref12, 2),
              param = _ref13[0],
              value = _ref13[1];

          return _path.replace("{".concat(param, "}"), value);
        }, route.path) : route.path;
        return this.ResolvedRoute(route, {
          path: path,
          params: params || null
        });
      }

      return null;
    }
  }, {
    key: "reroute",
    value: function reroute(to) {
      // Rewrite route to current window location
      logger.debug("Router.reroute()");
      var location = this.history.location;
      var pathname = location.pathname,
          search = location.search,
          hash = location.hash;
      return this.route(to || {
        path: pathname,
        query: search,
        hash: hash
      }, {
        rewrite: true
      });
    }
  }, {
    key: "route",
    value: function route(to) {
      var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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
      var current = this.history.location;
      var next = typeof to === "string" ? {
        pathname: to,
        search: "",
        hash: ""
      } : {
        pathname: to.path || current.pathname,
        search: _typeof(to.query) === "object" ? (0, _utils.toQuery)(to.query) : to.query || "",
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
        route: route,
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
        action: action
      };
    }
  }]);

  return Router;
}();

exports.default = Router;