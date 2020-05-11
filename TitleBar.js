"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _styles = require("@material-ui/core/styles");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ChevronLeft = _interopRequireDefault(require("@material-ui/icons/ChevronLeft"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Link = _interopRequireDefault(require("./Link"));

var _ToolBar = _interopRequireDefault(require("./ToolBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var styles = theme => ({
  root: {},
  colorPrimary: {},
  colorSecondary: {},
  colorPaper: {},
  titleRoot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: theme.spacing(2)
  },
  title: {
    flexGrow: 0,
    flexShrink: 0
  },
  back: {
    marginLeft: -theme.spacing(2),
    marginRight: theme.spacing(2),
    boxShadow: "none",
    borderWidth: "1.5pt",
    borderStyle: "solid",
    borderColor: theme.palette.primary.contrastText,
    backgroundColor: "transparent",
    "&:hover, &:active": {
      boxShadow: "none"
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  }
});

var TitleBar = (_ref) => {
  var {
    classes,
    theme,
    overrides,
    children,
    color,
    title,
    back,
    dense,
    justify
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["classes", "theme", "overrides", "children", "color", "title", "back", "dense", "justify"]);

  var backLinkProps = back && back.indexOf(":") > 0 ? {
    route: back
  } : {
    path: back
  }; // Determine primary background is overridden, don't emphasize tools if so

  var primaryIsOverridden = theme.overrides && theme.overrides.BananasTitleBar && theme.overrides.BananasTitleBar.colorPrimary && (theme.overrides.BananasTitleBar.colorPrimary.background && theme.overrides.BananasTitleBar.colorPrimary.background !== theme.palette.primary.main || theme.overrides.BananasTitleBar.colorPrimary.background && theme.overrides.BananasTitleBar.colorPrimary.background !== theme.palette.primary.main);
  var emphasize = color === "primary" ? !primaryIsOverridden : true;
  return _react.default.createElement(_ToolBar.default, _extends({
    color: color,
    emphasize: emphasize,
    justify: justify,
    dense: dense,
    overrides: _objectSpread({}, overrides, {
      root: (0, _classnames.default)(classes.root, overrides.root),
      colorPrimary: color === "primary" && (0, _classnames.default)(classes.colorPrimary, overrides.colorPrimary),
      colorSecondary: color === "secondary" && (0, _classnames.default)(classes.colorSecondary, overrides.colorSecondary),
      colorPaper: color === "paper" && (0, _classnames.default)(classes.colorPaper, overrides.colorPaper)
    })
  }, rest), _react.default.createElement("div", {
    className: classes.titleRoot
  }, back && _react.default.createElement(_Link.default, _extends({
    patch: true
  }, backLinkProps), _react.default.createElement(_Fab.default, {
    color: "primary",
    size: "small",
    className: classes.back,
    "aria-label": "Back"
  }, _react.default.createElement(_ChevronLeft.default, null))), title && _react.default.createElement(_Typography.default, {
    component: "h1",
    variant: dense ? "subtitle1" : "h6",
    color: "inherit",
    className: (0, _classnames.default)(classes.title, {
      [overrides.title]: overrides.title
    })
  }, title)), children);
};

TitleBar.propTypes = {
  classes: _propTypes.default.object.isRequired,
  theme: _propTypes.default.object.isRequired,
  overrides: _propTypes.default.object,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  color: _propTypes.default.string,
  title: _propTypes.default.string,
  back: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  dense: _propTypes.default.bool,
  justify: _propTypes.default.string // start|center|end|between|around|evenly

};
TitleBar.defaultProps = {
  overrides: {},
  children: null,
  color: "primary",
  title: undefined,
  back: false,
  dense: false,
  justify: "between"
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasTitleBar"
})((0, _styles.withTheme)(TitleBar));

exports.default = _default;