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
  },
  defaultColor: {
    color: theme.palette.primary.contrastText,
  },
  logo: {
    position: "absolute",
    margin: 0,
    marginTop: -36 - theme.spacing.unit * 3,
  },
});

const LoadingScreen = ({ classes, loading, color, logo, ...rest }) => {
  return (
    <div className={classes.root} color={color}>
      <div className={classes.logo}>{logo && <Logo src={logo} />}</div>
      {loading && (
        <CircularProgress
          {...rest}
          className={classNames({
            [classes.defaultColor]: !color,
          })}
        />
      )}
    </div>
  );
};

LoadingScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  color: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
};

LoadingScreen.defaultProps = {
  loading: true,
  color: undefined,
  logo: undefined,
};

export default withStyles(styles)(LoadingScreen);
