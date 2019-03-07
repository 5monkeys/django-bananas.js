import { Checkbox, Switch } from "@material-ui/core";
import React from "react";

const BooleanField = ({
  input: { value, ...inputProps },
  variant,
  fieldProps,
}) =>
  variant === "switch" ? (
    <Switch checked={value} {...inputProps} {...fieldProps} />
  ) : (
    <Checkbox checked={value} {...inputProps} {...fieldProps} />
  );

export default BooleanField;
