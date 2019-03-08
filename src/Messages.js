import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { amber, blue, green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const typeIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[500],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: blue[500],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  icontype: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
});

class UnstyledCustomSnackBar extends React.Component {
  state = {
    open: true,
  };

  handleClose = (e, reason) => {
    if (this.props.type === "error" && reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes, message, id, type, remove } = this.props;
    const open = this.state.open && this.props.open;
    const Icon = typeIcon[type];

    return (
      <Snackbar
        key={message + id}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={this.handleClose}
        onExited={remove}
        open={open}
        autoHideDuration={type !== "error" ? 6000 : undefined} // don't autohide errors.
      >
        <SnackbarContent
          className={classes[type]}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.icontype)} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

UnstyledCustomSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
  id: PropTypes.number.isRequired,
};

const CustomSnackBar = withStyles(styles)(UnstyledCustomSnackBar);

const Messages = withStyles(
  {
    root: {},
  },
  { name: "BananasMessages" }
)(({ classes, messages }) => {
  const snackbars = messages.map(msg => (
    <CustomSnackBar key={msg.id + msg.message} {...msg} />
  ));

  return snackbars ? <div className={classes.root}>{snackbars}</div> : null;
});

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default Messages;
