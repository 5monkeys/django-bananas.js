import { createMuiTheme } from "@material-ui/core/styles";
import { cloneDeep, merge } from "lodash";

const defaults = {
  bananas: true,
  typography: {
    useNextVariants: true,
  },
  overrides: {
    BananasNavBar: {
      drawer: {
        // width: 280,
      },
    },
    Navigation: {
      size: {
        width: 280,
      },
    },
    MuiToolbar: {
      root: {
        minHeight: 64,
      },
    },
  },
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
    secondary: {
      main: "#ffaa00",
      contrastText: "#fff",
    },
    primary: {
      main: "#34A77B",
    },
    background: {
      default: "#fafafa",
    },
  },
};

const themes = {
  default: applyThemeDefaults(defaultTheme),
};

export default themes;
