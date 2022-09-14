import React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

type HamburgerProps = {
  open: boolean;
  onToggle?: React.MouseEventHandler;
} & IconButtonProps;

const Hamburger: React.FC<HamburgerProps> = ({ open, onToggle, ...rest }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }}
    >
      <IconButton
        aria-label={open ? "Close drawer" : "Open drawer"}
        color="inherit"
        onClick={onToggle}
        {...rest}
        size="large"
      >
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>
    </Box>
  );
};

export default Hamburger;
