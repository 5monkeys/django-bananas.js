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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const styles = theme => ({
  root: {},
  agree: {},
  dismiss: {
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  }
});

const Transition = props => _react.default.createElement(_Slide.default, _extends({
  direction: "down"
}, props));

class Alert extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "onAgree", () => {
      const _this$props = this.props,
            onClose = _this$props.onClose,
            onAgree = _this$props.onAgree;

      if (onClose) {
        onClose();
      }

      if (onAgree) {
        onAgree();
      }
    });

    _defineProperty(this, "onDismiss", () => {
      const _this$props2 = this.props,
            onClose = _this$props2.onClose,
            onDismiss = _this$props2.onDismiss;

      if (onClose) {
        onClose();
      }

      if (onDismiss) {
        onDismiss();
      }
    });
  }

  render() {
    const _this$props3 = this.props,
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

}

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

const BananasAlert = (0, _styles.withStyles)(styles, {
  name: "BananasAlert"
})(Alert);
exports.Alert = BananasAlert;

class AlertController extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      open: false
    });
  }

  alert(props) {
    const state = typeof props === "string" ? {
      message: props,
      dismiss: false
    } : props;
    this.setState(_objectSpread({}, state, {
      open: true
    }));
  }

  confirm(props) {
    /* Texts from Django admin translation messages, please don't change */
    const confirm = _objectSpread({
      title: (0, _.t)("Are you sure?"),
      agree: (0, _.t)("Yes, I'm sure"),
      dismiss: (0, _.t)("No, take me back")
    }, typeof props === "string" ? {
      message: props
    } : props);

    this.alert(confirm);
  }

  dismissModal() {
    this.setState(_objectSpread({}, this.state.alert, {
      open: false
    }));
  }

  render() {
    return _react.default.createElement(BananasAlert, _extends({}, this.state, {
      onClose: this.dismissModal.bind(this)
    }));
  }

}

exports.AlertController = AlertController;

_defineProperty(AlertController, "expose", ["alert", "confirm", "dismissModal"]);

var _default = BananasAlert;
exports.default = _default;