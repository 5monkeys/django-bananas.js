import PropTypes from "prop-types";
import React from "react";

import { AdminContext } from "..";

export const permissionRequired = (permission, user) => {
  return user.permissions.indexOf(permission) !== -1;
};

export const permissionsRequired = (permissions, user, all = true) => {
  for (const permission of permissions) {
    if (permissionRequired(permission, user)) {
      if (!all) {
        return true;
      }
    } else if (all) {
      return false;
    }
  }
  return all;
};

const PermissionRequired = ({ permission, allMustMatch, children }) => {
  const { user } = React.useContext(AdminContext);
  const passes = Array.isArray(permission)
    ? permissionsRequired(permission, user, allMustMatch)
    : permissionRequired(permission, user);
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
