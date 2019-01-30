import {
  Avatar,
  ButtonBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "./context";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ...theme.mixins.toolbar,
  },
  drawerVariant: {
    borderTop: "1px solid rgba(0, 0, 0, 0.14)",
  },
  appbarVariant: {},
  user: {
    flexShrink: 0,
    "& *": { lineHeight: 1.2 },
  },
  avatar: {
    backgroundColor: "rgba(0, 0, 0, 0.14)",
    margin: 0,
  },
  rightAligned: {
    flexDirection: "row-reverse",
    textAlign: "right",
    paddingRight: theme.spacing.unit * 3,
  },
  link: {
    "& > * ": {
      fontSize: "0.75rem",
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
  expanded: {
    transition: theme.transitions.create(["padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  collapsed: {
    paddingLeft: theme.spacing.unit + 1,
    transition: theme.transitions.create(["padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class User extends React.Component {
  static contextType = AdminContext;

  render() {
    const { user, router } = this.context;
    const { classes, variant, collapsed } = this.props;

    const isDrawerVariant = variant === "drawer";
    const isAppBarVariant = variant === "appbar";

    const UserIcon = PersonIcon;
    const logoutText = router.reverseRoutes.bananas_logout_create.title;

    if (!user) {
      return null;
    }

    return (
      <div>
        <List
          dense={true}
          className={classNames(classes.root, {
            [classes.drawerVariant]: isDrawerVariant,
            [classes.appbarVariant]: isAppBarVariant,
          })}
        >
          <ListItem
            disableGutters={isAppBarVariant}
            className={classNames(classes.user, {
              [classes.rightAligned]: isAppBarVariant,
              [classes.collapsed]: collapsed,
              [classes.expanded]: !collapsed,
            })}
          >
            {UserIcon && (
              <ListItemAvatar>
                <Avatar classes={{ colorDefault: classes.avatar }}>
                  <UserIcon />
                </Avatar>
              </ListItemAvatar>
            )}
            <ListItemText
              primaryTypographyProps={{
                color: "inherit",
                noWrap: true,
              }}
              secondaryTypographyProps={{
                color: "inherit",
              }}
              primary={user.full_name}
              secondary={
                <ButtonBase
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
          </ListItem>
        </List>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.string,
  collapsed: PropTypes.bool,
};

User.defaultProps = {
  variant: "default",
  collapsed: false,
};

export default withStyles(styles)(User);
