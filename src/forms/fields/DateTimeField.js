import { TextField } from "@material-ui/core";
import React from "react";

export default ({ input, fieldProps }) => {
  return <TextField type="datetime-local" inputProps={input} {...fieldProps} />;
};
