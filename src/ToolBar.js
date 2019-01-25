import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import WidthLimit from "./WidthLimit";
import settings from "./conf";
import AdminContext from "./context";

const styles = theme => ({
  contentSpacer: {
    position: "relative",
    height: settings.dimensions.appbarHeight - 2,
  },
  bottom: {
    bottom: 0,
    top: "auto",
  },
  appBar: {
    marginTop: settings.dimensions.appbarHeight,
    zIndex: theme.zIndex.drawer,
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
  toolbar: {
    "& > * + *": {
      marginLeft: theme.spacing.unit,
    },
  },
});

const ToolBar = ({ classes, children, placement, ...rest }) => {
  return (
    <div className={classes.contentSpacer}>
      <AdminContext.Consumer>
        {context => {
          // TODO: Remove admin props dependency
          const horizontalLayout = context.admin.props.layout === "horizontal";
          const shifted = horizontalLayout && context.navigationOpen;
          return (
            <AppBar
              elevation={0}
              position="fixed"
              color="primary"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: shifted,
                [classes.bottom]: placement === "bottom",
              })}
              {...rest}
            >
              <WidthLimit>
                <Toolbar
                  className={classes.toolbar}
                  classes={{ gutters: classes.toolbarGutters }}
                >
                  {children}
                </Toolbar>
              </WidthLimit>
            </AppBar>
          );
        }}
      </AdminContext.Consumer>
    </div>
  );
};

ToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  placement: PropTypes.string,
};

ToolBar.defaultProps = {
  placement: "bottom",
  children: null,
};
export default withStyles(styles)(ToolBar);
