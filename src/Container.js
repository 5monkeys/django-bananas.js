import { withStyles } from "@mui/styles";
import classNames from "classnames";
import React from "react";

const styles = () => ({
  root: {},
});

class Container extends React.Component {
  render() {
    const { classes, children, className, ...rest } = this.props;
    return (
      <div className={classNames(classes.root, className)} {...rest}>
        {children}
      </div>
    );
  }
}

export default withStyles(styles, { name: "BananasContainer" })(Container);
