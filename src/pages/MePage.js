import { Button, FormControl, Paper, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Settings from "../Settings";
import AdminContext from "../context";
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
    // margin: "0 auto",
    // maxWidth: 350,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settings: {
    // borderLeftWidth: 1,
    // borderLeftStyle: "solid",
    // borderLeftColor: theme.palette.action.selected,
    padding: theme.spacing.unit * 3,
  },
});

class MePage extends React.Component {
  static contextType = AdminContext;

  state = {};

  save = e => {
    const s = { ...this.state };
    s[e.target.name] = e.target.value;
    this.setState({ ...s, touched: true });
  };

  render() {
    const { admin } = this.context;
    const { data, classes } = this.props;
    const user = data.obj;
    const { /* currentPassword, */ newPassword, newPasswordCheck } = this.state;

    const passwordCheckError =
      newPasswordCheck !== undefined && newPassword !== newPasswordCheck;

    // const fieldEmpty = !newPassword || !newPasswordCheck || !currentPassword;

    return (
      <>
        <TitleBar title={user.full_name} />

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
            <Paper
              classes={{
                root: classes.settings,
              }}
              elevation={1}
              square
            >
              <Settings
                settings={admin.state.settings}
                onChange={(setting, value) => {
                  admin.configure({ [setting]: value });
                }}
              />
            </Paper>
          </div>
        </Content>
      </>
    );
  }
}

MePage.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(MePage);
