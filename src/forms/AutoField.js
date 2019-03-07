import PropTypes from "prop-types";
import React from "react";

import SchemaField from "./SchemaField";
import DateField from "./fields/DateField";
import DateTimeField from "./fields/DateTimeField";
import TextField from "./fields/TextField";

const fieldsByType = {
  string: {
    default: TextField,
    date: DateField,
    "date-time": DateTimeField,
  },
};

class AutoField extends React.Component {
  render() {
    const { fieldProps: fieldPropsOverride, ...rest } = this.props;
    return (
      <SchemaField {...rest}>
        {({ meta, input, schema, fieldProps }) => {
          const fields = fieldsByType[schema.type] || { default: TextField };
          const field = fields[schema.format] || fields.default;
          return field({
            meta,
            input,
            fieldProps: { ...fieldProps, ...fieldPropsOverride },
          });
        }}
      </SchemaField>
    );
  }
}

AutoField.propTypes = {
  name: PropTypes.string.isRequired,
  fieldProps: PropTypes.object,
};

AutoField.defaultProps = {
  fieldProps: {},
};

export default AutoField;
