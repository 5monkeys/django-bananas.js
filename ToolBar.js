"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _styles = require("@material-ui/core/styles");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Container = _interopRequireDefault(require("./Container"));

var _themes = require("./themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = theme => ({
  root: {
    flexGrow: 0,
    flexShrink: 0
  },
  toolbar: {},
  justifyStart: {
    justifyContent: "flex-start"
  },
  justifyCenter: {
    justifyContent: "center"
  },
  justifyEnd: {
    justifyContent: "flex-end"
  },
  justifyBetween: {
    justifyContent: "space-between"
  },
  justifyAround: {
    justifyContent: "space-around"
  },
  justifyEvenly: {
    justifyContent: "space-evenly"
  },
  borderTop: {},
  borderBottom: {},
  colorPrimary: {},
  colorSecondary: {},
  colorPaper: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    "& $borderTop": {
      borderTop: "1px solid ".concat(theme.palette.divider)
    },
    "& $borderBottom": {
      borderBottom: "1px solid ".concat(theme.palette.divider)
    }
  }
});

class ToolBar extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "makeTheme", (propTheme, color) => parentTheme => {
      var theme = propTheme || parentTheme;
      var primaryIsLight = (0, _colorManipulator.getLuminance)(theme.palette.primary.main) > 0.5;
      var secondaryIsLight = (0, _colorManipulator.getLuminance)(theme.palette.secondary.main) > 0.5; // Darker primary color

      var primary = color === "primary" && this.props.emphasize ? {
        main: theme.palette.primary.dark,
        light: (0, _colorManipulator.lighten)(theme.palette.primary.main, theme.palette.tonalOffset * 2.0),
        dark: (0, _colorManipulator.darken)(theme.palette.primary.dark, theme.palette.tonalOffset * 1.5),
        contrastText: (0, _colorManipulator.getLuminance)(theme.palette.primary.dark) > 0.5 ? theme.palette.text.primary : theme.palette.common.white
      } : theme.palette.primary; // Darker secondary color

      var secondary = color === "secondary" && this.props.emphasize ? {
        main: theme.palette.secondary.dark,
        light: (0, _colorManipulator.lighten)(theme.palette.secondary.main, theme.palette.tonalOffset * 2.0),
        dark: (0, _colorManipulator.darken)(theme.palette.secondary.dark, theme.palette.tonalOffset * 1.5),
        contrastText: (0, _colorManipulator.getLuminance)(theme.palette.secondary.dark) > 0.5 ? theme.palette.text.primary : theme.palette.common.white
      } : theme.palette.secondary;
      var overrides = {
        MuiButton: {
          contained: {
            // Contained Button[default] @ ToolBar[any]
            color: "inherit",
            backgroundColor: theme.palette.action.hover,
            "&:hover": {
              backgroundColor: theme.palette.action.selected
            },
            // Disable drop shadow for all contained buttons in ToolBar
            boxShadow: "none",
            "&:active, &:focus": {
              boxShadow: "none"
            }
          },
          containedPrimary: color === "primary" ? {
            // Contained Button[primary] @ ToolBar[primary]
            color: primary.contrastText
          } : color === "secondary" ? {
            // Contained Button[primary] @ ToolBar[secondary]
            color: theme.palette.primary.contrastText
          } : {// Contained Button[primary] @ ToolBar[paper]
          },
          containedSecondary: color === "primary" ? {
            // Contained Button[secondary] @ ToolBar[primary]
            color: theme.palette.secondary.contrastText
          } : color === "secondary" ? {
            // Contained Button[secondary] @ ToolBar[secondary]
            color: secondary.contrastText
          } : {// Contained Button[secondary] @ ToolBar[paper]
          },
          outlined: color === "primary" ? {
            // Outlined Button[default] @ ToolBar[primary]
            color: "inherit",
            // primary.contrastText,
            borderColor: primaryIsLight ? undefined : primary.light
          } : color === "secondary" ? {
            // Outlined Button[default] @ ToolBar[secondary]
            color: "inherit",
            // secondary.contrastText,
            borderColor: secondaryIsLight ? undefined : secondary.light
          } : {// Outlined Button[default] @ ToolBar[paper]
          },
          outlinedPrimary: color === "primary" ? {
            // Outlined Button[primary] @ ToolBar[primary]
            color: "inherit",
            borderColor: theme.palette.primary.contrastText,
            "&:hover": {
              borderColor: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.action.hover
            }
          } : color === "secondary" ? {
            // Outlined Button[primary] @ ToolBar[secondary]
            borderColor: primary.main
          } : {// Outlined Button[primary] @ ToolBar[paper]
          },
          outlinedSecondary: color === "primary" ? {
            // Outlined Button[secondary] @ ToolBar[primary]
            borderColor: secondary.main
          } : color === "secondary" ? {
            // Outlined Button[secondary] @ ToolBar[secondary]
            color: secondary.contrastText,
            borderColor: theme.palette.secondary.contrastText,
            "&:hover": {
              borderColor: theme.palette.secondary.contrastText,
              backgroundColor: theme.palette.action.hover
            }
          } : {// Outlined Button[secondary] @ ToolBar[paper]
          }
        }
      };
      this.theme = (0, _styles.createMuiTheme)((0, _themes.extendTheme)(theme, {
        palette: {
          primary,
          secondary
        },
        overrides
      }));
      return this.theme;
    });
  }

  getTheme() {
    if (!this.theme) {
      var {
        theme,
        color
      } = this.props;
      return this.makeTheme(theme, color).bind(this);
    }

    return this.theme;
  }

  renderAppBar() {
    var _this$props = this.props,
        {
      classes,
      theme,
      autoStyle,
      emphasize,
      overrides,
      children,
      color,
      border,
      dense,
      justify
    } = _this$props,
        rest = _objectWithoutProperties(_this$props, ["classes", "theme", "autoStyle", "emphasize", "overrides", "children", "color", "border", "dense", "justify"]);

    return _react.default.createElement(_AppBar.default, _extends({
      elevation: 0,
      position: "relative",
      color: color !== "paper" ? color : undefined,
      classes: {
        root: (0, _classnames.default)(classes.root, overrides.root, {
          [classes.colorPrimary]: color === "primary",
          [classes.colorSecondary]: color === "secondary",
          [classes.colorPaper]: color === "paper"
        }, {
          [overrides.colorPrimary]: overrides.colorPrimary,
          [overrides.colorSecondary]: overrides.colorSecondary,
          [overrides.colorPaper]: overrides.colorPaper
        })
      }
    }, rest), _react.default.createElement(_Container.default, null, autoStyle ? _react.default.createElement(_styles.MuiThemeProvider, {
      theme: this.getTheme()
    }, this.renderToolbar()) : this.renderToolbar()));
  }

  renderToolbar() {
    var {
      classes,
      overrides,
      children,
      border,
      dense,
      justify
    } = this.props;
    return _react.default.createElement(_Toolbar.default, {
      variant: dense ? "dense" : "regular",
      classes: {
        gutters: classes.toolbarGutters,
        root: (0, _classnames.default)(classes.toolbar, overrides.toolbar, {
          [classes.justifyStart]: justify === "start",
          [classes.justifyCenter]: justify === "center",
          [classes.justifyEnd]: justify === "end",
          [classes.justifyBetween]: justify === "between",
          [classes.justifyAround]: justify === "around",
          [classes.justifyEvenly]: justify === "evenly",
          [classes.borderTop]: border === "top",
          [classes.borderBottom]: border === "bottom"
        }, {
          [overrides.borderTop]: overrides.borderTop,
          [overrides.borderBottom]: overrides.borderBottom
        })
      }
    }, children);
  }

  render() {
    var {
      theme
    } = this.props;
    return theme ? _react.default.createElement(_styles.MuiThemeProvider, {
      theme: theme
    }, this.renderAppBar()) : this.renderAppBar();
  }

}

ToolBar.propTypes = {
  classes: _propTypes.default.object.isRequired,
  theme: _propTypes.default.object,
  autoStyle: _propTypes.default.bool,
  emphasize: _propTypes.default.bool,
  overrides: _propTypes.default.object,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  color: _propTypes.default.string,
  border: _propTypes.default.string,
  dense: _propTypes.default.bool,
  justify: _propTypes.default.string // start|center|end|between|around|evenly

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
  justify: "end"
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasToolBar"
})(ToolBar);

exports.default = _default;