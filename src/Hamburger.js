import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: theme.gap(0.5),
    paddingRight: theme.gap(0.5),
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
          size="large"
        >
          <ChevronLeftIcon />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={onToggle}
          size="large"
        >
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
