import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Branding from "./Branding";
import Container from "./Container";
import AdminContext from "./context";
import Hamburger from "./Hamburger";
import Navigation from "./Navigation";
import User from "./User";

const DEFAULT_NAV = {
  home: HomeIcon,
  "bananas.me:list": AccountCircleIcon,
};

const styles = theme => ({
  branding: {
    padding: 0,
    flexGrow: 0,
    flexShrink: 0,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    ...theme.mixins.toolbar,
  },
  navigation: {
    flexGrow: 1,
    position: "relative",
  },
  user: {
    flexGrow: 0,
    flexShrink: 0,
  },
  scroll: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  scrollHorizontal: {
    overflowX: "auto",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  scrollVertical: {
    overflowY: "auto",
  },
  /* DRAWER STYLES */
  drawerRoot: {
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawer: {
    width: 280,
    overflow: "visible",
    borderRight: 0,
  },
  drawerBorder: {
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: theme.palette.divider,
  },
  drawerExpanded: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerCollapsed: {
    width: 40 + theme.spacing(2) + 1,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerBranding: {},
  permanentDrawerBrandingButton: {
    padding: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  /* APPBAR STYLES */
  appbar: {
    backgroundColor: theme.palette.primary.dark,
  },
  appbarContainer: {
    display: "flex",
    flexDirection: "row",
  },
  appbarBranding: {
    background: "transparent",
  },
  permanentAppbarBrandingButton: {
    padding: 0,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
  },
  pageOffset: {
    ...theme.mixins.toolbar,
  },
  header: {}, // Put last for easier overriding .branding and .appbar
});

class NavBar extends React.Component {
  static contextType = AdminContext;
  state = {};

  static getDerivedStateFromProps(props, state) {
    const { variant, permanent, collapsed } = props;
    const isDrawerVariant = variant === "drawer";
    const isAppBarVariant = variant === "appbar";

    return {
      ...state,
      isDrawerVariant,
      isAppBarVariant,
      permanent,
      collapsed,
      nav: makeNav(props.nav),
      showIcons: Boolean(props.nav) && !Array.isArray(props.nav),
    };
  }

  toggle = () => {
    this.context.admin.settings.configure({ collapsed: !this.props.collapsed });
  };

  renderChildren() {
    const {
      classes,
      variant,
      dense,
      logo,
      title,
      branding,
      version,
    } = this.props;

    const {
      isDrawerVariant,
      isAppBarVariant,
      collapsed,
      permanent,
      nav,
      showIcons,
    } = this.state;

    const { router } = this.context;
    const routes = router.navigationRoutes;

    return (
      <>
        <Toolbar
          classes={{
            root: classNames(classes.branding, classes.header, {
              [classes.drawerBranding]: isDrawerVariant,
              [classes.appbarBranding]: isAppBarVariant,
            }),
          }}
        >
          {isDrawerVariant && !permanent && (
            <Hamburger open={!collapsed} onToggle={this.toggle} />
          )}
          <Branding
            logo={logo}
            title={title}
            subtitle={branding}
            version={version}
            className={classNames({
              [classes.permanentDrawerBrandingButton]:
                permanent && isDrawerVariant,
              [classes.permanentAppbarBrandingButton]:
                permanent && isAppBarVariant,
            })}
            onClick={() => {
              this.context.router.route({ id: "home" });
            }}
          />
        </Toolbar>
        <Toolbar
          className={classNames(classes.navigation, {
            [classes.drawerBorder]: isDrawerVariant,
          })}
        >
          <div
            className={classNames(classes.scroll, {
              [classes.scrollVertical]: isDrawerVariant,
              [classes.scrollHorizontal]: isAppBarVariant,
            })}
          >
            <Navigation
              horizontal={isAppBarVariant}
              collapsed={collapsed}
              dense={dense}
              nav={nav}
              showIcons={showIcons}
              routes={routes}
            />
          </div>
        </Toolbar>
        <div
          className={classNames(classes.user, {
            [classes.drawerBorder]: isDrawerVariant,
          })}
        >
          <User
            variant={variant}
            collapsed={collapsed}
            icon={nav["bananas.me:list"]}
          />
        </div>
      </>
    );
  }

  render() {
    const { classes, variant } = this.props;
    const { collapsed } = this.state;

    return variant === "drawer" ? (
      <Drawer
        variant="permanent"
        anchor="left"
        open={!collapsed}
        classes={{
          root: classNames(classes.drawerRoot, classes.drawer, {
            [classes.drawerExpanded]: !collapsed,
            [classes.drawerCollapsed]: collapsed,
          }),
          paper: classNames(classes.drawer, {
            [classes.drawerExpanded]: !collapsed,
            [classes.drawerCollapsed]: collapsed,
          }),
        }}
        data-testid="navbar-drawer"
      >
        {this.renderChildren()}
      </Drawer>
    ) : (
      <>
        <div className={classes.pageOffset} />
        <AppBar
          position={"fixed"}
          elevation={0}
          classes={{
            root: classNames(classes.appbar, classes.header),
          }}
          data-testid="navbar-appbar"
        >
          <Container className={classes.appbarContainer}>
            {this.renderChildren()}
          </Container>
        </AppBar>
      </>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,

  variant: PropTypes.string,
  dense: PropTypes.bool,
  permanent: PropTypes.bool,
  collapsed: PropTypes.bool,

  title: PropTypes.string,
  branding: PropTypes.string,
  version: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
  nav: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired),
    PropTypes.object,
  ]),
};

NavBar.defaultProps = {
  variant: "drawer", // drawer|appbar
  dense: false,
  permanent: false,
  collapsed: false,

  title: "",
  branding: "",
  version: "",
  logo: true,
  nav: undefined,
};

export default withStyles(styles, { name: "BananasNavBar" })(NavBar);

function makeNav(propsNav) {
  const navObject =
    // `["id1", "id2"]` is a shorthand for `{"id1": null, "id2": null}`.
    Array.isArray(propsNav)
      ? propsNav.reduce((result, key) => {
          result[key] = null;
          return result;
        }, {})
      : // Object or missing.
        { ...propsNav };

  // This might seem unnecessary, but is needed to allow moving the default nav
  // items.
  const defaultNav = Object.keys(DEFAULT_NAV).reduce((result, key) => {
    if (!{}.hasOwnProperty.call(navObject, key)) {
      result[key] = DEFAULT_NAV[key];
    }
    return result;
  }, {});

  return {
    ...defaultNav,
    ...navObject,
  };
}
