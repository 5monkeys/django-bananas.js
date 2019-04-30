"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldFromSchema = fieldFromSchema;
exports.fieldFromNestedSchema = fieldFromNestedSchema;
exports.fieldFromFlatSchema = fieldFromFlatSchema;
exports.fieldFromErrorResponse = fieldFromErrorResponse;

function normalizePath(path) {
  return path.replace("]", "").replace("[", ".");
}

function fieldFromSchema(schema, field) {
  if (Array.isArray(schema)) {
    return fieldFromFlatSchema(schema, field);
  }

  return fieldFromNestedSchema(schema, field);
} // TODO: more verbose error messages
// Nested schema is typically used for content-type application/json


function fieldFromNestedSchema(schema, field) {
  const normalizedSchema = {
    type: "object",
    properties: schema
  };
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
        throw new Error(`Encountered a non-numeric index "${key}" access on an array.`);
      }

      return acc.items;
    }

    throw new Error(`Encountered lookup "${key}" on unsupported type "${acc.type}".`);
  }, normalizedSchema);
} // Flat schema is typically used for content-type multipart/form-data


function fieldFromFlatSchema(schema, field) {
  const value = schema.find((_ref) => {
    let name = _ref.name;
    return name === field;
  });

  if (typeof value === "undefined") {
    throw new Error(`Encountered a non-existent field "${field}".`);
  }

  return value;
}

function fieldFromErrorResponse(response, field) {
  const normalizedPath = normalizePath(field);
  return normalizedPath.split(".").reduce((acc, key) => acc[key.match(/^\d+$/) ? Number(key) : key], response);
}