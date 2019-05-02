import { List, ListSubheader } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import MenuItem from "./MenuItem";
import AdminContext from "./context";

const styles = theme => ({
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
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
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
    height: 32,
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
});

class Navigation extends React.Component {
  static contextType = AdminContext;

  render() {
    const currentUrl = this.context.router.history.location.pathname;
    const { routes, collapsed, horizontal, dense, icons, classes } = this.props;

    const groupedRoutes = routes.reduce((nav, route) => {
      const { app } = route;
      let appRoutes = nav[app];
      if (appRoutes === undefined) {
        appRoutes = [];
        nav[app] = appRoutes;
      }
      appRoutes.push(route);
      return nav;
    }, {});

    const apps = Object.keys(groupedRoutes);
    const multipleApps = apps.length > 2;

    return (
      <div
        className={classNames(classes.root, {
          [classes.verticalRoot]: !horizontal,
          [classes.horizontalRoot]: horizontal,
        })}
      >
        {apps.map(app => {
          const appRoutes = groupedRoutes[app];
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
              {appRoutes.map(
                ({ id, path, title }) =>
                  // Only show "Dashboard" item in vertical+icon mode
                  ((!horizontal &&
                    (icons.enabled || (!icons.enabled && id !== "home"))) ||
                    (horizontal && id !== "home")) && (
                    <MenuItem
                      key={id}
                      route={id}
                      variant={horizontal ? "appbar" : "drawer"}
                      title={title}
                      icon={icons.enabled ? icons[id] : null}
                      dense={dense}
                      selected={
                        path.length > 1
                          ? currentUrl.startsWith(path)
                          : currentUrl === path
                      }
                      collapsed={collapsed}
                    />
                  )
              )}
            </List>
          );
        })}
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  collapsed: PropTypes.bool,
  horizontal: PropTypes.bool,
  dense: PropTypes.bool,
  icons: PropTypes.object,
};
Navigation.defaultProps = {
  collapsed: false,
  horizontal: false,
  dense: true,
  icons: undefined,
};

export default withStyles(styles)(Navigation);
