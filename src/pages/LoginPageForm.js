import Button from "@material-ui/core/Button";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "../context";
import { t } from "..";

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
  state = {};

  onSubmit = e => {
    e.preventDefault();
    const { admin } = this.context;
    const { username, password } = this.state;
    const { logger } = this.props;

    admin.login(username, password).catch(error => {
      logger.debug("Login Failed", error.response, error);
      this.context.admin.error(
        t("Unable to log in with provided credentials.")
      );
    });
  };

  save = e => {
    const s = { ...this.state };
    s[e.target.name] = e.target.value;
    this.setState({ ...s });
  };

  render() {
    const { api } = this.context;

    const endpoint = api["bananas.login:create"];
    const schema = endpoint.schema.data;

    return (
      <form onSubmit={this.onSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label={schema.username.title}
            name="username"
            type="text"
            onChange={this.save}
            inputProps={{ "aria-label": "Username" }}
          />
          <TextField
            fullWidth
            label={schema.password.title}
            name="password"
            type="password"
            onChange={this.save}
            inputProps={{ "aria-label": "Password" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            aria-label="login"
          >
            {t("Log in")}
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
