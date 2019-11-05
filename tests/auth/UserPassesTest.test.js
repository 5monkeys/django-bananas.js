import { cleanup, render } from "@testing-library/react";
import Logger from "js-logger";
import React from "react";

import UserPassesTest from "../../src/auth/UserPassesTest";
import { TestContext } from "./utils";

Logger.get("bananas").setLevel(Logger.OFF);

afterEach(cleanup);

test("Ensure component sends user to testFunc and displays on true", async () => {
  const testFunc = jest.fn(user => {
    return user !== undefined;
  });
  const { getByText } = render(
    <TestContext>
      <UserPassesTest testFunc={user => testFunc(user)}>
        {"Please show me"}
      </UserPassesTest>
    </TestContext>
  );
  expect(testFunc).toHaveBeenCalled();
  expect(() => getByText("Please show me")).toBeTruthy();
});

test("Ensure component hides if testFunc returns false", async () => {
  const testFunc = jest.fn(user => {
    return user === undefined;
  });
  const { getByText } = render(
    <TestContext>
      <UserPassesTest testFunc={user => testFunc(user)}>
        {"Don't show me"}
      </UserPassesTest>
    </TestContext>
  );
  expect(testFunc).toHaveBeenCalled();
  expect(() => getByText("Don't show me")).toThrow();
});
