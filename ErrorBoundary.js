"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _context = _interopRequireDefault(require("./context"));

var _errors = require("./errors");

var _ErrorPage = _interopRequireDefault(require("./pages/ErrorPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ErrorBoundary extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError() {
    return {
      error: new _errors.InternalPageError()
    };
  }

  render() {
    const _this$props = this.props,
          children = _this$props.children,
          component = _this$props.component,
          props = _objectWithoutProperties(_this$props, ["children", "component"]);

    const Fallback = component;
    const error = this.state.error;
    return error ? Fallback ? _react.default.createElement(Fallback, props) : _react.default.createElement(_ErrorPage.default, {
      key: error.code,
      title: error.message,
      data: {
        statusCode: error.code
      }
    }) : children;
  }

}

_defineProperty(ErrorBoundary, "contextType", _context.default);

ErrorBoundary.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  component: _propTypes.default.func
};
ErrorBoundary.defaultProps = {
  component: null
};
var _default = ErrorBoundary;
exports.default = _default;