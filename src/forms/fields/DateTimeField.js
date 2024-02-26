import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React from "react";

const DateTimeField = ({ input: { onChange, ...inputProps }, fieldProps }) => {
  return (
    <DateTimePicker
      {...inputProps}
      {...fieldProps}
      onChange={date => {
        onChange(date.toISOString());
      }}
      renderInput={props => <TextField {...props} {...fieldProps} />}
    />
  );
};

export default DateTimeField;
