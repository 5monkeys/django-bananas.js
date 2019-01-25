/* eslint-disable react/no-unused-state */
import { Divider, Toolbar } from "@material-ui/core";
import MuiAppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiDrawer from "@material-ui/core/Drawer";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Logger from "js-logger";
import PropTypes from "prop-types";
import React from "react";

import Branding from "./Branding";
import Container from "./Container";
import ErrorBoundary from "./ErrorBoundary";
import Hamburger from "./Hamburger";
import LoadingScreen from "./LoadingScreen";
import Messages from "./Messages";
import Navigation from "./Navigation";
import User from "./User";
import APIClient from "./api";
import settings from "./conf";
import AdminContext from "./context";
import {
  AnonymousUserError,
  PageError,
  PageNotFoundError,
  PageNotImplementedError,
} from "./errors";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import Router from "./router";
import themes from "./themes";

Logger.useDefaults();
const logger = Logger.get("bananas");

const styles = () => ({
  toolbar: {
    height: settings.dimensions.appbarHeight,
    paddingLeft: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    "& > * ": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  content: {
    marginTop: -settings.dimensions.appbarHeight,
    width: "100%",
    overflow: "auto",
    position: "relative",
  },
  horizontalRoot: {
    display: "flex",
    width: "100%",
    height: `calc(100vh - ${settings.dimensions.appbarHeight}px)`,
  },
  verticalRoot: {
    display: "flex",
    flexDirection: "column",
    "& $content": {
      height: `calc(100vh - ${settings.dimensions.appbarHeight}px)`,
      marginTop: settings.dimensions.appbarHeight,
    },
  },
});

class Admin extends React.Component {
  Page = null;

  constructor(props) {
    super(props);

    this.state = {
      booted: false,
      user: undefined,
      pageProps: undefined,
      layout: props.layout,
      navigationOpen: true,
      messages: [],
      messageIndex: 0,
    };

    logger.setLevel(this.getLogLevel("bananas", "WARN"));

    window.bananas = this;
  }

  setContext(newContext, callback) {
    // TODO: Remove this?
    const context = { ...this.state.context, ...newContext };
    this.setState({ context }, callback);
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
        errorHandler: this.error.bind(this),
      });
    } catch (error) {
      logger.error("Critical Error: Failed to initialize API client!", error);
      this.error("Failed to boot!");
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
      this.router.listen(this.routeDidUpdate.bind(this));
    }
    this.router.initialize(swagger);

    // Route current window location if API is authenticatd
    if (swagger.isAuthenticated) {
      await this.authorize(); // Authorize early to get user and not flash login
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
      currentPage.route &&
      currentPage.route.path !== location.pathname
    ) {
      this.unmountPage();
    }

    // Authorize, load and mount page
    try {
      await this.authorize();
      const { Page, pageProps } = await this.loadPage(location, route);
      this.mountPage(Page, pageProps);
    } catch (error) {
      // TODO: Handle un-authorized data -> Mount 401/403 page
      if (error instanceof AnonymousUserError) {
        this.reboot();
      } else if (error instanceof PageError) {
        this.mountErrorPage(error.message, error.code);
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
    logger.debug("Load Page:", path, route);

    // Initial page props
    let Page = null;
    const pageProps = {
      route: {
        id,
        params,
        path,
        query,
        hash,
      },
      title: route.title,
      data: undefined,
      referer: this.state.pageProps ? this.state.pageProps.route || null : null,
      logger: this.getLogger(app),
    };

    if (template === "Component") {
      // Route has predefined page component, and no data needed
      Page = this.router.getOperationTemplate(operationId);
    } else {
      // Load page component
      Page = await this.loadPageComponent(template);
    }

    // Load page data
    if (["list", "read"].includes(route.action)) {
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
      this.setTitle(pageProps.title);
    });
  }

  mountErrorPage(title, statusCode) {
    logger.warn(title || "Page Not Found");
    this.mountPage(ErrorPage, {
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

  toggleDrawer = () => {
    this.setState({ navigationOpen: !this.state.navigationOpen });
  };

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
    const { classes, theme, pageTheme, navigationProps } = this.props;
    const {
      booted,
      user,
      pageProps,
      layout,
      navigationOpen,
      messages,
    } = this.state;

    const isHorizontal = layout === "horizontal";
    const displayDrawerToggle = isHorizontal && !navigationProps.permanent;

    const context = {
      admin: this,
      router,
      api,
      user,
      navigationOpen,
    };

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        {booted ? (
          <AdminContext.Provider value={context}>
            {user ? (
              <>
                {isHorizontal ? (
                  <AppBar position={"relative"}>
                    <Container>
                      <Toolbar
                        disableGutters
                        className={classNames(
                          classes.toolbar,
                          classes.toolBarfullHeight
                        )}
                      >
                        {displayDrawerToggle && (
                          <Hamburger
                            open={navigationOpen}
                            onToggle={this.toggleDrawer}
                          />
                        )}

                        <Branding
                          logo={this.props.logo}
                          title={this.props.title}
                          subtitle={this.props.branding}
                          version={this.props.version}
                          onClick={() => {
                            this.router.route({ id: "home" }); // TODO: Use route id
                          }}
                        />
                      </Toolbar>
                    </Container>
                  </AppBar>
                ) : (
                  <AppBar position={"fixed"}>
                    <Container>
                      <Toolbar className={classes.toolbar}>
                        <Branding
                          logo={this.props.logo}
                          title={this.props.title}
                          subtitle={this.props.branding}
                          version={this.props.version}
                          onClick={() => {
                            this.router.route({ id: "home" });
                          }}
                        />

                        <Navigation
                          horizontal
                          icons={this.props.icons}
                          routes={this.router.navigationRoutes}
                          {...navigationProps}
                        />
                        <User variant="appbar" />
                      </Toolbar>
                    </Container>
                  </AppBar>
                )}
                <div
                  className={classNames(
                    classes.admin,
                    isHorizontal ? classes.horizontalRoot : classes.verticalRoot
                  )}
                >
                  {isHorizontal && (
                    <Drawer anchor="left" open={navigationOpen}>
                      <div>
                        <Divider />
                        <Navigation
                          icons={this.props.icons}
                          routes={this.router.navigationRoutes}
                          {...navigationProps}
                        />
                      </div>
                      <div>
                        <Divider />
                        <User variant="drawer" />
                      </div>
                    </Drawer>
                  )}
                  <div className={classes.content}>
                    {pageTheme ? (
                      <MuiThemeProvider theme={pageTheme}>
                        {Page ? (
                          <ErrorBoundary>
                            <Page {...pageProps} />
                          </ErrorBoundary>
                        ) : (
                          <LoadingScreen color="primary" />
                        )}
                      </MuiThemeProvider>
                    ) : Page ? (
                      <ErrorBoundary>
                        <Page {...pageProps} />
                      </ErrorBoundary>
                    ) : (
                      <LoadingScreen color="primary" />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <LoginPage
                logo={this.props.logo}
                title={this.props.title}
                logger={logger}
              />
            )}
          </AdminContext.Provider>
        ) : (
          <LoadingScreen logo={this.props.logo} />
        )}
        <Messages messages={messages} />
      </MuiThemeProvider>
    );
  }
}
Admin.propTypes = {
  classes: PropTypes.object.isRequired,

  api: PropTypes.string.isRequired,
  pages: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  logLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  layout: PropTypes.string,

  title: PropTypes.string,
  branding: PropTypes.string,
  version: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
  icons: PropTypes.object,

  theme: PropTypes.object,
  pageTheme: PropTypes.object,

  navigationProps: PropTypes.shape({
    dense: PropTypes.bool,
    permanent: PropTypes.bool,
  }),
};

Admin.defaultProps = {
  prefix: "",
  layout: "horizontal", // horizontal|vertical
  logLevel: "WARN",

  title: "Bananas",
  branding: "Bananas",
  version: "v1.0.0", // TODO: Get package version
  logo: true,
  icons: undefined,

  theme: themes.default,
  pageTheme: undefined,

  navigationProps: {
    dense: true,
    permanent: true,
  },
};

const Drawer = withStyles(theme => ({
  root: {
    width: settings.dimensions.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerClosed: {
    width: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonHidden: {
    display: "none",
  },
  drawerPaper: {
    justifyContent: "space-between",
    position: "relative",
    whiteSpace: "nowrap",
    width: settings.dimensions.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    justifyContent: "space-between",
    position: "relative",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}))(({ children, open, classes, ...rest }) => (
  <MuiDrawer
    open={open}
    className={classNames(classes.root, {
      [classes.drawerClosed]: !open,
    })}
    classes={{
      paper: open ? classes.drawerPaper : classes.drawerPaperClose,
    }}
    variant="persistent"
    {...rest}
  >
    {children}
  </MuiDrawer>
));

const AppBar = withStyles(theme => ({
  root: {
    overflow: "hidden",
    backgroundColor: theme.palette.primary.dark,
  },
  positionRelative: {
    width: settings.dimensions.drawerWidth + 1,
  },
}))(({ children, classes, ...rest }) => (
  <MuiAppBar elevation={0} classes={classes} {...rest}>
    {children}
  </MuiAppBar>
));

export default withStyles(styles)(Admin);
