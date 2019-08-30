"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _styles = require("@material-ui/core/styles");

var _ChevronLeft = _interopRequireDefault(require("@material-ui/icons/ChevronLeft"));

var _Menu = _interopRequireDefault(require("@material-ui/icons/Menu"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    marginRight: "1px"
  }
});

var Hamburger = (_ref) => {
  var {
    classes,
    open,
    onToggle
  } = _ref;
  return _react.default.createElement("div", {
    className: classes.root
  }, open ? _react.default.createElement(_IconButton.default, {
    "aria-label": "Close drawer",
    color: "inherit",
    onClick: onToggle
  }, _react.default.createElement(_ChevronLeft.default, null)) : _react.default.createElement(_IconButton.default, {
    color: "inherit",
    "aria-label": "Open drawer",
    onClick: onToggle
  }, _react.default.createElement(_Menu.default, null)));
};

Hamburger.propTypes = {
  classes: _propTypes.default.object.isRequired,
  onToggle: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool
};
Hamburger.defaultProps = {
  open: false
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasHamburger"
})(Hamburger);

exports.default = _default;