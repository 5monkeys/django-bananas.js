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

var _context = _interopRequireDefault(require("./context"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = theme => ({
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
    var {
      user,
      router
    } = this.context;
    var {
      classes,
      variant,
      collapsed,
      icon
    } = this.props;
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
  icon: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
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