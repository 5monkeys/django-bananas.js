import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  reset: {
    marginLeft: 48,
    marginTop: theme.gap(1),
  },
});

class SettingsForm extends React.Component {
  changeSetting = setting => event => {
    if (this.props.onChange) {
      this.props.onChange(setting, event.target.checked);
    }
  };

  resetSettings = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    const { classes, settings } = this.props;
    const labels = {
      horizontal: "Horizontal Layout",
      collapsable: "Collapsable Navigation",
      collapsed: "Collapsed",
      icons: "Show Menu Icons",
      dense: "Dense Menu Items",
    };

    return (
      <>
        <FormLabel component="legend">Settings</FormLabel>
        <FormControl component="fieldset">
          <FormGroup>
            {["horizontal", "collapsable", "collapsed", "icons", "dense"].map(
              setting => (
                <FormControlLabel
                  key={setting}
                  label={labels[setting]}
                  disabled={
                    (setting === "collapsable" &&
                      (!settings.icons || !settings.horizontal)) ||
                    (setting === "collapsed" &&
                      (!settings.collapsable ||
                        !settings.icons ||
                        !settings.horizontal))
                  }
                  control={
                    <Switch
                      color="primary"
                      checked={settings[setting]}
                      value={setting}
                      onChange={this.changeSetting(setting)}
                    />
                  }
                />
              )
            )}
          </FormGroup>
          <Button
            classes={{ root: classes.reset }}
            variant="outlined"
            size="small"
            color="secondary"
            onClick={this.resetSettings}
          >
            Reset
          </Button>
        </FormControl>
      </>
    );
  }
}

SettingsForm.propTypes = {
  classes: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
};

SettingsForm.defaultProps = {
  onChange: undefined,
  onReset: undefined,
};

export default withStyles(styles)(SettingsForm);
