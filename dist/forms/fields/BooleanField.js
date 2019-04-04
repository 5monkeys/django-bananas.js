"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var BooleanField = function BooleanField(_ref) {
  var _ref$input = _ref.input,
      value = _ref$input.value,
      inputProps = _objectWithoutProperties(_ref$input, ["value"]),
      variant = _ref.variant,
      fieldProps = _ref.fieldProps;

  return _react.default.createElement(_core.FormControl, {
    required: true,
    error: fieldProps.error
  }, _react.default.createElement(_core.FormGroup, null, _react.default.createElement(_core.FormControlLabel, {
    control: variant === "switch" ? _react.default.createElement(_core.Switch, _extends({
      checked: value
    }, inputProps)) : _react.default.createElement(_core.Checkbox, _extends({
      checked: value
    }, inputProps)),
    label: fieldProps.label
  })), fieldProps.error && _react.default.createElement(_core.FormHelperText, null, fieldProps.helperText));
};

var _default = BooleanField;
exports.default = _default;