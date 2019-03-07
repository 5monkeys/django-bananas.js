import PropTypes from "prop-types";
import React from "react";
import renderer from "react-test-renderer";

import AdminContext from "../../src/context";
import { AutoField, Form } from "../../src/forms";
import getAPIClient from "../api.mock";

const TestContext = ({ api, children }) => (
  <AdminContext.Provider value={{ api: api.operations }}>
    {children}
  </AdminContext.Provider>
);

TestContext.propTypes = {
  api: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

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
  ["boolean", "checkbox"],
  ["boolean", "switch"],
  ["integer", "default"],
  ["text", "default"],
])("Can render field of type '%s' and variant '%s'", async (name, variant) => {
  const api = await getAPIClient();
  const tree = renderer
    .create(
      <TestContext api={api}>
        <Form route="example.user:form">
          <AutoField name={name} variant={variant} />
        </Form>
      </TestContext>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
