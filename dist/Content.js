"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _jsLogger = _interopRequireDefault(require("js-logger"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Container = _interopRequireDefault(require("./Container"));

var _context = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = _jsLogger.default.get("bananas");

var styles = function styles(theme) {
  return {
    root: {
      position: "relative",
      flexGrow: 1
    },
    scroll: {
      position: "absolute",
      overflowY: "auto",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    },
    padded: {
      padding: theme.spacing.unit * 3
    }
  };
};

var Content =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Content, _React$Component);

  function Content(props) {
    var _this;

    _classCallCheck(this, Content);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Content).call(this, props));
    _this.scrollElement = _react.default.createRef();
    return _this;
  }

  _createClass(Content, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var router = this.context ? this.context.router : null;

      if (router) {
        // Listen to routeWillUpdate event to persist current scroll position
        this.unlisten = router.on("routeWillUpdate", this.routeWillUpdate.bind(this)); // Restore scroll position from history state

        var scroll = router.history.location.state.scroll;
        var current = this.scrollElement.current;

        if (current && scroll) {
          logger.debug("Restoring scroll position:", scroll);
          current.scrollTop = scroll;
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Unlisten to routeWillUpdate event
      if (this.unlisten) {
        this.unlisten();
      }
    }
  }, {
    key: "routeWillUpdate",
    value: function routeWillUpdate(location, action) {
      /*
       * Persist current scroll position, if element is scrolled.
       */
      var router = this.context ? this.context.router : null;

      if (!router || action === "REPLACE") {
        return;
      }

      var current = this.scrollElement.current;
      var oldScroll = router.history.location.state.scroll;

      if (current && (current.scrollTop > 0 || current.scrollTop !== oldScroll)) {
        var scrollTop = current.scrollTop;
        logger.debug("Updating history with scroll position:", scrollTop);
        router.updateState({
          scroll: scrollTop
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          children = _this$props.children,
          disablePadding = _this$props.disablePadding,
          contained = _this$props.contained,
          rest = _objectWithoutProperties(_this$props, ["classes", "children", "disablePadding", "contained"]);

      return _react.default.createElement("div", {
        className: (0, _classnames.default)(classes.root)
      }, _react.default.createElement("div", {
        ref: this.scrollElement,
        className: classes.scroll
      }, contained ? _react.default.createElement(_Container.default, null, _react.default.createElement("div", _extends({
        className: (0, _classnames.default)(_defineProperty({}, classes.padded, !disablePadding))
      }, rest), children)) : _react.default.createElement("div", _extends({
        className: (0, _classnames.default)(_defineProperty({}, classes.padded, !disablePadding))
      }, rest), children)));
    }
  }]);

  return Content;
}(_react.default.Component);

_defineProperty(Content, "contextType", _context.default);

Content.propTypes = {
  classes: _propTypes.default.object.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node, _propTypes.default.string]),
  disablePadding: _propTypes.default.bool,
  contained: _propTypes.default.bool
};
Content.defaultProps = {
  children: null,
  disablePadding: false,
  contained: true
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasContent"
})(Content);

exports.default = _default;