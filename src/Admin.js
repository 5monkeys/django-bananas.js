import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import classNames from "classnames";
import Logger from "js-logger";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "./AdminContext";
import { AlertController } from "./Alert";
import APIClient from "./api";
import {
  AnonymousUserError,
  PageError,
  PageNotFoundError,
  PageNotImplementedError,
} from "./errors";
import LoadingScreen from "./LoadingScreen";
import { MessagesController } from "./Messages";
import NavBar from "./NavBar";
import { Page, PageLoadController } from "./Page";
import { ErrorPage, LoginPage } from "./pages";
import Router from "./router";
import Settings from "./settings";
import themes, { createBananasTheme } from "./themes";
import { ComponentProxy, getFromSchema, makeUser, t } from "./utils";

// eslint thinks this is a hook.
// eslint-disable-next-line
Logger.useDefaults();
const logger = Logger.get("bananas");

const styles = theme => {
  return {
    root: {
      display: "flex",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.primary.dark,
    },
    horizontalRoot: {
      width: "100%",
      flexDirection: "row",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    verticalRoot: {
      flexDirection: "column",
    },
    admin: {
      backgroundColor: theme.palette.background.default,
    },
  };
};

class Admin extends React.Component {
  Page = null;

  constructor(props) {
    super(props);

    // Default GUI settings from props
    const propSettings = {
      editable: props.editableSettings,
      horizontal: props.layout === "horizontal",
      icons: Boolean(props.nav) && !Array.isArray(props.nav),
      collapsable: !(props.permanent || false),
      collapsed: props.collapsed || false,
      dense: props.dense || false,
      container: props.container || undefined,
    };

    // Initialize GUI settings
    this.settings = new Settings(
      propSettings,
      this.settingsDidUpdate.bind(this)
    );

    // Initialize component controllers proxy references
    this.controllers = new ComponentProxy();
    this.controllers.add(PageLoadController, "PageLoadController");
    this.controllers.add(AlertController, "AlertController");
    this.controllers.add(MessagesController, "MessagesController");
    this.admin = this.controllers.proxy; // Shortcut

    this.state = {
      context: this.makeContext(),
      settings: this.settings.settings,
      pageProps: undefined,
      booting: true,
      booted: false,
    };

    logger.setLevel(this.getLogLevel("bananas", "WARN"));

    window.bananas = this;
  }

  getLogLevel(namespace, logLevel) {
    const level =
      (typeof this.props.logLevel === "string"
        ? this.props.logLevel
        : this.props.logLevel[namespace]) ||
      logLevel ||
      "WARN";

    return Logger[level];
  }

  getLogger(namespace) {
    const log = Logger.get(namespace);
    const level = this.getLogLevel(namespace);
    log.setLevel(level);
    return log;
  }

  makeContext(context) {
    const locals = ["setTitle", "login", "logout"].reduce(
      (result, shortcut) => ({
        ...result,
        [shortcut]: this[shortcut].bind(this),
      }),
      {
        settings: this.settings,
      }
    );

    return {
      admin: {
        ...this.admin,
        ...locals,
      },
      router: undefined,
      api: undefined,
      user: undefined,
      ...context,
    };
  }

  setContext(ctx, callback) {
    const context = { ...this.state.context, ...ctx };
    this.setState({ context }, () => {
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
    }

    // Undefine instances
    this.router = undefined;
    this.swagger = undefined;
    this.api = undefined;

    // Unbind app refernece on window
    window.bananas = undefined;
  }

  async boot() {
    logger.info("Booting...");
    this.setTitle();

    // Initialize API client
    const apiProp =
      typeof this.props.api === "string"
        ? { url: this.props.api }
        : this.props.api;
    const { url: apiBase, ...rest } = apiProp;
    const apiUrl = apiBase.endsWith(".json")
      ? apiBase
      : `${apiBase}/v1.0/schema.json`;
    let swagger = undefined;
    try {
      swagger = await new APIClient({
        url: apiUrl,
        errorHandler: this.onAPIClientError.bind(this),
        progressHandler: this.onAPIClientProgress.bind(this),
        // Allow overriding `errorHandler` and `progressHandler` if you want to
        // indicate errors with something other than snackbars or progress with
        // something other than the standard progress bar.
        ...rest,
      });
    } catch (error) {
      logger.error("Critical Error: Failed to initialize API client!", error);
      const cause = error.response ? error.response.statusText : "Unreachable";
      this.admin.error(`Failed to boot: API ${cause}`);
      this.setState({ booting: false });
      return;
    }

    // TODO: Remove this once BCOM is fixed to return multiple different schemas
    try {
      await swagger.operations["bananas.me:list"]();
      swagger.isAuthenticated = true;
    } catch {
      swagger.isAuthenticated = false;
    }

    logger.info(
      `Initialized ${
        swagger.isAuthenticated ? "Authenticated" : "Un-authenticated"
      } Swagger Client:`,
      swagger
    );

    this.swagger = swagger;
    this.api = swagger.operations;

    // Load translations
    const i18n = await this.api["bananas.i18n:list"]();
    window.i18n = i18n.obj.catalog;

    // Initialize Router
    if (!this.router) {
      this.router = new Router({ prefix: this.props.prefix });
      this.unlistenRouter = this.router.on(
        "routeDidUpdate",
        this.routeDidUpdate.bind(this)
      );
    }
    this.router.initialize(swagger);

    // Update AdminContext
    this.setContext({ api: this.api, router: this.router });

    // Route to current window location if API is authenticatd
    if (swagger.isAuthenticated) {
      if (!this.state.context.user) {
        await this.authorize();
      }
      this.router.reroute();
    }

    // Allow adding extra things to the AdminContext.
    if (this.props.customizeContext) {
      this.setContext(this.props.customizeContext(this.state.context));
    }

    // Finalize boot
    this.setState({ booting: false, booted: true }, () => {
      logger.info("Booted!");
    });
  }

  async reboot(user) {
    await this.shutdown();

    if (user) {
      this.setContext({ user });
    }

    this.boot();
  }

  shutdown() {
    // eslint-disable-next-line
    return new Promise(async resolve => {
      await this.unmountPage();

      this.swagger = undefined;
      this.api = undefined;

      this.setState({ booted: false }, () => {
        this.resetContext(resolve);
      });
    });
  }

  authorize() {
    return new Promise((resolve, reject) => {
      const anonymous = new AnonymousUserError();
      const endpoint = this.api["bananas.me:list"];

      if (!endpoint) {
        reject(anonymous);
        return;
      }

      logger.debug("Authorizing...");

      endpoint().then(
        response => {
          const user = (this.props.customizeUser || (usr => usr))(
            makeUser(response.obj)
          );
          const current = this.state.context.user;
          if (JSON.stringify(user) !== JSON.stringify(current)) {
            logger.info("Authorized User:", user);
            this.setContext({ user });
          }
          resolve(user);
        },
        error => {
          if (error.message === "Forbidden") {
            reject(anonymous);
          } else {
            reject(error);
          }
        }
      );
    });
  }

  onAPIClientError(error) {
    this.admin.progress(false);
    this.admin.error(error);
  }

  onAPIClientProgress({ done }) {
    this.admin.progress(!done);
  }

  settingsDidUpdate(settings) {
    this.setState({ settings });
  }

  async routeDidUpdate(location, action) {
    logger.info("App.routeDidUpdate()", action, location);

    // Get route from location state
    const route = location.state ? location.state.route : null;

    if (action === "POP" && !route) {
      this.router.reroute();
      return;
    }

    // Un-mount current page, if location changed
    const currentPage = this.state.pageProps;
    if (
      currentPage &&
      (!currentPage.route || currentPage.route.path !== location.pathname)
    ) {
      await this.unmountPage();
      this.admin.loading();
    }

    // Authorize, load and mount page
    try {
      const { PageComponent, pageProps } = await this.loadPage(location, route);
      this.mountPage(PageComponent, pageProps);
    } catch (error) {
      this.admin.loading(false);
      if (error instanceof PageError) {
        this.mountErrorPage(t(error.message), error.code);
      } else if (error.response && [401, 403].includes(error.response.status)) {
        try {
          await this.authorize();
          this.mountErrorPage(t("Permission denied."), error.response.status);
        } catch (authorizeError) {
          if (authorizeError instanceof AnonymousUserError) {
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
      throw new PageNotFoundError();
    }

    const { id, operationId, params, app, path, query, hash, template } = route;
    const referer = this.state.pageProps
      ? this.state.pageProps.route || null
      : null;

    let { PageComponent } = this;

    // Load or re-use page component
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
    }

    // Initialize page component props
    const pageProps = {
      key: `${id}:${location.search}`,
      route: {
        id,
        params,
        path,
        query,
        hash,
        location,
      },
      title: route.title,
      data: undefined,
      logger: this.getLogger(app),
      referer,
    };

    const reuseData =
      referer &&
      location.hash &&
      referer.location.pathname === location.pathname &&
      referer.location.search === location.search;

    // Load page data, but only if path or query changed
    if (reuseData) {
      logger.debug("Re-using page data...");
      pageProps.data = this.state.pageProps.data;
    } else if ((route.action || "").match(/\.?(list|read)$/)) {
      pageProps.data = await this.loadPageData(id, params, query);
    }

    return { PageComponent, pageProps };
  }

  async loadPageComponent(template) {
    const { pages } = this.props;
    const exports = await pages(template).catch(err => {
      logger.error("Error loading page...", err);

      throw new PageNotImplementedError();
    });
    return exports.default;
  }

  async loadPageData(operationId, params, filter) {
    if (this.api[operationId]) {
      logger.debug("Loading page data...", operationId, params, filter);

      try {
        this.admin.loading();
        const data = await this.api[operationId]({ ...params, ...filter });
        data.schema = this.api[operationId].response;
        data.getTitle = path => {
          if (data.schema == null) {
            throw new TypeError(`Cannot get title because .schema is missing.`);
          }
          return getFromSchema(data.schema, `${path}.title`);
        };
        this.admin.loading(false);
        return data;
      } catch (error) {
        this.admin.loading(false);
        throw error;
      }
    }

    logger.debug(
      "Omitting page data...operationId is undefined, no data endpoint found"
    );
    return null;
  }

  getCustomTitle(pageProps) {
    const { nav } = this.props;
    if (nav && pageProps && pageProps.route && pageProps.route.id) {
      const routeConfig = nav[pageProps.route.id];
      if (routeConfig) {
        return routeConfig.title || pageProps.title;
      }
    }
    return pageProps.title;
  }

  mountPage(PageComponent, pageProps) {
    logger.info("Mount Page:", pageProps);
    this.admin.loading(false);
    this.PageComponent = PageComponent;
    const title = this.getCustomTitle(pageProps);

    this.setState({ pageProps }, () => {
      this.setTitle(title);
    });
  }

  mountErrorPage(title, statusCode) {
    const _title = title || t("Server error");
    const _statusCode = statusCode || 500;
    logger.warn(_title, _statusCode);
    this.mountPage(ErrorPage, {
      key: _statusCode,
      title: _title,
      data: { statusCode: _statusCode },
    });
  }

  unmountPage() {
    return new Promise(resolve => {
      if (this.state.pageProps) {
        logger.info("Un-mounting page...", this.state.pageProps);
        this.PageComponent = null;
        this.admin.dismissMessages();
        this.setState({ pageProps: null }, resolve);
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
      this.api["bananas.login:create"](
        undefined,
        {
          // openapi3 support
          requestBody: { username, password },
          // openapi2 support
          parameters: { username, password },
        }
      ).then(
        response => {
          logger.info("Successful login...reboot");
          const user = makeUser(response.obj);
          resolve(user);
          this.admin.dismissMessages();
          this.reboot(user);
          this.admin.success(`${t("Welcome,")} ${user.full_name}`);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  logout() {
    this.api["bananas.logout:create"]().then(() => {
      this.reboot();
    });
  }

  render() {
    const { PageComponent } = this;
    const { classes, pageTheme, loginForm, container: Container } = this.props;
    const { booting, booted, context, settings, pageProps } = this.state;
    const { user } = context;

    const isHorizontalLayout = settings.horizontal;
    const isVerticalLayout = !settings.horizontal;
    return (
      <>
        <div
          className={classNames(classes.root, {
            [classes.admin]: booted && user,
            [classes.horizontalRoot]: isHorizontalLayout,
            [classes.verticalRoot]: isVerticalLayout,
          })}
        >
          {booted ? (
            <AdminContext.Provider value={context}>
              <Container>
                {user ? (
                  <>
                    <NavBar
                      variant={isHorizontalLayout ? "drawer" : "appbar"}
                      dense={settings.dense}
                      permanent={!settings.collapsable}
                      collapsed={settings.collapsed}
                      nav={
                        settings.icons
                          ? this.props.nav
                          : Array.isArray(this.props.nav)
                          ? this.props.nav
                          : this.props.nav
                          ? Object.keys(this.props.nav)
                          : null
                      }
                      logo={this.props.logo}
                      title={this.props.title}
                      branding={this.props.branding}
                      version={this.props.version}
                    />
                    <Page
                      theme={pageTheme}
                      component={PageComponent}
                      controller={this.controllers.PageLoadController}
                      {...pageProps}
                    />
                  </>
                ) : (
                  <LoginPage
                    form={loginForm}
                    logger={logger}
                    logo={this.props.logo}
                    title={this.props.title}
                  />
                )}
              </Container>
            </AdminContext.Provider>
          ) : (
            <LoadingScreen
              role="bootscreen"
              logo={this.props.logo}
              loading={booting}
            />
          )}
        </div>
        <MessagesController ref={this.controllers.MessagesController} />
        <AlertController ref={this.controllers.AlertController} />
      </>
    );
  }
}

const BananasAdmin = withStyles(styles, { name: "BananasAdmin" })(Admin);

class App extends React.Component {
  static propTypes = {
    api: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    ]).isRequired,
    pages: PropTypes.func.isRequired,
    prefix: PropTypes.string,
    logLevel: PropTypes.oneOfType([
      PropTypes.oneOf(["INFO", "DEBUG", "WARN", "ERROR", "OFF"]),
      PropTypes.object,
    ]),

    layout: PropTypes.oneOf(["horizontal", "vertical"]),
    permanent: PropTypes.bool,
    collapsed: PropTypes.bool,
    dense: PropTypes.bool,

    title: PropTypes.string,
    branding: PropTypes.string,
    version: PropTypes.string,
    logo: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.node,
    ]),
    nav: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string.isRequired),
      PropTypes.object,
    ]),

    theme: PropTypes.object,
    pageTheme: PropTypes.object,
    loginForm: PropTypes.func,
    editableSettings: PropTypes.bool,
    customizeContext: PropTypes.func,
    customizeUser: PropTypes.func,
    container: PropTypes.oneOfType([
      PropTypes.symbol,
      PropTypes.func,
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    prefix: "",
    logLevel: "WARN",

    layout: "horizontal",
    dense: false,
    permanent: false,
    collapsed: false,

    title: "Bananas",
    branding: "Bananas",
    version: "v3.4.3", // TODO: Get package version
    logo: true,
    nav: undefined,

    theme: themes.default,
    pageTheme: undefined,
    loginForm: undefined,
    editableSettings: false,
    customizeContext: undefined,
    customizeUser: undefined,
    container: React.Fragment,
  };

  render() {
    const { props } = this;
    const theme = createBananasTheme(props.theme);
    const pageTheme = props.pageTheme
      ? createBananasTheme(props.pageTheme)
      : undefined;

    logger.debug("Main Theme:", theme);
    logger.debug("Page Theme:", pageTheme);

    return (
      <StyledEngineProvider injectFirst>
        {/* <GlobalStyles styles={jssStyles} /> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BananasAdmin {...{ ...props, theme, pageTheme }} />
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
}

export default App;
