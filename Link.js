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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Link extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "linkClicked", e => {
      const _e$currentTarget = e.currentTarget,
            nodeName = _e$currentTarget.nodeName,
            target = _e$currentTarget.target; // ignore click for new tab / new window behavior

      if (nodeName === "A" && (target && target !== "_self" || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        return;
      }

      e.preventDefault();
      const _this$props = this.props,
            route = _this$props.route,
            params = _this$props.params,
            path = _this$props.path,
            query = _this$props.query,
            hash = _this$props.hash,
            patch = _this$props.patch;
      this.context.router.route({
        id: route,
        params,
        path,
        query,
        hash
      }, {
        patch
      });
    });
  }

  render() {
    const _this$props2 = this.props,
          route = _this$props2.route,
          params = _this$props2.params,
          path = _this$props2.path,
          query = _this$props2.query,
          href = _this$props2.href,
          children = _this$props2.children,
          patch = _this$props2.patch,
          rest = _objectWithoutProperties(_this$props2, ["route", "params", "path", "query", "href", "children", "patch"]);

    let hash = this.props.hash;
    let child = null;
    let isAnchor = false;
    const props = rest;

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

      let pathname = undefined;

      if (route) {
        const resolvedRoute = this.context.router.reverse(route, params);
        pathname = resolvedRoute ? resolvedRoute.path : null;
      } else if (path) {
        const resolvedRoute = this.context.router.resolve(path);
        pathname = resolvedRoute ? resolvedRoute.path : path;
      }

      if (!pathname) {
        throw new Error(`Failed to create link for: ${route || path}`);
      }

      hash = hash && !hash.startsWith("#") ? `#${hash}` : hash;
      props.href = `${pathname}${(0, _utils.toQuery)(query)}${hash}`;
    }

    props.onClick = e => {
      if (child.props && typeof child.props.onClick === "function") {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        this.linkClicked(e);
      }
    };

    return _react.default.cloneElement(child, props);
  }

}

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