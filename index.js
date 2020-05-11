"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AdminContext", {
  enumerable: true,
  get: function get() {
    return _context.default;
  }
});
Object.defineProperty(exports, "TitleBar", {
  enumerable: true,
  get: function get() {
    return _TitleBar.default;
  }
});
Object.defineProperty(exports, "ToolBar", {
  enumerable: true,
  get: function get() {
    return _ToolBar.default;
  }
});
Object.defineProperty(exports, "Tools", {
  enumerable: true,
  get: function get() {
    return _Tools.default;
  }
});
Object.defineProperty(exports, "Content", {
  enumerable: true,
  get: function get() {
    return _Content.default;
  }
});
Object.defineProperty(exports, "Container", {
  enumerable: true,
  get: function get() {
    return _Container.default;
  }
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function get() {
    return _Link.default;
  }
});
Object.defineProperty(exports, "LoginForm", {
  enumerable: true,
  get: function get() {
    return _LoginPageForm.default;
  }
});
Object.defineProperty(exports, "t", {
  enumerable: true,
  get: function get() {
    return _utils.t;
  }
});
Object.defineProperty(exports, "Translate", {
  enumerable: true,
  get: function get() {
    return _utils.Translate;
  }
});
exports.default = void 0;

var _Admin = _interopRequireDefault(require("./Admin"));

var _context = _interopRequireDefault(require("./context"));

var _TitleBar = _interopRequireDefault(require("./TitleBar"));

var _ToolBar = _interopRequireDefault(require("./ToolBar"));

var _Tools = _interopRequireDefault(require("./Tools"));

var _Content = _interopRequireDefault(require("./Content"));

var _Container = _interopRequireDefault(require("./Container"));

var _Link = _interopRequireDefault(require("./Link"));

var _LoginPageForm = _interopRequireDefault(require("./pages/LoginPageForm"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bananas = {
  App: _Admin.default
};
var _default = Bananas;
exports.default = _default;