"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _context = _interopRequireDefault(require("../context"));

var _ = require("..");

var _CardPage = _interopRequireDefault(require("./CardPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorMessages = {
  403: "You are authenticated as %(username)s, but are not authorized to access this page. Would you like to login to a different account?",
  404: "We're sorry, but the requested page could not be found.",
  501: "We're sorry, but the requested page could not be found."
};

var styles = function styles(theme) {
  return {
    actions: {
      marginTop: theme.spacing.unit * 3,
      textAlign: "right"
    },
    actionButton: {
      boxShadow: "none"
    }
  };
};

var ErrorPage = function ErrorPage(_ref) {
  var classes = _ref.classes,
      title = _ref.title,
      statusCode = _ref.data.statusCode;
  return _react.default.createElement(_context.default.Consumer, null, function (_ref2) {
    var admin = _ref2.admin,
        user = _ref2.user;
    return _react.default.createElement(_CardPage.default, {
      title: title,
      subtitle: "Status: ".concat(statusCode || (0, _.t)("Unknown"))
    }, _react.default.createElement(_.Translate, {
      params: user
    }, statusCode >= 500 ? "There's been an error. It's been reported to the site administrators via email and should be fixed shortly. Thanks for your patience." : errorMessages[statusCode] || ""), statusCode === 403 && _react.default.createElement("div", {
      className: classes.actions
    }, _react.default.createElement(_Button.default, {
      variant: "contained",
      color: "secondary",
      onClick: function onClick() {
        return admin.logout();
      },
      className: classes.actionButton
    }, (0, _.t)("Log in again"))));
  });
};

ErrorPage.propTypes = {
  classes: _propTypes.default.object.isRequired,
  title: _propTypes.default.string.isRequired,
  data: _propTypes.default.object
};
ErrorPage.defaultProps = {
  data: {}
};

var _default = (0, _styles.withStyles)(styles)(ErrorPage);

exports.default = _default;