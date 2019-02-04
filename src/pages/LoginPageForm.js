import Button from "@material-ui/core/Button";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "../context";

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

class LoginForm extends React.Component {
  static contextType = AdminContext;

  onSubmit = e => {
    e.preventDefault();
    const { admin } = this.context;
    const { username, password } = this.state;
    const { logger } = this.props;

    admin.login(username, password).catch(error => {
      logger.debug("Login Failed", error.response, error);
      this.context.admin.error("Login Failed");
    });
  };

  save = e => {
    const s = { ...this.state };
    s[e.target.name] = e.target.value;
    this.setState({ ...s });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
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
    );
  }
}

LoginForm.propTypes = {
  logger: PropTypes.object.isRequired,
};

export default LoginForm;
