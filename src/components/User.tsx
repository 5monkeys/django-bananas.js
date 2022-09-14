import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonBase from "@mui/material/ButtonBase";
import List from "@mui/material/List";
import { Theme, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useUser } from "../contexts/UserContext";
import { LogoType } from "../types";
import NavBarItem from "./NavBarItem";
import { ss } from "../util/select_styles";
import { useRouter } from "../contexts/RouterContext";
import { useLocation } from "react-router-dom";

const styles = (theme: Theme) => ({
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
});

interface UserProps {
  classes?: ReturnType<typeof styles>;
  open: boolean;
  icon?: LogoType;
}

const User: React.FC<UserProps> = ({ classes, open, icon }) => {
  const { user, logout } = useUser();
  const { routes, getRoute } = useRouter();

  classes ??= styles(useTheme());

  const UserIcon = icon ?? AccountCircleIcon;
  const [route, logoutText, selected] = React.useMemo(() => {
    const route = getRoute("bananas.me:list");
    return [
      route,
      getRoute("bananas.logout:create")!.title,
      route?.path === window.location.pathname,
    ];
  }, [routes]);

  return (
    user !== null && route !== undefined
      ? (
        <List>
          <NavBarItem
            route={route}
            open={open}
            icon={UserIcon}
            title={user.full_name}
            subtitle={
              <ButtonBase
                sx={ss(
                  classes.link,
                  classes.drawerLink,
                )}
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                <Typography color="inherit">{logoutText}</Typography>
              </ButtonBase>
            }
          />
        </List>
      )
      : null
  );
};

export default User;
