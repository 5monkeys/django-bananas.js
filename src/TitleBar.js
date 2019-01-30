import AppBar from "@material-ui/core/AppBar";
import Fab from "@material-ui/core/Fab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Container from "./Container";
import Link from "./Link";

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
  title: {
    flexGrow: 1,
  },
  back: {
    marginLeft: theme.spacing.unit / -2,
    marginRight: theme.spacing.unit * 2,
    boxShadow: "none",
    borderWidth: "1.5pt",
    borderStyle: "solid",
    borderColor: theme.palette.primary.contrastText,
    "&:hover, &:active": {
      boxShadow: "none",
    },
  },
  centerChildren: {
    flexGrow: 1,
  },
});

const TitleBar = ({
  classes,
  children,
  title,
  back,
  centerChildren,
  ...rest
}) => {
  const backLinkProps =
    back && back.indexOf(":") > 0 ? { route: back } : { path: back };

  return (
    <AppBar
      elevation={0}
      position={"relative"}
      color="primary"
      className={classes.root}
      {...rest}
    >
      <Container>
        <Toolbar
          className={classes.toolbar}
          classes={{ gutters: classes.toolbarGutters }}
        >
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
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            className={classes.title}
          >
            {title}
          </Typography>
          <div
            className={classNames({
              [classes.centerChildren]: centerChildren,
            })}
          >
            {children}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  back: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  centerChildren: PropTypes.bool,
};

TitleBar.defaultProps = {
  title: "Bananas",
  back: false,
  children: null,
  centerChildren: false,
};

export default withStyles(styles, { name: "BananasTitleBar" })(TitleBar);
