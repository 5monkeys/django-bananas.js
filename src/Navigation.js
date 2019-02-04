import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "./context";

const styles = theme => ({
  root: {},
  dense: {
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
    textTransform: "uppercase",
    fontSize: `${0.75}rem`,
    overflow: "hidden",
    height: 48,
  },
  collapsed: {
    height: 0,
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  expanded: {
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

    const apps = Object.keys(groupedRoutes).sort((a, b) => a < b);

    return apps.map(app => {
      const appRoutes = groupedRoutes[app];
      return (
        <List
          key={app}
          className={classNames(classes.root, {
            [classes.horizontal]: horizontal,
            [classes.dense]: horizontal && dense,
          })}
          dense={horizontal}
          disablePadding
          subheader={
            app &&
            !horizontal && (
              <ListSubheader
                className={classNames(classes.subheader, {
                  [classes.collapsed]: collapsed,
                  [classes.expanded]: !collapsed,
                })}
              >
                {app}
              </ListSubheader>
            )
          }
        >
          {appRoutes.map(
            ({ id, path, title }) =>
              (collapsed || (!collapsed && id !== "home")) && (
                <NavigationItem
                  key={id}
                  route={id}
                  icon={icons.enabled ? icons[id] : null}
                  title={title}
                  horizontal={horizontal}
                  collapsed={collapsed}
                  selected={
                    path.length > 1
                      ? currentUrl.startsWith(path)
                      : currentUrl === path
                  }
                />
              )
          )}
        </List>
      );
    });
  }
}

const itemStyles = theme => ({
  root: {},
  dense: {
    padding: 0,
  },
  collapsed: {
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  expanded: {
    paddingLeft: theme.spacing.unit * 2,
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  avatar: {
    width: 24,
    height: 24,
    fontSize: "0.8em",
    backgroundColor: theme.palette.action.selected,
    color: "inherit",
    opacity: 0.5,
    marginRight: theme.spacing.unit * 2,
  },
  icon: {
    color: "inherit",
    opacity: 0.75,
  },
});

const UnstyledNavigationItem = ({
  classes,
  route,
  title,
  selected,
  horizontal,
  icon,
}) => {
  const CustomIcon = icon;
  return (
    <AdminContext.Consumer>
      {context => (
        <ListItem
          className={classes.root}
          dense={horizontal}
          button
          selected={selected}
          onClick={e => {
            e.preventDefault();
            context.router.route({ id: route });
          }}
        >
          {icon !== null &&
            (icon === undefined ? (
              <Avatar className={classes.avatar}>
                {title.substring(0, 1)}
              </Avatar>
            ) : (
              <ListItemIcon className={classes.icon}>
                <CustomIcon
                  color={!horizontal && !selected ? "inherit" : undefined}
                />
              </ListItemIcon>
            ))}

          <ListItemText
            primaryTypographyProps={{
              color: "inherit",
            }}
            className={classes.dense}
            primary={title}
          />
        </ListItem>
      )}
    </AdminContext.Consumer>
  );
};
const NavigationItem = withStyles(itemStyles)(UnstyledNavigationItem);

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

UnstyledNavigationItem.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  horizontal: PropTypes.bool,
  icon: PropTypes.func,
};

UnstyledNavigationItem.defaultProps = {
  selected: false,
  horizontal: false,
  icon: undefined,
};

export default withStyles(styles)(Navigation);
