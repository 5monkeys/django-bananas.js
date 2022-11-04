import * as React from "react";
import { CSSObject, Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import User from "./User";
import Hamburger from "./Hamburger";
import NavBarRoutes from "./NavBarRoutes";
import Branding from "./Branding";
import { LogoType } from "../types";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface NavBarProps {
  nav: Record<string, React.ReactNode>;
  logo?: LogoType;
  title?: string;
  subtitle?: string;
  version?: string;
}

const NavBar: React.FC<NavBarProps> = (
  { nav, logo, title, subtitle, version },
) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  const onClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }}
      anchor="left"
      variant="permanent"
      open={open}
    >
      <Box sx={{ display: "flex", padding: theme.spacing(2, 0, 2) }}>
        <Hamburger open={open} onClick={toggleDrawerOpen} />
        <Branding
          sx={{ opacity: open ? 1 : 0 }}
          logo={logo}
          title={title}
          subtitle={subtitle}
          version={version}
          onClick={onClick}
          fullWidth={open}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          flexShrink: 0,
        }}
      >
        <NavBarRoutes nav={nav} open={open} />
      </Box>

      <Box
        sx={{
          flexGrow: 0,
          flexShrink: 0,
        }}
      >
        <Divider />
        <User open={open} />
      </Box>
    </Drawer>
  );
};

export default NavBar;
