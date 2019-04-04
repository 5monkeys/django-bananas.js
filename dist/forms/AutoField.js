"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalForm = require("react-final-form");

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _BooleanField = _interopRequireDefault(require("./fields/BooleanField"));

var _ChoiceField = _interopRequireDefault(require("./fields/ChoiceField"));

var _DateField = _interopRequireDefault(require("./fields/DateField"));

var _DateTimeField = _interopRequireDefault(require("./fields/DateTimeField"));

var _MultipleChoiceField = _interopRequireDefault(require("./fields/MultipleChoiceField"));

var _TextField = _interopRequireDefault(require("./fields/TextField"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fieldsByType = {
  string: {
    default: {
      component: _TextField.default
    },
    date: {
      component: _DateField.default
    },
    "date-time": {
      component: _DateTimeField.default
    }
  },
  boolean: {
    default: {
      component: _BooleanField.default,
      type: "checkbox"
    }
  },
  enum: {
    default: {
      component: _ChoiceField.default,
      type: "select"
    }
  },
  array: {
    default: {
      component: _MultipleChoiceField.default,
      type: "select"
    }
  }
};

var AutoField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AutoField, _React$Component);

  function AutoField() {
    _classCallCheck(this, AutoField);

    return _possibleConstructorReturn(this, _getPrototypeOf(AutoField).apply(this, arguments));
  }

  _createClass(AutoField, [{
    key: "render",
    value: function render() {
      if (typeof this.context === "undefined") {
        throw new Error("This component requires FormContext to be present.");
      }

      var _this$props = this.props,
          name = _this$props.name,
          fieldPropsOverride = _this$props.fieldProps,
          variant = _this$props.variant,
          rest = _objectWithoutProperties(_this$props, ["name", "fieldProps", "variant"]);

      var schema = (0, _utils.fieldFromSchema)(this.context.schema, name);

      if (typeof schema === "undefined") {
        throw new Error("No schema found for field \"".concat(name, "\"."));
      }

      var fieldType = schema.enum ? "enum" : schema.type;
      var fields = fieldsByType[fieldType] || fieldsByType.string;

      var _ref = fields[schema.format] || fields.default,
          Field = _ref.component,
          type = _ref.type;

      return _react.default.createElement(_reactFinalForm.Field, _extends({
        name: name,
        type: type
      }, rest, {
        novalidate: true
      }), function (_ref2) {
        var meta = _ref2.meta,
            input = _ref2.input;
        var fieldProps = schema ? {
          label: schema.title + (schema.required ? " *" : ""),
          error: (meta.error || meta.submitError) && meta.touched,
          helperText: meta.touched && (meta.error || meta.submitError)
        } : {};
        return _react.default.createElement(Field, {
          meta: meta,
          input: input,
          variant: variant,
          schema: schema,
          fieldProps: _objectSpread({}, fieldProps, fieldPropsOverride)
        });
      });
    }
  }]);

  return AutoField;
}(_react.default.Component);

_defineProperty(AutoField, "contextType", _FormContext.default);

AutoField.propTypes = {
  name: _propTypes.default.string.isRequired,
  variant: _propTypes.default.string,
  fieldProps: _propTypes.default.object
};
AutoField.defaultProps = {
  variant: undefined,
  fieldProps: {}
};
var _default = AutoField;
exports.default = _default;