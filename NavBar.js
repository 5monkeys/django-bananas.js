"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));

var _styles = require("@material-ui/core/styles");

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _AccountCircle = _interopRequireDefault(require("@material-ui/icons/AccountCircle"));

var _Home = _interopRequireDefault(require("@material-ui/icons/Home"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Branding = _interopRequireDefault(require("./Branding"));

var _Container = _interopRequireDefault(require("./Container"));

var _context = _interopRequireDefault(require("./context"));

var _Hamburger = _interopRequireDefault(require("./Hamburger"));

var _Navigation = _interopRequireDefault(require("./Navigation"));

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_NAV = {
  home: _Home.default,
  "bananas.me:list": _AccountCircle.default
};

var styles = theme => ({
  branding: _objectSpread({
    padding: 0,
    flexGrow: 0,
    flexShrink: 0,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  }, theme.mixins.toolbar),
  navigation: {
    flexGrow: 1,
    position: "relative"
  },
  user: {
    flexGrow: 0,
    flexShrink: 0
  },
  scroll: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  scrollHorizontal: {
    overflowX: "auto",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  scrollVertical: {
    overflowY: "auto"
  },

  /* DRAWER STYLES */
  drawerRoot: {
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawer: {
    width: 280,
    overflow: "visible",
    borderRight: 0
  },
  drawerBorder: {
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: theme.palette.divider
  },
  drawerExpanded: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerCollapsed: {
    width: 40 + theme.spacing(2) + 1,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawerBranding: {},
  permanentDrawerBrandingButton: {
    padding: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

  /* APPBAR STYLES */
  appbar: {
    backgroundColor: theme.palette.primary.dark
  },
  appbarContainer: {
    display: "flex",
    flexDirection: "row"
  },
  appbarBranding: {
    background: "transparent"
  },
  permanentAppbarBrandingButton: {
    padding: 0,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2)
  },
  pageOffset: _objectSpread({}, theme.mixins.toolbar),
  header: {} // Put last for easier overriding .branding and .appbar

});

class NavBar extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {});

    _defineProperty(this, "toggle", () => {
      this.context.admin.settings.configure({
        collapsed: !this.props.collapsed
      });
    });
  }

  static getDerivedStateFromProps(props, state) {
    var {
      variant,
      permanent,
      collapsed
    } = props;
    var isDrawerVariant = variant === "drawer";
    var isAppBarVariant = variant === "appbar";
    return _objectSpread({}, state, {
      isDrawerVariant,
      isAppBarVariant,
      permanent,
      collapsed,
      nav: makeNav(props.nav),
      showIcons: Boolean(props.nav) && !Array.isArray(props.nav)
    });
  }

  renderChildren() {
    var {
      classes,
      variant,
      dense,
      logo,
      title,
      branding,
      version
    } = this.props;
    var {
      isDrawerVariant,
      isAppBarVariant,
      collapsed,
      permanent,
      nav,
      showIcons
    } = this.state;
    var {
      router
    } = this.context;
    var routes = router.navigationRoutes;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Toolbar.default, {
      classes: {
        root: (0, _classnames.default)(classes.branding, classes.header, {
          [classes.drawerBranding]: isDrawerVariant,
          [classes.appbarBranding]: isAppBarVariant
        })
      }
    }, isDrawerVariant && !permanent && _react.default.createElement(_Hamburger.default, {
      open: !collapsed,
      onToggle: this.toggle
    }), _react.default.createElement(_Branding.default, {
      logo: logo,
      title: title,
      subtitle: branding,
      version: version,
      className: (0, _classnames.default)({
        [classes.permanentDrawerBrandingButton]: permanent && isDrawerVariant,
        [classes.permanentAppbarBrandingButton]: permanent && isAppBarVariant
      }),
      onClick: () => {
        this.context.router.route({
          id: "home"
        });
      }
    })), _react.default.createElement(_Toolbar.default, {
      className: (0, _classnames.default)(classes.navigation, {
        [classes.drawerBorder]: isDrawerVariant
      })
    }, _react.default.createElement("div", {
      className: (0, _classnames.default)(classes.scroll, {
        [classes.scrollVertical]: isDrawerVariant,
        [classes.scrollHorizontal]: isAppBarVariant
      })
    }, _react.default.createElement(_Navigation.default, {
      horizontal: isAppBarVariant,
      collapsed: collapsed,
      dense: dense,
      nav: nav,
      showIcons: showIcons,
      routes: routes
    }))), _react.default.createElement("div", {
      className: (0, _classnames.default)(classes.user, {
        [classes.drawerBorder]: isDrawerVariant
      })
    }, _react.default.createElement(_User.default, {
      variant: variant,
      collapsed: collapsed,
      icon: nav["bananas.me:list"]
    })));
  }

  render() {
    var {
      classes,
      variant
    } = this.props;
    var {
      collapsed
    } = this.state;
    return variant === "drawer" ? _react.default.createElement(_Drawer.default, {
      variant: "permanent",
      anchor: "left",
      open: !collapsed,
      classes: {
        root: (0, _classnames.default)(classes.drawerRoot, classes.drawer, {
          [classes.drawerExpanded]: !collapsed,
          [classes.drawerCollapsed]: collapsed
        }),
        paper: (0, _classnames.default)(classes.drawer, {
          [classes.drawerExpanded]: !collapsed,
          [classes.drawerCollapsed]: collapsed
        })
      },
      "data-testid": "navbar-drawer"
    }, this.renderChildren()) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
      className: classes.pageOffset
    }), _react.default.createElement(_AppBar.default, {
      position: "fixed",
      elevation: 0,
      classes: {
        root: (0, _classnames.default)(classes.appbar, classes.header)
      },
      "data-testid": "navbar-appbar"
    }, _react.default.createElement(_Container.default, {
      className: classes.appbarContainer
    }, this.renderChildren())));
  }

}

_defineProperty(NavBar, "contextType", _context.default);

NavBar.propTypes = {
  classes: _propTypes.default.object.isRequired,
  variant: _propTypes.default.string,
  dense: _propTypes.default.bool,
  permanent: _propTypes.default.bool,
  collapsed: _propTypes.default.bool,
  title: _propTypes.default.string,
  branding: _propTypes.default.string,
  version: _propTypes.default.string,
  logo: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.node]),
  nav: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string.isRequired), _propTypes.default.object])
};
NavBar.defaultProps = {
  variant: "drawer",
  // drawer|appbar
  dense: false,
  permanent: false,
  collapsed: false,
  title: "",
  branding: "",
  version: "",
  logo: true,
  nav: undefined
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasNavBar"
})(NavBar);

exports.default = _default;

function makeNav(propsNav) {
  var navObject = // `["id1", "id2"]` is a shorthand for `{"id1": null, "id2": null}`.
  Array.isArray(propsNav) ? propsNav.reduce((result, key) => {
    result[key] = null;
    return result;
  }, {}) : // Object or missing.
  _objectSpread({}, propsNav); // This might seem unnecessary, but is needed to allow moving the default nav
  // items.

  var defaultNav = Object.keys(DEFAULT_NAV).reduce((result, key) => {
    if (!{}.hasOwnProperty.call(navObject, key)) {
      result[key] = DEFAULT_NAV[key];
    }

    return result;
  }, {});
  return _objectSpread({}, defaultNav, {}, navObject);
}