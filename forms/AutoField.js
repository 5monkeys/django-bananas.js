"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalForm = require("react-final-form");

var _BooleanField = _interopRequireDefault(require("./fields/BooleanField"));

var _ChoiceField = _interopRequireDefault(require("./fields/ChoiceField"));

var _DateField = _interopRequireDefault(require("./fields/DateField"));

var _DateTimeField = _interopRequireDefault(require("./fields/DateTimeField"));

var _MultipleChoiceField = _interopRequireDefault(require("./fields/MultipleChoiceField"));

var _TextField = _interopRequireDefault(require("./fields/TextField"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

class AutoField extends _react.default.Component {
  render() {
    if (typeof this.context === "undefined") {
      throw new Error("This component requires FormContext to be present.");
    }

    var _this$props = this.props,
        {
      name,
      fieldProps: fieldPropsOverride,
      variant
    } = _this$props,
        rest = _objectWithoutProperties(_this$props, ["name", "fieldProps", "variant"]);

    var schema = (0, _utils.fieldFromSchema)(this.context.schema, name);

    if (typeof schema === "undefined") {
      throw new Error("No schema found for field \"".concat(name, "\"."));
    }

    var fieldType = schema.enum ? "enum" : schema.type;
    var fields = fieldsByType[fieldType] || fieldsByType.string;
    var {
      component: Field,
      type
    } = fields[schema.format] || fields.default;
    return _react.default.createElement(_reactFinalForm.Field, _extends({
      name: name,
      type: type
    }, rest, {
      novalidate: true
    }), (_ref) => {
      var {
        meta,
        input
      } = _ref;
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
        fieldProps: _objectSpread({}, fieldProps, {}, fieldPropsOverride)
      });
    });
  }

}

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