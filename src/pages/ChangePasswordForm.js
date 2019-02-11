/* eslint-disable camelcase */
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Logger from "js-logger";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "../context";

const logger = Logger.get("bananas");

const styles = theme => ({
  root: {
    maxWidth: 280,
  },
  formGroup: {
    marginTop: theme.spacing.unit * 2,
  },
  submitControl: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: 0,
  },
});

class ChangePasswordForm extends React.Component {
  static contextType = AdminContext;
  state = {
    errors: null,
    touched: false,
    old_password: "",
    new_password1: "",
    new_password2: "",
  };

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      touched: true,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { api, admin } = this.context;
    const { old_password, new_password1, new_password2 } = this.state;

    api["bananas.change_password:create"]({
      data: {
        old_password,
        new_password1,
        new_password2,
      },
    }).then(
      () => {
        admin.success("Password changed");
        this.setState({
          touched: false,
          errors: null,
          old_password: "",
          new_password1: "",
          new_password2: "",
        });
      },
      error => {
        logger.error("Failed to change password", error.response);
        admin.error("Failed to change password");
        this.setState({ errors: error.response.obj, touched: false });
      }
    );
  };

  render() {
    const { classes } = this.props;
    const { router } = this.context;

    const route = router.getRoute("bananas.change_password:create");
    const { schema } = route;

    const {
      errors,
      touched,
      old_password,
      new_password1,
      new_password2,
    } = this.state;

    const passwordCheckError =
      new_password2 !== "" && new_password2 !== new_password1;
    const filled = [old_password, new_password1, new_password2].every(
      value => value.length > 0
    );

    return (
      <form onSubmit={this.onSubmit} className={classes.root}>
        <FormLabel component="legend">{route.title}</FormLabel>
        <FormControl fullWidth component="fieldset">
          <FormGroup classes={{ root: classes.formGroup }}>
            {["old_password", "new_password1", "new_password2"].map(field => (
              <TextField
                key={field}
                label={schema[field].title}
                error={Boolean(errors && errors[field])}
                helperText={Boolean(errors && errors[field]) && errors[field]}
                name={field}
                value={this.state[field]}
                type="password"
                onChange={this.onChange}
                fullWidth
                required
              />
            ))}
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
            disabled={
              (Boolean(errors) && !touched) || !filled || passwordCheckError
            }
          >
            {route.title}
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
