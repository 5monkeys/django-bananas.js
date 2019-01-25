import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React from "react";

import settings from "./conf";

const styles = () => ({
  root: {
    maxWidth: settings.dimensions.containerWidth,
    margin: "0 auto",
    width: "100%",
  },
});

class WidthLimit extends React.Component {
  render() {
    const { classes, children, ...rest } = this.props;
    return settings.dimensions.containerWidth ? (
      <div className={classNames(classes.root, classNames)} {...rest}>
        {children}
      </div>
    ) : (
      children
    );
  }
}

export default withStyles(styles)(WidthLimit);
