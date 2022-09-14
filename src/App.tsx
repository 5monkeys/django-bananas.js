import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import Admin, { AdminProps } from "./Admin";
import { ApiContextProvider } from "./contexts/ApiContext";
import { ApiClient } from "./api";
import { UserContextProvider } from "./contexts/UserContext";
import { I18nContextProvider } from "./contexts/I18nContext";
import { SnackbarProvider } from "notistack";

type AppProps = {
  api: ApiClient | string | URL | {
    schema: string | URL;
    server?: string | URL;
  };
  theme?: Partial<Theme> | ((outerTheme: Theme) => Theme);
} & AdminProps;

const App: React.FC<AppProps> = ({ theme, api, ...rest }) => {
  return (
    <ThemeProvider theme={theme ?? createTheme()}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <ApiContextProvider api={api}>
          <I18nContextProvider>
            <UserContextProvider>
              <Admin {...rest} />
            </UserContextProvider>
          </I18nContextProvider>
        </ApiContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
