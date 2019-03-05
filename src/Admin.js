/* eslint-disable react/no-unused-state */ import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Logger from "js-logger";
import PropTypes from "prop-types";
import React from "react";

import ErrorBoundary from "./ErrorBoundary";
import LoadingScreen from "./LoadingScreen";
import Messages from "./Messages";
import NavBar from "./NavBar";
import ProgressBar from "./ProgressBar";
import APIClient from "./api";
import AdminContext from "./context";
import {
  AnonymousUserError,
  PageError,
  PageNotFoundError,
  PageNotImplementedError,
} from "./errors";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import LoginPageForm from "./pages/LoginPageForm";
import Router from "./router";
import Settings from "./settings";
import themes, { createBananasTheme } from "./themes";

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
    },
    verticalRoot: {
      flexDirection: "column",
    },
    admin: {
      backgroundColor: theme.palette.background.default,
    },
    page: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      width: "100%",
      height: "100%",
    },
  };
};

class Admin extends React.Component {
  Page = null;

  constructor(props) {
    super(props);

    // Default GUI settings from props
    const propSettings = {
      horizontal: props.layout === "horizontal",
      icons: props.icons !== null,
      collapsable: !(props.permanent || false),
      collapsed: props.collapsed || false,
      dense: props.dense || false,
    };

    // Initialize GUI settings
    this.settings = new Settings(
      propSettings,
      this.settingsDidUpdate.bind(this)
    );

    this.state = {
      booted: false,
      loading: { boot: 1 },
      user: undefined,
      pageProps: undefined,
      messages: [],
      messageIndex: 0,
      settings: this.settings.settings,
    };

    logger.setLevel(this.getLogLevel("bananas", "WARN"));

    window.bananas = this;
  }

  getLogLevel(namespace, logLevel) {
    const level =
      typeof this.props.logLevel === "string"
        ? logLevel || this.props.logLevel
        : this.props.logLevel[namespace] || logLevel || "WARN";

    return Logger[level];
  }

  getLogger(namespace) {
    const log = Logger.get(namespace);
    const level = this.getLogLevel(namespace);
    log.setLevel(level);
    return log;
  }

  componentDidMount() {
    this.boot();
  }

  async boot() {
    logger.info("Booting...");
    this.setTitle();

    // Initialize API client
    const apiBase = this.props.api;
    const apiUrl = `${apiBase}/v1.0/schema.json`;
    let swagger = undefined;
    try {
      swagger = await new APIClient({
        url: apiUrl,
        errorHandler: this.onAPIClientError.bind(this),
        progressHandler: this.onAPIClientProgress.bind(this),
      });
    } catch (error) {
      logger.error("Critical Error: Failed to initialize API client!", error);
      const cause = error.response ? error.response.statusText : "Unreachable";
      this.error(`Failed to boot: API ${cause}`);
      this.loading("boot", false);
      return;
    }

    logger.info(
      `Initialized ${
        swagger.isAuthenticated ? "Authenticated" : "Un-authenticated"
      } Swagger Client:`,
      swagger
    );

    const api = swagger.operations;
    this.api = api;
    this.swagger = swagger;

    // Initialize Router
    if (!this.router) {
      this.router = new Router(this.props.prefix);
      this.router.on("routeDidUpdate", this.routeDidUpdate.bind(this));
    }
    this.router.initialize(swagger);

    // Boot phase loading complete
    this.loading("boot", false);

    // Route current window location if API is authenticatd
    if (swagger.isAuthenticated) {
      this.user = { pending: true }; // Temp user to not flash login page
      this.setState({ user: this.user });
      this.router.reroute();
    }

    // Finalize boot
    this.setState({ booted: true });

    logger.info("Booted!");
  }

  reboot(user) {
    this.unmountPage();

    this.user = user;
    this.api = undefined;
    this.swagger = undefined;

    this.setState({ booted: false, user }, this.boot.bind(this));
  }

  authorize() {
    return new Promise((resolve, reject) => {
      const anonymous = new AnonymousUserError();
      const endpoint = this.api["bananas.me:list"];

      if (!endpoint) {
        reject(anonymous);
        return;
      }
      endpoint().then(
        response => {
          this.user = { ...response.obj };
          logger.info("Authorized User:", this.user);
          this.setState({ user: this.user });
          resolve(this.user);
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

  loading(type, on = true) {
    const count = (this.state.loading[type] || (on ? 0 : 1)) + (on ? 1 : -1);
    this.setState({ loading: { ...this.state.loading, [type]: count } });
  }

  isLoading(type) {
    return type
      ? this.state.loading[type] > 0
      : Object.keys(this.state.loading).some(t => this.isLoading(t));
  }

  onAPIClientError(error) {
    this.loading("api", false);
    this.error(error);
  }

  onAPIClientProgress({ done }) {
    this.loading("api", !done);
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
      this.unmountPage();
    }

    // Authorize, load and mount page
    try {
      if (!this.state.user || !this.state.user.id) {
        await this.authorize();
      }
      const { Page, pageProps } = await this.loadPage(location, route);
      this.mountPage(Page, pageProps);
    } catch (error) {
      if (error instanceof AnonymousUserError) {
        this.reboot();
      } else if (error instanceof PageError) {
        this.mountErrorPage(error.message, error.code);
      } else if (error.response && [401, 403].includes(error.response.status)) {
        try {
          await this.authorize();
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

    logger.debug("Load Page:", path, route, referer);

    // Initial page props
    let Page = null;
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

    if (template === "Component") {
      // Route has predefined page component, and no data needed
      Page = this.router.getOperationTemplate(operationId);
    } else {
      // Load page component
      Page = await this.loadPageComponent(template);
    }

    const reuseData =
      referer &&
      location.hash &&
      referer.location.pathname === location.pathname &&
      referer.location.search === location.search;

    // Load page data, but only if path or query changed
    if (reuseData) {
      logger.debug("Re-using page data...");
      pageProps.data = this.state.pageProps.data;
    } else if (["list", "read"].includes(route.action)) {
      pageProps.data = await this.loadPageData(id, params, query);
    }

    return { Page, pageProps };
  }

  async loadPageComponent(template) {
    const { pages } = this.props;
    const exports = await pages(template).catch(() => {
      throw new PageNotImplementedError();
    });
    return exports.default;
  }

  loadPageData(operationId, params, filter) {
    if (this.api[operationId]) {
      logger.debug("Loading page data...", operationId, params, filter);
      this.loading("data");
      return this.api[operationId]({ ...params, ...filter });
    }

    logger.debug(
      "Omitting page data...operationId is undefined, no data endpoint found"
    );
    return null;
  }

  mountPage(PageComponent, pageProps) {
    logger.info("Mount Page:", pageProps);
    this.Page = PageComponent;
    this.setState({ pageProps }, () => {
      this.loading("data", false);
      this.setTitle(pageProps.title);
    });
  }

  mountErrorPage(title, statusCode) {
    logger.warn(title || "Page Not Found");
    this.mountPage(ErrorPage, {
      key: statusCode || 500,
      title: title || "Error",
      data: { statusCode },
    });
  }

  unmountPage() {
    if (this.state.pageProps) {
      logger.info("Un-mounting page...", this.state.pageProps);
      this.Page = null;
      this.setState({ pageProps: null });
      this.dismissMessages();
    }
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
      this.api["bananas.login:create"]({ data: { username, password } }).then(
        response => {
          logger.info("Successfull login...reboot");
          const user = response.obj;
          resolve(user);
          this.dismissMessages();
          this.reboot(user);
          this.success(`Välkommen ${user.full_name}`);
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

  /* MESSAGING */

  getUniqueMessageId() {
    const { messageIndex } = this.state;
    this.setState({ messageIndex: messageIndex + 1 });
    return messageIndex;
  }

  messageCloseHandler(id) {
    return () => {
      const updatedMessages = [...this.state.messages];
      const index = updatedMessages.findIndex(msg => id === msg.id);
      updatedMessages.splice(index, 1);
      this.setState({ messages: updatedMessages });
    };
  }

  createMessage({ message, type }) {
    const messages = [...this.state.messages];
    const id = this.getUniqueMessageId();
    messages.push({
      message,
      type,
      open: true,
      id,
      remove: this.messageCloseHandler(id),
    });
    this.setState({ messages });
  }

  error(message) {
    this.createMessage({ type: "error", message });
  }

  warning(message) {
    this.createMessage({ type: "warning", message });
  }

  success(message) {
    this.createMessage({ type: "success", message });
  }

  info(message) {
    this.createMessage({ type: "info", message });
  }

  dismissMessages() {
    this.setState({
      messages: this.state.messages.map(message => {
        return { ...message, open: false };
      }),
    });
  }

  render() {
    const { Page, router, api } = this;
    const { classes, pageTheme, loginForm } = this.props;
    const { booted, user, pageProps, settings, messages } = this.state;
    const LoginForm = loginForm || LoginPageForm;

    const isHorizontalLayout = settings.horizontal;
    const isVerticalLayout = !settings.horizontal;

    // TODO: Don't build context here to prevent new object and children re-render
    const context = {
      admin: this,
      router,
      api,
      user,
    };

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
              {user ? (
                <>
                  <NavBar
                    variant={settings.horizontal ? "drawer" : "appbar"}
                    dense={settings.dense}
                    permanent={!settings.collapsable}
                    collapsed={settings.collapsed}
                    icons={settings.icons ? this.props.icons : null}
                    logo={this.props.logo}
                    title={this.props.title}
                    branding={this.props.branding}
                    version={this.props.version}
                  />
                  <div className={classes.page}>
                    <ProgressBar loading={this.isLoading("api")} />
                    <LoadingScreen
                      loading={this.isLoading("data")}
                      color="default"
                      backdrop
                    />
                    {Page && (
                      <ErrorBoundary>
                        {pageTheme ? (
                          <MuiThemeProvider theme={pageTheme}>
                            <Page {...pageProps} />
                          </MuiThemeProvider>
                        ) : (
                          <Page {...pageProps} />
                        )}
                      </ErrorBoundary>
                    )}
                  </div>
                </>
              ) : (
                <LoginPage
                  form={LoginForm}
                  logger={logger}
                  logo={this.props.logo}
                  title={this.props.title}
                />
              )}
            </AdminContext.Provider>
          ) : (
            <LoadingScreen logo={this.props.logo} loading={this.isLoading()} />
          )}
        </div>
        <Messages messages={messages} />
      </>
    );
  }
}

const StyledAdmin = withStyles(styles)(Admin);

const App = ({ ...props }) => {
  const theme = createBananasTheme(props.theme);
  const pageTheme = props.pageTheme
    ? createBananasTheme(props.pageTheme)
    : undefined;

  logger.debug("Main Theme:", theme);
  logger.debug("Page Theme:", pageTheme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <StyledAdmin {...{ ...props, theme, pageTheme }} />
    </MuiThemeProvider>
  );
};

App.propTypes = {
  api: PropTypes.string.isRequired,
  pages: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  logLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  layout: PropTypes.string,
  permanent: PropTypes.bool,
  dense: PropTypes.bool,

  title: PropTypes.string,
  branding: PropTypes.string,
  version: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
  icons: PropTypes.object,

  theme: PropTypes.object,
  pageTheme: PropTypes.object,
  loginForm: PropTypes.func,
};

App.defaultProps = {
  prefix: "",
  logLevel: "WARN",

  layout: "horizontal", // horizontal|vertical
  dense: false,
  permanent: false,

  title: "Bananas",
  branding: "Bananas",
  version: "v1.0.0", // TODO: Get package version
  logo: true,
  icons: undefined,

  theme: themes.default,
  pageTheme: undefined,
  loginForm: undefined,
};

export default App;
