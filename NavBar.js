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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  return {
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

  };
};

var NavBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NavBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NavBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle", function () {
      _this.context.admin.settings.configure({
        collapsed: !_this.props.collapsed
      });
    });

    return _this;
  }

  _createClass(NavBar, [{
    key: "renderChildren",
    value: function renderChildren() {
      var _classNames,
          _classNames2,
          _this2 = this,
          _classNames4;

      var _this$props = this.props,
          classes = _this$props.classes,
          variant = _this$props.variant,
          dense = _this$props.dense,
          logo = _this$props.logo,
          title = _this$props.title,
          branding = _this$props.branding,
          version = _this$props.version;
      var _this$state = this.state,
          isDrawerVariant = _this$state.isDrawerVariant,
          isAppBarVariant = _this$state.isAppBarVariant,
          collapsed = _this$state.collapsed,
          permanent = _this$state.permanent,
          icons = _this$state.icons;
      var router = this.context.router;
      var routes = router.navigationRoutes;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Toolbar.default, {
        classes: {
          root: (0, _classnames.default)(classes.branding, classes.header, (_classNames = {}, _defineProperty(_classNames, classes.drawerBranding, isDrawerVariant), _defineProperty(_classNames, classes.appbarBranding, isAppBarVariant), _classNames))
        }
      }, isDrawerVariant && !permanent && _react.default.createElement(_Hamburger.default, {
        open: !collapsed,
        onToggle: this.toggle
      }), _react.default.createElement(_Branding.default, {
        logo: logo,
        title: title,
        subtitle: branding,
        version: version,
        className: (0, _classnames.default)((_classNames2 = {}, _defineProperty(_classNames2, classes.permanentDrawerBrandingButton, permanent && isDrawerVariant), _defineProperty(_classNames2, classes.permanentAppbarBrandingButton, permanent && isAppBarVariant), _classNames2)),
        onClick: function onClick() {
          _this2.context.router.route({
            id: "home"
          });
        }
      })), _react.default.createElement(_Toolbar.default, {
        className: (0, _classnames.default)(classes.navigation, _defineProperty({}, classes.drawerBorder, isDrawerVariant))
      }, _react.default.createElement("div", {
        className: (0, _classnames.default)(classes.scroll, (_classNames4 = {}, _defineProperty(_classNames4, classes.scrollVertical, isDrawerVariant), _defineProperty(_classNames4, classes.scrollHorizontal, isAppBarVariant), _classNames4))
      }, _react.default.createElement(_Navigation.default, {
        horizontal: isAppBarVariant,
        collapsed: collapsed,
        dense: dense,
        icons: icons,
        routes: routes
      }))), _react.default.createElement("div", {
        className: (0, _classnames.default)(classes.user, _defineProperty({}, classes.drawerBorder, isDrawerVariant))
      }, _react.default.createElement(_User.default, {
        variant: variant,
        collapsed: collapsed,
        icon: icons["bananas.me:list"]
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames6, _classNames7;

      var _this$props2 = this.props,
          classes = _this$props2.classes,
          variant = _this$props2.variant;
      var collapsed = this.state.collapsed;
      return variant === "drawer" ? _react.default.createElement(_Drawer.default, {
        variant: "permanent",
        anchor: "left",
        open: !collapsed,
        classes: {
          root: (0, _classnames.default)(classes.drawerRoot, classes.drawer, (_classNames6 = {}, _defineProperty(_classNames6, classes.drawerExpanded, !collapsed), _defineProperty(_classNames6, classes.drawerCollapsed, collapsed), _classNames6)),
          paper: (0, _classnames.default)(classes.drawer, (_classNames7 = {}, _defineProperty(_classNames7, classes.drawerExpanded, !collapsed), _defineProperty(_classNames7, classes.drawerCollapsed, collapsed), _classNames7))
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
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var variant = props.variant,
          permanent = props.permanent,
          collapsed = props.collapsed;
      var isDrawerVariant = variant === "drawer";
      var isAppBarVariant = variant === "appbar"; // Set default icons

      var icons = _objectSpread({
        enabled: Boolean(props.icons),
        // Helper: Show icons or not
        home: _Home.default,
        "bananas.me:list": _AccountCircle.default
      }, props.icons);

      return _objectSpread({}, state, {
        isDrawerVariant: isDrawerVariant,
        isAppBarVariant: isAppBarVariant,
        permanent: permanent,
        collapsed: collapsed,
        icons: icons
      });
    }
  }]);

  return NavBar;
}(_react.default.Component);

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