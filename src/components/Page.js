import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ErrorBoundary from "../ErrorBoundary";
import { MultiMeter } from "../utils";
import LoadingScreen from "./LoadingScreen";
import ProgressBar from "./ProgressBar";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
  },
});

class ThemedPage extends React.Component {
  static propTypes = {
    controller: PropTypes.shape({ current: PropTypes.object }).isRequired,
    component: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
      PropTypes.node,
    ]),
    theme: PropTypes.object,
  };

  static defaultProps = {
    component: undefined,
    theme: undefined,
  };

  render() {
    const { theme, ...rest } = this.props;
    return theme ? (
      <MuiThemeProvider theme={theme}>
        <BananasPage {...rest} />
      </MuiThemeProvider>
    ) : (
      <BananasPage {...rest} />
    );
  }
}

class Page extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    controller: PropTypes.shape({ current: PropTypes.object }).isRequired,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    component: undefined,
  };

  render() {
    const {
      classes,
      controller,
      component: PageComponent,
      ...pageProps
    } = this.props;
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
export default ThemedPage;
export { ThemedPage as Page, PageLoadController };
