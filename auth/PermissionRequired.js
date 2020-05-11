"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ = require("..");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PermissionRequired = (_ref) => {
  var {
    permission,
    allMustMatch,
    children
  } = _ref;

  var {
    user
  } = _react.default.useContext(_.AdminContext);

  var passes = Array.isArray(permission) ? (0, _utils.hasPermissions)(permission, user, allMustMatch) : user.hasPermission(permission);
  return passes && _react.default.createElement(_react.default.Fragment, null, children);
};

PermissionRequired.propTypes = {
  permission: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]).isRequired,
  allMustMatch: _propTypes.default.bool,
  children: _propTypes.default.node.isRequired
};
PermissionRequired.defaultProps = {
  allMustMatch: true
};
var _default = PermissionRequired;
exports.default = _default;