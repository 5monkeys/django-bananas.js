"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageLoadController = exports.Page = exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ErrorBoundary = _interopRequireDefault(require("./ErrorBoundary"));

var _LoadingScreen = _interopRequireDefault(require("./LoadingScreen"));

var _ProgressBar = _interopRequireDefault(require("./ProgressBar"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var styles = function styles(theme) {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      width: "100%",
      height: "100%"
    }
  };
};

var ThemedPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ThemedPage, _React$Component);

  function ThemedPage() {
    _classCallCheck(this, ThemedPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(ThemedPage).apply(this, arguments));
  }

  _createClass(ThemedPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          rest = _objectWithoutProperties(_this$props, ["theme"]);

      return theme ? _react.default.createElement(_styles.MuiThemeProvider, {
        theme: theme
      }, _react.default.createElement(BananasPage, rest)) : _react.default.createElement(BananasPage, rest);
    }
  }]);

  return ThemedPage;
}(_react.default.Component);

exports.Page = ThemedPage;

_defineProperty(ThemedPage, "propTypes", {
  controller: _propTypes.default.shape({
    current: _propTypes.default.object
  }).isRequired,
  component: _propTypes.default.func,
  theme: _propTypes.default.object
});

_defineProperty(ThemedPage, "defaultProps", {
  component: undefined,
  theme: undefined
});

var Page =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Page, _React$Component2);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));
  }

  _createClass(Page, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          controller = _this$props2.controller,
          PageComponent = _this$props2.component,
          pageProps = _objectWithoutProperties(_this$props2, ["classes", "controller", "component"]);

      return _react.default.createElement("div", {
        className: classes.root
      }, _react.default.createElement(PageLoadController, {
        ref: controller
      }), PageComponent && _react.default.createElement(_ErrorBoundary.default, {
        key: pageProps ? pageProps.key : undefined
      }, _react.default.createElement(PageComponent, pageProps)));
    }
  }]);

  return Page;
}(_react.default.Component);

_defineProperty(Page, "propTypes", {
  classes: _propTypes.default.object.isRequired,
  controller: _propTypes.default.shape({
    current: _propTypes.default.object
  }).isRequired,
  component: _propTypes.default.func
});

_defineProperty(Page, "defaultProps", {
  component: undefined
});

var PageLoadController =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(PageLoadController, _React$Component3);

  function PageLoadController(props) {
    var _this;

    _classCallCheck(this, PageLoadController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PageLoadController).call(this, props));
    _this.meter = new _utils.MultiMeter();
    return _this;
  }

  _createClass(PageLoadController, [{
    key: "progress",
    value: function progress() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var level = this.meter.step(on, "progress");
      this.forceUpdate();
      return level;
    }
  }, {
    key: "loading",
    value: function loading() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var level = this.meter.step(on, "loading");
      this.forceUpdate();
      return level;
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ProgressBar.default, {
        loading: this.meter.read("progress")
      }), _react.default.createElement(_LoadingScreen.default, {
        loading: this.meter.read("loading"),
        role: "page",
        color: "default",
        backdrop: true
      }));
    }
  }]);

  return PageLoadController;
}(_react.default.Component);

exports.PageLoadController = PageLoadController;

_defineProperty(PageLoadController, "expose", ["progress", "loading"]);

var BananasPage = (0, _styles.withStyles)(styles, {
  name: "BananasPage"
})(Page);
var _default = ThemedPage;
exports.default = _default;