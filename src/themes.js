import { amber } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { cloneDeep, merge } from "lodash";

import { django } from "./colors";

const defaults = {
  bananas: true,
  /*
  overrides: {
    BananasNavBar: {
      drawer: {
        width: 280,
      },
    },
  },
  */
};

export function applyThemeDefaults(theme) {
  if (!theme.bananas) {
    return extendTheme(defaults, theme);
  }
  return theme;
}

export function createBananasTheme(rawTheme) {
  const theme = createTheme(applyThemeDefaults(rawTheme));

  theme.gap = (...multipliers) => {
    const parse = m => m * parseInt(theme.spacing(1), 10);

    if (multipliers.length === 0) {
      return parse(1);
    }
    if (multipliers.length === 1) {
      return parse(multipliers[0]);
    }

    return multipliers
      .reduce((aggr, m) => [...aggr, `${parse(m)}px`], [])
      .join(" ");
  };

  return theme;
}

export function extendTheme(source, overrides) {
  const extended = merge(cloneDeep(source), overrides);
  extended.extend = o => extendTheme(extended, o);
  return extended;
}

const lightTheme = {
  palette: {
    mode: "light",
    primary: django,
    secondary: amber,
    background: {
      default: "#fafafa",
    },
  },
};

const darkTheme = {
  palette: {
    mode: "dark",
    primary: lightTheme.palette.primary,
    secondary: lightTheme.palette.secondary,
    background: {
      paper: "#303030",
      default: "#222",
    },
    action: {
      selected: "rgba(255, 255, 255, 0.12)",
      hover: "rgba(255, 255, 255, 0.03)",
    },
    divider: "rgba(255, 255, 255, 0.07)",
  },
  overrides: {
    MuiSnackbarContent: {
      root: {
        color: "#fff",
      },
    },
  },
};

const darthTheme = {
  ...darkTheme,
  overrides: {
    ...darkTheme.overrides,
    BananasAdmin: {
      root: {
        backgroundColor: "#222",
      },
    },
    BananasNavBar: {
      header: {
        background: "#111",
      },
      drawer: {
        background: "#272727",
      },
    },
    BananasTitleBar: {
      colorPrimary: {
        background: "#272727",
      },
    },
    BananasLoginPage: {
      title: {
        background: "#272727",
      },
    },
  },
};

const themes = {
  light: applyThemeDefaults(lightTheme),
  dark: applyThemeDefaults(darkTheme),
  darth: applyThemeDefaults(darthTheme),
};
themes.default = themes.light;

export default themes;
