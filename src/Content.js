import { withStyles } from "@mui/styles";
import classNames from "classnames";
import Logger from "js-logger";
import PropTypes from "prop-types";
import React from "react";

import AdminContext from "./AdminContext";
import Container from "./Container";

const logger = Logger.get("bananas");

const styles = theme => ({
  root: {
    position: "relative",
    flexGrow: 1,
  },
  scroll: {
    position: "absolute",
    overflowY: "auto",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  padded: {
    padding: theme.gap(3),
  },
});

class Content extends React.Component {
  static contextType = AdminContext;

  constructor(props) {
    super(props);
    this.scrollElement = React.createRef();
  }

  componentDidMount() {
    const router = this.context ? this.context.router : null;

    if (router) {
      // Listen to routeWillUpdate event to persist current scroll position
      this.unlisten = router.on(
        "routeWillUpdate",
        this.routeWillUpdate.bind(this)
      );

      // Restore scroll position from history state
      const { scroll } = router.history.location.state;
      const { current } = this.scrollElement;
      if (current && scroll) {
        logger.debug("Restoring scroll position:", scroll);
        current.scrollTop = scroll;
      }
    }
  }

  componentWillUnmount() {
    // Unlisten to routeWillUpdate event
    if (this.unlisten) {
      this.unlisten();
    }
  }

  routeWillUpdate(location, action) {
    /*
     * Persist current scroll position, if element is scrolled.
     */
    const router = this.context ? this.context.router : null;

    if (!router || action === "REPLACE") {
      return;
    }

    const { current } = this.scrollElement;
    const oldScroll = router.history.location.state.scroll;
    if (current && (current.scrollTop > 0 || current.scrollTop !== oldScroll)) {
      const { scrollTop } = current;
      logger.debug("Updating history with scroll position:", scrollTop);
      router.updateState({ scroll: scrollTop });
    }
  }

  render() {
    const { classes, children, disablePadding, contained, ...rest } =
      this.props;

    return (
      <div className={classNames(classes.root)}>
        <div ref={this.scrollElement} className={classes.scroll}>
          {contained ? (
            <Container>
              <div
                className={classNames({ [classes.padded]: !disablePadding })}
                {...rest}
              >
                {children}
              </div>
            </Container>
          ) : (
            <div
              className={classNames({ [classes.padded]: !disablePadding })}
              {...rest}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  disablePadding: PropTypes.bool,
  contained: PropTypes.bool,
};

Content.defaultProps = {
  children: null,
  disablePadding: false,
  contained: true,
};

export default withStyles(styles, { name: "BananasContent" })(Content);
