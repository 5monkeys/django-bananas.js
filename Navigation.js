"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _context = _interopRequireDefault(require("./context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  return {
    root: {
      "&$verticalRoot > $list + $list": {
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: theme.palette.action.selected
      },
      "&$horizontalRoot": {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        "& $list:first-child": {
          marginLeft: "auto"
        },
        "& $list:last-child": {
          marginRight: "auto"
        }
      }
    },
    verticalRoot: {},
    horizontalRoot: {},
    // List
    list: {
      "&:first-child": {
        paddingTop: 0
      },
      "&:last-child": {
        paddingBottom: 0
      }
    },
    horizontal: {
      display: "flex",
      flexDirection: "row"
    },
    vertical: {
      "&multiple": {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
      }
    },
    dense: {},
    multiple: {},
    // Subheader
    subheader: {
      backgroundColor: theme.palette.background.paper,
      textTransform: "uppercase",
      fontSize: "".concat(0.75, "rem"),
      overflow: "hidden",
      height: 32,
      display: "flex",
      alignItems: "center"
    },
    subheaderCollapsed: {
      height: 0,
      transition: theme.transitions.create("height", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    subheaderExpanded: {
      transition: theme.transitions.create("height", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  };
};

var Navigation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Navigation, _React$Component);

  function Navigation() {
    _classCallCheck(this, Navigation);

    return _possibleConstructorReturn(this, _getPrototypeOf(Navigation).apply(this, arguments));
  }

  _createClass(Navigation, [{
    key: "render",
    value: function render() {
      var _classNames;

      var currentUrl = this.context.router.history.location.pathname;
      var _this$props = this.props,
          routes = _this$props.routes,
          collapsed = _this$props.collapsed,
          horizontal = _this$props.horizontal,
          dense = _this$props.dense,
          icons = _this$props.icons,
          classes = _this$props.classes;
      var groupedRoutes = routes.reduce(function (nav, route) {
        var app = route.app;
        var appRoutes = nav[app];

        if (appRoutes === undefined) {
          appRoutes = [];
          nav[app] = appRoutes;
        }

        appRoutes.push(route);
        return nav;
      }, {});
      var apps = Object.keys(groupedRoutes).sort(function (a, b) {
        return a < b;
      });
      var multipleApps = apps.length > 2;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(classes.root, (_classNames = {}, _defineProperty(_classNames, classes.verticalRoot, !horizontal), _defineProperty(_classNames, classes.horizontalRoot, horizontal), _classNames))
      }, apps.map(function (app) {
        var _classNames2, _classNames3;

        var appRoutes = groupedRoutes[app];
        return _react.default.createElement(_core.List, {
          key: app,
          disablePadding: true,
          className: (0, _classnames.default)(classes.list, (_classNames2 = {}, _defineProperty(_classNames2, classes.horizontal, horizontal), _defineProperty(_classNames2, classes.vertical, !horizontal), _defineProperty(_classNames2, classes.dense, horizontal && dense), _defineProperty(_classNames2, classes.multiple, multipleApps), _classNames2)),
          subheader: app && multipleApps && !horizontal && _react.default.createElement(_core.ListSubheader, {
            className: (0, _classnames.default)(classes.subheader, (_classNames3 = {}, _defineProperty(_classNames3, classes.subheaderCollapsed, collapsed), _defineProperty(_classNames3, classes.subheaderExpanded, !collapsed), _classNames3))
          }, app)
        }, appRoutes.map(function (_ref) {
          var id = _ref.id,
              path = _ref.path,
              title = _ref.title;
          return (// Only show "Dashboard" item in vertical+icon mode
            (!horizontal && (icons.enabled || !icons.enabled && id !== "home") || horizontal && id !== "home") && _react.default.createElement(_MenuItem.default, {
              key: id,
              route: id,
              variant: horizontal ? "appbar" : "drawer",
              title: title,
              icon: icons.enabled ? icons[id] : null,
              dense: dense,
              selected: path.length > 1 ? currentUrl.startsWith(path) : currentUrl === path,
              collapsed: collapsed
            })
          );
        }));
      }));
    }
  }]);

  return Navigation;
}(_react.default.Component);

_defineProperty(Navigation, "contextType", _context.default);

Navigation.propTypes = {
  classes: _propTypes.default.object.isRequired,
  routes: _propTypes.default.array.isRequired,
  collapsed: _propTypes.default.bool,
  horizontal: _propTypes.default.bool,
  dense: _propTypes.default.bool,
  icons: _propTypes.default.object
};
Navigation.defaultProps = {
  collapsed: false,
  horizontal: false,
  dense: true,
  icons: undefined
};

var _default = (0, _styles.withStyles)(styles)(Navigation);

exports.default = _default;