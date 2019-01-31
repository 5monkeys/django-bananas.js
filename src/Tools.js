import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";

export default withStyles(
  theme => ({
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      "& > * + *": {
        marginLeft: theme.spacing.unit,
      },
    },
  }),
  { name: "BananasTools" }
)(({ classes, children, className }) => (
  <div className={classNames(classes.root, className)}>{children}</div>
));
