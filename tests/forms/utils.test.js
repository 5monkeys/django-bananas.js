import { fieldFromErrorResponse, fieldFromSchema } from "../../src/forms/utils";
import { errorResponse } from "../fixtures/response";
import { flatSchema, nestedSchema } from "../fixtures/schema";

test("Get a top level field from schema", () => {
  expect(fieldFromSchema(nestedSchema, "id")).toEqual({
    title: "Id",
    type: "integer",
    readOnly: true,
    required: false,
  });
});

test("Get a nested field from schema", () => {
  expect(fieldFromSchema(nestedSchema, "artist.name")).toEqual({
    title: "Name",
    type: "string",
    readOnly: true,
    maxLength: 255,
    minLength: 1,
  });
});

test("Get a non-existent field", () => {
  expect(() => fieldFromSchema(nestedSchema, "artist.wrong_field")).toThrow(
    'Encountered a non-existent key "wrong_field".'
  );
});

test("Get an invalid nested field from schema", () => {
  expect(() => fieldFromSchema(nestedSchema, "artist.name.dead_end")).toThrow(
    'Encountered lookup "dead_end" on unsupported type "string".'
  );
});

test("Use a non-numeric index on array", () => {
  expect(() => fieldFromSchema(nestedSchema, "artist.members.two")).toThrow(
    'Encountered a non-numeric index "two" access on an array.'
  );
});

test("Get an array field from schema", () => {
  expect(fieldFromSchema(nestedSchema, "artist.members[0].first_name")).toEqual(
    {
      title: "First name",
      type: "string",
      readOnly: true,
      minLength: 1,
    }
  );
});

test("Get a deep field from schema", () => {
  expect(
    fieldFromSchema(nestedSchema, "artist.members[0].releases.pending")
  ).toEqual({
    title: "Pending",
    type: "integer",
    readOnly: true,
  });
});

test("Get an array field from error response", () => {
  expect(fieldFromErrorResponse(errorResponse, "songs[0].isrc")).toEqual([
    "Ensure this field has at least 12 characters.",
  ]);
});

test("Get a field from a multipart/form-data schema", () => {
  expect(fieldFromSchema(flatSchema, "attachment")).toEqual({
    name: "attachment",
    in: "formData",
    required: false,
    type: "file",
    "x-nullable": true,
  });
});
