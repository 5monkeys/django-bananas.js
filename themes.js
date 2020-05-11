"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyThemeDefaults = applyThemeDefaults;
exports.createBananasTheme = createBananasTheme;
exports.extendTheme = extendTheme;
exports.default = void 0;

var _colors = require("@material-ui/core/colors");

var _styles = require("@material-ui/core/styles");

var _lodash = require("lodash");

var _colors2 = require("./colors");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaults = {
  bananas: true
  /*
  overrides: {
    BananasNavBar: {
      drawer: {
        width: 280,
      },
    },
  },
  */

};

function applyThemeDefaults(theme) {
  if (!theme.bananas) {
    return extendTheme(defaults, theme);
  }

  return theme;
}

function createBananasTheme(theme) {
  return (0, _styles.createMuiTheme)(applyThemeDefaults(theme));
}

function extendTheme(source, overrides) {
  var extended = (0, _lodash.merge)((0, _lodash.cloneDeep)(source), overrides);

  extended.extend = o => extendTheme(extended, o);

  return extended;
}

var lightTheme = {
  palette: {
    type: "light",
    primary: _colors2.django,
    secondary: {
      main: _colors.amber[700],
      contrastText: "#fff"
    },
    background: {
      default: "#fafafa"
    }
  }
};
var darkTheme = {
  palette: {
    type: "dark",
    primary: lightTheme.palette.primary,
    secondary: lightTheme.palette.secondary,
    background: {
      paper: "#303030",
      default: "#222"
    },
    action: {
      selected: "rgba(255, 255, 255, 0.12)",
      hover: "rgba(255, 255, 255, 0.03)"
    },
    divider: "rgba(255, 255, 255, 0.07)"
  },
  overrides: {
    MuiSnackbarContent: {
      root: {
        color: "#fff"
      }
    }
  }
};

var darthTheme = _objectSpread({}, darkTheme, {
  overrides: _objectSpread({}, darkTheme.overrides, {
    BananasAdmin: {
      root: {
        backgroundColor: "#222"
      }
    },
    BananasNavBar: {
      header: {
        background: "#111"
      },
      drawer: {
        background: "#272727"
      }
    },
    BananasTitleBar: {
      colorPrimary: {
        background: "#272727"
      }
    },
    BananasLoginPage: {
      title: {
        background: "#272727"
      }
    }
  })
});

var themes = {
  light: applyThemeDefaults(lightTheme),
  dark: applyThemeDefaults(darkTheme),
  darth: applyThemeDefaults(darthTheme)
};
themes.default = themes.light;
var _default = themes;
exports.default = _default;