"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _jsLogger = _interopRequireDefault(require("js-logger"));

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

var logger = _jsLogger.default.get("bananas");

var styles = function styles(theme) {
  return {
    root: {
      maxWidth: 350
    },
    formLabel: {
      marginBottom: theme.spacing.unit * 2
    },
    formControlNormal: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: 0
    },
    field: {
      marginTop: theme.spacing.unit * 3
    }
  };
};

var ChangePasswordForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ChangePasswordForm, _React$Component);

  function ChangePasswordForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ChangePasswordForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChangePasswordForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      errors: null,
      touched: false,
      old_password: "",
      new_password1: "",
      new_password2: ""
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (e) {
      var _objectSpread2;

      _this.setState(_objectSpread({}, _this.state, (_objectSpread2 = {}, _defineProperty(_objectSpread2, e.target.name, e.target.value), _defineProperty(_objectSpread2, "touched", true), _objectSpread2)));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmit", function (e) {
      e.preventDefault();
      var _this$context = _this.context,
          api = _this$context.api,
          admin = _this$context.admin;
      var _this$state = _this.state,
          old_password = _this$state.old_password,
          new_password1 = _this$state.new_password1,
          new_password2 = _this$state.new_password2;
      admin.dismissMessages();
      api["bananas.change_password:create"]({
        data: {
          old_password: old_password,
          new_password1: new_password1,
          new_password2: new_password2
        }
      }).then(function () {
        admin.success((0, _.t)("Password changed successfully."));

        _this.setState({
          touched: false,
          errors: null,
          old_password: "",
          new_password1: "",
          new_password2: ""
        });
      }, function (error) {
        logger.error("Failed to change password", error.response);
        admin.error((0, _.t)("Incorrect authentication credentials."));

        _this.setState({
          errors: error.response.obj,
          touched: false
        });
      });
    });

    return _this;
  }

  _createClass(ChangePasswordForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;
      var api = this.context.api;
      var endpoint = api["bananas.change_password:create"];
      var schema = endpoint.schema.data;
      var _this$state2 = this.state,
          errors = _this$state2.errors,
          touched = _this$state2.touched,
          old_password = _this$state2.old_password,
          new_password1 = _this$state2.new_password1,
          new_password2 = _this$state2.new_password2;
      var passwordCheckError = new_password2 !== "" && new_password2 !== new_password1;
      var filled = [old_password, new_password1, new_password2].every(function (value) {
        return value.length > 0;
      });
      return _react.default.createElement("form", {
        onSubmit: this.onSubmit,
        className: classes.root,
        "data-testid": "change-password-form"
      }, _react.default.createElement(_core.FormLabel, {
        component: "legend",
        classes: {
          root: classes.formLabel
        }
      }, endpoint.title), _react.default.createElement(_.Translate, null, "Please enter your old password, for security's sake, and then enter your new password twice so we can verify you typed it in correctly."), _react.default.createElement(_core.FormControl, {
        fullWidth: true,
        component: "fieldset"
      }, _react.default.createElement(_core.FormGroup, null, ["old_password", "new_password1", "new_password2"].map(function (field) {
        return _react.default.createElement(_core.TextField, {
          key: field,
          autoComplete: field,
          classes: {
            root: classes.field
          },
          label: schema[field].title,
          inputProps: {
            "aria-label": schema[field].title
          },
          error: Boolean(errors && errors[field]),
          helperText: Boolean(errors && errors[field]) && errors[field],
          name: field,
          value: _this2.state[field],
          type: "password",
          onChange: _this2.onChange,
          fullWidth: true,
          required: true
        });
      }))), _react.default.createElement(_core.FormControl, {
        fullWidth: true,
        margin: "normal",
        classes: {
          marginNormal: classes.formControlNormal
        }
      }, _react.default.createElement(_core.Button, {
        variant: "outlined",
        type: "submit",
        color: "primary",
        fullWidth: true,
        disabled: Boolean(errors) && !touched || !filled || passwordCheckError
      }, (0, _.t)("Change my password"))));
    }
  }]);

  return ChangePasswordForm;
}(_react.default.Component);

_defineProperty(ChangePasswordForm, "contextType", _context.default);

ChangePasswordForm.propTypes = {
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(ChangePasswordForm);

exports.default = _default;