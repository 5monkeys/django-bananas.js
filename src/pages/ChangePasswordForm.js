import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "../context";

const styles = theme => ({
  root: {
    maxWidth: 280,
  },
  submitControl: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: 0,
  },
});

class ChangePasswordForm extends React.Component {
  static contextType = AdminContext;
  state = {};

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      touched: true,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // const { api } = this.context;
  };

  render() {
    const { classes } = this.props;
    const { oldPassword, newPassword, newPasswordCheck } = this.state;
    const passwordCheckError =
      newPasswordCheck !== undefined && newPassword !== newPasswordCheck;
    const filled = [oldPassword, newPassword, newPasswordCheck].every(
      value => value !== undefined
    );

    return (
      <form onSubmit={this.onSubmit} className={classes.root}>
        <FormLabel component="legend">Change Password</FormLabel>
        <FormControl fullWidth component="fieldset">
          <FormGroup>
            <TextField
              fullWidth
              label="Current password"
              name="currentPassword"
              type="password"
              onChange={this.onChange}
              required
            />
            <TextField
              fullWidth
              label="New password"
              name="newPassword"
              type="password"
              onChange={this.onChange}
              required
            />
            <TextField
              fullWidth
              error={passwordCheckError}
              label="New password (again)"
              name="newPasswordCheck"
              type="password"
              onKeyUp={this.onChange}
              required
            />
          </FormGroup>
        </FormControl>

        <FormControl
          fullWidth
          margin="normal"
          classes={{ marginNormal: classes.submitControl }}
        >
          <Button
            fullWidth
            variant="outlined"
            type="submit"
            color="primary"
            disabled={!filled || passwordCheckError}
          >
            change password
          </Button>
        </FormControl>
      </form>
    );
  }
}

ChangePasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangePasswordForm);
