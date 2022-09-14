import Box from "@mui/material/Box";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { RouteInfo, useRouter } from "../contexts/RouterContext";
import DashboardPage from "../pages/DashboardPage";
import PageLoader from "../containers/PageLoader";
import { PageComponent } from "../types";
import PageErrorBoundary from "../containers/PageErrorBoundary";
import ErrorScreen from "../containers/ErrorScreen";

export interface RouterExtension {
  app: string;
  pages: (route: RouteInfo) => PageComponent | Promise<PageComponent>;
}

export interface RouterProps {
  dashboard?: React.ComponentType;
  extensions?: RouterExtension[];
  pages: (route: RouteInfo) => PageComponent | Promise<PageComponent>;
}

export const Router: React.FC<RouterProps> = (
  { dashboard, extensions, pages },
) => {
  extensions ??= Array.isArray(extensions) ? extensions : [];

  const { routes } = useRouter();
  const Dashboard = dashboard ?? DashboardPage;

  const extensionsMap = new Map(
    extensions.map(({ app, pages }) => [app, pages]),
  );
  const pageRoutes = routes.map((route) => {
    const pageLoader = extensionsMap.get(route.app)!;
    const Element = () => (
      <PageErrorBoundary errorPage={ErrorScreen}>
        <PageLoader
          route={route}
          page={pageLoader(route)}
        />
      </PageErrorBoundary>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={<Element />}
      />
    );
  });

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Routes>
        <Route index element={<Dashboard />} />

        {pageRoutes}
      </Routes>
    </Box>
  );
};
