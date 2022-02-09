import { DatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import React from "react";

const DateField = ({ input: { onChange, ...inputProps }, fieldProps }) => {
  return (
    <DatePicker
      {...inputProps}
      {...fieldProps}
      onChange={date => {
        onChange(date.toISOString().split("T")[0]);
      }}
      renderInput={props => <TextField {...props} {...fieldProps} />}
    />
  );
};

export default DateField;
