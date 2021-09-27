import { Collapse, List, ListSubheader, MenuList } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "./AdminContext";
import MenuItem from "./MenuItem";

const hasSelectedChild = (url, children = []) => {
  return Boolean(children.filter(child => url.includes(child.path)).length);
};

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      "&$verticalRoot > $list + $list": {
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: theme.palette.action.selected,
      },
      "&$horizontalRoot": {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        "& $list:first-child": {
          marginLeft: "auto",
        },
        "& $list:last-child": {
          marginRight: "auto",
        },
      },
    },
    nestedMenuList: {
      background: theme.palette.action.hover,
      paddingTop: 0,
      paddingBottom: 0,
      "& > *": {
        paddingLeft: `${theme.spacing(2)}px !important`,
      },
      "&$dense > *": {
        paddingLeft: "0 !important",
      },
    },
    verticalRoot: {},
    horizontalRoot: {},

    // List
    list: {
      "&:first-child": {
        paddingTop: 0,
      },
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    horizontal: {
      display: "flex",
      flexDirection: "row",
    },
    vertical: {
      "&multiple": {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    dense: {},
    multiple: {},

    // Subheader
    subheader: {
      backgroundColor: theme.palette.background.paper,
      textTransform: "uppercase",
      fontSize: `${0.75}rem`,
      overflow: "hidden",
      height: theme.spacing(4),
      display: "flex",
      alignItems: "center",
    },
    subheaderCollapsed: {
      height: 0,
      transition: theme.transitions.create("height", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    subheaderExpanded: {
      transition: theme.transitions.create("height", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);

const transformRoutes = (routes, navProps) => {
  const navKeys = Object.keys(navProps);
  return routes.reduce((aggr, route) => {
    if (navKeys.includes(route.id)) {
      const np = navProps[route.id];
      // differentiate between the value being an Object or an react component
      if ((np && typeof np === "function") || (np && np.$$typeof)) {
        // {"example:user:list": {icon: IconComponent, parent: "Home"}}
        return [...aggr, { ...route, icon: np }];
      }
      // {"example:user:list": Icon}
      return [...aggr, { ...route, ...np }];
    }
    return [...aggr, route];
  }, []);
};

const nestRoutes = passedRoutes => {
  // separate parents and children
  const splitRoutes = passedRoutes.reduce(
    ({ parents, children }, r) => {
      return r.parent
        ? { children: [...children, r], parents }
        : { parents: [...parents, r], children };
    },
    { children: [], parents: [] }
  );
  // if there are children, nest them ...
  if (splitRoutes.children) {
    return splitRoutes.parents.reduce((aggr, pa) => {
      // find corresponding parent
      // TODO : Handle orphans and deeper nesting of menu
      const p = splitRoutes.children.filter(c => c.parent === pa.name);
      return [...aggr, { ...pa, children: p }];
    }, []);
  }
  // ... and if not, return the parents. which means all of the routes.
  return splitRoutes.parents;
};

function Navigation(props) {
  const { router } = React.useContext(AdminContext);
  const classes = useStyles();

  const currentUrl = router.history.location.pathname;
  const { routes, collapsed, horizontal, dense, nav, showIcons } = props;

  const navKeys = Object.keys(nav);

  // Put items listed in `nav` first, then keep the original (alphabetical) order.
  const indexMap = routes.reduce((result, route, index) => {
    const navIndex = navKeys.indexOf(route.id);
    result[route.id] = navIndex >= 0 ? navIndex : index + navKeys.length;
    return result;
  }, {});

  const sortedRoutes = routes
    .slice()
    .sort((a, b) => indexMap[a.id] - indexMap[b.id]);

  const groupedRoutes = sortedRoutes.reduce((result, route) => {
    const { app } = route;
    let appRoutes = result[app];
    if (appRoutes === undefined) {
      appRoutes = [];
      result[app] = appRoutes;
    }
    appRoutes.push(route);
    return result;
  }, {});

  const apps = Object.keys(groupedRoutes);
  const multipleApps = apps.length > 2;

  const navigationItems = React.useMemo(
    () =>
      apps.map(app => {
        const appRoutes = groupedRoutes[app];
        // bypass nesting and just flatten the routes if the horizontal view is active
        const appRoutesWithProps = transformRoutes(appRoutes, nav);
        const appSettings = nav[app];
        const nestedRoutes = horizontal
          ? appRoutesWithProps
          : nestRoutes(appRoutesWithProps);
        const showSubheader =
          appSettings && appSettings.showSubheader !== undefined
            ? appSettings.showSubheader
            : true;
        return (
          <List
            key={app}
            disablePadding
            className={classNames(classes.list, {
              [classes.horizontal]: horizontal,
              [classes.vertical]: !horizontal,
              [classes.dense]: horizontal && dense,
              [classes.multiple]: multipleApps,
            })}
            subheader={
              app &&
              showSubheader &&
              multipleApps &&
              !horizontal && (
                <ListSubheader
                  className={classNames(classes.subheader, {
                    [classes.subheaderCollapsed]: collapsed,
                    [classes.subheaderExpanded]: !collapsed,
                  })}
                >
                  {app}
                </ListSubheader>
              )
            }
          >
            {nestedRoutes.map(({ id, path, icon, title, children, hidden }) => {
              const variant = horizontal ? "appbar" : "drawer";
              const isSelected =
                path.length > 1
                  ? Boolean(
                      children !== undefined &&
                        hasSelectedChild(currentUrl, children)
                    ) || currentUrl.startsWith(path)
                  : currentUrl === path;

              return hidden !== true ? (
                <React.Fragment key={id}>
                  {((!horizontal &&
                    (showIcons || (!showIcons && id !== "home"))) ||
                    (horizontal && id !== "home")) && (
                    <MenuItem
                      route={id}
                      variant={variant}
                      title={title}
                      icon={showIcons ? icon : null}
                      dense={dense}
                      selected={isSelected}
                      collapsed={collapsed}
                    />
                  )}
                  {Boolean(children && children.length) && (
                    <Collapse in={isSelected}>
                      <MenuList
                        className={classNames(classes.nestedMenuList, {
                          [classes.dense]: collapsed || dense,
                        })}
                      >
                        {children.map(c => (
                          <MenuItem
                            key={c.id}
                            route={c.id}
                            variant={variant}
                            title={c.title}
                            icon={showIcons ? c.icon : null}
                            dense
                            selected={
                              path.length > 1
                                ? currentUrl.includes(c.path)
                                : currentUrl === path
                            }
                            collapsed={collapsed}
                          />
                        ))}
                      </MenuList>
                    </Collapse>
                  )}
                </React.Fragment>
              ) : null;
            })}
          </List>
        );
      }),
    [
      apps,
      classes.dense,
      classes.horizontal,
      classes.list,
      classes.multiple,
      classes.nestedMenuList,
      classes.subheader,
      classes.subheaderCollapsed,
      classes.subheaderExpanded,
      classes.vertical,
      collapsed,
      currentUrl,
      dense,
      groupedRoutes,
      horizontal,
      multipleApps,
      nav,
      showIcons,
    ]
  );

  return (
    <div
      className={classNames(classes.root, {
        [classes.verticalRoot]: !horizontal,
        [classes.horizontalRoot]: horizontal,
      })}
    >
      {navigationItems}
    </div>
  );
}

Navigation.propTypes = {
  routes: PropTypes.array.isRequired,
  collapsed: PropTypes.bool,
  horizontal: PropTypes.bool,
  dense: PropTypes.bool,
  nav: PropTypes.object.isRequired,
  showIcons: PropTypes.bool,
};
Navigation.defaultProps = {
  collapsed: false,
  horizontal: false,
  dense: true,
  showIcons: false,
};

export default Navigation;
