"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsLogger = _interopRequireDefault(require("js-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var logger = _jsLogger.default.get("bananas");

var Settings =
/*#__PURE__*/
function () {
  function Settings(settings, callback) {
    _classCallCheck(this, Settings);

    this.callback = callback;
    this.defaults = settings;
    this.settings = settings;
    logger.debug("Default Settings:", this.defaults);
    this.load(Object.keys(this.settings));
    this.clean();
    logger.debug("Final Settings:", this.settings);
  }

  _createClass(Settings, [{
    key: "clean",
    value: function clean() {
      var settings = this.settings;

      if (settings.collapsable && (!settings.horizontal || !settings.icons)) {
        if (settings.horizontal) {
          logger.error("No icons provided for collapsable navbar");
        }

        logger.warn("Forcing permanent navbar");
        settings.collapsable = false;
      }

      if (settings.collapsed && !settings.collapsable) {
        logger.warn("Expanding collapsed permanent navbar");
        settings.collapsed = false;
      }
    }
  }, {
    key: "load",
    value: function load(settingNames) {
      var loaded = settingNames.map(function (setting) {
        return [setting, JSON.parse(window.localStorage.getItem(setting))];
      }).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            _ = _ref2[0],
            value = _ref2[1];

        return ![null, undefined].includes(value);
      }).reduce(function (settings, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            setting = _ref4[0],
            value = _ref4[1];

        return _objectSpread({}, settings, _defineProperty({}, setting, value));
      }, {});
      this.settings = _objectSpread({}, this.settings || {}, loaded);
    }
  }, {
    key: "save",
    value: function save(settings) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(settings).filter(function (s) {
          return s !== "editable";
        })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var setting = _step.value;
          window.localStorage.setItem(setting, settings[setting]);
          logger.debug("Saving Setting:", setting, settings[setting]);
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
    }
  }, {
    key: "clear",
    value: function clear() {
      var _arr2 = Object.keys(this.settings);

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var setting = _arr2[_i2];
        window.localStorage.removeItem(setting);
      }
    }
  }, {
    key: "configure",
    value: function configure(newSettings) {
      this.settings = _objectSpread({}, this.settings, newSettings);
      this.clean();
      this.save(newSettings);
      this.callback(this.settings);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.clear();
      this.settings = this.defaults;
      this.clean();
      this.callback(this.settings);
    }
  }]);

  return Settings;
}();

var _default = Settings;
exports.default = _default;