import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Link from "./Link";
import ToolBar from "./ToolBar";

const styles = theme => ({
  root: {
    flexGrow: 0,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  titleRoot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: theme.spacing.unit * 2,
  },
  title: {
    flexGrow: 0,
    flexShrink: 0,
  },
  back: {
    marginLeft: theme.spacing.unit / -2,
    marginRight: theme.spacing.unit * 2,
    boxShadow: "none",
    borderWidth: "1.5pt",
    borderStyle: "solid",
    borderColor: theme.palette.primary.contrastText,
    backgroundColor: "transparent",
    "&:hover, &:active": {
      boxShadow: "none",
    },
  },
});

const TitleBar = ({
  classes,
  overrides,
  children,
  title,
  back,
  dense,
  justify,
  ...rest
}) => {
  const backLinkProps =
    back && back.indexOf(":") > 0 ? { route: back } : { path: back };

  return (
    <ToolBar justify={justify} dense={dense} overrides={overrides} {...rest}>
      <div className={classes.titleRoot}>
        {back && (
          <Link patch {...backLinkProps}>
            <Fab
              color="primary"
              size="small"
              className={classes.back}
              aria-label="Back"
            >
              <ChevronLeftIcon />
            </Fab>
          </Link>
        )}
        {title && (
          <Typography
            component="h1"
            variant={dense ? "subtitle1" : "h6"}
            color="inherit"
            className={classNames(classes.title, {
              [overrides.title]: overrides.title,
            })}
          >
            {title}
          </Typography>
        )}
      </div>
      {children}
    </ToolBar>
  );
};

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
  overrides: PropTypes.object,
  children: PropTypes.node,
  title: PropTypes.string,
  back: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dense: PropTypes.bool,
  justify: PropTypes.string, // start|center|end|between|around|evenly
};

TitleBar.defaultProps = {
  overrides: {},
  children: null,
  title: undefined,
  back: false,
  dense: false,
  justify: "between",
};

export default withStyles(styles, { name: "BananasTitleBar" })(TitleBar);
