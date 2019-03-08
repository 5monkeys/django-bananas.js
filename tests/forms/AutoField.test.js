import Logger from "js-logger";
import React from "react";
import renderer from "react-test-renderer";

import { AutoField, Form } from "../../src/forms";
import BooleanField from "../../src/forms/fields/BooleanField";
import DateField from "../../src/forms/fields/DateField";
import DateTimeField from "../../src/forms/fields/DateTimeField";
import TextField from "../../src/forms/fields/TextField";
import getAPIClient from "../api.mock";
import { TestContext } from "./utils";

Logger.get("bananas").setLevel(Logger.OFF);

class Boundary extends React.Component {
  state = {};

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    const { error } = this.state;
    return error != null ? error.message : children;
  }
}

test("Get a friendly reminder about FormContext, if missing", () => {
  expect(
    renderer
      .create(
        <Boundary>
          <AutoField name="test" />
        </Boundary>
      )
      .toJSON()
  ).toMatchInlineSnapshot(
    '"This component requires FormContext to be present."'
  );
});

test.each([
  ["boolean", "checkbox", BooleanField],
  ["boolean", "switch", BooleanField],
  ["integer", "default", TextField],
  ["text", "default", TextField],
  ["date", "default", DateField],
  ["datetime", "default", DateTimeField],
])(
  "Can render field of type '%s' and variant '%s'",
  async (name, variant, fieldComponent) => {
    const api = await getAPIClient();
    const tree = renderer.create(
      <TestContext api={api}>
        <Form route="example.user:form">
          <AutoField name={name} variant={variant} />
        </Form>
      </TestContext>
    );
    expect(tree.root.findByType(fieldComponent)).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  }
);
