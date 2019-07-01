import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { AdminContext, Link } from "django-bananas";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    flexDirection: "column",
  },
  button: {
    margin: theme.spacing(1),
  },
});

class Index extends React.Component {
  static contextType = AdminContext;

  render() {
    // throw new Error();
    const { classes } = this.props;
    const { admin } = this.context;
    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Example App
        </Typography>
        <div>
          <Button
            className={classes.button}
            onClick={() => admin.warning("This is a warning!")}
            variant="contained"
            color="primary"
          >
            Warning!
          </Button>
          <Button
            className={classes.button}
            onClick={() => admin.error("This is a error!")}
            variant="contained"
            color="primary"
          >
            Error!
          </Button>
          <Button
            className={classes.button}
            onClick={() => admin.info("This is a info!")}
            variant="contained"
            color="primary"
          >
            Info!
          </Button>
          <Button
            className={classes.button}
            onClick={() => admin.success("This is a success!")}
            variant="contained"
            color="primary"
          >
            Success!
          </Button>
          <Link route="example.user:list">
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              Link
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
