import PropTypes from "prop-types";
import React from "react";
import { Field as FField } from "react-final-form";

import FormContext from "./FormContext";
import BooleanField from "./fields/BooleanField";
import ChoiceField from "./fields/ChoiceField";
import DateField from "./fields/DateField";
import DateTimeField from "./fields/DateTimeField";
import MultipleChoiceField from "./fields/MultipleChoiceField";
import TextField from "./fields/TextField";
import { fieldFromSchema } from "./utils";

const fieldsByType = {
  string: {
    default: { component: TextField },
    date: { component: DateField },
    "date-time": { component: DateTimeField },
  },
  boolean: {
    default: { component: BooleanField, type: "checkbox" },
  },
  enum: {
    default: { component: ChoiceField, type: "select" },
  },
  array: {
    default: { component: MultipleChoiceField, type: "select" },
  },
};

class AutoField extends React.Component {
  static contextType = FormContext;

  render() {
    if (typeof this.context === "undefined") {
      throw new Error("This component requires FormContext to be present.");
    }

    const {
      name,
      fieldProps: fieldPropsOverride,
      variant,
      FieldComponent,
      ...rest
    } = this.props;
    const schema = fieldFromSchema(this.context.schema, name);
    if (typeof schema === "undefined") {
      throw new Error(`No schema found for field "${name}".`);
    }
    const fieldType = schema.enum ? "enum" : schema.type;
    const fields = fieldsByType[fieldType] || fieldsByType.string;
    const { component, type } = fields[schema.format] || fields.default;
    const Field = FieldComponent || component;

    return (
      <FField name={name} type={type} {...rest} novalidate>
        {({ meta, input }) => {
          const fieldProps = schema
            ? {
                label: schema.title + (schema.required ? " *" : ""),
                error: (meta.error || meta.submitError) && meta.touched,
                helperText: meta.touched && (meta.error || meta.submitError),
              }
            : {};
          return (
            <Field
              meta={meta}
              input={input}
              variant={variant}
              schema={schema}
              fieldProps={{ ...fieldProps, ...fieldPropsOverride }}
            />
          );
        }}
      </FField>
    );
  }
}

AutoField.propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
  fieldProps: PropTypes.object,
  FieldComponent: PropTypes.func,
};

AutoField.defaultProps = {
  variant: undefined,
  fieldProps: {},
  FieldComponent: undefined,
};

export default AutoField;
