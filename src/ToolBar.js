import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
  withTheme,
} from "@material-ui/core/styles";
import { darken, lighten } from "@material-ui/core/styles/colorManipulator";
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
  colorPrimary: {},
  colorSecondary: {},
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

class ToolBar extends React.Component {
  constructor(props) {
    super(props);

    const { color, theme } = props;
    this.theme = this.initializeTheme(theme, color);
  }

  initializeTheme(theme, color) {
    const primary =
      color === "primary"
        ? {
            contrastText: theme.palette.primary.contrastText,
            main: theme.palette.primary.dark,
            light: lighten(
              theme.palette.primary.main,
              theme.palette.tonalOffset * 2.0
            ),
            dark: darken(
              theme.palette.primary.dark,
              theme.palette.tonalOffset * 1.5
            ),
          }
        : theme.palette.primary;

    const secondary =
      color === "secondary"
        ? {
            contrastText: theme.palette.secondary.contrastText,
            main: theme.palette.secondary.dark,
            light: lighten(
              theme.palette.secondary.main,
              theme.palette.tonalOffset * 2.0
            ),
            dark: darken(
              theme.palette.secondary.dark,
              theme.palette.tonalOffset * 1.5
            ),
          }
        : theme.palette.secondary;

    const overrides = {
      MuiButton: {
        contained: {
          // Disable drop shadow for contained buttons in ToolBar
          boxShadow: "none",
          "&:active, &:focus": {
            boxShadow: "none",
          },
        },
        outlined:
          color === "primary"
            ? {
                // Button[default] @ ToolBar[primary]
                color: primary.contrastText,
                borderColor: primary.light,
              }
            : color === "secondary"
            ? {
                // Button[default] @ ToolBar[secondary]
                color: secondary.contrastText,
                borderColor: secondary.light,
              }
            : {
                // Button[default] @ ToolBar[paper]
              },
        outlinedPrimary:
          color === "primary"
            ? {
                // Button[primary] @ ToolBar[primary]
                color: "inherit",
                borderColor: primary.contrastText,
                "&:hover": {
                  borderColor: primary.contrastText,
                  backgroundColor: primary.main,
                },
              }
            : color === "secondary"
            ? {
                // Button[primary] @ ToolBar[secondary]
                borderColor: primary.main,
              }
            : {
                // Button[primary] @ ToolBar[paper]
              },
        outlinedSecondary:
          color === "primary"
            ? {
                // Button[secondary] @ ToolBar[primary]
                borderColor: secondary.main,
              }
            : color === "secondary"
            ? {
                // Button[secondary] @ ToolBar[secondary]
                color: secondary.contrastText,
                borderColor: secondary.contrastText,
                "&:hover": {
                  borderColor: secondary.contrastText,
                  backgroundColor: secondary.main,
                },
              }
            : {
                // Button[secondary] @ ToolBar[paper]
              },
      },
    };

    return createMuiTheme(
      theme.extend({
        palette: {
          primary,
          secondary,
        },
        overrides,
      })
    );
  }

  render() {
    const {
      classes,
      overrides,
      children,
      placement,
      color,
      border,
      dense,
      justify,
      ...rest
    } = this.props;

    return (
      <AppBar
        elevation={0}
        position="relative"
        color={color !== "paper" ? color : undefined}
        className={classNames(classes.root, {
          [classes.colorPrimary]: color === "primary",
          [classes.colorSecondary]: color === "secondary",
          [classes.colorPaper]: color === "paper",
        })}
        {...rest}
      >
        <Container>
          <MuiThemeProvider theme={this.theme}>
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
          </MuiThemeProvider>
        </Container>
      </AppBar>
    );
  }
}

ToolBar.propTypes = {
  theme: PropTypes.object.isRequired,
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

export default withStyles(styles, { name: "BananasToolBar" })(
  withTheme()(ToolBar)
);
