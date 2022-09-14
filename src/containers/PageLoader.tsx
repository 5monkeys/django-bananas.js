import React from "react";
import { Suspense } from "react";
import { Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { useApi } from "../contexts/ApiContext";

import { RouteInfo, useRouter } from "../contexts/RouterContext";
import useAsyncError from "../hooks/useAsyncError";
import { PageComponent } from "../types";
import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";
import PageErrorBoundary from "./PageErrorBoundary";

export class PageLoadFailedError extends Error {
  readonly response: Response;

  constructor(response: Response, message?: string) {
    super(message);
    this.response = response;
  }
}

export interface PageLoaderProps {
  route: RouteInfo;
  page: PageComponent | Promise<PageComponent>;
}

const PageLoader: React.FC<PageLoaderProps> = ({ route, page }) => {
  const Page = React.lazy(async () => ({
    default: await Promise.resolve(page),
  }));
  const api = useApi();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = React.useState(null);
  const throwError = useAsyncError();

  React.useEffect(() => {
    if (data === null) {
      api.operations[route.id].call({
        params: params,
        query: Object.fromEntries(searchParams.entries()),
      })
        .then(async (response) => {
          if (response.ok) {
            setData(await response.json());
          } else {
            throwError(
              new PageLoadFailedError(
                response,
                `Page data load failed with ${response.status} ${response.statusText}`,
              ),
            );
          }
        })
        .catch(throwError);
    }
  }, [api, params, searchParams, data]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Page data={data} />
    </Suspense>
  );
};

export default PageLoader;
