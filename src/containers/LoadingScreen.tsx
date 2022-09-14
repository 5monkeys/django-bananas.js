import React from "react";

import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import { alpha } from "@mui/system";

import Logo from "../components/Logo";
import { LogoType } from "../types";
import { ss } from "../util/select_styles";

const styles = (theme: Theme) =>
  ({
    root: {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    backdrop: {
      position: "absolute",
      zIndex: 2000,
      backgroundColor: alpha(theme.palette.background.default, 0.666),
    },
    backdropPrimary: {
      backgroundColor: alpha(theme.palette.primary.main, 0.666),
    },
    backdropSecondary: {
      backgroundColor: alpha(theme.palette.secondary.main, 0.666),
    },
    backdropPaper: {
      backgroundColor: alpha(theme.palette.background.paper, 0.666),
    },
    spinner: {
      color: theme.palette.primary.main,
    },
    spinnerContrast: {
      color: theme.palette.primary.contrastText,
    },
    logo: {
      position: "absolute",
      margin: 0,
      marginTop: theme.spacing(-36),
    },
  }) as const;

interface LoadingScreenInnerProps {
  loading: boolean;
  logo?: LogoType;
  backdrop: boolean;
  color?: string;
  classes: ReturnType<typeof styles>;
}

const LoadingScreenInner: React.FC<LoadingScreenInnerProps> = ({
  loading,
  logo,
  classes,
  backdrop,
  color,
}) => {
  return (
    <Box
      sx={ss(
        classes.root,
        [classes.backdrop, backdrop],
        [classes.backdropPrimary, backdrop && color === "primary"],
        [classes.backdropSecondary, backdrop && color === "secondary"],
        [classes.backdropPaper, backdrop && color === "paper"],
      )}
    >
      <Box
        sx={classes.logo}
      >
        {logo && <Logo src={logo} />}
      </Box>
      {loading && (
        <CircularProgress
          sx={ss(classes.spinner, [classes.spinnerContrast, !color])}
        />
      )}
    </Box>
  );
};

interface LoadingScreenProps {
  loading?: boolean;
  logo?: LogoType;
  backdrop?: boolean;
  color?: string;
  classes?: ReturnType<typeof styles>;
}

const LoadingScreen: React.FC<LoadingScreenProps> = (props) => {
  let { loading, logo, backdrop, color, classes } = { ...props };
  classes ??= styles(useTheme());
  loading ??= true;
  backdrop ??= false;

  return backdrop
    ? (
      <Fade
        in={loading}
        timeout={{
          enter: 750,
          exit: 250,
        }}
      >
        <LoadingScreenInner
          loading={loading}
          logo={logo}
          backdrop={backdrop}
          color={color}
          classes={classes}
        />
      </Fade>
    )
    : (
      <LoadingScreenInner
        loading={loading}
        logo={logo}
        backdrop={backdrop}
        color={color}
        classes={classes}
      />
    );
};

export default LoadingScreen;
