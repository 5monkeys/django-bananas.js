import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ErrorBoundary from "../ErrorBoundary";
import { MultiMeter } from "../utils";
import LoadingScreen from "./LoadingScreen";
import ProgressBar from "./ProgressBar";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
  },
}));

const ThemedPage = ({ theme, ...rest }) => {
  return theme ? (
    <MuiThemeProvider theme={theme}>
      <Page {...rest} />
    </MuiThemeProvider>
  ) : (
    <Page {...rest} />
  );
};

ThemedPage.propTypes = {
  controller: PropTypes.shape({ current: PropTypes.object }).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]),
  theme: PropTypes.object,
};

ThemedPage.defaultProps = {
  component: undefined,
  theme: undefined,
};

const Page = ({ controller, component: PageComponent, ...pageProps }) => {
  const classes = useStyles();

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
};

Page.propTypes = {
  controller: PropTypes.shape({ current: PropTypes.object }).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node,
  ]),
};

Page.defaultProps = {
  component: undefined,
};

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

export default ThemedPage;
export { ThemedPage as Page, PageLoadController };
