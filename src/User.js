import { ButtonBase, List, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import MenuItem from "./MenuItem";
import AdminContext from "./context";

const styles = theme => ({
  root: {
    display: "flex",
    padding: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.divider,
    ...theme.mixins.toolbar,
  },
  link: {
    fontSize: "inherit",
    "& > *": {
      fontSize: "0.95em",
    },
  },
  drawerLink: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  appbarLink: {
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
});

class User extends React.Component {
  static contextType = AdminContext;

  render() {
    const { user, router } = this.context;
    const { classes, variant, collapsed, icon } = this.props;

    const isDrawerVariant = variant === "drawer";
    const isAppBarVariant = variant === "appbar";

    const route = router.getRoute("bananas.me:list");
    const logoutText = router.getRoute("bananas.logout:create").title;
    const UserIcon = icon || AccountCircleIcon;
    const selected = route.path === router.history.location.pathname;

    return (
      Boolean(user.id) && (
        <List classes={{ root: classes.root }}>
          <MenuItem
            variant={variant}
            direction={isAppBarVariant ? "rtl" : "ltr"}
            route={route.id}
            selected={selected}
            collapsed={collapsed}
            icon={UserIcon}
            title={user.full_name}
            subtitle={
              <ButtonBase
                classes={{
                  root: classes.logout,
                }}
                className={classNames(classes.link, {
                  [classes.drawerLink]: isDrawerVariant,
                  [classes.appbarLink]: isAppBarVariant,
                })}
                onClick={e => {
                  e.preventDefault();
                  this.context.admin.logout();
                }}
              >
                <Typography color="inherit">{logoutText}</Typography>
              </ButtonBase>
            }
          />
        </List>
      )
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.string,
  collapsed: PropTypes.bool,
  icon: PropTypes.func,
};

User.defaultProps = {
  variant: "drawer", // drawer|appbar
  collapsed: false,
  icon: undefined,
};

export default withStyles(styles, { name: "BananasUser" })(User);
