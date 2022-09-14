import * as React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useApi } from "./ApiContext";

export function interpolateString(
  string: string,
  params: Record<string, string> | string[],
): string {
  return Array.isArray(params)
    ? params.reduce((s, value) => s.replace(/%[sd]|\{\}/, value), string)
    : Object.entries(params).reduce(
      (s, [key, value]) =>
        s.replace(new RegExp(`%\\(${key}\\)[sd]|\\{${key}\\}`, "g"), value),
      string,
    );
}

interface I18nContext {
  i18n: any;
  t: (key: string, params?: Record<string, string> | string[]) => string;
}

const I18nContext = React.createContext<I18nContext>(
  undefined as unknown as I18nContext,
);
export const useI18n = () => React.useContext(I18nContext);

export const I18nContextProvider: React.FC<React.PropsWithChildren<{}>> = (
  { children },
) => {
  const api = useApi();
  const [i18n, setI18n] = useLocalStorage("i18n", undefined);

  React.useEffect(() => {
    if (api && i18n === undefined) {
      api.operations["bananas.i18n:list"].call().then(async (response) => {
        const i18n = (await response.json()).catalog;
        setI18n(i18n);
      });
    }
  }, [api, i18n]);

  const t = (key: string, params?: Record<string, string> | string[]) => {
    const value = i18n?.[key] ?? key;
    return params ? interpolateString(value, params) : value;
  };

  return (
    <I18nContext.Provider value={{ i18n, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nContext;
