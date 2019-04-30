"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = getCookie;
exports.toQuery = toQuery;
exports.fromQuery = fromQuery;
exports.ensureTrailingSlash = ensureTrailingSlash;
exports.ensureLeadingHash = ensureLeadingHash;
exports.absolutePath = absolutePath;
exports.nthIndexOf = nthIndexOf;
exports.capitalize = capitalize;
exports.interpolateString = interpolateString;
exports.t = t;
exports.MultiMeter = exports.ComponentProxy = exports.Translate = void 0;

var _core = require("@material-ui/core");

var _jsLogger = _interopRequireDefault(require("js-logger"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const logger = _jsLogger.default.get("bananas");

function getCookie(name) {
  const prefix = `${name}=`;
  const cookies = document.cookie.split(/\s*;\s*/);
  const match = cookies.find(cookie => cookie.startsWith(prefix));
  return match == null ? undefined : match.slice(prefix.length);
}

function toQuery(obj) {
  if (!obj) {
    return "";
  }

  const query = Object.keys(obj).map(key => {
    return `${key}=${encodeURIComponent(obj[key])}`;
  }).join("&");
  return query ? `?${query}` : "";
}

function fromQuery(query) {
  if (!query) {
    return {};
  }

  return query.substring(1).split("&").reduce((params, param) => {
    const _param$split = param.split("="),
          _param$split2 = _slicedToArray(_param$split, 2),
          key = _param$split2[0],
          value = _param$split2[1];

    return key === "" ? params : _objectSpread({}, params, {
      [key]: decodeURIComponent(value)
    });
  }, {});
}

function ensureTrailingSlash(path) {
  if (path != null && !path.endsWith("/")) {
    return `${path}/`;
  }

  return path;
}

function ensureLeadingHash(hash) {
  if (hash != null && !hash.startsWith("#")) {
    return `#${hash}`;
  }

  return hash;
}

function absolutePath(path) {
  let basename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";

  if (!path) {
    return path;
  }

  let pathname = path; // Make relative path absolute to basename

  if (!pathname.startsWith("/")) {
    pathname = ensureTrailingSlash(basename) + pathname;
  } // Expand path


  if (pathname.indexOf(".") >= 0) {
    const stack = [];

    for (const part of pathname.split("/")) {
      if (part === ".") {
        continue;
      } else if (part === ".." && stack.length > 0) {
        stack.pop();
      } else {
        stack.push(part);
      }
    }

    pathname = stack.join("/");
  }

  return ensureTrailingSlash(pathname);
}

function nthIndexOf(str, pattern, n, start) {
  const index = str.indexOf(pattern, start || 0);

  if (index >= 0 && n > 1) {
    return nthIndexOf(str, pattern, n - 1, index + 1);
  }

  return index;
}
/**
 * Like Python’s `.capitalize()`.
 */


function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}

function interpolateString(string, params) {
  return Array.isArray(params) ? params.reduce((s, value) => s.replace(/%[sd]|\{\}/, value), string) : Object.entries(params).reduce((s, _ref) => {
    let _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return s.replace(new RegExp(`%\\(${key}\\)[sd]|\\{${key}\\}`, "g"), value);
  }, string);
}

function t(key, params) {
  if (!window.i18n) {
    logger.warn("Bananas i18n translations not initialized. Failed to translate:", key);
    return key;
  }

  const value = window.i18n[key] || key;
  return params ? interpolateString(value, params) : value;
}

const Translate = (_ref3) => {
  let children = _ref3.children,
      params = _ref3.params;
  return _react.default.createElement(_core.Typography, null, t(children, params));
};

exports.Translate = Translate;
Translate.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]).isRequired,
  params: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object])
};
Translate.defaultProps = {
  params: undefined
};
/**
 * Helper for proxying exposed methods from one or more referenced components.
 */

class ComponentProxy {
  constructor() {
    this.proxy = {};
  }

  add(Component, alias) {
    const reference = _react.default.createRef(); // Add exposed component actions to proxy


    for (const action of Component.expose) {
      this.proxy[action] = function () {
        return reference.current ? reference.current[action](...arguments) : null;
      };
    } // Remember reference under alias for later use


    if (alias) {
      this[alias] = reference;
    }

    return reference;
  }

}

exports.ComponentProxy = ComponentProxy;

class MultiMeter {
  constructor() {
    _defineProperty(this, "meters", {});

    _defineProperty(this, "up", (name, step) => this.change(name, step ? Math.abs(step) : 1));

    _defineProperty(this, "down", (name, step) => this.change(name, step ? -Math.abs(step) : -1));

    _defineProperty(this, "step", (up, name) => up ? this.up(name) : this.down(name));

    _defineProperty(this, "change", (name, delta) => {
      const n = name || "default";
      this.meters[n] = Math.max((this.meters[n] || 0) + delta, 0);
      return this.meters[n];
    });

    _defineProperty(this, "read", name => {
      return name ? this.meters[name] > 0 : Object.keys(this.meters).some(n => this.reads(n));
    });
  }

}

exports.MultiMeter = MultiMeter;