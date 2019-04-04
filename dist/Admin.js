"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CssBaseline = _interopRequireDefault(require("@material-ui/core/CssBaseline"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _jsLogger = _interopRequireDefault(require("js-logger"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Alert = require("./Alert");

var _LoadingScreen = _interopRequireDefault(require("./LoadingScreen"));

var _Messages = require("./Messages");

var _NavBar = _interopRequireDefault(require("./NavBar"));

var _Page = require("./Page");

var _api = _interopRequireDefault(require("./api"));

var _context8 = _interopRequireDefault(require("./context"));

var _errors = require("./errors");

var _pages = require("./pages");

var _router = _interopRequireDefault(require("./router"));

var _settings = _interopRequireDefault(require("./settings"));

var _themes = _interopRequireWildcard(require("./themes"));

var _utils = require("./utils");

var _ = require(".");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_jsLogger.default.useDefaults();

var logger = _jsLogger.default.get("bananas");

var styles = function styles(theme) {
  return {
    root: {
      display: "flex",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.primary.dark
    },
    horizontalRoot: {
      width: "100%",
      flexDirection: "row"
    },
    verticalRoot: {
      flexDirection: "column"
    },
    admin: {
      backgroundColor: theme.palette.background.default
    }
  };
};

var Admin =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin(props) {
    var _this;

    _classCallCheck(this, Admin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Admin).call(this, props)); // Default GUI settings from props

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "Page", null);

    var propSettings = {
      editable: props.editableSettings,
      horizontal: props.layout === "horizontal",
      icons: props.icons !== null,
      collapsable: !(props.permanent || false),
      collapsed: props.collapsed || false,
      dense: props.dense || false
    }; // Initialize GUI settings

    _this.settings = new _settings.default(propSettings, _this.settingsDidUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)))); // Initialize component controllers proxy references

    _this.controllers = new _utils.ComponentProxy();

    _this.controllers.add(_Page.PageLoadController, "PageLoadController");

    _this.controllers.add(_Alert.AlertController, "AlertController");

    _this.controllers.add(_Messages.MessagesController, "MessagesController");

    _this.admin = _this.controllers.proxy; // Shortcut

    _this.state = {
      context: _this.makeContext(),
      settings: _this.settings.settings,
      pageProps: undefined,
      booting: true,
      booted: false
    };
    logger.setLevel(_this.getLogLevel("bananas", "WARN"));
    window.bananas = _assertThisInitialized(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Admin, [{
    key: "getLogLevel",
    value: function getLogLevel(namespace, logLevel) {
      var level = (typeof this.props.logLevel === "string" ? this.props.logLevel : this.props.logLevel[namespace]) || logLevel || "WARN";
      return _jsLogger.default[level];
    }
  }, {
    key: "getLogger",
    value: function getLogger(namespace) {
      var log = _jsLogger.default.get(namespace);

      var level = this.getLogLevel(namespace);
      log.setLevel(level);
      return log;
    }
  }, {
    key: "makeContext",
    value: function makeContext(context) {
      var _this2 = this;

      var locals = ["setTitle", "login", "logout"].reduce(function (result, shortcut) {
        return _objectSpread({}, result, _defineProperty({}, shortcut, _this2[shortcut].bind(_this2)));
      }, {
        settings: this.settings
      });
      return _objectSpread({
        admin: _objectSpread({}, this.admin, locals),
        router: undefined,
        api: undefined,
        user: undefined
      }, context);
    }
  }, {
    key: "setContext",
    value: function setContext(ctx, callback) {
      var context = _objectSpread({}, this.state.context, ctx);

      this.setState({
        context: context
      }, function () {
        logger.debug("Updated AdminContext:", context);

        if (callback) {
          callback(context);
        }
      });
    }
  }, {
    key: "resetContext",
    value: function resetContext(callback) {
      this.setContext(this.makeContext(), callback);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.boot();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Unlisten to router/history events
      if (this.unlistenRouter) {
        this.unlistenRouter();
      } // Undefine instances


      this.router = undefined;
      this.swagger = undefined;
      this.api = undefined; // Unbind app refernece on window

      window.bananas = undefined;
    }
  }, {
    key: "boot",
    value: function () {
      var _boot = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var apiBase, apiUrl, swagger, cause, i18n;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                logger.info("Booting...");
                this.setTitle(); // Initialize API client

                apiBase = this.props.api;
                apiUrl = "".concat(apiBase, "/v1.0/schema.json");
                swagger = undefined;
                _context.prev = 5;
                _context.next = 8;
                return new _api.default({
                  url: apiUrl,
                  errorHandler: this.onAPIClientError.bind(this),
                  progressHandler: this.onAPIClientProgress.bind(this)
                });

              case 8:
                swagger = _context.sent;
                _context.next = 18;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](5);
                logger.error("Critical Error: Failed to initialize API client!", _context.t0);
                cause = _context.t0.response ? _context.t0.response.statusText : "Unreachable";
                this.admin.error("Failed to boot: API ".concat(cause));
                this.setState({
                  booting: false
                });
                return _context.abrupt("return");

              case 18:
                logger.info("Initialized ".concat(swagger.isAuthenticated ? "Authenticated" : "Un-authenticated", " Swagger Client:"), swagger);
                this.swagger = swagger;
                this.api = swagger.operations; // Load translations

                _context.next = 23;
                return this.api["bananas.i18n:list"]();

              case 23:
                i18n = _context.sent;
                window.i18n = i18n.obj.catalog; // Initialize Router

                if (!this.router) {
                  this.router = new _router.default({
                    prefix: this.props.prefix
                  });
                  this.unlistenRouter = this.router.on("routeDidUpdate", this.routeDidUpdate.bind(this));
                }

                this.router.initialize(swagger); // Update AdminContext

                this.setContext({
                  api: this.api,
                  router: this.router
                }); // Route to current window location if API is authenticatd

                if (!swagger.isAuthenticated) {
                  _context.next = 33;
                  break;
                }

                if (this.state.context.user) {
                  _context.next = 32;
                  break;
                }

                _context.next = 32;
                return this.authorize();

              case 32:
                this.router.reroute();

              case 33:
                // Finalize boot
                this.setState({
                  booting: false,
                  booted: true
                }, function () {
                  logger.info("Booted!");
                });

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 11]]);
      }));

      function boot() {
        return _boot.apply(this, arguments);
      }

      return boot;
    }()
  }, {
    key: "reboot",
    value: function () {
      var _reboot = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(user) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.shutdown();

              case 2:
                if (user) {
                  this.setContext({
                    user: user
                  });
                }

                this.boot();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reboot(_x) {
        return _reboot.apply(this, arguments);
      }

      return reboot;
    }()
  }, {
    key: "shutdown",
    value: function shutdown() {
      var _this3 = this;

      return new Promise(
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(resolve) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this3.unmountPage();

                case 2:
                  _this3.swagger = undefined;
                  _this3.api = undefined;

                  _this3.setState({
                    booted: false
                  }, function () {
                    _this3.resetContext(resolve);
                  });

                case 5:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function (_x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "authorize",
    value: function authorize() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var anonymous = new _errors.AnonymousUserError();
        var endpoint = _this4.api["bananas.me:list"];

        if (!endpoint) {
          reject(anonymous);
          return;
        }

        logger.debug("Authorizing...");
        endpoint().then(function (response) {
          var user = _objectSpread({}, response.obj);

          var current = _this4.state.context.user;

          if (JSON.stringify(user) !== JSON.stringify(current)) {
            logger.info("Authorized User:", user);

            _this4.setContext({
              user: user
            });
          }

          resolve(user);
        }, function (error) {
          if (error.message === "Forbidden") {
            reject(anonymous);
          } else {
            reject(error);
          }
        });
      });
    }
  }, {
    key: "onAPIClientError",
    value: function onAPIClientError(error) {
      this.admin.progress(false);
      this.admin.error(error);
    }
  }, {
    key: "onAPIClientProgress",
    value: function onAPIClientProgress(_ref2) {
      var done = _ref2.done;
      this.admin.progress(!done);
    }
  }, {
    key: "settingsDidUpdate",
    value: function settingsDidUpdate(settings) {
      this.setState({
        settings: settings
      });
    }
  }, {
    key: "routeDidUpdate",
    value: function () {
      var _routeDidUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(location, action) {
        var route, currentPage, _ref3, PageComponent, pageProps;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                logger.info("App.routeDidUpdate()", action, location); // Get route from location state

                route = location.state ? location.state.route : null;

                if (!(action === "POP" && !route)) {
                  _context4.next = 5;
                  break;
                }

                this.router.reroute();
                return _context4.abrupt("return");

              case 5:
                // Un-mount current page, if location changed
                currentPage = this.state.pageProps;

                if (!(currentPage && (!currentPage.route || currentPage.route.path !== location.pathname))) {
                  _context4.next = 10;
                  break;
                }

                _context4.next = 9;
                return this.unmountPage();

              case 9:
                this.admin.loading();

              case 10:
                _context4.prev = 10;
                _context4.next = 13;
                return this.loadPage(location, route);

              case 13:
                _ref3 = _context4.sent;
                PageComponent = _ref3.PageComponent;
                pageProps = _ref3.pageProps;
                this.mountPage(PageComponent, pageProps);
                _context4.next = 43;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](10);
                this.admin.loading(false);

                if (!(_context4.t0 instanceof _errors.PageError)) {
                  _context4.next = 26;
                  break;
                }

                this.mountErrorPage((0, _.t)(_context4.t0.message), _context4.t0.code);
                _context4.next = 43;
                break;

              case 26:
                if (!(_context4.t0.response && [401, 403].includes(_context4.t0.response.status))) {
                  _context4.next = 42;
                  break;
                }

                _context4.prev = 27;
                _context4.next = 30;
                return this.authorize();

              case 30:
                this.mountErrorPage((0, _.t)("Permission denied."), _context4.t0.response.status);
                _context4.next = 40;
                break;

              case 33:
                _context4.prev = 33;
                _context4.t1 = _context4["catch"](27);

                if (!(_context4.t1 instanceof _errors.AnonymousUserError)) {
                  _context4.next = 39;
                  break;
                }

                this.reboot();
                _context4.next = 40;
                break;

              case 39:
                throw _context4.t0;

              case 40:
                _context4.next = 43;
                break;

              case 42:
                throw _context4.t0;

              case 43:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[10, 19], [27, 33]]);
      }));

      function routeDidUpdate(_x3, _x4) {
        return _routeDidUpdate.apply(this, arguments);
      }

      return routeDidUpdate;
    }()
  }, {
    key: "loadPage",
    value: function () {
      var _loadPage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(location, route) {
        var id, operationId, params, app, path, query, hash, template, referer, PageComponent, pageProps, reuseData;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (route) {
                  _context5.next = 2;
                  break;
                }

                throw new _errors.PageNotFoundError();

              case 2:
                id = route.id, operationId = route.operationId, params = route.params, app = route.app, path = route.path, query = route.query, hash = route.hash, template = route.template;
                referer = this.state.pageProps ? this.state.pageProps.route || null : null;
                PageComponent = this.PageComponent; // Load or re-use page component

                if (!(this.PageComponent && referer && referer.id === id)) {
                  _context5.next = 9;
                  break;
                }

                logger.debug("Re-using page component...");
                _context5.next = 17;
                break;

              case 9:
                logger.debug("Loading page component...", path, route, referer);

                if (!(template === "Component")) {
                  _context5.next = 14;
                  break;
                }

                // Route has predefined page component, and no data needed
                PageComponent = this.router.getOperationTemplate(operationId);
                _context5.next = 17;
                break;

              case 14:
                _context5.next = 16;
                return this.loadPageComponent(template);

              case 16:
                PageComponent = _context5.sent;

              case 17:
                // Initialize page component props
                pageProps = {
                  key: "".concat(id, ":").concat(location.search),
                  route: {
                    id: id,
                    params: params,
                    path: path,
                    query: query,
                    hash: hash,
                    location: location
                  },
                  title: route.title,
                  data: undefined,
                  logger: this.getLogger(app),
                  referer: referer
                };
                reuseData = referer && location.hash && referer.location.pathname === location.pathname && referer.location.search === location.search; // Load page data, but only if path or query changed

                if (!reuseData) {
                  _context5.next = 24;
                  break;
                }

                logger.debug("Re-using page data...");
                pageProps.data = this.state.pageProps.data;
                _context5.next = 28;
                break;

              case 24:
                if (!(route.action || "").match(/\.?(list|read)$/)) {
                  _context5.next = 28;
                  break;
                }

                _context5.next = 27;
                return this.loadPageData(id, params, query);

              case 27:
                pageProps.data = _context5.sent;

              case 28:
                return _context5.abrupt("return", {
                  PageComponent: PageComponent,
                  pageProps: pageProps
                });

              case 29:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadPage(_x5, _x6) {
        return _loadPage.apply(this, arguments);
      }

      return loadPage;
    }()
  }, {
    key: "loadPageComponent",
    value: function () {
      var _loadPageComponent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(template) {
        var pages, exports;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                pages = this.props.pages;
                _context6.next = 3;
                return pages(template).catch(function () {
                  throw new _errors.PageNotImplementedError();
                });

              case 3:
                exports = _context6.sent;
                return _context6.abrupt("return", exports.default);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function loadPageComponent(_x7) {
        return _loadPageComponent.apply(this, arguments);
      }

      return loadPageComponent;
    }()
  }, {
    key: "loadPageData",
    value: function () {
      var _loadPageData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(operationId, params, filter) {
        var data;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this.api[operationId]) {
                  _context7.next = 15;
                  break;
                }

                logger.debug("Loading page data...", operationId, params, filter);
                _context7.prev = 2;
                this.admin.loading();
                _context7.next = 6;
                return this.api[operationId](_objectSpread({}, params, filter));

              case 6:
                data = _context7.sent;
                this.admin.loading(false);
                return _context7.abrupt("return", data);

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](2);
                this.admin.loading(false);
                throw _context7.t0;

              case 15:
                logger.debug("Omitting page data...operationId is undefined, no data endpoint found");
                return _context7.abrupt("return", null);

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[2, 11]]);
      }));

      function loadPageData(_x8, _x9, _x10) {
        return _loadPageData.apply(this, arguments);
      }

      return loadPageData;
    }()
  }, {
    key: "mountPage",
    value: function mountPage(PageComponent, pageProps) {
      var _this5 = this;

      logger.info("Mount Page:", pageProps);
      this.admin.loading(false);
      this.PageComponent = PageComponent;
      this.setState({
        pageProps: pageProps
      }, function () {
        _this5.setTitle(pageProps.title);
      });
    }
  }, {
    key: "mountErrorPage",
    value: function mountErrorPage(title, statusCode) {
      var _title = title || (0, _.t)("Server error");

      var _statusCode = statusCode || 500;

      logger.warn(_title, _statusCode);
      this.mountPage(_pages.ErrorPage, {
        key: _statusCode,
        title: _title,
        data: {
          statusCode: _statusCode
        }
      });
    }
  }, {
    key: "unmountPage",
    value: function unmountPage() {
      var _this6 = this;

      return new Promise(function (resolve) {
        if (_this6.state.pageProps) {
          logger.info("Un-mounting page...", _this6.state.pageProps);
          _this6.PageComponent = null;

          _this6.admin.dismissMessages();

          _this6.setState({
            pageProps: null
          }, resolve);
        } else {
          resolve();
        }
      });
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      if (title) {
        document.title = "".concat(title, " | ").concat(this.props.title);
      } else {
        document.title = this.props.title;
      }
    }
  }, {
    key: "login",
    value: function login(username, password) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7.api["bananas.login:create"]({
          data: {
            username: username,
            password: password
          }
        }).then(function (response) {
          logger.info("Successfull login...reboot");
          var user = response.obj;
          resolve(user);

          _this7.admin.dismissMessages();

          _this7.reboot(user);

          _this7.admin.success("".concat((0, _.t)("Welcome,"), " ").concat(user.full_name));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      var _this8 = this;

      this.api["bananas.logout:create"]().then(function () {
        _this8.reboot();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var PageComponent = this.PageComponent;
      var _this$props = this.props,
          classes = _this$props.classes,
          pageTheme = _this$props.pageTheme,
          loginForm = _this$props.loginForm;
      var _this$state = this.state,
          booting = _this$state.booting,
          booted = _this$state.booted,
          context = _this$state.context,
          settings = _this$state.settings,
          pageProps = _this$state.pageProps;
      var user = context.user;
      var isHorizontalLayout = settings.horizontal;
      var isVerticalLayout = !settings.horizontal;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: (0, _classnames.default)(classes.root, (_classNames = {}, _defineProperty(_classNames, classes.admin, booted && user), _defineProperty(_classNames, classes.horizontalRoot, isHorizontalLayout), _defineProperty(_classNames, classes.verticalRoot, isVerticalLayout), _classNames))
      }, booted ? _react.default.createElement(_context8.default.Provider, {
        value: context
      }, user ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_NavBar.default, {
        variant: settings.horizontal ? "drawer" : "appbar",
        dense: settings.dense,
        permanent: !settings.collapsable,
        collapsed: settings.collapsed,
        icons: settings.icons ? this.props.icons : null,
        logo: this.props.logo,
        title: this.props.title,
        branding: this.props.branding,
        version: this.props.version
      }), _react.default.createElement(_Page.Page, _extends({
        theme: pageTheme,
        component: PageComponent,
        controller: this.controllers.PageLoadController
      }, pageProps))) : _react.default.createElement(_pages.LoginPage, {
        form: loginForm,
        logger: logger,
        logo: this.props.logo,
        title: this.props.title
      })) : _react.default.createElement(_LoadingScreen.default, {
        role: "bootscreen",
        logo: this.props.logo,
        loading: booting
      })), _react.default.createElement(_Messages.MessagesController, {
        ref: this.controllers.MessagesController
      }), _react.default.createElement(_Alert.AlertController, {
        ref: this.controllers.AlertController
      }));
    }
  }]);

  return Admin;
}(_react.default.Component);

var BananasAdmin = (0, _styles.withStyles)(styles, {
  name: "BananasAdmin"
})(Admin);

var App =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var theme = (0, _themes.createBananasTheme)(props.theme);
      var pageTheme = props.pageTheme ? (0, _themes.createBananasTheme)(props.pageTheme) : undefined;
      logger.debug("Main Theme:", theme);
      logger.debug("Page Theme:", pageTheme);
      return _react.default.createElement(_styles.MuiThemeProvider, {
        theme: theme
      }, _react.default.createElement(_CssBaseline.default, null), _react.default.createElement(BananasAdmin, _objectSpread({}, props, {
        theme: theme,
        pageTheme: pageTheme
      })));
    }
  }]);

  return App;
}(_react.default.Component);

_defineProperty(App, "propTypes", {
  api: _propTypes.default.string.isRequired,
  pages: _propTypes.default.func.isRequired,
  prefix: _propTypes.default.string,
  logLevel: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  layout: _propTypes.default.string,
  permanent: _propTypes.default.bool,
  collapsed: _propTypes.default.bool,
  dense: _propTypes.default.bool,
  title: _propTypes.default.string,
  branding: _propTypes.default.string,
  version: _propTypes.default.string,
  logo: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.node]),
  icons: _propTypes.default.object,
  theme: _propTypes.default.object,
  pageTheme: _propTypes.default.object,
  loginForm: _propTypes.default.func,
  editableSettings: _propTypes.default.bool
});

_defineProperty(App, "defaultProps", {
  prefix: "",
  logLevel: "WARN",
  layout: "horizontal",
  // horizontal|vertical
  dense: false,
  permanent: false,
  collapsed: false,
  title: "Bananas",
  branding: "Bananas",
  version: "v1.3.0",
  // TODO: Get package version
  logo: true,
  icons: undefined,
  theme: _themes.default.default,
  pageTheme: undefined,
  loginForm: undefined,
  editableSettings: false
});

var _default = App;
exports.default = _default;