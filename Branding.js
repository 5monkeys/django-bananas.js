"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Logo = _interopRequireDefault(require("./Logo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = () => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  fullWidth: {
    width: "100%"
  },
  button: {
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    padding: 0
  },
  smallText: {},
  extra: {
    marginLeft: 10,
    "& > *": {
      textAlign: "left",
      fontSize: "0.75rem",
      display: "block",
      lineHeight: "1em"
    }
  },
  textLogo: {
    fontWeight: "bold"
  }
});

function Branding(_ref) {
  var {
    classes,
    className,
    logo,
    title,
    subtitle,
    version,
    onClick,
    fullWidth
  } = _ref;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(classes.root, {
      [classes.fullWidth]: fullWidth
    })
  }, _react.default.createElement(_core.ButtonBase, {
    className: (0, _classnames.default)(classes.button, className),
    color: "inherit",
    onClick: onClick
  }, logo ? _react.default.createElement(_Logo.default, {
    src: logo
  }) : _react.default.createElement(_core.Typography, {
    color: "inherit",
    variant: "h4",
    className: classes.textLogo
  }, title), _react.default.createElement("div", {
    className: classes.extra
  }, _react.default.createElement(_core.Typography, {
    color: "inherit"
  }, subtitle), _react.default.createElement(_core.Typography, {
    color: "inherit"
  }, version))));
}

Branding.propTypes = {
  classes: _propTypes.default.object.isRequired,
  className: _propTypes.default.string,
  logo: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.node]),
  title: _propTypes.default.string,
  subtitle: _propTypes.default.string,
  version: _propTypes.default.string,
  onClick: _propTypes.default.func.isRequired,
  fullWidth: _propTypes.default.bool
};
Branding.defaultProps = {
  className: undefined,
  logo: true,
  fullWidth: true,
  title: "",
  subtitle: "",
  version: ""
};

var _default = (0, _styles.withStyles)(styles)(Branding);

exports.default = _default;