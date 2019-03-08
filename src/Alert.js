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

const styles = theme => ({});

const Transition = props => <Slide direction="down" {...props} />;

class Alert extends React.Component {
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
    const { open, title, message, agree, dismiss, keepMounted } = this.props;

    return (
      <Dialog
        open={open}
        fullWidth={true}
        TransitionComponent={Transition}
        keepMounted={keepMounted}
        onClose={this.onDismiss}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
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
            <Button onClick={this.onDismiss} color="primary">
              {typeof dismiss === "boolean" ? "Cancel" : dismiss}
            </Button>
          )}
          {agree && (
            <Button onClick={this.onAgree} color="primary">
              {typeof agree === "boolean" ? "Ok" : agree}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

Alert.propTypes = {
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

Alert.defaultProps = {
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

export default withStyles(styles, { name: "BananasAlert" })(Alert);
