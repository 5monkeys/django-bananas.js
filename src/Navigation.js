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
    const { routes, collapsed, horizontal, dense, icons, classes } = this.props;
    const currentUrl = this.context.router.history.location.pathname;

    const groupedRoutes = routes.reduce((nav, route) => {
      let app = nav[route.app];
      if (app === undefined) {
        app = [];
        nav[route.app] = app;
      }
      app.push(route);
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
          {appRoutes.map(({ id, path, title }) => (
            <NavigationItem
              key={id}
              route={id}
              icon={icons ? (icons === true ? true : icons[id]) : false}
              title={title}
              horizontal={horizontal}
              collapsed={collapsed}
              selected={currentUrl.startsWith(path)}
            />
          ))}
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
    backgroundColor: "rgba(0, 0, 0, 0.14)",
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
  collapsed,
  horizontal,
  icon,
}) => {
  const CustomIcon = icon;
  return (
    <AdminContext.Consumer>
      {context => (
        <ListItem
          className={classNames(classes.root, {
            [classes.collapsed]: icon === true && collapsed,
            [classes.expanded]: icon === true && !collapsed,
          })}
          dense={horizontal}
          button
          selected={selected}
          onClick={e => {
            e.preventDefault();
            context.router.route({ id: route });
          }}
        >
          {icon &&
            (icon === true ? (
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
  icons: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
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
  collapsed: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

UnstyledNavigationItem.defaultProps = {
  selected: false,
  horizontal: false,
  collapsed: false,
  icon: true,
};

export default withStyles(styles)(Navigation);
