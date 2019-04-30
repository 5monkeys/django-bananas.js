"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ChoiceField = (_ref) => {
  let input = _ref.input,
      schema = _ref.schema,
      fieldProps = _ref.fieldProps;
  return _react.default.createElement(_core.FormControl, {
    error: fieldProps.error
  }, _react.default.createElement(_core.InputLabel, {
    htmlFor: "name-error"
  }, fieldProps.label), _react.default.createElement(_core.Select, _extends({}, input, {
    value: input.value || []
  }), !schema.required && _react.default.createElement(_core.MenuItem, {
    value: ""
  }, _react.default.createElement("em", null, "None")), schema.enum.map(value => _react.default.createElement(_core.MenuItem, {
    value: value,
    key: value
  }, value))), fieldProps.error && _react.default.createElement(_core.FormHelperText, null, fieldProps.helperText));
};

var _default = ChoiceField;
exports.default = _default;