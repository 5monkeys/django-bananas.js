import { DatePicker } from "material-ui-pickers";
import React from "react";

export default ({ input: { onChange, ...inputProps }, fieldProps }) => {
  return (
    <DatePicker
      {...inputProps}
      {...fieldProps}
      onChange={date => {
        console.log(date, date.toISOString().split("T")[0]);
        onChange(date.toISOString().split("T")[0]);
      }}
    />
  );
};
