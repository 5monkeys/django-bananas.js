import { DatePicker } from "material-ui-pickers";
import React from "react";

const DateField = ({ input: { onChange, ...inputProps }, fieldProps }) => {
  return (
    <DatePicker
      {...inputProps}
      {...fieldProps}
      onChange={date => {
        onChange(date.toISOString().split("T")[0]);
      }}
    />
  );
};

export default DateField;
