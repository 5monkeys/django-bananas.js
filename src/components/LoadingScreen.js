import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Logo from "../components/Logo";

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
  backdrop: {
    position: "absolute",
    zIndex: 2000,
    backgroundColor: fade(theme.palette.background.default, 0.666),
  },
  backdropPrimary: {
    backgroundColor: fade(theme.palette.primary.main, 0.666),
  },
  backdropSecondary: {
    backgroundColor: fade(theme.palette.secondary.main, 0.666),
  },
  backdropPaper: {
    backgroundColor: fade(theme.palette.background.paper, 0.666),
  },
  spinner: {
    color: theme.palette.primary.main,
  },
  spinnerContrast: {
    color: theme.palette.primary.contrastText,
  },
  logo: {
    position: "absolute",
    margin: 0,
    marginTop: -36 - theme.spacing(3),
  },
});

class LoadingScreen extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    color: PropTypes.string,
    logo: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.node,
    ]),
    backdrop: PropTypes.bool,
    role: PropTypes.string,
  };

  static defaultProps = {
    loading: true,
    color: undefined,
    logo: undefined,
    backdrop: false,
    role: undefined,
  };

  renderScreen() {
    const {
      classes,
      loading,
      color,
      logo,
      backdrop,
      role,
      ...rest
    } = this.props;
    return (
      <div
        data-testid={role}
        className={classNames(classes.root, {
          [classes.backdrop]: backdrop,
          [classes.backdropPrimary]: backdrop && color === "primary",
          [classes.backdropSecondary]: backdrop && color === "secondary",
          [classes.backdropPaper]: backdrop && color === "paper",
        })}
      >
        <div className={classes.logo}>{logo && <Logo src={logo} />}</div>
        {loading && (
          <CircularProgress
            {...rest}
            className={classNames(classes.spinner, {
              [classes.spinnerContrast]: !color,
            })}
          />
        )}
      </div>
    );
  }

  render() {
    const { loading, backdrop } = this.props;
    return backdrop ? (
      <Fade
        in={loading}
        timeout={{
          enter: 750,
          exit: 250,
        }}
        mountOnEnter
        unmountOnExit
      >
        {this.renderScreen()}
      </Fade>
    ) : (
      this.renderScreen()
    );
  }
}

const BananasLoadingScreen = withStyles(styles, {
  name: "BananasLoadingScreen",
})(LoadingScreen);
export default BananasLoadingScreen;
