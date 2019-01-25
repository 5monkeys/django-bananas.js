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
import settings from "./conf";

const styles = theme => ({
  user: {
    maxWidth: settings.dimensions.drawerWidth,
    paddingRight: 0,
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
  },
  logOutLink: {
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
      color: theme.palette.secondary.main,
    },
  },
  drawerList: {
    paddingTop: theme.spacing.unit * 0.75 - 1,
    paddingBottom: theme.spacing.unit * 0.75,
  },
  appbarList: {},
});

class User extends React.Component {
  render() {
    const { classes, variant } = this.props;
    const isDrawerVariant = variant === "drawer";
    const isAppBarVariant = variant === "appbar";
    const UserIcon = PersonIcon;

    return (
      <AdminContext.Consumer>
        {context =>
          context.admin.user && (
            <div>
              <List
                dense={true}
                className={classNames({
                  [classes.drawerList]: isDrawerVariant,
                  [classes.appbarList]: isAppBarVariant,
                })}
              >
                <ListItem
                  className={classNames(classes.user, {
                    [classes.rightAligned]: isAppBarVariant,
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
                    primary={context.admin.user.full_name}
                    secondary={
                      <ButtonBase
                        className={classNames(classes.logOutLink, {
                          [classes.drawerLink]: isDrawerVariant,
                          [classes.appbarLink]: isAppBarVariant,
                        })}
                        onClick={e => {
                          e.preventDefault();
                          context.admin.logout();
                        }}
                      >
                        <Typography color="inherit">Logga ut</Typography>
                      </ButtonBase>
                    }
                  />
                </ListItem>
              </List>
            </div>
          )
        }
      </AdminContext.Consumer>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.string,
};

User.defaultProps = {
  variant: "default",
};

export default withStyles(styles)(User);
