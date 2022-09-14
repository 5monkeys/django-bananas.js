import React from "react";

export default function useAsyncError() {
  const [_, setError] = React.useState();
  return React.useCallback(
    (e: any) => {
      setError(() => {
        throw e;
      });
    },
    [setError],
  );
}
