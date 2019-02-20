import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Container from "./Container";
import AdminContext from "./context";

const styles = theme => ({
  root: {
    position: "relative",
    flexGrow: 1,
  },
  scroll: {
    position: "absolute",
    overflowY: "auto",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  padded: {
    padding: theme.spacing.unit * 3,
  },
});

class Content extends React.Component {
  static contextType = AdminContext;

  constructor(props) {
    super(props);
    this.scrollElement = React.createRef();
  }

  componentDidMount() {
    if (this.context) {
      this.context.admin.manageScrollRestoration(this.scrollElement.current);
    }
  }

  componentDidUpdate() {
    if (this.context) {
      this.context.admin.restoreScroll();
    }
  }

  render() {
    const {
      classes,
      children,
      disablePadding,
      contained,
      ...rest
    } = this.props;

    return (
      <div className={classNames(classes.root)}>
        <div
          ref={this.scrollElement}
          id="bananas-content-scroll"
          className={classes.scroll}
        >
          {contained ? (
            <Container>
              <div
                className={classNames({ [classes.padded]: !disablePadding })}
                {...rest}
              >
                {children}
              </div>
            </Container>
          ) : (
            <div
              className={classNames({ [classes.padded]: !disablePadding })}
              {...rest}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  disablePadding: PropTypes.bool,
  contained: PropTypes.bool,
};

Content.defaultProps = {
  children: null,
  disablePadding: false,
  contained: true,
};

export default withStyles(styles, { name: "BananasContent" })(Content);
