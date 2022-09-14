import { useSnackbar } from "notistack";
import * as React from "react";
import { ApiClient } from "../api";

export interface ApiContextProviderProps {
  api: ApiClient | string | URL | {
    schema: string | URL;
    server?: string | URL;
  };
}

const ApiContext = React.createContext<ApiClient>(
  undefined as unknown as ApiClient,
);
export const useApi = () => React.useContext(ApiContext);

export const ApiContextProvider: React.FC<
  React.PropsWithChildren<ApiContextProviderProps>
> = (
  { children, api: init },
) => {
  const [api, setApi] = React.useState<ApiClient>();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (api === undefined) {
      (init instanceof ApiClient
        ? Promise.resolve(init)
        : typeof init === "string" ||
            init instanceof URL
        ? ApiClient.load(init)
        : ApiClient.load(init.schema, init.server)).then(setApi).catch((e) => {
          enqueueSnackbar("Failed to load schema, view console for more info", {
            variant: "error",
          });
          throw e;
        });
    }
  }, [api]);

  return (
    <ApiContext.Provider value={api!}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
