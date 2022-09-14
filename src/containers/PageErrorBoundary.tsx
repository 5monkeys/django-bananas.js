import React from "react";

export interface PageErrorBoundaryProps<T = Error> {
  errorPage: React.ComponentType<{ error: T }>;
  children: React.ReactNode;
}

export default class PageErrorBoundary<T = Error>
  extends React.Component<PageErrorBoundaryProps<T>> {
  state: { error: T | null } = { error: null };
  errorPage: PageErrorBoundaryProps<T>["errorPage"];

  constructor(props: PageErrorBoundaryProps<T>) {
    super(props);
    this.errorPage = props.errorPage;
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;

    if (error) {
      const ErrorPage = this.errorPage;
      return <ErrorPage error={error} />;
    }

    return this.props.children;
  }
}
