function normalizePath(path) {
  return path.replace("]", "").replace("[", ".");
}

// TODO: more verbose error messages
export function fieldFromSchema(schema, field) {
  const normalizedSchema = { type: "object", properties: schema };
  const normalizedPath = normalizePath(field);
  return normalizedPath.split(".").reduce((acc, key) => {
    if (acc.type === "object") {
      const value = acc.properties[key];
      if (typeof value === "undefined") {
        throw new Error(`Encountered a non-existent key "${key}".`);
      }
      return value;
    } else if (acc.type === "array") {
      if (!key.match(/^\d+$/)) {
        throw new Error(
          `Encountered a non-numeric index "${key}" access on an array.`
        );
      }
      return acc.items;
    }
    throw new Error(
      `Encountered lookup "${key}" on unsupported type "${acc.type}".`
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
