import PropTypes from "prop-types";
import React from "react";

import AdminContext from "../../src/context";

export const TestContext = ({ api, admin, children }) => (
  <AdminContext.Provider value={{ api: api.operations, admin }}>
    {children}
  </AdminContext.Provider>
);

TestContext.propTypes = {
  api: PropTypes.object.isRequired,
  admin: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

TestContext.defaultProps = {
  admin: {},
};
