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
      return { ...params, [key]: decodeURIComponent(value) };
    }, {});
}

export function ensureTrailingSlash(path) {
  if (path && !path.endsWith("/")) {
    return `${path}/`;
  }
  return path;
}

export function ensureLeadingHash(hash) {
  if (hash && !hash.startsWith("#")) {
    return `#${hash}`;
  }
  return hash;
}

export function absolutePath(path) {
  const stack = [];
  for (const part of path.split("/")) {
    if (part === ".") {
      continue;
    } else if (part === ".." && stack.length > 0) {
      stack.pop();
    } else {
      stack.push(part);
    }
  }
  return stack.join("/");
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
  // TODO: Implement
  throw new Error("Translation not implemented", key);
}
