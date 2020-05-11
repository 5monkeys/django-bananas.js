"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserPassesTest = (_ref) => {
  var {
    children,
    testFunc
  } = _ref;

  var {
    user
  } = _react.default.useContext(_.AdminContext);

  var passed = testFunc(user);
  return passed && _react.default.createElement(_react.default.Fragment, null, children);
};

UserPassesTest.propTypes = {
  children: _propTypes.default.node.isRequired,
  testFunc: _propTypes.default.func.isRequired
};
var _default = UserPassesTest;
exports.default = _default;