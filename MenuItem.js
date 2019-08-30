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

var _Link = _interopRequireDefault(require("./Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = theme => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    transition: theme.transitions.create("min-height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  // Classes for states
  selected: {},
  expanded: {},
  collapsed: {},
  wide: {},
  dense: {},
  leftAligned: {},
  rightAligned: {
    // Reverse order of avatar and label
    flexDirection: "row-reverse",
    textAlign: "right"
  },
  multiline: {
    "& *": {
      // Label with multiple lines (priamry and secondary)
      lineHeight: 1.2
    },
    "& $icon": {
      // Large Icon to span multiple lines
      width: 40,
      height: 40,
      fontSize: 40
    }
  },
  drawerVariant: {
    "&$leftAligned": {
      paddingLeft: 0
    },
    "&$rightAligned": {
      paddingRight: 0
    },
    "&$wide": {
      // Wide outer height
      minHeight: 40 + theme.spacing(1),
      "& $avatarItem": {
        // Expanded avatar wrapper width, with centered Avatar
        width: 40 + theme.spacing(3)
      },
      "&$collapsed $avatarItem": {
        // Collapsed avatar wrapper width, with centered Avatar
        width: 40 + theme.spacing(2)
      }
    },
    "&$dense": {
      // Dense outer height
      minHeight: 24 + theme.spacing(1),
      "& $avatarItem": {
        // Avatar wrapper width, with centered Avatar
        width: 40 + theme.spacing(2)
      }
    },
    "&$expanded $labelItem": {
      opacity: 1.0 // Fade label when expanding

    },
    "&$collapsed $labelItem": {
      opacity: 0.0 // Fade label when collapsing

    },
    "& $labelInset:first-child": {
      // Outermost left edge padding when icons disabled
      paddingLeft: theme.spacing(3)
    }
  },
  appbarVariant: {
    "&$wide": _objectSpread({}, theme.mixins.toolbar),
    "&$dense": {
      minHeight: 36,
      "&$leftAligned": {
        // Outermost edge padding
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
      }
    },
    "&$leftAligned": {
      // Outermost edge padding
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      "& $avatarItem": {
        // Padding between avatar and label
        marginRight: theme.spacing(1)
      }
    },
    "&$rightAligned": {
      // Outermost edge padding
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(3),
      "& $avatarItem": {
        // Padding between avatar and label
        marginLeft: theme.spacing(1)
      }
    },
    "& $labelInset:first-child": {
      // Outermost left edge padding when icons disabled
      paddingLeft: 0
    },
    "& $label": {
      color: theme.palette.primary.contrastText
    },
    "& $subtitle": {
      color: theme.palette.primary.contrastText,
      "& > *": {
        opacity: 0.54
      }
    },
    "& $icon": {
      color: theme.palette.primary.contrastText
    },
    "& $avatar": {
      color: theme.palette.primary.contrastText
    }
  },
  avatarItem: {
    // Avatar wrapper for flexing
    flexShrink: 0,
    flexGrow: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "inherit",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  labelItem: {
    // Text label wrapper for flexing
    flexShrink: 1,
    flexGrow: 0,
    padding: 0,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  label: {
    // Text label Typography element
    color: theme.palette.text.primary,
    transition: theme.transitions.create(["font-size"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  subtitle: {
    color: theme.palette.text.secondary
  },
  labelInset: {},
  // Class for inset padding when icons disabled
  avatar: {
    // Avatar element, circle or transparent depending on child
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
    fontSize: 24,
    margin: 0,
    width: "auto",
    height: "auto",
    transition: theme.transitions.create(["width", "height", "font-size"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  char: {
    // Circle Avatar variant with first letter of label
    backgroundColor: theme.palette.action.selected,
    fontSize: "inherit",
    width: 36,
    height: 36
  },
  charDense: {
    // Dense version of circle avatar
    fontSize: "0.9em",
    width: 24,
    height: 24
  },
  icon: {
    // Icon element, child of Avatar
    marginRight: 0,
    fontSize: "inherit",
    color: theme.palette.text.primary,
    opacity: 0.666,
    transition: theme.transitions.create(["width", "height", "font-size"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

var MenuItem = (_ref) => {
  var {
    classes,
    route,
    title,
    subtitle,
    variant,
    icon,
    selected,
    collapsed,
    dense,
    direction
  } = _ref;
  var ItemIcon = icon;
  var showIcon = ItemIcon !== null;
  var isIconDefined = showIcon && Boolean(ItemIcon);
  var isDrawerVariant = variant === "drawer";
  var isAppBarVariant = variant === "appbar";
  var isLtR = direction === "ltr";
  var isRtL = direction === "rtl";
  var isMultiLine = Boolean(subtitle);
  return _react.default.createElement(_Link.default, {
    route: route
  }, _react.default.createElement(_core.ListItem, {
    className: (0, _classnames.default)(classes.root, {
      [classes.drawerVariant]: isDrawerVariant,
      [classes.appbarVariant]: isAppBarVariant,
      [classes.leftAligned]: isLtR,
      [classes.rightAligned]: isRtL,
      [classes.expanded]: !collapsed,
      [classes.collapsed]: collapsed,
      [classes.dense]: dense,
      [classes.wide]: !dense,
      [classes.multiline]: isMultiLine,
      [classes.selected]: selected
    }),
    dense: dense || isMultiLine,
    selected: selected,
    button: true
  }, showIcon && _react.default.createElement("div", {
    className: classes.avatarItem,
    "data-testid": "MenuItemIcon"
  }, _react.default.createElement(_core.ListItemAvatar, null, _react.default.createElement(_core.Avatar, {
    classes: {
      root: (0, _classnames.default)(classes.avatar, {
        [classes.char]: !isIconDefined,
        [classes.charDense]: !isIconDefined && dense && !isMultiLine
      })
    }
  }, isIconDefined ? _react.default.createElement(ItemIcon, {
    className: classes.icon
  }) : title.substring(0, 1)))), _react.default.createElement(_core.ListItemText, {
    classes: {
      root: classes.labelItem,
      primary: classes.label,
      secondary: classes.subtitle,
      inset: classes.labelInset
    },
    inset: !showIcon,
    primaryTypographyProps: {
      noWrap: true
    },
    secondaryTypographyProps: {
      noWrap: true
    },
    primary: title,
    secondary: subtitle,
    "data-testid": "MenuItemText"
  })));
};

MenuItem.propTypes = {
  classes: _propTypes.default.object.isRequired,
  route: _propTypes.default.string.isRequired,
  title: _propTypes.default.string.isRequired,
  subtitle: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  variant: _propTypes.default.string,
  icon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func, _propTypes.default.object]),
  dense: _propTypes.default.bool,
  selected: _propTypes.default.bool,
  collapsed: _propTypes.default.bool,
  direction: _propTypes.default.string
};
MenuItem.defaultProps = {
  variant: "drawer",
  // drawer|appbar
  subtitle: undefined,
  icon: undefined,
  dense: false,
  selected: false,
  collapsed: false,
  direction: "ltr" // ltr | rtl

};

var _default = (0, _styles.withStyles)(styles, {
  name: "BananasMenuItem"
})(MenuItem);

exports.default = _default;