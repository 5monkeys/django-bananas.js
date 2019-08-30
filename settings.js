"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsLogger = _interopRequireDefault(require("js-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = _jsLogger.default.get("bananas");

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
    var {
      settings
    } = this;

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
    var loaded = settingNames.map(setting => [setting, JSON.parse(window.localStorage.getItem(setting))]).filter((_ref) => {
      var [_, value] = _ref;
      return ![null, undefined].includes(value);
    }).reduce((settings, _ref2) => {
      var [setting, value] = _ref2;
      return _objectSpread({}, settings, {
        [setting]: value
      });
    }, {});
    this.settings = _objectSpread({}, this.settings || {}, {}, loaded);
  }

  save(settings) {
    for (var setting of Object.keys(settings).filter(s => s !== "editable")) {
      window.localStorage.setItem(setting, settings[setting]);
      logger.debug("Saving Setting:", setting, settings[setting]);
    }
  }

  clear() {
    for (var setting of Object.keys(this.settings)) {
      window.localStorage.removeItem(setting);
    }
  }

  configure(newSettings) {
    this.settings = _objectSpread({}, this.settings, {}, newSettings);
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