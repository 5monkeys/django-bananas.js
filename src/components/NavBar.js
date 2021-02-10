import {
  AppBar,
  Box,
  Drawer,
  Hidden,
  SwipeableDrawer,
  Toolbar,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useContext, useMemo, useState } from "react";

import AdminContext from "../contexts/AdminContext";
import Branding from "./Branding";
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
    overflowX: "hidden",
  },
  /* DRAWER STYLES */
  mobileDrawer: {
    width: "70%",
  },
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
  mobileAppbarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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

const NavBar = props => {
  const {
    variant,
    dense,
    logo,
    title,
    classes,
    branding,
    version,
    permanent,
    collapsed,
    nav: passedNav,
  } = props;

  const { admin, router } = useContext(AdminContext);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // memoize :
  const nav = useMemo(() => makeNav(passedNav), [passedNav]);
  const showIcons = Boolean(props.nav) && !Array.isArray(props.nav);

  const isDrawerVariant = variant === "drawer";
  const isAppBarVariant = variant === "appbar";

  const toggle = () => {
    admin.settings.configure({ collapsed: !collapsed });
  };

  const renderHamburger = () => (
    <>
      <Hidden xsDown>
        {isDrawerVariant && !permanent && (
          <Hamburger open={!collapsed} onToggle={toggle} />
        )}
      </Hidden>
      <Hidden smUp>
        {isDrawerVariant && !permanent && (
          <Hamburger
            open={!collapsed}
            onToggle={() => setMobileDrawerOpen(false)}
          />
        )}
      </Hidden>
    </>
  );
  const renderChildren = (
    forceCollapsed = collapsed,
    forceDrawerVariant = false
  ) => {
    const isCollapsed = forceCollapsed;
    return (
      <>
        <Toolbar
          classes={{
            root: classNames(classes.branding, classes.header, {
              [classes.drawerBranding]: isDrawerVariant,
              [classes.appbarBranding]: forceDrawerVariant
                ? false
                : isAppBarVariant,
            }),
          }}
        >
          {renderHamburger()}
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
              router.route({ id: "home" });
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
              [classes.scrollHorizontal]: forceDrawerVariant
                ? false
                : isAppBarVariant,
            })}
          >
            <Navigation
              horizontal={forceDrawerVariant ? false : isAppBarVariant}
              collapsed={isCollapsed}
              dense={dense}
              nav={nav}
              showIcons={showIcons}
              routes={router.navigationRoutes}
            />
          </div>
        </Toolbar>
        <div
          className={classNames(classes.user, {
            [classes.drawerBorder]: forceDrawerVariant ? true : isDrawerVariant,
          })}
        >
          <User
            variant={forceDrawerVariant ? "drawer" : variant}
            collapsed={collapsed}
            icon={nav["bananas.me:list"]}
          />
        </div>
      </>
    );
  };

  const renderMobileDrawer = () => (
    <>
      <AppBar
        position="relative"
        elevation={0}
        classes={{
          root: classNames(classes.appbar, classes.header),
        }}
        data-testid="navbar-appbar"
      >
        <Box paddingRight={2} display="flex" justifyContent="space-between">
          <Hamburger
            edge={"start"}
            open={mobileDrawerOpen}
            onToggle={() => setMobileDrawerOpen(true)}
          />
          <Branding
            logo={logo}
            title={title}
            subtitle={branding}
            version={version}
            fullWidth={false}
            onClick={() => {
              router.route({ id: "home" });
            }}
          />
        </Box>
      </AppBar>

      <SwipeableDrawer
        classes={{ paper: classes.mobileDrawer }}
        onClose={() => setMobileDrawerOpen(false)}
        onOpen={() => setMobileDrawerOpen(true)}
        anchor="left"
        open={mobileDrawerOpen}
      >
        {renderChildren(false, true)}
      </SwipeableDrawer>
    </>
  );

  const renderDesktopDrawer = () => {
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
        {renderChildren()}
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
          <Box className={classes.appbarContainer}>{renderChildren()}</Box>
        </AppBar>
      </>
    );
  };

  return (
    <>
      <Hidden smUp>{renderMobileDrawer()}</Hidden>
      <Hidden implementation="css" xsDown>
        {renderDesktopDrawer()}
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  variant: PropTypes.string,
  dense: PropTypes.bool,
  permanent: PropTypes.bool,
  collapsed: PropTypes.bool,
  classes: PropTypes.object.isRequired,

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
  // items. Nesting partly overrides this behaviour. Putting the children under their
  // respective parent.
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
