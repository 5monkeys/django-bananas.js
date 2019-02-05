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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.action.selected,
  },
  appbarVariant: {},
  user: {
    flexShrink: 0,
    justifyContent: "center",
    padding: 0,
    paddingLeft: theme.spacing.unit * 2,
    "& *": { lineHeight: 1.2 },
  },
  avatar: {
    backgroundColor: "transparent",
    fontSize: 36,
    margin: 0,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  text: {
    opacity: 1.0,
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerAvatar: {
    color: theme.palette.action.selected,
  },
  appbarAvatar: {
    color: "inherit",
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
    paddingLeft: theme.spacing.unit * 4.0,
    transition: theme.transitions.create(["padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& $text": {
      opacity: 0.0,
      transition: theme.transitions.create(["opacity"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
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

    const UserIcon = icon || AccountCircleIcon;
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
            <ListItemAvatar
              classes={{
                root: classes.avatar,
                icon: classNames(classes.icon, {
                  [classes.drawerAvatar]: isDrawerVariant,
                  [classes.appbarAvatar]: isAppBarVariant,
                }),
              }}
            >
              <Avatar>
                <UserIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className={classes.text}
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
  icon: PropTypes.func,
};

User.defaultProps = {
  variant: "default",
  collapsed: false,
  icon: undefined,
};

export default withStyles(styles, { name: "BananasUser" })(User);
