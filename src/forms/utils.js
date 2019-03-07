function normalizePath(path) {
  return path.replace("]", "").replace("[", ".");
}

// TODO: more verbose error messages
export function fieldFromSchema(schema, field) {
  const normalizedSchema = { type: "object", properties: schema };
  const normalizedPath = normalizePath(field);
  return normalizedPath.split(".").reduce((acc, key) => {
    if (typeof acc === "undefined") {
      throw new Error("Reached a dead end.");
    } else if (acc.type === "object") {
      return acc.properties[key];
    } else if (acc.type === "array") {
      if (!key.match(/^\d+$/)) {
        throw new Error(
          `Encountered a non-numeric index "${key}" access on an array.`
        );
      }
      return acc.items;
    }
    throw new Error(
      `Encountered lookup "${key}" on unsupported type "${acc.type}"`
    );
  }, normalizedSchema);
}

export function fieldFromErrorResponse(response, field) {
  const normalizedPath = normalizePath(field);
  return normalizedPath
    .split(".")
    .reduce(
      (acc, key) => acc[key.match(/^\d+$/) ? Number(key) : key],
      response
    );
}
