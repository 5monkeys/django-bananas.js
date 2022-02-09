import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import Logger from "js-logger";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "../AdminContext";
import { t, Translate } from "../utils";

const logger = Logger.get("bananas");

const styles = theme => ({
  root: {
    maxWidth: 350,
  },
  formLabel: {
    marginBottom: theme.gap(2),
  },
  formControlNormal: {
    marginTop: theme.gap(3),
    marginBottom: 0,
  },
  field: {
    marginTop: theme.gap(3),
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

    admin.dismissMessages();

    api["bananas.change_password:create"]({
      data: {
        old_password,
        new_password1,
        new_password2,
      },
    }).then(
      () => {
        admin.success(t("Password changed successfully."));
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
        admin.error(t("Incorrect authentication credentials."));
        this.setState({ errors: error.response.obj, touched: false });
      }
    );
  };

  render() {
    const { classes } = this.props;
    const { api } = this.context;

    const endpoint = api["bananas.change_password:create"];
    const schema = endpoint.schema.data;

    const { errors, touched, old_password, new_password1, new_password2 } =
      this.state;

    const passwordCheckError =
      new_password2 !== "" && new_password2 !== new_password1;
    const filled = [old_password, new_password1, new_password2].every(
      value => value.length > 0
    );

    return (
      <form
        onSubmit={this.onSubmit}
        className={classes.root}
        data-testid="change-password-form"
      >
        <FormLabel component="legend" classes={{ root: classes.formLabel }}>
          {endpoint.title}
        </FormLabel>
        <Translate>
          {
            "Please enter your old password, for security's sake, and then enter your new password twice so we can verify you typed it in correctly."
          }
        </Translate>
        <FormControl fullWidth component="fieldset">
          <FormGroup>
            {["old_password", "new_password1", "new_password2"].map(field => (
              <TextField
                key={field}
                autoComplete={field}
                classes={{ root: classes.field }}
                label={schema[field].title}
                inputProps={{ "aria-label": schema[field].title }}
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
          classes={{ marginNormal: classes.formControlNormal }}
        >
          <Button
            variant="outlined"
            type="submit"
            color="primary"
            fullWidth
            disabled={
              (Boolean(errors) && !touched) || !filled || passwordCheckError
            }
          >
            {t("Change my password")}
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
