"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _AccountCircle = _interopRequireDefault(require("@material-ui/icons/AccountCircle"));

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  return {
    root: _objectSpread({
      display: "flex",
      padding: 0,
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopColor: theme.palette.divider
    }, theme.mixins.toolbar),
    link: {
      fontSize: "inherit",
      "& > *": {
        fontSize: "0.9em"
      }
    },
    drawerLink: {
      "&:hover": {
        color: theme.palette.primary.main,
        opacity: 1
      }
    },
    appbarLink: {
      "&:hover": {
        color: theme.palette.secondary.light,
        opacity: 1
      }
    }
  };
};

var User =
/*#__PURE__*/
function (_React$Component) {
  _inherits(User, _React$Component);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, _getPrototypeOf(User).apply(this, arguments));
  }

  _createClass(User, [{
    key: "render",
    value: function render() {
      var _classNames,
          _this = this;

      var _this$context = this.context,
          user = _this$context.user,
          router = _this$context.router;
      var _this$props = this.props,
          classes = _this$props.classes,
          variant = _this$props.variant,
          collapsed = _this$props.collapsed,
          icon = _this$props.icon;
      var isDrawerVariant = variant === "drawer";
      var isAppBarVariant = variant === "appbar";
      var route = router.getRoute("bananas.me:list");
      var logoutText = router.getRoute("bananas.logout:create").title;
      var UserIcon = icon || _AccountCircle.default;
      var selected = route.path === router.history.location.pathname;
      return Boolean(user.id) && _react.default.createElement(_core.List, {
        classes: {
          root: classes.root
        }
      }, _react.default.createElement(_MenuItem.default, {
        variant: variant,
        direction: isAppBarVariant ? "rtl" : "ltr",
        route: route.id,
        selected: selected,
        collapsed: collapsed,
        icon: UserIcon,
        title: user.full_name,
        subtitle: _react.default.createElement(_core.ButtonBase, {
          classes: {
            root: classes.logout
          },
          className: (0, _classnames.default)(classes.link, (_classNames = {}, _defineProperty(_classNames, classes.drawerLink, isDrawerVariant), _defineProperty(_classNames, classes.appbarLink, isAppBarVariant), _classNames)),
          onClick: function onClick(e) {
            e.preventDefault();

            _this.context.admin.logout();
          }
        }, _react.default.createElement(_core.Typography, {
          color: "inherit"
        }, logoutText))
      }));
    }
  }]);

  return User;
}(_react.default.Component);

_defineProperty(User, "contextType", _context.default);

User.propTypes = {
  classes: _propTypes.default.object.isRequired,
  variant: _propTypes.default.string,
  collapsed: _propTypes.default.bool,
  icon: _propTypes.default.func
};
User.defaultProps = {
  variant: "drawer",
  // drawer|appbar
  collapsed: false,
  icon: undefined
};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasUser"
})(User);

exports.default = _default;