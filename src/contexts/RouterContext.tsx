import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  getPage,
  getPath,
  getTitle,
  isNavigation,
  parseOperationId,
} from "../router/routes";
import { useApi } from "./ApiContext";

export interface RouteInfo {
  id: string;
  app: string;
  view: string;
  action: string;
  title: string;
  navigation: boolean;
  path: string;
  page: string;
}

interface RouterContext {
  routes: RouteInfo[];
  getRoute(reverse: string): RouteInfo | undefined;
  navigate(
    route: number | string | RouteInfo,
    options?: {
      params?: Record<
        string,
        string | number | boolean
      >;
      query?: URLSearchParams;
      replace?: boolean;
    },
  ): void;
}

const RouterContext = React.createContext<RouterContext>(
  undefined as unknown as RouterContext,
);
export const useRouter = () => React.useContext(RouterContext);

export const RouterContextProvider: React.FC<React.PropsWithChildren<{}>> = (
  { children },
) => {
  const routes: RouteInfo[] = [];
  const api = useApi();
  const routerNavigate = useNavigate();

  for (const operation of Object.values(api.operations)) {
    const parsedOperationId = parseOperationId(operation.id);
    if (!parsedOperationId) {
      throw new TypeError(`Could not parse operation id ${operation.id}`);
    }
    const { app, view, action } = parsedOperationId;
    const title = getTitle(view, operation.summary);
    const navigation = isNavigation(operation.tags);
    const path = getPath(operation.endpoint, operation.method, action);
    const page = getPage(path, action);
    routes.push({
      id: operation.id,
      app,
      view,
      action,
      title,
      navigation,
      path,
      page,
    });
  }

  const getRoute = (reverse: string) => {
    return routes.find(({ id }) => reverse === id)!;
  };

  const navigate = (
    route: number | string | RouteInfo,
    options?: {
      params?: Record<
        string,
        string | number | boolean
      >;
      query?: URLSearchParams;
      replace?: boolean;
    },
  ) => {
    // Relative history, e.g. go back or forward x steps
    if (typeof route === "number") {
      routerNavigate(route);
      return;
    }

    // Direct operation id routes, requires reversing the operation id
    if (typeof route === "string") {
      const routeInfo = getRoute(route);

      if (routeInfo === undefined) {
        throw new Error(`Could not find route with reverse: ${route}`);
      }

      route = routeInfo;
    }

    let path = route.path;
    for (const [key, value] of Object.entries(options?.params ?? {})) {
      path = path.replace(`:${key}`, encodeURIComponent(value));
    }

    routerNavigate({
      pathname: path,
      search: new URLSearchParams(options?.query).toString(),
    }, { replace: options?.replace });
  };

  return (
    <RouterContext.Provider value={{ routes, getRoute, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export default RouterContext;
