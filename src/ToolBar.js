import AppBar from "@mui/material/AppBar";
import { createTheme } from "@mui/material/styles";
import {
  darken,
  getLuminance,
  lighten,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { withStyles } from "@mui/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Container from "./Container";
import { extendTheme } from "./themes";

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
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    "& $borderBottom": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
});

class ToolBar extends React.Component {
  getTheme() {
    if (!this.theme) {
      const { theme, color } = this.props;
      return this.makeTheme(theme, color).bind(this);
    }
    return this.theme;
  }

  makeTheme = (propTheme, color) => parentTheme => {
    const theme = propTheme || parentTheme;

    const primaryIsLight = getLuminance(theme.palette.primary.main) > 0.5;
    const secondaryIsLight = getLuminance(theme.palette.secondary.main) > 0.5;

    // Darker primary color
    const primary =
      color === "primary" && this.props.emphasize
        ? {
            main: theme.palette.primary.dark,
            light: lighten(
              theme.palette.primary.main,
              theme.palette.tonalOffset * 2.0
            ),
            dark: darken(
              theme.palette.primary.dark,
              theme.palette.tonalOffset * 1.5
            ),
            contrastText:
              getLuminance(theme.palette.primary.dark) > 0.5
                ? theme.palette.text.primary
                : theme.palette.common.white,
          }
        : theme.palette.primary;

    // Darker secondary color
    const secondary =
      color === "secondary" && this.props.emphasize
        ? {
            main: theme.palette.secondary.dark,
            light: lighten(
              theme.palette.secondary.main,
              theme.palette.tonalOffset * 2.0
            ),
            dark: darken(
              theme.palette.secondary.dark,
              theme.palette.tonalOffset * 1.5
            ),
            contrastText:
              getLuminance(theme.palette.secondary.dark) > 0.5
                ? theme.palette.text.primary
                : theme.palette.common.white,
          }
        : theme.palette.secondary;

    const overrides = {
      MuiButton: {
        contained: {
          // Contained Button[default] @ ToolBar[any]
          color: "inherit",
          backgroundColor: theme.palette.action.hover,
          "&:hover": {
            backgroundColor: theme.palette.action.selected,
          },

          // Disable drop shadow for all contained buttons in ToolBar
          boxShadow: "none",
          "&:active, &:focus": {
            boxShadow: "none",
          },
        },
        containedPrimary:
          color === "primary"
            ? {
                // Contained Button[primary] @ ToolBar[primary]
                color: primary.contrastText,
              }
            : color === "secondary"
            ? {
                // Contained Button[primary] @ ToolBar[secondary]
                color: theme.palette.primary.contrastText,
              }
            : {
                // Contained Button[primary] @ ToolBar[paper]
              },
        containedSecondary:
          color === "primary"
            ? {
                // Contained Button[secondary] @ ToolBar[primary]
                color: theme.palette.secondary.contrastText,
              }
            : color === "secondary"
            ? {
                // Contained Button[secondary] @ ToolBar[secondary]
                color: secondary.contrastText,
              }
            : {
                // Contained Button[secondary] @ ToolBar[paper]
              },
        outlined:
          color === "primary"
            ? {
                // Outlined Button[default] @ ToolBar[primary]
                color: "inherit", // primary.contrastText,
                borderColor: primaryIsLight ? undefined : primary.light,
              }
            : color === "secondary"
            ? {
                // Outlined Button[default] @ ToolBar[secondary]
                color: "inherit", // secondary.contrastText,
                borderColor: secondaryIsLight ? undefined : secondary.light,
              }
            : {
                // Outlined Button[default] @ ToolBar[paper]
              },
        outlinedPrimary:
          color === "primary"
            ? {
                // Outlined Button[primary] @ ToolBar[primary]
                color: "inherit",
                borderColor: theme.palette.primary.contrastText,
                "&:hover": {
                  borderColor: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.action.hover,
                },
              }
            : color === "secondary"
            ? {
                // Outlined Button[primary] @ ToolBar[secondary]
                borderColor: primary.main,
              }
            : {
                // Outlined Button[primary] @ ToolBar[paper]
              },
        outlinedSecondary:
          color === "primary"
            ? {
                // Outlined Button[secondary] @ ToolBar[primary]
                borderColor: secondary.main,
              }
            : color === "secondary"
            ? {
                // Outlined Button[secondary] @ ToolBar[secondary]
                color: secondary.contrastText,
                borderColor: theme.palette.secondary.contrastText,
                "&:hover": {
                  borderColor: theme.palette.secondary.contrastText,
                  backgroundColor: theme.palette.action.hover,
                },
              }
            : {
                // Outlined Button[secondary] @ ToolBar[paper]
              },
      },
    };

    this.theme = createTheme(
      extendTheme(theme, {
        palette: {
          primary,
          secondary,
        },
        overrides,
      })
    );

    return this.theme;
  };

  renderAppBar() {
    const {
      classes,
      theme: _theme,
      autoStyle,
      emphasize: _emphasize,
      overrides,
      children: _children,
      color,
      border: _border,
      dense: _dense,
      justify: _justify,
      ...rest
    } = this.props;

    return (
      <AppBar
        elevation={0}
        position="relative"
        color={color !== "paper" ? color : undefined}
        classes={{
          root: classNames(
            classes.root,
            overrides.root,
            {
              [classes.colorPrimary]: color === "primary",
              [classes.colorSecondary]: color === "secondary",
              [classes.colorPaper]: color === "paper",
            },
            {
              [overrides.colorPrimary]: overrides.colorPrimary,
              [overrides.colorSecondary]: overrides.colorSecondary,
              [overrides.colorPaper]: overrides.colorPaper,
            }
          ),
        }}
        {...rest}
      >
        <Container>
          {autoStyle ? (
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={this.getTheme()}>
                {this.renderToolbar()}
              </ThemeProvider>
            </StyledEngineProvider>
          ) : (
            this.renderToolbar()
          )}
        </Container>
      </AppBar>
    );
  }

  renderToolbar() {
    const { classes, overrides, children, border, dense, justify } = this.props;
    return (
      <Toolbar
        variant={dense ? "dense" : "regular"}
        classes={{
          gutters: classes.toolbarGutters,
          root: classNames(
            classes.toolbar,
            overrides.toolbar,
            {
              [classes.justifyStart]: justify === "start",
              [classes.justifyCenter]: justify === "center",
              [classes.justifyEnd]: justify === "end",
              [classes.justifyBetween]: justify === "between",
              [classes.justifyAround]: justify === "around",
              [classes.justifyEvenly]: justify === "evenly",
              [classes.borderTop]: border === "top",
              [classes.borderBottom]: border === "bottom",
            },
            {
              [overrides.borderTop]: overrides.borderTop,
              [overrides.borderBottom]: overrides.borderBottom,
            }
          ),
        }}
      >
        {children}
      </Toolbar>
    );
  }

  render() {
    const { theme } = this.props;

    return theme ? (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{this.renderAppBar()}</ThemeProvider>
      </StyledEngineProvider>
    ) : (
      this.renderAppBar()
    );
  }
}

ToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
  autoStyle: PropTypes.bool,
  emphasize: PropTypes.bool,
  overrides: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  color: PropTypes.string,
  border: PropTypes.string,
  dense: PropTypes.bool,
  justify: PropTypes.string, // start|center|end|between|around|evenly
};

ToolBar.defaultProps = {
  theme: undefined,
  autoStyle: true,
  emphasize: true,
  overrides: {},
  children: null,
  color: "primary",
  border: "top",
  dense: false,
  justify: "end",
};

export default withStyles(styles, { name: "BananasToolBar" })(ToolBar);
