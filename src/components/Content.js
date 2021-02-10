import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Logger from "js-logger";
import PropTypes from "prop-types";
import React from "react";

import { useAdmin } from "../contexts/AdminContext";

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
    padding: theme.spacing(3),
  },
});

const Content = ({ classes, children, disablePadding, contained, ...rest }) => {
  const { router } = useAdmin();

  const scrollElement = React.useRef();

  const routeWillUpdate = (location, action) => {
    /*
     * Persist current scroll position, if element is scrolled.
     */

    if (!router || action === "REPLACE") {
      return;
    }

    const oldScroll = router.history.location.state.scroll;
    if (
      scrollElement.current &&
      (scrollElement.current.scrollTop > 0 ||
        scrollElement.current.scrollTop !== oldScroll)
    ) {
      const { scrollTop } = scrollElement.current;
      logger.debug("Updating history with scroll position:", scrollTop);
      router.updateState({ scroll: scrollTop });
    }
  };

  React.useEffect(() => {
    if (router) {
      // Listen to routeWillUpdate event to persist current scroll position
      const unlisten = router.on("routeWillUpdate", routeWillUpdate);

      // Restore scroll position from history state
      const { scroll } = router.history.location.state;
      const { current } = scrollElement;
      if (current && scroll) {
        logger.debug("Restoring scroll position:", scroll);
        current.scrollTop = scroll;
      }

      return unlisten;
    }
  }, []);

  return (
    <div className={classNames(classes.root)}>
      <div ref={scrollElement} className={classes.scroll}>
        {contained ? (
          <Box>
            <div
              className={classNames({ [classes.padded]: !disablePadding })}
              {...rest}
            >
              {children}
            </div>
          </Box>
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
};

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
