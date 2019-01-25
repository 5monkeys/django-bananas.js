import {
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

const styles = () => ({
  subheader: {
    textTransform: "uppercase",
    fontSize: `${0.75}rem`,
  },
});

class Navigation extends React.Component {
  static contextType = AdminContext;

  render() {
    const { routes, horizontal, dense, icons, classes } = this.props;
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
          dense={dense && horizontal}
          subheader={
            !horizontal && (
              <ListSubheader className={classes.subheader}>{app}</ListSubheader>
            )
          }
        >
          {appRoutes.map(({ id, path, title }) => (
            <NavigationItem
              key={id}
              route={id}
              icon={icons ? icons[id] : null}
              title={title}
              horizontal={horizontal}
              selected={currentUrl.startsWith(path)}
            />
          ))}
        </List>
      );
    });
  }
}

const itemStyles = () => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  centerText: {
    textAlign: "center",
  },

  denseItem: {
    padding: 0,
  },
  icon: {
    color: "inherit",
    opacity: 0.75,
  },
  iconVertical: {
    marginRight: 0,
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
          className={!horizontal ? classes.root : classes.centerText}
          button
          selected={selected}
          onClick={e => {
            e.preventDefault();
            context.router.route({ id: route });
          }}
        >
          {icon && (
            <ListItemIcon
              className={classNames(classes.icon, {
                [classes.iconVertical]: !horizontal,
              })}
            >
              <CustomIcon
                color={!horizontal && !selected ? "inherit" : undefined}
              />
            </ListItemIcon>
          )}

          <ListItemText
            primaryTypographyProps={{
              color: "inherit",
            }}
            classes={{ dense: classes.denseItem }}
            inset={icon && !horizontal && !CustomIcon}
            primary={title}
            // secondary={!horizontal && url}
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
  horizontal: PropTypes.bool,
  dense: PropTypes.bool,
  icons: PropTypes.object,
};
Navigation.defaultProps = {
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
