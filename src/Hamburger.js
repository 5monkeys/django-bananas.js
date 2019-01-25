import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";

const Hamburger = ({ open, onToggle }) => {
  return (
    <div>
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
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

Hamburger.defaultProps = {
  open: false,
};

export default Hamburger;
