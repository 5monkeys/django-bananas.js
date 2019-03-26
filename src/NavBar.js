import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Branding from "./Branding";
import Container from "./Container";
import Hamburger from "./Hamburger";
import Navigation from "./Navigation";
import User from "./User";
import AdminContext from "./context";

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
    width: 40 + theme.spacing.unit * 2 + 1,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerBranding: {},
  permanentDrawerBrandingButton: {
    padding: 0,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
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
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 2,
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

    // Set default icons
    const icons = {
      enabled: Boolean(props.icons), // Helper: Show icons or not
      home: HomeIcon,
      "bananas.me:list": AccountCircleIcon,
      ...props.icons,
    };

    return {
      ...state,
      isDrawerVariant,
      isAppBarVariant,
      permanent,
      collapsed,
      icons,
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
      icons,
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
              icons={icons}
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
            icon={icons["bananas.me:list"]}
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
  // Used in: getDerivedStateFromProps
  // eslint-disable-next-line react/no-unused-prop-types
  permanent: PropTypes.bool,
  collapsed: PropTypes.bool,

  title: PropTypes.string,
  branding: PropTypes.string,
  version: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
  // Used in: getDerivedStateFromProps
  // eslint-disable-next-line react/no-unused-prop-types
  icons: PropTypes.object,
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
  icons: undefined,
};

export default withStyles(styles, { name: "BananasNavBar" })(NavBar);
