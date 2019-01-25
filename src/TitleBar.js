import AppBar from "@material-ui/core/AppBar";
import Fab from "@material-ui/core/Fab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Container from "./Container";
import Link from "./Link";
import settings from "./conf";
import AdminContext from "./context";

const styles = theme => ({
  spacer: {
    height: settings.dimensions.appbarHeight,
  },
  avoidSpacer: {
    marginTop: settings.dimensions.appbarHeight,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: settings.dimensions.drawerWidth,
    width: `calc(100% - ${settings.dimensions.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  back: {
    // opacity: 0.5,
    marginLeft: theme.spacing.unit / -2,
    marginRight: theme.spacing.unit * 2,
    boxShadow: "none",
    borderWidth: "1.5pt",
    borderStyle: "solid",
    borderColor: theme.palette.primary.contrastText,
    "&:hover, &:active": {
      // opacity: 1,
      boxShadow: "none",
    },
  },
  centerChildren: {
    height: settings.dimensions.appbarHeight,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appBarSpacer: theme.mixins.toolbar,
});

const TitleBar = ({
  classes,
  children,
  title,
  back,
  centerChildren,
  ...rest
}) => {
  const backLinkProps =
    back && back.indexOf(":") > 0 ? { route: back } : { path: back };

  return (
    <AdminContext.Consumer>
      {context => {
        // TODO: Remove admin props dependency
        const horizontalLayout = context.admin.props.layout === "horizontal";
        return (
          <div className={classes.spacer}>
            <AppBar
              elevation={0}
              position={"fixed"}
              color="primary"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: horizontalLayout,
                [classes.avoidSpacer]: !horizontalLayout,
              })}
              {...rest}
            >
              <Container>
                <Toolbar
                  className={classes.toolbar}
                  classes={{ gutters: classes.toolbarGutters }}
                >
                  {back && (
                    <Link patch {...backLinkProps}>
                      <Fab
                        color="primary"
                        size="small"
                        className={classes.back}
                        aria-label="Back"
                      >
                        <ChevronLeftIcon />
                      </Fab>
                    </Link>
                  )}
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    className={classes.title}
                  >
                    {title}
                  </Typography>
                  <div
                    className={classNames({
                      [classes.centerChildren]: centerChildren,
                    })}
                  >
                    {children}
                  </div>
                </Toolbar>
              </Container>
            </AppBar>
          </div>
        );
      }}
    </AdminContext.Consumer>
  );
};

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  back: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  centerChildren: PropTypes.bool,
};

TitleBar.defaultProps = {
  title: "Bananas",
  back: false,
  children: null,
  centerChildren: false,
};
export default withStyles(styles)(TitleBar);
