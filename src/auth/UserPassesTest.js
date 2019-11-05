import PropTypes from "prop-types";
import React from "react";

import { AdminContext } from "..";

const UserPassesTest = ({ children, testFunc }) => {
  const { user } = React.useContext(AdminContext);
  const passed = testFunc(user);
  return passed && <>{children}</>;
};

UserPassesTest.propTypes = {
  children: PropTypes.node.isRequired,
  testFunc: PropTypes.func.isRequired,
};

export default UserPassesTest;
