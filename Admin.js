"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CssBaseline = _interopRequireDefault(require("@material-ui/core/CssBaseline"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _deprecatedPropType = _interopRequireDefault(require("deprecated-prop-type"));

var _jsLogger = _interopRequireDefault(require("js-logger"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Alert = require("./Alert");

var _api = _interopRequireDefault(require("./api"));

var _context = _interopRequireDefault(require("./context"));

var _errors = require("./errors");

var _LoadingScreen = _interopRequireDefault(require("./LoadingScreen"));

var _Messages = require("./Messages");

var _NavBar = _interopRequireDefault(require("./NavBar"));

var _Page = require("./Page");

var _pages = require("./pages");

var _router = _interopRequireDefault(require("./router"));

var _settings = _interopRequireDefault(require("./settings"));

var _themes = _interopRequireWildcard(require("./themes"));

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_jsLogger.default.useDefaults();

var logger = _jsLogger.default.get("bananas");

var styles = theme => {
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

class Admin extends _react.default.Component {
  constructor(props) {
    super(props); // Default GUI settings from props

    _defineProperty(this, "Page", null);

    var propSettings = {
      editable: props.editableSettings,
      horizontal: props.layout === "horizontal",
      icons: Boolean(props.nav) && !Array.isArray(props.nav),
      collapsable: !(props.permanent || false),
      collapsed: props.collapsed || false,
      dense: props.dense || false
    }; // Initialize GUI settings

    this.settings = new _settings.default(propSettings, this.settingsDidUpdate.bind(this)); // Initialize component controllers proxy references

    this.controllers = new _utils.ComponentProxy();
    this.controllers.add(_Page.PageLoadController, "PageLoadController");
    this.controllers.add(_Alert.AlertController, "AlertController");
    this.controllers.add(_Messages.MessagesController, "MessagesController");
    this.admin = this.controllers.proxy; // Shortcut

    this.state = {
      context: this.makeContext(),
      settings: this.settings.settings,
      pageProps: undefined,
      booting: true,
      booted: false
    };
    logger.setLevel(this.getLogLevel("bananas", "WARN"));
    window.bananas = this;
  }

  getLogLevel(namespace, logLevel) {
    var level = (typeof this.props.logLevel === "string" ? this.props.logLevel : this.props.logLevel[namespace]) || logLevel || "WARN";
    return _jsLogger.default[level];
  }

  getLogger(namespace) {
    var log = _jsLogger.default.get(namespace);

    var level = this.getLogLevel(namespace);
    log.setLevel(level);
    return log;
  }

  makeContext(context) {
    var locals = ["setTitle", "login", "logout"].reduce((result, shortcut) => _objectSpread({}, result, {
      [shortcut]: this[shortcut].bind(this)
    }), {
      settings: this.settings
    });
    return _objectSpread({
      admin: _objectSpread({}, this.admin, {}, locals),
      router: undefined,
      api: undefined,
      user: undefined
    }, context);
  }

  setContext(ctx, callback) {
    var context = _objectSpread({}, this.state.context, {}, ctx);

    this.setState({
      context
    }, () => {
      logger.debug("Updated AdminContext:", context);

      if (callback) {
        callback(context);
      }
    });
  }

  resetContext(callback) {
    this.setContext(this.makeContext(), callback);
  }

  componentDidMount() {
    this.boot();
  }

  componentWillUnmount() {
    // Unlisten to router/history events
    if (this.unlistenRouter) {
      this.unlistenRouter();
    } // Undefine instances


    this.router = undefined;
    this.swagger = undefined;
    this.api = undefined; // Unbind app refernece on window

    window.bananas = undefined;
  }

  boot() {
    var _this = this;

    return _asyncToGenerator(function* () {
      logger.info("Booting...");

      _this.setTitle(); // Initialize API client


      var apiProp = typeof _this.props.api === "string" ? {
        url: _this.props.api
      } : _this.props.api;

      var {
        url: apiBase
      } = apiProp,
          rest = _objectWithoutProperties(apiProp, ["url"]);

      var apiUrl = "".concat(apiBase, "/v1.0/schema.json");
      var swagger = undefined;

      try {
        swagger = yield new _api.default(_objectSpread({
          url: apiUrl,
          errorHandler: _this.onAPIClientError.bind(_this),
          progressHandler: _this.onAPIClientProgress.bind(_this)
        }, rest));
      } catch (error) {
        logger.error("Critical Error: Failed to initialize API client!", error);
        var cause = error.response ? error.response.statusText : "Unreachable";

        _this.admin.error("Failed to boot: API ".concat(cause));

        _this.setState({
          booting: false
        });

        return;
      }

      logger.info("Initialized ".concat(swagger.isAuthenticated ? "Authenticated" : "Un-authenticated", " Swagger Client:"), swagger);
      _this.swagger = swagger;
      _this.api = swagger.operations; // Load translations

      var i18n = yield _this.api["bananas.i18n:list"]();
      window.i18n = i18n.obj.catalog; // Initialize Router

      if (!_this.router) {
        _this.router = new _router.default({
          prefix: _this.props.prefix
        });
        _this.unlistenRouter = _this.router.on("routeDidUpdate", _this.routeDidUpdate.bind(_this));
      }

      _this.router.initialize(swagger); // Update AdminContext


      _this.setContext({
        api: _this.api,
        router: _this.router
      }); // Route to current window location if API is authenticatd


      if (swagger.isAuthenticated) {
        if (!_this.state.context.user) {
          yield _this.authorize();
        }

        _this.router.reroute();
      } // Allow adding extra things to the AdminContext.


      if (_this.props.customizeContext) {
        _this.setContext(_this.props.customizeContext(_this.state.context));
      } // Finalize boot


      _this.setState({
        booting: false,
        booted: true
      }, () => {
        logger.info("Booted!");
      });
    })();
  }

  reboot(user) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.shutdown();

      if (user) {
        _this2.setContext({
          user
        });
      }

      _this2.boot();
    })();
  }

  shutdown() {
    var _this3 = this;

    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (resolve) {
        yield _this3.unmountPage();
        _this3.swagger = undefined;
        _this3.api = undefined;

        _this3.setState({
          booted: false
        }, () => {
          _this3.resetContext(resolve);
        });
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  authorize() {
    return new Promise((resolve, reject) => {
      var anonymous = new _errors.AnonymousUserError();
      var endpoint = this.api["bananas.me:list"];

      if (!endpoint) {
        reject(anonymous);
        return;
      }

      logger.debug("Authorizing...");
      endpoint().then(response => {
        var user = _objectSpread({}, response.obj);

        var current = this.state.context.user;

        if (JSON.stringify(user) !== JSON.stringify(current)) {
          logger.info("Authorized User:", user);
          this.setContext({
            user
          });
        }

        resolve(user);
      }, error => {
        if (error.message === "Forbidden") {
          reject(anonymous);
        } else {
          reject(error);
        }
      });
    });
  }

  onAPIClientError(error) {
    this.admin.progress(false);
    this.admin.error(error);
  }

  onAPIClientProgress(_ref2) {
    var {
      done
    } = _ref2;
    this.admin.progress(!done);
  }

  settingsDidUpdate(settings) {
    this.setState({
      settings
    });
  }

  routeDidUpdate(location, action) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      logger.info("App.routeDidUpdate()", action, location); // Get route from location state

      var route = location.state ? location.state.route : null;

      if (action === "POP" && !route) {
        _this4.router.reroute();

        return;
      } // Un-mount current page, if location changed


      var currentPage = _this4.state.pageProps;

      if (currentPage && (!currentPage.route || currentPage.route.path !== location.pathname)) {
        yield _this4.unmountPage();

        _this4.admin.loading();
      } // Authorize, load and mount page


      try {
        var {
          PageComponent,
          pageProps
        } = yield _this4.loadPage(location, route);

        _this4.mountPage(PageComponent, pageProps);
      } catch (error) {
        _this4.admin.loading(false);

        if (error instanceof _errors.PageError) {
          _this4.mountErrorPage((0, _utils.t)(error.message), error.code);
        } else if (error.response && [401, 403].includes(error.response.status)) {
          try {
            yield _this4.authorize();

            _this4.mountErrorPage((0, _utils.t)("Permission denied."), error.response.status);
          } catch (authorizeError) {
            if (authorizeError instanceof _errors.AnonymousUserError) {
              _this4.reboot();
            } else {
              throw error;
            }
          }
        } else {
          throw error;
        }
      }
    })();
  }

  loadPage(location, route) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (!route) {
        throw new _errors.PageNotFoundError();
      }

      var {
        id,
        operationId,
        params,
        app,
        path,
        query,
        hash,
        template
      } = route;
      var referer = _this5.state.pageProps ? _this5.state.pageProps.route || null : null;
      var {
        PageComponent
      } = _this5; // Load or re-use page component

      if (_this5.PageComponent && referer && referer.id === id) {
        logger.debug("Re-using page component...");
      } else {
        logger.debug("Loading page component...", path, route, referer);

        if (template === "Component") {
          // Route has predefined page component, and no data needed
          PageComponent = _this5.router.getOperationTemplate(operationId);
        } else {
          // Load page component
          PageComponent = yield _this5.loadPageComponent(template);
        }
      } // Initialize page component props


      var pageProps = {
        key: "".concat(id, ":").concat(location.search),
        route: {
          id,
          params,
          path,
          query,
          hash,
          location
        },
        title: route.title,
        data: undefined,
        logger: _this5.getLogger(app),
        referer
      };
      var reuseData = referer && location.hash && referer.location.pathname === location.pathname && referer.location.search === location.search; // Load page data, but only if path or query changed

      if (reuseData) {
        logger.debug("Re-using page data...");
        pageProps.data = _this5.state.pageProps.data;
      } else if ((route.action || "").match(/\.?(list|read)$/)) {
        pageProps.data = yield _this5.loadPageData(id, params, query);
      }

      return {
        PageComponent,
        pageProps
      };
    })();
  }

  loadPageComponent(template) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      var {
        pages
      } = _this6.props;
      var exports = yield pages(template).catch(() => {
        throw new _errors.PageNotImplementedError();
      });
      return exports.default;
    })();
  }

  loadPageData(operationId, params, filter) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      if (_this7.api[operationId]) {
        logger.debug("Loading page data...", operationId, params, filter);

        try {
          _this7.admin.loading();

          var data = yield _this7.api[operationId](_objectSpread({}, params, {}, filter));
          data.schema = _this7.api[operationId].response;

          data.getTitle = path => {
            if (data.schema == null) {
              throw new TypeError("Cannot get title because .schema is missing.");
            }

            return (0, _utils.getFromSchema)(data.schema, "".concat(path, ".title"));
          };

          _this7.admin.loading(false);

          return data;
        } catch (error) {
          _this7.admin.loading(false);

          throw error;
        }
      }

      logger.debug("Omitting page data...operationId is undefined, no data endpoint found");
      return null;
    })();
  }

  mountPage(PageComponent, pageProps) {
    logger.info("Mount Page:", pageProps);
    this.admin.loading(false);
    this.PageComponent = PageComponent;
    this.setState({
      pageProps
    }, () => {
      this.setTitle(pageProps.title);
    });
  }

  mountErrorPage(title, statusCode) {
    var _title = title || (0, _utils.t)("Server error");

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

  unmountPage() {
    return new Promise(resolve => {
      if (this.state.pageProps) {
        logger.info("Un-mounting page...", this.state.pageProps);
        this.PageComponent = null;
        this.admin.dismissMessages();
        this.setState({
          pageProps: null
        }, resolve);
      } else {
        resolve();
      }
    });
  }

  setTitle(title) {
    if (title) {
      document.title = "".concat(title, " | ").concat(this.props.title);
    } else {
      document.title = this.props.title;
    }
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.api["bananas.login:create"]({
        data: {
          username,
          password
        }
      }).then(response => {
        logger.info("Successfull login...reboot");
        var user = response.obj;
        resolve(user);
        this.admin.dismissMessages();
        this.reboot(user);
        this.admin.success("".concat((0, _utils.t)("Welcome,"), " ").concat(user.full_name));
      }, error => {
        reject(error);
      });
    });
  }

  logout() {
    this.api["bananas.logout:create"]().then(() => {
      this.reboot();
    });
  }

  render() {
    var {
      PageComponent
    } = this;
    var {
      classes,
      pageTheme,
      loginForm
    } = this.props;
    var {
      booting,
      booted,
      context,
      settings,
      pageProps
    } = this.state;
    var {
      user
    } = context;
    var isHorizontalLayout = settings.horizontal;
    var isVerticalLayout = !settings.horizontal;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
      className: (0, _classnames.default)(classes.root, {
        [classes.admin]: booted && user,
        [classes.horizontalRoot]: isHorizontalLayout,
        [classes.verticalRoot]: isVerticalLayout
      })
    }, booted ? _react.default.createElement(_context.default.Provider, {
      value: context
    }, user ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_NavBar.default, {
      variant: settings.horizontal ? "drawer" : "appbar",
      dense: settings.dense,
      permanent: !settings.collapsable,
      collapsed: settings.collapsed,
      nav: settings.icons ? this.props.nav : Array.isArray(this.props.nav) ? this.props.nav : this.props.nav ? Object.keys(this.props.nav) : null,
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

}

var BananasAdmin = (0, _styles.withStyles)(styles, {
  name: "BananasAdmin"
})(Admin);

class App extends _react.default.Component {
  render() {
    var {
      // Default `nav` to the legacy `icons` prop, and remove `icons` from props.
      props: {
        icons,
        nav = icons
      }
    } = this,
        rest = _objectWithoutProperties(this.props, ["icons", "nav"]);

    var props = _objectSpread({
      nav
    }, rest);

    var theme = (0, _themes.createBananasTheme)(props.theme);
    var pageTheme = props.pageTheme ? (0, _themes.createBananasTheme)(props.pageTheme) : undefined;
    logger.debug("Main Theme:", theme);
    logger.debug("Page Theme:", pageTheme);
    return _react.default.createElement(_styles.MuiThemeProvider, {
      theme: theme
    }, _react.default.createElement(_CssBaseline.default, null), _react.default.createElement(BananasAdmin, _objectSpread({}, props, {
      theme,
      pageTheme
    })));
  }

}

_defineProperty(App, "propTypes", {
  api: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.shape({
    url: _propTypes.default.string.isRequired
  }).isRequired]).isRequired,
  pages: _propTypes.default.func.isRequired,
  prefix: _propTypes.default.string,
  logLevel: _propTypes.default.oneOfType([_propTypes.default.oneOf(["INFO", "DEBUG", "WARN", "ERROR", "OFF"]), _propTypes.default.object]),
  layout: _propTypes.default.oneOf(["horizontal", "vertical"]),
  permanent: _propTypes.default.bool,
  collapsed: _propTypes.default.bool,
  dense: _propTypes.default.bool,
  title: _propTypes.default.string,
  branding: _propTypes.default.string,
  version: _propTypes.default.string,
  logo: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.node]),
  icons: (0, _deprecatedPropType.default)(_propTypes.default.object, 'Please use "nav" instead.'),
  nav: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string.isRequired), _propTypes.default.object]),
  theme: _propTypes.default.object,
  pageTheme: _propTypes.default.object,
  loginForm: _propTypes.default.func,
  editableSettings: _propTypes.default.bool,
  customizeContext: _propTypes.default.func
});

_defineProperty(App, "defaultProps", {
  prefix: "",
  logLevel: "WARN",
  layout: "horizontal",
  dense: false,
  permanent: false,
  collapsed: false,
  title: "Bananas",
  branding: "Bananas",
  version: "v2.0.0",
  // TODO: Get package version
  logo: true,
  icons: undefined,
  nav: undefined,
  theme: _themes.default.default,
  pageTheme: undefined,
  loginForm: undefined,
  editableSettings: false,
  customizeContext: undefined
});

var _default = App;
exports.default = _default;