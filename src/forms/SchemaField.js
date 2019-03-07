import PropTypes from "prop-types";
import React from "react";

import Field from "./Field";

class SchemaField extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Field {...this.props}>
        {({ meta, input, schema }) =>
          children({
            meta,
            input,
            schema,
            fieldProps: schema
              ? {
                  label:
                    (meta.error || meta.submitError) && meta.touched
                      ? `${schema.title} (${meta.error || meta.submitError})`
                      : schema.title,
                  error: (meta.error || meta.submitError) && meta.touched,
                  required: schema.required,
                }
              : {},
          })
        }
      </Field>
    );
  }
}

SchemaField.propTypes = {
  children: PropTypes.func.isRequired,
};

export default SchemaField;
