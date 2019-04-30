"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _styles = require("@material-ui/core/styles");

var _AccountCircle = _interopRequireDefault(require("@material-ui/icons/AccountCircle"));

var _Home = _interopRequireDefault(require("@material-ui/icons/Home"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Branding = _interopRequireDefault(require("./Branding"));

var _Container = _interopRequireDefault(require("./Container"));

var _Hamburger = _interopRequireDefault(require("./Hamburger"));

var _Navigation = _interopRequireDefault(require("./Navigation"));

var _User = _interopRequireDefault(require("./User"));

var _context = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
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
    width: 40 + theme.spacing.unit * 2 + 1,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawerBranding: {},
  permanentDrawerBrandingButton: {
    padding: 0,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
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
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 2
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
    const variant = props.variant,
          permanent = props.permanent,
          collapsed = props.collapsed;
    const isDrawerVariant = variant === "drawer";
    const isAppBarVariant = variant === "appbar"; // Set default icons

    const icons = _objectSpread({
      enabled: Boolean(props.icons),
      // Helper: Show icons or not
      home: _Home.default,
      "bananas.me:list": _AccountCircle.default
    }, props.icons);

    return _objectSpread({}, state, {
      isDrawerVariant,
      isAppBarVariant,
      permanent,
      collapsed,
      icons
    });
  }

  renderChildren() {
    const _this$props = this.props,
          classes = _this$props.classes,
          variant = _this$props.variant,
          dense = _this$props.dense,
          logo = _this$props.logo,
          title = _this$props.title,
          branding = _this$props.branding,
          version = _this$props.version;
    const _this$state = this.state,
          isDrawerVariant = _this$state.isDrawerVariant,
          isAppBarVariant = _this$state.isAppBarVariant,
          collapsed = _this$state.collapsed,
          permanent = _this$state.permanent,
          icons = _this$state.icons;
    const router = this.context.router;
    const routes = router.navigationRoutes;
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
      icons: icons,
      routes: routes
    }))), _react.default.createElement("div", {
      className: (0, _classnames.default)(classes.user, {
        [classes.drawerBorder]: isDrawerVariant
      })
    }, _react.default.createElement(_User.default, {
      variant: variant,
      collapsed: collapsed,
      icon: icons["bananas.me:list"]
    })));
  }

  render() {
    const _this$props2 = this.props,
          classes = _this$props2.classes,
          variant = _this$props2.variant;
    const collapsed = this.state.collapsed;
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
  // Used in: getDerivedStateFromProps
  // eslint-disable-next-line react/no-unused-prop-types
  permanent: _propTypes.default.bool,
  collapsed: _propTypes.default.bool,
  title: _propTypes.default.string,
  branding: _propTypes.default.string,
  version: _propTypes.default.string,
  logo: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.node]),
  // Used in: getDerivedStateFromProps
  // eslint-disable-next-line react/no-unused-prop-types
  icons: _propTypes.default.object
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
  icons: undefined
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasNavBar"
})(NavBar);

exports.default = _default;