import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { withStyles, withTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Link from "./Link";
import ToolBar from "./ToolBar";

const styles = theme => ({
  root: {},
  colorPrimary: {},
  colorSecondary: {},
  colorPaper: {},
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
  theme,
  overrides,
  children,
  color,
  title,
  back,
  dense,
  justify,
  ...rest
}) => {
  const backLinkProps =
    back && back.indexOf(":") > 0 ? { route: back } : { path: back };

  // Determine primary background is overridden, don't emphasize tools if so
  const primaryIsOverridden =
    theme.overrides &&
    theme.overrides.BananasTitleBar &&
    theme.overrides.BananasTitleBar.colorPrimary &&
    ((theme.overrides.BananasTitleBar.colorPrimary.background &&
      theme.overrides.BananasTitleBar.colorPrimary.background !==
        theme.palette.primary.main) ||
      (theme.overrides.BananasTitleBar.colorPrimary.background &&
        theme.overrides.BananasTitleBar.colorPrimary.background !==
          theme.palette.primary.main));

  const emphasize = color === "primary" ? !primaryIsOverridden : true;

  return (
    <ToolBar
      color={color}
      emphasize={emphasize}
      justify={justify}
      dense={dense}
      overrides={{
        ...overrides,
        root: classNames(classes.root, overrides.root),
        colorPrimary:
          color === "primary" &&
          classNames(classes.colorPrimary, overrides.colorPrimary),
        colorSecondary:
          color === "secondary" &&
          classNames(classes.colorSecondary, overrides.colorSecondary),
        colorPaper:
          color === "paper" &&
          classNames(classes.colorPaper, overrides.colorPaper),
      }}
      {...rest}
    >
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
  /** Choices: primary | secondary | paper */
  color: PropTypes.string,
  /** Title text */
  title: PropTypes.string,
  /** Shows a back button. Supports operation ID or path for a specific route */
  back: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Less padding for a tighter look */
  dense: PropTypes.bool,
  /** Choices: start | center | end | between | around | evenly */
  justify: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Custom claasses overrides TODO: Use regular classes */
  overrides: PropTypes.object,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

TitleBar.defaultProps = {
  overrides: {},
  children: null,
  color: "primary",
  title: undefined,
  back: false,
  dense: false,
  justify: "between",
};

const BananasTitleBar = withStyles(styles, { name: "BananasTitleBar" })(
  withTheme()(TitleBar)
);

export default BananasTitleBar;
export { TitleBar, BananasTitleBar };
