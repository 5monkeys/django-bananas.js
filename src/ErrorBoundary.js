import PropTypes from "prop-types";
import React from "react";

import AdminContext from "./context/AdminContext";
import { InternalPageError } from "./errors";
import ErrorPage from "./pages/ErrorPage";

class ErrorBoundary extends React.Component {
  static contextType = AdminContext;

  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromError() {
    return { error: new InternalPageError() };
  }

  render() {
    const { children, component, ...props } = this.props;
    const Fallback = component;
    const { error } = this.state;

    return error ? (
      Fallback ? (
        <Fallback {...props} />
      ) : (
        <ErrorPage
          key={error.code}
          title={error.message}
          data={{ statusCode: error.code }}
        />
      )
    ) : (
      children
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  component: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  component: null,
};

export default ErrorBoundary;
