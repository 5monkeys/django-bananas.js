"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _finalFormArrays = _interopRequireDefault(require("final-form-arrays"));

var _materialUiPickers = require("material-ui-pickers");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalForm = require("react-final-form");

var _ = require("..");

var _FormContext = _interopRequireDefault(require("./FormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Form extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "handleSubmit", values => {
      const _this$props = this.props,
            route = _this$props.route,
            params = _this$props.params,
            onSubmit = _this$props.onSubmit;

      const endpoint = data => this.context.api[route](_objectSpread({}, params, {
        data: data || values
      }));

      const promise = onSubmit ? Promise.resolve(onSubmit({
        endpoint,
        values
      })) : endpoint().then(() => {
        // TODO: store data from server in the form
        this.context.admin.success("Changes have been saved!");
        return false;
      });
      return promise.catch((_ref) => {
        let _ref$response = _ref.response,
            statusText = _ref$response.statusText,
            status = _ref$response.status,
            obj = _ref$response.obj;
        const errorMessages = {
          400: "Please correct the errors on this form."
        };
        this.context.admin.error(errorMessages[status] || `${status} : ${statusText}`);
        return obj;
      });
    });
  }

  getSchema(route) {
    const schema = this.context.api[route].schema;
    return schema && schema.data ? schema.data : undefined;
  }

  render() {
    const _this$props2 = this.props,
          route = _this$props2.route,
          children = _this$props2.children,
          formProps = _this$props2.formProps,
          props = _objectWithoutProperties(_this$props2, ["route", "children", "formProps"]);

    return _react.default.createElement(_materialUiPickers.MuiPickersUtilsProvider, {
      utils: _dateFns.default
    }, _react.default.createElement(_reactFinalForm.Form, _extends({}, props, {
      mutators: _objectSpread({}, _finalFormArrays.default),
      onSubmit: this.handleSubmit
    }), (_ref2) => {
      let handleSubmit = _ref2.handleSubmit,
          childProps = _objectWithoutProperties(_ref2, ["handleSubmit"]);

      return _react.default.createElement("form", _extends({
        onSubmit: handleSubmit
      }, formProps), _react.default.createElement(_FormContext.default.Provider, {
        value: {
          schema: this.getSchema(route)
        }
      }, typeof children === "object" ? children : children(_objectSpread({
        handleSubmit
      }, childProps))));
    }));
  }

}

_defineProperty(Form, "contextType", _.AdminContext);

Form.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node, _propTypes.default.func]).isRequired,
  route: _propTypes.default.string.isRequired,
  params: _propTypes.default.object,
  onSubmit: _propTypes.default.func,
  formProps: _propTypes.default.object
};
Form.defaultProps = {
  onSubmit: undefined,
  params: {},
  formProps: {}
};
var _default = Form;
exports.default = _default;