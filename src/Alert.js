import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import { t } from ".";

const styles = theme => ({
  root: {},
  agree: {},
  dismiss: {
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
});

const Transition = props => <Slide direction="down" {...props} />;

class Alert extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    agree: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    dismiss: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onAgree: PropTypes.func,
    onDismiss: PropTypes.func,
    onClose: PropTypes.func,
    keepMounted: PropTypes.bool,
  };

  static defaultProps = {
    open: true,
    title: null,
    message: null,
    agree: true,
    dismiss: true,
    onAgree: undefined,
    onDismiss: undefined,
    onClose: undefined,
    keepMounted: true,
  };

  onAgree = () => {
    const { onClose, onAgree } = this.props;
    if (onClose) {
      onClose();
    }
    if (onAgree) {
      onAgree();
    }
  };

  onDismiss = () => {
    const { onClose, onDismiss } = this.props;
    if (onClose) {
      onClose();
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  render() {
    const {
      classes,
      open,
      title,
      message,
      agree,
      dismiss,
      keepMounted,
    } = this.props;

    return (
      <Dialog
        open={open}
        fullWidth={true}
        TransitionComponent={Transition}
        keepMounted={keepMounted}
        onClose={this.onDismiss}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{ root: classes.root }}
      >
        {title && (
          <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        )}
        {message && (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {message}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          {dismiss && (
            <Button
              onClick={this.onDismiss}
              color="secondary"
              classes={{
                textSecondary: classes.dismiss,
              }}
            >
              {typeof dismiss === "boolean" ? "Cancel" : dismiss}
            </Button>
          )}
          {agree && (
            <Button
              onClick={this.onAgree}
              color="primary"
              classes={{
                textPrimary: classes.agree,
              }}
            >
              {typeof agree === "boolean" ? "Ok" : agree}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

const BananasAlert = withStyles(styles, { name: "BananasAlert" })(Alert);

class AlertController extends React.Component {
  state = {
    open: false,
  };

  static expose = ["alert", "confirm", "dismissModal"];

  alert(props) {
    const state =
      typeof props === "string" ? { message: props, dismiss: false } : props;

    this.setState({ ...state, open: true });
  }

  confirm(props) {
    /* Texts from Django admin translation messages, please don't change */
    const confirm = {
      title: t("Are you sure?"),
      agree: t("Yes, I'm sure"),
      dismiss: t("No, take me back"),
      ...(typeof props === "string" ? { message: props } : props),
    };

    this.alert(confirm);
  }

  dismissModal() {
    this.setState({ ...this.state.alert, open: false });
  }

  render() {
    return (
      <BananasAlert {...this.state} onClose={this.dismissModal.bind(this)} />
    );
  }
}

export default BananasAlert;
export { BananasAlert as Alert, AlertController };
