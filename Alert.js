"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertController = exports.Alert = exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogContentText = _interopRequireDefault(require("@material-ui/core/DialogContentText"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var styles = function styles(theme) {
  return {
    root: {},
    agree: {},
    dismiss: {
      color: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.action.hover
      }
    }
  };
};

var Transition = function Transition(props) {
  return _react.default.createElement(_Slide.default, _extends({
    direction: "down"
  }, props));
};

var Alert =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Alert, _React$Component);

  function Alert() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Alert);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Alert)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onAgree", function () {
      var _this$props = _this.props,
          onClose = _this$props.onClose,
          onAgree = _this$props.onAgree;

      if (onClose) {
        onClose();
      }

      if (onAgree) {
        onAgree();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDismiss", function () {
      var _this$props2 = _this.props,
          onClose = _this$props2.onClose,
          onDismiss = _this$props2.onDismiss;

      if (onClose) {
        onClose();
      }

      if (onDismiss) {
        onDismiss();
      }
    });

    return _this;
  }

  _createClass(Alert, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          classes = _this$props3.classes,
          open = _this$props3.open,
          title = _this$props3.title,
          message = _this$props3.message,
          agree = _this$props3.agree,
          dismiss = _this$props3.dismiss,
          keepMounted = _this$props3.keepMounted;
      return _react.default.createElement(_Dialog.default, {
        open: open,
        fullWidth: true,
        TransitionComponent: Transition,
        keepMounted: keepMounted,
        onClose: this.onDismiss,
        "aria-labelledby": "alert-dialog-slide-title",
        "aria-describedby": "alert-dialog-slide-description",
        classes: {
          root: classes.root
        }
      }, title && _react.default.createElement(_DialogTitle.default, {
        id: "alert-dialog-slide-title"
      }, title), message && _react.default.createElement(_DialogContent.default, null, _react.default.createElement(_DialogContentText.default, {
        id: "alert-dialog-slide-description"
      }, message)), _react.default.createElement(_DialogActions.default, null, dismiss && _react.default.createElement(_Button.default, {
        onClick: this.onDismiss,
        color: "secondary",
        classes: {
          textSecondary: classes.dismiss
        }
      }, typeof dismiss === "boolean" ? "Cancel" : dismiss), agree && _react.default.createElement(_Button.default, {
        onClick: this.onAgree,
        color: "primary",
        classes: {
          textPrimary: classes.agree
        }
      }, typeof agree === "boolean" ? "Ok" : agree)));
    }
  }]);

  return Alert;
}(_react.default.Component);

_defineProperty(Alert, "propTypes", {
  classes: _propTypes.default.object.isRequired,
  open: _propTypes.default.bool,
  title: _propTypes.default.string,
  message: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
  agree: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  dismiss: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  onAgree: _propTypes.default.func,
  onDismiss: _propTypes.default.func,
  onClose: _propTypes.default.func,
  keepMounted: _propTypes.default.bool
});

_defineProperty(Alert, "defaultProps", {
  open: true,
  title: null,
  message: null,
  agree: true,
  dismiss: true,
  onAgree: undefined,
  onDismiss: undefined,
  onClose: undefined,
  keepMounted: true
});

var BananasAlert = (0, _styles.withStyles)(styles, {
  name: "BananasAlert"
})(Alert);
exports.Alert = BananasAlert;

var AlertController =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(AlertController, _React$Component2);

  function AlertController() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, AlertController);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(AlertController)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      open: false
    });

    return _this2;
  }

  _createClass(AlertController, [{
    key: "alert",
    value: function alert(props) {
      var state = typeof props === "string" ? {
        message: props,
        dismiss: false
      } : props;
      this.setState(_objectSpread({}, state, {
        open: true
      }));
    }
  }, {
    key: "confirm",
    value: function confirm(props) {
      /* Texts from Django admin translation messages, please don't change */
      var confirm = _objectSpread({
        title: (0, _.t)("Are you sure?"),
        agree: (0, _.t)("Yes, I'm sure"),
        dismiss: (0, _.t)("No, take me back")
      }, typeof props === "string" ? {
        message: props
      } : props);

      this.alert(confirm);
    }
  }, {
    key: "dismissModal",
    value: function dismissModal() {
      this.setState(_objectSpread({}, this.state.alert, {
        open: false
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(BananasAlert, _extends({}, this.state, {
        onClose: this.dismissModal.bind(this)
      }));
    }
  }]);

  return AlertController;
}(_react.default.Component);

exports.AlertController = AlertController;

_defineProperty(AlertController, "expose", ["alert", "confirm", "dismissModal"]);

var _default = BananasAlert;
exports.default = _default;