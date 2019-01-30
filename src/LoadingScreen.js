import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Logo from "./Logo";

const styles = theme => ({
  root: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing.unit * 1.5,
    },
  },
  defaultColor: {
    color: theme.palette.primary.contrastText,
  },
});

const LoadingScreen = ({ classes, color, logo, ...rest }) => {
  return (
    <div className={classes.root} color={color}>
      {logo && <Logo src={logo} />}
      <CircularProgress
        {...rest}
        className={classNames({ [classes.defaultColor]: !color })}
      />
    </div>
  );
};

LoadingScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
};

LoadingScreen.defaultProps = {
  color: undefined,
  logo: undefined,
};

export default withStyles(styles)(LoadingScreen);
