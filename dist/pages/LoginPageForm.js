"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _context = _interopRequireDefault(require("../context"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles() {
  return {
    submit: {
      boxShadow: "none"
    }
  };
};

var DialogContent = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      margin: 0,
      padding: theme.spacing.unit * 2,
      "& > * + * ": {
        marginTop: theme.spacing.unit * 2
      }
    }
  };
})(_DialogContent.default);
var DialogActions = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      borderTop: "1px solid ".concat(theme.palette.divider),
      margin: 0,
      padding: theme.spacing.unit
    }
  };
})(_DialogActions.default);

var LoginForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoginForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoginForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmit", function (e) {
      e.preventDefault();
      var admin = _this.context.admin;
      var _this$state = _this.state,
          username = _this$state.username,
          password = _this$state.password;
      var logger = _this.props.logger;
      admin.login(username, password).catch(function (error) {
        logger.debug("Login Failed", error.response, error);

        _this.context.admin.error((0, _.t)("Unable to log in with provided credentials."));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "save", function (e) {
      var s = _objectSpread({}, _this.state);

      s[e.target.name] = e.target.value;

      _this.setState(_objectSpread({}, s));
    });

    return _this;
  }

  _createClass(LoginForm, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      var api = this.context.api;
      var endpoint = api["bananas.login:create"];
      var schema = endpoint.schema.data;
      return _react.default.createElement("form", {
        onSubmit: this.onSubmit
      }, _react.default.createElement(DialogContent, null, _react.default.createElement(_TextField.default, {
        autoFocus: true,
        fullWidth: true,
        label: schema.username.title,
        name: "username",
        type: "text",
        onChange: this.save,
        inputProps: {
          "aria-label": "Username"
        }
      }), _react.default.createElement(_TextField.default, {
        fullWidth: true,
        label: schema.password.title,
        name: "password",
        type: "password",
        onChange: this.save,
        inputProps: {
          "aria-label": "Password"
        }
      })), _react.default.createElement(DialogActions, null, _react.default.createElement(_Button.default, {
        variant: "contained",
        type: "submit",
        color: "primary",
        "aria-label": "login",
        classes: {
          contained: classes.submit
        }
      }, (0, _.t)("Log in"))));
    }
  }]);

  return LoginForm;
}(_react.default.Component);

_defineProperty(LoginForm, "contextType", _context.default);

LoginForm.propTypes = {
  classes: _propTypes.default.object.isRequired,
  logger: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasLoginForm"
})(LoginForm);

exports.default = _default;