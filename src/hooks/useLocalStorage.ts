import React from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [state, setState] = React.useState<T>(getState(key) ?? defaultValue);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    if (mounted) return;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (localStorage) {
      const value = getState<T>(key);
      if (value) setState(value);
      setMounted(true);
    }
  }, [key, mounted]);

  React.useEffect(() => {
    if (mounted) setLocalState(key, state);
  }, [state, key, mounted]);

  return [state, setState] as const;
}

function getState<T>(key: string): T | null {
  return tryJSONParse<T>(localStorage.getItem(buildStorageKey(key)));
}

function setLocalState<T>(key: string, state: T) {
  localStorage.setItem(buildStorageKey(key), JSON.stringify(state));
}

function buildStorageKey(key: string) {
  return `__useLocalStorage_${key}`;
}

function tryJSONParse<T>(json: string | null | undefined): T | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    return null;
  }
}
