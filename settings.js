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

const logger = _jsLogger.default.get("bananas");

class Settings {
  constructor(settings, callback) {
    this.callback = callback;
    this.defaults = settings;
    this.settings = settings;
    logger.debug("Default Settings:", this.defaults);
    this.load(Object.keys(this.settings));
    this.clean();
    logger.debug("Final Settings:", this.settings);
  }

  clean() {
    const settings = this.settings;

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

  load(settingNames) {
    const loaded = settingNames.map(setting => [setting, JSON.parse(window.localStorage.getItem(setting))]).filter((_ref) => {
      let _ref2 = _slicedToArray(_ref, 2),
          _ = _ref2[0],
          value = _ref2[1];

      return ![null, undefined].includes(value);
    }).reduce((settings, _ref3) => {
      let _ref4 = _slicedToArray(_ref3, 2),
          setting = _ref4[0],
          value = _ref4[1];

      return _objectSpread({}, settings, {
        [setting]: value
      });
    }, {});
    this.settings = _objectSpread({}, this.settings || {}, loaded);
  }

  save(settings) {
    for (const setting of Object.keys(settings).filter(s => s !== "editable")) {
      window.localStorage.setItem(setting, settings[setting]);
      logger.debug("Saving Setting:", setting, settings[setting]);
    }
  }

  clear() {
    for (const setting of Object.keys(this.settings)) {
      window.localStorage.removeItem(setting);
    }
  }

  configure(newSettings) {
    this.settings = _objectSpread({}, this.settings, newSettings);
    this.clean();
    this.save(newSettings);
    this.callback(this.settings);
  }

  reset() {
    this.clear();
    this.settings = this.defaults;
    this.clean();
    this.callback(this.settings);
  }

}

var _default = Settings;
exports.default = _default;