import { TextField } from "@material-ui/core";
import React from "react";

export default ({ input, fieldProps }) => {
  return <TextField {...input} {...fieldProps} />;
};
