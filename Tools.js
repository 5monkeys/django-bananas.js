"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var styles = function styles(theme) {
  return {
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      "& > * + *": {
        // Margin between nodes (buttons)
        marginLeft: theme.spacing.unit
      }
    }
  };
};

var Tools =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tools, _React$Component);

  function Tools() {
    _classCallCheck(this, Tools);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tools).apply(this, arguments));
  }

  _createClass(Tools, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          children = _this$props.children,
          className = _this$props.className;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(classes.root, className)
      }, children);
    }
  }]);

  return Tools;
}(_react.default.Component);

Tools.propTypes = {
  classes: _propTypes.default.object.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  className: _propTypes.default.string
};
Tools.defaultProps = {
  children: null,
  className: undefined
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasTools"
})(Tools);

exports.default = _default;