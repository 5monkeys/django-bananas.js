import { DateTimePicker } from "@material-ui/pickers";
import React from "react";

const DateTimeField = ({ input: { onChange, ...inputProps }, fieldProps }) => {
  return (
    <DateTimePicker
      {...inputProps}
      {...fieldProps}
      onChange={date => {
        onChange(date.toISOString());
      }}
    />
  );
};

export default DateTimeField;
