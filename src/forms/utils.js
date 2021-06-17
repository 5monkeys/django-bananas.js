function normalizePath(path) {
  return path.replace("]", "").replace("[", ".");
}

export function fieldFromSchema(schema, field) {
  if (Array.isArray(schema)) {
    return fieldFromFlatSchema(schema, field);
  }
  return fieldFromNestedSchema(schema, field);
}

// TODO: more verbose error messages
// Nested schema is typically used for content-type application/json
export function fieldFromNestedSchema(schema, field) {
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

// Flat schema is typically used for content-type multipart/form-data
export function fieldFromFlatSchema(schema, field) {
  const value = schema.find(({ name }) => name === field);
  if (typeof value === "undefined") {
    throw new Error(`Encountered a non-existent field "${field}".`);
  }
  return value;
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
