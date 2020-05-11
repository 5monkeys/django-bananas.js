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

var _utils = require("../utils");

var _CardPage = _interopRequireDefault(require("./CardPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorMessages = {
  403: "You are authenticated as %(username)s, but are not authorized to access this page. Would you like to login to a different account?",
  404: "We're sorry, but the requested page could not be found.",
  501: "We're sorry, but the requested page could not be found."
};

var styles = theme => ({
  actions: {
    marginTop: theme.spacing(3),
    textAlign: "right"
  },
  actionButton: {
    boxShadow: "none"
  }
});

var ErrorPage = (_ref) => {
  var {
    classes,
    title,
    data: {
      statusCode
    }
  } = _ref;
  return _react.default.createElement(_context.default.Consumer, null, (_ref2) => {
    var {
      admin,
      user
    } = _ref2;
    return _react.default.createElement(_CardPage.default, {
      title: title,
      subtitle: "Status: ".concat(statusCode || (0, _utils.t)("Unknown"))
    }, _react.default.createElement(_utils.Translate, {
      params: user
    }, statusCode >= 500 ? "There's been an error. It's been reported to the site administrators via email and should be fixed shortly. Thanks for your patience." : errorMessages[statusCode] || ""), statusCode === 403 && _react.default.createElement("div", {
      className: classes.actions
    }, _react.default.createElement(_Button.default, {
      variant: "contained",
      color: "secondary",
      onClick: () => admin.logout(),
      className: classes.actionButton
    }, (0, _utils.t)("Log in again"))));
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