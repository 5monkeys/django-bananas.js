import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    "& > * + *": {
      // Margin between nodes (buttons)
      marginLeft: theme.spacing(1),
    },
  },
});

class Tools extends React.Component {
  render() {
    const { classes, children, className } = this.props;
    return (
      <div className={classNames(classes.root, className)}>{children}</div>
    );
  }
}

Tools.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

Tools.defaultProps = {
  children: null,
  className: undefined,
};

export default withStyles(styles, { name: "BananasTools" })(Tools);
