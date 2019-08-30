"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessagesController = exports.Messages = exports.Message = exports.default = void 0;

var _colors = require("@material-ui/core/colors");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _Snackbar = _interopRequireDefault(require("@material-ui/core/Snackbar"));

var _SnackbarContent = _interopRequireDefault(require("@material-ui/core/SnackbarContent"));

var _styles = require("@material-ui/core/styles");

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Error = _interopRequireDefault(require("@material-ui/icons/Error"));

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

var _Warning = _interopRequireDefault(require("@material-ui/icons/Warning"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var typeIcon = {
  success: _CheckCircle.default,
  warning: _Warning.default,
  error: _Error.default,
  info: _Info.default
};

var styles = theme => ({
  success: {
    backgroundColor: _colors.green[500]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: _colors.blue[500]
  },
  warning: {
    backgroundColor: _colors.amber[700]
  },
  icon: {
    fontSize: 20
  },
  icontype: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class Message extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      open: true
    });

    _defineProperty(this, "handleClose", (e, reason) => {
      if (reason === "clickaway") {
        return;
      }

      this.setState({
        open: false
      });
    });
  }

  render() {
    var {
      classes,
      message,
      id,
      type,
      remove
    } = this.props;
    var open = this.state.open && this.props.open;
    var Icon = typeIcon[type];
    return _react.default.createElement(_Snackbar.default, {
      key: message + id,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      },
      TransitionComponent: _Slide.default,
      onClose: this.handleClose,
      onExited: remove,
      open: open,
      autoHideDuration: type !== "error" ? 6000 : undefined // don't autohide errors.
      ,
      "data-testid": "Message"
    }, _react.default.createElement(_SnackbarContent.default, {
      className: classes[type],
      "aria-describedby": "client-snackbar",
      message: _react.default.createElement("span", {
        id: "client-snackbar",
        className: classes.message
      }, _react.default.createElement(Icon, {
        className: (0, _classnames.default)(classes.icon, classes.icontype)
      }), message),
      action: [_react.default.createElement(_IconButton.default, {
        key: "close",
        "aria-label": "Close",
        color: "inherit",
        className: classes.close,
        onClick: this.handleClose,
        "data-testid": "message-close-button"
      }, _react.default.createElement(_Close.default, {
        className: classes.icon
      }))]
    }));
  }

}

_defineProperty(Message, "propTypes", {
  classes: _propTypes.default.object.isRequired,
  message: _propTypes.default.node.isRequired,
  open: _propTypes.default.bool.isRequired,
  remove: _propTypes.default.func.isRequired,
  type: _propTypes.default.oneOf(["success", "warning", "error", "info"]).isRequired,
  id: _propTypes.default.number.isRequired
});

var BananasMessage = (0, _styles.withStyles)(styles, {
  name: "BananasMessage"
})(Message);
exports.Message = BananasMessage;

class Messages extends _react.default.Component {
  render() {
    var {
      classes,
      messages
    } = this.props;
    var snackbars = messages.map(msg => _react.default.createElement(BananasMessage, _extends({
      key: msg.id + msg.message
    }, msg)));
    return snackbars ? _react.default.createElement("div", {
      className: classes.root
    }, snackbars) : null;
  }

}

_defineProperty(Messages, "propTypes", {
  classes: _propTypes.default.object.isRequired,
  messages: _propTypes.default.array.isRequired
});

var BananasMessages = (0, _styles.withStyles)({
  root: {}
}, {
  name: "BananasMessages"
})(Messages);
exports.Messages = BananasMessages;

class MessagesController extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      messageIndex: 0,
      messages: []
    });
  }

  getUniqueMessageId() {
    var {
      messageIndex
    } = this.state;
    this.setState({
      messageIndex: messageIndex + 1
    });
    return messageIndex;
  }

  messageCloseHandler(id) {
    return () => {
      var updatedMessages = [...this.state.messages];
      var index = updatedMessages.findIndex(msg => id === msg.id);
      updatedMessages.splice(index, 1);
      this.setState({
        messages: updatedMessages
      });
    };
  }

  createMessage(_ref) {
    var {
      message,
      type
    } = _ref;
    var messages = [...this.state.messages];
    var id = this.getUniqueMessageId();
    messages.push({
      message,
      type,
      open: true,
      id,
      remove: this.messageCloseHandler(id)
    });
    this.setState({
      messages
    });
  }

  error(message) {
    this.createMessage({
      type: "error",
      message
    });
  }

  warning(message) {
    this.createMessage({
      type: "warning",
      message
    });
  }

  success(message) {
    this.createMessage({
      type: "success",
      message
    });
  }

  info(message) {
    this.createMessage({
      type: "info",
      message
    });
  }

  dismissMessages() {
    var openMessages = this.state.messages.filter(message => message.open);

    if (openMessages.length) {
      this.setState({
        messages: this.state.messages.map(message => message.open ? _objectSpread({}, message, {
          open: false
        }) : message)
      });
    }
  }

  render() {
    var {
      messages
    } = this.state;
    return _react.default.createElement(BananasMessages, {
      messages: messages
    });
  }

}

exports.MessagesController = MessagesController;

_defineProperty(MessagesController, "expose", ["success", "info", "warning", "error", "dismissMessages"]);

var _default = BananasMessages;
exports.default = _default;