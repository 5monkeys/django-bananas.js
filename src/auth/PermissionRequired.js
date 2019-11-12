import PropTypes from "prop-types";
import React from "react";

import { AdminContext } from "..";
import { hasPermissions } from "../utils";

const PermissionRequired = ({ permission, allMustMatch, children }) => {
  const { user } = React.useContext(AdminContext);
  const passes = Array.isArray(permission)
    ? hasPermissions(permission, user, allMustMatch)
    : user.hasPermission(permission);
  return passes && <>{children}</>;
};

PermissionRequired.propTypes = {
  permission: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  allMustMatch: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

PermissionRequired.defaultProps = {
  allMustMatch: true,
};

export default PermissionRequired;
