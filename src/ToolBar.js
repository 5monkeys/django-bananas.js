import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Container from "./Container";

const styles = theme => ({
  root: {
    flexGrow: 0,
    flexShrink: 0,
  },
  bottom: {
    bottom: 0,
    top: "auto",
  },
  toolbar: {
    "& > * + *": {
      marginLeft: theme.spacing.unit,
    },
  },
});

const ToolBar = ({ classes, children, placement, color, ...rest }) => {
  return (
    <AppBar
      elevation={0}
      position="relative"
      color={color}
      className={classNames(classes.root, {
        [classes.bottom]: placement === "bottom",
      })}
      {...rest}
    >
      <Container>
        <Toolbar
          className={classes.toolbar}
          classes={{ gutters: classes.toolbarGutters }}
        >
          {children}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

ToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  placement: PropTypes.string,
  color: PropTypes.string,
};

ToolBar.defaultProps = {
  children: null,
  placement: "bottom",
  color: "primary",
};

export default withStyles(styles, { name: "BananasToolBar" })(ToolBar);
