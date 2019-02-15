import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const styles = () => ({
  root: {
    position: "absolute",
    zIndex: 3000,
    width: "100%",
    backgroundColor: "transparent",
  },
});

const ProgressBar = ({ classes, color, loading }) => {
  return (
    loading && (
      <LinearProgress
        color={color}
        classes={{
          root: classes.root,
        }}
      />
    )
  );
};

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  loading: PropTypes.bool,
};

ProgressBar.defaultProps = {
  color: "secondary",
  loading: true,
};

export default withStyles(styles, { name: "BananasProgressBar" })(ProgressBar);
