import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Logo from "../Logo";
import AdminContext from "../context";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
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

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    "& > * + * ": {
      marginTop: theme.spacing.unit * 2,
    },
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

const pageStyles = theme => ({
  textLogo: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
  },
});

class LoginPage extends React.Component {
  static contextType = AdminContext;

  onSubmit = e => {
    e.preventDefault();
    const { admin } = this.context;
    const { username, password } = this.state;

    admin.login(username, password).catch(error => {
      console.log("Login Failed", error);
      this.context.admin.error("Login Failed");
    });
  };

  save = e => {
    const s = { ...this.state };
    s[e.target.name] = e.target.value;
    this.setState({ ...s });
  };

  render() {
    const { title, logo, classes } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <form onSubmit={this.onSubmit}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {logo ? (
              <Logo src={logo} />
            ) : (
              <Typography variant="h5" className={classes.textLogo}>
                {title}
              </Typography>
            )}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              label="username"
              name="username"
              type="text"
              onKeyUp={this.save}
            />
            <TextField
              fullWidth
              label="password"
              name="password"
              type="password"
              onKeyUp={this.save}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" type="submit" color="primary">
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
  title: PropTypes.string,
};

LoginPage.defaultProps = {
  logo: true,
  title: undefined,
};

export default withStyles(pageStyles)(LoginPage);
