"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AdminContext = _react.default.createContext({
  admin: undefined,
  router: undefined,
  api: undefined,
  user: undefined
});

var _default = AdminContext;
exports.default = _default;