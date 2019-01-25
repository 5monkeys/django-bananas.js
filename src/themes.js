import { createMuiTheme } from "@material-ui/core/styles";

const defaults = {
  typography: {
    useNextVariants: true,
  },
};

/* the deafault theme for the whole Admin. */
const defaultTheme = createMuiTheme({
  ...defaults,
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
});

const themes = {
  default: defaultTheme,
};

export default themes;
