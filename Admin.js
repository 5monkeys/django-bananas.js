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

var _context = _interopRequireDefault(require("./context"));

var _errors = require("./errors");

var _pages = require("./pages");

var _router = _interopRequireDefault(require("./router"));

var _settings = _interopRequireDefault(require("./settings"));

var _themes = _interopRequireWildcard(require("./themes"));

var _utils = require("./utils");

var _ = require(".");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_jsLogger.default.useDefaults();

const logger = _jsLogger.default.get("bananas");

const styles = theme => {
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

    const propSettings = {
      editable: props.editableSettings,
      horizontal: props.layout === "horizontal",
      icons: props.icons !== null,
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
    const level = (typeof this.props.logLevel === "string" ? this.props.logLevel : this.props.logLevel[namespace]) || logLevel || "WARN";
    return _jsLogger.default[level];
  }

  getLogger(namespace) {
    const log = _jsLogger.default.get(namespace);

    const level = this.getLogLevel(namespace);
    log.setLevel(level);
    return log;
  }

  makeContext(context) {
    const locals = ["setTitle", "login", "logout"].reduce((result, shortcut) => _objectSpread({}, result, {
      [shortcut]: this[shortcut].bind(this)
    }), {
      settings: this.settings
    });
    return _objectSpread({
      admin: _objectSpread({}, this.admin, locals),
      router: undefined,
      api: undefined,
      user: undefined
    }, context);
  }

  setContext(ctx, callback) {
    const context = _objectSpread({}, this.state.context, ctx);

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

  async boot() {
    logger.info("Booting...");
    this.setTitle(); // Initialize API client

    const apiBase = this.props.api;
    const apiUrl = `${apiBase}/v1.0/schema.json`;
    let swagger = undefined;

    try {
      swagger = await new _api.default({
        url: apiUrl,
        errorHandler: this.onAPIClientError.bind(this),
        progressHandler: this.onAPIClientProgress.bind(this)
      });
    } catch (error) {
      logger.error("Critical Error: Failed to initialize API client!", error);
      const cause = error.response ? error.response.statusText : "Unreachable";
      this.admin.error(`Failed to boot: API ${cause}`);
      this.setState({
        booting: false
      });
      return;
    }

    logger.info(`Initialized ${swagger.isAuthenticated ? "Authenticated" : "Un-authenticated"} Swagger Client:`, swagger);
    this.swagger = swagger;
    this.api = swagger.operations; // Load translations

    const i18n = await this.api["bananas.i18n:list"]();
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

    if (swagger.isAuthenticated) {
      if (!this.state.context.user) {
        await this.authorize();
      }

      this.router.reroute();
    } // Finalize boot


    this.setState({
      booting: false,
      booted: true
    }, () => {
      logger.info("Booted!");
    });
  }

  async reboot(user) {
    await this.shutdown();

    if (user) {
      this.setContext({
        user
      });
    }

    this.boot();
  }

  shutdown() {
    return new Promise(async resolve => {
      await this.unmountPage();
      this.swagger = undefined;
      this.api = undefined;
      this.setState({
        booted: false
      }, () => {
        this.resetContext(resolve);
      });
    });
  }

  authorize() {
    return new Promise((resolve, reject) => {
      const anonymous = new _errors.AnonymousUserError();
      const endpoint = this.api["bananas.me:list"];

      if (!endpoint) {
        reject(anonymous);
        return;
      }

      logger.debug("Authorizing...");
      endpoint().then(response => {
        const user = _objectSpread({}, response.obj);

        const current = this.state.context.user;

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

  onAPIClientProgress(_ref) {
    let done = _ref.done;
    this.admin.progress(!done);
  }

  settingsDidUpdate(settings) {
    this.setState({
      settings
    });
  }

  async routeDidUpdate(location, action) {
    logger.info("App.routeDidUpdate()", action, location); // Get route from location state

    const route = location.state ? location.state.route : null;

    if (action === "POP" && !route) {
      this.router.reroute();
      return;
    } // Un-mount current page, if location changed


    const currentPage = this.state.pageProps;

    if (currentPage && (!currentPage.route || currentPage.route.path !== location.pathname)) {
      await this.unmountPage();
      this.admin.loading();
    } // Authorize, load and mount page


    try {
      const _ref2 = await this.loadPage(location, route),
            PageComponent = _ref2.PageComponent,
            pageProps = _ref2.pageProps;

      this.mountPage(PageComponent, pageProps);
    } catch (error) {
      this.admin.loading(false);

      if (error instanceof _errors.PageError) {
        this.mountErrorPage((0, _.t)(error.message), error.code);
      } else if (error.response && [401, 403].includes(error.response.status)) {
        try {
          await this.authorize();
          this.mountErrorPage((0, _.t)("Permission denied."), error.response.status);
        } catch (authorizeError) {
          if (authorizeError instanceof _errors.AnonymousUserError) {
            this.reboot();
          } else {
            throw error;
          }
        }
      } else {
        throw error;
      }
    }
  }

  async loadPage(location, route) {
    if (!route) {
      throw new _errors.PageNotFoundError();
    }

    const id = route.id,
          operationId = route.operationId,
          params = route.params,
          app = route.app,
          path = route.path,
          query = route.query,
          hash = route.hash,
          template = route.template;
    const referer = this.state.pageProps ? this.state.pageProps.route || null : null;
    let PageComponent = this.PageComponent; // Load or re-use page component

    if (this.PageComponent && referer && referer.id === id) {
      logger.debug("Re-using page component...");
    } else {
      logger.debug("Loading page component...", path, route, referer);

      if (template === "Component") {
        // Route has predefined page component, and no data needed
        PageComponent = this.router.getOperationTemplate(operationId);
      } else {
        // Load page component
        PageComponent = await this.loadPageComponent(template);
      }
    } // Initialize page component props


    const pageProps = {
      key: `${id}:${location.search}`,
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
      logger: this.getLogger(app),
      referer
    };
    const reuseData = referer && location.hash && referer.location.pathname === location.pathname && referer.location.search === location.search; // Load page data, but only if path or query changed

    if (reuseData) {
      logger.debug("Re-using page data...");
      pageProps.data = this.state.pageProps.data;
    } else if ((route.action || "").match(/\.?(list|read)$/)) {
      pageProps.data = await this.loadPageData(id, params, query);
    }

    return {
      PageComponent,
      pageProps
    };
  }

  async loadPageComponent(template) {
    const pages = this.props.pages;
    const exports = await pages(template).catch(() => {
      throw new _errors.PageNotImplementedError();
    });
    return exports.default;
  }

  async loadPageData(operationId, params, filter) {
    if (this.api[operationId]) {
      logger.debug("Loading page data...", operationId, params, filter);

      try {
        this.admin.loading();
        const data = await this.api[operationId](_objectSpread({}, params, filter));
        data.schema = this.api[operationId].response;

        data.getTitle = path => {
          if (data.schema == null) {
            throw new TypeError(`Cannot get title because .schema is missing.`);
          }

          return (0, _utils.getFromSchema)(data.schema, `${path}.title`);
        };

        this.admin.loading(false);
        return data;
      } catch (error) {
        this.admin.loading(false);
        throw error;
      }
    }

    logger.debug("Omitting page data...operationId is undefined, no data endpoint found");
    return null;
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
    const _title = title || (0, _.t)("Server error");

    const _statusCode = statusCode || 500;

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
      document.title = `${title} | ${this.props.title}`;
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
        const user = response.obj;
        resolve(user);
        this.admin.dismissMessages();
        this.reboot(user);
        this.admin.success(`${(0, _.t)("Welcome,")} ${user.full_name}`);
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
    const PageComponent = this.PageComponent;
    const _this$props = this.props,
          classes = _this$props.classes,
          pageTheme = _this$props.pageTheme,
          loginForm = _this$props.loginForm;
    const _this$state = this.state,
          booting = _this$state.booting,
          booted = _this$state.booted,
          context = _this$state.context,
          settings = _this$state.settings,
          pageProps = _this$state.pageProps;
    const user = context.user;
    const isHorizontalLayout = settings.horizontal;
    const isVerticalLayout = !settings.horizontal;
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

}

const BananasAdmin = (0, _styles.withStyles)(styles, {
  name: "BananasAdmin"
})(Admin);

class App extends _react.default.Component {
  render() {
    const props = this.props;
    const theme = (0, _themes.createBananasTheme)(props.theme);
    const pageTheme = props.pageTheme ? (0, _themes.createBananasTheme)(props.pageTheme) : undefined;
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
  api: _propTypes.default.string.isRequired,
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