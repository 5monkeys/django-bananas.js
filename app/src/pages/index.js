import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "django-bananas";
import React from "react";

import { useAdmin } from "../../../src/contexts/AdminContext";

const useStyles = makeStyles(theme => ({
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
}));

const Index = () => {
  const { admin } = useAdmin();
  const classes = useStyles();

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
};

export default Index;
