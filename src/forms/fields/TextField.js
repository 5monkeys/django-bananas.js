import { TextField as MUITextField } from "@material-ui/core";
import React from "react";

const TextField = ({ input, fieldProps }) => {
  return <MUITextField {...input} {...fieldProps} />;
};

export default TextField;
