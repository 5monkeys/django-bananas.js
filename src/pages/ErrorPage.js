import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import CardPage from "./CardPage";

const ErrorPage = ({ title, data }) => {
  const { statusCode } = data;
  return (
    <CardPage title={title} subtitle={`Status: ${statusCode}`}>
      <Typography>
        Sorry, but the page you requested failed to load :-(
      </Typography>
    </CardPage>
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
