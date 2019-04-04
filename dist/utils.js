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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var logger = _jsLogger.default.get("bananas");

function getCookie(name) {
  var prefix = "".concat(name, "=");
  var cookies = document.cookie.split(/\s*;\s*/);
  var match = cookies.find(function (cookie) {
    return cookie.startsWith(prefix);
  });
  return match == null ? undefined : match.slice(prefix.length);
}

function toQuery(obj) {
  if (!obj) {
    return "";
  }

  var query = Object.keys(obj).map(function (key) {
    return "".concat(key, "=").concat(encodeURIComponent(obj[key]));
  }).join("&");
  return query ? "?".concat(query) : "";
}

function fromQuery(query) {
  if (!query) {
    return {};
  }

  return query.substring(1).split("&").reduce(function (params, param) {
    var _param$split = param.split("="),
        _param$split2 = _slicedToArray(_param$split, 2),
        key = _param$split2[0],
        value = _param$split2[1];

    return key === "" ? params : _objectSpread({}, params, _defineProperty({}, key, decodeURIComponent(value)));
  }, {});
}

function ensureTrailingSlash(path) {
  if (path != null && !path.endsWith("/")) {
    return "".concat(path, "/");
  }

  return path;
}

function ensureLeadingHash(hash) {
  if (hash != null && !hash.startsWith("#")) {
    return "#".concat(hash);
  }

  return hash;
}

function absolutePath(path) {
  var basename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";

  if (!path) {
    return path;
  }

  var pathname = path; // Make relative path absolute to basename

  if (!pathname.startsWith("/")) {
    pathname = ensureTrailingSlash(basename) + pathname;
  } // Expand path


  if (pathname.indexOf(".") >= 0) {
    var stack = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = pathname.split("/")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var part = _step.value;

        if (part === ".") {
          continue;
        } else if (part === ".." && stack.length > 0) {
          stack.pop();
        } else {
          stack.push(part);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    pathname = stack.join("/");
  }

  return ensureTrailingSlash(pathname);
}

function nthIndexOf(str, pattern, n, start) {
  var index = str.indexOf(pattern, start || 0);

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
  return Array.isArray(params) ? params.reduce(function (s, value) {
    return s.replace(/%[sd]|\{\}/, value);
  }, string) : Object.entries(params).reduce(function (s, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return s.replace(new RegExp("%\\(".concat(key, "\\)[sd]|\\{").concat(key, "\\}"), "g"), value);
  }, string);
}

function t(key, params) {
  if (!window.i18n) {
    logger.warn("Bananas i18n translations not initialized. Failed to translate:", key);
    return key;
  }

  var value = window.i18n[key] || key;
  return params ? interpolateString(value, params) : value;
}

var Translate = function Translate(_ref3) {
  var children = _ref3.children,
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

var ComponentProxy =
/*#__PURE__*/
function () {
  function ComponentProxy() {
    _classCallCheck(this, ComponentProxy);

    this.proxy = {};
  }

  _createClass(ComponentProxy, [{
    key: "add",
    value: function add(Component, alias) {
      var _this = this;

      var reference = _react.default.createRef(); // Add exposed component actions to proxy


      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var action = _step2.value;

          _this.proxy[action] = function () {
            var _reference$current;

            return reference.current ? (_reference$current = reference.current)[action].apply(_reference$current, arguments) : null;
          };
        };

        for (var _iterator2 = Component.expose[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
        } // Remember reference under alias for later use

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (alias) {
        this[alias] = reference;
      }

      return reference;
    }
  }]);

  return ComponentProxy;
}();

exports.ComponentProxy = ComponentProxy;

var MultiMeter = function MultiMeter() {
  var _this2 = this;

  _classCallCheck(this, MultiMeter);

  _defineProperty(this, "meters", {});

  _defineProperty(this, "up", function (name, step) {
    return _this2.change(name, step ? Math.abs(step) : 1);
  });

  _defineProperty(this, "down", function (name, step) {
    return _this2.change(name, step ? -Math.abs(step) : -1);
  });

  _defineProperty(this, "step", function (up, name) {
    return up ? _this2.up(name) : _this2.down(name);
  });

  _defineProperty(this, "change", function (name, delta) {
    var n = name || "default";
    _this2.meters[n] = Math.max((_this2.meters[n] || 0) + delta, 0);
    return _this2.meters[n];
  });

  _defineProperty(this, "read", function (name) {
    return name ? _this2.meters[name] > 0 : Object.keys(_this2.meters).some(function (n) {
      return _this2.reads(n);
    });
  });
};

exports.MultiMeter = MultiMeter;