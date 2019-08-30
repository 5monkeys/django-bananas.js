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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = theme => ({
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
});

class Navigation extends _react.default.Component {
  render() {
    var currentUrl = this.context.router.history.location.pathname;
    var {
      routes,
      collapsed,
      horizontal,
      dense,
      nav,
      showIcons,
      classes
    } = this.props;
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
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(classes.root, {
        [classes.verticalRoot]: !horizontal,
        [classes.horizontalRoot]: horizontal
      })
    }, apps.map(app => {
      var appRoutes = groupedRoutes[app];
      return _react.default.createElement(_core.List, {
        key: app,
        disablePadding: true,
        className: (0, _classnames.default)(classes.list, {
          [classes.horizontal]: horizontal,
          [classes.vertical]: !horizontal,
          [classes.dense]: horizontal && dense,
          [classes.multiple]: multipleApps
        }),
        subheader: app && multipleApps && !horizontal && _react.default.createElement(_core.ListSubheader, {
          className: (0, _classnames.default)(classes.subheader, {
            [classes.subheaderCollapsed]: collapsed,
            [classes.subheaderExpanded]: !collapsed
          })
        }, app)
      }, appRoutes.map((_ref) => {
        var {
          id,
          path,
          title
        } = _ref;
        return (// Only show "Dashboard" item in vertical+icon mode
          (!horizontal && (showIcons || !showIcons && id !== "home") || horizontal && id !== "home") && _react.default.createElement(_MenuItem.default, {
            key: id,
            route: id,
            variant: horizontal ? "appbar" : "drawer",
            title: title,
            icon: showIcons ? nav[id] : null,
            dense: dense,
            selected: path.length > 1 ? currentUrl.startsWith(path) : currentUrl === path,
            collapsed: collapsed
          })
        );
      }));
    }));
  }

}

_defineProperty(Navigation, "contextType", _context.default);

Navigation.propTypes = {
  classes: _propTypes.default.object.isRequired,
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

var _default = (0, _styles.withStyles)(styles)(Navigation);

exports.default = _default;