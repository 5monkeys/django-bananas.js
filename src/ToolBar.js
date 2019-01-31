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
  toolbar: {},
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyAround: {
    justifyContent: "space-around",
  },
  justifyEvenly: {
    justifyContent: "space-evenly",
  },
  borderTop: {},
  borderBottom: {},
  colorPaper: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    "& $borderTop": {
      borderTop: "1px solid rgba(0, 0, 0, 0.14)",
    },
    "& $borderBottom": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.14)",
    },
  },
});

const ToolBar = ({
  classes,
  overrides,
  children,
  placement,
  color,
  border,
  dense,
  justify,
  ...rest
}) => {
  return (
    <AppBar
      elevation={0}
      position="relative"
      color={color !== "paper" ? color : undefined}
      className={classNames(classes.root, {
        [classes.colorPaper]: color === "paper",
      })}
      {...rest}
    >
      <Container>
        <Toolbar
          variant={dense ? "dense" : "regular"}
          className={classNames(classes.toolbar, {
            [overrides.toolbar]: overrides.toolbar,
            [classes.justifyStart]: justify === "start",
            [classes.justifyCenter]: justify === "center",
            [classes.justifyEnd]: justify === "end",
            [classes.justifyBetween]: justify === "between",
            [classes.justifyAround]: justify === "around",
            [classes.justifyEvenly]: justify === "evenly",
            [classes.borderTop]: border === "top",
            [classes.borderBottom]: border === "bottom",
          })}
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
  overrides: PropTypes.object,
  children: PropTypes.node,
  color: PropTypes.string,
  border: PropTypes.string,
  dense: PropTypes.bool,
  justify: PropTypes.string, // start|center|end|between|around|evenly
};

ToolBar.defaultProps = {
  overrides: {},
  children: null,
  color: "primary",
  border: "top",
  dense: false,
  justify: "end",
};

export default withStyles(styles, { name: "BananasToolBar" })(ToolBar);
