import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";

const ChoiceField = ({ input, schema, fieldProps = {} }) => (
  <FormControl error={fieldProps.error}>
    <InputLabel htmlFor="name-error">{fieldProps.label}</InputLabel>
    <Select {...input} {...fieldProps} value={input.value || []}>
      {!schema.required && (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      )}
      {schema.enum.map(value => (
        <MenuItem value={value} key={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
    {fieldProps.error && (
      <FormHelperText>{fieldProps.helperText}</FormHelperText>
    )}
  </FormControl>
);

export default ChoiceField;
