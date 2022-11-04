import React from "react";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { ss } from "../util/select_styles";
import Logo from "./Logo";
import { LogoType } from "../types";

interface BrandingProps {
  logo?: LogoType;
  title?: string;
  subtitle?: string;
  version?: string;
  onClick?: React.MouseEventHandler;
  fullWidth?: boolean;
  sx?: SxProps;
}

const Branding: React.FC<BrandingProps> = (
  { logo, title, subtitle, version, onClick, fullWidth, sx },
) => {
  return (
    <Box
      sx={ss(
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
        },
        [{ width: "100%" }, fullWidth ?? false],
        sx,
      )}
    >
      <ButtonBase
        sx={{
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          padding: 0,
        }}
        color="inherit"
        onClick={onClick}
      >
        {logo ? <Logo src={logo} /> : (
          <Typography
            sx={{
              fontWeight: "bold",
            }}
            color="inherit"
            variant="h4"
          >
            {title}
          </Typography>
        )}
        <Box
          sx={{
            marginLeft: 10,
            "& > *": {
              textAlign: "left",
              fontSize: "0.75rem",
              display: "block",
              lineHeight: `1em`,
            },
          }}
        >
          <Typography color="inherit">{subtitle}</Typography>
          <Typography color="inherit">{version}</Typography>
        </Box>
      </ButtonBase>
    </Box>
  );
};

export default Branding;
