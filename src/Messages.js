import { amber, blue, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
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
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
});

class Message extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    remove: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
    id: PropTypes.number.isRequired,
  };

  state = {
    open: true,
  };

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
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
        TransitionComponent={Slide}
        onClose={this.handleClose}
        onExited={remove}
        open={open}
        autoHideDuration={type !== "error" ? 6000 : undefined} // don't autohide errors.
        data-testid="Message"
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
              data-testid="message-close-button"
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

const BananasMessage = withStyles(styles, { name: "BananasMessage" })(Message);

class Messages extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
  };

  render() {
    const { classes, messages } = this.props;
    const snackbars = messages.map(msg => (
      <BananasMessage key={msg.id + msg.message} {...msg} />
    ));

    return snackbars ? <div className={classes.root}>{snackbars}</div> : null;
  }
}

const BananasMessages = withStyles(
  { root: {} },
  { name: "BananasMessages" }
)(Messages);

class MessagesController extends React.Component {
  state = {
    messageIndex: 0,
    messages: [],
  };

  static expose = ["success", "info", "warning", "error", "dismissMessages"];

  getUniqueMessageId() {
    const { messageIndex } = this.state;
    this.setState({ messageIndex: messageIndex + 1 });
    return messageIndex;
  }

  messageCloseHandler(id) {
    return () => {
      const updatedMessages = [...this.state.messages];
      const index = updatedMessages.findIndex(msg => id === msg.id);
      updatedMessages.splice(index, 1);
      this.setState({ messages: updatedMessages });
    };
  }

  createMessage({ message, type }) {
    const messages = [...this.state.messages];
    const id = this.getUniqueMessageId();
    messages.push({
      message,
      type,
      open: true,
      id,
      remove: this.messageCloseHandler(id),
    });
    this.setState({ messages });
  }

  error(message) {
    this.createMessage({ type: "error", message });
  }

  warning(message) {
    this.createMessage({ type: "warning", message });
  }

  success(message) {
    this.createMessage({ type: "success", message });
  }

  info(message) {
    this.createMessage({ type: "info", message });
  }

  dismissMessages() {
    const openMessages = this.state.messages.filter(message => message.open);

    if (openMessages.length) {
      this.setState({
        messages: this.state.messages.map(message =>
          message.open ? { ...message, open: false } : message
        ),
      });
    }
  }

  render() {
    const { messages } = this.state;
    return <BananasMessages messages={messages} />;
  }
}

export default BananasMessages;
export {
  BananasMessage as Message,
  BananasMessages as Messages,
  MessagesController,
};
