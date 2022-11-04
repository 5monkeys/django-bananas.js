import List from "@mui/material/List";
import React from "react";
import { RouteInfo, useRouter } from "../contexts/RouterContext";
import NavBarItem from "./NavBarItem";

interface NavBarRoutesProps {
  nav: Record<string, React.ReactNode>;
  open: boolean;
}

function groupRoutesByApp(routes: RouteInfo[]): Record<string, RouteInfo[]> {
  const groupedRoutes = {};

  for (const route of routes) {
    groupedRoutes[route.app] ??= [];
    groupedRoutes[route.app].push(route);
  }

  return groupedRoutes;
}

const NavBarRoutes: React.FC<NavBarRoutesProps> = ({ nav, open }) => {
  const { routes } = useRouter();

  const navItems = React.useMemo(() => {
    const apps: React.ReactNode[] = [];
    const groupedRoutes = groupRoutesByApp(routes);

    for (const app of Object.keys(groupedRoutes)) {
      const appRoutes = groupedRoutes[app];
      const appItems: React.ReactNode[] = [];

      for (const route of appRoutes) {
        if (route.navigation) {
          appItems.push(
            <NavBarItem
              key={route.id}
              route={route}
              title={route.title}
              open={open}
            />,
          );
        }
      }

      apps.push(
        <List key={app}>
          {appItems}
        </List>,
      );
    }

    return apps;
  }, [
    routes,
    nav,
    open
  ]);

  return (
    <>
      {navItems}
    </>
  );
};

export default NavBarRoutes;
