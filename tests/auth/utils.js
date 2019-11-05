import PropTypes from "prop-types";
import React from "react";

import { AdminContext } from "../../src";

export const TestContext = ({ user, children }) => (
  <AdminContext.Provider value={{ user }}>{children}</AdminContext.Provider>
);

export const contextData = {
  user: {
    permissions: ["has.permission", "also.has.this"],
  },
};

TestContext.propTypes = {
  user: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

TestContext.defaultProps = {
  user: contextData.user,
};
