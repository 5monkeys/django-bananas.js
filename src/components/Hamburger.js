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
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    marginRight: "1px",
  },
});

const Hamburger = ({ classes, open, onToggle, ...rest }) => {
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
  classes: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

Hamburger.defaultProps = {
  open: false,
};

export default withStyles(styles, { name: "BananasHamburger" })(Hamburger);
