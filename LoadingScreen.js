"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _Fade = _interopRequireDefault(require("@material-ui/core/Fade"));

var _styles = require("@material-ui/core/styles");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Logo = _interopRequireDefault(require("./Logo"));

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

var styles = function styles(theme) {
  return {
    root: {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    backdrop: {
      position: "absolute",
      zIndex: 2000,
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.background.default, 0.666)
    },
    backdropPrimary: {
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.primary.main, 0.666)
    },
    backdropSecondary: {
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.secondary.main, 0.666)
    },
    backdropPaper: {
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.background.paper, 0.666)
    },
    spinner: {
      color: theme.palette.primary.main
    },
    spinnerContrast: {
      color: theme.palette.primary.contrastText
    },
    logo: {
      position: "absolute",
      margin: 0,
      marginTop: -36 - theme.spacing.unit * 3
    }
  };
};

var LoadingScreen =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoadingScreen, _React$Component);

  function LoadingScreen() {
    _classCallCheck(this, LoadingScreen);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadingScreen).apply(this, arguments));
  }

  _createClass(LoadingScreen, [{
    key: "renderScreen",
    value: function renderScreen() {
      var _classNames;

      var _this$props = this.props,
          classes = _this$props.classes,
          loading = _this$props.loading,
          color = _this$props.color,
          logo = _this$props.logo,
          backdrop = _this$props.backdrop,
          role = _this$props.role,
          rest = _objectWithoutProperties(_this$props, ["classes", "loading", "color", "logo", "backdrop", "role"]);

      return _react.default.createElement("div", {
        "data-testid": role,
        className: (0, _classnames.default)(classes.root, (_classNames = {}, _defineProperty(_classNames, classes.backdrop, backdrop), _defineProperty(_classNames, classes.backdropPrimary, backdrop && color === "primary"), _defineProperty(_classNames, classes.backdropSecondary, backdrop && color === "secondary"), _defineProperty(_classNames, classes.backdropPaper, backdrop && color === "paper"), _classNames))
      }, _react.default.createElement("div", {
        className: classes.logo
      }, logo && _react.default.createElement(_Logo.default, {
        src: logo
      })), loading && _react.default.createElement(_CircularProgress.default, _extends({}, rest, {
        className: (0, _classnames.default)(classes.spinner, _defineProperty({}, classes.spinnerContrast, !color))
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          loading = _this$props2.loading,
          backdrop = _this$props2.backdrop;
      return backdrop ? _react.default.createElement(_Fade.default, {
        in: loading,
        timeout: {
          enter: 750,
          exit: 250
        },
        mountOnEnter: true,
        unmountOnExit: true
      }, this.renderScreen()) : this.renderScreen();
    }
  }]);

  return LoadingScreen;
}(_react.default.Component);

_defineProperty(LoadingScreen, "propTypes", {
  classes: _propTypes.default.object.isRequired,
  loading: _propTypes.default.bool,
  color: _propTypes.default.string,
  logo: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.node]),
  backdrop: _propTypes.default.bool,
  role: _propTypes.default.string
});

_defineProperty(LoadingScreen, "defaultProps", {
  loading: true,
  color: undefined,
  logo: undefined,
  backdrop: false,
  role: undefined
});

var BananasLoadingScreen = (0, _styles.withStyles)(styles, {
  name: "BananasLoadingScreen"
})(LoadingScreen);
var _default = BananasLoadingScreen;
exports.default = _default;