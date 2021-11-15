import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import React from "react";

const SETTINGS = [
  "horizontal",
  "collapsable",
  "collapsed",
  "icons",
  "dense",
  "hideNav",
];

const styles = theme => ({
  reset: {
    marginLeft: 48,
    marginTop: theme.spacing(1),
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
      hideNav: "Hide navigation",
    };

    return (
      <>
        <FormLabel component="legend">Settings</FormLabel>
        <FormControl component="fieldset">
          <FormGroup>
            {SETTINGS.map(setting => (
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
            ))}
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
