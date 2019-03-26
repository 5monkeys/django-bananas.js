import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "../context";
import { Content, TitleBar } from "..";
import ChangePasswordForm from "./ChangePasswordForm";
import SettingsForm from "./SettingsForm";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paper: {
    padding: theme.spacing.unit * 3,
    alignSelf: "flex-start",
  },
});

class MePage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  static contextType = AdminContext;

  render() {
    const { admin } = this.context;
    const { data, classes } = this.props;
    const user = data.obj;

    return (
      <>
        <TitleBar title={user.full_name} />
        <Content>
          <div className={classes.root}>
            <Paper
              classes={{
                root: classes.paper,
              }}
              elevation={1}
              square
            >
              <ChangePasswordForm />
            </Paper>
            <Paper
              classes={{
                root: classes.paper,
              }}
              elevation={1}
              square
            >
              <SettingsForm
                settings={admin.settings.settings}
                onChange={(setting, value) => {
                  admin.settings.configure({ [setting]: value });
                }}
                onReset={() => {
                  admin.settings.reset();
                }}
              />
            </Paper>
          </div>
        </Content>
      </>
    );
  }
}

export default withStyles(styles)(MePage);
