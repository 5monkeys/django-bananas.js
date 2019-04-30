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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
  reset: {
    marginLeft: 48,
    marginTop: theme.spacing.unit
  }
});

class SettingsForm extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "changeSetting", setting => event => {
      if (this.props.onChange) {
        this.props.onChange(setting, event.target.checked);
      }
    });

    _defineProperty(this, "resetSettings", () => {
      if (this.props.onReset) {
        this.props.onReset();
      }
    });
  }

  render() {
    const _this$props = this.props,
          classes = _this$props.classes,
          settings = _this$props.settings;
    const labels = {
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
    }, _react.default.createElement(_FormGroup.default, null, ["horizontal", "collapsable", "collapsed", "icons", "dense"].map(setting => _react.default.createElement(_FormControlLabel.default, {
      key: setting,
      label: labels[setting],
      disabled: setting === "collapsable" && (!settings.icons || !settings.horizontal) || setting === "collapsed" && (!settings.collapsable || !settings.icons || !settings.horizontal),
      control: _react.default.createElement(_Switch.default, {
        color: "primary",
        checked: settings[setting],
        value: setting,
        onChange: this.changeSetting(setting)
      })
    }))), _react.default.createElement(_Button.default, {
      classes: {
        root: classes.reset
      },
      variant: "outlined",
      size: "small",
      color: "secondary",
      onClick: this.resetSettings
    }, "Reset")));
  }

}

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