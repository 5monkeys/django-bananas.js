import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";

import Logo from "../Logo";
import DefaultLoginForm from "./LoginPageForm";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      {children}
    </MuiDialogTitle>
  );
});

const pageStyles = theme => ({
  title: {},
  textLogo: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
  },
});

class LoginPage extends React.Component {
  render() {
    const { classes, logger, title, logo } = this.props;
    const Form = this.props.form || DefaultLoginForm;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.handleClose}
          classes={{
            root: classes.title,
          }}
        >
          {logo ? (
            <Logo src={logo} />
          ) : (
            <Typography variant="h5" className={classes.textLogo}>
              {title}
            </Typography>
          )}
        </DialogTitle>
        <Form logger={logger} />
      </Dialog>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  logger: PropTypes.object.isRequired,
  form: PropTypes.func,
  title: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
};

LoginPage.defaultProps = {
  form: undefined,
  title: undefined,
  logo: true,
};

export default withStyles(pageStyles, { name: "BananasLoginPage" })(LoginPage);
