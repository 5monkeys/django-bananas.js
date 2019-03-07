import PropTypes from "prop-types";
import React from "react";
import { Field as FField } from "react-final-form";

import FormContext from "./FormContext";
import BooleanField from "./fields/BooleanField";
import DateField from "./fields/DateField";
import DateTimeField from "./fields/DateTimeField";
import TextField from "./fields/TextField";
import { fieldFromSchema } from "./utils";

const fieldsByType = {
  string: {
    default: TextField,
    date: DateField,
    "date-time": DateTimeField,
  },
  boolean: {
    default: BooleanField,
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
      ...rest
    } = this.props;
    const schema = fieldFromSchema(this.context.schema, name);
    if (typeof schema === "undefined") {
      throw new Error(`No schema found for field "${name}".`);
    }

    return (
      <FField name={name} {...rest}>
        {({ meta, input }) => {
          const fields = fieldsByType[schema.type] || { default: TextField };
          const field = fields[schema.format] || fields.default;
          const fieldProps = schema
            ? {
                label: schema.title,
                error: (meta.error || meta.submitError) && meta.touched,
                required: schema.required,
                helperText: meta.touched && (meta.error || meta.submitError),
              }
            : {};
          return field({
            meta,
            input,
            variant,
            fieldProps: { ...fieldProps, ...fieldPropsOverride },
          });
        }}
      </FField>
    );
  }
}

AutoField.propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
  fieldProps: PropTypes.object,
};

AutoField.defaultProps = {
  variant: undefined,
  fieldProps: {},
};

export default AutoField;
