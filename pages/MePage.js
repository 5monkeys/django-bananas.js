"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _context = _interopRequireDefault(require("../context"));

var _ = require("..");

var _ChangePasswordForm = _interopRequireDefault(require("./ChangePasswordForm"));

var _SettingsForm = _interopRequireDefault(require("./SettingsForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  return {
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    paper: {
      padding: theme.spacing.unit * 3,
      alignSelf: "flex-start"
    }
  };
};

var MePage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MePage, _React$Component);

  function MePage() {
    _classCallCheck(this, MePage);

    return _possibleConstructorReturn(this, _getPrototypeOf(MePage).apply(this, arguments));
  }

  _createClass(MePage, [{
    key: "render",
    value: function render() {
      var admin = this.context.admin;
      var _this$props = this.props,
          data = _this$props.data,
          classes = _this$props.classes;
      var user = data.obj;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_.TitleBar, {
        title: user.full_name
      }), _react.default.createElement(_.Content, null, _react.default.createElement("div", {
        className: classes.root
      }, _react.default.createElement(_core.Paper, {
        classes: {
          root: classes.paper
        },
        elevation: 1,
        square: true
      }, _react.default.createElement(_ChangePasswordForm.default, null)), admin.settings.settings.editable && _react.default.createElement(_core.Paper, {
        classes: {
          root: classes.paper
        },
        elevation: 1,
        square: true
      }, _react.default.createElement(_SettingsForm.default, {
        settings: admin.settings.settings,
        onChange: function onChange(setting, value) {
          admin.settings.configure(_defineProperty({}, setting, value));
        },
        onReset: function onReset() {
          admin.settings.reset();
        }
      })))));
    }
  }]);

  return MePage;
}(_react.default.Component);

_defineProperty(MePage, "propTypes", {
  classes: _propTypes.default.object.isRequired,
  data: _propTypes.default.object.isRequired
});

_defineProperty(MePage, "contextType", _context.default);

var _default = (0, _styles.withStyles)(styles)(MePage);

exports.default = _default;