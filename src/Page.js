import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ErrorBoundary from "./ErrorBoundary";
import LoadingScreen from "./LoadingScreen";
import ProgressBar from "./ProgressBar";
import { MultiMeter } from "./utils";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
});

class Page extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    controller: PropTypes.shape({ current: PropTypes.object }).isRequired,
    component: PropTypes.func,
    theme: PropTypes.object,
  };

  static defaultProps = {
    component: undefined,
    theme: undefined,
  };

  constructor(props) {
    super(props);

    // Destruct named props to filter out props to pass over to page component
    const { classes, component, controller, theme, ...pageProps } = props;

    this.state = {
      PageComponent: component,
      pageProps,
    };
  }

  renderPage() {
    const { classes, controller } = this.props;
    const { PageComponent, pageProps } = this.state;
    return (
      <div className={classes.root}>
        <PageLoadController ref={controller} />
        {PageComponent && (
          <ErrorBoundary key={pageProps ? pageProps.key : undefined}>
            <PageComponent {...pageProps} />
          </ErrorBoundary>
        )}
      </div>
    );
  }

  render() {
    const { theme } = this.props;
    return theme ? (
      <MuiThemeProvider theme={theme}>{this.renderPage()}</MuiThemeProvider>
    ) : (
      this.renderPage()
    );
  }
}

class PageLoadController extends React.Component {
  static expose = ["progress", "loading"];

  constructor(props) {
    super(props);
    this.meter = new MultiMeter();
  }

  progress(on = true) {
    const level = this.meter.step(on, "progress");
    this.forceUpdate();
    return level;
  }

  loading(on = true) {
    const level = this.meter.step(on, "loading");
    this.forceUpdate();
    return level;
  }

  render() {
    return (
      <>
        <ProgressBar loading={this.meter.read("progress")} />
        <LoadingScreen
          loading={this.meter.read("loading")}
          role="page"
          color="default"
          backdrop
        />
      </>
    );
  }
}

const BananasPage = withStyles(styles, { name: "BananasPage" })(Page);
export default BananasPage;
export { BananasPage as Page, PageLoadController };
