import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Container from "./Container";

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
    padding: theme.spacing.unit * 3,
  },
});

const Content = ({ classes, children, disablePadding, contained, ...rest }) => (
  <div className={classNames(classes.root, classes)}>
    <div className={classes.scroll}>
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

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
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
