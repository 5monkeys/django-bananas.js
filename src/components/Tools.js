import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(theme => ({
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
}));

const Tools = ({ children, className }) => {
  const classes = useStyles();

  return <div className={classNames(classes.root, className)}>{children}</div>;
};

Tools.propTypes = {
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

export default Tools;
