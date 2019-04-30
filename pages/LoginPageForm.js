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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = () => ({
  submit: {
    boxShadow: "none"
  }
});

const DialogContent = (0, _styles.withStyles)(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    "& > * + * ": {
      marginTop: theme.spacing.unit * 2
    }
  }
}))(_DialogContent.default);
const DialogActions = (0, _styles.withStyles)(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(_DialogActions.default);

class LoginForm extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {});

    _defineProperty(this, "onSubmit", e => {
      e.preventDefault();
      const admin = this.context.admin;
      const _this$state = this.state,
            username = _this$state.username,
            password = _this$state.password;
      const logger = this.props.logger;
      admin.login(username, password).catch(error => {
        logger.debug("Login Failed", error.response, error);
        this.context.admin.error((0, _.t)("Unable to log in with provided credentials."));
      });
    });

    _defineProperty(this, "save", e => {
      const s = _objectSpread({}, this.state);

      s[e.target.name] = e.target.value;
      this.setState(_objectSpread({}, s));
    });
  }

  render() {
    const classes = this.props.classes;
    const api = this.context.api;
    const endpoint = api["bananas.login:create"];
    const schema = endpoint.schema.data;
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

}

_defineProperty(LoginForm, "contextType", _context.default);

LoginForm.propTypes = {
  classes: _propTypes.default.object.isRequired,
  logger: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasLoginForm"
})(LoginForm);

exports.default = _default;