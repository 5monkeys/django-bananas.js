import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
} from "@mui/material";
import React from "react";

const BooleanField = ({
  input: { value, ...inputProps },
  variant,
  fieldProps,
}) => (
  <FormControl required error={fieldProps.error}>
    <FormGroup>
      <FormControlLabel
        control={
          variant === "switch" ? (
            <Switch checked={value} {...inputProps} />
          ) : (
            <Checkbox checked={value} {...inputProps} />
          )
        }
        {...(fieldProps || {})}
      />
    </FormGroup>
    {fieldProps.error && (
      <FormHelperText>{fieldProps.helperText}</FormHelperText>
    )}
  </FormControl>
);

export default BooleanField;
