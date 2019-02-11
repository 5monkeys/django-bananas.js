import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import React from "react";

class SettingsForm extends React.Component {
  changeSetting = setting => event => {
    this.props.onChange(setting, event.target.checked);
  };

  render() {
    const { settings } = this.props;
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
        </FormControl>
      </>
    );
  }
}

SettingsForm.propTypes = {
  settings: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SettingsForm;
