"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessagesController = exports.Messages = exports.Message = exports.default = void 0;

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Snackbar = _interopRequireDefault(require("@material-ui/core/Snackbar"));

var _SnackbarContent = _interopRequireDefault(require("@material-ui/core/SnackbarContent"));

var _colors = require("@material-ui/core/colors");

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var typeIcon = {
  success: _CheckCircle.default,
  warning: _Warning.default,
  error: _Error.default,
  info: _Info.default
};

var styles = function styles(theme) {
  return {
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
      marginRight: theme.spacing.unit
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  };
};

var Message =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Message, _React$Component);

  function Message() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Message);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Message)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      open: true
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function (e, reason) {
      if (_this.props.type === "error" && reason === "clickaway") {
        return;
      }

      _this.setState({
        open: false
      });
    });

    return _this;
  }

  _createClass(Message, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          message = _this$props.message,
          id = _this$props.id,
          type = _this$props.type,
          remove = _this$props.remove;
      var open = this.state.open && this.props.open;
      var Icon = typeIcon[type];
      return _react.default.createElement(_Snackbar.default, {
        key: message + id,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        },
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
  }]);

  return Message;
}(_react.default.Component);

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

var Messages =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Messages, _React$Component2);

  function Messages() {
    _classCallCheck(this, Messages);

    return _possibleConstructorReturn(this, _getPrototypeOf(Messages).apply(this, arguments));
  }

  _createClass(Messages, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          messages = _this$props2.messages;
      var snackbars = messages.map(function (msg) {
        return _react.default.createElement(BananasMessage, _extends({
          key: msg.id + msg.message
        }, msg));
      });
      return snackbars ? _react.default.createElement("div", {
        className: classes.root
      }, snackbars) : null;
    }
  }]);

  return Messages;
}(_react.default.Component);

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

var MessagesController =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(MessagesController, _React$Component3);

  function MessagesController() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, MessagesController);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(MessagesController)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      messageIndex: 0,
      messages: []
    });

    return _this2;
  }

  _createClass(MessagesController, [{
    key: "getUniqueMessageId",
    value: function getUniqueMessageId() {
      var messageIndex = this.state.messageIndex;
      this.setState({
        messageIndex: messageIndex + 1
      });
      return messageIndex;
    }
  }, {
    key: "messageCloseHandler",
    value: function messageCloseHandler(id) {
      var _this3 = this;

      return function () {
        var updatedMessages = _toConsumableArray(_this3.state.messages);

        var index = updatedMessages.findIndex(function (msg) {
          return id === msg.id;
        });
        updatedMessages.splice(index, 1);

        _this3.setState({
          messages: updatedMessages
        });
      };
    }
  }, {
    key: "createMessage",
    value: function createMessage(_ref) {
      var message = _ref.message,
          type = _ref.type;

      var messages = _toConsumableArray(this.state.messages);

      var id = this.getUniqueMessageId();
      messages.push({
        message: message,
        type: type,
        open: true,
        id: id,
        remove: this.messageCloseHandler(id)
      });
      this.setState({
        messages: messages
      });
    }
  }, {
    key: "error",
    value: function error(message) {
      this.createMessage({
        type: "error",
        message: message
      });
    }
  }, {
    key: "warning",
    value: function warning(message) {
      this.createMessage({
        type: "warning",
        message: message
      });
    }
  }, {
    key: "success",
    value: function success(message) {
      this.createMessage({
        type: "success",
        message: message
      });
    }
  }, {
    key: "info",
    value: function info(message) {
      this.createMessage({
        type: "info",
        message: message
      });
    }
  }, {
    key: "dismissMessages",
    value: function dismissMessages() {
      var openMessages = this.state.messages.filter(function (message) {
        return message.open;
      });

      if (openMessages.length) {
        this.setState({
          messages: this.state.messages.map(function (message) {
            return message.open ? _objectSpread({}, message, {
              open: false
            }) : message;
          })
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var messages = this.state.messages;
      return _react.default.createElement(BananasMessages, {
        messages: messages
      });
    }
  }]);

  return MessagesController;
}(_react.default.Component);

exports.MessagesController = MessagesController;

_defineProperty(MessagesController, "expose", ["success", "info", "warning", "error", "dismissMessages"]);

var _default = BananasMessages;
exports.default = _default;