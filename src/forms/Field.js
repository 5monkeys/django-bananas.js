import PropTypes from "prop-types";
import React from "react";
import { Field as FField } from "react-final-form";

import FormContext from "./FormContext";
import { fieldFromSchema } from "./utils";

class Field extends React.Component {
  static contextType = FormContext;

  render() {
    const { name, children, ...props } = this.props;
    const { schema } = this.context;
    // TODO: investigate unnecessary rerenders
    // console.log("schema", schema);
    const fieldSchema = fieldFromSchema(schema, name);
    if (typeof fieldSchema === "undefined") {
      // TODO: use logger
      console.error(`No schema found for field "${name}".`);
      return null;
    }
    return (
      <FField name={name} {...props}>
        {formProps => children({ ...formProps, schema: fieldSchema })}
      </FField>
    );
  }
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Field;
