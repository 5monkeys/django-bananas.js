import { amber } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { cloneDeep, merge } from "lodash";

const defaults = {
  bananas: true,
  typography: {
    useNextVariants: true,
  },
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

export function createBananasTheme(theme) {
  return createMuiTheme(applyThemeDefaults(theme));
}

export function extendTheme(source, overrides) {
  const extended = merge(cloneDeep(source), overrides);
  extended.extend = o => extendTheme(extended, o);
  return extended;
}

const defaultTheme = {
  palette: {
    primary: {
      main: "#34A77B", // Django Green'ish
    },
    secondary: {
      main: amber[700],
      contrastText: "#fff",
    },
    background: {
      default: "#fafafa",
    },
  },
};

const darkTheme = {
  palette: {
    type: "dark",
    primary: {
      main: "#34A77B", // Django Green'ish
    },
    secondary: {
      main: amber[700],
      contrastText: "#fff",
    },
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

const themes = {
  light: applyThemeDefaults(defaultTheme),
  dark: applyThemeDefaults(darkTheme),
};
themes.default = themes.light;

export default themes;
