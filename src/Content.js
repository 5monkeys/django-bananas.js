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

const Content = ({ classes, children, disablePadding, ...rest }) => (
  <div className={classNames(classes.root, classes)}>
    <div className={classes.scroll}>
      <Container>
        <div
          className={classNames({ [classes.padded]: !disablePadding })}
          {...rest}
        >
          {children}
        </div>
      </Container>
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
};

Content.defaultProps = {
  children: null,
  disablePadding: false,
};

export default withStyles(styles, { name: "BananasContent" })(Content);
