import React from "react";
import { BrowserRouter } from "react-router-dom";

import Box from "@mui/material/Box";

import NavBar from "./components/NavBar";
import LoadingScreen from "./containers/LoadingScreen";
import { useApi } from "./contexts/ApiContext";
import { useI18n } from "./contexts/I18nContext";
import { RouterContextProvider } from "./contexts/RouterContext";
import { useUser } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import { Router, RouterProps } from "./router/Router";
import { LogoType } from "./types";

export type AdminProps = {
  logo?: LogoType;
  title?: string;
  subtitle?: string;
  version?: string;
  nav: Record<string, React.ReactNode>;
} & RouterProps;

const Admin: React.FC<AdminProps> = (
  { logo, title, subtitle, version, nav, pages, extensions, dashboard },
) => {
  const [loaded, setLoaded] = React.useState(false);

  const api = useApi();
  const i18n = useI18n();
  const { user } = useUser();

  React.useEffect(() => {
    if (
      !loaded && api !== undefined && i18n !== undefined && user !== undefined
    ) {
      setLoaded(true);
    }
  }, [loaded, api, i18n, user]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          flexDirection: "column",
        }}
      >
        {loaded
          ? user !== null
            ? (
              <BrowserRouter>
                <RouterContextProvider>
                  <Box sx={{ display: "flex" }}>
                    <NavBar
                      nav={nav}
                      logo={logo}
                      title={title}
                      subtitle={subtitle}
                      version={version}
                    />
                    <Router
                      pages={pages}
                      extensions={extensions}
                      dashboard={dashboard}
                    />
                  </Box>
                </RouterContextProvider>
              </BrowserRouter>
            )
            : <LoginPage logo={logo} title={title} />
          : <LoadingScreen logo={logo} loading={!loaded} />}
      </Box>
    </>
  );
};

export default Admin;
