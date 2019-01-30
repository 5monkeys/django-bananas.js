import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Logger from "js-logger";
import PropTypes from "prop-types";
import React from "react";

import Branding from "./Branding";
import Container from "./Container";
import Hamburger from "./Hamburger";
import Navigation from "./Navigation";
import User from "./User";
import AdminContext from "./context";

const logger = Logger.get("bananas");

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
    borderRight: "1px solid rgba(0, 0, 0, 0.14)",
  },
  drawerOpen: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClosed: {
    width: theme.spacing.unit * 7 + 1,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerBranding: {
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
    padding: 0,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 2,
  },
  pageOffset: {
    ...theme.mixins.toolbar,
  },
});

class NavBar extends React.Component {
  static contextType = AdminContext;

  constructor(props) {
    super(props);

    const { variant, icons } = props;
    const isDrawerVariant = variant === "drawer";
    const isAppBarVariant = variant === "appbar";
    let { permanent } = props;

    if (!permanent && (isAppBarVariant || !icons)) {
      logger.warn("Forcing permanent navbar");
      permanent = true;
      if (isDrawerVariant) {
        logger.error("No icons provided for non-permanent navbar");
      }
    }

    this.state = {
      isDrawerVariant,
      isAppBarVariant,
      permanent,
      open: true,
    };
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
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
      icons,
    } = this.props;

    const { isDrawerVariant, isAppBarVariant, open, permanent } = this.state;
    const routes = this.context.router.navigationRoutes;

    return (
      <>
        <Toolbar className={classes.branding}>
          {isDrawerVariant && !permanent && (
            <Hamburger open={open} onToggle={this.toggle} />
          )}
          <Branding
            logo={logo}
            title={title}
            subtitle={branding}
            version={version}
            className={classNames({
              [classes.drawerBranding]: permanent && isDrawerVariant,
              [classes.appbarBranding]: permanent && isAppBarVariant,
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
              collapsed={!open}
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
          <User variant={variant} collapsed={!open} />
        </div>
      </>
    );
  }

  render() {
    const { classes, variant } = this.props;
    const { open } = this.state;

    return variant === "drawer" ? (
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        classes={{
          root: classNames(classes.drawerRoot, classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClosed]: !open,
          }),
          paper: classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClosed]: !open,
          }),
        }}
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
            root: classes.appbar,
          }}
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

  title: PropTypes.string,
  branding: PropTypes.string,
  version: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
  icons: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

NavBar.defaultProps = {
  variant: "drawer", // drawer|appbar
  dense: false,
  permanent: false,

  title: "",
  branding: "",
  version: "",
  logo: true,
  icons: true,
};

export default withStyles(styles, { name: "BananasNavBar" })(NavBar);
