import { ButtonBase, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Logo from "../components/Logo";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  fullWidth: {
    width: "100%",
  },
  button: {
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  smallText: {},
  extra: {
    marginLeft: 10,
    "& > *": {
      textAlign: "left",
      fontSize: "0.75rem",
      display: "block",
      lineHeight: `1em`,
    },
  },
  textLogo: {
    fontWeight: "bold",
  },
}));

function Branding({
  className,
  logo,
  title,
  subtitle,
  version,
  onClick,
  fullWidth,
}) {
  const classes = useStyles();
  return (
    <div
      className={classNames(classes.root, { [classes.fullWidth]: fullWidth })}
    >
      <ButtonBase
        className={classNames(classes.button, className)}
        color="inherit"
        onClick={onClick}
      >
        {logo ? (
          <Logo src={logo} />
        ) : (
          <Typography color="inherit" variant="h4" className={classes.textLogo}>
            {title}
          </Typography>
        )}
        <div className={classes.extra}>
          <Typography color="inherit">{subtitle}</Typography>
          <Typography color="inherit">{version}</Typography>
        </div>
      </ButtonBase>
    </div>
  );
}

Branding.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  version: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
};

Branding.defaultProps = {
  className: undefined,
  logo: true,
  fullWidth: true,
  title: "",
  subtitle: "",
  version: "",
};

export default Branding;
