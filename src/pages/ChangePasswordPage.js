import { Button, FormControl, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import { Content, TitleBar } from "..";

const styles = theme => ({
  root: {
    margin: "0 auto",
    maxWidth: 350,
    position: "relative",
    "& > * + * ": {
      marginTop: theme.spacing.unit * 2,
    },
  },
  wrapper: {
    margin: "0 auto",
    maxWidth: 350,
  },
});

class ChangePasswordPage extends React.Component {
  state = {};
  save = e => {
    const s = { ...this.state };
    s[e.target.name] = e.target.value;
    this.setState({ ...s, touched: true });
  };

  render() {
    const { title, classes } = this.props;
    const { /* currentPassword, */ newPassword, newPasswordCheck } = this.state;

    const passwordCheckError =
      newPasswordCheck !== undefined && newPassword !== newPasswordCheck;

    // const fieldEmpty = !newPassword || !newPasswordCheck || !currentPassword;

    return (
      <>
        <TitleBar title={title} />

        <Content>
          <div className={classes.wrapper}>
            <FormControl>
              <form
                onSubmit={() => {
                  // TODO: Implement
                }}
              >
                <div className={classes.root}>
                  <TextField
                    fullWidth
                    label="Current password"
                    name="currentPassword"
                    type="password"
                    onChange={this.save}
                    required
                  />
                  <TextField
                    fullWidth
                    label="New password"
                    name="newPassword"
                    type="password"
                    onChange={this.save}
                    required
                  />
                  <TextField
                    fullWidth
                    error={passwordCheckError}
                    label="New password (again)"
                    name="newPasswordCheck"
                    type="password"
                    onKeyUp={this.save}
                    required
                  />

                  <Button
                    variant="outlined"
                    type="submit"
                    color="primary"
                    // disabled={!touched || fieldEmpty || passwordCheckError}
                  >
                    change password
                  </Button>
                </div>
              </form>
            </FormControl>
          </div>
        </Content>
      </>
    );
  }
}

ChangePasswordPage.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangePasswordPage);
