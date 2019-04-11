"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _context = _interopRequireDefault(require("./context"));

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Link =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Link)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "linkClicked", function (e) {
      var _e$currentTarget = e.currentTarget,
          nodeName = _e$currentTarget.nodeName,
          target = _e$currentTarget.target; // ignore click for new tab / new window behavior

      if (nodeName === "A" && (target && target !== "_self" || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        return;
      }

      e.preventDefault();
      var _this$props = _this.props,
          route = _this$props.route,
          params = _this$props.params,
          path = _this$props.path,
          query = _this$props.query,
          hash = _this$props.hash,
          patch = _this$props.patch;

      _this.context.router.route({
        id: route,
        params: params,
        path: path,
        query: query,
        hash: hash
      }, {
        patch: patch
      });
    });

    return _this;
  }

  _createClass(Link, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          route = _this$props2.route,
          params = _this$props2.params,
          path = _this$props2.path,
          query = _this$props2.query,
          href = _this$props2.href,
          children = _this$props2.children,
          patch = _this$props2.patch,
          rest = _objectWithoutProperties(_this$props2, ["route", "params", "path", "query", "href", "children", "patch"]);

      var hash = this.props.hash;
      var child = null;
      var isAnchor = false;
      var props = rest;

      if (typeof children === "string") {
        child = _react.default.createElement(_Link.default, rest, children);
        isAnchor = true;
      } else {
        child = _react.Children.only(children);
        isAnchor = child.type === "a";
      }

      if (isAnchor) {
        if (href) {
          props.href = href;
          return _react.default.cloneElement(child, props);
        }

        var pathname = undefined;

        if (route) {
          var resolvedRoute = this.context.router.reverse(route, params);
          pathname = resolvedRoute ? resolvedRoute.path : null;
        } else if (path) {
          var _resolvedRoute = this.context.router.resolve(path);

          pathname = _resolvedRoute ? _resolvedRoute.path : path;
        }

        if (!pathname) {
          throw new Error("Failed to create link for: ".concat(route || path));
        }

        hash = hash && !hash.startsWith("#") ? "#".concat(hash) : hash;
        props.href = "".concat(pathname).concat((0, _utils.toQuery)(query)).concat(hash);
      }

      props.onClick = function (e) {
        if (child.props && typeof child.props.onClick === "function") {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          _this2.linkClicked(e);
        }
      };

      return _react.default.cloneElement(child, props);
    }
  }]);

  return Link;
}(_react.default.Component);

exports.default = Link;

_defineProperty(Link, "contextType", _context.default);

Link.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]).isRequired,
  route: _propTypes.default.string,
  params: _propTypes.default.object,
  path: _propTypes.default.string,
  query: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  hash: _propTypes.default.string,
  patch: _propTypes.default.bool
};
Link.defaultProps = {
  route: undefined,
  params: undefined,
  path: undefined,
  query: "",
  hash: "",
  patch: false
};