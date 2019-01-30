import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: theme.spacing.unit / 2 - 1,
  },
});

const Hamburger = ({ classes, open, onToggle }) => {
  return (
    <div className={classes.root}>
      {open ? (
        <IconButton
          aria-label="Close drawer"
          color="inherit"
          onClick={onToggle}
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
  classes: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

Hamburger.defaultProps = {
  open: false,
};

export default withStyles(styles, { name: "BananasHamburger" })(Hamburger);
