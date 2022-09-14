export function toQuery(obj: Record<string, string>): string {
  if (!obj) {
    return "";
  }

  const query = Object.keys(obj)
    .map((key) => {
      return `${key}=${encodeURIComponent(obj[key])}`;
    })
    .join("&");

  return query ? `?${query}` : "";
}

export function fromQuery(query: string): Record<string, string> {
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

export function ensureTrailingSlash(path: string): string {
  if (path != null && !path.endsWith("/")) {
    return `${path}/`;
  }
  return path;
}

export function ensureLeadingHash(hash: string): string {
  if (hash != null && !hash.startsWith("#")) {
    return `#${hash}`;
  }
  return hash;
}

export function absolutePath(path: string, basename = "/"): string {
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

export function nthIndexOf(
  str: string,
  pattern: string,
  n: number,
  start?: number,
): number {
  const index = str.indexOf(pattern, start ?? 0);
  if (index >= 0 && n > 1) {
    return nthIndexOf(str, pattern, n - 1, index + 1);
  }
  return index;
}

/**
 * Like Python’s `.capitalize()`.
 */
export function capitalize(string: string): string {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}
