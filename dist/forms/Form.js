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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var Form =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function (values) {
      var _this$props = _this.props,
          route = _this$props.route,
          params = _this$props.params,
          onSubmit = _this$props.onSubmit;

      var endpoint = function endpoint(data) {
        return _this.context.api[route](_objectSpread({}, params, {
          data: data || values
        }));
      };

      var promise = onSubmit ? Promise.resolve(onSubmit({
        endpoint: endpoint,
        values: values
      })) : endpoint().then(function () {
        // TODO: store data from server in the form
        _this.context.admin.success("Changes have been saved!");

        return false;
      });
      return promise.catch(function (_ref) {
        var _ref$response = _ref.response,
            statusText = _ref$response.statusText,
            status = _ref$response.status,
            obj = _ref$response.obj;
        var errorMessages = {
          400: "Please correct the errors on this form."
        };

        _this.context.admin.error(errorMessages[status] || "".concat(status, " : ").concat(statusText));

        return obj;
      });
    });

    return _this;
  }

  _createClass(Form, [{
    key: "getSchema",
    value: function getSchema(route) {
      var schema = this.context.api[route].schema;
      return schema && schema.data ? schema.data : undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          route = _this$props2.route,
          children = _this$props2.children,
          formProps = _this$props2.formProps,
          props = _objectWithoutProperties(_this$props2, ["route", "children", "formProps"]);

      return _react.default.createElement(_materialUiPickers.MuiPickersUtilsProvider, {
        utils: _dateFns.default
      }, _react.default.createElement(_reactFinalForm.Form, _extends({}, props, {
        mutators: _objectSpread({}, _finalFormArrays.default),
        onSubmit: this.handleSubmit
      }), function (_ref2) {
        var handleSubmit = _ref2.handleSubmit,
            childProps = _objectWithoutProperties(_ref2, ["handleSubmit"]);

        return _react.default.createElement("form", _extends({
          onSubmit: handleSubmit
        }, formProps), _react.default.createElement(_FormContext.default.Provider, {
          value: {
            schema: _this2.getSchema(route)
          }
        }, _typeof(children) === "object" ? children : children(_objectSpread({
          handleSubmit: handleSubmit
        }, childProps))));
      }));
    }
  }]);

  return Form;
}(_react.default.Component);

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