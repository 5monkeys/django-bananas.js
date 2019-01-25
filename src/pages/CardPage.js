import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import TitleBar from "../TitleBar";
import settings from "../conf";

const styles = _theme => ({
  root: {
    height: `calc(100vh - ${settings.dimensions.appbarHeight}px)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    minWidth: 400,
  },
});

const CardPage = ({ classes, children, title, subtitle }) => (
  <>
    <TitleBar title={title} />
    <div className={classes.root}>
      <Card elevation={5} className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="overline" gutterBottom>
              {subtitle}
            </Typography>
          )}
          {children}
        </CardContent>
      </Card>
    </div>
  </>
);

CardPage.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.object,
};

CardPage.defaultProps = {
  subtitle: undefined,
};

export default withStyles(styles)(CardPage);
