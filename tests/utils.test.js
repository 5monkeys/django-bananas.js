import "@testing-library/jest-dom";

import Logger from "js-logger";

import { t } from "../src";
import { createColor, django } from "../src/colors";
import {
  absolutePath,
  capitalize,
  ensureLeadingHash,
  ensureTrailingSlash,
  fromQuery,
  getCookie,
  hasPermissions,
  interpolateString,
  nthIndexOf,
  toQuery,
} from "../src/utils";
import { contextData } from "./auth/utils";

Logger.get("bananas").setLevel(Logger.OFF);

test("Get cookie value", () => {
  Object.defineProperty(global.document, "cookie", {
    value: "foo=bar;;ham=spam;",
  });
  expect(getCookie("foo")).toBe("bar");
  expect(getCookie("ham")).toBe("spam");
});

test("Absolute path", () => {
  expect(absolutePath("")).toBe("");
  expect(absolutePath("foo")).toBe("/foo/");
  expect(absolutePath("foo/", "/bar")).toBe("/bar/foo/");
  expect(absolutePath("/foo/bar")).toBe("/foo/bar/");
  expect(absolutePath("foo/./bar/")).toBe("/foo/bar/");
  expect(absolutePath("foo/./bar/../baz/")).toBe("/foo/baz/");
  expect(absolutePath("/foo/./bar/../../baz")).toBe("/baz/");
  expect(absolutePath("foo/./bar/../../")).toBe("/");
  expect(absolutePath("../", "/foo/bar")).toBe("/foo/");
  expect(absolutePath("../..", "/foo/bar")).toBe("/");
});

test("Capitalize string", () => {
  expect(capitalize("")).toBe("");
  expect(capitalize("foo")).toBe("Foo");
  expect(capitalize("foo bar")).toBe("Foo bar");
  expect(capitalize("fOo Bar")).toBe("Foo bar");
});

test("Ensure leading hash (#)", () => {
  expect(ensureLeadingHash()).toBeUndefined();
  expect(ensureLeadingHash("")).toBe("#");
  expect(ensureLeadingHash("foo")).toBe("#foo");
  expect(ensureLeadingHash("#foo")).toBe("#foo");
});

test("Ensure trailing slash", () => {
  expect(ensureTrailingSlash()).toBeUndefined();
  expect(ensureTrailingSlash("")).toBe("/");
  expect(ensureTrailingSlash("foo")).toBe("foo/");
  expect(ensureTrailingSlash("foo/")).toBe("foo/");
  expect(ensureTrailingSlash("/foo/")).toBe("/foo/");
});

test("Convert query string to object", () => {
  expect(fromQuery()).toEqual({});
  expect(fromQuery("")).toEqual({});
  expect(fromQuery("?")).toEqual({});
  expect(fromQuery("?foo=bar")).toEqual({ foo: "bar" });
  expect(fromQuery("?foo=bar&")).toEqual({ foo: "bar" });
  expect(fromQuery("?&foo=bar&")).toEqual({ foo: "bar" });
  expect(fromQuery("?foo=bar&ham=spam")).toEqual({ foo: "bar", ham: "spam" });
});

test("Convert object to query string", () => {
  expect(toQuery()).toBe("");
  expect(toQuery({})).toBe("");
  expect(toQuery({ foo: "bar" })).toBe("?foo=bar");
  expect(toQuery({ foo: "bar", ham: "spam" })).toBe("?foo=bar&ham=spam");
});

test("Find nth occurance of pattern in string", () => {
  expect(nthIndexOf("foo/bar/baz/", "/", 1, 0)).toBe(3);
  expect(nthIndexOf("foo/bar/baz/", "/", 2, 0)).toBe(7);
  expect(nthIndexOf("foo/bar/baz/", "/", 3, 0)).toBe(11);
  expect(nthIndexOf("foo/bar/baz/", "/", 1, 4)).toBe(7);
  expect(nthIndexOf("foo/bar/baz/", "/", 2, 4)).toBe(11);
  expect(nthIndexOf("foo/bar/baz/", "/", 3, 4)).toBe(-1);
});

test("Can translate strings via API", () => {
  expect(t("foo")).toBe("foo");
  expect(t("baz")).toBe("baz");

  window.i18n = { foo: "bar", "foo %(bar)s": "bar %(bar)s" };
  expect(t("foo")).toBe("bar");
  expect(t("baz")).toBe("baz");

  expect(t("foo %(bar)s", { bar: "banana" })).toBe("bar banana");
});

test("Can interpolate strings", () => {
  expect(interpolateString("foo %(bar)s", { bar: "banana" })).toBe(
    "foo banana"
  );
  expect(interpolateString("baz {bar}", { bar: "banana" })).toBe("baz banana");
  expect(interpolateString("baz {bar} {bar}", { bar: "banana" })).toBe(
    "baz banana banana"
  );
  expect(interpolateString("baz", { bar: "banana" })).toBe("baz");

  expect(interpolateString("baz %s", ["banana"])).toBe("baz banana");
  expect(interpolateString("baz %s %s", ["banana", "man"])).toBe(
    "baz banana man"
  );
  expect(interpolateString("baz {}", ["banana"])).toBe("baz banana");
  expect(interpolateString("baz {} {}", ["banana", "man"])).toBe(
    "baz banana man"
  );
});

test("Can generate Material UI color shapes", () => {
  const green = "#34A77B";
  expect(createColor(green)).toEqual(django);
});

test("Default permission checks work as expected", () => {
  expect(contextData.user.hasPermission("lacks.permission")).toBeFalsy();
  expect(contextData.user.hasPermission("has.permission")).toBeTruthy();
  expect(
    hasPermissions(["has.permission", "lacks.permission"], contextData.user)
  ).toBeFalsy();
  expect(
    hasPermissions(
      ["has.permission", "lacks.permission"],
      contextData.user,
      false
    )
  ).toBeTruthy();
  expect(
    hasPermissions(
      ["lacks.this.permission", "lacks.permission"],
      contextData.user,
      false
    )
  ).toBeFalsy();
});

test("Can customize permission check on user object", () => {
  contextData.user.hasPermission = () => {
    return false;
  };
  expect(contextData.user.hasPermission("has.permission")).toBeFalsy();
  expect(
    hasPermissions(
      ["has.permission", "lacks.permission"],
      contextData.user,
      false
    )
  ).toBeFalsy();
});
