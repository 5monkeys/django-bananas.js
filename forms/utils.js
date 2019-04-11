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
  var normalizedSchema = {
    type: "object",
    properties: schema
  };
  var normalizedPath = normalizePath(field);
  return normalizedPath.split(".").reduce(function (acc, key) {
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
} // Flat schema is typically used for content-type multipart/form-data


function fieldFromFlatSchema(schema, field) {
  var value = schema.find(function (_ref) {
    var name = _ref.name;
    return name === field;
  });

  if (typeof value === "undefined") {
    throw new Error("Encountered a non-existent field \"".concat(field, "\"."));
  }

  return value;
}

function fieldFromErrorResponse(response, field) {
  var normalizedPath = normalizePath(field);
  return normalizedPath.split(".").reduce(function (acc, key) {
    return acc[key.match(/^\d+$/) ? Number(key) : key];
  }, response);
}