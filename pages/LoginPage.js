"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _styles = require("@material-ui/core/styles");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Logo = _interopRequireDefault(require("../Logo"));

var _LoginPageForm = _interopRequireDefault(require("./LoginPageForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogTitle = (0, _styles.withStyles)(theme => ({
  root: {
    borderBottom: "1px solid ".concat(theme.palette.divider),
    margin: 0,
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}))(props => {
  var {
    children,
    classes
  } = props;
  return _react.default.createElement(_DialogTitle.default, {
    disableTypography: true,
    className: classes.root
  }, children);
});

var pageStyles = theme => ({
  title: {},
  textLogo: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold"
  }
});

class LoginPage extends _react.default.Component {
  render() {
    var {
      classes,
      logger,
      title,
      logo
    } = this.props;
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

}

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