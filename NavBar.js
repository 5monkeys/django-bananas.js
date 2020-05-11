"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _AccountCircle = _interopRequireDefault(require("@material-ui/icons/AccountCircle"));

var _Home = _interopRequireDefault(require("@material-ui/icons/Home"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Branding = _interopRequireDefault(require("./Branding"));

var _Container = _interopRequireDefault(require("./Container"));

var _context = _interopRequireDefault(require("./context"));

var _Hamburger = _interopRequireDefault(require("./Hamburger"));

var _Navigation = _interopRequireDefault(require("./Navigation"));

var _User = _interopRequireDefault(require("./User"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
    overflowY: "auto",
    overflowX: "hidden"
  },

  /* DRAWER STYLES */
  mobileDrawer: {
    width: "70%"
  },
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
  mobileAppbarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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

var NavBar = props => {
  var {
    variant,
    dense,
    logo,
    title,
    classes,
    branding,
    version,
    permanent,
    collapsed,
    nav: passedNav
  } = props;
  var {
    admin,
    router
  } = (0, _react.useContext)(_context.default);
  var [mobileDrawerOpen, setMobileDrawerOpen] = (0, _react.useState)(false); // memoize :

  var nav = (0, _react.useMemo)(() => makeNav(passedNav), [passedNav]);
  var showIcons = Boolean(props.nav) && !Array.isArray(props.nav);
  var isDrawerVariant = variant === "drawer";
  var isAppBarVariant = variant === "appbar";

  var toggle = () => {
    admin.settings.configure({
      collapsed: !collapsed
    });
  };

  var renderHamburger = () => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_core.Hidden, {
    xsDown: true
  }, isDrawerVariant && !permanent && _react.default.createElement(_Hamburger.default, {
    open: !collapsed,
    onToggle: toggle
  })), _react.default.createElement(_core.Hidden, {
    smUp: true
  }, isDrawerVariant && !permanent && _react.default.createElement(_Hamburger.default, {
    open: !collapsed,
    onToggle: () => setMobileDrawerOpen(false)
  })));

  var renderChildren = function renderChildren() {
    var forceCollapsed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : collapsed;
    var forceDrawerVariant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var isCollapsed = forceCollapsed;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_core.Toolbar, {
      classes: {
        root: (0, _classnames.default)(classes.branding, classes.header, {
          [classes.drawerBranding]: isDrawerVariant,
          [classes.appbarBranding]: forceDrawerVariant ? false : isAppBarVariant
        })
      }
    }, renderHamburger(), _react.default.createElement(_Branding.default, {
      logo: logo,
      title: title,
      subtitle: branding,
      version: version,
      className: (0, _classnames.default)({
        [classes.permanentDrawerBrandingButton]: permanent && isDrawerVariant,
        [classes.permanentAppbarBrandingButton]: permanent && isAppBarVariant
      }),
      onClick: () => {
        router.route({
          id: "home"
        });
      }
    })), _react.default.createElement(_core.Toolbar, {
      className: (0, _classnames.default)(classes.navigation, {
        [classes.drawerBorder]: isDrawerVariant
      })
    }, _react.default.createElement("div", {
      className: (0, _classnames.default)(classes.scroll, {
        [classes.scrollVertical]: isDrawerVariant,
        [classes.scrollHorizontal]: forceDrawerVariant ? false : isAppBarVariant
      })
    }, _react.default.createElement(_Navigation.default, {
      horizontal: forceDrawerVariant ? false : isAppBarVariant,
      collapsed: isCollapsed,
      dense: dense,
      nav: nav,
      showIcons: showIcons,
      routes: router.navigationRoutes
    }))), _react.default.createElement("div", {
      className: (0, _classnames.default)(classes.user, {
        [classes.drawerBorder]: forceDrawerVariant ? true : isDrawerVariant
      })
    }, _react.default.createElement(_User.default, {
      variant: forceDrawerVariant ? "drawer" : variant,
      collapsed: collapsed,
      icon: nav["bananas.me:list"]
    })));
  };

  var renderMobileDrawer = () => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_core.AppBar, {
    position: "relative",
    elevation: 0,
    classes: {
      root: (0, _classnames.default)(classes.appbar, classes.header)
    },
    "data-testid": "navbar-appbar"
  }, _react.default.createElement(_core.Box, {
    paddingRight: 2,
    display: "flex",
    justifyContent: "space-between"
  }, _react.default.createElement(_Hamburger.default, {
    edge: "start",
    open: mobileDrawerOpen,
    onToggle: () => setMobileDrawerOpen(true)
  }), _react.default.createElement(_Branding.default, {
    logo: logo,
    title: title,
    subtitle: branding,
    version: version,
    fullWidth: false,
    onClick: () => {
      router.route({
        id: "home"
      });
    }
  }))), _react.default.createElement(_core.SwipeableDrawer, {
    classes: {
      paper: classes.mobileDrawer
    },
    onClose: () => setMobileDrawerOpen(false),
    onOpen: () => setMobileDrawerOpen(true),
    anchor: "left",
    open: mobileDrawerOpen
  }, renderChildren(false, true)));

  var renderDesktopDrawer = () => {
    return variant === "drawer" ? _react.default.createElement(_core.Drawer, {
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
    }, renderChildren()) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
      className: classes.pageOffset
    }), _react.default.createElement(_core.AppBar, {
      position: "fixed",
      elevation: 0,
      classes: {
        root: (0, _classnames.default)(classes.appbar, classes.header)
      },
      "data-testid": "navbar-appbar"
    }, _react.default.createElement(_Container.default, {
      className: classes.appbarContainer
    }, renderChildren())));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_core.Hidden, {
    smUp: true
  }, renderMobileDrawer()), _react.default.createElement(_core.Hidden, {
    implementation: "css",
    xsDown: true
  }, renderDesktopDrawer()));
};

NavBar.propTypes = {
  variant: _propTypes.default.string,
  dense: _propTypes.default.bool,
  permanent: _propTypes.default.bool,
  collapsed: _propTypes.default.bool,
  classes: _propTypes.default.object.isRequired,
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
  // items. Nesting partly overrides this behaviour. Putting the children under their
  // respective parent.

  var defaultNav = Object.keys(DEFAULT_NAV).reduce((result, key) => {
    if (!{}.hasOwnProperty.call(navObject, key)) {
      result[key] = DEFAULT_NAV[key];
    }

    return result;
  }, {});
  return _objectSpread({}, defaultNav, {}, navObject);
}