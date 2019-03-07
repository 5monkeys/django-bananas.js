import { DateTimePicker } from "material-ui-pickers";
import React from "react";

export default ({ input: { onChange, ...inputProps }, fieldProps }) => {
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
