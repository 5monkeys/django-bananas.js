import React from "react";

const AdminContext = React.createContext({
  api: undefined,
  settings: undefined,
  user: undefined,
  currentPage: undefined,
});

export default AdminContext;
