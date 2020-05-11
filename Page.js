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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%"
  }
});

class ThemedPage extends _react.default.Component {
  render() {
    var _this$props = this.props,
        {
      theme
    } = _this$props,
        rest = _objectWithoutProperties(_this$props, ["theme"]);

    return theme ? _react.default.createElement(_styles.MuiThemeProvider, {
      theme: theme
    }, _react.default.createElement(BananasPage, rest)) : _react.default.createElement(BananasPage, rest);
  }

}

exports.Page = ThemedPage;

_defineProperty(ThemedPage, "propTypes", {
  controller: _propTypes.default.shape({
    current: _propTypes.default.object
  }).isRequired,
  component: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func, _propTypes.default.node]),
  theme: _propTypes.default.object
});

_defineProperty(ThemedPage, "defaultProps", {
  component: undefined,
  theme: undefined
});

class Page extends _react.default.Component {
  render() {
    var _this$props2 = this.props,
        {
      classes,
      controller,
      component: PageComponent
    } = _this$props2,
        pageProps = _objectWithoutProperties(_this$props2, ["classes", "controller", "component"]);

    return _react.default.createElement("div", {
      className: classes.root
    }, _react.default.createElement(PageLoadController, {
      ref: controller
    }), PageComponent && _react.default.createElement(_ErrorBoundary.default, {
      key: pageProps ? pageProps.key : undefined
    }, _react.default.createElement(PageComponent, pageProps)));
  }

}

_defineProperty(Page, "propTypes", {
  classes: _propTypes.default.object.isRequired,
  controller: _propTypes.default.shape({
    current: _propTypes.default.object
  }).isRequired,
  component: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.node])
});

_defineProperty(Page, "defaultProps", {
  component: undefined
});

class PageLoadController extends _react.default.Component {
  constructor(props) {
    super(props);
    this.meter = new _utils.MultiMeter();
  }

  progress() {
    var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var level = this.meter.step(on, "progress");
    this.forceUpdate();
    return level;
  }

  loading() {
    var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var level = this.meter.step(on, "loading");
    this.forceUpdate();
    return level;
  }

  render() {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ProgressBar.default, {
      loading: this.meter.read("progress")
    }), _react.default.createElement(_LoadingScreen.default, {
      loading: this.meter.read("loading"),
      role: "page",
      color: "default",
      backdrop: true
    }));
  }

}

exports.PageLoadController = PageLoadController;

_defineProperty(PageLoadController, "expose", ["progress", "loading"]);

var BananasPage = (0, _styles.withStyles)(styles, {
  name: "BananasPage"
})(Page);
var _default = ThemedPage;
exports.default = _default;