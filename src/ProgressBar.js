import LinearProgress from "@mui/material/LinearProgress";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

const styles = () => ({
  root: {
    position: "absolute",
    zIndex: 3000,
    width: "100%",
    backgroundColor: "transparent",
  },
  bar: {},
});

const ProgressBar = ({ classes, color, loading }) => {
  return (
    loading && (
      <LinearProgress
        color={color}
        classes={{
          root: classes.root,
          bar: classes.bar,
        }}
      />
    )
  );
};

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  color: PropTypes.string,
};

ProgressBar.defaultProps = {
  loading: true,
  color: "secondary",
};

const BananasProgressBar = withStyles(styles, {
  name: "BananasProgressBar",
})(ProgressBar);
export default BananasProgressBar;
