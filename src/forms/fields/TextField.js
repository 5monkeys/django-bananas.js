import { TextField as MUITextField } from "@mui/material";
import React from "react";

const TextField = ({ input, fieldProps }) => {
  return <MUITextField {...input} {...fieldProps} />;
};

export default TextField;
