"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldFromSchema = fieldFromSchema;
exports.fieldFromErrorResponse = fieldFromErrorResponse;

function normalizePath(path) {
  return path.replace("]", "").replace("[", ".");
} // TODO: more verbose error messages


function fieldFromSchema(schema, field) {
  var normalizedSchema = {
    type: "object",
    properties: schema
  };
  var normalizedPath = normalizePath(field);
  return normalizedPath.split(".").reduce((acc, key) => {
    if (acc.type === "object") {
      var value = acc.properties[key];

      if (typeof value === "undefined") {
        throw new Error("Encountered a non-existent key \"".concat(key, "\"."));
      }

      return value;
    } else if (acc.type === "array") {
      if (!key.match(/^\d+$/)) {
        throw new Error("Encountered a non-numeric index \"".concat(key, "\" access on an array."));
      }

      return acc.items;
    }

    throw new Error("Encountered lookup \"".concat(key, "\" on unsupported type \"").concat(acc.type, "\"."));
  }, normalizedSchema);
}

function fieldFromErrorResponse(response, field) {
  var normalizedPath = normalizePath(field);
  return normalizedPath.split(".").reduce((acc, key) => acc[key.match(/^\d+$/) ? Number(key) : key], response);
}