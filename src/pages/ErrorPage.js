import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";

import { TitleBar } from "..";
import { useAdmin } from "../contexts/AdminContext";
import { t, Translate } from "../utils";

const errorMessages = {
  403: "You are authenticated as %(username)s, but are not authorized to access this page. Would you like to login to a different account?",
  404: "We're sorry, but the requested page could not be found.",
  501: "We're sorry, but the requested page could not be found.",
};

const useStyles = makeStyles(() => ({
  actionButton: {
    boxShadow: "none",
  },
  card: {
    minWidth: 400,
    maxWidth: 600,
  },
}));

const ErrorPage = ({ title, data: { statusCode } }) => {
  const { admin, user } = useAdmin();
  const classes = useStyles();
  return (
    <>
      <TitleBar title={title} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
      >
        <Card elevation={5} className={classes.card}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>

            <Typography variant="overline" gutterBottom>
              {`Status: ${statusCode || t("Unknown")}`}
            </Typography>

            <Translate params={user}>
              {statusCode >= 500
                ? "There's been an error. It's been reported to the site administrators via email and should be fixed shortly. Thanks for your patience."
                : errorMessages[statusCode] || ""}
            </Translate>
            {statusCode === 403 && (
              <Box mt={3} textAlign="right">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => admin.logout()}
                  className={classes.actionButton}
                >
                  {t("Log in again")}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
};
ErrorPage.defaultProps = {
  data: {},
};

export default ErrorPage;
