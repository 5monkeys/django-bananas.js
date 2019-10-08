import { InputAdornment, TextField } from "@material-ui/core";
import { AutoField } from "django-bananas/forms";
import React from "react";

const CustomTextField = ({ input, fieldProps }) => {
  return (
    <TextField
      InputProps={{
        startAdornment: <InputAdornment position="start">🍌</InputAdornment>,
      }}
      fullWidth={true}
      variant="outlined"
      {...input}
      {...fieldProps}
    />
  );
};

const fieldsByType = {
  string: {
    default: { component: CustomTextField },
  },
};

const CustomAutoField = props => {
  console.log("autofield received props: ", props);
  return <AutoField fieldsByType={fieldsByType} {...props} />;
};

export default CustomAutoField;
