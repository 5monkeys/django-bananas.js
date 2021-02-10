import { Box, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import TitleBar from "../components/TitleBar";

const styles = () => ({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    minWidth: 400,
    maxWidth: 600,
  },
});

const CardPage = ({ classes, children, title, subtitle }) => (
  <>
    <TitleBar title={title} />
    <Box>
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
    </Box>
  </>
);

CardPage.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

CardPage.defaultProps = {
  subtitle: undefined,
};

export default withStyles(styles)(CardPage);
