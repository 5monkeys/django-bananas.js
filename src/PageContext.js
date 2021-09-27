import React from "react";

const PageContext = React.createContext({
  title: undefined,
  route: undefined,
  logger: undefined,
  data: undefined,
});

export const usePage = () => React.useContext(PageContext);
export default PageContext;
