import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "../AdminContext";
import { t, Translate } from "../utils";
import CardPage from "./CardPage";

const errorMessages = {
  403: "You are authenticated as %(username)s, but are not authorized to access this page. Would you like to login to a different account?",
  404: "We're sorry, but the requested page could not be found.",
  501: "We're sorry, but the requested page could not be found.",
};

const styles = theme => ({
  actions: {
    marginTop: theme.spacing(3),
    textAlign: "right",
  },
  actionButton: {
    boxShadow: "none",
  },
});

const ErrorPage = ({ classes, title, data: { statusCode } }) => (
  <AdminContext.Consumer>
    {({ admin, user }) => (
      <CardPage
        title={title}
        subtitle={`Status: ${statusCode || t("Unknown")}`}
      >
        <Translate params={user}>
          {statusCode >= 500
            ? "There's been an error. It's been reported to the site administrators via email and should be fixed shortly. Thanks for your patience."
            : errorMessages[statusCode] || ""}
        </Translate>
        {statusCode === 403 && (
          <div className={classes.actions}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => admin.logout()}
              className={classes.actionButton}
            >
              {t("Log in again")}
            </Button>
          </div>
        )}
      </CardPage>
    )}
  </AdminContext.Consumer>
);

ErrorPage.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
};
ErrorPage.defaultProps = {
  data: {},
};

export default withStyles(styles)(ErrorPage);
