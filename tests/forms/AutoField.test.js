import { render } from "@testing-library/react";
import Logger from "js-logger";
import React from "react";

import { AutoField, Form } from "../../src/forms";
import BooleanField from "../../src/forms/fields/BooleanField";
import ChoiceField from "../../src/forms/fields/ChoiceField";
import DateField from "../../src/forms/fields/DateField";
import DateTimeField from "../../src/forms/fields/DateTimeField";
import MultipleChoiceField from "../../src/forms/fields/MultipleChoiceField";
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
    const { children } = this.props;
    const { error } = this.state;
    return error != null ? error.message : children;
  }
}

test("Get a friendly reminder about FormContext, if missing", () => {
  const { getByText } = render(
    <Boundary>
      <AutoField name="test" />
    </Boundary>
  );

  expect(
    getByText("This component requires FormContext to be present.")
  ).toBeTruthy();
});

test.each([
  ["boolean", "checkbox", BooleanField],
  ["boolean", "switch", BooleanField],
  ["choices", "default", ChoiceField],
  ["date", "default", DateField],
  ["datetime", "default", DateTimeField],
  ["integer", "default", TextField],
  ["multiple_choices", "default", MultipleChoiceField],
  ["text", "default", TextField],
])("Can render field of type '%s' and variant '%s'", async (name, variant) => {
  const api = await getAPIClient();

  const { getByTestId } = render(
    <TestContext api={api}>
      <Form route="example.user:form.create">
        <AutoField
          name={name}
          variant={variant}
          fieldProps={{ "data-testid": name }}
        />
      </Form>
    </TestContext>
  );
  expect(getByTestId(name)).toBeTruthy();
});

const CustomFieldsByType = {
  string: {
    default: {
      component: ({ fieldProps = {} }) => <input {...fieldProps} />,
    },
    date: {
      component: ({ fieldProps = {} }) => <input {...fieldProps} />,
      "date-time": {
        component: ({ fieldProps = {} }) => <input {...fieldProps} />,
      },
    },
    boolean: {
      default: {
        component: ({ fieldProps = {} }) => <input {...fieldProps} />,
        type: "checkbox",
      },
    },
    enum: {
      default: {
        component: ({ fieldProps = {} }) => <input {...fieldProps} />,
        type: "select",
      },
    },
    array: {
      default: {
        component: ({ fieldProps = {} }) => <input {...fieldProps} />,
        type: "select",
      },
    },
  },
};

test.each([
  ["boolean", "checkbox", "boolean"],
  ["boolean", "switch", "boolean"],
  ["date", "default", "date"],
  ["datetime", "default", "datetime"],
  ["integer", "default", "text"],
  ["multiple_choices", "default", "array"],
  ["text", "default", "text"],
])(
  "Can render field of type '%s' and variant '%s' with custom field mapping",
  async (name, variant) => {
    const api = await getAPIClient();
    const { getByTestId } = render(
      <TestContext api={api}>
        <Form route="example.user:form.create">
          <AutoField
            fieldProps={{ "data-testid": name }}
            fieldsByType={CustomFieldsByType}
            name={name}
            variant={variant}
          />
        </Form>
      </TestContext>
    );
    expect(getByTestId(name)).toBeTruthy();
  }
);

const DateTimeComponent = ({ fieldProps = {} }) => <input {...fieldProps} />;

const CustomPartialFieldsByType = {
  string: {
    "date-time": { component: DateTimeComponent },
  },
};

test.each([
  ["boolean", "checkbox", BooleanField],
  ["boolean", "switch", BooleanField],
  ["choices", "default", ChoiceField],
  ["date", "default", DateField],
  ["datetime", "default", DateTimeComponent],
  ["integer", "default", TextField],
  ["multiple_choices", "default", MultipleChoiceField],
  ["text", "default", TextField],
])(
  "Can render field of type '%s' and variant '%s' with partial fieldsByType",
  async (name, variant) => {
    const api = await getAPIClient();
    const { getByTestId } = render(
      <TestContext api={api}>
        <Form route="example.user:form.create">
          <AutoField
            fieldProps={{ "data-testid": name }}
            fieldsByType={CustomPartialFieldsByType}
            name={name}
            variant={variant}
          />
        </Form>
      </TestContext>
    );
    expect(getByTestId(name)).toBeTruthy();
  }
);

const modifiedTextField = props => (
  <div>
    <TextField {...props} fieldProps={{ "data-testid": "t1" }} />
  </div>
);

test("Can use FieldComponent prop to render a custom component", async () => {
  const api = await getAPIClient();
  const { getByTestId } = render(
    <Boundary>
      <TestContext api={api}>
        <Form route="example.user:form.create">
          <AutoField name="text" FieldComponent={modifiedTextField} />
        </Form>
      </TestContext>
    </Boundary>
  );
  expect(getByTestId("t1")).toBeTruthy();
});
