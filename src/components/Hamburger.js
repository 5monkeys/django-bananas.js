import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    marginRight: "1px",
  },
}));

const Hamburger = ({ open, onToggle, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {open ? (
        <IconButton
          aria-label="Close drawer"
          color="inherit"
          onClick={onToggle}
          {...rest}
        >
          <ChevronLeftIcon />
        </IconButton>
      ) : (
        <IconButton color="inherit" aria-label="Open drawer" onClick={onToggle}>
          <MenuIcon />
        </IconButton>
      )}
    </div>
  );
};

Hamburger.propTypes = {
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

Hamburger.defaultProps = {
  open: false,
};

export default Hamburger;
