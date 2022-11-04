import { useTheme } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useLocation } from "react-router-dom";
import { RouteInfo, useRouter } from "../contexts/RouterContext";
import { LogoType } from "../types";
import Link from "./Link";
import Logo from "./Logo";

interface NavBarItemProps {
  route: RouteInfo;
  title: string;
  open: boolean;
  subtitle?: string | React.ReactNode;
  icon?: LogoType;
}

const NavBarItem: React.FC<React.PropsWithChildren<NavBarItemProps>> = (
  { route, title, subtitle, icon, children, open },
) => {
  const Icon = icon;
  const [selected, setSelected] = React.useState(false);
  const location = useLocation();
  const { navigate } = useRouter();
  const theme = useTheme();

  const onClick = () => {
    navigate(route);
  };

  React.useEffect(() => {
    setSelected(location.pathname === route.path);
  }, [location]);

  return (
    <ListItem
      onClick={onClick}
      key={route.id}
      disablePadding
      sx={{ display: "block" }}
    >
      <ListItemButton
        selected={selected}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
            padding: theme.spacing(1, 1)
          }}
        >
          {Icon !== undefined ? <Logo src={Icon} /> : title.substring(0, 1)}
        </ListItemIcon>
        <ListItemText
          sx={{ opacity: open ? 1 : 0 }}
          primary={title}
          secondary={subtitle}
        />
        {children}
      </ListItemButton>
    </ListItem>
  );
};

export default NavBarItem;
