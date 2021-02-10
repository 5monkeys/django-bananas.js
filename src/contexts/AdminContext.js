import React, { useContext } from "react";

const AdminContext = React.createContext({
  admin: undefined,
  router: undefined,
  api: undefined,
  user: undefined,
});

export default AdminContext;
export const useAdmin = () => useContext(AdminContext);
