import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

const MultipleChoiceField = ({ input, schema, fieldProps }) => (
  <FormControl error={fieldProps.error}>
    <InputLabel htmlFor="name-error">{fieldProps.label}</InputLabel>
    <Select
      {...input}
      value={
        input.value instanceof Array
          ? input.value
          : input.value
          ? [input.value]
          : []
      }
      {...fieldProps}
      multiple
    >
      {!schema.required && (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      )}
      {schema.items.enum.map(value => (
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

export default MultipleChoiceField;
