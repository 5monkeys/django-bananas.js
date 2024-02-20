import "@testing-library/jest-dom";

import { cleanup, render } from "@testing-library/react";
import Logger from "js-logger";
import React from "react";

import PermissionRequired from "../../src/auth/PermissionRequired";
import { TestContext } from "./utils";

Logger.get("bananas").setLevel(Logger.OFF);

afterEach(cleanup);

test("Ensure component doesn't show if user lacks permission", async () => {
  const { getByText } = render(
    <TestContext>
      <PermissionRequired permission={"lacks.permission"}>
        {"Don't show me"}
      </PermissionRequired>
    </TestContext>
  );
  expect(() => getByText("Don't show me")).toThrow();
});

test("Ensure component shows with multiple permissions", async () => {
  const { getByText } = render(
    <TestContext>
      <PermissionRequired permission={["has.permission", "also.has.this"]}>
        {"Please show me"}
      </PermissionRequired>
    </TestContext>
  );
  const text = getByText("Please show me");
  expect(text).toBeTruthy();
});

test("Ensure component doesn't show if user has only one permission and allMustMatch is default (true)", async () => {
  const { getByText } = render(
    <TestContext>
      <PermissionRequired permission={["has.permission", "lacks.permission"]}>
        {"Don't show me"}
      </PermissionRequired>
    </TestContext>
  );
  expect(() => getByText("Don't show me")).toThrow();
});

test("Ensure component shows if user only has one permission and allMustMatch is false", async () => {
  const { getByText } = render(
    <TestContext>
      <PermissionRequired
        permission={["has.permission", "lacks.permission"]}
        allMustMatch={false}
      >
        {"Don't show me"}
      </PermissionRequired>
    </TestContext>
  );
  expect(getByText("Don't show me")).toBeTruthy();
});

test("Ensure component doesn't show if user lacks all permissions and allMustMatch is false", async () => {
  const { getByText } = render(
    <TestContext>
      <PermissionRequired
        permission={["lacks.this.permission", "lacks.permission"]}
        allMustMatch={false}
      >
        {"Don't show me"}
      </PermissionRequired>
    </TestContext>
  );
  expect(() => getByText("Don't show me")).toThrow();
});
