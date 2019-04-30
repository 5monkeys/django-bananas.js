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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
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
});

class User extends _react.default.Component {
  render() {
    const _this$context = this.context,
          user = _this$context.user,
          router = _this$context.router;
    const _this$props = this.props,
          classes = _this$props.classes,
          variant = _this$props.variant,
          collapsed = _this$props.collapsed,
          icon = _this$props.icon;
    const isDrawerVariant = variant === "drawer";
    const isAppBarVariant = variant === "appbar";
    const route = router.getRoute("bananas.me:list");
    const logoutText = router.getRoute("bananas.logout:create").title;
    const UserIcon = icon || _AccountCircle.default;
    const selected = route.path === router.history.location.pathname;
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
        className: (0, _classnames.default)(classes.link, {
          [classes.drawerLink]: isDrawerVariant,
          [classes.appbarLink]: isAppBarVariant
        }),
        onClick: e => {
          e.preventDefault();
          this.context.admin.logout();
        }
      }, _react.default.createElement(_core.Typography, {
        color: "inherit"
      }, logoutText))
    }));
  }

}

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