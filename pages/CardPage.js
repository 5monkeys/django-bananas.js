"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Content = _interopRequireDefault(require("../Content"));

var _TitleBar = _interopRequireDefault(require("../TitleBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = () => ({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    minWidth: 400,
    maxWidth: 600
  }
});

var CardPage = (_ref) => {
  var {
    classes,
    children,
    title,
    subtitle
  } = _ref;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_TitleBar.default, {
    title: title
  }), _react.default.createElement(_Content.default, null, _react.default.createElement("div", {
    className: classes.root
  }, _react.default.createElement(_Card.default, {
    elevation: 5,
    className: classes.card
  }, _react.default.createElement(_CardContent.default, null, _react.default.createElement(_core.Typography, {
    variant: "h6",
    component: "h2"
  }, title), subtitle && _react.default.createElement(_core.Typography, {
    variant: "overline",
    gutterBottom: true
  }, subtitle), children)))));
};

CardPage.propTypes = {
  classes: _propTypes.default.object.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  title: _propTypes.default.string.isRequired,
  subtitle: _propTypes.default.string
};
CardPage.defaultProps = {
  subtitle: undefined
};

var _default = (0, _styles.withStyles)(styles)(CardPage);

exports.default = _default;