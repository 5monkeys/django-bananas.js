import React from "react";

const AdminContext = React.createContext({
  admin: undefined,
  router: undefined,
  api: undefined,
  user: undefined,
});

export default AdminContext;
