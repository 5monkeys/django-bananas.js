"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _FormGroup = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

var _Switch = _interopRequireDefault(require("@material-ui/core/Switch"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var styles = function styles(theme) {
  return {
    reset: {
      marginLeft: 48,
      marginTop: theme.spacing.unit
    }
  };
};

var SettingsForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SettingsForm, _React$Component);

  function SettingsForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SettingsForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SettingsForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changeSetting", function (setting) {
      return function (event) {
        if (_this.props.onChange) {
          _this.props.onChange(setting, event.target.checked);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resetSettings", function () {
      if (_this.props.onReset) {
        _this.props.onReset();
      }
    });

    return _this;
  }

  _createClass(SettingsForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          settings = _this$props.settings;
      var labels = {
        horizontal: "Horizontal Layout",
        collapsable: "Collapsable Navigation",
        collapsed: "Collapsed",
        icons: "Show Menu Icons",
        dense: "Dense Menu Items"
      };
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_FormLabel.default, {
        component: "legend"
      }, "Settings"), _react.default.createElement(_FormControl.default, {
        component: "fieldset"
      }, _react.default.createElement(_FormGroup.default, null, ["horizontal", "collapsable", "collapsed", "icons", "dense"].map(function (setting) {
        return _react.default.createElement(_FormControlLabel.default, {
          key: setting,
          label: labels[setting],
          disabled: setting === "collapsable" && (!settings.icons || !settings.horizontal) || setting === "collapsed" && (!settings.collapsable || !settings.icons || !settings.horizontal),
          control: _react.default.createElement(_Switch.default, {
            color: "primary",
            checked: settings[setting],
            value: setting,
            onChange: _this2.changeSetting(setting)
          })
        });
      })), _react.default.createElement(_Button.default, {
        classes: {
          root: classes.reset
        },
        variant: "outlined",
        size: "small",
        color: "secondary",
        onClick: this.resetSettings
      }, "Reset")));
    }
  }]);

  return SettingsForm;
}(_react.default.Component);

SettingsForm.propTypes = {
  classes: _propTypes.default.object.isRequired,
  settings: _propTypes.default.object.isRequired,
  onChange: _propTypes.default.func,
  onReset: _propTypes.default.func
};
SettingsForm.defaultProps = {
  onChange: undefined,
  onReset: undefined
};

var _default = (0, _styles.withStyles)(styles)(SettingsForm);

exports.default = _default;