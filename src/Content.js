import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    flexGrow: 1,
    overflow: "auto",
  },
});

const Content = ({ children, classes, ...rest }) => (
  <div className={classNames(classes.root, classes)} {...rest}>
    {children}
  </div>
);

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
};

Content.defaultProps = {
  children: null,
};

export default withStyles(styles)(Content);
