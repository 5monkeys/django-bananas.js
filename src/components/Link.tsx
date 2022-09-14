import { RouteInfo, useRouter } from "../contexts/RouterContext";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

type LinkProps = { route: RouteInfo } | { route: string };

const Link: React.FC<LinkProps> = ({ route }) => {
  const { getRoute } = useRouter();

  if (typeof route === "string") {
    const routeInfo = getRoute(route);

    if (routeInfo === undefined) {
      throw new Error(`Could not find route with reverse: ${route}`);
    }

    route = routeInfo;
  }

  return <RouterLink to={route.path}></RouterLink>;
};

export default Link;
