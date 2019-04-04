"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Logo = _interopRequireDefault(require("../Logo"));

var _LoginPageForm = _interopRequireDefault(require("./LoginPageForm"));

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

var DialogTitle = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      borderBottom: "1px solid ".concat(theme.palette.divider),
      margin: 0,
      textAlign: "center",
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing.unit * 2
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500]
    }
  };
})(function (props) {
  var children = props.children,
      classes = props.classes;
  return _react.default.createElement(_DialogTitle.default, {
    disableTypography: true,
    className: classes.root
  }, children);
});

var pageStyles = function pageStyles(theme) {
  return {
    title: {},
    textLogo: {
      color: theme.palette.primary.contrastText,
      fontWeight: "bold"
    }
  };
};

var LoginPage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  function LoginPage() {
    _classCallCheck(this, LoginPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoginPage).apply(this, arguments));
  }

  _createClass(LoginPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          logger = _this$props.logger,
          title = _this$props.title,
          logo = _this$props.logo;
      var Form = this.props.form || _LoginPageForm.default;
      return _react.default.createElement(_Dialog.default, {
        onClose: this.handleClose,
        "aria-labelledby": "customized-dialog-title",
        open: true
      }, _react.default.createElement(DialogTitle, {
        id: "customized-dialog-title",
        onClose: this.handleClose,
        classes: {
          root: classes.title
        }
      }, logo ? _react.default.createElement(_Logo.default, {
        src: logo
      }) : _react.default.createElement(_Typography.default, {
        variant: "h5",
        className: classes.textLogo
      }, title)), _react.default.createElement(Form, {
        logger: logger
      }));
    }
  }]);

  return LoginPage;
}(_react.default.Component);

LoginPage.propTypes = {
  classes: _propTypes.default.object.isRequired,
  logger: _propTypes.default.object.isRequired,
  form: _propTypes.default.func,
  title: _propTypes.default.string,
  logo: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.node])
};
LoginPage.defaultProps = {
  form: undefined,
  title: undefined,
  logo: true
};

var _default = (0, _styles.withStyles)(pageStyles, {
  name: "BananasLoginPage"
})(LoginPage);

exports.default = _default;