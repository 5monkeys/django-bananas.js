"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _styles = require("@material-ui/core/styles");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Container = _interopRequireDefault(require("./Container"));

var _themes = require("./themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  return {
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
  };
};

var ToolBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ToolBar, _React$Component);

  function ToolBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ToolBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ToolBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "makeTheme", function (propTheme, color) {
      return function (parentTheme) {
        var theme = propTheme || parentTheme;
        var primaryIsLight = (0, _colorManipulator.getLuminance)(theme.palette.primary.main) > 0.5;
        var secondaryIsLight = (0, _colorManipulator.getLuminance)(theme.palette.secondary.main) > 0.5; // Darker primary color

        var primary = color === "primary" && _this.props.emphasize ? {
          main: theme.palette.primary.dark,
          light: (0, _colorManipulator.lighten)(theme.palette.primary.main, theme.palette.tonalOffset * 2.0),
          dark: (0, _colorManipulator.darken)(theme.palette.primary.dark, theme.palette.tonalOffset * 1.5),
          contrastText: (0, _colorManipulator.getLuminance)(theme.palette.primary.dark) > 0.5 ? theme.palette.text.primary : theme.palette.common.white
        } : theme.palette.primary; // Darker secondary color

        var secondary = color === "secondary" && _this.props.emphasize ? {
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
        _this.theme = (0, _styles.createMuiTheme)((0, _themes.extendTheme)(theme, {
          palette: {
            primary: primary,
            secondary: secondary
          },
          overrides: overrides
        }));
        return _this.theme;
      };
    });

    return _this;
  }

  _createClass(ToolBar, [{
    key: "getTheme",
    value: function getTheme() {
      if (!this.theme) {
        var _this$props = this.props,
            theme = _this$props.theme,
            color = _this$props.color;
        return this.makeTheme(theme, color).bind(this);
      }

      return this.theme;
    }
  }, {
    key: "renderAppBar",
    value: function renderAppBar() {
      var _classNames, _classNames2;

      var _this$props2 = this.props,
          classes = _this$props2.classes,
          theme = _this$props2.theme,
          autoStyle = _this$props2.autoStyle,
          emphasize = _this$props2.emphasize,
          overrides = _this$props2.overrides,
          children = _this$props2.children,
          color = _this$props2.color,
          border = _this$props2.border,
          dense = _this$props2.dense,
          justify = _this$props2.justify,
          rest = _objectWithoutProperties(_this$props2, ["classes", "theme", "autoStyle", "emphasize", "overrides", "children", "color", "border", "dense", "justify"]);

      return _react.default.createElement(_AppBar.default, _extends({
        elevation: 0,
        position: "relative",
        color: color !== "paper" ? color : undefined,
        classes: {
          root: (0, _classnames.default)(classes.root, overrides.root, (_classNames = {}, _defineProperty(_classNames, classes.colorPrimary, color === "primary"), _defineProperty(_classNames, classes.colorSecondary, color === "secondary"), _defineProperty(_classNames, classes.colorPaper, color === "paper"), _classNames), (_classNames2 = {}, _defineProperty(_classNames2, overrides.colorPrimary, overrides.colorPrimary), _defineProperty(_classNames2, overrides.colorSecondary, overrides.colorSecondary), _defineProperty(_classNames2, overrides.colorPaper, overrides.colorPaper), _classNames2))
        }
      }, rest), _react.default.createElement(_Container.default, null, autoStyle ? _react.default.createElement(_styles.MuiThemeProvider, {
        theme: this.getTheme()
      }, this.renderToolbar()) : this.renderToolbar()));
    }
  }, {
    key: "renderToolbar",
    value: function renderToolbar() {
      var _classNames3, _classNames4;

      var _this$props3 = this.props,
          classes = _this$props3.classes,
          overrides = _this$props3.overrides,
          children = _this$props3.children,
          border = _this$props3.border,
          dense = _this$props3.dense,
          justify = _this$props3.justify;
      return _react.default.createElement(_Toolbar.default, {
        variant: dense ? "dense" : "regular",
        classes: {
          gutters: classes.toolbarGutters,
          root: (0, _classnames.default)(classes.toolbar, overrides.toolbar, (_classNames3 = {}, _defineProperty(_classNames3, classes.justifyStart, justify === "start"), _defineProperty(_classNames3, classes.justifyCenter, justify === "center"), _defineProperty(_classNames3, classes.justifyEnd, justify === "end"), _defineProperty(_classNames3, classes.justifyBetween, justify === "between"), _defineProperty(_classNames3, classes.justifyAround, justify === "around"), _defineProperty(_classNames3, classes.justifyEvenly, justify === "evenly"), _defineProperty(_classNames3, classes.borderTop, border === "top"), _defineProperty(_classNames3, classes.borderBottom, border === "bottom"), _classNames3), (_classNames4 = {}, _defineProperty(_classNames4, overrides.borderTop, overrides.borderTop), _defineProperty(_classNames4, overrides.borderBottom, overrides.borderBottom), _classNames4))
        }
      }, children);
    }
  }, {
    key: "render",
    value: function render() {
      var theme = this.props.theme;
      return theme ? _react.default.createElement(_styles.MuiThemeProvider, {
        theme: theme
      }, this.renderAppBar()) : this.renderAppBar();
    }
  }]);

  return ToolBar;
}(_react.default.Component);

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