import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    zIndex: 3000,
    width: "100%",
    backgroundColor: "transparent",
  },
  bar: {},
}));

const ProgressBar = ({ color, loading }) => {
  const classes = useStyles();
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
  loading: PropTypes.bool,
  color: PropTypes.string,
};

ProgressBar.defaultProps = {
  loading: true,
  color: "secondary",
};

export default ProgressBar;
