import { ButtonBase, List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { useAdmin } from "../contexts/AdminContext";
import MenuItem from "./MenuItem";

const useStyles = makeStyles(theme => ({
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
      fontSize: "0.9em",
    },
  },
  drawerLink: {
    "&:hover": {
      color: theme.palette.primary.main,
      opacity: 1,
    },
  },
  appbarLink: {
    "&:hover": {
      color: theme.palette.secondary.light,
      opacity: 1,
    },
  },
}));

const User = ({ variant, collapsed, icon }) => {
  const { admin, user, router } = useAdmin();
  const classes = useStyles();

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
                admin.logout();
              }}
            >
              <Typography color="inherit">{logoutText}</Typography>
            </ButtonBase>
          }
        />
      </List>
    )
  );
};

User.propTypes = {
  variant: PropTypes.string,
  collapsed: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

User.defaultProps = {
  variant: "drawer", // drawer|appbar
  collapsed: false,
  icon: undefined,
};

export default User;
