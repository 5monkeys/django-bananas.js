/* inspired by next/link : https://github.com/zeit/next.js/blob/canary/packages/next/client/link.js */
import MuiLink from "@material-ui/core/Link";
import PropTypes from "prop-types";
import React, { Children } from "react";

import AdminContext from "./context";
import { toQuery } from "./utils";

export default class Link extends React.Component {
  static contextType = AdminContext;

  linkClicked = e => {
    const { nodeName, target } = e.currentTarget;
    // ignore click for new tab / new window behavior
    if (
      nodeName === "A" &&
      ((target && target !== "_self") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        (e.nativeEvent && e.nativeEvent.which === 2))
    ) {
      return;
    }

    e.preventDefault();

    const { route, params, path, query, hash, patch } = this.props;

    this.context.router.route(
      {
        id: route,
        params,
        path,
        query,
        hash,
      },
      {
        patch,
      }
    );
  };

  render() {
    const {
      route, // id i.e. route name
      params,
      path,
      query,
      href,
      children,
      patch,
      ...rest
    } = this.props;

    let { hash } = this.props;
    let child = null;
    let isAnchor = false;
    const props = rest;

    if (typeof children === "string") {
      child = <MuiLink {...rest}>{children}</MuiLink>;
      isAnchor = true;
    } else {
      child = Children.only(children);
      isAnchor = child.type === "a";
    }

    if (isAnchor) {
      if (href) {
        props.href = href;
        return React.cloneElement(child, props);
      }

      let pathname = undefined;
      if (route) {
        const resolvedRoute = this.context.router.reverse(route, params);
        pathname = resolvedRoute ? resolvedRoute.path : null;
      } else if (path) {
        const resolvedRoute = this.context.router.resolve(path);
        pathname = resolvedRoute ? resolvedRoute.path : path;
      }

      if (!pathname) {
        throw new Error(`Failed to create link for: ${route || path}`);
      }

      hash = hash && !hash.startsWith("#") ? `#${hash}` : hash;
      props.href = `${pathname}${toQuery(query)}${hash}`;
    }

    props.onClick = e => {
      if (child.props && typeof child.props.onClick === "function") {
        child.props.onClick(e);
      }
      if (!e.defaultPrevented) {
        this.linkClicked(e);
      }
    };

    return React.cloneElement(child, props);
  }
}

Link.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  route: PropTypes.string,
  params: PropTypes.object,
  path: PropTypes.string,
  query: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  hash: PropTypes.string,
  patch: PropTypes.bool,
};

Link.defaultProps = {
  route: undefined,
  params: undefined,
  path: undefined,
  query: "",
  hash: "",
  patch: false,
};
