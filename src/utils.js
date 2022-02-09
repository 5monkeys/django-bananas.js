import { Typography } from "@mui/material";
import Logger from "js-logger";
import PropTypes from "prop-types";
import React from "react";

const logger = Logger.get("bananas");

export function getCookie(name) {
  const prefix = `${name}=`;
  const cookies = document.cookie.split(/\s*;\s*/);
  const match = cookies.find(cookie => cookie.startsWith(prefix));
  return match == null ? undefined : match.slice(prefix.length);
}

export function toQuery(obj) {
  if (!obj) {
    return "";
  }

  const query = Object.keys(obj)
    .map(key => {
      return `${key}=${encodeURIComponent(obj[key])}`;
    })
    .join("&");

  return query ? `?${query}` : "";
}

export function fromQuery(query) {
  if (!query) {
    return {};
  }
  return query
    .substring(1)
    .split("&")
    .reduce((params, param) => {
      const [key, value] = param.split("=");
      return key === ""
        ? params
        : { ...params, [key]: decodeURIComponent(value) };
    }, {});
}

export function ensureTrailingSlash(path) {
  if (path != null && !path.endsWith("/")) {
    return `${path}/`;
  }
  return path;
}

export function ensureLeadingHash(hash) {
  if (hash != null && !hash.startsWith("#")) {
    return `#${hash}`;
  }
  return hash;
}

export function absolutePath(path, basename = "/") {
  if (!path) {
    return path;
  }

  let pathname = path;

  // Make relative path absolute to basename
  if (!pathname.startsWith("/")) {
    pathname = ensureTrailingSlash(basename) + pathname;
  }

  // Expand path
  if (pathname.indexOf(".") >= 0) {
    const stack = [];
    for (const part of pathname.split("/")) {
      if (part === ".") {
        continue;
      } else if (part === ".." && stack.length > 0) {
        stack.pop();
      } else {
        stack.push(part);
      }
    }
    pathname = stack.join("/");
  }

  return ensureTrailingSlash(pathname);
}

export function nthIndexOf(str, pattern, n, start) {
  const index = str.indexOf(pattern, start || 0);
  if (index >= 0 && n > 1) {
    return nthIndexOf(str, pattern, n - 1, index + 1);
  }
  return index;
}

/**
 * Like Python’s `.capitalize()`.
 */
export function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}

export function interpolateString(string, params) {
  return Array.isArray(params)
    ? params.reduce((s, value) => s.replace(/%[sd]|\{\}/, value), string)
    : Object.entries(params).reduce(
        (s, [key, value]) =>
          s.replace(new RegExp(`%\\(${key}\\)[sd]|\\{${key}\\}`, "g"), value),
        string
      );
}

export function t(key, params) {
  if (!window.i18n) {
    logger.warn(
      "Bananas i18n translations not initialized. Failed to translate:",
      key
    );
    return key;
  }

  const value = window.i18n[key] || key;
  return params ? interpolateString(value, params) : value;
}

export const Translate = ({ children, params }) => (
  <Typography>{t(children, params)}</Typography>
);

Translate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  params: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Translate.defaultProps = {
  params: undefined,
};

/**
 * Helper for proxying exposed methods from one or more referenced components.
 */
export class ComponentProxy {
  constructor() {
    this.proxy = {};
  }

  add(Component, alias) {
    const reference = React.createRef();

    // Add exposed component actions to proxy
    for (const action of Component.expose) {
      this.proxy[action] = (...args) =>
        reference.current ? reference.current[action](...args) : null;
    }

    // Remember reference under alias for later use
    if (alias) {
      this[alias] = reference;
    }

    return reference;
  }
}

export class MultiMeter {
  meters = {};

  up = (name, step) => this.change(name, step ? Math.abs(step) : 1);
  down = (name, step) => this.change(name, step ? -Math.abs(step) : -1);
  step = (up, name) => (up ? this.up(name) : this.down(name));

  change = (name, delta) => {
    const n = name || "default";
    this.meters[n] = Math.max((this.meters[n] || 0) + delta, 0);
    return this.meters[n];
  };

  read = name => {
    return name
      ? this.meters[name] > 0
      : Object.keys(this.meters).some(n => this.reads(n));
  };
}

export function getFromSchema(schema, path) {
  return getFromSchemaHelper(schema, path.split("."), []);
}

function getFromSchemaHelper(schema, pathItems, location) {
  if (pathItems.length === 0) {
    return schema;
  }

  const [key, ...restPath] = pathItems;

  const type = {}.toString.call(schema);
  if (type !== "[object Object]") {
    throw new TypeError(
      `Cannot access ${JSON.stringify(key)} on ${type} at ${JSON.stringify(
        ["schema", ...location].join(".")
      )}`
    );
  }

  if (schema.type === "array") {
    return getFromSchemaHelper(schema.items, pathItems, [...location, "items"]);
  }

  if (schema.type === "object") {
    return getFromSchemaHelper(schema.properties, pathItems, [
      ...location,
      "properties",
    ]);
  }

  if (!{}.hasOwnProperty.call(schema, key)) {
    throw new TypeError(
      `${JSON.stringify(key)} is not present at ${JSON.stringify(
        ["schema", ...location].join(".")
      )}. Valid choices: ${JSON.stringify(Object.keys(schema))}`
    );
  }

  return getFromSchemaHelper(schema[key], restPath, [...location, key]);
}

export const makeUser = responseData => {
  return {
    ...responseData,
    hasPermission(permission) {
      return this.permissions.indexOf(permission) !== -1;
    },
  };
};

export const hasPermissions = (permissions, user, all = true) => {
  for (const permission of permissions) {
    if (user.hasPermission(permission)) {
      if (!all) {
        return true;
      }
    } else if (all) {
      return false;
    }
  }
  return all;
};
