import PropTypes from "prop-types";
import React from "react";

import { Translate } from "..";
import CardPage from "./CardPage";

const ErrorPage = ({ title, data }) => {
  const { statusCode } = data;
  return (
    <CardPage title={title} subtitle={`Status: ${statusCode}`}>
      <Translate>
        {statusCode === 500
          ? "There's been an error. It's been reported to the site administrators via email and should be fixed shortly. Thanks for your patience."
          : "We're sorry, but the requested page could not be found."}
      </Translate>
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
