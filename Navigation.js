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

var _context = _interopRequireDefault(require("./context"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hasSelectedChild = function hasSelectedChild(url) {
  var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return Boolean(children.filter(child => url.includes(child.path)).length);
};

var useStyles = (0, _styles.makeStyles)(theme => (0, _styles.createStyles)({
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
  nestedMenuList: {
    background: theme.palette.action.hover,
    paddingTop: 0,
    paddingBottom: 0,
    "& > *": {
      paddingLeft: "".concat(theme.spacing(2), "px !important")
    },
    "&$dense > *": {
      paddingLeft: "0 !important"
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
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
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
    height: theme.spacing(4),
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
}));

var transformRoutes = (routes, navProps) => {
  var navKeys = Object.keys(navProps);
  return routes.reduce((aggr, route) => {
    if (navKeys.includes(route.id)) {
      var np = navProps[route.id]; // differentiate between the value being an Object or an react component

      if (np && typeof np === "function" || np && np.$$typeof) {
        // {"example:user:list": {icon: IconComponent, parent: "Home"}}
        return [...aggr, _objectSpread({}, route, {
          icon: np
        })];
      } // {"example:user:list": Icon}


      return [...aggr, _objectSpread({}, route, {}, np)];
    }

    return [...aggr, route];
  }, []);
};

var nestRoutes = passedRoutes => {
  // separate parents and children
  var splitRoutes = passedRoutes.reduce((_ref, r) => {
    var {
      parents,
      children
    } = _ref;
    return r.parent ? {
      children: [...children, r],
      parents
    } : {
      parents: [...parents, r],
      children
    };
  }, {
    children: [],
    parents: []
  }); // if there are children, nest them ...

  if (splitRoutes.children) {
    return splitRoutes.parents.reduce((aggr, pa) => {
      // find corresponding parent
      // TODO : Handle orphans and deeper nesting of menu
      var p = splitRoutes.children.filter(c => c.parent === pa.name);
      return [...aggr, _objectSpread({}, pa, {
        children: p
      })];
    }, []);
  } // ... and if not, return the parents. which means all of the routes.


  return splitRoutes.parents;
};

function Navigation(props) {
  var {
    router
  } = _react.default.useContext(_context.default);

  var classes = useStyles();
  var currentUrl = router.history.location.pathname;
  var {
    routes,
    collapsed,
    horizontal,
    dense,
    nav,
    showIcons
  } = props;
  var navKeys = Object.keys(nav); // Put items listed in `nav` first, then keep the original (alphabetical) order.

  var indexMap = routes.reduce((result, route, index) => {
    var navIndex = navKeys.indexOf(route.id);
    result[route.id] = navIndex >= 0 ? navIndex : index + navKeys.length;
    return result;
  }, {});
  var sortedRoutes = routes.slice().sort((a, b) => indexMap[a.id] - indexMap[b.id]);
  var groupedRoutes = sortedRoutes.reduce((result, route) => {
    var {
      app
    } = route;
    var appRoutes = result[app];

    if (appRoutes === undefined) {
      appRoutes = [];
      result[app] = appRoutes;
    }

    appRoutes.push(route);
    return result;
  }, {});
  var apps = Object.keys(groupedRoutes);
  var multipleApps = apps.length > 2;

  var navigationItems = _react.default.useMemo(() => apps.map(app => {
    var appRoutes = groupedRoutes[app]; // bypass nesting and just flatten the routes if the horizontal view is active

    var appRoutesWithProps = transformRoutes(appRoutes, nav);
    var appSettings = nav[app];
    var nestedRoutes = horizontal ? appRoutesWithProps : nestRoutes(appRoutesWithProps);
    var showSubheader = appSettings && appSettings.showSubheader !== undefined ? appSettings.showSubheader : true;
    return _react.default.createElement(_core.List, {
      key: app,
      disablePadding: true,
      className: (0, _classnames.default)(classes.list, {
        [classes.horizontal]: horizontal,
        [classes.vertical]: !horizontal,
        [classes.dense]: horizontal && dense,
        [classes.multiple]: multipleApps
      }),
      subheader: app && showSubheader && multipleApps && !horizontal && _react.default.createElement(_core.ListSubheader, {
        className: (0, _classnames.default)(classes.subheader, {
          [classes.subheaderCollapsed]: collapsed,
          [classes.subheaderExpanded]: !collapsed
        })
      }, app)
    }, nestedRoutes.map((_ref2) => {
      var {
        id,
        path,
        icon,
        title,
        children,
        hidden
      } = _ref2;
      var variant = horizontal ? "appbar" : "drawer";
      var isSelected = path.length > 1 ? Boolean(children !== undefined && hasSelectedChild(currentUrl, children)) || currentUrl.startsWith(path) : currentUrl === path;
      return hidden !== true ? _react.default.createElement(_react.default.Fragment, {
        key: id
      }, (!horizontal && (showIcons || !showIcons && id !== "home") || horizontal && id !== "home") && _react.default.createElement(_MenuItem.default, {
        route: id,
        variant: variant,
        title: title,
        icon: showIcons ? icon : null,
        dense: dense,
        selected: isSelected,
        collapsed: collapsed
      }), Boolean(children && children.length) && _react.default.createElement(_core.Collapse, {
        in: isSelected
      }, _react.default.createElement(_core.MenuList, {
        className: (0, _classnames.default)(classes.nestedMenuList, {
          [classes.dense]: collapsed || dense
        })
      }, children.map(c => _react.default.createElement(_MenuItem.default, {
        key: c.id,
        route: c.id,
        variant: variant,
        title: c.title,
        icon: showIcons ? c.icon : null,
        dense: true,
        selected: path.length > 1 ? currentUrl.includes(c.path) : currentUrl === path,
        collapsed: collapsed
      }))))) : null;
    }));
  }), [apps, classes.dense, classes.horizontal, classes.list, classes.multiple, classes.nestedMenuList, classes.subheader, classes.subheaderCollapsed, classes.subheaderExpanded, classes.vertical, collapsed, currentUrl, dense, groupedRoutes, horizontal, multipleApps, nav, showIcons]);

  return _react.default.createElement("div", {
    className: (0, _classnames.default)(classes.root, {
      [classes.verticalRoot]: !horizontal,
      [classes.horizontalRoot]: horizontal
    })
  }, navigationItems);
}

Navigation.propTypes = {
  routes: _propTypes.default.array.isRequired,
  collapsed: _propTypes.default.bool,
  horizontal: _propTypes.default.bool,
  dense: _propTypes.default.bool,
  nav: _propTypes.default.object.isRequired,
  showIcons: _propTypes.default.bool
};
Navigation.defaultProps = {
  collapsed: false,
  horizontal: false,
  dense: true,
  showIcons: false
};
var _default = Navigation;
exports.default = _default;