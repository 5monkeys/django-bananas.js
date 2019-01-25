import { ButtonBase, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Logo from "./Logo";
import settings from "./conf";
import AdminContext from "./context";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: settings.dimensions.drawerWidth,
    display: "flex",
    alignItems: "center",
  },
  button: {
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  collapsable: {
    paddingLeft: Number(theme.spacing.unit),
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
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
  },
});

function Branding({ classes, logo, title, subtitle, version, onClick }) {
  return (
    <AdminContext.Consumer>
      {context => {
        // TODO: Remove admin props dependency
        const { layout } = context.admin.props;
        const { permanent } = context.admin.props.navigationProps;
        const horizontalLayout = layout !== "horizontal";
        const collapsable = !permanent && !horizontalLayout;
        return (
          <div className={classes.root}>
            <ButtonBase
              className={classNames(classes.button, {
                [classes.collapsable]: collapsable,
              })}
              color="inherit"
              onClick={onClick}
            >
              {logo ? (
                <Logo src={logo} />
              ) : (
                <Typography variant="h4" className={classes.textLogo}>
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
      }}
    </AdminContext.Consumer>
  );
}

Branding.propTypes = {
  classes: PropTypes.object.isRequired,
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  version: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Branding.defaultProps = {
  logo: true,
  title: "",
  subtitle: "",
  version: "",
};

export default withStyles(styles)(Branding);
