import Logger from "js-logger";
import React from "react";
import renderer from "react-test-renderer";

import { AutoField, Form } from "../../src/forms";
import BooleanField from "../../src/forms/fields/BooleanField";
import ChoiceField from "../../src/forms/fields/ChoiceField";
import DateField from "../../src/forms/fields/DateField";
import DateTimeField from "../../src/forms/fields/DateTimeField";
import MultipleChoiceField from "../../src/forms/fields/MultipleChoiceField";
import TextField from "../../src/forms/fields/TextField";
import getAPIClient from "../api.mock";
import { TestContext } from "./utils";

process.env.TZ = "America/Los_Angeles";

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
  ["choices", "default", ChoiceField],
  ["date", "default", DateField, { input: { value: "2019-07-02" } }],
  ["datetime", "default", DateTimeField, { input: { value: "2019-07-02" } }],
  ["integer", "default", TextField],
  ["multiple_choices", "default", MultipleChoiceField],
  ["text", "default", TextField],
])(
  "Can render field of type '%s' and variant '%s'",
  async (name, variant, fieldComponent, extraProps = {}) => {
    const api = await getAPIClient();
    const tree = renderer.create(
      <TestContext api={api}>
        <Form route="example.user:form.create">
          <AutoField name={name} variant={variant} {...extraProps} />
        </Form>
      </TestContext>
    );
    expect(tree.root.findByType(fieldComponent)).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  }
);
