import Logger from "js-logger";

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

export function t(key) {
  if (!window.i18n) {
    logger.warn(
      "Bananas i18n tranlations not initialized. Failed to translate:",
      key
    );
    return key;
  }

  return window.i18n[key] || key;
}
